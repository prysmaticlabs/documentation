---
id: install-with-script
title: "Quickstart: Run a node and (optionally) stake ETH using Prysm"
sidebar_label: "Quickstart: Run a node"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ClientStackPng from '@site/static/img/client-stack.png';
import JwtGenerationPartial from '@site/docs/partials/_jwt-generation-partial.md';

:::info Already running a node?

This guidance is targeted at new users. If you're already running a node, see [Prepare for The Merge](../prepare-for-merge.md).

:::


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


## Step 1: Review prerequisites and best practices

<table>
    <tr>
        <th style={{minWidth: 180 + 'px'}}>Node type</th> 
        <th>Benefits</th>
        <th>Requirements</th>
    </tr>
    <tr>
      <td><strong>Execution + beacon</strong></td>
      <td>
      <ul> 
        <li>Contributes to the security of Ethereum's ecosystem.</li>    
        <li>Lets you access the Ethereum network directly without having to trust a third party service.</li> 
        <li>Lets you run a validator post-Merge.</li> 
      </ul> 
      </td>
      <td>
        <ul> 
          <li><strong>Software</strong>: Execution client, beacon node client (instructions for clients below), <a href='https://curl.se/download.html'>curl</a></li>
          <li><strong>OS</strong>: 64-bit Linux, Mac OS X 10.14+, Windows 10+ 64-bit</li>   
          <li><strong>CPU</strong>: 4+ cores @ 2.8+ GHz</li> 
          <li><strong>Memory</strong>: 16GB+ RAM</li> 
          <li><strong>Storage</strong>: SSD with at least 2TB free space</li> 
          <li><strong>Network</strong>: 8 MBit/sec broadband</li> 
        </ul> 
      </td>
    </tr> 
    <tr>
        <td><strong>Validator</strong></td>
        <td>
        Lets you stake ETH, propose + validate blocks, earn staking rewards + transaction fee tips.
        </td>
        <td>
          <ul> 
            <li><strong>Everything above, plus...</strong></li>    
            <li><strong>Software:</strong> Validator client, browser-based crypto wallet (instructions below)</li>   
            <li><strong>Hardware:</strong> (Recommended) A new machine that has never been connected to the internet that you can use to securely generate your mnemonic phrase and keypair</li>     
            <li><strong>32 ETH</strong> (Mainnet)</li>
            <li><strong>32 testnet ETH</strong> (Testnets)</li> 
          </ul> 
        </td>
    </tr>
</table>

<br />

### Best practices

