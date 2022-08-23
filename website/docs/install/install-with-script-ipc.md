---
id: install-with-script-ipc
title: "Quickstart: Run a node and (optionally) stake ETH using Prysm (IPC)"
sidebar_label: "Quickstart: Run a node (IPC)"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ClientStackPng from '@site/static/img/client-stack.png';

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="Mick" lastVerifiedDateString="August 23rd, 2022" lastVerifiedVersionString="v3.0.0" />

import QuickstartIntroPartial from '@site/docs/install/partials/_quickstart-intro.md';

<QuickstartIntroPartial />

## Step 3: Run an execution client using Geth

In this step, you'll use Geth to run an execution-layer client that Prysm's beacon node will connect to.

<p>Download and run the latest 64-bit stable release of the <strong>Geth installer</strong> for your operating system from the <a href='https://geth.ethereum.org/downloads/'>Geth downloads page</a>.</p>

<p>Note that Geth 1.10.22 contains a regression that the team is actively working on. Either monitor the <a href='https://github.com/ethereum/go-ethereum/releases'>Geth releases page on GitHub</a> or join the <a href='https://discord.com/invite/nthXNEv'>Geth Discord</a> for the latest information.</p>

<p>Navigate to your <code>execution</code> directory and run the following command to start your execution node:</p>

<Tabs groupId="network" defaultValue="mainnet" values={[
    {label: 'Mainnet', value: 'mainnet'},
    {label: 'Goerli-Prater', value: 'goerli-prater'},
    {label: 'Sepolia', value: 'sepolia'},
    {label: 'Ropsten', value: 'ropsten'}
]}>
  <TabItem value="mainnet">
    <pre><code>geth --mainnet --http --http.api eth,net,engine,admin --authrpc.jwtsecret ../consensus/jwt.hex --authrpc.vhosts localhost </code></pre>
  </TabItem>
  <TabItem value="goerli-prater">
    <pre><code>geth --goerli --http --http.api eth,net,engine,admin --authrpc.jwtsecret ../consensus/jwt.hex --authrpc.vhosts localhost</code></pre>
  </TabItem>
  <TabItem value="sepolia">
    <pre><code>geth --sepolia --http --http.api eth,net,engine,admin --authrpc.jwtsecret ../consensus/jwt.hex --authrpc.vhosts localhost --override.terminaltotaldifficulty 17000000000000000</code></pre>
  </TabItem>
  <TabItem value="ropsten">
    <pre><code>geth --ropsten --http --http.api eth,net,engine,admin --authrpc.jwtsecret ../consensus/jwt.hex --authrpc.vhosts localhost --override.terminaltotaldifficulty 50000000000000000</code></pre>
  </TabItem>
</Tabs>

<p>See Geth's <a href='https://geth.ethereum.org/docs/interface/command-line-options'>command-line options</a> for parameter definitions.</p>

<p>Your Geth execution node will begin syncing. You can check your Geth execution node's sync status by running the following commands from a separate terminal window:</p>

```
## if you're not using Windows
geth attach 


## if you're using Windows
geth attach ipc:\\.\pipe\geth.ipc
eth.syncing
```

<p>A sync status of <code>false</code> indicates that your node is fully synced. You can proceed to the next step while Geth syncs.</p>

Congratulations - you’re now running an <strong>execution node</strong> in Ethereum’s execution layer.


## Step 4: Run a beacon node using Prysm

In this step, you'll run a beacon node using Prysm.

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">  
        <p>Use the following command to start a beacon node that connects to your local execution node:</p>
        <pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --mainnet --jwt-secret=path/to/jwt.hex --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node.</p>
        <pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --prater --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
      <TabItem value="sepolia">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node using your secret JWT file:</p>
        <pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --sepolia --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre>
        <p>If you're running a validator, specifying a <code>suggested-fee-recipient</code> wallet address will allow you to earn what were previously miner transaction fee tips.</p>
      </TabItem>
      <TabItem value="ropsten">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node using your secret JWT file:</p>
        <pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --ropsten --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre>
        <p>If you're running a validator, specifying a <code>suggested-fee-recipient</code> wallet address will allow you to earn what were previously miner transaction fee tips.</p>
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="others">
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <p>Use the following command to start a beacon node that connects to your local execution node:</p>
        <pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --mainnet --jwt-secret=path/to/jwt.hex --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node.</p>
        <pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --prater --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
      <TabItem value="sepolia">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node using your secret JWT file:</p>
        <pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --sepolia --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre>
        <p>If you're running a validator, specifying a <code>suggested-fee-recipient</code> wallet address will allow you to earn what were previously miner transaction fee tips.</p>
      </TabItem>
      <TabItem value="ropsten">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node using your secret JWT file:</p>
        <pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --ropsten --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre>
        <p>If you're running a validator, specifying a <code>suggested-fee-recipient</code> wallet address will allow you to earn what were previously miner transaction fee tips.</p>
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

Your beacon node will now begin syncing. This usually takes a couple days, but it can take longer depending on your network and hardware specs.

