---
id: staying-up-to-date
title: Upgrading and downgrading Prysm
sidebar_label: Upgrading and downgrading versions
---

This section outlines the step-by-step process for how to keep Prysm up-to-date, how to downgrade versions, and some security recommendations for stakers regarding updates. 

## Installing Prysm

There are three main ways of installing Prysm:

* [Using the Prysm installation script (Recommended)](/docs/install/install-with-script)
* [Using Docker](/docs/install/install-with-docker)
* [Building from source with Bazel (Advanced)](/docs/install/install-with-bazel)

## Recommended versions

Regardless of your installation method, we always recommend you are running the latest version in our [releases page](https://github.com/prysmaticlabs/prysm/releases) on Github, specified in [semver](https://semver.org/) format such as `v1.0.0-beta.1`. You can check your Prysm version by running your beacon node or validator with the `--version` flag. For example, if using `prysm.sh` to run the beacon node, you would run:

```
prysm.sh beacon-chain --version
```

:::info Always Run a Stable Release
If you are running docker or building from source, we **never** recommend running from the `:latest` docker tag nor the `master` branch of Prysm. we always recommend using `:stable` if running Docker, or using a specific version tag from our latest releases. Likewise for Bazel, we recommend doing a `git checkout COMMIT_HASH` where COMMIT_HASH is for our latest release version
:::

## How to subscribe for updates

Prysm has two official channels for release updates: our [Discord](https://discord.gg/TvM3RWR) and our [mailing list](https://groups.google.com/g/prysm-dev). All releases will be notified via those channels, and we always recommend reading our release notes on Github in case there are **breaking changes** to running a node. Our team avoids breaking changes whenever possible, and we will make it clear in our release notes or in releases ahead of time that breaking changes are coming.

## How to securely upgrade Prysm

Updating in Prysm can incur a few seconds downtime depending on your installation method. Every validator will attest once per epoch (every 6.4 minutes on average), while proposals are more rare. To check your next assigned slot to attest or propose, we recommend checking your validator on [beaconcha.in](https://beaconcha.in). Although missing a single validator duty is not a big deal, you can wait to update right after you attest or propose for optimal performance.

:::tip Missing a single validator duty is not a big deal
Missing a single duty is really not a big deal for your validator profitability. Unless you want to be at the top of the [leaderboard](https://beaconcha.in/validators/leaderboard), do not worry too much. You will be profitable again in no time once your validator is up next epoch.
:::

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

If you are running `prysm.sh`, all it takes to upgrade to the latest release is to stop your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). Then, restart it with the same command you used to start the process. The script will automatically downloaded our latest release for you.

**Using Docker**

To update your Prysm with Docker, we recommend just pulling our `:stable` tag, which will always point to our latest release.

```text
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:stable
docker pull gcr.io/prysmaticlabs/prysm/validator:stable
```

**Using Bazel**

To run our latest release with Bazel, you can look up our [releases page](https://github.com/prysmaticlabs/prysm/releases), look at the commit hash of the latest release, then do `git checkout COMMIT_HASH`. Afterwards, you can re-run your beacon chain and validator as you ran them earlier with Bazel.

</TabItem>
<TabItem value="win">

**Using the Prysm installation script**

If you are running `prysm.bat`, all it takes to upgrade to the latest release is to stop your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). Then, restart it with the same command you used to start the process. The script will automatically downloaded our latest release for you.

**Using Docker**

To update your Prysm with Docker, we recommend just pulling our `:stable` tag, which will always point to our latest release.

```text
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:stable
docker pull gcr.io/prysmaticlabs/prysm/validator:stable
```

</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

If you are running `prysm.sh`, all it takes to upgrade to the latest release is to stop your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). Then, restart it with the same command you used to start the process. The script will automatically downloaded our latest release for you.

**Using Docker**

To update your Prysm with Docker, we recommend just pulling our `:stable` tag, which will always point to our latest release.

```text
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:stable
docker pull gcr.io/prysmaticlabs/prysm/validator:stable
```

**Using Bazel**

To run our latest release with Bazel, you can look up our [releases page](https://github.com/prysmaticlabs/prysm/releases), look at the commit hash of the latest release, then do `git checkout COMMIT_HASH`. Afterwards, you can re-run your beacon chain and validator as you ran them earlier with Bazel.


</TabItem>
<TabItem value="arm">

**Using the Prysm installation script**

If you are running `prysm.sh`, all it takes to upgrade to the latest release is to stop your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). Then, restart it with the same command you used to start the process. The script will automatically downloaded our latest release for you.

**Using Docker**

To update your Prysm with Docker, we recommend just pulling our `:stable` tag, which will always point to our latest release.

```text
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:stable
docker pull gcr.io/prysmaticlabs/prysm/validator:stable
```

</TabItem>
</Tabs>

## How to securely downgrade Prysm

Sometimes, a new version might not work best for you and could impact your profitability negatively if there is an unforeseen issue in the software. To downgrade, there are a few important steps to keep in mind.

### Downgrading between minor patch versions

If you are downgrading between **minor patch versions**, which means only the last number in the version changed, such as `v1.0.5` to `v1.0.4`, then follow the instructions below:

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

If you are running `prysm.sh`, all it takes to downgrade to a previous release is to stop your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). 

Then, find the Prysm version you wish to run from our [releases page](https://github.com/prysmaticlabs/prysm/releases), such as v1.0.5, then run the command `set=USE_PRYSM_VERSION=v1.0.5`.

Then, restart it with the same command you used to start the process. The script will automatically use the release you specified.

**Using Docker**

To run a previous Prysm version with Docker, choose the release you want to run, then change all your docker run commands to use that version tag. For example, instead of `docker run gcr.io/prysmaticlabs/prysm:stable`, do `docker run gcr.io/prysmaticlabs/prysm:v1.0.5` if you want to run version v1.0.5.

**Using Bazel**

To run our latest release with Bazel, you can look up our [releases page](https://github.com/prysmaticlabs/prysm/releases), look at the release tag you want to run, such as v1.0.5, then do `git checkout v1.0.5`. Afterwards, you can re-run your beacon chain and validator as you ran them earlier with Bazel.

</TabItem>
<TabItem value="win">

**Using the Prysm installation script**

If you are running `prysm.bat`, all it takes to downgrade to a previous release is to stop your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). 

Then, find the Prysm version you wish to run from our [releases page](https://github.com/prysmaticlabs/prysm/releases), such as v1.0.5, then run the command `set=USE_PRYSM_VERSION=v1.0.5`.

Then, restart it with the same command you used to start the process. The script will automatically use the release you specified.

**Using Docker**

To run a previous Prysm version with Docker, choose the release you want to run, then change all your docker run commands to use that version tag. For example, instead of `docker run gcr.io/prysmaticlabs/prysm:stable`, do `docker run gcr.io/prysmaticlabs/prysm:v1.0.5` if you want to run version v1.0.5.

</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

If you are running `prysm.sh`, all it takes to downgrade to a previous release is to stop your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). 

Then, find the Prysm version you wish to run from our [releases page](https://github.com/prysmaticlabs/prysm/releases), such as v1.0.5, then run the command `set=USE_PRYSM_VERSION=v1.0.5`.

Then, restart it with the same command you used to start the process. The script will automatically use the release you specified.

**Using Docker**

To run a previous Prysm version with Docker, choose the release you want to run, then change all your docker run commands to use that version tag. For example, instead of `docker run gcr.io/prysmaticlabs/prysm:stable`, do `docker run gcr.io/prysmaticlabs/prysm:v1.0.5` if you want to run version v1.0.5.

**Using Bazel**

To run our latest release with Bazel, you can look up our [releases page](https://github.com/prysmaticlabs/prysm/releases), look at the release tag you want to run, such as v1.0.5, then do `git checkout v1.0.5`. Afterwards, you can re-run your beacon chain and validator as you ran them earlier with Bazel.

</TabItem>
<TabItem value="arm">

**Using the Prysm installation script**

If you are running `prysm.sh`, all it takes to downgrade to a previous release is to stop your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). 

Then, find the Prysm version you wish to run from our [releases page](https://github.com/prysmaticlabs/prysm/releases), such as v1.0.5, then run the command `set=USE_PRYSM_VERSION=v1.0.5`.

Then, restart it with the same command you used to start the process. The script will automatically use the release you specified.

**Using Docker**

To run a previous Prysm version with Docker, choose the release you want to run, then change all your docker run commands to use that version tag. For example, instead of `docker run gcr.io/prysmaticlabs/prysm:stable`, do `docker run gcr.io/prysmaticlabs/prysm:v1.0.5` if you want to run version v1.0.5.

</TabItem>
</Tabs>

### Downgrading between minor version bumps

If you are downgrading between **minor version bumps**, meaning the middle number in the version has changed, such as `v1.1.0` to `v1.0.x`, then follow the instructions below carefully:

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

If you are running `prysm.sh`, first stop your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). 

Next, we recommend backing up any important important folders such as your beacon node data directory and the validator wallet is important. You can simply make copies of the directories and keep them safe in case the downgrade process goes wrong. 

Next up, run our database rollback command to make sure your database is going to be compatible with your new version:

```
prysm.sh validator db migrate down --datadir=/path/to/your/validatorwallet
```

Then, find the Prysm version you wish to run from our [releases page](https://github.com/prysmaticlabs/prysm/releases), such as v1.0.5, then run the command `set=USE_PRYSM_VERSION=v1.0.5`.

Then, restart it with the same command you used to start the process. The script will automatically use the release you specified.

**Using Docker**

To run a previous Prysm version with Docker, choose the release you want to run, such as v1.0.5.

Next, we recommend backing up any important important folders such as your beacon node data directory and the validator wallet is important. You can simply make copies of the directories and keep them safe in case the downgrade process goes wrong. 

Next up, run our database rollback command to make sure your database is going to be compatible with your new version:

```
docker run -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable db migrate down --datadir=/wallet
```

Then change all your docker run commands to use that version tag. For example, instead of `docker run gcr.io/prysmaticlabs/prysm:stable`, do `docker run gcr.io/prysmaticlabs/prysm:v1.0.5` if you want to run version v1.0.5.

**Using Bazel**

To run our latest release with Bazel, you can look up our [releases page](https://github.com/prysmaticlabs/prysm/releases), look at the release tag you want to run, such as v1.0.5.

Next, we recommend backing up any important important folders such as your beacon node data directory and the validator wallet is important. You can simply make copies of the directories and keep them safe in case the downgrade process goes wrong. 

Next up, run our database rollback command to make sure your database is going to be compatible with your new version:

```
bazel run //validator:validator -- db migrate down --datadir=/path/to/your/validatorwallet
```

Then do `git checkout v1.0.5`. Afterwards, you can re-run your beacon chain and validator as you ran them earlier with Bazel.

</TabItem>
<TabItem value="win">

**Using the Prysm installation script**

If you are running `prysm.bat`, first stop your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). 

Next, we recommend backing up any important important folders such as your beacon node data directory and the validator wallet is important. You can simply make copies of the directories and keep them safe in case the downgrade process goes wrong. 

Next up, run our database rollback command to make sure your database is going to be compatible with your new version:

```
prysm.bat validator db migrate down --datadir=\path\to\your\validatorwallet
```

Then, find the Prysm version you wish to run from our [releases page](https://github.com/prysmaticlabs/prysm/releases), such as v1.0.5, then run the command `set=USE_PRYSM_VERSION=v1.0.5`.

Then, restart it with the same command you used to start the process. The script will automatically use the release you specified.

**Using Docker**

To run a previous Prysm version with Docker, choose the release you want to run, such as v1.0.5.

Next, we recommend backing up any important important folders such as your beacon node data directory and the validator wallet is important. You can simply make copies of the directories and keep them safe in case the downgrade process goes wrong. 

Next up, run our database rollback command to make sure your database is going to be compatible with your new version:

```
docker run -v \path\to\wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable db migrate down --datadir=/wallet
```

Then change all your docker run commands to use that version tag. For example, instead of `docker run gcr.io/prysmaticlabs/prysm:stable`, do `docker run gcr.io/prysmaticlabs/prysm:v1.0.5` if you want to run version v1.0.5.

</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

If you are running `prysm.sh`, first stop your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). 

Next, we recommend backing up any important important folders such as your beacon node data directory and the validator wallet is important. You can simply make copies of the directories and keep them safe in case the downgrade process goes wrong. 

Next up, run our database rollback command to make sure your database is going to be compatible with your new version:

```
prysm.sh validator db migrate down --datadir=/path/to/your/validatorwallet
```

Then, find the Prysm version you wish to run from our [releases page](https://github.com/prysmaticlabs/prysm/releases), such as v1.0.5, then run the command `set=USE_PRYSM_VERSION=v1.0.5`.

Then, restart it with the same command you used to start the process. The script will automatically use the release you specified.

**Using Docker**

To run a previous Prysm version with Docker, choose the release you want to run, such as v1.0.5.

Next, we recommend backing up any important important folders such as your beacon node data directory and the validator wallet is important. You can simply make copies of the directories and keep them safe in case the downgrade process goes wrong. 

Next up, run our database rollback command to make sure your database is going to be compatible with your new version:

```
docker run -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable db migrate down --datadir=/wallet
```

Then change all your docker run commands to use that version tag. For example, instead of `docker run gcr.io/prysmaticlabs/prysm:stable`, do `docker run gcr.io/prysmaticlabs/prysm:v1.0.5` if you want to run version v1.0.5.

**Using Bazel**

To run our latest release with Bazel, you can look up our [releases page](https://github.com/prysmaticlabs/prysm/releases), look at the release tag you want to run, such as v1.0.5.

Next, we recommend backing up any important important folders such as your beacon node data directory and the validator wallet is important. You can simply make copies of the directories and keep them safe in case the downgrade process goes wrong. 

Next up, run our database rollback command to make sure your database is going to be compatible with your new version:

```
bazel run //validator:validator -- db migrate down --datadir=/path/to/your/validatorwallet
```

Then do `git checkout v1.0.5`. Afterwards, you can re-run your beacon chain and validator as you ran them earlier with Bazel.

</TabItem>
<TabItem value="arm">

**Using the Prysm installation script**

If you are running `prysm.sh`, first stop your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). 

Next, we recommend backing up any important important folders such as your beacon node data directory and the validator wallet is important. You can simply make copies of the directories and keep them safe in case the downgrade process goes wrong. 

Next up, run our database rollback command to make sure your database is going to be compatible with your new version:

```
prysm.sh validator db migrate down --datadir=/path/to/your/validatorwallet
```

Then, find the Prysm version you wish to run from our [releases page](https://github.com/prysmaticlabs/prysm/releases), such as v1.0.5, then run the command `set=USE_PRYSM_VERSION=v1.0.5`.

Then, restart it with the same command you used to start the process. The script will automatically use the release you specified.

**Using Docker**

To run a previous Prysm version with Docker, choose the release you want to run, such as v1.0.5.

Next, we recommend backing up any important important folders such as your beacon node data directory and the validator wallet is important. You can simply make copies of the directories and keep them safe in case the downgrade process goes wrong. 

Next up, run our database rollback command to make sure your database is going to be compatible with your new version:

```
docker run -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable db migrate down --datadir=/wallet
```

Then change all your docker run commands to use that version tag. For example, instead of `docker run gcr.io/prysmaticlabs/prysm:stable`, do `docker run gcr.io/prysmaticlabs/prysm:v1.0.5` if you want to run version v1.0.5.

</TabItem>
</Tabs>

### Downgrading between major version bumps

For **major version bumps** such as from `v1.0.0` to `v2.0.0`, you cannot downgrade as these are meant to be backwards incompatible changes.
