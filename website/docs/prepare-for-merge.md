---
id: prepare-for-merge
title: Prepare for The Merge
sidebar_label: Prepare for The Merge
---

The Merge is an upcoming event that migrates Ethereum's consensus mechanism from proof-of-work to proof-of-stake. This is made possible by the Beacon Chain, a new network layer that implements proof-of-stake consensus. After The Merge, this consensus layer will be fully "merged" with Ethereum's execution layer, and validators will replace miners on Ethereum Mainnet.

Before The Merge can happen on Mainnet, core developers need to test the procedure on a series of test networks. This guide will help current node operators and validators participate in these tests and prepare for The Merge. We encourage everyone to make these changes immediately, even on Mainnet.

::: info

If you're starting from scratch, our Quickstart will show you how to configure a Merge-ready node from start to finish.

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


### Execution node changes

First, you'll want to generate a JWT secret. Prysm can do this for you:



Ensure that you've updated to the latest release of your selected execution client software. The following command will start an execution node that satisfies post-Merge requirements:

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
        <pre><code>geth --http --authrpc.jwtsecret=../consensus/jwt.hex --datadir .</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <pre><code>geth --goerli --http --authrpc.jwtsecret=../consensus/jwt.hex --datadir .</code></pre>
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>geth --ropsten --http --authrpc.jwtsecret=../consensus/jwt.hex --datadir . --authrpc.addr localhost --authrpc.port 8551 --authrpc.vhosts localhost --http.api eth,net,engine --override.terminaltotaldifficulty 50000000000000000</code></pre>
        <p>See the <a href='https://blog.ethereum.org/'>Ethereum blog</a> for the latest Ropsten config recommendations.</p>
      </TabItem>
    </Tabs>
    <p>See Geth's <a href='https://geth.ethereum.org/docs/interface/command-line-options'>command-line options</a> for parameter definitions.</p>
  </TabItem>
</Tabs>


Engine API endpoint

JWT token


### Beacon node changes

Engine API endpoint

JWT token


### Validator node changes




### Hardware changes




### Frequently asked questions

**I'm currently running a validator on Ethereum Mainnet. When should I make changes?**
dkdk

**Instead of buying a 2TB SSD, can I use multiple smaller SSDs?**
Yes.

**How do I configure my execution client to use multiple hard drives?**

**How do I configure my beacon node client to use multiple hard drives?**

**How do I monitor my hard drive utilization?**

**How do I monitor the health of my setup?**




