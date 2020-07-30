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
* Memory: 4GB RAM
* Storage: 20GB available space SSD
* Internet: Broadband connection

### Recommended specifications

These hardware specifications are recommended, but not required to run the Prysm client.

* Processor: Intel Core i7–4770 or AMD FX-8310 or better
* Memory: 8GB RAM
* Storage: 100GB available space SSD
* Internet: Broadband connection

## Installing the beacon chain and validator

The easiest way to install the beacon chain and validator is by running the `prysm.sh` script found in the main directory of the [Prysm repository](https://github.com/prysmaticlabs/prysm). This script will download and start up the latest release of Prysm binaries compatible with the host system.

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

3. Run the `prysm.sh` script alongside any [startup parameters](/docs/prysm-usage/parameters#beacon-node-parameters):

```sh
./prysm.sh beacon-chain
```

:::tip Pro-Tip
Not getting enough peers?  Refer to the [improve P2P connectivity](/docs/prysm-usage/p2p-host-ip) section of this documentation for tips on network configuration.
:::

The `prysm.sh` script will now download and initialize the beacon chain with the specified parameters. The terminal will produce output like so:

```sh
./prysm.sh beacon-chain
Latest Prysm version is v0.3.3.
Downloading beacon chain@v0.3.3 to /home/{USER}/prysm/dist/beacon-chain-v0.3.3-linux-amd64 (automatically selected latest available version)
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   622  100   622    0     0   2320      0 --:--:-- --:--:-- --:--:--  2312
100 39.6M  100 39.6M    0     0  13.6M      0  0:00:02  0:00:02 --:--:-- 20.4M
Downloading validator@v0.3.3 to /home/{USER}/prysm/dist/validator-v0.3.3-linux-amd64 (automatically selected latest available version)
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   619  100   619    0     0   1484      0 --:--:-- --:--:-- --:--:--  1484
100 32.5M  100 32.5M    0     0  12.6M      0  0:00:02  0:00:02 --:--:-- 21.7M
Starting Prysm beacon-chain
...
```

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

4. Run the `prysm.bat` script alongside any [startup parameters](/docs/prysm-usage/parameters#beacon-node-parameters):

```sh
.\prysm.bat beacon-chain
```

:::tip Pro-Tip
Not getting enough peers?  Refer to the [improve P2P connectivity](/docs/prysm-usage/p2p-host-ip) section of this documentation for tips on network configuration.
:::

The `prysm.bat` script will now download and initialise the beacon chain with the specified parameters. The terminal will produce output like so:

```sh
.\prysm.bat beacon-chain
Latest prysm release is v1.0.0-alpha.5.
Using prysm version v1.0.0-alpha.5.
Downloading beacon chain v1.0.0-alpha.5 to .\dist\validator-v1.0.0-alpha.5-windows-amd64.exe automatically selected latest available release
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 40.3M  100 40.3M    0     0  4593k      0  0:00:09  0:00:09 --:--:-- 5177k
WARN GPG verification is not natively available on Windows.
WARN Skipping integrity verification of downloaded binary
Verifying binary authenticity with SHA265 Hash.
SHA265 Hash Match
Starting Prysm beacon-chain
...
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

1. Create a working directory and enter it:

```sh
mkdir prysm && cd prysm
```

2. Fetch the `prysm.sh` script from Github and make it executable:

```sh
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh
```

3. Run the `prysm.sh` script alongside any [startup parameters](/docs/prysm-usage/parameters#beacon-node-parameters):

```sh
./prysm.sh beacon-chain
```

:::tip Pro-Tip
Not getting enough peers?  Refer to the [improve P2P connectivity](/docs/prysm-usage/p2p-host-ip) section of this documentation for tips on network configuration.
:::

The `prysm.sh` script will now download and initialise the beacon chain with the specified parameters. The terminal will produce output like so:

```sh
./prysm.sh beacon-chain
Latest Prysm version is v0.3.3.
Downloading beacon chain@v0.3.3 to /home/{USER}/prysm/dist/beacon-chain-v0.3.3-linux-amd64 (automatically selected latest available version)
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   622  100   622    0     0   2320      0 --:--:-- --:--:-- --:--:--  2312
100 39.6M  100 39.6M    0     0  13.6M      0  0:00:02  0:00:02 --:--:-- 20.4M
Downloading validator@v0.3.3 to /home/{USER}/prysm/dist/validator-v0.3.3-linux-amd64 (automatically selected latest available version)
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   619  100   619    0     0   1484      0 --:--:-- --:--:-- --:--:--  1484
100 32.5M  100 32.5M    0     0  12.6M      0  0:00:02  0:00:02 --:--:-- 21.7M
Starting Prysm beacon-chain
...
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

3. Run the `prysm.sh` script alongside any [startup parameters](/docs/prysm-usage/parameters#beacon-node-parameters):

```sh
./prysm.sh beacon-chain
```

:::tip Pro-Tip
Not getting enough peers?  Refer to the [improve P2P connectivity](/docs/prysm-usage/p2p-host-ip) section of this documentation for tips on network configuration.
:::

The `prysm.sh` script will now download and initialise the beacon chain with the specified parameters. The terminal will produce output like so:

```sh
./prysm.sh beacon-chain
Latest Prysm version is v0.3.3.
Downloading beacon chain@v0.3.3 to /home/{USER}/prysm/dist/beacon-chain-v0.3.3-linux-amd64 (automatically selected latest available version)
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   622  100   622    0     0   2320      0 --:--:-- --:--:-- --:--:--  2312
100 39.6M  100 39.6M    0     0  13.6M      0  0:00:02  0:00:02 --:--:-- 20.4M
Downloading validator@v0.3.3 to /home/{USER}/prysm/dist/validator-v0.3.3-linux-amd64 (automatically selected latest available version)
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   619  100   619    0     0   1484      0 --:--:-- --:--:-- --:--:--  1484
100 32.5M  100 32.5M    0     0  12.6M      0  0:00:02  0:00:02 --:--:-- 21.7M
Starting Prysm beacon-chain
...
```

</TabItem>
</Tabs>

At this point, the beacon chain data will begin synchronising up to the latest head block. If the network hasn't started yet, it will process eth1 deposits from the deposit contract so far and await the genesis time. Please note that, depending on your network capacity and CPU, this process may take several hours. Once it is complete, you will be ready to make a deposit and begin setting up a validator client.

:::info Syncing the Blockchain
The beacon node you are using should be **completely synced** before submitting your deposit for the validator client, otherwise the validator will not be able to validate and will **inflict minor inactivity balance penalties**. No need to worry about this if the chain has not yet started.
:::

Now that your beacon chain is setup, you can then run a validator on the **Medalla testnet** by following our detailed guidelines [here](/docs/install/medalla-testnet)