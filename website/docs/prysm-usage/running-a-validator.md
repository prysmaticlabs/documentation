---
id: running-a-validator
title: Running a validator client
sidebar_label: Running a validator
---

This page outlines step-by-step information on how to run a validator client for eth2 using Prysm, security considerations, additional parameters, and answers to common questions. A **validator client** is a piece of software that can interact with your private keys to participate in staking on eth2. The validator client needs to connect to a **beacon node**, which is a separate piece of software which actually runs the eth2 blockchain. This separation helps protect your precious staking keys by not exposing them to the Internet like your beacon node is.

![image](/img/validator.png)

## Need assistance?

If you have questions about this documentation, feel free to stop by either the [Prysmatic Discord](https://discord.gg/hmq4y2P)'s **#documentation** channel or [Gitter](https://gitter.im/prysmaticlabs/geth-sharding?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) and a member of the team or our community will be happy to assist you.

## Step 1: Setting up Prysm and the beacon node

To begin, follow the instructions to fetch and install Prysm for your operating system.

* [Using the Prysm installation script (Recommended)](/docs/install/install-with-script)
* [Using Docker](/docs/install/install-with-docker)
* [Building from source with Bazel (Advanced)](/docs/install/install-with-bazel)

After installing from these instructions above, you should now have a running beacon node, which you can use to connect your validators to and start earning rewards for staking. Before you connect your validator, you'll need to create new validating keys by using a **wallet**.

## Step 2: Creating your validating keys

To participate in staking, you'll need to create a **wallet** with **private keys** you'll need to keep safe. In this section, we'll go over the different wallet options Prysm provides and how to pick the one that works best for your needs.

### Wallet kinds

Out of the box, Prysm supports 3 different kinds of wallets that each come with unique benefits.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  groupId="wallet"
  defaultValue="simple-import"
  values={[
    {label: 'Simple import (recommended)', value: 'simple-import'},
    {label: 'HD wallet (least secure)', value: 'hd'},
    {label: 'Remote signer (most secure)', value: 'remote'},
  ]
}>
<TabItem value="simple-import">

Prysm supports importing only the validating keys one needs to join eth2, keeping ones mnemonic and other wallet secrets safe. This type of wallet is also referred to as a **non-deterministic** wallet, as the keys it manages can be imported from anywhere, not necessarily from a 24-word mnemonic phrase. This is the **recommended approach** for key management if you have joined the eth2 testnet via the [Medalla testnet launchpad](https://medalla.launchpad.ethereum.org/) and you read our dedicated instructions [here](/docs/testnet/medalla).

The idea behind the simple import functionality is for a user to create a wallet elsewhere, with a tool, such as the official [eth2.0-deposit-cli](https://github.com/ethereum/eth2.0-deposit-cli), and import only what one needs into their validator client. This is a great approach for simple cloud hosting in which you run Prysm in your favorite cloud provider, create your keys offline on your personal computer, and simply upload the validating keys the Prysm client needs to your cloud server. Your accounts are then protected by a **strong** password. For more information on the full capabilities of our simple-import wallet, you can read our docs [here](/docs/wallet/nondeterministic).

</TabItem>
<TabItem value="hd">

An HD wallet is a common type of blockchain wallet which is generated from a 24-word mnemonic phrase, such as

```text
glue hawk service repeat album stable arctic piece kiss arrive viable labor connect film deer trap brain fashion duck omit beach ten slot goat
```

With this phrase, you can generate _all_ of your private keys, even if you have hundreds of them. You should be keeping this phrase secure and offline, using it to recover your wallet in case anything goes wrong. The Prysm HD wallet stores an encrypted secret derived from this phrase with a **strong** password. Although Prysm's built-in HD wallet is compatible with the latest eth2 standards, and it is the default behavior if you run Prysm out of the box, it is **not the most secure** way of validating. Given you are tying your HD wallet to the validator client, it is less secure than simply importing validating keys you need from an external source or running a remote signer. To read more about HD wallets, checkout our detailed documentation [here](/docs/wallet/deterministic).

</TabItem>
<TabItem value="remote">

The most advanced and **secure** type of wallet for users is a **remote signing** wallet. With this wallet, your validator client reaches out to a remote server, which manages your keys securely, to sign eth2 data requests. This means your validator client never touches your secret keys directly, and relies on a secure connection to a remote signer server you operate to perform these operations.

![image](/img/remotesigner.svg)

This is secure because if the server where your validator client is running gets compromised, no one can steal your actual keys. This architecture makes no assumptions about how the remote server might store the actual keys, as it might rely on advanced hardware setups or secure secret management platforms such as [Hashicorp Vault](https://www.vaultproject.io/).

For reference to power users aiming to use a remote signer server, we created our own reference implementation of this server as an open source, Apache 2 project on Github [here](https://github.com/prysmaticlabs/remote-signer).

For full documentation on how to setup a remote signer-capable wallet using Prysm, checkout our dedicated page [here](/docs/wallet/remote).

</TabItem>
</Tabs>

### Security considerations

Security for your keys is a big topic, but at its core, it is important to clarify the role of the private keys in eth2. When you generate a validator key, you actually generate 2 different ones: a **withdrawal key** and a **validating key**. The withdrawal key should be stored offline, and can be used to withdraw your gains in the future as it is not used during the validating process. Your validating key, however, needs to be accessible by your running validator client software **at all times**.

As a validator, you're expected to be consistently online to produce blocks and vote on others' blocks, as this is how you get rewarded for participating in eth2. To do this, your software needs to have instant access to your validating key, also referred to often as a "hot key" or access to a "hot wallet". Keeping your withdrawal key, or wallet mnemonic _far away_ from your validator client is what will give you **optimal security** in eth2. If someone were to steal your validating keys, they wouldn't be able to withdraw your validator's staked ETH.

:::tip Keeping your wallet safe
When creating an HD wallet, you'll be given a 24-word mnemonic phrase which you need to store safely. Make sure you write it down somewhere safe offline, and do not leave traces of it on your computer. If someone gets ahold of this mnemonic, they can steal all your accounts!
:::

The ideal security for an average user participating as a validator is as follows:

- Create a wallet using the official [eth2.0-deposit-cli](https://github.com/ethereum/eth2.0-deposit-cli) and keep your mnemonic stored offline, safely
- Import only the validating keys you need into your validator client, such as by following the instructions [here](/docs/testnet/medalla)

For **best security** in production cloud deployments, it's best you use a **remote signer**, as that offers absolute separation of your secret keys and your validator client software. Read more about remote signers [here](/docs/wallet/remote).

### Creating your wallet and keys

After you've made your decision on which type of wallet you prefer to run, you can then create one from the following instructions.

## Step 3: Submitting your 32 ETH deposit

Joining as a validator in ETH2 involves making a one-time deposit of 32 ETH

<Tabs
  groupId="deposit"
  defaultValue="via-launchpad"
  values={[
    {label: 'Via launchpad', value: 'via-launchpad'},
    {label: 'Manually through Metamask', value: 'metamask'},
  ]
}>
<TabItem value="via-launchpad">

We highly recommend going through the official [eth2 launchpad](https://medalla.launchpad.ethereum.org/) which can help onboard you directly the Medalla testnet. As part of the process, you'll be asked to create a wallet using the official [eth2.0-deposit-cli](https://github.com/ethereum/eth2.0-deposit-cli). You can then upload the `deposit_data.json` file created by the CLI to the launchpad as prompted by their instructions. You can then import your validating keys to run the Prysm validator client by running our dedicated instructions [here](/docs/testnet/medalla).

![image](/img/deposit.png)

</TabItem>
<TabItem value="metamask">

You can also participate in eth2 by depositing 32 ETH into the Medalla testnet contract directly using a wallet such as Metamask. You'll 

:::danger Do not send real ETH!
Eth2 is currently only in **testnet mode**, meaning there is no real money involved. Never send any real ETH to deposit contract, and be mindful of how you're submitting your deposit! The eth2 launchpad is the friendlist way to send your deposit.
:::

If you created an HD wallet with Prysm, you'll be able to see the `deposit data

</TabItem>
</Tabs>

## Step 4: Running your validator

Now that you created your wallet, sent your deposit, and got through all these steps, you're now ready to run our validator client software. The simplest way to run it is with the following command based on your operating system and preferred installation method.

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
./prysm.sh validator
```

**Using Docker**

```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet --network="host" \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  --beacon-rpc-provider=127.0.0.1:4000 \
  --wallet-dir=/walle$
```

**Using Bazel**

```text
bazel run //validator
```

</TabItem>
<TabItem value="win">

**Using the prysm.bat script**

```text
prysm.bat validator
```

**Using Docker**

```text
docker run -it -v %LOCALAPPDATA%\Eth2Validators\prysm-wallet-v2:/wallet --network="host" gcr.io/prysmaticlabs/prysm/validator:latest --beacon-rpc-provider=127.0.0.1:4000 --wallet-dir=/wallet
```

</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

```text
./prysm.sh validator
```

**Using Docker**

```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet --network="host" \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  --beacon-rpc-provider=127.0.0.1:4000 \
  --wallet-dir=/wallet
```

**Using Bazel**

```text
bazel run //validator
```

</TabItem>
<TabItem value="arm">

**Using the Prysm installation script**

```text
./prysm.sh validator
```

**Using Bazel**

```text
bazel run //validator
```

</TabItem>
</Tabs>

:::tip Skipping the Wallet Password Prompt
Upon starting your validator client, you will always be prompted to provide your wallet's password. If you want to avoid this prompt, you can provide a `--wallet-password-file` flag to launch your validator client without required user input.
:::

### Available parameters

There are several options available to customize your validator client. Here is a list of all command line flags you can pass in when running the program.

| Flag          | Usage         |
| ------------- |:-------------|
|`--no-custom-config` | Run the beacon chain with the real parameters from phase 0.
|`--beacon-rpc-provider` | Beacon node RPC provider endpoint. Default: localhost:4000
|`--tls-cert` | Certificate for secure gRPC to a beacon node
|`--tls-key` | TLS key for secure gRPC to a beacon node
|`--disable-rewards-penalties-logging` | Disable reward/penalty logging during cluster deployment.
|`--graffiti` | A string to include in proposed block.
|`--grpc-max-msg-size`| Integer to define max recieve message call size. Default: 52428800 (for 50Mb).
|`--enable-account-metrics` | Enable prometheus metrics for validator accounts.
|`--wallet-dir` | Path to the wallet for the validator client
|`--wallet-password-file` | Path to a plain-text file containing the password for unlocking the user's wallet 

### Keeping your validator always online using systemd or Docker

Running a validator is a 24/7 task, meaning you can't always expect to be in front of your computer to manage it. If you're running the validator on a cloud server, or you want the ability for it to restart automatically once your computer restarts, you need a way to run the software in the background. There are several ways of doing this, but we'll cover Docker and systemd, which are popular methods of running software as a service.

## Step 5: Monitoring your performance

Once you get everything up and running, it can be a little confusing as to what to do next. We created a page for you to check [everything is running as expected](/docs/prysm-usage/is-everything-fine). If everything looks good in terms of the software running correctly, there are many ways of monitoring your validator's gains.

**Block explorers**

![image](/img/beaconchain.png)

- [beaconcha.in](https://beaconcha.in) by Bitfly has done an amazing job at putting together detailed charts, trackers for validator rewards.
- [beaconscan](https://beaconscan.io) by the Etherscan team has been developing their block explorer with a really nice UI. You can check out your validator's gains and other chain data from their explorer.

If you want to visualize your validator's performance yourself, directly from your machine, the validator exposes a metrics endpoint which can be visualized by the popular monitoring dashboard, [Grafana](https://grafana.com/). Setting up your own grafana also comes with useful features such as alerts for when your validator isn't performing as expected. Our community members put together a great guide on setting grafana for your validator client [here](/docs/prysm-usage/monitoring/grafana-dashboard).

## Frequently asked questions

As you run your validator, you might run into unexpected errors or situations in which things aren't working as expected. Here are our answers to some of the most frequently asked questions.

#### How are my accounts stored? What data is stored on disk?

If you are running a **simple import wallet (non-HD)**, we keep an encrypted file called `all-accounts.keystore.json` protected by a strong password which contains your validating private keys and public keys. This file is stored in your wallet path.

If you are running an **HD wallet**, we store your encrypted wallet seed under your wallet path in a file named `encrypted.seed.json`. This file is protected by a strong password you set during wallet creation, and we do not store your password.

If you are running a **remote signer wallet**, we do not store anything on disk except for the remote server credential information, such as the remote address and path to the TLS certificates required to establish a connection.

#### How can I import keys I use in a different eth2 client such as Lighthouse or Teku?

Prysm can import keys from any directory as long as the keys are stored in files with the format keystore-*.json. If this is the case, you can run the following commands for your operating system.

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

Using the Prysm installation script

```text
./prysm.sh validator accounts-v2 import --keys-dir=/path/to/keys
```

Using Docker

```text
docker run -it -v /path/to/keys:/keys \
  -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  accounts-v2 import --keys-dir=/keys --wallet-dir=/wallet
```

Using Bazel

```text
bazel run //validator:validator -- accounts-v2 import --keys-dir=/path/to/keys
```

</TabItem>
<TabItem value="win">

Using the prysm.bat script

```text
prysm.bat validator accounts-v2 import --keys-dir=path\to\keys
```

Using Docker

```text
docker run -it -v path\to\keys:/keys -v %LOCALAPPDATA%\Eth2Validators\prysm-wallet-v2:/wallet gcr.io/prysmaticlabs/prysm/validator:latest accounts-v2 import --keys-dir=/keys --wallet-dir=/wallet
```

</TabItem>
<TabItem value="mac">

Using the Prysm installation script

```text
./prysm.sh validator accounts-v2 import --keys-dir=/path/to/keys
```

Using Docker

```text
docker run -it -v /path/to/keys:/keys \
  -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  accounts-v2 import --keys-dir=/keys --wallet-dir=/wallet
```

Using Bazel

```text
bazel run //validator:validator -- accounts-v2 import --keys-dir=/path/to/keys
```

</TabItem>
<TabItem value="arm">

Using the Prysm installation script

```text
./prysm.sh validator accounts-v2 import --keys-dir=/path/to/keys
```

Using Bazel

```text
bazel run //validator:validator -- accounts-v2 import --keys-dir=/path/to/keys
```

</TabItem>
</Tabs>

#### Why is my validator losing ETH despite my setup appearing ok?

If your validator client is running fine without errors but you're seeing your validator balance decrease, it is typically a sign your beacon node is either (a) crashed, (b) not synced to the chain head. This might also mean your beacon node doesn't have any peers and is likely not connected to anyone. To debug this problem, please read our guide on checking [everything is running as expected](/docs/prysm-usage/is-everything-fine). If this still does not resolve your issue, you can get in touch with our team on [Discord](https://discord.gg/hmq4y2P) anytime

#### How can I use a hardware wallet with my validator?

At the moment, there is no built-in hardware wallet support for validators, but teams such as Ledger are working on integrating BLS12-381 keys (the type of keys used by eth2) into their products.

#### Help! Something is messed up with the validator and I can't start it

If you're encountering an unexpected issue that causes your client to crash or throw errors yuo cannot understand, you can always talk to your team on [Discord](https://discord.gg/hmq4y2P).

#### How can I stop being a validator?

You can stop being a validator by issuing a **voluntary exit**, which is a special type of object included in the eth2 beacon chain that signifies your validator is ready to stop validating and securely exit the validator set. Although during phase 0 of eth2, you will **not** be able to withdraw your staking rewards, you can still issue a voluntary exit. This feature is still under development and you can follow our progress [here](https://github.com/prysmaticlabs/prysm/issues/6882).