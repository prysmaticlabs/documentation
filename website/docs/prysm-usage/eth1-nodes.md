---
id: setup-eth1
title: Running an ETH1 node
sidebar_label: Running an ETH1 node
---

Eth2 is a massive upgrade to the Ethereum blockchain, which will start off as a proof of stake chain that runs in parallel to the current proof of work chain. In order to become a validator in eth2, users have to do a one-way "burn" of their ETH into a smart contract on the proof of work chain. Eth2 beacon nodes will track the eth1 chain's logs to determine deposits and verify those deposits' data to onboard new, proof of stake validators.

As such, running a validator and a beacon node in eth2 entails also having a reliable connection to the eth1 chain. We recommend users to explore their own solutions such as those below:
  
## Supported eth1 clients

Eth2 nodes can use any sort of eth1 mainnet node http endpoint as long as it supports reading smart contract logs. Users can choose either of the following eth1 clients.

- [Go-Ethereum](https://github.com/ethereum/go-ethereum)
- [Nethermind](https://github.com/NethermindEth/nethermind)
- [Besu](https://github.com/hyperledger/besu)

## Using a third-party eth1 provider

Instead of running your own eth1 node, it is a lot easier to use a third-party provider such as [Infura](https://infura.io/) or [Alchemy](https://alchemyapi.io/) for this purpose. You can easily [sign-up here for free](https://infura.io/register) and get an API key which then entitles you to use their respective eth1 endpoints. However, remember that using a third party provider is relying on their services, instead of your own node. 

Once you have an API key, you can then run a **Prysm eth2 beacon node** by pointing the `--http-web3provider` flag to your eth1 endpoint. For example, running an eth2 node connected to Infura's eth1 endpoint is as follows:

```text
./prysm.sh beacon-chain --http-web3provider=https://infura.io/v3/YOUR-PROJECT-ID
```

## Running your own eth1 node

You can also run your own eth1 node in the full spirit of decentralization and use that for your eth2 Prysm beacon nodes. We'll be giving an example of running a go-ethereum node on mainnet.

First, install go-ethereum [here](https://geth.ethereum.org/docs/).

```text
$ geth --datadir="$HOME/Mainnet"
```

You should wait for your node to sync and then will be able to access its endpoint via `http://localhost:8545` by default.

Next, in a separate terminal window, you can run a Prysm beacon node according to our installation instructions for your operating system:

* [Using the Prysm installation script (Recommended)](/docs/install/install-with-script)
* [Using Docker](/docs/install/install-with-docker)
* [Building from source with Bazel (Advanced)](/docs/install/install-with-bazel)

then connect to your eth1 node with:

```text
./prysm.sh beacon-chain --http-web3provider=$HOME/Mainnet/geth.ipc
```