- **If you're staking ETH as a validator, try this guide on a testnet first**, *then* mainnet.
- **Keep things simple**. This guidance assumes all client software will run on a single machine.
- **Review the latest advisories** for both [testnet](https://prater.launchpad.ethereum.org/en/overview) and [mainnet](https://launchpad.ethereum.org/en/).
- Review all of our [published security best practices](./security-best-practices/).
- **Join the community** - join our [mailing list](https://groups.google.com/g/prysm-dev), the [Prysm Discord server](https://discord.gg/prysmaticlabs), [r/ethstaker](https://www.reddit.com/r/ethstaker/), and the [EthStaker Discord server](https://discord.io/ethstaker) for updates and support.


## Step 2: Install Prysm, generate secret

First, create a folder called `ethereum` on your SSD, and then two subfolders within it: `consensus` and `execution`:

```
📂ethereum
┣ 📂consensus
┣ 📂execution
```

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <p>Navigate to your <code>consensus</code> directory and run the following commands:</p>

```
SET USE_PRYSM_VERSION=v2.1.4-rc.0
mkdir prysm && cd prysm
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.bat --output prysm.bat
reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1
```

  <p>This will download the Prysm client and update your registry to enable verbose logging.</p>
  </TabItem>
  <TabItem value="others">
    <p>Navigate to your <code>consensus</code> directory and run the following commands:</p>

```
USE_PRYSM_VERSION=v2.1.4-rc.0
mkdir prysm && cd prysm
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh
```

  <p>This will download the Prysm client and make it executable.</p>
  </TabItem>
</Tabs>

<JwtGenerationPartial />

This guide assumes that you've placed your `jwt.hex` file in your `consensus` directory, but you can place it anywhere and revise the below commands as needed.


## Step 3: Run an execution client

In this step, you'll install an execution-layer client that Prysm's beacon node will connect to.

<Tabs groupId="execution-clients" defaultValue="nethermind" values={[
{label: 'Nethermind', value: 'nethermind'},
{label: 'Besu', value: 'besu'},
{label: 'Geth', value: 'geth'}
]}>
  <TabItem value="nethermind">
   <p>Download the latest stable release of Nethermind for your operating system from the <a href='https://downloads.nethermind.io/'>Nethermind downloads page</a>. Extract the contents into your <code>execution</code> folder. Run the following command to start your execution node:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>Nethermind.Runner --config mainnet --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <p>With JWT configured (see <a href='https://docs.prylabs.network/docs/vNext/214-rc'>our v2.1.4-rc0 guide</a>):</p>
        <pre><code>Nethermind.Runner --config goerli --JsonRpc.Enabled true --JsonRpc.Enabled true --JsonRpc.JwtSecretFile=path/to/jwt.hex</code></pre>
        <p>Without JWT configured:</p>
        <pre><code>Nethermind.Runner --config goerli --JsonRpc.Enabled true</code></pre>
      </TabItem>
      <TabItem value="sepolia">
        <pre><code>Nethermind.Runner --config sepolia --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.JwtSecretFile=../consensus/jwt.hex --JsonRpc.Host=0.0.0.0 --Merge.TerminalTotalDifficulty 17000000000000000</code></pre>
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>Nethermind.Runner --config ropsten --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.JwtSecretFile=../consensus/jwt.hex --JsonRpc.Host=0.0.0.0 --Merge.TerminalTotalDifficulty 50000000000000000</code></pre>
      </TabItem>
    </Tabs>
    <p>See Nethermind's <a href='https://docs.nethermind.io/nethermind/ethereum-client/configuration'>command-line options</a> for parameter definitions.</p>
    <p>Your Nethermind execution node will begin syncing. This can take a long time - from hours to days. You can <a href='https://docs.nethermind.io/nethermind/ethereum-client/monitoring-node-health'>check your Nethermind execution node's sync status</a> by navigating to <a href='http://localhost:8545/healthchecks-ui'><code>http://localhost:8545/healthchecks-ui</code></a> or by running the following command from a separate terminal window:</p>

```
curl localhost:8545/health 
```

  <p>A sync status of <code>false</code> indicates that your node is fully synced. You can proceed to the next step while Nethermind syncs.</p>
  </TabItem>
  <TabItem value="besu">
    <p>Ensure that the latest 64-bit version of the <a href='https://www.oracle.com/java/technologies/downloads/'>Java JDK</a> is installed. Download the latest stable release of Besu from the <a href='https://github.com/hyperledger/besu/releases'>Besu releases</a> page. OS-specific instructions are available on Besu's <a href='https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Installation-Options/Install-Binaries/'>binary installation page</a>. Run the following command to start your execution node:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>besu --network=mainnet --rpc-http-enabled</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <p>With JWT configured (see <a href='https://docs.prylabs.network/docs/vNext/214-rc'>our v2.1.4-rc0 guide</a>):</p>
        <pre><code>besu --network=goerli --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=path/to/jwt.hex  --engine-host-allowlist="*"</code></pre>
        <p>Without JWT configured:</p>
        <pre><code>besu --network=goerli --rpc-http-enabled</code></pre>
      </TabItem>
      <TabItem value="sepolia">
        <pre><code>besu --network=sepolia --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=../consensus/jwt.hex --engine-host-allowlist="*" --override-genesis-config="terminalTotalDifficulty=17000000000000000"</code></pre>
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>besu --network=ropsten --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=../consensus/jwt.hex --engine-host-allowlist="*" --override-genesis-config="terminalTotalDifficulty=50000000000000000"</code></pre>
      </TabItem>
    </Tabs>
    <p>See Besu's <a href='https://besu.hyperledger.org/en/stable/Reference/CLI/CLI-Syntax/'>command-line options</a> for parameter definitions.</p>
    <p>Your Besu execution node will begin syncing. You can <a href='https://besu.hyperledger.org/en/stable/Reference/API-Methods/#eth_syncing'>check your Besu execution node's sync status</a> by running the following command from a separate terminal window:</p>

```
curl -H "Content-Type: application/json" -X POST http://localhost:8545 -d "{""jsonrpc"":""2.0"",""method"":""eth_syncing"",""params"":[],""id"":51}" 
```

  <p>A sync status of <code>false</code> indicates that your node is fully synced. You can proceed to the next step while Besu syncs.</p>
  </TabItem>
  <TabItem value="geth">
    <p>Download and run the latest 64-bit stable release of the <strong>Geth installer</strong> for your operating system from the <a href='https://geth.ethereum.org/downloads/'>Geth downloads page</a>. Navigate to your <code>execution</code> directory and run the following command to start your execution node:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>geth --mainnet --http --http.api eth,net,engine,admin</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <p>With JWT configured (see <a href='https://docs.prylabs.network/docs/vNext/214-rc'>our v2.1.4-rc0 guide</a>):</p>
        <pre><code>geth --goerli --http --http.api eth,net,engine,admin --authrpc.vhosts="localhost" --authrpc.jwtsecret=path/to/jwt.hex</code></pre>
        <p>Without JWT configured:</p>
        <pre><code>geth --goerli --http --http.api eth,net,engine,admin</code></pre>
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
  </TabItem>
</Tabs>

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
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8545 --mainnet</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node.</p>
        <p>With JWT configured (see <a href='https://docs.prylabs.network/docs/vNext/214-rc'>our v2.1.4-rc0 guide</a>):</p>
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8551 --prater --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
        <p>Without JWT configured:</p>
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8545 --prater --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>      </TabItem>
      <TabItem value="sepolia">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node using your secret JWT file:</p>
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8551 --sepolia --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre>
        <p>If you're running a validator, specifying a <code>suggested-fee-recipient</code> wallet address will allow you to earn what were previously miner transaction fee tips.</p>
      </TabItem>
      <TabItem value="ropsten">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node using your secret JWT file:</p>
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8551 --ropsten --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre>
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
        <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8545 --mainnet</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node.</p>
       <p>With JWT configured (see <a href='https://docs.prylabs.network/docs/vNext/214-rc'>our v2.1.4-rc0 guide</a>):</p>
      <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8551 --prater --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      <p>Without JWT configured:</p>
      <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8545 --prater --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
      <TabItem value="sepolia">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node using your secret JWT file:</p>
        <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8551 --sepolia --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre>
        <p>If you're running a validator, specifying a <code>suggested-fee-recipient</code> wallet address will allow you to earn what were previously miner transaction fee tips.</p>
      </TabItem>
      <TabItem value="ropsten">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node using your secret JWT file:</p>
        <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8551 --ropsten --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre>
        <p>If you're running a validator, specifying a <code>suggested-fee-recipient</code> wallet address will allow you to earn what were previously miner transaction fee tips.</p>
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

Your beacon node will now begin syncing. This usually takes a couple days, but it can take longer depending on your network and hardware specs.

You can check your beacon node's <a href='https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Node/getSyncingStatus'>sync status</a> by running the following command from a separate terminal window:

```
curl http://localhost:3500/eth/v1/node/syncing
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


## Step 5: Run a validator using Prysm

:::info ETH Required

Running a validator requires 32.1 ETH (for Mainnet) or 32.1 GöETH / rETH (for Testnets). Instructions for acquiring testnet ETH are provided below. Note that using Sepolia as a validator is currently unsupported.

:::

Next, we'll create your validator keys with the [Ethereum Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli). Before proceeding, we recommend temporarily moving over to a **new machine that has never been connected to the internet** if possible. This will reduce the risk that your validator private key is exposed to an adversary. We'll carry an encrypted version of your private key to your primary machine after creating your keys on this "airgapped" machine.

Download the latest stable version of the deposit CLI from the [Staking Deposit CLI Releases page](https://github.com/ethereum/staking-deposit-cli/releases).

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <p>Run the following command to create your mnemonic (a unique and <strong>highly sensitive</strong> 24-word phrase) and keys:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>deposit.exe new-mnemonic --num_validators=1 --mnemonic_language=english</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <pre><code>deposit.exe new-mnemonic --num_validators=1 --mnemonic_language=english --chain=prater</code></pre>
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>deposit.exe new-mnemonic --num_validators=1 --mnemonic_language=english --chain=ropsten</code></pre>
      </TabItem>
    </Tabs>
    <p>Follow the CLI prompts to generate your keys. This will give you the following artifacts:</p>
    <ol>
      <li>A <strong>new mnemonic seed phrase</strong>. This is <strong>highly sensitive</strong> and should never be exposed to other people or networked hardware.</li>
      <li>A <code>validator_keys</code> folder. This folder will contain two files:
        <ol>
          <li><code>deposit_data-*.json</code> - contains deposit data that you’ll later upload to the Ethereum launchpad.</li>
          <li><code>keystore-m_*.json</code> - contains your public key and encrypted private key.</li>
        </ol>
      </li>
    </ol>
    <p>Copy the <code>validator_keys</code> folder to your primary machine's <code>consensus</code> folder. Run the following command to import your keystores, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus/validator_keys</code> folder:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>prysm.bat validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>consensus</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://launchpad.ethereum.org/en/upload-deposit-data'>Mainnet Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>You can then deposit 32 ETH into the Mainnet deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure.</p> 
        <p>Finally, run the following command to start your validator, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus</code> folder:</p>
        <pre><code>prysm.bat validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <pre><code>prysm.bat validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>consensus</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://prater.launchpad.ethereum.org/en/upload-deposit-data'>Prater Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>If you need GöETH, head over to one of the following Discord servers:</p>
        <ul>
          <li><a href='https://discord.io/ethstaker'>r/EthStaker Discord</a></li>
          <li><a href='https://discord.gg/prysmaticlabs'>Prysm Discord server</a></li>
        </ul>
        <p>Someone should be able to give you the GöETH you need. You can then deposit 32 GöETH into the Prater testnet’s deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure - <strong>never send real ETH to the testnet deposit contract.</strong> Finally, run the following command to start your validator, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus</code> folder:</p>
        <pre><code>prysm.bat validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>      
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>prysm.bat validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt; --ropsten</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>consensus</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://ropsten.launchpad.ethereum.org/en/upload-deposit-data'>Ropsten Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>If you need rEth, head over to one of the following Discord servers:</p>
        <ul>
          <li><a href='https://discord.io/ethstaker'>r/EthStaker Discord</a></li>
          <li><a href='https://discord.gg/prysmaticlabs'>Prysm Discord server</a></li>
        </ul>
        <p>Someone should be able to give you the rETH you need. You can then deposit 32 rETH into the Ropsten testnet’s deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure - <strong>never send real ETH to the testnet deposit contract.</strong> Finally, run the following command to start your validator, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus</code> folder:</p>
        <pre><code>prysm.bat validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt; --ropsten</code></pre>      
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="others">
    <p>Run the following command to create your mnemonic phrase and keys:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>./deposit new-mnemonic --num_validators=1 --mnemonic_language=english</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <pre><code>./deposit new-mnemonic --num_validators=1 --mnemonic_language=english --chain=prater</code></pre>
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>./deposit new-mnemonic --num_validators=1 --mnemonic_language=english --chain=ropsten</code></pre>
      </TabItem>
    </Tabs>
    <p>Follow the CLI prompts to generate your keys. This will give you the following artifacts:</p>
    <ol>
      <li>A <strong>new mnemonic seed phrase</strong>. This is <strong>highly sensitive</strong> and should never be exposed to other people or networked hardware.</li>
      <li>A <code>validator_keys</code> folder. This folder will contain two files:
        <ol>
          <li><code>deposit_data-*.json</code> - contains deposit data that you’ll later upload to the Ethereum launchpad.</li>
          <li><code>keystore-m_*.json</code> - contains your public key and encrypted private key.</li>
        </ol>
      </li>
    </ol>
    Copy the <code>validator_keys</code> folder to your primary machine's <code>consensus</code> folder. Run the following command to import your keystores, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus/validator_keys</code> folder:<br/>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>./prysm.sh validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>consensus</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://launchpad.ethereum.org/en/upload-deposit-data'>Mainnet Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>You can then deposit 32 ETH into the Mainnet deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure. Finally, run the following command to start your validator, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus</code> folder:</p>
        <pre><code>./prysm.sh validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <pre><code>./prysm.sh validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>consensus</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://prater.launchpad.ethereum.org/en/upload-deposit-data'>Prater Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>If you need GöETH, head over to one of the following Discord servers:</p>
        <ul>
          <li><a href='https://discord.io/ethstaker'>r/EthStaker Discord</a></li>
          <li><a href='https://discord.gg/prysmaticlabs'>Prysm Discord server</a></li>
        </ul>
        <p>Someone should be able to give you the GöETH you need. You can then deposit 32 GöETH into the Prater testnet’s deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure - <strong>never send real ETH to the testnet deposit contract.</strong>  Finally, run the following command to start your validator, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus</code> folder:</p>
        <pre><code>./prysm.sh validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>    
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>./prysm.sh validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt; --ropsten</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>consensus</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://ropsten.launchpad.ethereum.org/en/upload-deposit-data'>Ropsten Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>If you need rETH, head over to one of the following Discord servers:</p>
        <ul>
          <li><a href='https://discord.io/ethstaker'>r/EthStaker Discord</a></li>
          <li><a href='https://discord.gg/prysmaticlabs'>Prysm Discord server</a></li>
        </ul>
        <p>Someone should be able to give you the rETH you need. You can then deposit 32 rETH into the Ropsten testnet’s deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure - <strong>never send real ETH to the testnet deposit contract.</strong>  Finally, run the following command to start your validator, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus</code> folder:</p>
        <pre><code>./prysm.sh validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt; --ropsten</code></pre>    
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

<br />

:::tip Congratulations! 

You’re now running a <strong>full Ethereum node</strong> and a <strong>validator</strong>.

:::

<br />

It can a long time (from days to months) for your validator to become fully activated. To learn more about the validator activation process, see [Deposit Process](https://kb.beaconcha.in/ethereum-2.0-depositing). You can paste your validator's public key (available in your `deposit_data-*.json` file) into a blockchain explorer to check the status of your validator:

 - [Beaconcha.in (Mainnet)](https://beaconcha.in) 
 - [Beaconcha.in (Prater)](https://prater.beaconcha.in/)
 - [Beaconcha.in (Ropsten)](https://ropsten.beaconcha.in/)

In the meantime, you should leave your **execution client**, **beacon node**, and **validator client** terminal windows open and running. Once your validator is activated, it will automatically begin proposing and validating blocks.


-------

## Frequently asked questions

<!-- **I'm new to Ethereum, and I'm a visual learner. Can you show me how these things work?** <br />
The Beginner's Introduction to Prysm uses diagrams to help you visualize Ethereum's architecture, and Prysm's too. (TODO) -->

**Why do you recommend putting everything on a single machine?** <br />
Keeping all of your client software on a single machine keeps things simple, which aligns with our [security best practices](../security-best-practices.md).

**Can I use Prysm on a Mac M1 ARM chip?**
Mac M1 ARM chips currently require users to run Prysm through <a href='https://support.apple.com/en-us/HT211861'>Rosetta</a>. See our <a href='https://github.com/prysmaticlabs/prysm/issues/9385'>open bug</a> for details.

**Do I need to configure JWT if I'm using IPC instead of HTTP?** <br />
No.

**Do I need to configure my firewall?** <br />
We recommend **closing** TCP port `8545` to the internet and keeping TCP and UDP ports `30303` **open** to support other execution nodes.

**Can you mix and match networks between execution layer and consensus layer?** <br />
No. See [Nodes and networks](../concepts/nodes-networks.md) for more information.

**Can I stake with less than 32 ETH?**
<a href='https://ethereum.org/en/staking/pools/'>Pooled staking</a> lets you stake with less than 32 ETH. 

**What should I do if I can't run a node using my own hardware?**
<a href='https://ethereum.org/en/staking/saas/'>Staking as a service</a> lets you delegate hardware management to a third party.

<!-- **I'm new to Ethereum, and I'm a visual learner. Can you show me how these things work? How much disk space does each node type require?** <br />
The Beginner's Introduction to Prysm uses diagrams to help you visualize Ethereum's architecture, and Prysm's too. (TODO) -->



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


**My attestations are working, but proposals aren’t. Why not?** <br />
This is usually an indication that your validator isn't able to communicate with your beacon node, or your beacon node isn't able to connect to your execution node.

**How long does it take for my validator to be selected to propose a new block?** <br />
At the time of this writing, a ballpark estimate is **around a week**. Every 12 seconds a new block is proposed, and your validator has a one in [total number of active validators] chance of being chosen, so this duration can vary significantly from one validator to the next.

<!-- **Can I run a full node and validator client on a Raspberry Pi?** <br />
TODO

**What are withdrawal keys and validator keys?** <br />
TODO: explain in context of this guide -->

import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />