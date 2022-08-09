---
id: prepare-for-merge
title: Prepare for The Merge
sidebar_label: Prepare for The Merge
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import JwtGuidancePartial from '@site/docs/partials/_jwt-guidance-partial.md';


[The Merge](https://ethereum.org/en/upgrades/merge/) will fully transition Ethereum's consensus mechanism from proof-of-work to proof-of-stake. This is made possible by the [Beacon Chain](https://ethereum.org/en/upgrades/beacon-chain/), a new Ethereum network layer that implements proof-of-stake consensus. After The Merge, this consensus layer will be combined with Ethereum's execution layer, and miners will be fully replaced by proof-of-stake validators on Ethereum Mainnet.

This guide will walk you through the changes that you need to make in preparation for The Merge. Note that these instructions need to be followed **only if you're running on a testnet**. After the Goerli-Prater test network has been merged, this guidance will be updated with Mainnet guidance.

:::info New user?

This guidance is targeted at users who are already running Prysm. If you're starting from scratch, see our [Quickstart](./install/install-with-script.md).

**Not familiar with nodes, networks, and related terminology?** Consider reading [Nodes and networks](./concepts/nodes-networks.md) before proceeding.

:::


## The Merge: Before and after

| Before The Merge                                                                                               | After The Merge                                                                                                                          |
|----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| You don't need to run a local execution client. You can use a service like Infura instead.                     | You **do** need to run an execution client. You **can't** use a service like Infura.                                                     |
| The HTTP connection between beacon node and execution node doesn't need to be authenticated using a JWT token. | The HTTP connection between beacon node and execution node **does** need to be authenticated using a JWT token.                          |
| Beacon nodes connect to execution nodes on port `8545` by default when using HTTP.                             | Beacon nodes connect to execution nodes on port **`8551`** by default when using HTTP.                                                   |
| Miners receive transaction fee tips.                                                                           | **Validators** receive transaction fee tips. The "fee" is now a base fee that's burned - block producers earn only transaction fee tips. |
| A fee recipient address does not need to be specified.                                                         | A fee recipient address **does** need to be specified.                                                                                   |
| A 1TB hard drive is enough.                                                                                    | A **2TB+ SSD** is highly recommended.                                                                                                    |


<br />


Let's step through each of these changes. 

## Create JWT token

<JwtGuidancePartial />


## Configure validator node

Validator client configuration doesn't need to be updated for The Merge. A fee recipient address can optionally be configured on your validator node if you want redundancy or multiple fee recipient addresses. See [Configuring a Fee Recipient Address](./execution-node/fee-recipient.md) to learn more.

Note that **consensus-layer Sepolia is a permissioned network** - you can run a beacon node on Sepolia, but not a validator.


## Upgrade hardware

We recommend updating your hard drive to a 2TB+ SSD as soon as possible.

:::tip Congratulations!

You’re now ready for The Merge. If you have any questions, feel free ask them on our [Discord](https://discord.gg/prysmaticlabs).

:::


## Frequently asked questions

**I'm currently running a validator on Ethereum Mainnet. When should I make changes?**

You can make the above changes now. This document will be continuously updated with the latest recommended configuration.

**Can I use IPC post-Merge?**

Yes. You also won't have to worry about JWT if you use IPC. Refer to your clients' command-line documentation for IPC configuration parameters.

import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />