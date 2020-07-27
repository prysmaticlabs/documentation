---
id: windows
title: Installing Prysm on Windows
sidebar_label: Prysm installation script
---
Prysm can be installed on Windows systems using the Prysm build script. This page includes instructions for performing this process.

**Have questions?** Stop by the [#documentation](https://discord.gg/QQZMCgU) channel on Discord and let us know.

## System requirements

### Minimum specifications
These specifications must be met in order to successfully run the Prysm client.
* Operating System: 64-bit Windows 
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

The easiest way to install the beacon chain and validator is by running the `prysm.bat` script found in the main directory of the [Prysm repository](https://github.com/prysmaticlabs/prysm). This script will download and start up the latest release of Prysm binaries compatible with the host system.

![Prysm Basic Setup](/img/prysm-basic-setup.png)

### Running the Prysm startup script

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

> Not getting enough peers?  Refer to the [improve P2P connectivity](/docs/prysm-usage/p2p-host-ip) section of this documentation for tips on network configuration.

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

At this point, the beacon chain data will begin synchronising up to the latest head block. Please note that, depending on your network capacity and CPU, this process may take several hours. Once it is complete, you will be ready to make a deposit and begin setting up a validator client.

  > **NOTICE:** The beacon node you are using should be **completely synced** before submitting your deposit for the validator client, otherwise the validator will not be able to validate and will **inflict minor inactivity balance penalties**.
