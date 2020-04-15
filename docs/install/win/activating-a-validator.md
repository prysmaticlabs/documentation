---
id: activating-a-validator
title: Activating a Validator
sidebar_label: Activate a validator
---
This section outlines the step-by-step process found on prylabs.net to submit a deposit and initialise a validator for participation in the testnet.


## Downloading Prysm

To begin, follow the instructions found in the [installation section](./#installing-prysm) of the [Getting Started](./) guide to fetch and install Prysm with either Docker or Bazel.

## Receiving Göerli ETH

On step 2, you will be asked to link a wallet address to your validator with either the [Metamask](https://metamask.io/) browser extension \(recommended\) or [Portis](https://portis.io). Select your preferred platform and click through the steps presented.

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-LuJpxGKxOpat8TfDxPP%2F-Lua4msnLMulYW-XYrN_%2F2.png?alt=media&token=8268d6b5-97da-414a-9110-141a7aaeb3de)

The wallet is scanned for the required amount of Göerli ETH after being linked. If the wallet does not have sufficient funds, you will be given the option to receive the required GöETH from our faucet.

## Generating a validator keypair

Step 3 requires running a command to generate a public / private keypair for your validator, as well as deposit data to submit on the prylabs.net page. Depending on your platform, issue the appropriate command from the examples below.

#### Generating with Docker on GNU/Linux or macOS

```bash
docker run -it -v $HOME/prysm/validator:/data \
   gcr.io/prysmaticlabs/prysm/validator:latest \
   accounts create --keystore-path=/data --password=changeme
```

#### Generating with Docker on Windows

```text
docker run -it -v c:/prysm:/data gcr.io/prysmaticlabs/prysm/validator:latest accounts create --keystore-path=/data --password=changeme
```

#### Generating with Bazel

```text
bazel run //validator -- accounts create --keystore-path=$HOME/beacon-chain --password=changeme
```

This command will output a `Raw Transaction Data` block:

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-LuJpxGKxOpat8TfDxPP%2F-Lua3OVmMOefnzXXvdGq%2F4.png?alt=media&token=96459a93-055c-4bf1-a0af-07a900d7b47f)

## Submitting the deposit data

**Method 1:** Copy and paste the deposit data into the field on prylabs.net:

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-Lua_6kBgtyMjsJFCSPr%2F-Lua_XtevNAg0ybDIGfI%2F77.png?alt=media&token=ee25ea72-3436-455e-b28c-66471b5ddf88)

**Method 2:** Users may also choose to submit the required 32 GöETH along with the data directly to the current deposit contract ****\(found [here](https://prylabs.net/contract)\). To enable the hex data field on the Send page in Metamask, click your wallets avatar &gt; Settings &gt; Advanced &gt; toggle 'Show hex data'.

## Starting up the beacon node

**NOTICE:** If you have already started and syncronised your beacon node by following the [Getting Started](./#connecting-to-the-testnet-running-a-beacon-node) guide section on the topic, this portion can be skipped.


Open a terminal window. Depending on your platform, issue the appropriate command from the examples below to start the beacon node.

#### Starting the beacon node with Docker on GNU/Linux or macOS

```text
docker run -it -v $HOME/prysm/beacon:/data -p 4000:4000 -p 13000:13000 \
  gcr.io/prysmaticlabs/prysm/beacon-chain:latest \
  --datadir=/data
```

#### Starting the beacon node with Docker on Windows

```text
docker run -it -v c:/prysm/beacon:/data -p 4000:4000 -p 13000:13000 gcr.io/prysmaticlabs/prysm/beacon-chain:latest --datadir=/data
```

#### Starting the beacon node with Bazel

```text
bazel run //beacon-chain -- --datadir=$HOME/beacon-chain
```

The beacon node will spin up and immediately begin communicating with the Prysm testnet, outputting data similar to the image below.

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-Lua_6kBgtyMjsJFCSPr%2F-LuaaWo6lTgjk4e7WQ4p%2F9.png?alt=media&token=901b8c14-2a09-4365-bf63-1991c4996544)

The process of syncronising may take a while; the incoming block per second capacity is dependent upon the connection strength, network congestion and overall peer count.

## Starting up the validator client

**NOTICE:** The beacon node you are using should be **completely synced** before submitting your deposit for the validator client, otherwise the validator will not be able to validate and will **inflict minor inactivity balance penalties**.


Open a second terminal window. Depending on your platform, issue the appropriate command from the examples below to start the validator.

#### Starting the validator client with Docker on GNU/Linux or macOS

```text
docker run -it -v $HOME/prysm/validator:/data --network="host" \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  --beacon-rpc-provider=127.0.0.1:4000 \
  --keymanager=keystore \
  --keymanageropts='{"path":"/data","passphrase":"changeme"}'
```

#### Starting the validator client with Docker on Windows

```text
docker run -it -v $HOME/prysm/validator:/data --network="host" gcr.io/prysmaticlabs/prysm/validator:latest --beacon-rpc-provider=127.0.0.1:4000 --keymanager=keystore --keymanageropts='{"path":"/data","passphrase":"changeme"}'
```

#### Starting the validator client with Bazel

```text
bazel run //validator -- --keymanager=keystore --keymanageropts='{"path":"'${HOME}'/beacon-chain","passphrase":"changeme"}'
```

## Submitting the deposit contract

Once both the beacon node and validator client are successfully running, make your deposit by clicking the button and following the steps presented in your wallet.

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-LuJpxGKxOpat8TfDxPP%2F-Lua3RjIGSbGQbe7NrjZ%2F5.png?alt=media&token=0561a974-edf7-49f9-b225-8997982eb8e0)

It will take a while for the nodes in the network to process a deposit. Once the node is active, the validator will immediately begin performing its responsibilities.

The validator is now awaiting its first assignment from the network. This should only take a few minutes, and an indication will be displayed on both the prylabs.net page as well as the validator client.

**Congratulations, you are now fully participating in the Prysm testnet!** ♡

**Still have questions?**  Stop by our [Discord](https://discord.gg/KSA7rPr) for further assistance!
