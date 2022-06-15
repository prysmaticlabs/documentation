---
id: prepare-for-merge
title: Prepare for The Merge
sidebar_label: Prepare for The Merge
---

[The Merge](https://ethereum.org/en/upgrades/merge/) will fully transition Ethereum's consensus mechanism from proof-of-work to proof-of-stake. This is made possible by the [Beacon Chain](https://ethereum.org/en/upgrades/beacon-chain/), a new Ethereum network layer that implements proof-of-stake consensus. After The Merge, this consensus layer will be fully "merged" with Ethereum's execution layer, and miners will be fully replaced by validators on Ethereum Mainnet.

Before The Merge can happen on Mainnet, core developers need to test the procedure on a series of test networks. This guide will help you prepare for The Merge on Mainnet and participate in Merge testing on testnets. We encourage everyone to make these changes immediately, even on Mainnet.

:::info

If you're starting from scratch, our [Quickstart](./install/install-with-script.md) will show you how to configure a Merge-ready node from start to finish.

:::

## The Merge: Before and after


| Before The Merge                                                                           | After The Merge                                                                                 |
|--------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| You don't need to run a local execution client. You can use a service like Infura instead. | You **do** need to run an execution client. You **can't** use a service like Infura.            |
| Execution clients don't need to use the engine API.                                        | Execution clients **do** need to use the engine API.                                            |
| Execution clients don't need to connect to beacon node clients using JWT.                  | Execution clients **do** need to connect to beacon node clients using JWT.                      |
| Miners receive tips.                                                                       | Validators receive tips.                                                                        |
| Beacon nodes don't need to use the engine API when connecting to execution nodes.          | Beacon nodes <strong>do</strong> need to use the engine API when connecting to execution nodes. |
| A 1TB hard drive is enough.                                                                | A 2TB+ SSD is required.                                                                         |


Let's step through each of these changes. 


## Generate JWT token

First, you'll need to generate a JWT token. This will let your beacon node form a secure HTTP connection with your execution node, which is required post-Merge. Upgrade Prysm to [Prysm v2.1.3-rc.4](https://github.com/prysmaticlabs/prysm/releases/tag/v2.1.3-rc.3) and issue the following command:

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
  <pre><code>prysm.bat beacon-chain jwt generate-auth-secret</code></pre>
  </TabItem>
  <TabItem value="others">
  <pre><code>./prysm.sh beacon-chain jwt generate-jwt-secret</code></pre>
  </TabItem>
</Tabs>

Prysm will output a `jwt.hex` file path. Record this - we'll use it in the next step.


## Run an execution node

Upgrade your execution client software to the latest version. Use the following command to configure your execution node to consume your JWT token, and to expose an engine API endpoint: 

<Tabs groupId="execution-clients" defaultValue="nethermind" values={[
{label: 'Nethermind', value: 'nethermind'},
{label: 'Besu', value: 'besu'},
{label: 'Geth', value: 'geth'}
]}>
  <TabItem value="nethermind">
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>Nethermind.Runner --config mainnet --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.JwtSecretFile=../consensus/jwt.hex</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <pre><code>Nethermind.Runner --config goerli --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.JwtSecretFile=../consensus/jwt.hex</code></pre>
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>Nethermind.Runner --config ropsten --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.JwtSecretFile=../consensus/jwt.hex --JsonRpc.Host=0.0.0.0 --Merge.TerminalTotalDifficulty 50000000000000000</code></pre>
      </TabItem>
    </Tabs>
    <p>See Nethermind's <a href='https://docs.nethermind.io/nethermind/ethereum-client/configuration'>command-line options</a> for parameter definitions.</p>
  </TabItem>
  <TabItem value="besu">
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>besu --network=mainnet --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=../consensus/jwt.hex</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <pre><code>besu --network=goerli --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=../consensus/jwt.hex</code></pre>
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>besu --network=ropsten --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=../consensus/jwt.hex --sync-mode="X_SNAP" --Xmerge-support=true --engine-rpc-enabled=true --engine-host-allowlist="*" --override-genesis-config="terminalTotalDifficulty=50000000000000000"  </code></pre>
      </TabItem>
    </Tabs>
    <p>See Besu's <a href='https://besu.hyperledger.org/en/stable/Reference/CLI/CLI-Syntax/'>command-line options</a> for parameter definitions.</p>
  </TabItem>
  <TabItem value="geth">
    <div class="admonition admonition-caution alert alert--warning">
      <div class="admonition-content"><p><strong>Geth is a supermajority execution-layer client</strong>. This centralization poses an active risk to the security of Ethereum. If Geth's code contains a bug, a majority of nodes (and L2s, and users) will be impacted. Consider using another execution-layer client to distribute this risk for the ecosystem <a class='footnote' href='#footnote-10'>[10]</a>.</p></div>
    </div>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>geth --http --authrpc.vhosts="localhost" --authrpc.jwtsecret=../consensus/jwt.hex</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <pre><code>geth --goerli --http --authrpc.vhosts="localhost" --authrpc.jwtsecret=../consensus/jwt.hex</code></pre>
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>geth --ropsten --http --authrpc.jwtsecret=../consensus/jwt.hex --authrpc.vhosts localhost --http.api eth,net,engine --override.terminaltotaldifficulty 50000000000000000</code></pre>
      </TabItem>
    </Tabs>
    <p>See Geth's <a href='https://geth.ethereum.org/docs/interface/command-line-options'>command-line options</a> for parameter definitions.</p>
  </TabItem>
</Tabs>


### Beacon node changes

Next, we'll configure your beacon node to consume your JWT token so it can securely connect to your execution node's engine API endpoint. If you're running a validator, specifying a `suggested-fee-recipient` wallet address will allow you to earn what were previously miner tips:

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <p>Navigate to your <code>consensus</code> directory.</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8551 --jwt-secret=jwt.hex --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a>.</p>
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8551 --jwt-secret=jwt.hex --prater --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
      <TabItem value="ropsten">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state from Github</a>.</p>
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8551 --jwt-secret=jwt.hex --ropsten --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="others">
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
    <TabItem value="mainnet">
      <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8551 --jwt-secret=jwt.hex --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
    </TabItem>
    <TabItem value="goerli-prater">
      <p>Download the Prater genesis state from GitHub into your <code>consensus</code> directory.</p>
      <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8551 --jwt-secret=jwt.hex --prater --genesis-state=../genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
    </TabItem>
    <TabItem value="ropsten">
      <p>Download the Ropsten genesis state from GitHub into your <code>consensus</code> directory.</p>
      <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8551 --jwt-secret=jwt.hex --ropsten --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
    </TabItem>
  </Tabs>
  </TabItem>
</Tabs>


### Validator node changes

Validator client configuration doesn't need to be updated for The Merge. Fee recipient can optionally be configured on your validator node if you want redundancy or multiple fee recipient addresses. See [Configuring a Fee Recipient Address](./execution-node/fee-recipient.md) to learn more.


### Hardware changes

We recommend updating your hard drive to a 2TB+ SSD as soon as possible.


### Frequently asked questions

**I'm currently running a validator on Ethereum Mainnet. When should I make changes?**

We recommend making these changes immediately, even on Mainnet.