---
id: install-with-script
title: Quickstart - Run an Ethereum Node and Stake ETH using Prysm
sidebar_label: Quickstart
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Prysm is an implementation of the [Ethereum proof-of-stake consensus specification](https://github.com/ethereum/consensus-specs) [<a href='#footnote-1'>1</a>]. In this guide, you’ll use Prysm to run a full Ethereum node [<a href='#footnote-2'>2</a>] and optionally a validator node [<a href='#footnote-3'>3</a>]. This will let you stake 32 ETH using hardware that you manage [<a href='#footnote-4'>4</a>].

This is a beginner-friendly guide. Familiarity with the command line is expected, but otherwise this guide makes no assumptions about your technical skills or prior knowledge. Beginners are encouraged to **follow the footnotes** throughout this guide - the footnotes provide context and links to learning resources [<a href='#footnote-5'>5</a>].

## Step 1: Identify your goals and system requirements

<!--<li><strong>Knowledge</strong>: <a>A Beginner's Guide to Prysm (TODO)</a></li>-->

<table>
    <tr>
    <th style={{minWidth: 180 + 'px'}}>Goal</th> 
        <th>Benefits</th>
        <th>Requirements</th>
    </tr>
    <tr>
      <td>Run a <strong>full node</strong></td>
      <td>
      Post-merge, a "full Ethereum client" or "full node" will refer to an <strong>execution node</strong> and <strong>beacon node</strong> working together. Running a full node comes with the following benefits [<a href='#footnote-6'>6</a>]: <br /><br />
      <ul> 
        <li>It contributes to the security of Ethereum's ecosystem [<a href='#footnote-4'>4</a>].</li>    
        <li>It lets you access the Ethereum network directly without having to trust a third party service [<a href='#footnote-7'>7</a>].</li> 
        <li>It lets you run a validator node post-Merge.</li> 
      </ul> 
      </td>
      <td>
        <ul> 
          <li><strong>Software</strong>: Execution client, beacon node client (instructions below), <a href='https://curl.se/download.html'>curl</a></li>
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
            <li><strong>Everything above, plus...</strong></li>    
            <li><strong>Software:</strong> Validator client, browser-based crypto wallet (instructions below)</li>   
            <li><strong>Hardware:</strong> (Recommended) A new machine that has never been connected to the internet. You'll use this to securely generate your mnemonic phrase and keypair.</li>     
            <li><strong>32 ETH (Mainnet)</strong></li>
            <li><strong>32 GöETH (Testnet)</strong></li> 
          </ul> 
        </td>
    </tr>
</table>

<div class="admonition admonition-caution alert alert--warning">
  <div class="admonition-content">
      <p><strong>Running an execution node will be required after The Merge</strong>. We strongly encourage you to <a href='#step-3-run-an-execution-client'>begin running an execution client</a> (like Nethermind, Besu, or Geth) immediately.</p>
  </div>
</div>

If you don't have 32 ETH to stake, <a href='https://ethereum.org/en/staking/pools/'>pooled staking</a> gives you a way to stake with less than 32 ETH. If you can't run a full node, <a href='https://ethereum.org/en/staking/saas/'>staking as a service</a> lets you delegate hardware management to a third party.


## Step 2: Review best practices

<!-- - **Ramp up on the foundations**. If you're new to Ethereum or proof-of-stake, read [A Beginner's Introduction to Prysm](todo) before proceeding [<a href='#footnote-7'>7</a>]. -->
- **Try this guide on testnet first**, *then* mainnet.
- **Keep things simple**. This guidance assumes all client software will run on a single machine.
- **Review the latest advisories** for both [testnet](https://prater.launchpad.ethereum.org/en/overview) and [mainnet](https://launchpad.ethereum.org/en/).
- Review all of our [published security best practices](./security-best-practices/).
- **Join the community** - join our [mailing list](https://groups.google.com/g/prysm-dev), the [Prysm Discord server](https://discord.com/invite/XkyZSSk4My), [r/ethstaker](https://www.reddit.com/r/ethstaker/), and the [EthStaker Discord server](https://discord.io/ethstaker) for updates and support.


## Step 3: Run an execution client

:::info

If you'd like to run your execution client on the **Ropsten** execution-layer test network, replace `goerli` with `ropsten` in the Testnet guidance below and apply the TTD configuration specified in the latest <a href='https://blog.ethereum.org/2022/06/03/ropsten-merge-ttd/'>Ropsten TTD Announcement</a>. Execution layer clients will require JWT and Engine API parameters to be configured as well. This quickstart will soon be updated to incorporate Ropsten-specific configuration details across EL clients - in the meantime, be sure to visit your execution client's documentation for the latest Ropsten-specific guidance. 

:::


First, ensure that TCP port `8545` is closed. Consider keeping TCP and UDP ports `30303` open to support other execution nodes [<a href='#footnote-8'>8</a>].

Next, create a directory called `ExecutionLayer` [<a href='#footnote-9'>9</a>] on your SSD. This is where your execution client will store its data.

<Tabs groupId="execution-clients" defaultValue="nethermind" values={[
{label: 'Nethermind', value: 'nethermind'},
{label: 'Besu', value: 'besu'},
{label: 'Geth', value: 'geth'}
]}>

  <TabItem value="nethermind">
    <p>Download the latest stable release of Nethermind for your operating system from the <a href='https://downloads.nethermind.io/'>Nethermind downloads page</a>. Extract the contents into your <code>ExecutionLayer</code> folder. Run the following command to start your execution node:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>Nethermind.Runner --config mainnet --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true</code></pre>
        <ul>
          <li><code>--config mainnet</code> connects to Mainnet.</li>
          <li><code>--JsonRpc.Enabled true</code> exposes an http endpoint that your beacon node can later connect to.</li>
          <li><code>--HealthChecks.Enabled true</code> exposes an http endpoint that you can use to query the health of your Nethermind node.</li>
          <li><code>--HealthChecks.UIEnabled true</code> exposes a friendly UI that you can use to inspect the health of your Nethermind node.</li>
        </ul>
      </TabItem>
      <TabItem value="testnet">
        <pre><code>Nethermind.Runner --config goerli --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true</code></pre>
        <ul>
          <li><code>--config goerli</code> connects to the Goerli execution-layer testnet.</li>
          <li><code>--JsonRpc.Enabled true</code> exposes an http endpoint that your beacon node can later connect to.</li>
          <li><code>--HealthChecks.Enabled true</code> exposes an http endpoint that you can use to query the health of your Nethermind node.</li>
          <li><code>--HealthChecks.UIEnabled true</code> exposes a friendly UI that you can use to inspect the health of your Nethermind node.</li>
        </ul>
      </TabItem>
    </Tabs>
    <p>Your Nethermind execution node will begin syncing. This should take about two hours to complete. You can <a href='https://docs.nethermind.io/nethermind/ethereum-client/monitoring-node-health'>check your Nethermind execution node's sync status</a> by navigating to <a href='http://localhost:8545/healthchecks-ui'><code>http://localhost:8545/healthchecks-ui</code></a> or by running the following command from a separate terminal window:</p>

```
curl localhost:8545/health
```

  <p>A sync status of <code>false</code> indicates that your node is fully synced. You can proceed to the next step while Nethermind syncs.</p>
  </TabItem>
  <TabItem value="besu">
    <p>Ensure that the latest 64-bit version of the <a href='https://www.oracle.com/java/technologies/downloads/'>Java JDK</a> is installed. Download the latest stable release of Besu from the <a href='https://github.com/hyperledger/besu/releases'>Besu releases</a> page. OS-specific instructions are available on Besu's <a href='https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Installation-Options/Install-Binaries/'>binary installation page</a>. Run the following command to start your execution node:</p>
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
    <p>Your Besu execution node will begin syncing. You can <a href='https://besu.hyperledger.org/en/stable/Reference/API-Methods/#eth_syncing'>check your Besu execution node's sync status</a> by running the following command from a separate terminal window:</p>

```
curl -H "Content-Type: application/json" -X POST http://localhost:8545 -d "{""jsonrpc"":""2.0"",""method"":""eth_syncing"",""params"":[],""id"":51}" 
```

  <p>A sync status of <code>false</code> indicates that your node is fully synced. You can proceed to the next step while Besu syncs.</p>
  </TabItem>
  <TabItem value="geth">
    <div class="admonition admonition-caution alert alert--warning">
      <div class="admonition-content"><p><strong>Geth is a supermajority execution-layer client</strong>. This centralization poses an active risk to the security of Ethereum. If Geth's code contains a bug, a majority of nodes (and L2s, and users) will be impacted. We strongly encourage you to use either Nethermind or Besu to distribute this risk for the ecosystem. [<a href='#footnote-10'>10</a>]</p></div>
    </div>
    <p>Download and run the latest 64-bit stable release of the <strong>Geth installer</strong> for your operating system from the <a href='https://geth.ethereum.org/downloads/'>Geth downloads page</a>. Navigate to your <code>ExecutionLayer</code> directory and run the following command to start your execution node:</p>
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
    <p>Your Geth execution node will begin syncing. You can <a href='https://besu.hyperledger.org/en/stable/Reference/API-Methods/#eth_syncing'>check your Geth execution node's sync status</a> by running the following commands from a separate terminal window:</p>

```
geth attach // if you're not using Windows
geth attach ipc:\\.\pipe\geth.ipc // if you're using Windows 
eth.syncing
```

  <p>A sync status of <code>false</code> indicates that your node is fully synced. You can proceed to the next step while Geth syncs.</p>
  </TabItem>
</Tabs>

:::tip Congratulations!

You’re now running an <strong>execution node</strong> in Ethereum’s execution layer.

:::


## Step 4: Run a beacon node using Prysm

Create a directory called `ConsensusLayer` on your SSD [<a href='#footnote-7'>7</a>].


:::info

If you'd like to run your beacon node on the **Ropsten** consensus-layer test network, use <a href='https://github.com/prysmaticlabs/prysm/releases/v2.1.3-rc.3'>Prysm v2.1.3-rc.3</a>, replace `prater` with `ropsten` in the Testnet guidance below, use the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state</a> instead of the Prater genesis state, add an environment variable for `USE_PRYSM_VERSION=v2.1.3-rc.3`, and apply the TTD configuration specified in the latest <a href='https://blog.ethereum.org/2022/06/03/ropsten-merge-ttd/'>Ropsten TTD Announcement</a>. Be sure to target port `8551` as the `http-web3provider`. This quickstart will soon be updated with improved Ropsten-specific configuration details.

:::

<Tabs groupId="network" defaultValue="win" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <p>Navigate to your <code>ConsensusLayer</code> directory and run the following three commands:</p>

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
      <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>genesis state from Github</a> into your <code>ConsensusLayer/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
      <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8545 --prater --genesis-state=genesis.ssz</code></pre>
    </TabItem>
  </Tabs>
  </TabItem>
  <TabItem value="others">
    <div class="admonition admonition-caution alert alert--warning">
      <div class="admonition-content"><p><strong>Mac M1 ARM chips</strong> currently require users to run Prysm through <a href='https://support.apple.com/en-us/HT211861'>Rosetta</a>. See our <a href='https://github.com/prysmaticlabs/prysm/issues/9385'>open bug</a> for details.</p></div>
    </div>
    <p>Navigate to your <code>ConsensusLayer</code> directory and run the following two commands:</p>

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

Your beacon node will now begin syncing. This usually takes a couple days, but it can take longer depending on your network and hardware specs.

You can check your beacon node's <a href='https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Node/getSyncingStatus'>sync status</a> by running the following command from a separate terminal window:

```
curl http://localhost:3500/eth/v1/node/syncing
```

This will produce the following output:


```
{"data":{"head_slot":"6944","sync_distance":"3003133","is_syncing":true,"is_optimistic":true}}
```

When you see `"is_syncing":false`, your beacon node is fully synchronized with the beacon chain. When you see `"is_optimistic":false`, your execution node is fully synchronized with the execution-layer blockchain. 

```
TODO: is_optimistic is not yet implemented -> https://github.com/prysmaticlabs/prysm/pull/10692 

TODO: `Checking DB database-path=C:\Users\newuser\AppData\Local\Eth2\beaconchaindata` <- how to configure this directory?
```


:::tip Congratulations!

You’re now running a <strong>full Ethereum node</strong>. Your full node consists of an <strong>execution node</strong> in Ethereum’s execution layer, and a <strong>beacon node</strong> in Ethereum’s consensus layer.

:::



## Step 5: Run a validator node using Prysm

:::info ETH Required

Running a validator requires 32.1 ETH (for Mainnet), 32.1 GöETH (for Goerli testnet), and 32.1 Ropsten-ETH (for Ropsten testnet). Instructions for acquiring testnet ETH are provided below. This section will be updated to provide Ropsten test network guidance soon.

:::

Review the latest Ethereum Foundation validator advisories. Testnet advisories are available on the [Prater Staking Launchpad](https://prater.launchpad.ethereum.org/en/overview). Mainnet advisories are on the [Mainnet Staking Launchpad](https://launchpad.ethereum.org/en/overview).

Next, we'll create an account with the [Ethereum Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli). Before proceeding, we recommend temporarily moving over to a new, <strong>airgapped machine</strong> if possible. This will reduce the risk that your private key is exposed to an adversary. We'll carry an encrypted version of your private key to your primary machine after creating your account on an airgapped machine.

Download the latest stable version of the deposit CLI from the [Staking Deposit CLI Releases page](https://github.com/ethereum/staking-deposit-cli/releases).

<Tabs groupId="network" defaultValue="win" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <p>Run the following command to create your mnemonic phrase and keys:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>deposit.exe new-mnemonic --num_validators=1 --mnemonic_language=english</code></pre>
      </TabItem>
      <TabItem value="testnet">
        <pre><code>deposit.exe new-mnemonic --num_validators=1 --mnemonic_language=english --chain=prater</code></pre>
      </TabItem>
    </Tabs>
    <p>Follow the CLI prompts to generate your keys. This will give you two artifacts:</p>
    <ol>
      <li>A <strong>new mnemonic seed phrase</strong>. This is <strong>highly sensitive</strong> and should never be exposed to other people or networked hardware.</li>
      <li>A <code>validator_keys</code> folder. This folder will contain two files:
        <ol>
          <li><code>deposit_data-*.json</code> - contains deposit data that you’ll later upload to the Ethereum launchpad.</li>
          <li><code>keystore-m_*.json</code> - contains your public key and encrypted private key [<a href='#footnote-13'>13</a>].</li>
        </ol>
      </li>
    </ol>
    Copy the <code>validator_keys</code> folder to your primary machine's <code>ConsensusLayer</code> folder. Run the following command to import your keystores, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>ConsensusLayer/validator_keys</code> folder:<br/>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>prysm.bat validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>ConsensusLayer</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://launchpad.ethereum.org/en/upload-deposit-data'>Mainnet Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>You can then deposit 32 ETH into the Mainnet deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure.</p> 
        <p>Finally, run the following command to start your validator node, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>ConsensusLayer</code> folder:</p>
        <pre><code>prysm.bat validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
      </TabItem>
      <TabItem value="testnet">
        <pre><code>prysm.bat validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>ConsensusLayer</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://prater.launchpad.ethereum.org/en/upload-deposit-data'>Prater Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>If you need GöETH, head over to one of the following Discord servers:</p>
        <ul>
          <li><a href='https://discord.io/ethstaker'>r/EthStaker Discord</a></li>
          <li><a href='https://discord.com/invite/XkyZSSk4My'>Prysm Discord server</a></li>
        </ul>
        <p>Someone should be able to give you the GöETH you need. You can then deposit 32 GöETH into the Prater testnet’s deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure - <strong>never send real ETH to the testnet deposit contract.</strong> Finally, run the following command to start your validator node, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>ConsensusLayer</code> folder:</p>
        <pre><code>prysm.bat validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>      
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="others">
    <p>Run the following command to create your mnemonic phrase and keys:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>./deposit new-mnemonic --num_validators=1 --mnemonic_language=english</code></pre>
      </TabItem>
      <TabItem value="testnet">
        <pre><code>./deposit new-mnemonic --num_validators=1 --mnemonic_language=english --chain=prater</code></pre>
      </TabItem>
    </Tabs>
    <p>Follow the CLI prompts to generate your keys. This will give you two artifacts:</p>
    <ol>
      <li>A <strong>new mnemonic seed phrase</strong>. This is <strong>highly sensitive</strong> and should never be exposed to other people or networked hardware.</li>
      <li>A <code>validator_keys</code> folder. This folder will contain two files:
        <ol>
          <li><code>deposit_data-*.json</code> - contains deposit data that you’ll later upload to the Ethereum launchpad.</li>
          <li><code>keystore-m_*.json</code> - contains your public key and encrypted private key [<a href='#footnote-13'>13</a>].</li>
        </ol>
      </li>
    </ol>
    Copy the <code>validator_keys</code> folder to your primary machine's <code>ConsensusLayer</code> folder. Run the following command to import your keystores, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>ConsensusLayer/validator_keys</code> folder:<br/>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Testnet', value: 'testnet'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>./prysm.sh validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>ConsensusLayer</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://launchpad.ethereum.org/en/upload-deposit-data'>Mainnet Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>You can then deposit 32 ETH into the Mainnet deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure. Finally, run the following command to start your validator node, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>ConsensusLayer</code> folder:</p>
        <pre><code>./prysm.sh validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
      </TabItem>
      <TabItem value="testnet">
        <pre><code>./prysm.sh validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>ConsensusLayer</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://prater.launchpad.ethereum.org/en/upload-deposit-data'>Prater Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>If you need GöETH, head over to one of the following Discord servers:</p>
        <ul>
          <li><a href='https://discord.io/ethstaker'>r/EthStaker Discord</a></li>
          <li><a href='https://discord.com/invite/XkyZSSk4My'>Prysm Discord server</a></li>
        </ul>
        <p>Someone should be able to give you the GöETH you need. You can then deposit 32 GöETH into the Prater testnet’s deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure - <strong>never send real ETH to the testnet deposit contract.</strong>  Finally, run the following command to start your validator node, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>ConsensusLayer</code> folder:</p>
        <pre><code>./prysm.sh validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>    
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

<br />

:::tip Congratulations! 

You’re now running a <strong>full Ethereum node</strong> and a <strong>validator node</strong>.

:::

<br />

It can take up to a day for your validator to become fully activated. To learn more about the validator activation process, see [Deposit Process](https://kb.beaconcha.in/ethereum-2.0-depositing). 

In the meantime, you should leave your **execution client**, **beacon node**, and **validator client** windows open and running. Once your validator is activated, it will automatically begin proposing and validating blocks. You can paste your validator's public key (available in your `deposit_data-*.json` file) into a blockchain explorer to check the status of your validator:

 - [Beaconcha.in (Mainnet)](https://beaconcha.in) 
 - [Beaconchai.in (Testnet)](https://prater.beaconcha.in/)


## Frequently asked questions

<!-- **I'm new to Ethereum, and I'm a visual learner. Can you show me how these things work?** <br />
The Beginner's Introduction to Prysm uses diagrams to help you visualize Ethereum's architecture, and Prysm's too. (TODO) -->

**Why do you recommend putting everything on a single machine?** <br />
Keeping all of your client software on a single machine keeps things simple, which aligns with our [security best practices](./../security-best-practices.md).


<!-- **I'm new to Ethereum, and I'm a visual learner. Can you show me how these things work? How much disk space does each node type require?** <br />
The Beginner's Introduction to Prysm uses diagrams to help you visualize Ethereum's architecture, and Prysm's too. (TODO) -->



<!-- **I don't have a 2TB SSD, but I have multiple smaller SSDs. Will this work?** <br />
Yes. You can tell your execution client to overflow into a specific drive by (TODO). You can tell your beacon node client to overflow into a specific drive by (TODO). You can tell your validator node client to overflow into a specific drive by (TODO). -->

**Can I use an external SSD connected via USB?** <br />
Yes, but your USB connection introduces a possible point of failure. If you do this, avoid connecting your SSD to your computer through a USB hub - instead, connect it directly.

**Can I use a light client as my local execution client so I don't have to download so much data?**  <br />
No, a full execution node is needed.

**Why do I need to run my own execution client?** <br />
The Merge introduces a new Engine API that allows consensus-layer clients to communicate with execution-layer clients. Teku docs contain a great explainer here: <a href='https://docs.teku.consensys.net/en/latest/Concepts/Merge/'>The Merge</a>.
<!--TODO: develop our own knowledge base with conceptual content -->

**What happens if my execution client goes down? Will I be penalized?** <br />
Yes. Downtime penalties are minimal [<a href='#footnote-14'>14</a>] but we recommend having uptime and downtime alerts configured for your execution, beacon, and validator nodes [<a href='#footnote-15'>15</a>].

**Why are there two different testnets?** <br />
This guide uses two different testnets: Prater and Goerli. Prater is the consensus-layer testnet. Goerli is the execution-layer testnet. The Prater testnet uses the Goerli testnet. Beacon nodes on Prater rely on Goerli execution nodes.

**My beacon node is taking a long time to sync. Is there any way I can speed it up?** <br />
Yes - you can use [checkpoint sync](https://docs.prylabs.network/docs/prysm-usage/checkpoint-sync) to start your beacon node's synchronization from a checkpoint rather than from genesis. This is actually a more secure way to run your beacon node.
<!--TODO: explain why -->


**My attestations are working, but proposals aren’t. Why not?** <br />
This is usually an indication that your validator isn't able to communicate with your beacon node, or your beacon node isn't able to connect to your execution node.

<!-- **How do I withdraw my 32ETH deposit?** <br />
(TODO) -->

**How long does it take for my validator node to be selected to propose a new block?** <br />
It can take up to a week.

<!-- **Can I run a full node and validator client on a Raspberry Pi?** <br />
TODO

**What are withdrawal keys and validator keys?** <br />
TODO: explain in context of this guide -->




## Next steps

 - Configure monitoring and alerts (TODO)
 - Keep your client software updated (TODO)
 - Configure Fee Recipient


<br />

-------

**Footnotes:**

<strong id='footnote-1'>1.</strong> Prysm is written entirely in the <a href='https://golang.org'>Go programming language</a>. It's under active development by <a href='https://prysmaticlabs.com'>Prysmatic Labs</a>, a grant-funded team working closely with a variety of groups across the Ethereum ecosystem including the <a href='https://ethereum.org'>Ethereum Foundation</a>. <br />
<strong id='footnote-2'>2.</strong> In Prysm docs, a <strong>full Ethereum node</strong> refers to a node that's running both an execution-layer execution client (like Nethermind, Besu, or Geth) and a consensus-layer beacon node client (like Prysm, Lighthouse, or Nimbus). <br />
<strong id='footnote-3'>3.</strong> A <strong>validator node</strong> is a particular type of Ethereum node that runs Ethereum's proof-of-stake consensus protocol. Validator client software like Prysm allows you to stake 32 ETH as collateral in an agreement with the Ethereum network to honestly propose and attest to blocks. Running a validator node makes you a validator. Post-merge, validators will replace miners, and proof-of-stake will replace proof-of-work. <br />
<strong id='footnote-4'>4.</strong> "Staking at home" with your own hardware reduces our dependency on centralized cloud providers and increases the decentralization and security of the Ethereum ecosystem. Staking at home is a serious responsibility that comes with serious risks. Read our <a href='./security-best-practices'>Security Best Practices</a> to learn how to minimize those risks. <br />
<strong id='footnote-5'>5.</strong> Understanding how things work can help you <strong>minimize risk</strong> and <strong>troubleshoot issues</strong>. Staking at home may one day be point-and-click. But until then, <strong>you should understand the major components</strong>, their relationships with each other, and their responsibilities over time. This understanding is currently a prerequisite to staking with Prysm, and it's why we identify continuous self-education as a <a href='./security-best-practices'>security best practice</a>. Visit A Beginner's Guide to Prysm for a breezy, visual introduction to these major components. <br />
<strong id='footnote-6'>6.</strong> See <a href='https://ethereum.org/en/developers/docs/nodes-and-clients/'>Nodes and Clients: Why should I run an Ethereum node?</a> for a more detailed exploration of node-running benefits. <br />
<strong id='footnote-7'>7.</strong> Self-sufficient participation in Ethereum aligns with the ecosystem's "don't trust, verify" mantra. Running your own node removes the need to trust another node operator, and allows you to directly verify the authenticity of blockchain data. <br />
<strong id='footnote-8'>8.</strong> Keeping TCP port <code>30303</code> is the Ethereum equivalent of seeding torrent data to peers. This will allow other execution nodes to fetch data from your node, and is a great way to support Ethereum's decentralization. <br />
<strong id='footnote-9'>9.</strong> Throughout this guide, we use <code>ConsensusLayer</code> and <code>ExecutionLayer</code> as directory names that communicate logical separation. Feel free to use your own directory names. <br />
<strong id='footnote-10'>10.</strong> Post-merge, you'll need to run an execution client locally if you want to run a beacon node or validator node. Geth is currently the supermajority execution client, so we encourage you to use an alternative like Nethermind or Besu. See <a href='https://ethresear.ch/t/applying-the-five-whys-to-the-client-diversity-problem/7628'>Applying the "Five Why's" to the Client Diversity Problem</a> to learn more. <br />
<strong id='footnote-11'>11.</strong> This guide uses a basic, default configuration for all execution clients, which should work well for most people. If you'd like to customize your configuration, detailed guidance is available for each client: <a href='https://docs.nethermind.io/nethermind/first-steps-with-nethermind/getting-started'>Nethermind</a>, <a href='https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Installation-Options/Install-Binaries/'>Besu</a>, <a href='https://geth.ethereum.org/docs/getting-started'>Geth</a>. <br />
<strong id='footnote-12'>12.</strong> Your execution client needs to download the entire blockchain - every block that's been produced after the genesis block.  <br />
<strong id='footnote-13'>13.</strong> Your keystore file contains your public key and your private key encrypted with a password. To learn more about how keystores work, see <a href='https://julien-maffre.medium.com/what-is-an-ethereum-keystore-file-86c8c5917b97'>What is an Ethereum keystore</a>. <br />
<strong id='footnote-14'>14</strong>. BitMex recently posted research that provides hard numbers on penalties and rewards: <a href='https://blog.bitmex.com/ethereums-proof-of-stake-system-calculating-penalties-rewards/'>Ethereum's Proof of Stake System - Calculating Penalties and Rewards</a>. Collin Myers has also created an <a href='https://docs.google.com/spreadsheets/d/15tmPOvOgi3wKxJw7KQJKoUe-uonbYR6HF7u83LR5Mj4/edit#gid=1018097491'>Ethereum calculator</a>. <br />
<strong id='footnote-15'>15</strong>. See Configure Monitoring and Alerts (TODO). <br />