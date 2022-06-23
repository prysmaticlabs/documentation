---
id: nodes-networks
title: Nodes and networks
sidebar_label: Nodes and networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ClientStackPng from '@site/static/img/client-stack.png';
import NetworkPng from '@site/static/img/network.png';


Ethereum is a peer-to-peer network of **nodes** that communicate with one another to form a **decentralized network**.

<img style={{width: 100 + '%', margin: 'auto', display: 'block', maxWidth: 651 + 'px'}} src={NetworkPng} /> 


### Nodes

<img style={{width: 100 + '%', margin: 'auto', display: 'block', maxWidth: 651 + 'px'}} src={ClientStackPng} /> 

The term "node" is ambiguous because there are three primary types of nodes in Ethereum.


There are several types of nodes:

<table>
    <tr>
        <th style={{minWidth: 170 + 'px'}}>Node type</th> 
        <th>Description</th>
    </tr>
    <tr>
      <td><strong>Ethereum node</strong><br />aka "Node"</td>
      <td>An Ethereum node is an <strong>execution node</strong> and <strong>beacon node</strong> working together. Ethereum nodes communicate peer-to-peer to secure the Ethereum network, and require both <strong>execution-layer client software</strong> and <strong>consensus-layer client software</strong>.</td>
    </tr> 
    <tr>
      <td><strong>Execution node</strong></td>
      <td>Execution nodes use execution client software to process transactions and smart contracts in Ethereum's <strong>execution layer</strong>. Nethermind, Besu, and Geth are execution clients.<br /> <br />Execution nodes talk to each other, and to beacon nodes.</td>
    </tr>
    <tr>
      <td><strong>Beacon node</strong></td>
      <td>Beacon nodes use beacon node client software to coordinate Ethereum's proof-of-stake consensus mechanism in Ethereum's <strong>consensus layer</strong>. Prysm, Teku, Lighthouse, and Nimbus are consensus clients that contain both beacon node and validator node client software. <br /> <br />Beacon nodes talk to each other, to execution nodes, and to validator nodes.</td>
    </tr>
    <tr>
      <td><strong>Validator node</strong><br/>aka "Validator"</td>
      <td>Validator nodes let people stake 32 ETH as collateral within Ethereum's <strong>consensus layer</strong>. Validator nodes are responsible for proposing blocks within Ethereum's proof-of-stake consensus mechanism, and will fully replace proof-of-stake miners after The Merge. <br /> <br />Validator nodes talk to each other, and to beacon nodes.</td>
    </tr>
</table>


### Networks

Ethereum Mainnet is supported by a number of <strong>test networks</strong>. These test networks let developers, node runners, and validators test new functionality before using real ETH on mainnet. Test networks are available in both the execution layer (EL) and consensus layer (CL). Every EL network has a corresponding partner CL network. EL-CL network pairs work together to run Ethereum proof-of-stake. This quickstart shows you how to run a node + validator on the following network pairs:

<br />

<table>
    <tr>
        <th style={{minWidth: 160 + 'px'}}>EL network</th> 
        <th style={{minWidth: 160 + 'px'}}>CL network</th>
        <th>Description</th>
    </tr>
    <tr>
      <td>Mainnet</td>
      <td>Mainnet</td>
      <td>When people refer to Ethereum, they're usually referring to Ethereum Mainnet, which refers to a pair of networks: execution-layer (EL) Mainnet and consensus-layer (CL) Mainnet. CL Mainnet is commonly referred to as the Beacon Chain.</td>
    </tr> 
    <tr>
      <td>Goerli</td>
      <td>Prater</td>
      <td>The Goerli-Prater pair is the test network that most people use learning how to configure their validator for the first time. After this network pair is tested, Mainnet networks will merge, and proof-of-work miners will be fully replaced by proof-of-stake validators.</td>
    </tr>
    <tr>
      <td>Sepolia</td>
      <td>Sepolia</td>
      <td>After Ropsten, Sepolia will be Merge-tested. Then Goerli-Prater will be Merge-tested.</td>
    </tr>
    <tr>
      <td>Ropsten</td>
      <td>Ropsten</td>
      <td>Although execution-layer Ropsten is deprecated, core developers are using it to test The Merge. Consensus-layer Ropsten is a new network that lets us test The Merge across both of Ethereum's layers. This network pair was one of the first pairs that was Merge-tested (see <a href='https://www.youtube.com/watch?v=2OfRuKSPjjw'>Ethereum Merge: Stage 1 - Ropsten Network Upgrade</a> for a livestream of the event).</td>
    </tr>
</table>


-------

**Footnotes:**

