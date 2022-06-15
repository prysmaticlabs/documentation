---
id: exiting-a-validator
title: Exiting a validator
sidebar_label: Exiting a validator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Performing a voluntary exit

Exiting one or more validator accounts is possible in Prysm via the command line, but you **will need to have a running beacon node** for the voluntary exit to be submitted and broadcasted to the network. With a beacon node running, the following procedure will volunarily exit your validator:

 1. Issue the `voluntary-exit` command to your validator.
 2. Select the account(s) that should be exited. This step can be skipped by specifying the account(s) via the `--public-keys` flag when issuing the `voluntary-exit` command.
 3. Confirm your understanding of the consequences of performing a voluntary exit on a validator by typing `Exit my validator` when prompted.

After providing confirmation, the exit process will be initiated.

:::caution 

Although validator nodes can voluntarily exit, you won't be able to withdraw your staked funds until withdrawal functionality is implemented. This should be possible after The Merge. Visit the [Ethereum Validator FAQ](https://launchpad.ethereum.org/en/faq) to learn more.

:::

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
bazel run //validator --config=release -- accounts voluntary-exit
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
bazel run //validator --config=release -- accounts voluntary-exit
```

</TabItem>
<TabItem value="arm">

```bash
./prysm.sh validator accounts voluntary-exit
```

</TabItem>
</Tabs>

:::info
Your validator client will need to establish a connection with a running beacon node in order to submit a voluntary exit request. By default, your validator node will try to access a beacon node running on `127.0.0.1:4000`. Learn how to update this and other settings via the `--help` flag. Alternatively, visit our [Parameters](../prysm-usage/parameters) document.
:::