You can check your beacon node's <a href='https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Node/getSyncingStatus'>sync status</a> by running the following command from a separate terminal window:

```
curl http://localhost:3500/eth/v1/node/syncing | jq
```

This should produce the following output:


```
{"data":{"head_slot":"6944","sync_distance":"3003133","is_syncing":true,"is_optimistic":true}}
```

When you see `"is_syncing":false`, your beacon node is fully synchronized. When you see `"is_optimistic":false`, your execution node is fully synchronized.

You can verify that your beacon node has successfully connected to your execution node by running the following command from a separate terminal window:

```
curl http://localhost:3500/eth/v1alpha1/node/eth1/connections
```

<!-- You should see TODO. -->

Congratulations - you’re now running a <strong>full Ethereum node</strong>. Your full node consists of an <strong>execution node</strong> in Ethereum’s execution layer, and a <strong>beacon node</strong> in Ethereum’s consensus layer.


import QuickstartRunValidatorPartial from '@site/docs/install/partials/_quickstart-run-validator.md';

<QuickstartRunValidatorPartial />


-------

## Frequently asked questions

<!-- **I'm new to Ethereum, and I'm a visual learner. Can you show me how these things work?** <br />
The Beginner's Introduction to Prysm uses diagrams to help you visualize Ethereum's architecture, and Prysm's too. (TODO) -->

**Why do you recommend putting everything on a single machine?** <br />
Keeping all of your client software on a single machine keeps things simple, which aligns with our [security best practices](../security-best-practices.md).

**Can I use Prysm on a Mac M1 ARM chip?** <br />
Mac M1 ARM chips currently require users to run Prysm through <a href='https://support.apple.com/en-us/HT211861'>Rosetta</a>. See our <a href='https://github.com/prysmaticlabs/prysm/issues/9385'>open bug</a> for details.

**Do I need to configure JWT if I'm using IPC instead of HTTP?** <br />
No.

**Do I need to configure my firewall?** <br />
We recommend **closing** TCP port `8545` to the internet and keeping TCP and UDP ports `30303` **open** to support other execution nodes.

**Can you mix and match networks between execution layer and consensus layer?** <br />
No. See [Nodes and networks](../concepts/nodes-networks.md) for more information.

**Can I stake with less than 32 ETH?** <br />
Yes! <a href='https://ethereum.org/en/staking/pools/'>Pooled staking</a> lets you stake with less than 32 ETH. 


**What should I do if I can't run a node using my own hardware?** <br />
You can delegate hardware management to <a href='https://ethereum.org/en/staking/saas/'>staking as a service</a> providers.


<!-- **I'm new to Ethereum, and I'm a visual learner. Can you show me how these things work? How much disk space does each node type require?** <br />
The Beginner's Introduction to Prysm uses diagrams to help you visualize Ethereum's architecture, and Prysm's too. (TODO) -->

**Can I use a light node with Prysm, or do I need to run a full execution node?** <br />
No - at this time, a full node is required.

<!-- **I don't have a 2TB SSD, but I have multiple smaller SSDs. Will this work?** <br />
Yes. You can tell your execution client to overflow into a specific drive by (TODO). You can tell your beacon node client to overflow into a specific drive by (TODO). You can tell your validator client to overflow into a specific drive by (TODO). -->

**Can I use an external SSD connected via USB?** <br />
Yes, but your USB connection introduces a possible point of failure. If you do this, avoid connecting your SSD to your computer through a USB hub - instead, connect it directly.

**Can I use a light client as my local execution client so I don't have to download so much data?**  <br />
No, a full execution node is needed.

**Why do I need to run my own execution client?** <br />
The Merge introduces a new Engine API that allows consensus-layer clients to communicate with execution-layer clients. Teku docs contain a great explainer here: <a href='https://docs.teku.consensys.net/en/latest/Concepts/Merge/'>The Merge</a>.
<!--TODO: develop our own knowledge base with conceptual content -->

**What happens if my execution client goes down? Will I be penalized?** <br />
Yes. Downtime penalties are minimal but we recommend having uptime and downtime alerts configured for your execution node, beacon node, and validator if possible.

**My beacon node is taking a long time to sync. Is there any way I can speed it up?** <br />
Yes - you can use [checkpoint sync](https://docs.prylabs.network/docs/prysm-usage/checkpoint-sync) to start your beacon node's synchronization from a checkpoint rather than from genesis. This is actually a more secure way to run your beacon node.
<!--TODO: explain why -->


**My proposals aren't working, but my attestations are. What's going on?** <br />
This is usually an indication that your validator isn't able to communicate with your beacon node, or your beacon node isn't able to connect to your execution node.

**How long does it take for my validator to be selected to propose a new block?** <br />
At the time of this writing, a ballpark estimate is **around a week**. Every 12 seconds a new block is proposed, and your validator has a one in [total number of active validators] chance of being chosen, so this duration can vary significantly from one validator to the next.

<!-- **Can I run a full node and validator client on a Raspberry Pi?** <br />
TODO

**What are withdrawal keys and validator keys?** <br />
TODO: explain in context of this guide -->

import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />
