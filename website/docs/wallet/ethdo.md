---
id: ethdo
title: Integrating with third-party wallet, ethdo
sidebar_label: Using Ethdo
---

This section explains how to use the popular, third-party wallet, [ethdo](https://github.com/wealdtech/ethdo/tree/v1.6.1) with Prysm's validator client. At the time of writing, this guide is made for ethdo v1.6.1. Ethdo offers a command-line tool that allows advanced stakers to perform all sorts of tasks relating to wallets and validating keys which is far more extensible than what Prysm has built-in. Ethdo provides useful helpers for managing HD wallets, signing deposits, performing validator exits, and more. In this guide, we'll go over how to use a wallet you created in ethdo to validate with Prysm.

:::danger This is the only recommended way to use Ethdo with Prysm
This guide is the only recommended way to use ethdo with Prysm which will always be supported by our client. Do not use ethdo with the old flags --keymanager, --keymanageropts, or --disable-accounts-v2. These flags will be removed in Prysm's beta release!
:::

## Installation

This is the recommended option to keep using ethdo for all your wallet needs and simply import the validating keys you wish to validate with in Prysm.

To begin, follow the instructions to fetch and install Prysm for your operating system.

* [Using the Prysm installation script (Recommended)](/docs/install/install-with-script)
* [Using Docker](/docs/install/install-with-docker)
* [Building from source with Bazel (Advanced)](/docs/install/install-with-bazel)

Next, make sure you install [ethdo](https://github.com/wealdtech/ethdo/tree/v1.6.1).

### Create an ethdo wallet

If you already have an ethdo wallet, you can skip this step. You can follow along the [usage documentation](https://github.com/wealdtech/ethdo/blob/v1.6.1/docs/usage.md#create-1) in ethdo itself for the most up-to-date information on available options, but at the most basic level, you can create an ethdo wallet as follows:

```
ethdo wallet create --wallet="mywallet"
```

Then, you can create new accounts with
```
ethdo account create --account="mywallet/myfirstaccount" --passphrase="foo"
```

Where you should replace the `--passphrase="foo"` with a strong password of your choice. 

### Import validating keys into Prysm

You can find the location of where your ethdo wallet is stored by using:

```
ethdo wallet info --verbose --wallet="mywallet"
```

Based on your operating system, you will see a location folder being printed. **Copy this directory path**. Finally, you can now import your validating keystores into Prysm with the following commands for your operating system:

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

**Using the Prysm installation script**

```text
./prysm.sh validator accounts-v2 import --keys-dir=<PATH_TO_ETHDO_WALLET>
```

**Using Docker**

```text
docker run -it -v <PATH_TO_ETHDO_WALLET>:/keys \
  -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  -v $HOME/Eth2:/validatorDB \
  --name validator \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  accounts-v2 import --keys-dir=/keys --wallet-dir=/wallet --datadir=/validatorDB
```

**Using Bazel**

```text
bazel run //validator:validator -- accounts-v2 import --keys-dir=<PATH_TO_ETHDO_WALLET>
```

</TabItem>
<TabItem value="win">

**Using the prysm.bat script**

```text
prysm.bat validator accounts-v2 import --keys-dir=<PATH_TO_ETHDO_WALLET>
```

**Using Docker**

```text
docker run -it -v <PATH_TO_ETHDO_WALLET>:/keys -v %LOCALAPPDATA%\Eth2Validators\prysm-wallet-v2:/wallet gcr.io/prysmaticlabs/prysm/validator:latest accounts-v2 import --keys-dir=/keys --wallet-dir=/wallet
```

</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

```text
./prysm.sh validator accounts-v2 import --keys-dir=<PATH_TO_ETHDO_WALLET>
```

**Using Docker**

```text
docker run -it -v <PATH_TO_ETHDO_WALLET>:/keys \
  -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  -v $HOME/Eth2:/validatorDB \
  --name validator \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  accounts-v2 import --keys-dir=/keys --wallet-dir=/wallet --datadir=/validatorDB
```

**Using Bazel**

```text
bazel run //validator:validator -- accounts-v2 import --keys-dir=<PATH_TO_ETHDO_WALLET>
```

</TabItem>
<TabItem value="arm">

**Using the Prysm installation script**

```text
./prysm.sh validator accounts-v2 import --keys-dir=<PATH_TO_ETHDO_WALLET>
```

**Using Bazel**

```text
bazel run //validator:validator -- accounts-v2 import --keys-dir=<PATH_TO_ETHDO_WALLET>
```

</TabItem>
</Tabs>
