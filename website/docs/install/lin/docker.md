---
id: docker
title: Installing Prysm on GNU/Linux with Docker
sidebar_label: Installing with Docker
---

Prysm can be installed on GNU/Linux systems with Docker. This page includes instructions for performing this method.

![Prysm Docker Setup](/img/prysm-basic-docker-setup.png)

   > **NOTICE:** The Prysm installation script is the easiest and most efficient way of installing the latest binaries. Instructions for using it can be found [here](/docs/install/linux).

**Have questions?** Stop by the [#documentation](https://discord.gg/QQZMCgU) channel on Discord and let us know.

## System requirements

### Minimum specifications
These specifications must be met in order to successfully run the Prysm client.
* Operating System: 64-bit GNU/Linux
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

* A modern GNU/Linux operating system
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

> For advanced users, the beacon-chain and validator images with debugging tools bundled in can be fetched instead by appending `-alpine` to the end of the images in the `pull` commands above. For example: `docker pull .../prysm/validator:latest-alpine`.

## Connecting to the testnet: running a beacon node

Below are instructions for initialising a beacon node and connecting to the public testnet. To further understand the role that the beacon node plays in Prysm, see [this section](/docs/how-prysm-works/architecture-overview/) of the documentation.

   > **NOTICE:** It is recommended to open up port tcp/13000 and udp/12000 on your local router to improve connectivity and receive more peers from the network. To do so, navigate to `192.168.0.1` in your browser and login if required. Follow along with the interface to modify your routers firewall settings. When this task is completed, append the parameter`--p2p-host-ip=$(curl -s ident.me)` to your selected beacon startup command presented in this section to use the newly opened port.

To start your beacon node, issue the following command:

```text
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:latest \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0
```

This will sync up the beacon node with the latest head block in the network.

  > Not getting enough peers?  Refer to the [improve P2P connectivity](/docs/prysm-usage/p2p-host-ip) section of this documentation for tips on network configuration.

  > **NOTICE:** The beacon node must be **completely synced** before attempting to initialise a validator client, otherwise the validator will not be able to complete the deposit and **funds will lost**.

## Staking ETH: Running a validator client

For step-by-step assistance with performing a deposit and setting up a validator client, see the [activating a validator ](/docs/install/lin/activating-a-validator)section of this documentation.

Once your beacon node is up, the chain will be waiting for you to deposit 32 Goerli ETH into a [validator deposit contract](/docs/how-prysm-works/validator-deposit-contract) in order to activate your validator \(discussed in the section below\).

**If you need Goerli ETH**, follow the instructions found on [prylabs.network](https://prylabs.network) to use the testnet faucet. Otherwise, you can contact a team member on Discord to be sent some.

Please note that **it may take up to 12 hours** for the nodes in the network to process a deposit. Once the node is active, the validator will immediately begin performing its responsibilities.

In your validator client, you will be able to frequently see your validator balance as it goes up over time. Note that, should your node ever go offline for a long period, a validator will start gradually losing its deposit until it is removed from the network entirely.

**Congratulations! If you've made it this far, you are now running Ethereum 2.0 Phase 0.**

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
  docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
    gcr.io/prysmaticlabs/prysm/beacon-chain:latest \
    --datadir=/data \
    --clear-db \
    --rpc-host=0.0.0.0 \
    --monitoring-host=0.0.0.0
  ```
