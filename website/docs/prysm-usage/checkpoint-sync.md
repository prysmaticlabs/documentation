---
id: checkpoint-sync
title: Sync from a checkpoint
sidebar_label: Sync from a checkpoint
---

import CheckpointSyncPresent from '@site/static/img/checkpoint-sync-present.png';
import CheckpointSyncAbsent from '@site/static/img/checkpoint-sync-absent.png';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

**This feature is currently in public preview** and may change significantly as we receive feedback from users like you. Join our [Discord server](https://discord.gg/prysmaticlabs) to share your feedback.

:::

**Checkpoint sync** is a feature that significantly speeds up the initial sync between your beacon node and the Beacon Chain. With checkpoint sync configured, your beacon node will begin syncing from a recently finalized checkpoint instead of syncing from genesis. This can make installations, validator migrations, recoveries, and testnet deployments *way* faster.

This how-to walks you through two ways to configure checkpoint sync: syncing via **network**, and syncing via **file**.


## Background

Beacon nodes maintain a local copy of the Ethereum's [Beacon Chain](https://ethereum.org/en/upgrades/beacon-chain/). When you tell Prysm's beacon node to start running for the first time, Prysm will fetch the very first Beacon Chain block (the Beacon Chain's [genesis block](https://beaconscan.com/slots?epoch=0)). Your beacon node will then "replay" the history of the Beacon Chain, fetching the oldest blocks from peers until the entire chain has been downloaded:

<img style={{width: 100 + '%', margin: 'auto', marginBottom: 20 + 'px', display: 'block', maxWidth: 623 + 'px'}} src={CheckpointSyncAbsent} /> 

This sync process can take a long time. Checkpoint sync speeds things up by telling your beacon node to piggyback off of a peer beacon node, skipping over the majority of the Beacon Chain's history and syncing from a recently finalized checkpoint:

<img style={{width: 100 + '%', margin: 'auto', marginBottom: 20 + 'px', display: 'block', maxWidth: 631 + 'px'}} src={CheckpointSyncPresent} /> 

Note that currently, Prysm's implementation syncs forward-only. The process of syncing backwards towards the genesis block is called "backfilling", and will be supported in a future Prysm release.

To sync from a checkpoint, your Prysm beacon node needs three pieces of information: the latest finalized `BeaconState`, the `SignedBeaconBlock`, and the **genesis state** for the network you're using. Together, the `BeaconState` and `SignedBeaconBlock` represent a single **checkpoint state**. This information can be retrieved from another fully-synced peer node either via a **network request**, or via **file export/import**.


## Option 1: Configure checkpoint sync via network request

Start your Prysm beacon node with the `--checkpoint-sync-url` flag set to a fully synced beacon node's RPC gateway provider endpoint. This endpoint is usually exposed via port `3500`. Set the `--genesis-beacon-api-url` flag to the same URL if you want to fetch the genesis state along with the `BeaconState` and `SignedBeaconBlock`.

The following command starts a beacon node with checkpoint sync configured to pull checkpoint state from another local beacon node's RPC endpoint over port `3500`:

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">

```
./prysm.bat beacon-chain --checkpoint-sync-url=http://localhost:3500 --genesis-beacon-api-url=http://localhost:3500
```
    
  </TabItem>
  <TabItem value="others">

```bash
./prysm.sh beacon-chain --checkpoint-sync-url=http://localhost:3500 --genesis-beacon-api-url=http://localhost:3500
```

  </TabItem>
</Tabs>

To confirm that checkpoint sync has succeeded, look for the following output:

```
level=info msg="requesting <your configured checkpoint sync endpoint>"
```

### Serve checkpoint sync requests

The above instructions tell you how to **request** checkpoint state from another node. If you want to **serve** these requests, run a fully synced node with the following flags:

 - `--enable-debug-rpc-endpoints`: The [Beacon Node API for retrieving a BeaconState](https://ethereum.github.io/beacon-APIs/#/Debug/getStateV2) is a debug endpoint - this flag tells Prysm to enable the endpoint so checkpoint sync requests can be served through your beacon node's RPC gateway provider endpoint.
 - `--grpc-max-msg-size=65568081`: By default, Prysm caps the size of its RPC responses. This flag configures a cap that allows Prysm to serve checkpoint sync requests with checkpoint state files.

Note that **this is entirely optional**. The beacon node *requesting* the checkpoint state from this node doesn't need these flags.


## Option 2 (Advanced): Configure checkpoint sync via file export/import

:::info

This method requires `go` to be installed on the machine that hosts your synced beacon node.

:::

When you sync via **network request**, the `BeaconState`, `SignedBeaconBlock`, and genesis state files are delivered from one beacon node to another using a peer-to-peer connection. When you sync via **file export/import**, you manually export these files from one beacon node and import them into another. This can be useful if you don't want your beacon node to expose an RPC gateway provider endpoint. Block explorers and client teams can also host these exported files statically as a trusted checkpoint sync source.

Issue the following command to export the `BeaconState` and `SignedBeaconBlock` files from a synced beacon node using `prysmctl`:

```bash
go run github.com/prysmaticlabs/prysm/cmd/prysmctl checkpoint save --beacon-node-host=http://localhost:3500
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

The two exported `*.ssz` files are your `BeaconState` and `SignedBeaconBlock` files. Their filenames combine their file type (`state`, `block`), the network (`goerli`), the fork name (`bellatrix`), the slot (`2397120`) and the state or block root in hex encoding. The `checkpoint save` command doesn't export the required genesis state, but the genesis state can be downloaded via `curl` or `wget` using the following command:

```
curl -H "Accept: application/octet-stream"  http://localhost:3500/eth/v1/debug/beacon/states/genesis > genesis.ssz
```

Alternatively, you can manually download the genesis state from GitHub: [Goerli-Prater](https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz) | [Sepolia](https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz) | [Ropsten](https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz)

Use the following command to start your beacon node with checkpoint sync configured to use this checkpoint state:

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">

```bash
./prysm.bat beacon-chain \
--checkpoint-block=$PWD/block_goerli_bellatrix_3041920-0x766bdce4c70b6ee991bd68f8065d73e3990895b1953f6b931baae0502d8cbfcf.ssz \
--checkpoint-state=$PWD/state_goerli_bellatrix_3041920-0x34ebc10f191706afbbccb0c3c39679632feef0453fe842bda264e432e9e31011.ssz \
--genesis-state=$PWD/genesis.ssz
```
    
  </TabItem>
  <TabItem value="others">

```bash
./prysm.sh beacon-chain \
--checkpoint-block=$PWD/block_goerli_bellatrix_3041920-0x766bdce4c70b6ee991bd68f8065d73e3990895b1953f6b931baae0502d8cbfcf.ssz \
--checkpoint-state=$PWD/state_goerli_bellatrix_3041920-0x34ebc10f191706afbbccb0c3c39679632feef0453fe842bda264e432e9e31011.ssz \
--genesis-state=$PWD/genesis.ssz
```

  </TabItem>
</Tabs>



## Verify the authenticity of your beacon node's checkpoint

To verify that the checkpoint state you're using is legitimate, follow these steps after starting your beacon node with checkpoint sync enabled:

1. Navigate to `http://localhost:3500/eth/v1/beacon/headers/finalized` using your browser.
2. Find the `slot` number and `state_root` value.
3. Use a trusted blockchain explorer to verify the `state_root`. Navigate to one of the following pages, replacing `SLOT` with the `slot` you pulled from your browser:
   - Prater: https://prater.beaconcha.in/block/SLOT
   - Sepolia: https://sepolia.beaconcha.in/block/SLOT
   - Ropsten: https://ropsten.beaconcha.in/block/SLOT
   - Mainnet: https://beaconcha.in/block/SLOT
4. Ensure that the `state_root` reported by the blockchain explorer matches the `state_root` you pulled from your browser. If you don't see a match, feel free to reach out to us on [Discord](https://discord.gg/prysmaticlabs) and we'll help you troubleshoot.


## Frequently asked questions

**Is checkpoint sync less secure than syncing from genesis?** <br/>
No. It's actually considered *more* secure thanks to the protections against long-range attacks afforded by [Weak Subjectivity](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/).

**How and when are "finalized checkpoints" created?** <br/>
TODO

**Can I use checkpoint sync on any network?** <br/>
TODO

**Can I use checkpoint sync with an existing, partially synced database?** <br/>
No - checkpoint sync requires a fresh, unused data directory.

**Are there any publicly available, trustworthy checkpoint sync endpoints that I can use?** <br/>
The Ethereum Foundation DevOps team runs a handful of checkpoint sync endpoints that can be used for testnets:

 - Goerli/Prater: https://goerli.checkpoint-sync.ethdevops.io
 - Ropsten: https://ropsten.checkpoint-sync.ethdevops.io
 - Sepolia: https://sepolia.checkpoint-sync.ethdevops.io


**Does the Prysm team host checkpoint sync files that I can use?** <br/>
TODO

**Do I need to provide a genesis state when using checkpoint sync on Mainnet?** <br/>
TODO

**Will I be able to use Infura as a checkpoint state provider after The Merge?** <br/>
TODO

**Where can I learn more about checkpoint sync?** <br/>

 - [Checkpoint Sync Safety](https://www.symphonious.net/2022/05/21/checkpoint-sync-safety/) by Adrian Sutton
 - [How to: Checkpoint Sync](https://notes.ethereum.org/@launchpad/checkpoint-sync) by members of the Ethereum Foundation. 
 - [WS sync in practice](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice) by Danny Ryan.
 
Special thanks to the authors of *How to: Checkpoint Sync* for providing the endpoints and verification procedure used in this guide.


import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />