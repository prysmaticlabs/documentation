---
id: prepare-for-merge
title: Prepare for The Merge
sidebar_label: Prepare for The Merge
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import JwtGuidancePartial from '@site/docs/partials/_jwt-guidance-partial.md';

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

:::info New user?

This guidance is targeted at users who are already running Prysm. If you're starting from scratch, see our [Quickstart](./install/install-with-script.md).

:::



[Prysm v3](https://github.com/prysmaticlabs/prysm/releases/tag/v3.0.0) can be used to run a node on Mainnet using Merge-ready configuration. In this guide, we'll step through the tasks that you need to complete in order to be Merge-prepared. 


## Merge preparation checklist

Keep the following checklist in mind:

 - **Review v3 release notes in detail**: [Prysm v3](https://github.com/prysmaticlabs/prysm/releases/tag/v3.0.0) introduces many updates, deprecations, and breaking changes. Review the [release notes](https://github.com/prysmaticlabs/prysm/releases/tag/v3.0.0) to understand how this release impacts your configuration.
 - **Understand the high-level before and after**: The next section gives you a before/after picture of the items that you need to keep in mind while preparing for The Merge.
 - **Ensure that you're using a network-compatible version of your execution client**: You may need to use a prerelease version of execution client software. Refer to your execution client software documentation for the latest guidance.
 - **If you're using Geth, stay plugged in**: Geth 1.10.22 contains a regression that the team is actively working on. Update to <a href='https://github.com/ethereum/go-ethereum/releases'>v1.10.23+</a> if you haven't already.
 - **Ensure that you're using Prysm v3.0.0**: If you've ever set the `USE_PRYSM_VERSION` environment variable, either clear this variable via `UNSET USE_PRYSM_VERSION` (Linux/MacOS) / `set USE_PRYSM_VERSION=` (Windows), or use `set USE_PRYSM_VERSION=v3.0.0` to ensure that Prysm uses Prysm v3.
 - **Verify your version**: Verify that you're running Prysm `v3.0.0` by issuing the following command: `prysm.sh beacon-chain --version` (Linux) `prysm.bat beacon-chain --version` (Windows).
 - **Configure JWT**: If you're not using IPC to connect your beacon node and execution node, ensure that both your execution node and beacon node are configured to use JWT authentication. These instructions are included below, and are also available here: [Configure JWT](./execution-node/authentication.md).
 - **Update your firewall**: If you're not using IPC to connect your beacon node and execution node, your beacon node will need to connect to its execution node on port `8551`. Previously, port `8545` was used. Ensure that your firewall rules are updated accordingly.
  - **Configure a fee recipient address**: If you're running a validator, configuring a fee recipient address will allow you to earn what were previously miners' transaction fee tips. Instructions are provided below, and also here: [Configure a Fee Recipient address](./execution-node/fee-recipient.md).
 - (Power users) Review the Ethereum Launchpad's [Merge config checklist](https://notes.ethereum.org/@launchpad/merge-configuration-checklist).


## The Merge: Before and now

| Before                                                                                                         | Now                                                                                                                                      |
|----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| You don't need to run a local execution client. You can use a service like Infura instead.                     | You **do** need to run an execution client. You **can't** use a service like Infura.                                                     |
| The HTTP connection between beacon node and execution node doesn't need to be authenticated using a JWT token. | The HTTP connection between beacon node and execution node **does** need to be authenticated using a JWT token.                          |
| Beacon nodes connect to execution nodes on port `8545` by default when using HTTP.                             | Beacon nodes connect to execution nodes on port **`8551`** by default when using HTTP.                                                   |
| Miners receive transaction fee tips.                                                                           | **Validators** receive transaction fee tips. The "fee" is now a base fee that's burned - block producers earn only transaction fee tips. |
| A fee recipient address does not need to be specified.                                                         | A fee recipient address **does** need to be specified.                                                                                   |
| A 1TB hard drive is enough.                                                                                    | A **2TB+ SSD** is highly recommended.                                                                                                    |


<br />


Let's step through each of these changes. First, <strong>select a configuration</strong>:

import MultidimensionalContentControlsPartial from '@site/docs/partials/_multidimensional-content-controls-partial.md';

<MultidimensionalContentControlsPartial />

<div class='hide-tabs mergeprep-guide'>

<Tabs className="with-label hidden-in-jwt-guide" groupId="protocol" default="jwt" values={[
        {label: 'IPC', value: 'ipc'},
        {label: 'HTTP-JWT', value: 'jwt'},
    ]}>
    <TabItem value="ipc">

<h2>Configure execution node</h2>

<p>If your beacon node is connecting to your execution node using IPC, ensure that your execution node has been updated to the latest available stable version.</p>

<Tabs className="with-label" groupId="execution-clients" defaultValue="geth" values={[
  {label: 'Geth', value: 'geth'},
  {label: 'Nethermind', value: 'nethermind'},
  {label: 'Besu', value: 'besu'}
  ]}>
  <TabItem value="geth">See <a href='https://github.com/ethereum/go-ethereum/releases'>Geth's releases page</a> and join <a href='https://discord.gg/invite/nthXNEv'>their Discord</a> to stay up to date as we approach Mainnet Merge.</TabItem>
  <TabItem value="nethermind">See <a href='https://github.com/NethermindEth/nethermind/releases'>Nethermind's releases page</a> and join <a href='https://discord.com/invite/DedCdvDaNm'>their Discord</a> to stay up to date as we approach Mainnet Merge.</TabItem>
  <TabItem value="besu">See Besu's <a href='https://github.com/hyperledger/besu/releases'>releases page</a> and join <a href='https://discord.com/invite/hyperledger'>their Discord</a> to stay up to date as we approach Mainnet Merge.</TabItem>
</Tabs>

<h2>Configure beacon node</h2>

If you're running a validator, specifying a <code>suggested-fee-recipient</code> wallet address will allow you to earn what were previously miner transaction fee tips. See <a href='./execution-node/fee-recipient.md'>How to configure Fee Recipient</a> for more information about this feature.

</TabItem>
    <TabItem value="jwt">
    
<h2>Create JWT token</h2>

<JwtGuidancePartial />

    
</TabItem>
</Tabs>

</div>

## Configure validator node

Other than ensuring that you're using the [latest stable Prysm release](https://github.com/prysmaticlabs/prysm/releases), validator client configuration doesn't need to be updated for The Merge. A fee recipient address can optionally be configured on your validator node if you want redundancy or multiple fee recipient addresses. See [Configure a Fee Recipient address](./execution-node/fee-recipient.md) to learn more.

Note that **consensus-layer Sepolia is a permissioned network** - you can run a beacon node on Sepolia, but not a validator.


## Upgrade hardware

We recommend updating your hard drive to a 2TB+ SSD as soon as possible.

:::tip Congratulations!

You’re now ready for The Merge. If you have any questions, feel free ask them on our [Discord](https://discord.gg/prysmaticlabs).

:::


## Frequently asked questions

**I'm currently running a validator on Ethereum Mainnet. When should I make changes?** <br />
You can now make these changes, regardless of the network you're running on.

**Can I use IPC post-Merge?** <br />
Yes. You also won't have to worry about JWT if you use IPC. Refer to your clients' command-line documentation for IPC configuration parameters.

**Can I use a light node with Prysm, or do I need to run a full execution node?** <br />
No - at this time, a full node is required.


import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />