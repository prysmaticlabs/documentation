---
id: arm
title: Installing Prysm on ARM Hardware
sidebar_label: ARM installations
---

Prysm can be installed on ARM64 systems using the Prysm build script. This page includes instructions for performing this process.

**Have questions?** Stop by the [#documentation](https://discord.gg/QQZMCgU) channel on Discord and let us know.

## Dependencies

* A modern GNU/Linux operating system
* The `cmake` package installed (`sudo apt install cmake`)
* The `curl` package installed (`sudo apt install curl`)

## Installing the beacon chain and validator

The easiest way to install the beacon chain and validator is by running the `prysm.sh` script found in the main directory of the [Prysm repository](https://github.com/prysmaticlabs/prysm). This script will download and start up the latest release of Prysm binaries compatible with the host system.

> **NOTICE:** It is recommended to open up port 13000 on your local router to improve connectivity and receive more peers from the network. To do so, navigate to `192.168.0.1` in your browser and login if required. Follow along with the interface to modify your routers firewall settings. When this task is completed, append the parameter`--p2p-host-ip=$(curl -s ident.me)` to your selected beacon startup command presented in this section to use the newly opened port.

### Running the Prysm startup script

1. Create a working directory and enter it:

```sh
mkdir prysm && cd prysm
```

2. Fetch the `prysm.sh` script from Github:

```sh
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh
```

3. Run the `prysm.sh` script alongside any [startup parameters](../prysm-usage/parameters):

```sh
./prysm.sh beacon-chain --clear-db

It is also recommended to include the `--p2p-host-ip` and `--min-sync-peers 7` flags to improve peering. For advanced users that desire standard debugging tools found in the Busybox base image, append a `--debug` flag to enable them.

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

  Once your beacon node is up, the chain will be waiting for you to deposit 3.2 Goerli ETH into a [validator deposit contract](../how-prysm-works/validator-deposit-contract) in order to activate your validator.

  To begin setting up a validator, follow the instructions found on [prylabs.network](https://prylabs.network) to use the Göerli ETH faucet and make a deposit. For step-by-step assistance with the deposit page, see the [activating a validator ](../prysm-usage/activating-a-validator.md)section of this documentation. For instructions on setting up multiple validators on a single machine, see the [wallet keymanager](../prysm-usage/wallet-keymanager) section.

  It will take a while for the nodes in the network to process a deposit. Once the node is active, the validator will immediately begin performing its responsibilities.

  In your validator client, you will be able to frequently see your validator balance as it goes up over time. Note that, should your node ever go offline for a long period, a validator will start gradually losing its deposit until it is removed from the network entirely.

  **Congratulations, you are now running Ethereum 2.0 Phase 0!**
