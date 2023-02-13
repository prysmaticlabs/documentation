---
id: exiting-a-validator
title: Exit your validator
sidebar_label: Exit your validator
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget  commaDelimitedContributors="James" lastVerifiedDateString="February 3rd, 2023" lastVerifiedVersionString="v3.2.0"/>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


:::caution Public Preview

**This document is currently in public preview** and may change significantly as we receive feedback from users like you. Join our [Discord server](https://discord.gg/prysmaticlabs) or click the `Request an Update` button above to share your feedback.

:::


Voluntarily exiting your validator from the Ethereum network is a one time command using the [prysmctl tool](../prysm-usage/prysmctl.md). Note that this operation was previously facilitated by a command exposed by the Prysm validator client, and can still be accessed that way. At a high level, you'll follow these steps to exit your validator:

 1. Ensure that you have access to a fully synced beacon node.
 2. Issue the `validator exit` command to your validator and allow the beacon node to access to your validator keys through the `--wallet-dir` flag or [web3signer](web3signer.md) and the `--beacon-rpc-provider` flag (examples provided below).
 3. Select the account(s) that should be exited. This step can be skipped by specifying the account(s) via the `--public-keys` flag when issuing the `validator exit` command.
 4. Confirm your understanding of the consequences of exiting your validator by typing `Exit my validator` when prompted.

After providing confirmation, voluntary exit request will be broadcasted through your beacon node. Visit our [Command-line options documentation](../prysm-usage/parameters.md) for more configuration options.

:::caution 

Although validator nodes can voluntarily exit, funds won't be withdrawable until after Capella/Shanghai hardfork and the `bls-to-exeuction-change` command is available. Learn more on how to withdraw earnings or fully withdraw your validator once available in [our guide](withdraw-validator.md)

The `validator-exit command` only supports gRPC, which means that the specified `beacon-rpc-provider` needs to be a Prysm beacon node (because Prysm's beacon node client is the only client that supports gRPC)

:::

<Tabs
  groupId="operating-systems"
  defaultValue="lin"
  values={[
    {label: 'Linux', value: 'lin'},
    {label: 'Windows', value: 'win'},
    {label: 'Mac', value: 'arm'},
  ]
}>
<TabItem value="lin">

```
prysmctl validator exit --wallet-dir=<path/to/wallet> --beacon-rpc-provider=<127.0.0.1:4000> 
```

`prysmctl` is not accessible from `prysm.sh` and will need to be built from source or downloaded from our release page.

:::caution
The following command is a soon-to-be-deprecated alternative that you should avoid using:

```bash
./prysm.sh validator accounts voluntary-exit
```

:::

**Using Docker**

```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  gcr.io/prysmaticlabs/prysm/prysmctl:latest \
  validator exit --wallet-dir=/wallet --beacon-rpc-provider=<127.0.0.1:4000> 
```

:::caution

The following command is a soon-to-be-deprecated alternative that you should avoid using:

```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  accounts voluntary-exit --wallet-dir=/wallet
```

:::

**Using Bazel**

```bash
bazel run //prysmctl --config=release -- validator exit --wallet-dir=/wallet --beacon-rpc-provider=<127.0.0.1:4000> 
```
:::caution

The following command is a soon-to-be-deprecated alternative that you should avoid using:

```bash
bazel run //validator --config=release -- accounts voluntary-exit
```

:::

</TabItem>
<TabItem value="win">

```
prysmctl validator exit --wallet-dir=<path/to/wallet> --beacon-rpc-provider=<127.0.0.1:4000>
```

**Using Prysm.bat**

```
prysmctl validator exit --wallet-dir=<path/to/wallet> --beacon-rpc-provider=<127.0.0.1:4000> 
```

`prysmctl` is not accessible from `prysm.bat` and will need to be built from source or downloaded from our release page.

:::caution

The following command is a soon-to-be-deprecated alternative that you should avoid using:

```bash
prysm.bat validator accounts voluntary-exit
```

:::

**Using Docker**

```text
docker run -it -v %LOCALAPPDATA%\Eth2Validators\prysm-wallet-v2:/wallet \
  gcr.io/prysmaticlabs/prysm/prysmctl:latest \
  validator exit --wallet-dir=/wallet --beacon-rpc-provider=<127.0.0.1:4000> 
```

:::caution

The following command is a soon-to-be-deprecated alternative that you should avoid using:

```text
docker run -it -v %LOCALAPPDATA%\Eth2Validators\prysm-wallet-v2:/wallet gcr.io/prysmaticlabs/prysm/validator:latest accounts voluntary-exit --wallet-dir=/wallet
```
:::

</TabItem>
<TabItem value="arm">

```
prysmctl validator exit --wallet-dir=<path/to/wallet> --beacon-rpc-provider=<127.0.0.1:4000> 
```

`prysmctl` is not accessible from `prysm.sh` and will need to be built from source or downloaded from our release page.

:::caution

The following command is a soon-to-be-deprecated alternative that you should avoid using:

```bash
./prysm.sh validator accounts voluntary-exit
```

:::

**Using Docker**

```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  gcr.io/prysmaticlabs/prysm/prysmctl:latest \
  validator exit --wallet-dir=/wallet --beacon-rpc-provider=<127.0.0.1:4000> 
```

:::caution

The following command is a soon-to-be-deprecated alternative that you should avoid using:

```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  accounts voluntary-exit --wallet-dir=/wallet
```

:::

**Using Bazel**

```bash
bazel run //prysmctl --config=release -- validator exit --wallet-dir=/wallet --beacon-rpc-provider=<127.0.0.1:4000> 
```
:::caution

The following command is a soon-to-be-deprecated alternative that you should avoid using:

```bash
bazel run //validator --config=release -- accounts voluntary-exit
```

:::

</TabItem>
</Tabs>

**Note:** The above-referenced commands that are being deprecated have not been removed yet, but mirror those found in `prysmctl`.


import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />