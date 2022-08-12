---
id: checkpoint-sync
title: Sync from a checkpoint
sidebar_label: Sync from a checkpoint
---

import CheckpointSyncPresent from '@site/static/img/checkpoint-sync-present.png';
import CheckpointSyncAbsent from '@site/static/img/checkpoint-sync-absent.png';

:::caution

**This feature is currently in public preview** and may change significantly as we receive feedback from users like you. Join our [Discord server](https://discord.gg/prysmaticlabs) to share your feedback.

:::

<!--meta: start by concisely communicating the user value using terms that most readers will be familiar with -->

**Checkpoint sync** is a feature that significantly reduces the time it takes for your beacon node to sync with the beacon chain. With checkpoint sync configured, your beacon node will begin syncing from a recently finalized checkpoint instead of syncing from genesis. This how-to walks you through two ways to configure checkpoint sync: syncing via **network**, and syncing via **file**.


## Background

<!--meta: background foundations - can move to dedicated conceptual docs if needed. See quickstart for an example of using the `Knowledge Check` pattern: https://docs.prylabs.network/docs/install/install-with-script -->

Beacon nodes maintain a local copy of the Ethereum's beacon chain, the consensus-layer blockchain network that facilitates Ethereum's transition to proof-of-stake. When you tell Prysm's beacon node to start running for the first time, Prysm will fetch the very first beacon chain block (called the genesis block). It will then "replay" the history of the beacon chain, fetching one block at a time until the entire chain has been downloaded:

<img style={{width: 100 + '%', margin: 'auto', marginBottom: 20 + 'px', display: 'block', maxWidth: 623 + 'px'}} src={CheckpointSyncAbsent} /> 

This sync process can take a long time. Checkpoint sync speeds things up by telling your beacon node to piggyback off of a trusted peer node, skipping over the majority of the beacon chain's history and syncing from a recently finalized checkpoint:

<img style={{width: 100 + '%', margin: 'auto', marginBottom: 20 + 'px', display: 'block', maxWidth: 635 + 'px'}} src={CheckpointSyncPresent} /> 

Note that currently, Prysm's implementation syncs forward-only. The process of syncing backwards towards the genesis block is called "backfilling", and will be supported in a future Prysm release.

To sync from a checkpoint, your Prysm beacon node needs three pieces of information: the latest finalized `BeaconState`, the `SignedBeaconBlock`, and the **genesis state** for the network you're running on. This information can be pulled from a trusted peer node either via a **network request**, or via exporting/importing **files**.


## Configure checkpoint sync via network request

<!--todo: prerequisites -->

<!--meta: we can be precise about the endpoint type so users have something to search for when troubleshooting / researching. We can also reorganize / reduce copy to keep it crisp and actionable. -->

The easiest way to configure checkpoint sync is to start your Prysm beacon node with the `--checkpoint-sync-url` flag set to a trusted, fully synced beacon node's RPC gateway provider endpoint. By default, this endpoint is exposed on port `3500`. Set the `--genesis-beacon-api-url` flag to the same URL in order to fetch the genesis state along with the `BeaconState` and `SignedBeaconBlock`. The following example demonstrates configuring checkpoint sync against a local beacon node: 

[//]: # (todo: this seems awkward because port 3500 is the default, and this snippet doesn't allow the reader to copy paste the endpoint URL. If we use this snippet, should we at least specify that local nodes will each need their own unique RPC gateway provider endpoint?)

<!--todo: use tabs to support multiple operating systems following established conventions. -->

```bash
$ ./prysm.sh beacon-chain --checkpoint-sync-url=http://localhost:3500 --genesis-beacon-api-url=http://localhost:3500
```

<!--todo: this is how you know it succeeded -->
<!--todo: this how it might fail, and how to troubleshoot -->


<!--meta: "beacon node api" makes me wonder - are we talking about an individual beacon node, or some SaaS endpoint. We can try to keep it simple with the file vs network dichotomy. -->
## Configure checkpoint sync via file export/import

<!--todo: prerequisites - go, curl? -->

When you sync via **network request**, the `BeaconState`, `SignedBeaconBlock`, and genesis state files are delivered from one beacon node to another using a peer-to-peer connection. When you sync via **file export/import**, you manually export these files from one beacon node and import them into another. This gives you an alternative to syncing via network if you don't want to publicly expose an RPC gateway provider endpoint. Block explorers and client teams can also host these files statically as a trusted checkpoint sync source.

<!--meta: "export" seems more precise + accurate than "download". Colloquially, "download" implies network connectivity, fetching from a remote machine, etc. -->
Prysm's beacon node includes `prysmctl`, a tool that lets you export the `BeaconState` and `SignedBeaconBlock` from a fully synced beacon node that you control. 

To **export** your checkpoint sync artifacts from a local beacon node that you control, issue the following command:

<!--todo: is go needed? possible to use prysm.bat/sh? -->
<!--todo: use tabs to support multiple operating systems following established conventions -->
```bash
$ go run github.com/prysmaticlabs/prysm/cmd/prysmctl checkpoint save --beacon-node-host=http://localhost:3500
```

You should see the following output upon successful export:

```bash
INFO[0000] requesting http://localhost:3500/eth/v2/debug/beacon/states/finalized
INFO[0001] detected supported config in remote finalized state, name=goerli, fork=bellatrix
INFO[0001] requesting http://localhost:3500/eth/v2/beacon/blocks/0x766bdce4c70b6ee991bd68f8065d73e3990895b1953f6b931baae0502d8cbfcf
INFO[0001] BeaconState slot=3041920, Block slot=3041920
INFO[0001] BeaconState htr=0x34ebc10f191706afbbccb0c3c39679632feef0453fe842bda264e432e9e31011d, Block state_root=0x34ebc10f191706afbbccb0c3c39679632feef0453fe842bda264e432e9e31011
INFO[0001] BeaconState latest_block_header htr=0x766bdce4c70b6ee991bd68f8065d73e3990895b1953f6b931baae0502d8cbfcfd, block htr=0x766bdce4c70b6ee991bd68f8065d73e3990895b1953f6b931baae0502d8cbfcf
INFO[0001] saved ssz-encoded block to to block_goerli_bellatrix_3041920-0x766bdce4c70b6ee991bd68f8065d73e3990895b1953f6b931baae0502d8cbfcf.ssz
INFO[0001] saved ssz-encoded state to to state_goerli_bellatrix_3041920-0x34ebc10f191706afbbccb0c3c39679632feef0453fe842bda264e432e9e31011.ssz
```

<!--meta: I imagine most readers don't know what ssz means, and won't care. We can elaborate on the technical details in dev wiki > dev concepts if/when needed.-->
<!--meta: contractions can make guidance a bit friendlier/natural, which can make content more readable, which can reduce the cognitive cost of learning/doing -->
<!--meta: in general we want to avoid claiming that a task is "easy" - some readers may not find it easy at all. -->

The exported file name includes the file type (`state`, `block`), the network (`goerli`), the fork name (`bellatrix`), the slot (`2397120`) and the state or block root in hex encoding. The checkpoint save command doesn't export the required genesis state, but this can be downloaded via `curl` or `wget` using the following command syntax:

<!--meta: we can remove the output so the user has something clear and unambiguous to copy/paste -->
<!--todo: would it be easier to just direct users to hosted genesis states on github? -->
```
$ curl -H "Accept: application/octet-stream"  http://localhost:3500/eth/v1/debug/beacon/states/genesis > genesis.ssz
```

<!--meta: we can refer to these three files always as a triple, just to beat the drum that these all go together in the context of checkpoint sync -->
Use the following command to **import** your exported `BeaconState`, `SignedBeaconBlock`, and genesis state files and **start** your beacon node with checkpoint sync enabled:  

<!--todo: use tabs to support multiple operating systems following established conventions -->

```bash
./prysm.sh beacon-chain \
--checkpoint-block=$PWD/block_goerli_bellatrix_3041920-0x766bdce4c70b6ee991bd68f8065d73e3990895b1953f6b931baae0502d8cbfcf.ssz \
--checkpoint-state=$PWD/state_goerli_bellatrix_3041920-0x34ebc10f191706afbbccb0c3c39679632feef0453fe842bda264e432e9e31011.ssz \
--genesis-state=$PWD/genesis.ssz
```

<!--todo: this is how you know it's succeeded -->
<!--todo: this how it might fail, and how to troubleshoot -->


## Frequently asked questions

**Is checkpoint sync less secure than syncing from genesis?**
No. It's actually considered more secure thanks to the protections against long-range attacks afforded by [Weak Subjectivity](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/).

<!--todo:
**Can I use checkpoint sync on any network?**
TODO

**Are there any publicly available, trustworthy checkpoint sync endpoints that I can use?**
TODO

**Does the Prysm team host checkpoint sync files that I can use?**
TODO
-->

**How do I expose my beacon node's RPC gateway provider for checkpoint sync?**
The [Beacon Node API for retrieving a BeaconState](https://ethereum.github.io/beacon-APIs/#/Debug/getStateV2) is a debug endpoint, so if you want your fully synced beacon node to serve checkpoint sync requests, it should be started with the flags `--enable-debug-rpc-endpoints` and `--grpc-max-msg-size=65568081`. Note that the beacon node *retrieving* the checkpoint state from this node doesn't need these flags.
<!--meta: this note appears to be targeted at users who want to expose an endpoint, which is a distinct task/step. We can isolate this down into the FAQ to keep the reader in flow along the primary task. One task at a time. -->



import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />