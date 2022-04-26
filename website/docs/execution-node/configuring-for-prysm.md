---
id: configuring-for-prysm
title: Setting Up a Node
sidebar_label: Setting Up a Node
---

:::caution
Running an execution node alongside Prysm will be **required** at the time of the Ethereum proof-of-stake transition
:::

Ethereum proof-of-stake is a massive upgrade to the Ethereum blockchain, which will start off as a proof of stake chain that runs in parallel to the current proof of work chain. In order to become a validator in Ethereum proof-of-stake, users have to do a one-way "burn" of their ETH into a smart contract on the proof of work chain. Ethereum beacon nodes will track the eth1 chain's logs to determine deposits and verify those deposits' data to onboard new, proof of stake validators.

As such, running a validator and a beacon node in Ethereum proof-of-stake entails also having a reliable connection to the eth1 chain. We recommend users to explore their own solutions such as those below:
  
## Supported clients

Prysm nodes can use any sort of Ethereum execution node as long as it supports reading smart contract logs. Users can choose either of the following execution clients.

- [Go-Ethereum](https://github.com/ethereum/go-ethereum)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Nethermind](https://github.com/NethermindEth/nethermind)
- [Besu](https://github.com/hyperledger/besu)

## Using a third-party provider

:::danger
You cannot use a third-party provider for your execution client once the [Ethereum merge](https://ethereum.org/en/upgrades/merge/) goes live.
:::

## Running your own execution node

An execution node is required in order to run Prysm after the Ethereum merge. We'll be giving an example of running a go-ethereum node on mainnet. 

First, install go-ethereum [here](https://geth.ethereum.org/docs/).

```text
geth --datadir="$HOME/Mainnet" --http
```

You should wait for your node to sync and then will be able to access its endpoint via `http://localhost:8545` by default.

Next, in a separate terminal window, you can run a Prysm beacon node according to our installation instructions for your operating system:

* [Using the Prysm installation script (Recommended)](/docs/install/install-with-script)
* [Using Docker](/docs/install/install-with-docker)
* [Building from source with Bazel (Advanced)](/docs/install/install-with-bazel)

:::tip
By default, Prysm will try to connect to an execution node via http at `http://localhost:8545` if an endpoint is not configured via command-line flags. For HTTP connections, execution nodes also require **authentication**. You can find instructions on setting up authentication [here](/docs/execution-node/authentication).
:::

then connect to your execution node with:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  groupId="operating-systems"
  defaultValue="lin"
  values={[
    {label: 'Linux', value: 'lin'},
    {label: 'Windows', value: 'win'},
    {label: 'MacOS', value: 'mac'},
    {label: 'Arm64', value: 'arm'},
  ]
}>
<TabItem value="lin">

**Using Prysm.sh**

```bash
./prysm.sh beacon-chain --http-web3provider=$HOME/Mainnet/geth.ipc
```

**Using Bazel**

```bash
bazel run //beacon-chain --config=release -- --http-web3provider=$HOME/Mainnet/geth.ipc
```

</TabItem>
<TabItem value="win">

**Using Prysm.bat**

```bash
prysm.bat beacon-chain --http-web3provider=\\.\pipe\geth.ipc
```

</TabItem>
<TabItem value="mac">

**Using Prysm.sh**

```bash
./prysm.sh beacon-chain --http-web3provider=$HOME/Mainnet/geth.ipc
```

**Using Bazel**

```bash
bazel run //beacon-chain --config=release -- --http-web3provider=$HOME/Mainnet/geth.ipc
```

</TabItem>
<TabItem value="arm">

**Using Prysm.sh**

```bash
./prysm.sh beacon-chain --http-web3provider=$HOME/Mainnet/geth.ipc
```

**Using Bazel**

```bash
bazel run //beacon-chain --config=release -- --http-web3provider=$HOME/Mainnet/geth.ipc
```

</TabItem>
</Tabs>

## Adding fallback execution nodes

In case your execution node unexpectedly goes down, you can specify a list of fallback eth1 nodes that your beacon node can always reach out to. To use this functionality, you can add the following flag to the beacon node:

#### Using regular flags

```
--http-web3provider=<YOUR MAIN ENDPOINT> --fallback-web3provider=<PROVIDER 1> --fallback-web3provider=<PROVIDER 2>
```

You can specify your main provider and as many --fallback-web3provider as you need. Here's what a real setup could look like:

```
--http-web3provider=http://localhost:8545 --fallback-web3provider=http://localhost:8546
```

Where your main provider is your local go-ethereum node running on port 8545, then you can fallback to another provider if needed.

:::tip Prysm will automatically use your main provider always
In case your main provider comes back from the dead, Prysm will detect that and switch over to it for primary usage automatically. This will save you any costs on your fallback providers.
:::

#### Using a config file

If you are running Prysm and specifying command line flags via a config.yaml file, you can do the following:

```yaml
http-web3provider: http://localhost:8545
fallback-web3provider:
- http://localhost:8546
```