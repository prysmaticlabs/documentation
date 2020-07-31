---
id: install-with-bazel
title: Installing Prysm from source with Bazel
sidebar_label: Building from source
---

Prysm can be installed on GNU/Linux, MacOS, and Arm64 using our build tool, Bazel. This page includes instructions for performing this method.

:::tip Pro-Tip
**NOTICE:** The Prysm installation script is the easiest and most efficient way of installing the latest binaries. Instructions for using it can be found [here](/docs/install/linux).
:::

**Have questions?** Stop by the [#documentation](https://discord.gg/QQZMCgU) channel on Discord and let us know.

## System requirements

### Minimum specifications

These specifications must be met in order to successfully run the Prysm client.

* Operating System: 64-bit GNU/Linux, MacOS
* Processor: Intel Core i5–760 or AMD FX-8100 or better
* Memory: 4GB RAM
* Storage: 20GB available space SSD
* Internet: Broadband connection

### Recommended specifications

These hardware specifications are recommended, but not required to run the Prysm client.

* Processor: Intel Core i7–4770 or AMD FX-8310 or better
* Memory: 8GB RAM
* Storage: 100GB available space SSD

## Dependencies

* A modern UNIX operating system
* The latest release (3.2.0 onwards) of [Bazel](https://docs.bazel.build/versions/master/install.html) installed
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

:::tip Connectivity
It is recommended to open up port tcp/13000 and udp/12000 on your local router to improve connectivity and receive more peers from the network. To do so, navigate to `192.168.0.1` in your browser and login if required. Follow along with the interface to modify your routers firewall settings. When this task is completed, append the parameter`--p2p-host-ip=$(curl -s ident.me)` to your selected beacon startup command presented in this section to use the newly opened port.
:::

To start your [beacon node](/docs/how-prysm-works/beacon-node) with Bazel, issue the following command:

```text
bazel run //beacon-chain -- --datadir=$HOME/.eth2 
```

This will sync up the beacon node with the latest head block in the network. If the network hasn't started yet, it will process eth1 deposits from the deposit contract so far and await the genesis time.

:::info Syncing the Blockchain
The beacon node you are using should be **completely synced** before submitting your deposit for the validator client, otherwise the validator will not be able to validate and will **inflict minor inactivity balance penalties**. No need to worry about this if the chain has not yet started.
:::

Now that your beacon chain is setup, you can then run a validator on the **Medalla testnet** by following our detailed guidelines [here](/docs/testnet/medalla-testnet)