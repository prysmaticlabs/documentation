---
id: setup-eth1
title: Running an ETH1 node
sidebar_label: Running an ETH1 node
---

Eth2 is a massive upgrade to the Ethereum blockchain, which will start off as a proof of stake chain that runs in parallel to the current proof of work chain. In order to become a validator in eth2, users have to do a one-way "burn" of their ETH into a smart contract on the proof of work chain. Eth2 beacon nodes will track the eth1 chain's logs to determine deposits and verify those deposits' data to onboard new, proof of stake validators.

As such, running a validator and a beacon node in eth2 entails also having a reliable connection to the eth1 chain. The Prysmatic Labs team currently runs a few eth1 nodes that users are free to use for running their validators. Currently, eth2 testnets rely on an eth1, proof-of-authority testnet called the [Goërli Testnet](https://goerli.net/). The testnet has significant support, with a block explorer on Etherscan [here](https://goerli.etherscan.io).

By default, Prysm beacon nodes use `https://goerli.prylabs.net` as their eth1 endpoints. However, our endpoints have no uptime guarantees and recommend users to explore their own solutions such as those below:
  
## Supported eth1 clients

Eth2 nodes can use any sort of eth1 node http endpoint as long as it supports reading smart contract logs. Users can choose either of the following eth1 client.

- [Go-Ethereum](https://github.com/ethereum/go-ethereum)
- [Nethermind](https://github.com/NethermindEth/nethermind)
- [Besu](https://github.com/hyperledger/besu)

## Using a third-party eth1 provider

Instead of running your own eth1 node, it is a lot easier to use a third-party provider such as Infura for this purpose. You can easily [sign-up here for free](https://infura.io/register) and get an API key which then entitles you to use their respective eth1 goërli testnet endpoints. 

Once you have an API key, you can then run a **Prysm eth2 beacon node** by pointing the `--http-web3provider` flag to your eth1 endpoint. For example, running an eth2 node connected to Infura's goerli eth1 endpoint is as follows:

```text
./prysm.sh beacon-chain --http-web3provider=https://goerli.infura.io/v3/YOUR-PROJECT-ID
```

## Running your own eth1 node

You can also run your own eth1 node in the full spirit of decentralization and use that for your eth2 Prysm beacon nodes. You can look at instructions on the various ways of running eth1 Goërli nodes [here](https://github.com/goerli/testnet#connecting-the-clients). We'll be giving an example of running a go-ethereum node on Goërli.

First, install go-ethereum [here](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum0).

```text
$ geth --goerli --datadir="$HOME/Goerli"
```

You should wait for your node to sync and then will be able to access its endpoint via `http://localhost:8545` by default.

Next, in a separate terminal window, you can run a Prysm beacon node according to our [installation instructions](https://docs.prylabs.network/docs/install/linux/) for your operating system, and then connect to your eth1 node with:

```text
./prysm.sh beacon-chain --http-web3provider=$HOME/Goerli/geth.ipc
```

## Other resources

The Nethermind team provided an awesome explanation on how to connect their eth1 node to a Lighthouse eth2 node, another implementation written in the Rust programming language. You can read more about it [here](https://medium.com/nethermind-eth/using-nethermind-to-run-a-validator-in-eth2-5c227653e197).

Other useful links are below:
- [What is the Goërli Testnet?](https://goerli.net/)
- [Goërli Testnet Explorer](https://goerli.etherscan.io/)
