---
id: install-with-script
title: How to Run an Ethereum Node and Stake ETH using Prysm
sidebar_label: Run an Ethereum Node and Stake ETH
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Prysm is an implementation of the [Ethereum proof-of-stake consensus specification](https://github.com/ethereum/consensus-specs). In this guide, you’ll learn how to run a full Ethereum node [<a href='#footnote-X'>TODO</a>] using Prysm. This will allow you to participate in the Ethereum ecosystem as a beacon node operator [<a href='#footnote-X'>TODO</a>] and optionally as a validator [<a href='#footnote-X'>TODO</a>].

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
        <li>It contributes to the security of Ethereum's ecosystem [<a href='#footnote-X'>TODO</a>].</li>    
        <li>It also lets you access Ethereum’s global state directly without having to trust a third party service [<a href='#footnote-X'>TODO</a>].</li> 
        <li>It lets you run a validator node [<a href='#footnote-X'>TODO</a>]</li> 
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

- Try this guide on **testnet first, then mainnet** [<a href='#footnote-X'>TODO</a>].
- Keep things simple. This guidance assumes all client software will run on a single machine.
- Review the latest advisories for both [testnet](https://prater.launchpad.ethereum.org/en/overview) and [mainnet](https://launchpad.ethereum.org/en/).
- Inbound and outbound firewall rules should be configured on your machine. Keep TCP `8545` closed. Keep TCP and UDP `30303` open so that other execution nodes can connect to your execution node.
- Review all of our [published security best practices](https://docs.prylabs.network/docs/security-best-practices/).
- Help is available - reach out to prysm discord, #ethstaker, r/ethstaker, or [invite.gg/ethstaker](http://invite.gg/ethstaker).

## Install and configure an execution client

First, create a directory called `ExecutionLayer` on your SSD [<a href='#footnote-X'>TODO - can be anything</a>].

Next, select an execution client [<a href='#footnote-X'>TODO</a>].

<Tabs groupId="execution-clients" defaultValue="nethermind" values={[
  {label: 'Nethermind', value: 'nethermind'},
  {label: 'Besu', value: 'besu'},
  {label: 'Geth', value: 'geth'}
]}>

  <TabItem value="nethermind">
    <p>Download the latest stable release of Nethermind for your operating system from the <a href='https://downloads.nethermind.io/'>Nethermind downloads page</a>. Run the following command from a terminal window:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>Nethermind.Runner --config mainnet --JsonRpc.Enabled true</code></pre>
        - `--config mainnet` connects to Mainnet.
        - `--JsonRpc.Enabled true` exposes an http endpoint that your beacon node can later connect to.
      </TabItem>
      <TabItem value="testnet">
        <pre><code>Nethermind.Runner --config goerli --JsonRpc.Enabled true</code></pre>
        - `--config goerli` connects to the Goerli execution-layer testnet.
        - `--JsonRpc.Enabled true` exposes an http endpoint that your beacon node can later connect to.
      </TabItem>
    </Tabs>
    <p>Your Nethermind execution node will begin syncing after you issue this command. This should take about two hours to complete. [<a href='#footnote-X'>TODO: Detailed Nethermind installation guidance is available on Nethermind’s documentation portal</a>]</p>
  </TabItem>
  <TabItem value="besu">
  test 2
  </TabItem>
  <TabItem value="geth">
  test 3
  </TabItem>
</Tabs>





Geth is currently the supermajority execution layer client. The security of Ethereum’s ecosystem depends on decentalization, so we recommend using a minority client.

### Step 6: Wait for your validator assignment

Please note it will take time for nodes in the network to process a deposit. To understand the timeline of becoming a validator and how long it takes on average, please read [this knowledge base](https://kb.beaconcha.in/ethereum-2.0-depositing). In the meantime, leave both terminal windows open and running; once the validator is activated by the ETH2 network, it will immediately begin receiving tasks and performing its responsibilities. If the eth2 chain has not yet started, the validator will be ready to start proposing blocks and signing votes as soon as the genesis time is reached.

To check on the status of your validator, we recommend checking out the popular block explorers: [beaconcha.in](https://beaconcha.in) by Bitfly and [beacon.etherscan.io](https://beacon.etherscan.io) by the Etherscan team.

![image](https://i.imgur.com/CDNc6Ft.png)

## Advanced Configuration and Key Management

For running an advanced wallet setups, our documentation includes comprehensive guides as to how to use the wallet built into Prysm to recover another wallet, use a remote signing server, and more. You can read more about it [here](https://docs.prylabs.network/docs/wallet/introduction).

**Congratulations, you are now fully participating in Ethereum proof-of-stake**

**Still have questions?** Stop by our [Discord](https://discord.gg/prysmaticlabs) for further assistance!