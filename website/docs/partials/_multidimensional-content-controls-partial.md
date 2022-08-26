import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import {MultiDimensionalContentWidget} from '@site/src/components/MultiDimensionalContentWidget.js';

<MultiDimensionalContentWidget />

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
  <TabItem className="unclickable-element" value="label"></TabItem>
  <TabItem value="geth"></TabItem>
  <TabItem value="nethermind"></TabItem>
  <TabItem value="besu"></TabItem>
</Tabs>


<Tabs className="with-label hidden-in-jwt-guide" groupId="protocol" defaultValue="jwt" values={[
        {label: 'EN-BN connection:', value: 'label'},
        {label: 'IPC', value: 'ipc'},
        {label: 'HTTP-JWT', value: 'jwt'},
    ]}>
    <TabItem className="unclickable-element" value="label"></TabItem>
    <TabItem value="ipc"></TabItem>
    <TabItem value="jwt"></TabItem>
</Tabs>

</div>