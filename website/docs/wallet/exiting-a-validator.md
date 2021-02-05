---
id: exiting-a-validator
title: Exiting a validator
sidebar_label: Exiting a validator
---

## Performing a voluntary exit

Exiting one or more validator accounts is possible in Prysm via the command line, but you **will need to have a running beacon node** for the voluntary exit to be submitted and broadcast to the network. 

At first, a prompt will be displayed, asking to select one or more validator accounts that should be exited.

:::info
This step can be skipped by providing the `--public-keys` flag to the command.
:::

After completing the selection, an additional conformation step will be presented, which requires entering a specific passphrase to continue. The purpose of this extra security measure is to ensure that a complete understanding of the consequences of performing a voluntary exit on a validator. Entering the correct passphrase will initiate the exit process by submitting a voluntary exit request.

:::info
The validator client needs to establish a connection with a running beacon node in order to be able to submit a voluntary exit request. By default, it will try to access a node running on `127.0.0.1:4000`. There are several flags that can be used to modify the connection parameters.
:::

All available command line flags can be inspected with `./prysm.sh validator accounts voluntary-exit --help`.

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

**Using Prysm.sh**

```bash
./prysm.sh validator accounts voluntary-exit
```

**Using Docker**

```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  accounts voluntary-exit --wallet-dir=/wallet
```

**Using Bazel**

```bash
bazel run //validator -- accounts voluntary-exit
```

</TabItem>
<TabItem value="win">

**Using Prysm.bat**

```bash
prysm.bat validator accounts voluntary-exit
```

**Using Docker**

```text
docker run -it -v %LOCALAPPDATA%\Eth2Validators\prysm-wallet-v2:/wallet gcr.io/prysmaticlabs/prysm/validator:latest accounts voluntary-exit --wallet-dir=/wallet
```

</TabItem>
<TabItem value="mac">

**Using Prysm.sh**

```bash
./prysm.sh validator accounts voluntary-exit
```

**Using Docker**

```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  accounts voluntary-exit --wallet-dir=/wallet
```

**Using Bazel**

```bash
bazel run //validator -- accounts voluntary-exit
```

</TabItem>
<TabItem value="arm">

```bash
./prysm.sh validator accounts voluntary-exit
```

</TabItem>
</Tabs>

## Withdrawal delay warning

One of the main design decisions of the Ethereum 2 project is performing the roll-out of the system over several phases. This decision has a serious impact on voluntary exits. Even though validators are able to perform an exit in Phase 0 and Phase 1, they will have to wait until Phase 2 to be able to withdraw. This means their staked funds will be frozen until withdrawals are available, which should be around 2 years after Mainnet launch.

* [Learn more about phases of Ethereum 2](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-phases/)

:::caution
It is important to note that ONE CANNOT WITHDRAW their staked ETH until Phase 2 of the system. In order to perform a voluntary exit, you will need to enter the following words when using `accounts voluntary-exit`: **Exit my validator**.
:::

