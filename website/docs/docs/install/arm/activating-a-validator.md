---
id: activating-a-validator
title: Activating a validator
sidebar_label: Activate a validator
---
This section outlines the step-by-step process for ARM64 found on prylabs.net to submit a deposit and initialise a validator for participation in the testnet.

## Step 1: Get Prysm

To begin, follow the instructions to fetch and install Prysm with either the [Prysm Installation Script](/docs/install/arm), or [Bazel](/docs/install/arm/bazel).
> **NOTICE:** Docker images are not currently generated for ARM64

## Step 2: Get Göerli ETH - Test ether

You will be asked to link a wallet address to your validator with either the [Metamask](https://metamask.io/) browser extension \(recommended\) or [Portis](https://portis.io). Select your preferred platform and click through the steps presented.
![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-LuJpxGKxOpat8TfDxPP%2F-Lua4msnLMulYW-XYrN_%2F2.png?alt=media&token=8268d6b5-97da-414a-9110-141a7aaeb3de)

The wallet is scanned for the required amount of Göerli ETH after being linked. If the wallet does not have sufficient funds, you will be given the option to receive the required GöETH from our faucet.

## Step 3a: Generating a validator keypair

Depending on your platform, issue the appropriate command from the examples below to generate a public / private keypair for your validator.

> **NOTICE:** When prompted, provide a password to encrypt your new ETH2 validator and withdrawal keys.

#### Generating with prysm.sh

```text
./prysm.sh validator accounts create --keystore-path=$HOME/.eth2validators
```

#### Generating with Bazel

```text
bazel run //validator -- accounts create --keystore-path=$HOME/.eth2validators
```

This command will output a `Raw Transaction Data` block:

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-LuJpxGKxOpat8TfDxPP%2F-Lua3OVmMOefnzXXvdGq%2F4.png?alt=media&token=96459a93-055c-4bf1-a0af-07a900d7b47f)

## Step 3b: Submitting the deposit data

> **NOTICE:** The beacon-chain node you are using should be **completely synced** before submitting your deposit. You may **incur minor inactivity balance penalties** if the validator is unable to perform its duties by the time the deposit is processed and activated by the ETH2 network.

**Method 1:** Copy and paste the deposit data into the field on prylabs.net:

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-Lua_6kBgtyMjsJFCSPr%2F-Lua_XtevNAg0ybDIGfI%2F77.png?alt=media&token=ee25ea72-3436-455e-b28c-66471b5ddf88)

**Method 2:** Users may also choose to submit the required 32 GöETH along with the data directly to the current deposit contract ****\(found [here](https://prylabs.net/contract)\). To enable the hex data field on the Send page in Metamask, click your wallets avatar &gt; Settings &gt; Advanced &gt; toggle 'Show hex data'.

## Step 4a: Starting up the beacon node

> **NOTICE:** If you have already started and synchronised your beacon node, this portion can be skipped.

The beacon node is a long running process that will require a dedicated terminal window. Depending on your platform, issue the appropriate command from the examples below to start the beacon node.

#### Starting the beacon-chain node with prysm.sh

```text
./prysm.sh beacon-chain --datadir=$HOME/.eth2
```

#### Starting the beacon-chain node with Bazel

```text
bazel run //beacon-chain -- --datadir=$HOME/.eth2
```

The beacon-chain node will spin up and immediately begin communicating with the Prysm testnet, outputting data similar to the image below.

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-Lua_6kBgtyMjsJFCSPr%2F-LuaaWo6lTgjk4e7WQ4p%2F9.png?alt=media&token=901b8c14-2a09-4365-bf63-1991c4996544)

The process of synchronising may take a while; the incoming block per second capacity is dependent upon the connection strength, network congestion and overall peer count.

## Step 4b: Starting up the validator client

Open a second terminal window. Depending on your platform, issue the appropriate command from the examples below to start the validator.

> **NOTICE:** When prompted, provide the password used to encrypt your ETH2 validator key.

#### Starting the validator client with prysm.sh

```text
./prysm.sh validator --keystore-path=$HOME/.eth2validator
```

#### Starting the validator client with Bazel

```text
bazel run //validator -- --keystore-path=$HOME/.eth2validators
```

## Step 5: Submitting the deposit contract

Once both the beacon node and validator client are successfully running, make your deposit by clicking the button and following the steps presented in your wallet.

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-LuJpxGKxOpat8TfDxPP%2F-Lua3RjIGSbGQbe7NrjZ%2F5.png?alt=media&token=0561a974-edf7-49f9-b225-8997982eb8e0)

## Step 6: Wait for your validator assignment

Please note that it may take up to 12 hours for nodes in the ETH2 network to process a deposit. In the meantime, leave both terminal windows open and running; once the node is activated by the ETH2 network, the validator will immediately begin receiving tasks and performing its responsibilities.

To check on the status of your validator, run the following command:

#### Check validator status with prysm.sh

```text
./prysm.sh validator accounts status --keymanager=keystore --keymanageropts=$HOME/.eth2validator --beacon-rpc-provider=localhost:4000
```

#### Check validator status with Bazel

```text
bazel run validator accounts status -- --keymanager=keystore --keymanageropts=$HOME/.eth2validator  --beacon-rpc-provider=localhost:4000
```

Additional information about the validator and status of ETH1 deposits is also available on various testnet [block explorers](/docs/devtools/block-explorers).

## Running multiple validators

Multiple validator keys can easily be initialised on the same validator process.

 Simply repeat the following steps:
 * [Step 3a](activating-a-validator#step-3a-generating-a-validator-keypair) to generate additional validator keys in the same keystore path, using the same password.
 * [Step 3b](activating-a-validator#step-3b-submitting-the-deposit-data) to deposit 32 Göerli ETH for each validator key
 * Now restart the validator process, and it will automatically detect the new keys!

For running multiple keypairs alongside multiple validator instances, or to use different passwords refer the [wallet keymanager](/docs/prysm-usage/wallet-keymanager) section of this documentation.

**Congratulations, you are now fully participating in the Prysm ETH 2.0 Phase 0 testnet!** ♡

**Still have questions?**  Stop by our [Discord](https://discord.gg/KSA7rPr) for further assistance!
