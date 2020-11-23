---
id: staying-up-to-date
title: Keeping Prysm updated
sidebar_label: Staying up to date
---

This section outlines the step-by-step process for how to keep Prysm up to date along with security recommendations for stakers regarding updates. 

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

## How to securely update Prysm

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

If you are running `prysm.sh`, all it takes to upgrade to the latest release is to restart your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). Then, restart it with the same command you used to start the process. The script will automatically downloaded our latest release for you.

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

If you are running `prysm.bat`, all it takes to upgrade to the latest release is to restart your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). Then, restart it with the same command you used to start the process. The script will automatically downloaded our latest release for you.

**Using Docker**

To update your Prysm with Docker, we recommend just pulling our `:stable` tag, which will always point to our latest release.

```text
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:stable
docker pull gcr.io/prysmaticlabs/prysm/validator:stable
```

</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

If you are running `prysm.sh`, all it takes to upgrade to the latest release is to restart your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). Then, restart it with the same command you used to start the process. The script will automatically downloaded our latest release for you.

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

If you are running `prysm.sh`, all it takes to upgrade to the latest release is to restart your beacon node and validator with `ctrl+c` (wait for the process to close down gracefully, do not spam ctrl+c). Then, restart it with the same command you used to start the process. The script will automatically downloaded our latest release for you.

**Using Docker**

To update your Prysm with Docker, we recommend just pulling our `:stable` tag, which will always point to our latest release.

```text
docker pull gcr.io/prysmaticlabs/prysm/beacon-chain:stable
docker pull gcr.io/prysmaticlabs/prysm/validator:stable
```

</TabItem>
</Tabs>