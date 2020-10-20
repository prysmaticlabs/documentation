---
id: ethdo
title: Integrating with third-party wallet, ethdo
sidebar_label: Using Ethdo
---

This section explains how to configure a new wallet with the popular third-party wallet [ethdo](https://github.com/wealdtech/ethdo/tree/v1.6.1) for Prysm's validator client. At the time of writing, this guide is made for ethdo v1.6.1. Ethdo offers a command-line tool that allows advanced stakers to manage HD wallets, sign deposits, perform validator exits, as well as other robust features relating to wallets and validating keys that are not currently present within Prysm. 

:::danger This is the only recommended way to use Ethdo with Prysm
This guide is the only recommended way to use ethdo with Prysm, which will always be supported by our client.
:::

## Installation

It is recommended to work with a fresh Prysm installation, and simply import existing validator keys after ethdo is configured.

To begin, follow the instructions to fetch and install Prysm for your operating system.

* [Using the Prysm installation script (Recommended)](/docs/install/install-with-script)
* [Using Docker](/docs/install/install-with-docker)
* [Building from source with Bazel (Advanced)](/docs/install/install-with-bazel)

Next, make sure you install [ethdo](https://github.com/wealdtech/ethdo/tree/v1.6.1).

### Create an ethdo wallet

If an ethdo wallet already exists, this step can be skipped, and the [usage documentation](https://github.com/wealdtech/ethdo/blob/v1.6.1/docs/usage.md#create-1) in ethdo itself can be referenced for the most up-to-date information on available options; but at the most basic level, creating an ethdo wallet goes as follows:

1. Create a new wallet:

```
ethdo wallet create --wallet="mywallet"
```

2. Create new accounts with:
```
ethdo account create --account="mywallet/myfirstaccount" --passphrase="foo"
```

The `--passphrase="foo"` should be replaced with a strong password.

### Import validating keys into Prysm

You can find the location of the newly created wallet with the following command:

```
ethdo wallet info --verbose --wallet="mywallet"
```

Based on your operating system, you will see a location folder being printed. **Copy this directory path**. Import your validating keystores into Prysm with the following commands, operating system depending:

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
./prysm.sh validator accounts import --keys-dir=<PATH_TO_ETHDO_WALLET>
```

**Using Docker on GNU/Linux and macOS**

To import your keys with a Docker installation of Prysm, issue the command:

```text
docker run -it -v <PATH_TO_ETHDO_WALLET>:/keys \
  -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  -v $HOME/Eth2:/validatorDB \
  --name validator \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  accounts import --keys-dir=/keys --wallet-dir=/wallet --datadir=/validatorDB
```

**Using Docker on Windows**

```text
docker run -it -v <PATH_TO_ETHDO_WALLET>:/keys -v %LOCALAPPDATA%\Eth2Validators\prysm-wallet-v2:/wallet gcr.io/prysmaticlabs/prysm/validator:latest accounts import --keys-dir=/keys --wallet-dir=/wallet
```

**Using Bazel**

To import your keys with a Bazel installation of Prysm, issue the command:

```text
bazel run //validator:validator -- accounts import --keys-dir=<PATH_TO_ETHDO_WALLET>
```

</TabItem>
<TabItem value="win">

**Using the prysm.bat script**

```text
prysm.bat validator accounts import --keys-dir=<PATH_TO_ETHDO_WALLET>
```


</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

```text
./prysm.sh validator accounts import --keys-dir=<PATH_TO_ETHDO_WALLET>
```

**Using Docker**

```text
docker run -it -v <PATH_TO_ETHDO_WALLET>:/keys \
  -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  -v $HOME/Eth2:/validatorDB \
  --name validator \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  accounts import --keys-dir=/keys --wallet-dir=/wallet --datadir=/validatorDB
```

**Using Bazel**

```text
bazel run //validator:validator -- accounts import --keys-dir=<PATH_TO_ETHDO_WALLET>
```

</TabItem>
<TabItem value="arm">

**Using the Prysm installation script**

```text
./prysm.sh validator accounts import --keys-dir=<PATH_TO_ETHDO_WALLET>
```

**Using Bazel**

```text
bazel run //validator:validator -- accounts import --keys-dir=<PATH_TO_ETHDO_WALLET>
```

</TabItem>
</Tabs>
