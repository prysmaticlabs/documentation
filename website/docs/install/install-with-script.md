---
id: install-with-script
title: How to Run an Ethereum Node and Stake ETH using Prysm
sidebar_label: Install Prysm, Run Node, Stake ETH
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Prysm is an implementation of the [Ethereum proof-of-stake consensus specification](https://github.com/ethereum/consensus-specs). In this guide, you’ll use Prysm to run a full Ethereum node [<a href='#footnote-1'>1</a>] and optionally a validator node [<a href='#footnote-2'>2</a>]. This will let you stake 32 ETH using hardware that you manage [<a href='#footnote-3'>3</a>].

This is a beginner-friendly guide. Familiarity with the command line is expected, but otherwise this guide makes no assumptions about your technical skills or prior knowledge. Beginners are encouraged to **follow the footnotes** throughout this guide - the footnotes provide context and links to learning resources.

## Step 1: Identify your goals and system requirements

<table>
    <tr>
    <th style={{minWidth: 180 + 'px'}}>Goal</th> 
        <th>Benefits</th>
        <th>Requirements</th>
    </tr>
    <tr>
      <td>Run a <strong>full node</strong></td>
      <td>
      Post-merge, a "full Ethereum client" or "full node" will refer to an <strong>execution node</strong> and <strong>beacon node</strong> working together. Running a full node comes with the following benefits [<a href='#footnote-4'>4</a>]: <br /><br />
      <ul> 
        <li>It contributes to the security of Ethereum's ecosystem [<a href='#footnote-3'>3</a>].</li>    
        <li>It lets you access the Ethereum network directly without having to trust a third party service [<a href='#footnote-5'>5</a>].</li> 
        <li>It lets you run a validator node.</li> 
      </ul> 
      </td>
      <td>
        <ul> 
          <li><strong>Software</strong>: Execution client, beacon node client (instructions below)</li>
          <li><strong>OS</strong>: 64-bit Linux, Mac OS X 10.14+, Windows 10+ 64-bit</li>   
          <li><strong>CPU</strong>: Something relatively modern. Intel Core i5-760 is a good min-bar.</li> 
          <li><strong>Memory</strong>: 16GB+ RAM</li> 
          <li><strong>Storage</strong>: SSD with at least 2TB free space</li> 
          <li><strong>Network</strong>: 8 MBit/sec broadband</li> 
        </ul> 
      </td>
    </tr>
    <tr>
        <td>Run a <strong>validator node</strong></td>
        <td>
        Lets you stake ETH, propose + validate blocks, and earn staking rewards.
        </td>
        <td>
          <ul> 
            <li><strong>Software:</strong> Full node (execution client + beacon node client), validator client, browser-based crypto wallet (instructions below)</li>    
            <li><strong>32 ETH (Mainnet)</strong></li>
            <li><strong>32 GöETH (Testnet)</strong></li> 
          </ul> 
        </td>
    </tr>
</table>

<div class="admonition admonition-caution alert alert--warning">
  <div class="admonition-content">
      <p><strong>Running an execution node will be required after The Merge</strong>. We strongly encourage you to begin running an execution client immediately.</p>
  </div>
</div>

If you can’t run a full node, TODO.

## Step 2: Review best practices

- **Ramp up on the foundations**. If you're new to Ethereum or proof-of-stake, read [A Beginner's Introduction to Prysm](todo) before proceeding [<a href='#footnote-6'>6</a>].
- **Try this guide on testnet first**, *then* mainnet.
- **Keep things simple**. This guidance assumes all client software will run on a single machine.
- **Review the latest advisories** for both [testnet](https://prater.launchpad.ethereum.org/en/overview) and [mainnet](https://launchpad.ethereum.org/en/).
- **Inbound and outbound firewall rules should be configured** on your machine before proceeding. Keep TCP `8545` closed. Keep TCP and UDP `30303` open so that other execution nodes can connect to your execution node.
- **Review all of our [published security best practices](./security-best-practices/)**.
- **Help is available** - reach out to the [Prysm Discord server](https://discord.com/invite/XkyZSSk4My), [r/ethstaker](https://www.reddit.com/r/ethstaker/), or the [EthStaker Discord server](https://discord.io/ethstaker) if you need a hand.



## Step 3: Install and configure an execution client

First, create a directory called `ExecutionLayer` on your SSD [<a href='#footnote-7'>7</a>]. Next, configure your execution client [<a href='#footnote-8'>8</a>].

<Tabs groupId="execution-clients" defaultValue="nethermind" values={[
{label: 'Nethermind', value: 'nethermind'},
{label: 'Besu', value: 'besu'},
{label: 'Geth', value: 'geth'}
]}>

  <TabItem value="nethermind">
    <p>Download the latest stable release of Nethermind for your operating system from the <a href='https://downloads.nethermind.io/'>Nethermind downloads page</a>. Run the following command from a terminal window [<a href='#footnote-9'>9</a>]:</p>
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
    <p>Your Nethermind execution node will begin syncing after you issue this command [<a href='#footnote-10'>10</a>]. This should take about two hours to complete. You can proceed to the next step while Nethermind syncs.</p>
  </TabItem>
  <TabItem value="besu">
    <p>Install the latest stable release of Besu by following the instructions on the <a href='https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Installation-Options/Install-Binaries/'>Besu binary distributions</a> page. Then, issue the following command from a terminal window [<a href='#footnote-9'>9</a>]:</p>
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
    <p>Your Besu execution node will begin syncing after you issue this command [<a href='#footnote-10'>10</a>]. This should take about two hours to complete. You can proceed to the next step while Besu syncs.</p>
  </TabItem>
  <TabItem value="geth">
    <div class="admonition admonition-caution alert alert--warning">
      <div class="admonition-content"><p><strong>Geth is a supermajority execution-layer client</strong>. We strongly encourage you to consider using either Nethermind or Besu. [<a href='#footnote-8'>8</a>]</p></div>
    </div>
    <p>Download and run the latest 64-bit stable release of the <strong>Geth installer</strong> for your operating system from the <a href='https://geth.ethereum.org/downloads/'>geth downloads page</a>. Run the following command from a terminal window [<a href='#footnote-9'>9</a>]:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>geth --http --datadir .</code></pre>
        <ul>
          <li><code>--http</code> exposes an http endpoint that your beacon node can later connect to.</li>
          <li><code>--datadir .</code> specifies the current directory (<code>ExecutionLayer</code>) as the location for the execution layer database.</li>
        </ul>
      </TabItem>
      <TabItem value="testnet">
        <pre><code>geth --goerli --http --datadir .</code></pre>
        <ul>
          <li><code>--goerli</code> connects to the Goerli execution-layer testnet.</li>
          <li><code>--http</code> exposes an http endpoint that your beacon node can later connect to.</li>
          <li><code>--datadir .</code> specifies the current directory (<code>ExecutionLayer</code>) as the location for the execution layer database.</li>
        </ul>
      </TabItem>
    </Tabs>
    <p>Your geth execution node will begin syncing after you issue this command [<a href='#footnote-10'>10</a>]. This should take about two hours to complete. You can proceed to the next step while geth syncs.</p>
  </TabItem>
</Tabs>


## Step 4: Install and configure a beacon node using Prysm

You should have an execution node running locally on `http://localhost:8545` before proceeding.

To verify that your execution node is properly configured and running on port `8545`, TODO. (geth has checking connectivity instuctions here -> https://geth.ethereum.org/docs/interface/peer-to-peer -> we can remove this if prysm's `curl` check verifies EL sync completion too)

Create a directory called `ConsensusLayer` on your SSD [<a href='#footnote-7'>7</a>]. Then, install and configure your beacon node.

<Tabs groupId="network" defaultValue="win" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <p>Navigate to your <code>ConsensusLayer</code> directory and run the following three commands from an Administrator command prompt:</p>

```
mkdir prysm && cd prysm
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.bat --output prysm.bat
reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1
```

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
      <p>Download the genesis state from github into your <code>ConsensusLayer</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
      <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8545 --prater --genesis-state=..\genesis.ssz</code></pre>
    </TabItem>
  </Tabs>
  </TabItem>
  <TabItem value="others">
    <p>Navigate to your <code>ConsensusLayer</code> directory and run the following two commands from your terminal:</p>

```
mkdir prysm && cd prysm
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh
```

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
      <p>Download the genesis state from github into your <code>ConsensusLayer</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
      <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8545 --prater --genesis-state=../genesis.ssz</code></pre>
    </TabItem>
  </Tabs>
  </TabItem>
</Tabs>

Your beacon node will now begin syncing [<a href='#footnote-7'>11</a>]. This usually takes a couple days, but it can take longer depending on your network and hardware specs.

:::tip Congratulations!

You’re now running a <strong>full Ethereum node</strong>. Your full node consists of an <strong>execution node</strong> in Ethereum’s execution layer, and a <strong>beacon node</strong> in Ethereum’s consensus layer.

:::




## Step 5: Install and configure a validator node using Prysm

:::info 33 ETH Required

Running a validator requires 33 ETH (for Mainnet) or 33 GöETH (for Testnet). Instructions for acquiring GöETH are provided below.s

:::

Before proceeding, ensure that your beacon node is fully synchronized by running the following command:

```
curl http://localhost:3500/eth/v1alpha1/node/syncing
```

(TODO: is that `v1alpha1` right? It worked when I tried it, but I wonder if a non-alpha alternative is available...)

When you see `{"syncing":false}%`, you’re ready to proceed. (TODO: does this output also guarantee that the EL is fully synced?)

While you’re waiting for your beacon node to sync, review the latest Ethereum Foundation validator advisories. Testnet advisories are available on the [Prater Staking Launchpad](https://prater.launchpad.ethereum.org/en/overview). Mainnet advisories are on the [Mainnet Staking Launchpad](https://launchpad.ethereum.org/en/overview).

Next, we’ll create an account with the [Ethereum Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli). We recommend doing this on a new, airgapped machine if possible [security best practices].

Download the latest stable version of the deposit CLI for your operating system from the [Staking Deposit CLI Releases page](https://github.com/ethereum/staking-deposit-cli/releases).


<Tabs groupId="network" defaultValue="win" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <p>Issue the following command from an Administrator command prompt, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>ConsensusLayer</code> folder.</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>deposit.exe new-mnemonic --num_validators=1 --mnemonic_language=english --folder=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
      </TabItem>
      <TabItem value="testnet">
        <pre><code>deposit.exe new-mnemonic --num_validators=1 --mnemonic_language=english --chain=prater --folder=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
      </TabItem>
    </Tabs>
    <p>Follow the CLI prompts to generate your keys. This will give you two artifacts:</p>
    <ol>
      <li>A <strong>new mnemonic seed phrase</strong>. This is highly sensitive and should be kept safe, secure, and airgapped.</li>
      <li>A <code>validator_keys</code> folder. This folder will contain two files:
        <ol>
          <li><code>deposit_data-*.json</code> - contains deposit data that you’ll later upload to the Ethereum launchpad.</li>
          <li><code>keystore-m_*.json</code> - contains your public key and (TODO).</li>
        </ol>
      </li>
    </ol>
    Issue the following command from your command prompt to import your keystores, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>ConsensusLayer</code> folder:<br/>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>prysm.bat validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>ConsensusLayer</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the [Mainnet Launchpad’s deposit data upload page](https://launchpad.ethereum.org/en/upload-deposit-data) and upload your `deposit_data-*.json` file. You’ll be prompted to connect your wallet.</p>
        <p>You can then proceed to deposit 32 ETH into the Mainnet deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure. Finally, head back to your command prompt and run the following command:</p>
        <pre><code>prysm.bat validator</code></pre>
      </TabItem>
      <TabItem value="testnet">
        <pre><code>prysm.bat validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>ConsensusLayer</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the [Prater Launchpad’s deposit data upload page](https://prater.launchpad.ethereum.org/en/upload-deposit-data) and upload your `deposit_data-*.json` file. You’ll be prompted to connect your wallet.</p>
        <p>If you need GöETH, head over to one of the following Discord servers:</p>
        <ul>
          <li><a href='https://discord.io/ethstaker'>r/EthStaker Discord</a></li>
          <li><a href='https://discord.com/invite/XkyZSSk4My'>Prysm Discord server</a>Prysm discord</li>
        </ul>
        <p>Someone should be able to give you the GöETH you need. You can then proceed to deposit 32 GöETH into the Prater testnet’s deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure. Finally, head back to your command prompt and run the following command:</p>
        <pre><code>prysm.bat validator --prater</code></pre>      
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="others">
    <p>Issue the following command from your terminal, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>ConsensusLayer</code> folder.</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>./deposit new-mnemonic --num_validators=1 --mnemonic_language=english --folder=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
      </TabItem>
      <TabItem value="testnet">
        <pre><code>./deposit new-mnemonic --num_validators=1 --mnemonic_language=english --chain=prater --folder=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
      </TabItem>
    </Tabs>
    <p>Follow the CLI prompts to generate your keys. This will give you two artifacts:</p>
    <ol>
      <li>A <strong>new mnemonic seed phrase</strong>. This is highly sensitive and should be kept safe, secure, and airgapped.</li>
      <li>A <code>validator_keys</code> folder. This folder will contain two files:
        <ol>
          <li><code>deposit_data-*.json</code> - contains deposit data that you’ll later upload to the Ethereum launchpad.</li>
          <li><code>keystore-m_*.json</code> - contains your public key and (TODO).</li>
        </ol>
      </li>
    </ol>
    Issue the following command from your terminal to import your keystores, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>ConsensusLayer</code> folder:<br/>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>./prysm.sh validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>ConsensusLayer</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://launchpad.ethereum.org/en/upload-deposit-data'>Mainnet Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>You can then proceed to deposit 32 ETH into the Mainnet deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure. Finally, head back to your command prompt and run the following command:</p>
        <pre><code>./prysm.sh validator</code></pre>
      </TabItem>
      <TabItem value="testnet">
        <pre><code>./prysm.sh validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>ConsensusLayer</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://prater.launchpad.ethereum.org/en/upload-deposit-data'>Prater Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>If you need GöETH, head over to one of the following Discord servers:</p>
        <ul>
          <li><a href='https://discord.io/ethstaker'>r/EthStaker Discord</a></li>
          <li><a href='https://discord.com/invite/XkyZSSk4My'>Prysm Discord server</a>Prysm discord</li>
        </ul>
        <p>Someone should be able to give you the GöETH you need. You can then proceed to deposit 32 GöETH into the Prater testnet’s deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure. Finally, head back to your command prompt and run the following command:</p>
        <pre><code>./prysm.sh validator --prater</code></pre>    
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

:::tip Congratulations! 

You’re now running a <strong>full Ethereum node</strong> and a <strong>validator node</strong>.

:::

It can take up to a day for your validator to become fully activated. To learn more about the validator activation process, see [Deposit Process](https://kb.beaconcha.in/ethereum-2.0-depositing). 

In the meantime, you should leave your **execution client**, **beacon node**, and **validator client** windows open and running. Once your validator is activated, it will immediately begin proposing and validating blocks. You can use a blockchain explorer like [beaconcha.in](https://beaconcha.in) or [beacon.etherscan.io](https://beacon.etherscan.io) to check the status of your validator. (TODO - elaborate)



## Next steps

 - Configure monitoring and alerts
 - Review advanced configuration
 - TODO



<br />

-------

**Footnotes:**

<strong id='footnote-1'>1.</strong> In Prysm docs, a <strong>full ethereum node</strong> refers to a node that's running both an execution-layer execution client (like Nethermind, Besu, or Geth) and a consensus-layer beacon node client (like Prysm, Lighthouse, or Nimbus). <br />
<strong id='footnote-2'>2.</strong> A <strong>validator node</strong> is a particular type of Ethereum node that runs Ethereum's proof-of-stake consensus protocol. Validator client software like Prysm allows you to stake 32 ETH as collateral in an agreement with the Ethereum network to honestly propose and attest to blocks. Running a validator node makes you a validator. Post-merge, validators will replace miners, and proof-of-stake will replace proof-of-work. <br />
<strong id='footnote-3'>3.</strong> "Staking at home" with your own hardware reduces our dependency on centralized cloud providers and increases the decentralization and security of the Ethereum ecosystem. Staking at home is a serious responsibility that comes with serious risks. Read our <a href='./security-best-practices'>Security Best Practices</a> to learn how to minimize those risks. <br />
<strong id='footnote-4'>4.</strong> See <a href='https://ethereum.org/en/developers/docs/nodes-and-clients/'>Nodes and Clients: Why should I run an Ethereum node?</a> for a more detailed exploration of node-running benefits. <br />
<strong id='footnote-5'>5.</strong> Self-sufficient participation in Ethereum aligns with the "Don't trust, verify" philosophy. <br />
<strong id='footnote-6'>6.</strong> Understanding how and why things work the way that they work can help you communicate with others when discussing configurations and troubleshooting issues. This is why we identify continuous self-education as a <a href='./security-best-practices'>security best practice</a>. <br />
<strong id='footnote-7'>7.</strong> Throughout this guide, we use <code>ConsensusLayer</code> and <code>ExecutionLayer</code> as directory names. Feel free to use your own directory names. <br />
<strong id='footnote-8'>8.</strong> Previously, this step wasn't required. Post-merge, you'll need to run an execution client locally if you want to run a beacon node or validator node. Geth is currently the supermajority execution client, so we encourage you to use an alternative like Nethermind or Besu. See <a href='https://ethresear.ch/t/applying-the-five-whys-to-the-client-diversity-problem/7628'>Applying the "Five Why's" to the Client Diversity Problem</a> to learn more. <br />
<strong id='footnote-9'>9.</strong> This guide uses a basic, default configuration for all clients, which should work well for most people. Detailed installation guidance is available for each client: <a href='https://docs.nethermind.io/nethermind/first-steps-with-nethermind/getting-started'>Nethermind</a>, <a href='https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Installation-Options/Install-Binaries/'>Besu</a>, <a href='https://geth.ethereum.org/docs/getting-started'>Geth</a>. <br />
<strong id='footnote-10'>10.</strong> Your execution client needs to download the entire blockchain - every block that's been produced after the genesis block.  <br />
<strong id='footnote-11'>11.</strong> TODO <br />
<strong id='footnote-12'>12.</strong> TODO <br />
<strong id='footnote-13'>13.</strong> TODO <br />
<strong id='footnote-14'>14.</strong> TODO <br />
<strong id='footnote-15'>15.</strong> TODO <br />



<br /><br /><br /><br /><br />

below this is old
---------------

<br />


If the eth2 chain has not yet started, the validator will be ready to start proposing blocks and signing votes as soon as the genesis time is reached.


![image](https://i.imgur.com/CDNc6Ft.png)

## Advanced Configuration and Key Management

For running an advanced wallet setups, our documentation includes comprehensive guides as to how to use the wallet built into Prysm to recover another wallet, use a remote signing server, and more. You can read more about it [here](https://docs.prylabs.network/docs/wallet/introduction).

**Congratulations, you are now fully participating in Ethereum proof-of-stake**

**Still have questions?** Stop by our [Discord](https://discord.gg/prysmaticlabs) for further assistance!
