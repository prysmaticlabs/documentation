---
id: mac
title: Installing Prysm on macOS
sidebar_label: Prysm installation script
---

Prysm can be installed on macOS systems using the Prysm build script. This page includes instructions for performing this process.

**Have questions?** Stop by the [#documentation](https://discord.gg/QQZMCgU) channel on Discord and let us know.

## System requirements

### Minimum specifications
These specifications must be met in order to successfuly run the Prysm client.
* Operating System: 64-bit Linux, Mac OS X 10.14+, Windows
* Processor: Intel Core i5–760 or AMD FX-8100 or better
* Memory: 4GB RAM
* Storage: 20GB available space SSD
* Internet: Broadband connection

### Recommended specifications
These hardware specifications are recommended, but not required to run the Prysm client.
* Processor: Intel Core i7–4770 or AMD FX-8310 or better
* Memory: 8GB RAM
* Storage: 100GB available space SSD
* Internet: Broadband connection

  > **NOTICE:** You must have Homebrew installed. To do so, run the command `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`.

## Installing the beacon chain and validator

The easiest way to install the beacon chain and validator is by running the `prysm.sh` script found in the main directory of the [Prysm repository](https://github.com/prysmaticlabs/prysm). This script will download and start up the latest release of Prysm binaries compatible with the host system.

### Running the Prysm startup script

1. Create a working directory and enter it:

```sh
mkdir prysm && cd prysm
```

2. Fetch the `prysm.sh` script from Github and make it executable:

```sh
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh
```

3. Run the `prysm.sh` script alongside any [startup parameters](../prysm-usage/parameters):

```sh
./prysm.sh beacon-chain
```

> Not getting enough peers?  Refer to the [improve P2P connectivity](/docs/prysm-usage/p2p-host-ip) section of this documentation for tips on network configuration.

The `prysm.sh` script will now download and initialise the beacon chain with the specified parameters. The terminal will produce output like so:

```sh
./prysm.sh beacon-chain
Latest Prysm version is v0.3.3.
Downloading beacon chain@v0.3.3 to /home/{USER}/prysm/dist/beacon-chain-v0.3.3-linux-amd64 (automatically selected latest available version)
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   622  100   622    0     0   2320      0 --:--:-- --:--:-- --:--:--  2312
100 39.6M  100 39.6M    0     0  13.6M      0  0:00:02  0:00:02 --:--:-- 20.4M
Downloading validator@v0.3.3 to /home/{USER}/prysm/dist/validator-v0.3.3-linux-amd64 (automatically selected latest available version)
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   619  100   619    0     0   1484      0 --:--:-- --:--:-- --:--:--  1484
100 32.5M  100 32.5M    0     0  12.6M      0  0:00:02  0:00:02 --:--:-- 21.7M
Starting Prysm beacon-chain
...
```

At this point, the beacon chain data will begin syncronising up to the latest head block. Please note that, depending on your network capacity and CPU, this process may take several hours. Once it is complete, you will be ready to make a deposit and begin setting up a validator client.

  > **NOTICE:** The beacon node you are using should be **completely synced** before submitting your deposit for the validator client, otherwise the validator will not be able to validate and will **inflict minor inactivity balance penalties**.

## Staking ETH: Running a validator client

For step-by-step assistance with performing a deposit and setting up a validator client, see the [activating a validator ](/docs/install/mac/activating-a-validator)section of this documentation.

Once your beacon node is up, the chain will be waiting for you to deposit 32 Goerli ETH into a [validator deposit contract](/docs/prysm-usage/validator-deposit-contract) in order to activate your validator \(discussed in the section below\).

**If you need Goerli ETH**, follow the instructions found on [prylabs.network](https://prylabs.network) to use the testnet faucet. Otherwise, you can contact a team member on Discord to be sent some.

Please note that **it may take up to 12 hours** for the nodes in the network to process a deposit. Once the node is active, the validator will immediately begin performing its responsibilities.

In your validator client, you will be able to frequently see your validator balance as it goes up over time. Note that, should your node ever go offline for a long period, a validator will start gradually losing its deposit until it is removed from the network entirely.

**Congratulations! If you've made it this far, you are now running Ethereum 2.0 Phase 0.**
