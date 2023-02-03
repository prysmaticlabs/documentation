---
id: exiting-a-validator
title: Exit your validator
sidebar_label: Exit your validator
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget  commaDelimitedContributors="James" lastVerifiedDateString="February 3rd, 2023" lastVerifiedVersionString="v3.2.0"/>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Voluntarily exiting your validator from the Ethereum network is a one time command using the [prysmctl tool](../prysm-usage/prysmctl.md). **note:** previously uses a command under the validator client, and can still be accessed that way.

 1. Ensure access to a fully synced beacon node. 
 1. Issue the `validator exit` command to your validator and providing access to your validator keys through the `--wallet-dir` flag or [web3signer](web3signer.md) and the `--beacon-rpc-provider`flag to the synced beacon node (examples provided below).
 2. Select the account(s) that should be exited. This step can be skipped by specifying the account(s) via the `--public-keys` flag when issuing the `validator exit` command.
 3. Confirm your understanding of the consequences of exiting your validator by typing `Exit my validator` when prompted.

After providing confirmation, voluntary exit request will be broadcasted through your beacon node. Visit our [Command-line options documentation](../prysm-usage/parameters.md) for more configuration options.

:::caution 

Although validator nodes can voluntarily exit, funds won't be withdrawable until after Capella/Shanghai hardfork and the bls-to-exeuction-change command is available. Learn more on how to withdraw earnings or fully withdraw your validator once available in [our guide](withdraw-validator.md)

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
prysmctl validator exit --wallet-dir=<path/to/wallet> --beacon-rpc-provider=127.0.0.1:4000 
```

:::caution

previous command  that will depricate in the future:

```bash
./prysm.sh validator accounts voluntary-exit
```

:::

**Using Docker**



:::caution

previous command that will depricate in the future:

```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  accounts voluntary-exit --wallet-dir=/wallet
```

:::

**Using Bazel**


:::caution

previous command that will depricate in the future:

```bash
bazel run //validator --config=release -- accounts voluntary-exit
```

:::

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
<TabItem value="arm">

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
</Tabs>


## Prompt Phrase for exiting the validator
By using the following phrase in the user prompt, you confirm all understanding of the consequences of exiting the validator.
`Exit my validator`

import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />