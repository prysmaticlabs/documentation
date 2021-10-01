---
id: setup-eth1
title: Running an ETH1 node
sidebar_label: Running an ETH1 node
---

Ethereum proof-of-stake is a massive upgrade to the Ethereum blockchain, which will start off as a proof of stake chain that runs in parallel to the current proof of work chain. In order to become a validator in Ethereum proof-of-stake, users have to do a one-way "burn" of their ETH into a smart contract on the proof of work chain. Ethereum beacon nodes will track the eth1 chain's logs to determine deposits and verify those deposits' data to onboard new, proof of stake validators.

As such, running a validator and a beacon node in Ethereum proof-of-stake entails also having a reliable connection to the eth1 chain. We recommend users to explore their own solutions such as those below:
  
## Supported eth1 clients

Eth2 nodes can use any sort of eth1 mainnet node http endpoint as long as it supports reading smart contract logs. Users can choose either of the following eth1 clients.

- [Go-Ethereum](https://github.com/ethereum/go-ethereum)
- [Nethermind](https://github.com/NethermindEth/nethermind)
- [Besu](https://github.com/hyperledger/besu)

## Using a third-party eth1 provider

Instead of running your own eth1 node, it is a lot easier to use a third-party provider such as [Infura](https://infura.io/), [QuikNode](https://www.quiknode.io/), [Chainstack](https://chainstack.com/), or [Alchemy](https://alchemyapi.io/) for this purpose. You can easily [sign-up here for free](https://infura.io/register) and get an API key which then entitles you to use their respective eth1 endpoints. However, remember that using a third party provider is relying on their services, instead of your own node. 

Once you have an API key, you can then run a **Prysm beacon node** by pointing the `--http-web3provider` flag to your eth1 endpoint. For example, running an Ethereum consensus node connected to Infura's eth1 endpoint is as follows:

```text
./prysm.sh beacon-chain --http-web3provider=https://mainnet.infura.io/v3/YOUR-PROJECT-ID
```

## Running your own eth1 node

You can also run your own eth1 node in the full spirit of decentralization and use that for your Prysm beacon nodes. We'll be giving an example of running a go-ethereum node on mainnet.

First, install go-ethereum [here](https://geth.ethereum.org/docs/).

```text
geth --datadir="$HOME/Mainnet" --http
```

You should wait for your node to sync and then will be able to access its endpoint via `http://localhost:8545` by default.

Next, in a separate terminal window, you can run a Prysm beacon node according to our installation instructions for your operating system:

* [Using the Prysm installation script (Recommended)](/docs/install/install-with-script)
* [Using Docker](/docs/install/install-with-docker)
* [Building from source with Bazel (Advanced)](/docs/install/install-with-bazel)

then connect to your eth1 node with:

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

## Adding fallback eth1 nodes

In case your eth1 node unexpectedly goes down, you can specify a list of fallback eth1 nodes that your beacon node can always reach out to. To use this functionality, you can add the following flag to the beacon node:

#### Using regular flags

```
--http-web3provider=<YOUR MAIN ETH1 ENDPOINT> --fallback-web3provider=<PROVIDER 1> --fallback-web3provider=<PROVIDER 2>
```

You can specify your main provider and as many --fallback-web3provider as you need. Here's what a real setup could look like:

```
--http-web3provider=http://localhost:8545 --fallback-web3provider=https://mainnet.infura.io/v3/YOUR-PROJECT-ID --fallback-web3provider=https://eth-mainnet.alchemyapi.io/v2/YOUR-PROJECT-ID
```

Where your main provider is your local go-ethereum node running on port 8545, then you can fallback to infura or alchemy as needed.

:::tip Prysm will automatically use your main provider always
In case your main provider comes back from the dead, Prysm will detect that and switch over to it for primary usage automatically. This will save you any costs on your fallback providers.
:::

#### Using a config file

If you are running Prysm and specifying command line flags via a config.yaml file, you can do the following:

```yaml
http-web3provider: http://localhost:8545
fallback-web3provider:
- https://mainnet.infura.io/v3/YOUR-PROJECT-ID
- https://eth-mainnet.alchemyapi.io/v2/YOUR-PROJECT-ID
```
## Authorizing connection to a third-party eth1 provider

In case you need to authorize to your eth1 node, both `--http-web3provider` and `--fallback-web3provider` flags support the following HTTP authorization methods:
- Basic Authentication
- Bearer Authentication (Token Authentication)

In order to pass authorization data, append the authorization header to the flag's value, separating the URL and the authorization header with a comma. In the following example:
- the main endpoint is a custom node without authorization
- the first fallback endpoint is a Chainstack endpoint with Basic Authentication
- the second fallback endpoint is an Infura endpoint with Bearer Authentication using a JWT token
```
--http-web3provider=$HOME/Mainnet/geth.ipc \
--fallback-web3provider="https://nd-123-456-789.p2pify.com,Basic myusername:mypassword" \
--fallback-web3provider="https://mainnet.infura.io/v3/0fcc2de059aa4f0a88b5b1708b614472,Bearer eyJhbGciOiAiUlMyNTYiLCJ0eXAiOiJKV1QiLCJraWQiOiJiZGM2ZGI2NmFlM2M0NzdhYmI0ZDk1NDc0N2ZiZjE4YSJ9.eyJleHAiOjE2MjExNTMwMDgsImF1ZCI6ImluZnVyYS5pbyJ9._evYtVED3VnKzyjQYTmlR98DRxa7oCJapG44MqFDKDQ"
```

:::tip 
Note that you can specify multiple authorization values for the same endpoint by reusing the endpoint URL in `--fallback-web3provider` and changing the value of the authorization header.
:::