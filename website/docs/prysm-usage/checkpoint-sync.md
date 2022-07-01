---
id: checkpoint-sync
title: Checkpoint Sync
sidebar_label: Use Checkpoint Sync
---

# Checkpoint Sync

:::caution

**This feature is currently in public preview** and may change significantly as we receive feedback from users like you. Join our [Discord server](https://discord.gg/prysmaticlabs) to share your feedback.

:::

:::caution Merge Testnet Users

If you're running on a Merge Testnet, use [Prysm v2.1.3-rc.4](https://github.com/prysmaticlabs/prysm/releases/tag/v2.1.3-rc.4) with the [vNext Checkpoint Sync guidance](./checkpoint-sync-vNext.md), as some options have changed.

:::

Prysm provides the ability to sync from a finalized checkpoint, as an alternative to replaying all history starting from Genesis. Checkpoint Sync is significantly faster than Genesis Sync, and is considered more secure thanks to the protections against long-range attacks afforded by [Weak Subjectivity](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/).

Checkpoint Sync uses a `BeaconState` and `SignedBeaconBlock` from the first Epoch of the current [Weak Subjectivity Period](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/weak-subjectivity.md) ([additional background](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)). Due to implementation details within prysm, we also require the genesis state to be provided. It is recommended that a server synced via Checkpoint Sync also specify the `--weak-subjectivity-checkpoint` flag, which causes the server to halt syncing at the Checkpoint Epoch unless the chain includes the specified block. This document will explain how to:
- Query a synced Beacon Node API server to find the Weak Subjectivity Checkpoint.
- Start a new Beacon Node server that obtains the Checkpoint BeaconState and SignedBeaconBlock over the network.
- Download the Checkpoint BeaconState and SignedBeaconBlock from a Beacon Node API.
- Start a new Beacon Node server with Checkpoint BeaconState and SignedBeaconBlock provided as local ssz-encoded files.

## Checkpoint Sync - via network

The easiest way to initiate Checkpoint Sync is to start your prysm Beacon Node with the `--checkpoint-sync-url` flag set to the URL of a Beacon Node API backed by a synced Becaon Node. To also obtain the genesis state from this node, set the `--genesis-beacon-api-url` flag to the same URL.

*note: the [Beacon Node API for retrieving a BeaconState](https://ethereum.github.io/beacon-APIs/#/Debug/getStateV2) is a debug endpoint, so a prysm server *providing* the checkpoint state and block must be started with the flags `--enable-debug-rpc-endpoints` and a sufficiently large value for `--grpc-max-msg-size`. States are currently upwards of 40MB in size, so `--grpc-max-msg-size=65568081` should be large enough for the forseeable future. The server *retrieving* the checkpoint state does not need these flags.*

You will need to determine the hostname and port for the other server; the default port for the prysm Beacon Node API is `3500`. Here's an example `prysm.sh` command to sync from a remote server, using `localhost` as the hostname for the synced Beacon Node:

```bash
$ ./prysm.sh beacon-chain --checkpoint-sync-url=http://localhost:3500 --genesis-beacon-api-url=http://localhost:3500
```

## Weak Subjectivity Checkpoint

In order to obtain the BeaconBlock root and Epoch that form a Weak Subjectivity Checkpoint, you can use the `prysmctl` command line tool to query a Beacon Node API backed by a synced Beacon Node. Prysm provides an optimized API endpoint for this purpose, but also supports a backwards-compatible fallback method that uses a combination of existing API calls to compute the checkpoint client-side.

```bash
$ go run github.com/prysmaticlabs/prysm/cmd/prysmctl cpt latest --beacon-node-host=http://localhost:3500
...
Use the following flag when starting a prysm Beacon Node to ensure the chain history includes the Weak Subjectivity Checkpoint
--weak-subjectivity-checkpoint=0xb6beabe80fcda96eabaa8766beb2f361f5b67a368afaa074951b98eed74fe5b4:74910
```

*note: the formatting of the checkpoint flag is `<root>:<epoch>` where `<root>` is the block root of the checkpoint in hex encoding, and `<epoch>` is the checkpoint epoch number.*

## Downloading Checkpoint data from the Beacon Node API

`prysmctl` also provides a tool for downloading the ssz-encoded BeaconState and SignedBeaconBlock to be used for Checkpoint Sync. This tool can be used to share files without publicly exposing an API endpoint, or by a block explorer or client team who wants to host the files as a trusted source.

```bash
$ go run github.com/prysmaticlabs/prysm/cmd/prysmctl cpt save
INFO[0000] --beacon-node-url=localhost:3500             
INFO[0000] server weak subjectivity checkpoint response - epoch=74910, block_root=0xb6beabe80fcda96eabaa8766beb2f361f5b67a368afaa074951b98eed74fe5b4, state_root=0x17859894f0cdbd46fb9dbbce30ddfb2856b9525fbdb92e7d5a127307fdadefa0 
INFO[0000] requesting checkpoint state at slot 2397120  
...
INFO[0029] saving ssz-encoded block to to block_prater_altair_2397120-0xb6beabe80fcda96eabaa8766beb2f361f5b67a368afaa074951b98eed74fe5b4.ssz 
INFO[0029] saving ssz-encoded state to to state_prater_altair_2397120-0x17859894f0cdbd46fb9dbbce30ddfb2856b9525fbdb92e7d5a127307fdadefa0.ssz
```

For human-friendliness, the file name includes the ssz type (`state`, `block`), the network (`prater`), the fork name (`altair`), the slot (`2397120`) and the state or block root in hex encoding. The checkpoint save command does not download the required genesis state at this time, but this can be easily downloaded via `curl` or `wget` using the `genesis` named state identifier:

```
$ curl -H "Accept: application/octet-stream"  http://localhost:3500/eth/v1/debug/beacon/states/genesis > genesis.ssz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 28.3M  100 28.3M    0     0  43.3M      0 --:--:-- --:--:-- --:--:-- 43.3M

```

## Checkpoint Sync - via file

With the BeaconState and SignedBeaconBlock files from `prysmctl cpt save` in the current directory, alongside the `genesis.ssz` genesis state downloaded via curl, and the Weak Subjectivity Checkpoint from `prysmctl cpt latest`, the following command line will start a prysm Beacon Node, using the local files and ensuring the Weak Subjectivity Checkpoint is enforced:

```bash
./prysm.sh beacon-chain \ 
-weak-subjectivity-checkpoint=0xb6beabe80fcda96eabaa8766beb2f361f5b67a368afaa074951b98eed74fe5b4:74910 \
--checkpoint-block=$PWD/block_prater_altair_2397120-0xb6beabe80fcda96eabaa8766beb2f361f5b67a368afaa074951b98eed74fe5b4.ssz \
--checkpoint-state=$PWD/state_prater_altair_2397120-0x17859894f0cdbd46fb9dbbce30ddfb2856b9525fbdb92e7d5a127307fdadefa0.ssz \
--genesis-state=$PWD/genesis.ssz
```