---
id: install-with-script
title: Installing Prysm with prysm.sh 
sidebar_label: Prysm installation script
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

![Prysm Basic Setup](/img/prysm-basic-setup.png)

### Running the Prysm startup script

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

1. Create a working directory and enter it:

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

1. Decide where you would like to keep prysm files, create a working directory and enter it:

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

Now that you downloaded the .bat file, you can proceed to [joining eth2](/docs/mainnet/joining-eth2).

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

1. Create a working directory and enter it:

```sh
mkdir prysm && cd prysm
```

2. Fetch the `prysm.sh` script from Github and make it executable:

```sh
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh
```
Now that you downloaded the .sh file, you can proceed to [joining eth2](/docs/mainnet/joining-eth2).

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
Now that you downloaded the .sh file, you can proceed to [joining eth2](/docs/mainnet/joining-eth2).

</TabItem>
</Tabs>
