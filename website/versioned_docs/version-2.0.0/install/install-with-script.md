---
id: install-with-script
title: Installing Prysm with prysm.sh 
sidebar_label: Prysm Quickstart Script
---

Prysm can be installed on Windows, GNU/Linux, MacOS, or ARM64 systems using the Prysm installation script which downloads signed binaries from our latest release. This page includes instructions for performing this process.

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

## Installing Prysm

The easiest way to install Prysm is by running the `prysm.sh` script found in the main directory of the [Prysm repository](https://github.com/prysmaticlabs/prysm). This script will download and start up the latest release of Prysm binaries compatible with the host system.

### Downloading the Prysm startup script

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

1. Open a terminal in the desired directory for Prysm. Then create a working directory and enter it:

```sh
mkdir prysm && cd prysm
```

2. Fetch the `prysm.sh` script from Github and make it executable:

```sh
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh
```

Now that you downloaded the .sh file, you can proceed to [joining eth2](/docs/mainnet/joining-eth2).

</TabItem>
<TabItem value="win">

1. Open a command prompt window in the desired directory for Prysm. Then create a working directory and enter it:

```sh
mkdir prysm && cd prysm
```

2. Fetch the `prysm.bat` script from Github:

```sh
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.bat --output prysm.bat
```

3. To ensure logging appears properly, issue the following command:
```
reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1
``` 

</TabItem>
<TabItem value="mac">

According to [Apple's Support site](https://support.apple.com/en-us/HT210190), the following Apple products are compatible with OS X 10.14.

* MacBook introduced in 2015 or later
* MacBook Air introduced in 2012 or later
* MacBook Pro introduced in 2012 or later
* Mac mini introduced in 2012 or later
* iMac introduced in 2012 or later
* iMac Pro (all models)
* Mac Pro introduced in 2013, plus mid-2010 or mid-2012 models with a recommended Metal-capable graphics card.

1. Open a terminal window in the desired directory for Prysm. Then create a working directory and enter it:

```sh
mkdir prysm && cd prysm
```

2. Fetch the `prysm.sh` script from Github and make it executable:

```sh
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh
```

</TabItem>
<TabItem value="arm">

1. Create a working directory and enter it:

```sh
mkdir prysm && cd prysm
```

2. Fetch the `prysm.sh` script from Github and make it executable:

```sh
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh
```

</TabItem>
</Tabs>

## Running a Beacon Node

### Before you begin: pick your network

:::danger Make sure you are running on the main network (mainnet) if you plan on staking your ETH
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
    {label: 'Arm64', value: 'arm'},
  ]
}>
<TabItem value="lin">

Note: <YOUR_ETH1_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`.

```text
./prysm.sh beacon-chain --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```

</TabItem>
<TabItem value="win">

Note: <YOUR_ETH1_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`.

```text
prysm.bat beacon-chain --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```

</TabItem>
<TabItem value="mac">

Note: <YOUR_ETH1_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`.

```text
./prysm.sh beacon-chain --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```

</TabItem>
<TabItem value="arm">

Note: <YOUR_ETH1_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`.

```text
./prysm.sh beacon-chain --http-web3provider=<YOUR_ETH1_NODE_ENDPOINT>
```

</TabItem>
</Tabs>

## Running a Validator

A validator is an optional process that can be attached to a running beacon node to stake your ETH and participate in the chain's consensus. It is the analogue of a **miner** from proof-of-work-based systems.

### Before you begin: pick your network

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

The [Official Eth2 Launchpad](https://launchpad.ethereum.org/summary) is the easiest way to go through a step-by-step process to deposit your 32 ETH to become a validator. Throughout the process, you'll be asked to generate new validator credentials using the official Ethereum deposit command-line-tool [here](https://github.com/ethereum/eth2.0-deposit-cli). Make sure you use the `mainnet` option when generating keys with the deposit CLI. During the process, you will have generated a `validator_keys` folder under the `eth2.0-deposit-cli` directory. You can import all of your validator keys into Prysm from that folder in the next step.

### Step 3: Import keystores into Prysm

For this step, you'll need to copy the path to the `validator_keys` folder under the `eth2.0-deposit-cli` directory you created during the launchpad process. For example, if your eth2.0-deposit-cli installation is in your `$HOME` (or `%LOCALAPPDATA%` on Windows) directory, you can then run the following commands for your operating system

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

Note: You will be asked to do a one time acknowledgement of our [Terms of Use](https://github.com/prysmaticlabs/prysm/blob/master/TERMS_OF_SERVICE.md). You can also read the legal terms first, then confirm them via a flag using --accept-terms-of-use in both your beacon node and validator.

```text
./prysm.sh validator accounts import --keys-dir=$HOME/eth2.0-deposit-cli/validator_keys
```

</TabItem>
<TabItem value="win">

Note: You will be asked to do a one time acknowledgement of our [Terms of Use](https://github.com/prysmaticlabs/prysm/blob/master/TERMS_OF_SERVICE.md). You can also read the legal terms first, then confirm them via a flag using --accept-terms-of-use in both your beacon node and validator.

```text
prysm.bat validator accounts import --keys-dir=%LOCALAPPDATA%\eth2.0-deposit-cli\validator_keys
```

</TabItem>
<TabItem value="mac">

Note: You will be asked to do a one time acknowledgement of our [Terms of Use](https://github.com/prysmaticlabs/prysm/blob/master/TERMS_OF_SERVICE.md). You can also read the legal terms first, then confirm them via a flag using --accept-terms-of-use in both your beacon node and validator.

```text
./prysm.sh validator accounts import --keys-dir=$HOME/eth2.0-deposit-cli/validator_keys
```

</TabItem>
<TabItem value="arm">

Note: You will be asked to do a one time acknowledgement of our [Terms of Use](https://github.com/prysmaticlabs/prysm/blob/master/TERMS_OF_SERVICE.md). You can also read the legal terms first, then confirm them via a flag using --accept-terms-of-use in both your beacon node and validator.

```text
./prysm.sh validator accounts import --keys-dir=$HOME/eth2.0-deposit-cli/validator_keys
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
./prysm.sh validator
```

</TabItem>
<TabItem value="win">

```text
prysm.bat validator
```

</TabItem>
<TabItem value="mac">

```text
./prysm.sh validator
```

</TabItem>
<TabItem value="arm">


```text
./prysm.sh validator
```

</TabItem>
</Tabs>


### Step 6: Wait for your validator assignment

Please note that it may take from **5-12 hours** for nodes in the ETH2 network to process a deposit. In the meantime, leave both terminal windows open and running; once the validator is activated by the ETH2 network, it will immediately begin receiving tasks and performing its responsibilities. If the eth2 chain has not yet started, the validator will be ready to start proposing blocks and signing votes as soon as the genesis time is reached.

To check on the status of your validator, we recommend checking out the popular block explorers: [beaconcha.in](https://beaconcha.in) by Bitfly and [beacon.etherscan.io](https://beacon.etherscan.io) by the Etherscan team.

![image](https://i.imgur.com/CDNc6Ft.png)

## Advanced Configuration and Key Management

For running an advanced wallet setups, our documentation includes comprehensive guides as to how to use the wallet built into Prysm to recover another wallet, use a remote signing server, and more. You can read more about it [here](https://docs.prylabs.network/docs/wallet/introduction).

**Congratulations, you are now fully participating in Ethereum proof-of-stake**

**Still have questions?**  Stop by our [Discord](https://discord.gg/MjesNv5FYY) for further assistance!

