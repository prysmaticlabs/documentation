---
id: install-with-docker
title: Installing Prysm with Docker
sidebar_label: Using Docker
---

Prysm can be installed on Windows, GNU/Linux, MacOS systems with Docker. This page includes instructions for performing this method.

![Prysm Docker Setup](/img/prysm-basic-docker-setup.png)

:::tip Pro-Tip
The Prysm installation script is the easiest and most efficient way of installing. Docker is mostly for advanced users. Instructions for using it can be found [here](/docs/install/install-with-script).
:::

**Have questions?** Stop by the [#documentation](https://discord.gg/prysmaticlabs) channel on Discord and let us know.

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

### Where is the Prysm Dockerfile?

Instead of manually writing Dockerfiles, our team relies on the [Bazel](https://bazel.build) build system used by major companies to manage mono-repositories. Bazel has the option to generate and push minimal Docker images to a registry, which is what we use for Prysm. Bazel provides reproducible builds and a sandboxed environment that ensures everyone building Prysm has the same experience and can build our entire project from a single command. To see how to build the Docker images yourself from scratch for your own purposes, see our instructions [here](/docs/install/install-with-bazel#building-docker-images).

### Downloading the Prysm Docker images

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

Note: <YOUR_ETH1_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`.

**Mainnet**

```text
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:stable \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```

**Prater**

Download the genesis state from [github.com/eth2-clients/eth2-networks/blob/master/shared/prater/genesis.ssz](https://github.com/eth2-clients/eth2-networks/blob/master/shared/prater/genesis.ssz) to a local file, then run

```text
docker run -it -v $HOME/.eth2:/data -v /path/to/genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:stable \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT> \
  --genesis-state=/genesis/genesis.ssz \
  --prater
```

</TabItem>
<TabItem value="win">

Note: <YOUR_ETH1_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`.

1. You will need to share the local drive you wish to mount to to container \(e.g. C:\).
   1. Enter Docker settings \(right click the tray icon\)
   2. Click 'Shared Drives'
   3. Select a drive to share
   4. Click 'Apply'
2. You will next need to create a directory named `/prysm/` within your selected shared Drive. This folder will be used as a local data directory for [beacon node](/docs/how-prysm-works/beacon-node) chain data as well as account and keystore information required by the validator. Docker **will not** create this directory if it does not exist already. For the purposes of these instructions, it is assumed that `C:` is your prior-selected shared Drive.
3. To run the beacon node, issue the following command where <YOUR_ETH1_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`:

**Mainnet**

```text
docker run -it -v %LOCALAPPDATA%\Eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp gcr.io/prysmaticlabs/prysm/beacon-chain:stable --datadir=/data --rpc-host=0.0.0.0 --monitoring-host=0.0.0.0 --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```

This will sync up the beacon node with the latest cannonical head block in the network. The Docker `-d` flag can be appended before the `-v` flag to launch the process in a detached terminal window.

**Prater**

Download the genesis state from [github.com/eth2-clients/eth2-networks/blob/master/shared/prater/genesis.ssz](https://github.com/eth2-clients/eth2-networks/blob/master/shared/prater/genesis.ssz) to a local file, then run


```text
docker run -it -v %LOCALAPPDATA%\Eth2:/data -v \path\to\genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp gcr.io/prysmaticlabs/prysm/beacon-chain:stable --datadir=/data --rpc-host=0.0.0.0 --monitoring-host=0.0.0.0 --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT> --genesis-state=/genesis/genesis.ssz --prater
```

</TabItem>
<TabItem value="mac">

Note: <YOUR_ETH1_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`.

**Mainnet**

```text
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:stable \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```

**Prater**

Download the genesis state from [github.com/eth2-clients/eth2-networks/blob/master/shared/prater/genesis.ssz](https://github.com/eth2-clients/eth2-networks/blob/master/shared/prater/genesis.ssz) to a local file, then run

```text
docker run -it -v $HOME/.eth2:/data -v /path/to/genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:stable \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT> \
  --genesis-state=/genesis/genesis.ssz \
  --prater
```

</TabItem>
</Tabs>

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

Note: You will be asked to do a one time acknowledgement of our [Terms of Use](https://github.com/prysmaticlabs/prysm/blob/master/TERMS_OF_SERVICE.md). You can also read the legal terms first, then confirm them via a flag using --accept-terms-of-use in both your beacon node and validator.

```text
docker run -it -v $HOME/eth2.0-deposit-cli/validator_keys:/keys \
  -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  --name validator \
  gcr.io/prysmaticlabs/prysm/validator:stable \
  accounts import --keys-dir=/keys --wallet-dir=/wallet
```

</TabItem>
<TabItem value="win">

Note: You will be asked to do a one time acknowledgement of our [Terms of Use](https://github.com/prysmaticlabs/prysm/blob/master/TERMS_OF_SERVICE.md). You can also read the legal terms first, then confirm them via a flag using --accept-terms-of-use in both your beacon node and validator.

```text
docker run -it -v %LOCALAPPDATA%\eth2.0-deposit-cli\validator_keys:/keys -v %LOCALAPPDATA%\Eth2Validators\prysm-wallet-v2:/wallet gcr.io/prysmaticlabs/prysm/validator:stable accounts import --keys-dir=/keys --wallet-dir=/wallet
```

</TabItem>
<TabItem value="mac">

Note: You will be asked to do a one time acknowledgement of our [Terms of Use](https://github.com/prysmaticlabs/prysm/blob/master/TERMS_OF_SERVICE.md). You can also read the legal terms first, then confirm them via a flag using --accept-terms-of-use in both your beacon node and validator.

```text
docker run -it -v $HOME/eth2.0-deposit-cli/validator_keys:/keys \
  -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  --name validator \
  gcr.io/prysmaticlabs/prysm/validator:stable \
  accounts import --keys-dir=/keys --wallet-dir=/wallet
```

</TabItem>
</Tabs>

### Step 4: Run your Prysm validator

Open a second terminal window. Depending on your platform, issue the appropriate command from the examples below to start the validator.

<Tabs
  groupId="operating-systems"
  defaultValue="lin"
  values={[
    {label: 'Linux', value: 'lin'},
    {label: 'Windows', value: 'win'},
    {label: 'MacOS', value: 'mac'},
    {label: 'Arm64', value: 'arm'},
  ]
}>
<TabItem value="lin">

```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  -v $HOME/Eth2:/validatorDB \
  --network="host" --name validator \
  gcr.io/prysmaticlabs/prysm/validator:stable \
  --beacon-rpc-provider=127.0.0.1:4000 \
  --wallet-dir=/wallet \
  --datadir=/validatorDB
```

</TabItem>
<TabItem value="win">

```text
docker run -it -v %LOCALAPPDATA%\Eth2Validators\prysm-wallet-v2:/wallet -v %LOCALAPPDATA%\Eth2:/validatorDB --network="host" --name validator gcr.io/prysmaticlabs/prysm/validator:stable --beacon-rpc-provider=127.0.0.1:4000 --wallet-dir=/wallet --datadir=/validatorDB
```

</TabItem>
<TabItem value="mac">

```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \ 
  -v $HOME/Eth2:/validatorDB \
  --network="host" --name validator \
  gcr.io/prysmaticlabs/prysm/validator:stable \
  --beacon-rpc-provider=127.0.0.1:4000 \
  --wallet-dir=/wallet \
  --datadir=/validatorDB
```

</TabItem>
</Tabs>


### Step 6: Wait for your validator assignment

Please note it will take time for nodes in the network to process a deposit. To understand the timeline of becoming a validator and how long it takes on average, please read [this knowledge base](https://kb.beaconcha.in/ethereum-2.0-depositing). In the meantime, leave both terminal windows open and running; once the validator is activated by the ETH2 network, it will immediately begin receiving tasks and performing its responsibilities. If the eth2 chain has not yet started, the validator will be ready to start proposing blocks and signing votes as soon as the genesis time is reached.

To check on the status of your validator, we recommend checking out the popular block explorers: [beaconcha.in](https://beaconcha.in) by Bitfly and [beacon.etherscan.io](https://beacon.etherscan.io) by the Etherscan team.

![image](https://i.imgur.com/CDNc6Ft.png)

## Advanced Configuration and Key Management

For running an advanced wallet setups, our documentation includes comprehensive guides as to how to use the wallet built into Prysm to recover another wallet, use a remote signing server, and more. You can read more about it [here](https://docs.prylabs.network/docs/wallet/introduction).

**Congratulations, you are now fully participating in Ethereum proof-of-stake**

**Still have questions?**  Stop by our [Discord](https://discord.gg/prysmaticlabs) for further assistance!
