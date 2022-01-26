---
id: install-with-bazel
title: Building Prysm from Source
sidebar_label: Building from Source
---

Prysm can be installed on GNU/Linux, MacOS, and Arm64 using our build tool, [Bazel](https://bazel.build). This page includes instructions for performing this method.

:::tip Pro-Tip
**NOTICE:** We recommend users install Bazelisk, the user-friendly launcher for Bazel. It identifies and manages the required Bazel version for any repository you want to build.
:::

**Have questions?** Stop by the [#documentation](https://discord.gg/prysmaticlabs) channel on Discord and let us know.

## System requirements

### Minimum specifications

These specifications must be met in order to successfully run the Prysm client.

* Operating System: 64-bit GNU/Linux, MacOS
* Processor: Intel Core i5–760 or AMD FX-8100 or better
* Memory: 8GB RAM
* Storage: 20GB available space SSD
* Internet: Broadband connection

### Recommended specifications

These hardware specifications are recommended, but not required to run the Prysm client.

* Processor: Intel Core i7–4770 or AMD FX-8310 or better
* Memory: 16GB RAM
* Storage: 100GB available space SSD

## Dependencies

* [Bazelisk](https://docs.bazel.build/versions/main/install-bazelisk.html) this will automatically manage the version of ***Bazel*** required. 
* The `cmake` package installed
* The `git` package installed
* `libssl-dev` installed
* `libgmp-dev` installed
* `libtinfo5` installed
* `libprotoc` version 3.14 installed

## Why Bazel?

Instead of using the `Go` tool to build Prysm, our team relies on the [Bazel](https://bazel.build) build system used by major companies to manage monorepositories. Bazel provides reproducible builds and a sandboxed environment that ensures everyone building Prysm has the same experience and can build our entire project from a single command. For more detailed rationale on why Bazel, how it works in Prysm, and all important information about how exactly building from source works, read our rationale [here](/docs/reading/bazel).

## Installing Prysm

### Install Bazel using Bazelisk

Bazelisk is a launcher for Bazel which automatically downloads and installs an appropriate version of Bazel. Use Bazelisk to automtically manage the version of Bazel required.  

You can install Bazelisk in multiple ways, including:

* npm install -g @bazel/bazelisk
* Using a binary release for Linux, macOS, or Windows [(Download binaries)](https://github.com/bazelbuild/bazelisk/releases)
* Using Homebrew on macOS
* By compiling from source using Go: go get github.com/bazelbuild/bazelisk

### Building Prysm from source

:::tip Pro-Tip
**NOTICE:** We recommend users install Bazelisk in the PATH in place of the Bazel binary. This can be done by simply replacing **/usr/local/bin/bazel** (*default location*) with the **bazelisk**  binary. This will ensure users no longer need to maintain the version of **bazel** in use. Full installation details and options for Bazelisk are available [Here.](https://github.com/bazelbuild/bazelisk/blob/master/README.md#installation) 
:::

1. Clone Prysm's [main repository](https://github.com/prysmaticlabs/prysm), make sure you switch to the latest version (the latest version number can be found from the [releases page](https://github.com/prysmaticlabs/prysm/releases)), and enter the directory:

```text
git clone https://github.com/prysmaticlabs/prysm
git checkout <version>
cd prysm
```

2. Build both the beacon chain node and the validator client:

```text
bazel build //beacon-chain:beacon-chain --config=release
bazel build //validator:validator --config=release
```

Bazel will automatically pull and install any dependencies as well, including Go and necessary compilers.

## Running a Beacon Node

### Before you begin: pick your network

When running Prysm, you can choose to run in the **main network** which has real assets at stake, or in a **test network** which is used by developers and stakers that might want to gain some confidence before depositing 32 ETH to validate. The currently supported networks in Prysm are

* [Mainnet](https://launchpad.ethereum.org) which is the current, live version of Ethereum proof-of-stake with billions of dollars worth of real ETH
* [Prater testnet](https://prater.launchpad.ethereum.org) which is a useful staging testnet for development and users that want to try things out before hopping into the real mainnet

Mainnet is enabled by **default** in all Prysm commands. If you want to use the **Prater** testnet, just add `--prater` to _all_ your Prysm commands.

:::danger Make sure you are running on the main network (mainnet) if using real money! 
Do not use `--prater` if you are using real funds and staking your ETH on mainnet. Testnets use testnet ETH to run the network and do not represent real value.
:::

### Step 1: Set up an Eth1 Endpoint

First, let's run a beacon node connected to the main eth2 network. To run a beacon node, you will need access to an eth1 node. We have dedicated instructions for this [here](/docs/prysm-usage/setup-eth1).

### Step 2: Sync your beacon node

Note: <YOUR_ETH1_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`.

**Mainnet**

```text
bazel run //beacon-chain --config=release -- --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```

**Prater**

Download the genesis state from [github.com/eth2-clients/eth2-networks/raw/master/shared/prater/genesis.ssz](https://github.com/eth2-clients/eth2-networks/raw/master/shared/prater/genesis.ssz) to a local file, then run

```text
bazel run //beacon-chain --config=release -- --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT> --prater --genesis-state=/path/to/genesis.ssz
```

## Running a Validator

A validator is an optional process that can be attached to a running beacon node to stake your ETH and participate in the chain's consensus. It is the analogue of a **miner** from proof-of-work-based systems.

### Before you begin: pick your network

When running Prysm, you can choose to run in the **main network** which has real assets at stake, or in a **test network** which is used by developers and stakers that might want to gain some confidence before depositing 32 ETH to validate. The currently supported networks in Prysm are

* [Mainnet](https://launchpad.ethereum.org) which is the current, live version of Ethereum proof-of-stake with billions of dollars worth of real ETH
* [Prater testnet](https://prater.launchpad.ethereum.org) which is a useful staging testnet for development and users that want to try things out before hopping into the real mainnet

Mainnet is enabled by **default** in all Prysm commands. If you want to use the **Prater** testnet, just add `--prater` to _all_ your Prysm commands.

### Step 1: Ensure your beacon node is synced

An important step in the process is ensuring your beacon node is all set up before trying to run a validator. This is because after your validator is inducted into the participating validator set, it is expected to begin performing its duties almost right away. It is important to run a validator with a node that is synchronized to the chain head so you can start earning ETH instead of losing it.

:::tip Syncing your node
The beacon-chain node you are using should be **completely synced** before submitting your deposit. You may **incur minor inactivity balance penalties** if the validator is unable to perform its duties by the time the deposit is processed and activated by the beacon chain network.
:::

You can check the sync status of your node with the following command on most systems:

```text
curl http://localhost:3500/eth/v1alpha1/node/syncing
```

If your node is done synchronizing, you will see the response:

```text
{"syncing":false}%
```

### Step 2: Send your validator deposit via the Ethereum validator launchpad

:::danger Ensure You Are Not Being Scammed
The correct address for the launchpad is https://launchpad.ethereum.org and the only, official validator deposit contract is [0x00000000219ab540356cbb839cbe05303d7705fa](https://etherscan.io/address/0x00000000219ab540356cbb839cbe05303d7705fa). Do not send ETH directly to the contract, and only join by using the eth2 launchpad.
:::

The [Mainnet Eth2 Launchpad](https://launchpad.ethereum.org/summary) is the easiest way to go through a step-by-step process to deposit your 32 ETH to become a validator. If you want to participate in the **testnet**, you can navigte to the [Prater Eth2 Launchpad](https://prater.launchpad.net/summary) instead

Throughout the process, you'll be asked to generate new validator credentials using the official Ethereum deposit command-line-tool [here](https://github.com/ethereum/eth2.0-deposit-cli). Make sure you use the `mainnet` option when generating keys with the deposit CLI. During the process, you will have generated a `validator_keys` folder under the `eth2.0-deposit-cli` directory. You can import all of your validator keys into Prysm from that folder in the next step.

### Step 3: Import keystores into Prysm

For this step, you'll need to copy the path to the `validator_keys` folder under the `eth2.0-deposit-cli` directory you created during the launchpad process. For example, if your eth2.0-deposit-cli installation is in your `$HOME` (or `%LOCALAPPDATA%` on Windows) directory, you can then run the following commands for your operating system

Note: You will be asked to do a one time acknowledgement of our [Terms of Use](https://github.com/prysmaticlabs/prysm/blob/master/TERMS_OF_SERVICE.md). You can also read the legal terms first, then confirm them via a flag using --accept-terms-of-use in both your beacon node and validator.

```text
bazel run //validator:validator -- accounts import --keys-dir=$HOME/eth2.0-deposit-cli/validator_keys
```

### Step 4: Run your Prysm validator

Open a second terminal window. Depending on your platform, issue the appropriate command from the examples below to start the validator.

```text
bazel run //validator --config=release
```

### Step 6: Wait for your validator assignment

Please note it will take time for nodes in the network to process a deposit. To understand the timeline of becoming a validator and how long it takes on average, please read [this knowledge base](https://kb.beaconcha.in/ethereum-2.0-depositing). In the meantime, leave both terminal windows open and running; once the validator is activated by the ETH2 network, it will immediately begin receiving tasks and performing its responsibilities. If the eth2 chain has not yet started, the validator will be ready to start proposing blocks and signing votes as soon as the genesis time is reached.

To check on the status of your validator, we recommend checking out the popular block explorers: [beaconcha.in](https://beaconcha.in) by Bitfly and [beacon.etherscan.io](https://beacon.etherscan.io) by the Etherscan team.

![image](https://i.imgur.com/CDNc6Ft.png)

## Building Docker Images from Source

We use Bazel to build the Docker images for Prysm as well. This section outlines comprehensive instructions on how to build them by yourself, run them in Docker, and push to an image registry if desired. In particular, we use [`bazel rules docker`](https://github.com/bazelbuild/rules_docker) which provides us the ability to specify a base, barebones image, and essentially builds our binary and creates a Docker container as a simple wrapper over our binaries.

We do not write our own Dockerfiles, as Bazel provides us a more sandboxed, simple experience with all of its benefits. To see an example use of `bazel rules docker` for how we build a particular package, see [here](https://github.com/prysmaticlabs/prysm/blob/aa389c82a157008741450ba1e04d898924734432/tools/bootnode/BUILD.bazel#L36). 

### Dependencies needed

* All specified dependencies for building with Bazel [here](/docs/install/install-with-bazel#dependencies)
* Python installed and available in your computer

### Build process

#### Regular Docker images

At the moment, Prysm docker images can only be built on **Linux** operating systems. The standard images are very thin wrappers around the Prysm beacon-chain and validator binaries, and do not contain any other typical components of Docker images such as a bash shell. These are the Docker images we ship to all users, and you can build them yourself as follows:

```bash
bazel build //beacon-chain:image_bundle --config=release
bazel build //validator:image_bundle --config=release
```

The tags for the images are specified [here](https://github.com/prysmaticlabs/prysm/blob/ff329df808ad68fbe79d11c73121fa6a7a0c0f29/cmd/beacon-chain/BUILD.bazel#L58) for the beacon-chain and [here](https://github.com/prysmaticlabs/prysm/blob/ff329df808ad68fbe79d11c73121fa6a7a0c0f29/cmd/validator/BUILD.bazel#L59) for the validator. The default image tags for these images are:

```text
gcr.io/prysmaticlabs/prysm/beacon-chain:latest
gcr.io/prysmaticlabs/prysm/validator:latest
```

You can edit these in the links above to your liking.

#### Alpine images

Prysm also provides Alpine images built using:

```bash
bazel build //beacon-chain:image_bundle_alpine --config=release
bazel build //validator:image_bundle_alpine --config=release
```

#### Debug images

Prysm also provides debug images built using:

```bash
bazel build //beacon-chain:image_bundle_debug --config=release
bazel build //validator:image_bundle_debug --config=release
```

### Running images

You can load the images into your local Docker daemon by first building a `.tar` file as follows for your desired image bundle:

```text
bazel build cmd/beacon-chain:image_bundle.tar
bazel build cmd/validator:image_bundle.tar
```

Then, you can load it into Docker with:
```text
docker load -i bazel-bin/my/image/helloworld.tar
```

For example, you may see output such as this:

```
docker load -i bazel-bin/cmd/beacon-chain/image_bundle.tar
fd6fa224ea91: Loading layer [==================================================>]  3.031MB/3.031MB
87c9f1582ca0: Loading layer [==================================================>]  15.44MB/15.44MB
231bdbae9aea: Loading layer [==================================================>]  1.966MB/1.966MB
a6dc470c72b7: Loading layer [==================================================>]  10.24kB/10.24kB
a0de9c673ef6: Loading layer [==================================================>]  56.37MB/56.37MB
84ff92691f90: Loading layer [==================================================>]  10.24kB/10.24kB
Loaded image: gcr.io/prysmaticlabs/prysm/beacon-chain:latest
Loaded image: prysmaticlabs/prysm-beacon-chain:latest
```

### Pushing to a container registry

#### Authentication

You can use these rules to access private images using standard Docker
authentication methods.  e.g. to utilize the [Google Container Registry](
https://gcr.io). See
[here](https://cloud.google.com/container-registry/docs/advanced-authentication) for authentication methods.

See:
* [Amazon ECR Docker Credential Helper](
  https://github.com/awslabs/amazon-ecr-credential-helper)
* [Azure Docker Credential Helper](
  https://github.com/Azure/acr-docker-credential-helper)

#### Push

To push the actual images, you do not need to build the image bundle beforehand. You can do a simple:

```text
bazel run //beacon-chain:push_images --config=release
bazel run //validator:push_images --config=release
```

Which will deploy all images with the tags specified in [here](https://github.com/prysmaticlabs/prysm/blob/ff329df808ad68fbe79d11c73121fa6a7a0c0f29/cmd/beacon-chain/BUILD.bazel#L58) for the beacon-chain and [here](https://github.com/prysmaticlabs/prysm/blob/ff329df808ad68fbe79d11c73121fa6a7a0c0f29/cmd/validator/BUILD.bazel#L59) for the validator. 

By default, this will deploy to Prysmatic Labs' Google Container Registry namespace: `gcr.io/prysmaticlabs/prysm`, which you will not have authentication access to, so make sure you edit the image tags to your appropriate registry and authenticate as needed.
