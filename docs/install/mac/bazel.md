---
id: bazel
title: Installing Prysm on macOS with Bazel
sidebar_label: Installing with Bazel
---


   > **NOTICE:** The Prysm installation script is the easiest and most efficient way of installing the latest binaries. Instructions for using it can be found [here](/docs/install/mac).

Prysm can be installed on macOS using our build tool, Bazel. This page includes instructions for performing this method.

**Have questions?** Stop by the [#documentation](https://discord.gg/QQZMCgU) channel on Discord and let us know.

## Dependencies

* A modern macOS operating system
* The latest release of [Bazel](https://docs.bazel.build/versions/master/install.html) installed
* The `cmake` package installed
* The `git` package installed

## Installing the beacon chain and validator

1. Open a terminal window. Ensure you are running the most recent version of Bazel by issuing the command:

```text
bazel version
```

2. Clone Prysm's [main repository](https://github.com/prysmaticlabs/prysm) and enter the directory:

```text
git clone https://github.com/prysmaticlabs/prysm
cd prysm
```

3. Build both the beacon chain node and the validator client:

```text
bazel build //beacon-chain:beacon-chain
bazel build //validator:validator
```

Bazel will automatically pull and install any dependencies as well, including Go and necessary compilers.

## Connecting to the testnet: running a beacon node

Below are instructions for initialising a beacon node and connecting to the public testnet. To further understand the role that the beacon node plays in Prysm, see [this section](/docs/how-prysm-works/architecture-overview) of the documentation.


   > **NOTICE:** It is recommended to open up port 13000 on your local router to improve connectivity and receive more peers from the network. To do so, navigate to `192.168.0.1` in your browser and login if required. Follow along with the interface to modify your routers firewall settings. When this task is completed, append the parameter`--p2p-host-ip=$(curl -s ident.me)` to your selected beacon startup command presented in this section to use the newly opened port.


To start your [beacon node](/docs/how-prysm-works/beacon-node) with Bazel, issue the following command:

```text
bazel run //beacon-chain -- --clear-db --datadir=$HOME/prysm
```

This will sync up the beacon node with the latest head block in the network.

  > **NOTICE:** The beacon node must be **completely synced** before attempting to initialise a validator client, otherwise the validator will not be able to complete the deposit and **funds will lost**.

## Staking ETH: Running a validator client

For step-by-step assistance with performing a deposit and setting up a validator client, see the [activating a validator ](/docs/install/mac/activating-a-validator)section of this documentation.

Once your beacon node is up, the chain will be waiting for you to deposit 32 Goerli ETH into a [validator deposit contract](/docs/how-prysm-works/validator-deposit-contract) in order to activate your validator \(discussed in the section below\).

**If you need Goerli ETH**, follow the instructions found on [prylabs.network](https://prylabs.network) to use the testnet faucet. Otherwise, you can contact a team member on Discord to be sent some.

Please note that **it may take up to 12 hours** for the nodes in the network to process a deposit. Once the node is active, the validator will immediately begin performing its responsibilities.

In your validator client, you will be able to frequently see your validator balance as it goes up over time. Note that, should your node ever go offline for a long period, a validator will start gradually losing its deposit until it is removed from the network entirely.

**Congratulations! If you've made it this far, you are now running Ethereum 2.0 Phase 0.**
