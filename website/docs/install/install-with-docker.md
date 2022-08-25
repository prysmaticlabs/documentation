---
id: install-with-docker
title: Install Prysm with Docker
sidebar_label: Install using Docker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

Prysm can be installed on Windows, GNU/Linux, and MacOS systems with Docker. We use [Bazel](https://bazel.build) to push minimal Docker images to a registry. 

:::tip Not familiar with docker? Try our quickstart

This guidance is targeted at users who are already comfortable with Docker. See our [Quickstart](/docs/install/install-with-script) for beginner-friendly installation instructions.

:::

## Review system requirements

<table>
    <tr>
        <th>Minimum</th>
        <th>Recommended</th>
    </tr>
    <tr>
      <td>
        <ul> 
          <li><strong>OS</strong>: 64-bit Linux, Mac OS X 10.14+, Windows 64-bit</li> 
          <li><strong>CPU</strong>: Intel Core i5–760 or AMD FX-8100 or better</li> 
          <li><strong>Memory</strong>: 8GB RAM</li> 
          <li><strong>Storage</strong>: SSD with 20GB+ available</li> 
          <li><strong>Internet</strong>: Broadband connection</li> 
          <li><strong>Software</strong>: The latest release of <a href='https://docs.docker.com/install/'>Docker</a> installed.</li> 
        </ul> 
      </td>
      <td>
        <ul> 
          <li><strong>CPU</strong>: Intel Core i7–4770 or AMD FX-8310 or better</li> 
          <li><strong>Memory</strong>: 16GB RAM</li> 
          <li><strong>Storage</strong>: SSD with 100GB+ available</li> 
        </ul> 
      </td>
    </tr> 
</table>


## Download the Prysm Docker images

First, ensure that you're running the most recent version of Docker:

```text
docker -v
```

Next, pull the Prysm images:

```text
## stable, without Busybox debugging tools
docker pull gcr.io/prysmaticlabs/prysm/validator:stable
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:stable

## latest, without Busybox debugging tools
docker pull gcr.io/prysmaticlabs/prysm/validator:latest
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:latest

## latest, with Busybox debugging tools
docker pull gcr.io/prysmaticlabs/prysm/validator:latest-alpine
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:latest-alpine
```

These commands will automatically install dependencies. 


## Configure ports (optional)

We recommend opening up ports `tcp/13000` and `udp/12000` on your router and firewall to improve peer-to-peer connectivity. Refer to your operating system and router documentation for port configuration instructions. With this complete, appending `--p2p-host-ip=$(curl -s ident.me)` to your beacon node startup command will configure Prysm to use your newly opened ports.



## Run a beacon node

:::info Knowledge Check

**Not familiar with nodes, networks, and related terminology?** Consider reading [Nodes and networks](../concepts/nodes-networks.md) before proceeding. 

:::

If you're not already running an execution node, refer to our [Quickstart](/docs/install/install-with-script) for beginner-friendly execution node installation instructions.

Next, use Docker to tell your beacon node to connect to your execution node. Note that `<YOUR_ETH_EXECUTION_NODE_ENDPOINT>` is either an HTTP endpoint `http://host:port` or an IPC path such as `/path/to/geth.ipc`.

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


<Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">

```text
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:stable \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --execution-endpoint=<YOUR_ETH_EXECUTION_NODE_ENDPOINT>
```


  </TabItem>
      <TabItem value="goerli-prater">

Download the Goerli-Prater genesis state from [Github](https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz) to a local file. Then issue the following command:

```text
docker run -it -v $HOME/.eth2:/data -v /path/to/genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:stable \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --execution-endpoint=<YOUR_ETH_EXECUTION_NODE_ENDPOINT> \
  --genesis-state=/genesis/genesis.ssz \
  --prater
```


  </TabItem>
      <TabItem value="sepolia">

Download the Sepolia genesis state from [Github](https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz) to a local file, then run

```text
docker run -it -v $HOME/.eth2:/data -v /path/to/genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain@sha256:bf9b95661c71ad60f633ee14cf352a668d550076471154cf80dfef8fce0bb41e \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --execution-endpoint=<YOUR_ETH_EXECUTION_NODE_ENDPOINT> \
  --genesis-state=/genesis/genesis.ssz \
  --sepolia
```

  </TabItem>
      <TabItem value="ropsten">


Download the Ropsten genesis state from [Github](https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz) to a local file, then run

```text
docker run -it -v $HOME/.eth2:/data -v /path/to/genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain@sha256:bf9b95661c71ad60f633ee14cf352a668d550076471154cf80dfef8fce0bb41e \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --execution-endpoint=<YOUR_ETH_EXECUTION_NODE_ENDPOINT> \
  --genesis-state=/genesis/genesis.ssz \
  --ropsten
```


  </TabItem>
    </Tabs>



</TabItem>
<TabItem value="win">

Note: <YOUR_ETH_EXECUTION_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`.

1. You will need to share the local drive you wish to mount to to container \(e.g. C:\).
   1. Enter Docker settings \(right click the tray icon\)
   2. Click 'Shared Drives'
   3. Select a drive to share
   4. Click 'Apply'
2. You will next need to create a directory named `/prysm/` within your selected shared Drive. This folder will be used as a local data directory for [beacon node](/docs/how-prysm-works/beacon-node) chain data as well as account and keystore information required by the validator. Docker **will not** create this directory if it does not exist already. For the purposes of these instructions, it is assumed that `C:` is your prior-selected shared Drive.
3. To run the beacon node, issue the following command where <YOUR_ETH_EXECUTION_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`:

**Mainnet**

```text
docker run -it -v %LOCALAPPDATA%\Eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp gcr.io/prysmaticlabs/prysm/beacon-chain:stable --datadir=/data --rpc-host=0.0.0.0 --monitoring-host=0.0.0.0 --execution-endpoint=<YOUR_ETH_EXECUTION_NODE_ENDPOINT>
```

This will sync up the beacon node with the latest cannonical head block in the network. The Docker `-d` flag can be appended before the `-v` flag to launch the process in a detached terminal window.

**Prater**

Download the genesis state from [github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz](https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz) to a local file, then run


```text
docker run -it -v %LOCALAPPDATA%\Eth2:/data -v \path\to\genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp gcr.io/prysmaticlabs/prysm/beacon-chain:stable --datadir=/data --rpc-host=0.0.0.0 --monitoring-host=0.0.0.0 --execution-endpoint=<YOUR_ETH_EXECUTION_NODE_ENDPOINT> --genesis-state=/genesis/genesis.ssz --prater
```

**Ropsten**

Download the genesis state from [github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz](https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz) to a local file, then run


```text
docker run -it -v %LOCALAPPDATA%\Eth2:/data -v \path\to\genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp gcr.io/prysmaticlabs/prysm/beacon-chain@sha256:bf9b95661c71ad60f633ee14cf352a668d550076471154cf80dfef8fce0bb41e --datadir=/data --rpc-host=0.0.0.0 --monitoring-host=0.0.0.0 --execution-endpoint=<YOUR_ETH_EXECUTION_NODE_ENDPOINT> --genesis-state=/genesis/genesis.ssz --ropsten
```

</TabItem>
<TabItem value="mac">

Note: <YOUR_ETH_EXECUTION_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for geth) or an IPC path such as `/path/to/geth.ipc`.

