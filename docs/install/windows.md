---
id: windows
title: Installing Prysm on Windows
sidebar_label: Prysm installation script
---
Prysm can be installed on Windows systems using the Prysm build script. This page includes instructions for performing this process.

**Have questions?** Stop by the [#documentation](https://discord.gg/QQZMCgU) channel on Discord and let us know.

## System requirements

### Minimum specifications
These specifications must be met in order to successfuly run the Prysm client.
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

At this point, the beacon chain data will begin syncronising up to the latest head block. Please note that, depending on your network capacity and CPU, this process may take several hours. Once it is complete, you will be ready to make a deposit and begin setting up a validator client.

  > **NOTICE:** The beacon node you are using should be **completely synced** before submitting your deposit for the validator client, otherwise the validator will not be able to validate and will **inflict minor inactivity balance penalties**.

## Staking ETH: Running a validator client

5. Run the `prysm.bat` script to generate a new keypair, alongside any [startup parameters](/docs/prysm-usage/parameters):

```sh
.\prysm.bat validator accounts create --keystore-path=c:/prysm/validator --password=changeme
```

For step-by-step assistance with performing a deposit and setting up a validator client, see the [activating a validator ](/docs/install/win/activating-a-validator)section of this documentation.

Once your beacon node is up, the chain will be waiting for you to deposit 32 Goerli ETH into a [validator deposit contract](/docs/how-prysm-works/validator-deposit-contract) in order to activate your validator \(discussed in the section below\).

**If you need Goerli ETH**, follow the instructions found on [prylabs.network/participate](https://prylabs.network/participate) to use the testnet faucet. Otherwise, you can contact a team member on Discord to be sent some.

Please note that **it may take up to 12 hours** for the nodes in the network to process a deposit. Once the node is active, the validator will immediately begin performing its responsibilities.

6. Run the `prysm.bat` script alongside any [startup parameters](/docs/prysm-usage/parameters#validator-parameters):

```sh
.\prysm.bat validator --keystore-path=%USERPROFILE%\.eth2validator --password=changeme
```

```sh
.\prysm.bat validator --keystore-path=%USERPROFILE%\.eth2validator --password=changeme
Latest prysm release is v1.0.0-alpha.5.
Using prysm version v1.0.0-alpha.5.
Downloading validator v1.0.0-alpha.5 to .\dist\validator-v1.0.0-alpha.5-windows-amd64.exe automatically selected latest available release
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 32.4M  100 32.4M    0     0  4747k      0  0:00:07  0:00:07 --:--:-- 5396k
WARN GPG verification is not natively available on Windows.
WARN Skipping integrity verification of downloaded binary
Verifying binary authenticity with SHA265 Hash.
SHA265 Hash Match
Starting Prysm validator --keystore-path=%USERPROFILE%\.eth2validator --password=changeme
...
```

In your validator client, you will be able to see your validator balance as it goes up over time. Note that, should your node ever go offline for a long period, your validator will start gradually losing its deposit.  If it drops below 16 ETH, it will be removed from the network entirely.

**Congratulations! If you've made it this far, you are now running Ethereum 2.0 Phase 0.**