<strong id='footnote-1'>1.</strong> Prysm is written entirely in the <a href='https://go.dev'>Go programming language</a>. It's under active development by <a href='https://prysmaticlabs.com'>Prysmatic Labs</a>, a grant-funded team working closely with a variety of groups across the Ethereum ecosystem including the <a href='https://ethereum.org'>Ethereum Foundation</a>. <br />
<strong id='footnote-2'>2.</strong> In Prysm docs, a <strong>full Ethereum node</strong> refers to a node that's running both an execution-layer execution client (like Nethermind, Besu, or Geth) and a consensus-layer beacon node client (like Prysm, Lighthouse, or Nimbus). Execution clients process transactions, while beacon node clients manage the <a href='https://ethereum.org/en/upgrades/beacon-chain/'>Beacon Chain</a>. Validators use another piece of software - a validator client - that requires both execution client and beacon node client software. Although we provide execution-layer guidance for your convenience, this guidance is not an official endorsement or recommendation. <br />
<strong id='footnote-3'>3.</strong> A <strong>validator node</strong> is a particular type of Ethereum node that runs Ethereum's proof-of-stake consensus protocol. Validator client software like Prysm allows you to stake 32 ETH as collateral in an agreement with the Ethereum network to honestly propose and attest to blocks. Running a validator node makes you a validator. Post-merge, validators will replace miners, and proof-of-stake will replace proof-of-work. <br />
<strong id='footnote-4'>4.</strong> "Staking at home" with your own hardware reduces our dependency on centralized cloud providers and increases the decentralization and security of the Ethereum ecosystem. Staking at home is a serious responsibility that comes with serious risks. Read our <a href='../security-best-practices.md'>Security Best Practices</a> to learn how to minimize those risks. <br />
<strong id='footnote-5'>5.</strong> Understanding how things work can help you <strong>minimize risk</strong> and <strong>troubleshoot issues</strong>. Staking at home may one day be point-and-click. But until then, <strong>you should understand the major components</strong>, their relationships with each other, and their responsibilities over time. This understanding is currently a prerequisite to staking with Prysm, and it's why we identify continuous self-education as a <a href='../security-best-practices.md'>security best practice</a>. <br />
<strong id='footnote-6'>6.</strong> See <a href='https://ethereum.org/en/developers/docs/nodes-and-clients/'>Nodes and Clients: Why should I run an Ethereum node?</a> for a more detailed exploration of node-running benefits. <br />
<strong id='footnote-7'>7.</strong> Self-sufficient participation in Ethereum aligns with the ecosystem's "don't trust, verify" mantra. Running your own node removes the need to trust another node operator, and allows you to directly verify the authenticity of blockchain data. <br />
<strong id='footnote-8'>8.</strong> Keeping TCP port <code>30303</code> open is the Ethereum equivalent of seeding torrent data to peers. This will allow other execution nodes to fetch data from your node, and is a great way to support Ethereum's decentralization. Consult the documentation for your firewall, operating system, and/or device for port configuration instructions.<br />
<strong id='footnote-9'>9.</strong> Throughout this guide, we use <code>ethereum</code>, <code>consensus</code> and <code>execution</code> as directory names that reflect the logical separation between client software components. Feel free to use your own directory names. <br />
<strong id='footnote-10'>10.</strong> Post-merge, you'll need to run an execution client locally if you want to run a beacon node or validator node. Geth is currently the supermajority execution client, so we encourage you to use an alternative like Nethermind or Besu. See <a href='https://ethresear.ch/t/applying-the-five-whys-to-the-client-diversity-problem/7628'>Applying the "Five Why's" to the Client Diversity Problem</a> to learn more. <br />
<strong id='footnote-11'>11.</strong> This guide uses a basic, default configuration for all execution clients, which should work well for most people. If you'd like to customize your configuration, detailed guidance is available for each client: <a href='https://docs.nethermind.io/nethermind/first-steps-with-nethermind/getting-started'>Nethermind</a>, <a href='https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Installation-Options/Install-Binaries/'>Besu</a>, <a href='https://geth.ethereum.org/docs/getting-started'>Geth</a>. <br />
<strong id='footnote-12'>12.</strong> Your execution client needs to download the entire blockchain - every block that's been produced after the genesis block.  <br />
<strong id='footnote-13'>13.</strong> Your keystore file contains your public key and your private key encrypted with a password. To learn more about how keystores work, see <a href='https://julien-maffre.medium.com/what-is-an-ethereum-keystore-file-86c8c5917b97'>What is an Ethereum keystore</a>. <br />
<strong id='footnote-14'>14</strong>. BitMex recently posted research that provides hard numbers on penalties and rewards: <a href='https://blog.bitmex.com/ethereums-proof-of-stake-system-calculating-penalties-rewards/'>Ethereum's Proof of Stake System - Calculating Penalties and Rewards</a>. Collin Myers has also created an <a href='https://docs.google.com/spreadsheets/d/15tmPOvOgi3wKxJw7KQJKoUe-uonbYR6HF7u83LR5Mj4/edit#gid=1018097491'>Ethereum calculator</a>. 

