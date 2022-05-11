---
id: install-with-script
title: How to Run an Ethereum Node and Stake ETH using Prysm
sidebar_label: Run an Ethereum Node and Stake ETH
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## How to Run an Ethereum Node and Stake ETH using Prysm

Prysm is an implementation of the [Ethereum proof-of-stake consensus specification](https://github.com/ethereum/consensus-specs). In this guide, you’ll learn how to run a full Ethereum node [todo - footnote] using Prysm. This will allow you to participate in the Ethereum ecosystem as a beacon node operator [todo - definition] and optionally as a validator [TODO: link to below definition or glossary].

This is a beginner-friendly guide. Familiarity with the command line is expected, but otherwise this guide makes no assumptions about your technical skills or prior knowledge.

## Identify your goals and system requirements

<table>
    <tr>
        <th>Goal</th>
        <th>Benefits</th>
        <th>Minimum requirements</th>
    </tr>
    <tr>
      <td>Run an execution node + beacon node</td>
      <td>
      Post-merge, this combination will represent an “full Ethereum client”, or a “full node”. Full nodes require both consensus-layer client software and execution-layer client software. <br /><br />
      Running a full node comes with the following benefits:
      <ul> 
        <li>It contributes to the security of Ethereum's ecosystem [todo: a note on how decentralization == security].</li>    
        <li>It also lets you access Ethereum’s global state directly without having to trust a third party service [todo].</li> 
        <li>It lets you run a validator node [todo]</li> 
      </ul> 
      </td>
      <td>
        <ul> 
          <li><strong>OS</strong>: 64-bit Linux, Mac OS X 10.14+, Windows 10+ 64-bit</li>    
          <li><strong>Memory</strong>: 16GB+ RAM</li> 
          <li><strong>Storage</strong>: SSD with at least 2TB free space</li> 
          <li><strong>Network</strong>: 8 MBit/sec download Internet service</li> 
          <li>TODO</li> 
        </ul> 
      </td>
    </tr>
    <tr>
        <td>Run a validator node</td>
        <td>
        Lets you stake ETH, propose + validate blocks, and earn staking rewards.
        </td>
        <td>
          <ul> 
            <li><strong>A full node</strong>: Execution node + beacon node running locally.</li>    
            <li><strong>32 ETH</strong></li> 
            <li>TODO</li> 
          </ul> 
        </td>
    </tr>
</table>

:::caution
Running an execution node will be required after The Merge. We strongly encourage you to begin running an execution client immediately.
:::

If you can’t run a full node, TODO.

## Best practices

- Try this guide on **testnet first, then mainnet** [footnote link to security best practices].
- Keep things simple. This guidance assumes all client software will run on a single machine.
- Review the latest advisories for both [testnet](https://prater.launchpad.ethereum.org/en/overview) and [mainnet](https://launchpad.ethereum.org/en/).
- Inbound and outbound firewall rules should be configured on your machine. Keep TCP `8545` closed. Keep TCP and UDP `30303` open so that other execution nodes can connect to your execution node.
- Review all of our published security best practices.
- Help is available - reach out to prysm discord, #ethstaker, r/ethstaker, or [invite.gg/ethstaker](http://invite.gg/ethstaker).

## Install and configure an execution client

First, create a directory called `ExecutionLayer` on your SSD (footnote: can be anything).

Next, select an execution client (footnote - todo).

<Tabs groupId="execution-clients" defaultValue="nethermind">

  <TabItem value="nethermind">
    <p>test 1 With html</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
      test 1 <p>With html</p>
      </TabItem>
      <TabItem value="win">
      test 2
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="besu">
  test 2
  </TabItem>
  <TabItem value="geth">
  test 3
  </TabItem>
</Tabs>
