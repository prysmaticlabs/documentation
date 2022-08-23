import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
- **Review the latest advisories** for the network(s) that you're using: [Goerli-Prater](https://goerli.launchpad.ethereum.org/en/), [Mainnet](https://launchpad.ethereum.org/en/).
- Review all of our [published security best practices](./security-best-practices/).
- **Join the community** - join our [mailing list](https://groups.google.com/g/prysm-dev), the [Prysm Discord server](https://discord.gg/prysmaticlabs), [r/ethstaker](https://www.reddit.com/r/ethstaker/), and the [EthStaker Discord server](https://discord.io/ethstaker) for updates and support.


## Step 2: Install Prysm

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
mkdir prysm && cd prysm
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.bat --output prysm.bat
reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1
```

  <p>This will download the Prysm client and update your registry to enable verbose logging.</p>
  </TabItem>
  <TabItem value="others">
    <p>Navigate to your <code>consensus</code> directory and run the following commands:</p>

```
mkdir prysm && cd prysm
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh
```

  <p>This will download the Prysm client and make it executable.</p>
  </TabItem>
</Tabs>