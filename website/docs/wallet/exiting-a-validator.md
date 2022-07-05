---
id: exiting-a-validator
title: Exit your validator
sidebar_label: Exit your validator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To voluntarily exit your validator from the Ethereum network, you'll follow this procedure:

 1. Ensure that a beacon node is running locally. 
 1. Issue the `voluntary-exit` command to your validator (examples provided below).
 2. Select the account(s) that should be exited. This step can be skipped by specifying the account(s) via the `--public-keys` flag when issuing the `voluntary-exit` command.
 3. Confirm your understanding of the consequences of exiting your validator by typing `Exit my validator` when prompted.

After providing confirmation, your validator node will initiate the voluntary exit by broadcasting your request through your beacon node. By default, your validator node will try to access a beacon node running on `127.0.0.1:4000`. Learn how to update this and other settings via the `--help` flag (for example: `./prysm.sh validator accounts voluntary-exit --help`). Alternatively, visit our [Parameters documentation](../prysm-usage/parameters.md).

:::caution 

Although validator nodes can voluntarily exit, you won't be able to withdraw your staked funds or re-enroll your validator until withdrawal functionality is implemented, which will likely happen soon after The Merge. Visit the [Ethereum Validator FAQ](https://launchpad.ethereum.org/en/faq) to learn more.

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