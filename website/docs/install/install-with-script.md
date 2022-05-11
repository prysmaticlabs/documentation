---
id: install-with-script
title: How to Run an Ethereum Node and Stake ETH using Prysm
sidebar_label: Run an Ethereum Node and Stake ETH
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Prysm is an implementation of the [Ethereum proof-of-stake consensus specification](https://github.com/ethereum/consensus-specs). In this guide, you’ll use Prysm to run a full Ethereum node [<a href='#footnote-X'>TODO</a>] and optionally a validator node. This will let you stake 32 ETH using hardware that you manage [<a href='#footnote-X'>TODO</a>].

This is a beginner-friendly guide. Familiarity with the command line is expected, but otherwise this guide makes no assumptions about your technical skills or prior knowledge.

## Identify your goals and system requirements

<table>
    <tr>
        <th>Goal</th>
        <th>Benefits</th>
        <th>Requirements</th>
    </tr>
    <tr>
      <td>Run an execution node + beacon node</td>
      <td>
      Post-merge, this combination will represent an “full Ethereum client”, or a “full node”. Full nodes require both consensus-layer client software and execution-layer client software. <br /><br />
      Running a full node comes with the following benefits: <br /><br />
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

<div class="admonition admonition-caution alert alert--warning">
  <div class="admonition-content">
      <p>Running an execution node will be required after The Merge. We strongly encourage you to begin running an execution client immediately.</p>
  </div>
</div>

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
        <ul>
          <li><code>--config mainnet</code> connects to Mainnet.</li>
          <li><code>--JsonRpc.Enabled true</code> exposes an http endpoint that your beacon node can later connect to.</li>
        </ul>
      </TabItem>
      <TabItem value="testnet">
        <pre><code>Nethermind.Runner --config goerli --JsonRpc.Enabled true</code></pre>
        <ul>
          <li><code>--config goerli</code> connects to the Goerli execution-layer testnet.</li>
          <li><code>--JsonRpc.Enabled true</code> exposes an http endpoint that your beacon node can later connect to.</li>
        </ul>
      </TabItem>
    </Tabs>
    <p>Your Nethermind execution node will begin syncing after you issue this command. This should take about two hours to complete. [<a href='#footnote-X'>TODO: Detailed Nethermind installation guidance is available on Nethermind’s documentation portal</a>]</p>
  </TabItem>
  <TabItem value="besu">
    <p>Install the latest stable release of Besu by following the instructions on the <a href='https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Installation-Options/Install-Binaries/'>Besu binary distributions</a> page.</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>besu --network=mainnet --rpc-http-enabled</code></pre>
        <ul>
          <li><code>--network=mainnet</code> connects to Mainnet.</li>
          <li><code>--rpc-http-enabled</code> exposes an http endpoint that your beacon node can later connect to.</li>
        </ul>
      </TabItem>
      <TabItem value="testnet">
        <pre><code>besu --network=goerli --rpc-http-enabled</code></pre>
        <ul>
          <li><code>--network=goerli</code> connects to the Goerli execution-layer testnet.</li>
          <li><code>--rpc-http-enabled</code> exposes an http endpoint that your beacon node can later connect to.</li>
        </ul>
      </TabItem>
    </Tabs>
    <p>Your Besu execution node will begin syncing after you issue this command. This should take about two hours to complete. [<a href='#footnote-X'>TODO: Detailed Besu installation guidance is available on [Besu’s documentation portal](https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Starting-node/).</a>]</p>
  </TabItem>
  <TabItem value="geth">
    <div class="admonition admonition-caution alert alert--warning">
      <div class="admonition-content"><p>Geth is a supermajority execution-layer client. We strongly encourage you to consider using either Nethermind or Besu. [todo]</p></div>
    </div>
    <p>Download and run the latest 64-bit stable release of the <strong>Geth installer</strong> for your operating system from the <a href='https://geth.ethereum.org/downloads/'>geth downloads page</a>. Run the following command from a terminal window:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>geth --http --datadir .</code></pre>
        <ul>
          <li><code>--http</code> exposes an http endpoint that your beacon node can later connect to.</li>
          <li><code>--datadir .</code> specifies the current directory (ExecutionLayer) as the location for the execution layer database [<a href='#footnote-X'>TODO</a>].</li>
        </ul>
      </TabItem>
      <TabItem value="testnet">
        <pre><code>geth --goerli --http --datadir .</code></pre>
        <ul>
          <li><code>--goerli</code> connects to the Goerli execution-layer testnet.</li>
          <li><code>--http</code> exposes an http endpoint that your beacon node can later connect to.</li>
          <li><code>--datadir .</code> specifies the current directory (ExecutionLayer) as the location for the execution layer database [<a href='#footnote-X'>TODO</a>].</li>
        </ul>
      </TabItem>
    </Tabs>
    <p>Your geth execution node will begin syncing after you issue this command. This should take about two hours to complete. [<a href='#footnote-X'>TODO: Detailed geth installation guidance is available on geth’s documentation portal.</a>]</p>
  </TabItem>
</Tabs>


## Install and configure a beacon node using Prysm

You should have an execution node running locally on `http://localhost:8545` before proceeding.

To verify that your execution node is properly configured and running, TODO.

Create a directory called `ConsensusLayer` on your SSD [todo: this can be anything]. Navigate to this directory from your terminal.


<Tabs groupId="network" defaultValue="mainnet" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <p>Navigate to your <code>ConsensusLayer</code> directory and run the following three commands from an Administrator command prompt:</p>
    <pre><code>
      <span class='token-line'>mkdir prysm && cd prysm</span>
      <span class='token-line'>curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.bat --output prysm.bat</span>
      <span class='token-line'>reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1</span>
    </code></pre>
    <p>This will download the Prysm client and update your registry to enable verbose logging.</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <p>Use the following command to start a beacon node that connects to your local execution node:</p>
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8545</code></pre>
      </TabItem>
      <TabItem value="testnet">
        <p>Download the genesis state from github into your ConsensusLayer directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8545 --prater --genesis-state=..\genesis.ssz</code></pre>
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="others">
    <p>Navigate to your <code>ConsensusLayer</code> directory and run the following two commands from your terminal:</p>
    <pre><code>
        <span class='token-line'>mkdir prysm && cd prysm</span>
        <span class='token-line'>curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh</span>
    </code>
    </pre>
    <p>This will download the Prysm client and and make it executable.</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <p>Use the following command to start a beacon node that connects to your local execution node:</p>
        <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8545</code></pre>
      </TabItem>
      <TabItem value="testnet">
        <p>Download the genesis state from github into your ConsensusLayer directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8545 --prater --genesis-state=../genesis.ssz</code></pre>
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

Your beacon node will now begin syncing [todo: explain what happens]. This usually takes a couple days, but it can take longer depending on your network and hardware specs.

Congratulations! You’re now running a full Ethereum node. Your full node consists of an execution node in Ethereum’s execution layer, and a beacon node in Ethereum’s consensus layer:

![Full Ethereum node](../../static/img/beacon-node-and-execution-node.png)


-----------
<br /><br /><br /><br /><br /><br /><br />



### Step 6: Wait for your validator assignment

Please note it will take time for nodes in the network to process a deposit. To understand the timeline of becoming a validator and how long it takes on average, please read [this knowledge base](https://kb.beaconcha.in/ethereum-2.0-depositing). In the meantime, leave both terminal windows open and running; once the validator is activated by the ETH2 network, it will immediately begin receiving tasks and performing its responsibilities. If the eth2 chain has not yet started, the validator will be ready to start proposing blocks and signing votes as soon as the genesis time is reached.

To check on the status of your validator, we recommend checking out the popular block explorers: [beaconcha.in](https://beaconcha.in) by Bitfly and [beacon.etherscan.io](https://beacon.etherscan.io) by the Etherscan team.

![image](https://i.imgur.com/CDNc6Ft.png)

## Advanced Configuration and Key Management

For running an advanced wallet setups, our documentation includes comprehensive guides as to how to use the wallet built into Prysm to recover another wallet, use a remote signing server, and more. You can read more about it [here](https://docs.prylabs.network/docs/wallet/introduction).

**Congratulations, you are now fully participating in Ethereum proof-of-stake**

**Still have questions?** Stop by our [Discord](https://discord.gg/prysmaticlabs) for further assistance!