**Mainnet**

```text
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:stable \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --execution-endpoint=<YOUR_ETH_EXECUTION_NODE_ENDPOINT>
```

**Prater**

Download the genesis state from [github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz](https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz) to a local file, then run

```text
docker run -it -v $HOME/.eth2:/data -v /path/to/genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:stable \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --execution-endpoint=<YOUR_ETH_EXECUTION_NODE_ENDPOINT> \
  --genesis-state=/genesis/genesis.ssz \
  --prater
```

**Ropsten**

Download the genesis state from [github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz](https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz) to a local file, then run

```text
docker run -it -v $HOME/.eth2:/data -v /path/to/genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain@sha256:bf9b95661c71ad60f633ee14cf352a668d550076471154cf80dfef8fce0bb41e \
  --datadir=/data \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --execution-endpoint=<YOUR_ETH_EXECUTION_NODE_ENDPOINT> \
  --genesis-state=/genesis/genesis.ssz \
  --ropsten
```

</TabItem>
</Tabs>

## Running a Validator

A validator is an optional process that can be attached to a running beacon node to stake your ETH and participate in the chain's consensus. It is the analogue of a **miner** from proof-of-work-based systems.

:::tip Using testnets

**Never deposit real ETH into testnet deposit contracts!** Every testnet has its own test ETH that should be used instead.

