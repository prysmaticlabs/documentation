---
id: install-with-docker
title: Installing Prysm with docker
sidebar_label: Installing with Docker
---

Prysm can be installed on Windows, GNU/Linux, MacOS systems with Docker. This page includes instructions for performing this method.

![Prysm Docker Setup](/img/prysm-basic-docker-setup.png)

:::tip Pro-Tip
The Prysm installation script is the easiest and most efficient way of installing the latest binaries. Instructions for using it can be found [here](/docs/install/install-with-script).
:::

**Have questions?** Stop by the [#documentation](https://discord.gg/QQZMCgU) channel on Discord and let us know.

## System requirements

### Minimum specifications

These specifications must be met in order to successfully run the Prysm client.

* Operating System: 64-bit Linux, Mac OS X 10.14+, Windows 64-bit
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

## Dependencies

* A modern operating system
* The latest release of [Docker](https://docs.docker.com/install/) installed

## Installing the beacon chain and validator

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  groupId="operating-systems"
  defaultValue="lin"
  values={[
    {label: 'Linux', value: 'lin'},
    {label: 'Windows', value: 'win'},
    {label: 'MacOS', value: 'mac'},
  ]
}>
<TabItem value="lin">

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

:::tip Pro-Tip
For advanced users, the beacon-chain and validator images with debugging tools bundled in can be fetched instead by appending `-alpine` to the end of the images in the `pull` commands above. For example: `docker pull .../prysm/validator:latest-alpine`.
:::

## Connecting to the testnet: running a beacon node

Below are instructions for initialising a beacon node and connecting to the public testnet. To further understand the role that the beacon node plays in Prysm, see [this section](/docs/how-prysm-works/architecture-overview/) of the documentation.

:::tip Pro-Tip
It is recommended to open up port tcp/13000 and udp/12000 on your local router to improve connectivity and receive more peers from the network. To do so, navigate to `192.168.0.1` in your browser and login if required. Follow along with the interface to modify your routers firewall settings. When this task is completed, append the parameter`--p2p-host-ip=$(curl -s ident.me)` to your selected beacon startup command presented in this section to use the newly opened port.
:::

You will need to setup an eth1 node connection to run a beacon node. We have dedicated instructions for this step [here](/docs/prysm-usage/setup-eth1).

To start your beacon node, issue the following command:

```text
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:latest \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```

At this point, the beacon chain data will begin synchroni zing up to the latest head block. Please note that, depending on your network capacity and CPU, this process may take several hours. Once it is complete, you will be ready to make a deposit and begin setting up a validator client.

:::info Syncing the Blockchain
The beacon node you are using should be **completely synced** before submitting your deposit for the validator client, otherwise the validator will not be able to validate and will **inflict minor inactivity balance penalties**.
:::

Now that your beacon chain is setup, you can then run a validator on the **Medalla testnet** by following our detailed guidelines [here](/docs/testnet/medalla)

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
  --monitoring-host=0.0.0.0 \
  --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```
</TabItem>
<TabItem value="win">


1. Ensure you are running the most recent version of Docker by issuing the command:

```text
docker -v
```

2. To pull the Prysm images, issue the following commands:

```text
docker pull gcr.io/prysmaticlabs/prysm/validator:latest
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:latest
```

This process will also install any related dependencies. For advanced users, the beacon-chain and validator images with debugging tools bundled in can be fetched instead by appending `-alpine` to the end of the images in the `pull` commands above. For example: `docker pull .../prysm/validator:latest-alpine`.

:::tip Pro-Tip
It is recommended to open up port tcp/13000 and udp/12000 on your local router to improve connectivity and receive more peers from the network. To do so, navigate to `192.168.0.1` in your browser and login if required. Follow along with the interface to modify your routers firewall settings. When this task is completed, append the parameter`--p2p-host-ip=$(curl -s ident.me)` to your selected beacon startup command presented in this section to use the newly opened port.
:::

## Connecting to the testnet: running a beacon node

Below are instructions for initialising a beacon node and connecting to the public testnet. To further understand the role that the beacon node plays in Prysm, see [this section](/docs/how-prysm-works/beacon-node) of the documentation.

1. You will need to share the local drive you wish to mount to to container \(e.g. C:\).
   1. Enter Docker settings \(right click the tray icon\)
   2. Click 'Shared Drives'
   3. Select a drive to share
   4. Click 'Apply'
2. You will next need to create a directory named `/prysm/` within your selected shared Drive. This folder will be used as a local data directory for [beacon node](/docs/how-prysm-works/beacon-node) chain data as well as account and keystore information required by the validator. Docker **will not** create this directory if it does not exist already. For the purposes of these instructions, it is assumed that `C:` is your prior-selected shared Drive.
3. You will need to setup an eth1 node connection to run a beacon node. We have dedicated instructions for this step [here](/docs/prysm-usage/setup-eth1)
4. To run the beacon node, issue the following command:

```text
docker run -it -v %LOCALAPPDATA%\Eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp gcr.io/prysmaticlabs/prysm/beacon-chain:latest --datadir=/data --rpc-host=0.0.0.0 --monitoring-host=0.0.0.0 --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```

This will sync up the beacon node with the latest cannonical head block in the network. If the network hasn't started yet, it will process eth1 deposits from the deposit contract so far and await the genesis time. The Docker `-d` flag can be appended before the `-v` flag to launch the process in a detached terminal window. Please note that, depending on your network capacity and CPU, this process may take several hours. Once it is complete, you will be ready to make a deposit and begin setting up a validator client.

:::info Syncing the Blockchain
The beacon node you are using should be **completely synced** before submitting your deposit for the validator client, otherwise the validator will not be able to validate and will **inflict minor inactivity balance penalties**. No need to worry about this if the chain has not yet started.
:::

Now that your beacon chain is setup, you can then run a validator on the **Medalla testnet** by following our detailed guidelines [here](/docs/testnet/medalla)

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
docker run -it -v %LOCALAPPDATA%\Eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node gcr.io/prysmaticlabs/prysm/beacon-chain:latest --datadir=/data --clear-db --monitoring-host=0.0.0.0 --rpc-host=0.0.0.0 --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```

</TabItem>
<TabItem value="mac">

1. Ensure you are running the most recent version of Docker by issuing the command:

```text
docker -v
```

2. To pull the Prysm images, issue the following commands:

```text
docker pull gcr.io/prysmaticlabs/prysm/validator:latest
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:latest
```

This process will also install any related dependencies. For advanced users, the beacon-chain and validator images with Busybox debugging tools bundled in can be fetched instead by appending `-alpine` to the end of the images in the `pull` commands above. For example: `docker pull .../prysm/validator:latest-alpine`.

## Connecting to the testnet: running a beacon node

Below are instructions for initialising a beacon node and connecting to the public testnet. To further understand the role that the beacon node plays in Prysm, see [this section](/docs/how-prysm-works/architecture-overview) of the documentation.

:::tip Pro-Tip
It is recommended to open up port tcp/13000 and udp/12000 on your local router to improve connectivity and receive more peers from the network. To do so, navigate to `192.168.0.1` in your browser and login if required. Follow along with the interface to modify your routers firewall settings. When this task is completed, append the parameter`--p2p-host-ip=$(curl -s ident.me)` to your selected beacon startup command presented in this section to use the newly opened port.
:::

You will need to setup an eth1 node connection to run a beacon node. We have dedicated instructions for this step [here](/docs/prysm-usage/setup-eth1).

To start your beacon node, issue the following command:

```text
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:latest \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```

This will sync up the beacon node with the latest cannonical head block in the network. If the network hasn't started yet, it will process eth1 deposits from the deposit contract so far and await the genesis time. The Docker `-d` flag can be appended before the `-v` flag to launch the process in a detached terminal window. Please note that, depending on your network capacity and CPU, this process may take several hours. Once it is complete, you will be ready to make a deposit and begin setting up a validator client.

:::info Syncing the Blockchain
The beacon node you are using should be **completely synced** before submitting your deposit for the validator client, otherwise the validator will not be able to validate and will **inflict minor inactivity balance penalties**. No need to worry about this if the chain has not yet started.
:::

Now that your beacon chain is setup, you can then run a validator on the **Medalla testnet** by following our detailed guidelines [here](/docs/testnet/medalla)

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
  --monitoring-host=0.0.0.0 \
  --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```

</TabItem>
</Tabs>