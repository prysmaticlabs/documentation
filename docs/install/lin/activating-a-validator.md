---
id: activating-a-validator
title: Activating a Validator
sidebar_label: Activate a validator
---
This section outlines the step-by-step process for GNU/Linux found on prylabs.net to submit a deposit and initialise a validator for participation in the testnet.

![Prysm Single Validator Key Setup](/img/prysm-single-key.png)

## Step 1: Get Prysm

To begin, follow the instructions to fetch and install Prysm with either the [Prysm Installation Script](../linux), [Docker](./docker) or [Bazel](./bazel).

## Step 2: Get Göerli ETH - Test ether

You will be asked to link a wallet address to your validator with either the [Metamask](https://metamask.io/) browser extension \(recommended\) or [Portis](https://portis.io). Select your preferred platform and click through the steps presented.
![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-LuJpxGKxOpat8TfDxPP%2F-Lua4msnLMulYW-XYrN_%2F2.png?alt=media&token=8268d6b5-97da-414a-9110-141a7aaeb3de)

The wallet is scanned for the required amount of Göerli ETH after being linked. If the wallet does not have sufficient funds, you will be given the option to receive the required GöETH from our faucet.

## Step 3a: Generating a validator keypair

Depending on your platform, issue the appropriate command from the examples below to generate a public / private keypair for your validator.

#### Generating with prysm.sh

```text
./prysm.sh validator accounts create --keystore-path=$HOME/prysm/validator/
```

#### Generating with Docker

```bash
docker run -it -v $HOME/prysm/validator:/data \
   gcr.io/prysmaticlabs/prysm/validator:latest \
   accounts create --keystore-path=/data 
```

#### Generating with Bazel

```text
bazel run //validator -- accounts create --keystore-path=$HOME/prysm/validator
```

This command will output a `Raw Transaction Data` block:

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-LuJpxGKxOpat8TfDxPP%2F-Lua3OVmMOefnzXXvdGq%2F4.png?alt=media&token=96459a93-055c-4bf1-a0af-07a900d7b47f)

## Step 3b: Submitting the deposit data

**Method 1:** Copy and paste the deposit data into the field on prylabs.net:

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-Lua_6kBgtyMjsJFCSPr%2F-Lua_XtevNAg0ybDIGfI%2F77.png?alt=media&token=ee25ea72-3436-455e-b28c-66471b5ddf88)

**Method 2:** Users may also choose to submit the required 32 GöETH along with the data directly to the current deposit contract ****\(found [here](https://prylabs.net/contract)\). To enable the hex data field on the Send page in Metamask, click your wallets avatar &gt; Settings &gt; Advanced &gt; toggle 'Show hex data'.

## Step 4a: Starting up the beacon node

> **NOTICE:** If you have already started and syncronised your beacon node, this portion can be skipped.

The beacon node is a long running process that will require a dedicated terminal window. Depending on your platform, issue the appropriate command from the examples below to start the beacon node.

#### Starting the beacon-chain node with prysm.sh

```text
./prysm.sh beacon-chain --datadir=$HOME/beacon-chain
```

#### Starting the beacon-chain node with Docker

```text
docker run -it -v $HOME/prysm/beacon:/data -p 4000:4000 -p 13000:13000 \
  gcr.io/prysmaticlabs/prysm/beacon-chain:latest \
  --datadir=/data
```

#### Starting the beacon-chain node with Bazel

```text
bazel run //beacon-chain -- --datadir=$HOME/beacon-chain
```

The beacon node will spin up and immediately begin communicating with the Prysm testnet, outputting data similar to the image below.

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-Lua_6kBgtyMjsJFCSPr%2F-LuaaWo6lTgjk4e7WQ4p%2F9.png?alt=media&token=901b8c14-2a09-4365-bf63-1991c4996544)

The process of syncronising may take a while; the incoming block per second capacity is dependent upon the connection strength, network congestion and overall peer count.

## Step 4b: Securing the validator key

#### Securing the validator key with Docker

Create a file at $HOME/prysm/validator/keystore.json with the following contents (change the passphrase):

```
{
  "path": "/data",
  "passphrase": "changeme"
}
```

#### Securing the validator key for use with prysm.sh or Bazel

Create a file at $HOME/prysm/validator/keystore.json using the following command:

```
cat >> $HOME/prysm/validator/keystore.json << EOF
{
  "path": "$HOME/prysm/validator",
  "passphrase": "changeme"
}
EOF

```

Edit the file using your preffered text editor (e.g. nano or vi) and change the passphrase.

```
nano $HOME/prysm/validator/keystore.json
```

## Step 4c: Starting up the validator client

> **NOTICE:** The beacon-chain node you are using should be **completely synced** before submitting your deposit. You may **incur minor inactivity balance penalties** if the validator is unable to perform its duties by the time the deposit is processed and activated by the ETH2 network.

Open a second terminal window. Depending on your platform, issue the appropriate command from the examples below to start the validator.

#### Starting the validator client with prysm.sh

```text
./prysm.sh validator --keymanager=keystore --keymanageropts=${HOME}/prysm/validator/keystore.json
```

#### Starting the validator client with Docker

```text
docker run -it -v $HOME/prysm/validator:/data --network="host" \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  --beacon-rpc-provider=127.0.0.1:4000 \
  --keymanager=keystore \
  --keymanageropts=/data/keystore.json
```

#### Starting the validator client with Bazel

```text
bazel run //validator -- --keymanager=keystore --keymanageropts=${HOME}/prysm/validator/keystore.json
```

## Step 5: Submitting the deposit contract

Once both the beacon node and validator client are successfully running, make your deposit by clicking the button and following the steps presented in your wallet.

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-LuJpxGKxOpat8TfDxPP%2F-Lua3RjIGSbGQbe7NrjZ%2F5.png?alt=media&token=0561a974-edf7-49f9-b225-8997982eb8e0)

## Step 6: Wait for your validator assignment

Please note that it may take up to 12 hours for nodes in the ETH2 network to process a deposit. In the meantime, leave both terminal windows open and running; once the node is activated by the ETH2 network, the validator will immediately begin receiving tasks and performing its responsibilities.

> NOTE: Additional information about the status of your ETH 1 deposit and validator is availble on a number of [block explorers](/docs/devtools/block-explorers).

## Running multiple validators

Multiple validator keys can easily be initialised on the same validator process.

![Prysm Single Validator Key Setup](/img/prysm-multiple-keys.png)

 Simply repeat the following steps:
 * [Step 3a](activating-a-validator#step-3a-generating-a-validator-keypair) to generate additional validator keys in the same keystore path, using the same password.
 * [Step 3b](activating-a-validator#step-3b-submitting-the-deposit-data) to deposit 32 Göerli ETH for each validator key
 * Now restart the validator process, and it will automatically detect the new keys!

For running multiple keypairs alongside multiple validator instances, or to use different passwords refer the [wallet keymanager](/docs/prysm-usage/wallet-keymanager) section of this documentation.

**Congratulations, you are now fully participating in the Prysm ETH 2.0 Phase 0 testnet!** ♡

**Still have questions?**  Stop by our [Discord](https://discord.gg/KSA7rPr) for further assistance!