:::

### Step 1: Ensure your beacon node is synced

An important step in the process is ensuring your beacon node is all set up before trying to run a validator. This is because after your validator is inducted into the participating validator set, it is expected to begin performing its duties almost right away. It is important to run a validator with a node that is synchronized to the chain head so you can start earning ETH instead of losing it.

:::tip Syncing your node
The beacon-chain node you're using should be **completely synced** before submitting your deposit. You may **incur minor inactivity balance penalties** if the validator is unable to perform its duties by the time the deposit is processed and activated by the beacon chain network.
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
The correct address for the launchpad is https://launchpad.ethereum.org and the only, official validator deposit contract is [0x00000000219ab540356cbb839cbe05303d7705fa](https://etherscan.io/address/0x00000000219ab540356cbb839cbe05303d7705fa). Do not send ETH directly to the contract, and only join by using the Ethereum.org launchpad.
:::

The [Mainnet Launchpad](https://launchpad.ethereum.org/summary) is the most secure way to deposit your 32 ETH to become a validator. If you want to participate in the **testnet**, you can navigate to the [Goerli-Prater](https://goerli.launchpad.ethereum.org/en/) or [Ropsten](https://ropsten.launchpad.ethereum.org/summary) launchpads.

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
  --network="host" --name validator-import \
  gcr.io/prysmaticlabs/prysm/validator:stable \
  --beacon-rpc-provider=127.0.0.1:4000 \
  --wallet-dir=/wallet \
  --datadir=/validatorDB
```

</TabItem>
</Tabs>


### Step 5: Wait for your validator assignment

Please note it will take time for nodes in the network to process a deposit. To understand the timeline of becoming a validator and how long it takes on average, please read [this knowledge base](https://kb.beaconcha.in/ethereum-2.0-depositing). In the meantime, leave both terminal windows open and running; once the validator is activated by the ETH2 network, it will immediately begin receiving tasks and performing its responsibilities. If the eth2 chain has not yet started, the validator will be ready to start proposing blocks and signing votes as soon as the genesis time is reached.

To check on the status of your validator, we recommend checking out the popular block explorers: [beaconcha.in](https://beaconcha.in) by Bitfly and [beacon.etherscan.io](https://beacon.etherscan.io) by the Etherscan team.

![image](https://i.imgur.com/CDNc6Ft.png)


























## Manage Prysm with Docker


To interact with your beacon node through Docker, use one of the following commands:

 - Halt: `docker stop beacon-node` or `Ctrl+c`
 - Restart: `docker start -ai beacon-node`
 - Delete: `docker rm beacon-node`


To recreate a deleted container and refresh the chain database, issue the start command with an additional `--clear-db` parameter where <YOUR_ETH_EXECUTION_NODE_ENDPOINT> is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8551` for Geth) or an IPC path such as `/path/to/geth.ipc`:

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

```text
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:latest \
  --datadir=/data \
  --clear-db \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --execution-endpoint=<YOUR_ETH_EXECUTION_NODE_ENDPOINT>
```

</TabItem>
<TabItem value="win">

```text
docker run -it -v %LOCALAPPDATA%\Eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node gcr.io/prysmaticlabs/prysm/beacon-chain:latest --datadir=/data --clear-db --monitoring-host=0.0.0.0 --rpc-host=0.0.0.0 --execution-endpoint=<YOUR_ETH_EXECUTION_NODE_ENDPOINT>
```

</TabItem>
<TabItem value="mac">

```text
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:latest \
  --datadir=/data \
  --clear-db \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --execution-endpoint=<YOUR_ETH_EXECUTION_NODE_ENDPOINT>
```

</TabItem>
</Tabs>


## Advanced Configuration and Key Management

For running an advanced wallet setups, our documentation includes comprehensive guides as to how to use the wallet built into Prysm to recover another wallet, use a remote signing server, and more. You can read more about it [here](https://docs.prylabs.network/docs/wallet/introduction).

**Congratulations, you're now fully participating in Ethereum proof-of-stake**

**Still have questions?**  Stop by our [Discord](https://discord.gg/prysmaticlabs) for further assistance!

import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />
