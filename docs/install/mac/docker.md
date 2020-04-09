---
id: docker
title: Installing Prysm on macOS with Docker
sidebar_label: Installing with Docker
---

   > **NOTICE:** Docker is no longer a recommended installation method. Instead, please use the Prysm installation script instructions found [here](/docs/install/linux).

Prysm can be installed on macOS systems with Docker. This page includes instructions for performing this method.

**Have questions?** Stop by the [#documentation](https://discord.gg/QQZMCgU) channel on Discord and let us know.

## Dependencies

#### **For Docker installations:**

* A modern macOS operating system
* The latest release of [Docker](https://docs.docker.com/install/) installed


## Installing the beacon chain and validator


1. Ensure you are running the most recent version of Docker by issuing the command:

```text
docker -v
```

2. To pull the Prysm images, issue the following commands:

```text
docker pull gcr.io/prysmaticlabs/prysm/validator:latest
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:latest
```

This process will also install any related dependencies.

## Connecting to the testnet: running a beacon node

Below are instructions for initialising a beacon node and connecting to the public testnet. To further understand the role that the beacon node plays in Prysm, see [this section](../how-prysm-works/overview-technical) of the documentation.


   > **NOTICE:** It is recommended to open up port 13000 on your local router to improve connectivity and receive more peers from the network. To do so, navigate to `192.168.0.1` in your browser and login if required. Follow along with the interface to modify your routers firewall settings. When this task is completed, append the parameter`--p2p-host-ip=$(curl -s ident.me)` to your selected beacon startup command presented in this section to use the newly opened port.


To start your beacon node, issue the following command:

```text
docker run -it -v $HOME/prysm:/data -p 4000:4000 -p 13000:13000 --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:latest \
  --datadir=/data
```

This will sync up the beacon node with the latest head block in the network. It is also recommended to include the `--p2p-host-ip` and `--min-sync-peers 7` flags to improve peering.

  > **NOTICE:** The beacon node must be **completely synced** before attempting to initialise a validator client, otherwise the validator will not be able to complete the deposit and **funds will lost**.

  ## Staking ETH: Running a validator client

  Once your beacon node is up, the chain will be waiting for you to deposit 3.2 Goerli ETH into a [validator deposit contract](../how-prysm-works/validator-deposit-contract) in order to activate your validator \(discussed in the section below\).

  To begin setting up a validator, follow the instructions found on [prylabs.network](https://prylabs.network) to use the Göerli ETH faucet and make a deposit. For step-by-step assistance with the deposit page, see the [activating a validator ](docs/install/linux/activating-a-validator.md)section of this documentation.

  It will take a while for the nodes in the network to process a deposit. Once the node is active, the validator will immediately begin performing its responsibilities.

  In your validator client, you will be able to frequently see your validator balance as it goes up over time. Note that, should your node ever go offline for a long period, a validator will start gradually losing its deposit until it is removed from the network entirely.

  **Congratulations, you are now running Ethereum 2.0 Phase 0!**

  ## Managing the beacon node with Docker

  Below are various methods of controlling the beacon node in Docker installations.

  The beacon node can be halted by either using `Ctrl+c` or with the command:

  ```text
  docker stop beacon-node
  ```

  To restart the beacon node, issue the following command:

  ```text
  docker start -ai beacon-node
  ```

  To delete a corrupted container, issue the following command:

  ```text
  docker rm beacon-node
  ```

  To recreate a deleted container and refresh the chain database, issue the start command with an additional `--clear-db` parameter:

  ```text
  docker run -it -v $HOME/prysm:/data -p 4000:4000 -p 13000:13000 --name beacon-node \
    gcr.io/prysmaticlabs/prysm/beacon-chain:latest \
    --datadir=/data \
    --clear-db
  ```
