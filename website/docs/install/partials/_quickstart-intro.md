import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {MultiDimensionalQuickstartWidget} from '@site/src/components/MultiDimensionalQuickstartWidget.js';

<MultiDimensionalQuickstartWidget />

:::info Already running a node?

This guidance is targeted at new users. If you're already running a node, see [Prepare for The Merge](../prepare-for-merge.md).

:::

<br />

First, <strong>select a quickstart configuration</strong>. If you're looking for the simplest configuration, select `Geth` and `IPC`:

<div class='quickstart-tabs'>

<Tabs className="with-label" groupId="os" defaultValue="others" values={[
    {label: 'Operating system:', value: 'label'},
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem className="unclickable-element" value="label"></TabItem>
  <TabItem value="win"></TabItem>
  <TabItem value="others"></TabItem>
</Tabs>

<Tabs className="with-label" groupId="network" defaultValue="mainnet" values={[
        {label: 'Network:', value: 'label'},
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
    <TabItem className="unclickable-element" value="label"></TabItem>
    <TabItem value="mainnet"></TabItem>
    <TabItem value="goerli-prater"></TabItem>
    <TabItem value="sepolia"></TabItem>
    <TabItem value="ropsten"></TabItem>
</Tabs>

<Tabs className="with-label" groupId="execution-clients" defaultValue="geth" values={[
  {label: 'Execution client:', value: 'label'},
  {label: 'Geth', value: 'geth'},
  {label: 'Nethermind', value: 'nethermind'},
  {label: 'Besu', value: 'besu'}
  ]}>
  <TabItem value="geth"></TabItem>
  <TabItem value="label"></TabItem>
  <TabItem value="nethermind"></TabItem>
  <TabItem value="besu"></TabItem>
</Tabs>


<Tabs className="with-label" groupId="protocol" defaultValue="ipc" values={[
        {label: 'EN-BN connection:', value: 'label'},
        {label: 'IPC', value: 'ipc'},
        {label: 'HTTP-JWT', value: 'jwt'},
    ]}>
    <TabItem className="unclickable-element" value="label"></TabItem>
    <TabItem value="ipc"></TabItem>
    <TabItem value="jwt"></TabItem>
</Tabs>

</div>

## Introduction



Prysm is an implementation of the [Ethereum proof-of-stake consensus specification](https://github.com/ethereum/consensus-specs). In this quickstart, you’ll use Prysm to run an Ethereum node and optionally a validator. This will let you stake 32 ETH using hardware that you manage.

This is a beginner-friendly guide. Familiarity with the command line is expected, but otherwise this guide makes no assumptions about your technical skills or prior knowledge.

At a high level, we'll walk through the following flow:

 1. Configure an **execution node** using an execution-layer client.
 2. Configure a **beacon node** using Prysm, a consensus-layer client.
 3. Configure a **validator** and stake ETH using Prysm (optional).

<br />

:::info Knowledge Check

**Not familiar with nodes, networks, and related terminology?** Consider reading [Nodes and networks](../concepts/nodes-networks.md) before proceeding. 

:::

