---
id: install-with-docker
title: Installing Prysm with docker
sidebar_label: Installing with Docker
---

:::danger Our Code Is Not Yet Updated to Mainnet!
Our latest release of Prysm, beta.1, is not mainnet compatible. Please do not run Prysm yet until we announce it in our Discord channel, our [releases page](https://github.com/prysmaticlabs/prysm/releases), our [official mailing list](https://groups.google.com/g/prysm-dev) or in this documentation portal.
:::

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
* Memory: 8GB RAM
* Storage: 20GB available space SSD
* Internet: Broadband connection

### Recommended specifications

These hardware specifications are recommended, but not required to run the Prysm client.

* Processor: Intel Core i7–4770 or AMD FX-8310 or better
* Memory: 16GB RAM
* Storage: 100GB available space SSD
* Internet: Broadband connection

## Dependencies

* A modern operating system
* The latest release of [Docker](https://docs.docker.com/install/) installed

## Installing Prysm

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

2. Ensure that your user is a member of the `docker` group by issuing the command, where `username` is your user:

```text
sudo usermod -aG docker username
```

Any changes made will take effect when your user next logs in.

3. To pull the Prysm images, issue the following commands:

```text
docker pull gcr.io/prysmaticlabs/prysm/validator:stable
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:stable
```

This process will also install any related dependencies.

:::tip Pro-Tip
For advanced users, the beacon-chain and validator images with debugging tools bundled in can be fetched instead by appending `-alpine` to the end of the images in the `pull` commands above. For example: `docker pull .../prysm/validator:latest-alpine`.
:::

Now that your installation is done, you can then read [joining eth2](/docs/mainnet/joining-eth2).

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

To recreate a deleted container and refresh the chain database, issue the start command with an additional `--clear-db` parameter where <YOUR_ETH1_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`:

```text
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:stable \
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
docker pull gcr.io/prysmaticlabs/prysm/validator:stable
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:stable
```

This process will also install any related dependencies. For advanced users, the beacon-chain and validator images with debugging tools bundled in can be fetched instead by appending `-alpine` to the end of the images in the `pull` commands above. For example: `docker pull .../prysm/validator:latest-alpine`.

:::tip Pro-Tip
It is recommended to open up port tcp/13000 and udp/12000 on your local router to improve connectivity and receive more peers from the network. To do so, navigate to `192.168.0.1` in your browser and login if required. Follow along with the interface to modify your routers firewall settings. When this task is completed, append the parameter`--p2p-host-ip=$(curl -s ident.me)` to your selected beacon startup command presented in this section to use the newly opened port.
:::

Now that your installation is done, you can then read [joining eth2](/docs/mainnet/joining-eth2).

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

To recreate a deleted container and refresh the chain database, issue the start command with an additional `--clear-db` parameter where <YOUR_ETH1_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`:

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
docker pull gcr.io/prysmaticlabs/prysm/validator:stable
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:stable
```

This process will also install any related dependencies. For advanced users, the beacon-chain and validator images with Busybox debugging tools bundled in can be fetched instead by appending `-alpine` to the end of the images in the `pull` commands above. For example: `docker pull .../prysm/validator:latest-alpine`.

Now that your installation is done, you can then read [joining eth2](/docs/mainnet/joining-eth2).

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

To recreate a deleted container and refresh the chain database, issue the start command with an additional `--clear-db` parameter where <YOUR_ETH1_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`:

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
