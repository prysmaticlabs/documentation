---
id: withdraw-validator
title: Withdraw your validator
sidebar_label: Withdraw your validator
style_notes: Consistently address reader as "you", use contractions to keep the tone conversational, iterate on succinct articulation, minimize duplication
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="Raul,James,Radek,Sammy" lastVerifiedDateString="March 20th, 2023" lastVerifiedVersionString="v4.0.0" />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution Public Preview
**This feature is currently in public preview** and may change significantly as we receive feedback from users like you. Join our [Discord server](https://discord.gg/prysmaticlabs) to share your feedback.

Note that withdrawals **aren't yet available on Ethereum mainnet**; this functionality is currently being validated on test networks. The instructions in this document won't work on Ethereum mainnet and may change significantly as the feature is stabilized on test networks.
:::

The **Capella/Shanghai Ethereum** upgrade lets you withdraw your validator nodes' staked Ethereum in one of two ways: 

 1. **Partial (earnings) withdrawal**: This option lets you withdaw your earnings (that is, all value staked above 32 ETH) and continue validating.
 2. **Full withdrawal**: This option lets you liquidate your entire stake and earnings, effectively liquidating your validator node(s) and exiting the network.

In this how-to, you'll learn how to perform both types of withdrawals.




## Before you begin

Familiarity with the following resources and terms will help you confidently complete this guide:

<!-- TODO: These terms can now be moved into Glossary CMS and embedded via quicklooks to further streamline the content experience - ping Mick if you'd like to help with this. -->

- [The Ethereum Foundation Withdrawals FAQ](https://notes.ethereum.org/@launchpad/withdrawals-faq): A client-agnostic overview of important information regarding Ethereum validator withdrawals.
- **Validator Life Cycle**: guide to [validator life cycles](../how-prysm-works/validator-lifecycle.md).
- **Validator**: The on-chain representation of a validator node and its staked Ethereum.
- **Validator index:** A unique numeric ID assigned to a validator when activated. You can see this validator index in your Prysm validator client logs, or in block explorers such as [https://beaconcha.in](https://beaconcha.in) and [https://beaconscan.com](https://beaconscan.com) by looking it up using your public key. You will need to know the validator indices of the validators you wish to withdraw through this guide. Only activated validators can begin the exit and withdrawal processes.
- **Staker:** The person or entity managing Ethereum validators.
- **Voluntary exit:** Validators that are currently active on Ethereum can choose to **exit** the network, marking them as exited and exempting them from any staking responsibilities. In order to **withdraw** a validator’s balance completely, a voluntary exit must be submitted to Ethereum and must complete first.
- **Full validator withdrawal:** The process of withdrawing your entire stake on Ethereum, exiting your validator, and withdrawing your entire balance to an Ethereum address of your choosing. Full validator withdrawals need a validator to exit first, which can take time depending on how large the exit queue is. Performing a full withdrawal requires submitting a voluntary exit first.
- **Partial validator withdrawal:** The process of withdrawing your validator’s **earnings** only. That is, if you're staking 33.3 ETH, you can withdraw 1.3 ETH using a partial withdrawal. Your validator does **not** need to exit, and you will continue to validate normally. Partial withdrawals do not go through an exit queue, but will only be processed at a maximum of 16 validators at a time per block.
- **Capella/Shanghai Ethereum Upgrade:** Ethereum network upgrades bring major feature additions to the network as a result of significant work from Ethereum client teams. This spring, an upgrade known as Capella/Shanghai will make validator withdrawals on mainnet. The upgrade has two names because there are two pieces of software being upgraded: consensus clients such as Prysm, and execution clients such as go-ethereum.
- **Validator mnemonic, HD wallet mnemonic, or validator seed phrase:** A mnemonic in this context is the 24 word secret that you received upon creating your validator(s), which is the ultimate credential that gives you access to withdrawing your validator(s). For many, this was generated when they first interacted with the ethereum staking CLI to prepare their validator deposits. We will refer to this as your validator mnemonic throughout this document
- **Validator withdrawal credentials:** Each validator has data known as “withdrawal credentials” which can be fetched from your beacon node or from a block explorer such as [https://beaconcha.in](https://beaconcha.in) or [https://beaconscan.com](https://beaconscan.com) by looking at the “deposits” tab and seeing your credentials there. You will need these for this guide.
- **Ethereum execution address:** Referred to also as an Ethereum address, this is a standard address to an Ethereum account which you can view in block explorers such as Etherscan. Your validator’s balance, upon a full withdrawal, will be available at an Ethereum address of your choosing.
- **BLS key:** Your validators use a key format known as [BLS](../how-prysm-works/bls-signature-aggregation-and-cryptography.md), which is used exclusively for staking. Validators have 4 kinds of BLS keys: validator public key, validator private key, withdrawal public key, and withdrawal private key. only the validator public key can be viewed on staking explorers such as [https://beaconcha.in](https://beaconcha.in), and private keys, which are secret, are used for signing. Not to be confused with an Ethereum address. The validator mnemonic can be used to access all 4 keys which are important for setting the Ethereum address for withdrawing.
- **BLS to Execution Change:** In order to withdraw your validator, Ethereum needs to associate an **Ethereum execution address** with your validator’s **keys**. Underneath the hood, submitting a bls-to-execution-change (withdrawal) request updates the [withdrawal credentials](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/validator.md#withdrawal-credentials) which tells Ethereum “I want to withdraw my validator balance to this specific Ethereum address”. When you see the terms BLS to Execution or bls_to_exec used, it refers to this action. **note:** withdrawal request and bls-to-execution-change are used interchangeably.
- **Pool:** Upon submission of a validator exit request or bls-to-execution-change request, the message will sit in a special place in memory ( the pool ) to be broadcasted across your peers. Since only the block proposers can include these requests and there is a limit to the number of requests included per block, sometimes if the pool becomes too full your message may be dropped and not included. If this happens, a re-submission of the request may be required.

## Important guidelines

When withdrawing your validator, keep the following guidelines in mind:

 1. **Validators must be fully exited to trigger a full withdrawal:** Full validator withdrawals require your validator to exit first, as exits do not happen automatically. You will need to submit a voluntary exit by following our documentation [here](exiting-a-validator.md). Once your validator exits, it will no longer need to perform its responsibilities after some time (there can be a delay if the validator is part of a sync committee or recently slashed) . The ordering of requests for setting withdrawal credentials or exiting does not matter, once a validator has both its withdrawal credentials updated as well as in an exited state funds will automatically be added to the chosen execution address when processed.
 2. **Full withdrawals are not immediate:** Making a **full-validator withdrawal** means that you must exit your validator first. Validator exits have a queue that can only process a few items every few minutes, so your exit can take days or weeks depending on how big this queue grows. The reason there is an exit queue is for the security of the network. Having bounds on validator churn is important towards guaranteeing safety properties of the chain and keeping consensus stable. There is also a queue for activating validators in addition to exiting them. Withdrawals, full or partial, are processed at a rate of at most 16 validators per block.
 3. **Full withdrawals are irreversible:** Validator exits are irreversible, and so are full validator withdrawals. Once you exit, you cannot do anything with your validator except for withdraw it. Once you perform a full withdrawal, you will receive your validator balance at the Ethereum address of your choosing, and you cannot revert this action. You could use your withdrawn funds to spin up another separate validator if you wish, however.
 4. **Partial withdrawals do not exit your validator:** Partial withdrawals only withdraw your validator earnings to an Ethereum address of your choosing, but do not exit nor require an exit from your validator. That is, if you are running a validator that has a balance of 33.3 ETH, you can perform a bls-to-execution-change request to initiate the partial withdrawal of 1.3 ETH and automatic withdrawals of earnings over 32ETH in the future. Your validator will continue to operate normally
 5. **Partial withdrawals of your earnings will continue indefinitely to your Ethereum address of your choice:** Once a partial withdrawal is included on-chain, earnings will continue to accrue in the Ethereum address you initially specified. This address **cannot be changed** once set, so you must ensure it is protected and one you have custody over. **note: there is only one withdrawal address and this is the same address that will be used for full withdrawals
 6. **Smart contract addresses can be used as the withdrawal address but can not trigger functions:** Smart contract addresses set as the withdrawal credential will only update balances and not trigger any logic. Read [https://eips.ethereum.org/EIPS/eip-4895](https://eips.ethereum.org/EIPS/eip-4895) for more reasoning.
 7. **Once you tell Ethereum the address you want to withdraw your validator to, you cannot change it back**: In order to withdraw, you must tell Ethereum the address you wish to use to receive the withdrawn funds for that particular validator. Once you submit this signed message, **you cannot change it**, so make sure you pick an Ethereum address you intend to withdraw to indefinitely and that the address is intended for the corresponding validator key. The withdrawal address will be the same whether partial or full withdrawal so this is the most important step to watch out for when triggering a withdrawal.
 8. **It can take a while for your BLS to Execution request to be completed, so do not panic if this is the case:** Once you submit a BLS to Exec request to tell Ethereum the address you want to use in order to receive your withdrawn funds, it goes through several processing pipelines that might take a bit longer than expected. If your beacon node has also received many other requests for BLS to exec changes, your initial request could be dropped and you may need to try again, so do not panic if you have submitted a request and nothing has happened yet. Prysm will include last-seen messages first when proposing blocks, so to avoid messages being dropped and timely includes it is better to wait a few hours or days after the fork.
 9. **Slashed or previously exited validators are still able to withdraw:** If any of your validators have been slashed since launch and exited from the chain forcefully, or if you exited a long time ago, you can still withdraw your remaining balance normally. To do so, you will just need to submit a BLS to execution change request by following the step-by-step guide to performing a full withdrawal in this document.


## Prepare to withdraw

In order to withdraw, you should have the following items ready:

1. **Your validator mnemonic**: you will need it in order to sign your validator withdrawal request(s).
2. **Access to a beacon node:** you will need to connect to an Ethereum beacon node, such as Prysm’s, in order to submit your withdrawal request. For instructions on running a beacon node, see our quickstart guide on running a node [here](../install/install-with-script.md).
3. **Stable version of the staking-deposit-cli installed**: the [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) is a command-line tool provided by the Ethereum research team which allows stakers to sign a BLS to execution message. This is the message that signals Ethereum the address you want to use for withdrawing your validator(s). In our step-by-step guide, we recommend building this from source or verifying the binaries provided as a security best practice.
4. **Stable version of prysmctl installed:** Prysm provides a tool called `prysmctl` which makes it easy to submit your signed BLS to execution requests to a beacon node. We’ll be referring to it throughout this guide.
5. **Remain calm and collected:** Performing a withdrawal can be stressful. However, by explaining the concepts and security practices outlined in this guide, we hope to make this process easier for all stakers running Prysm. Be mindful of the tools you install, and be mindful of any scams around the time of withdrawals being enabled. No website nor individual should ask you to share your mnemonic, and therefore you should keep it as protected as possible throughout the process.


<Tabs
  groupId="withdrawals"
  defaultValue="partial"
  values={[
    {label: 'partial withdrawal', value: 'partial'},
    {label: 'full withdrawal', value: 'full'},
  ]
}>
<TabItem value="partial">

## Option 1: Partial (earnings) withdrawals

This section walks you through the process of performing a **partial validator withdrawal**, allowing you to withdraw staked balances above 32 ETH for each of your active Ethereum validators.

### Step 1: Sign a request to set your Ethereum withdrawal address

The first step for submitting partial withdrawals for your validator is to sign a message setting the Ethereum address you wish to receive your funds at. This request is known as a **BLS to Execution Change**.

First, install the Ethereum [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) locally by building it from source, which is our recommendation.  Building the code yourself is the most secure way of using it, and for something as crucial as a tool that deals with your mnemonic, we recommend following this path. Alternatively, the project provides [binaries](https://github.com/ethereum/staking-deposit-cli/releases) that are available to use at your own risk.
<Tabs
  groupId="staking-deposit-cli-install"
  defaultValue="release"
  values={[
    {label: 'download latest release', value: 'release'},
    {label: 'install from source', value: 'source'},
  ]
}>
<TabItem value="release">

download the latest release from https://github.com/ethereum/staking-deposit-cli/releases according to your operating system. This feature is supported starting from release `v2.5.0`.
</TabItem>
<TabItem value="source">

For advanced users you can look to install from source using the following steps

As a prerequisite, you will need to install [Python3](https://www.python.org/downloads/) and pip3 on your system as well as [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), which can be installed through different means for various operating systems. Next, clone the project’s codebase locally in a terminal window:

```go
git clone https://github.com/ethereum/staking-deposit-cli.git
```

Next, run the following commands to setup an environment for its dependencies:

```
pip3 install virtualenv
virtualenv venv
source venv/bin/activate
```

Install dependencies:

```
python3 setup.py install
pip3 install -r requirements.txt
```
</TabItem>
</Tabs>

### Step 2: Get your validator withdrawal credentials ready

For this step, you will also need to retrieve your validator’s **withdrawal_credentials** from Ethereum. 
you can find the `withdrawal_credentials` for each associated validator in your original deposit_data-XXX.json file when you first used the launchpad.

This is an example of what the `withdrawal_credentials` field value would look like.

```rust
0x00500b3bf612bed69e888edeb045f590c3f37251e3e049c0732f3adaa57ea3f6
```

You can also find this value by sending a request to your synced beacon node via this [Beacon API endpoint](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Beacon/getStateValidator) and providing your validator index or public key:

```rust
curl -X 'GET' \
  'http://YOUR_PRYSM_NODE_HOST:3500/eth/v1/beacon/states/head/validators/YOUR_VALIDATOR_INDEX_OR_PUBLIC_KEY' \
  -H 'accept: application/json'
```

Your withdrawal credentials will be visible in the response to this request - keep your eyes open for `withdrawal_credentials`. Example output with placeholder values:


```rust
{
  "execution_optimistic": false,
  "data": {
    "index": "1",
    "balance": "1",
    "status": "active_ongoing",
    "validator": {
      "pubkey": "0x93247f2209abcacf57b75a51dafae777f9dd38bc7053d1af526f220a7489a6d3a2753e5f3e8b1cfe39b56f43611df74a",
      "withdrawal_credentials": "0x008e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
      "effective_balance": "1",
      "slashed": false,
      "activation_eligibility_epoch": "1",
      "activation_epoch": "1",
      "exit_epoch": "1",
      "withdrawable_epoch": "1"
    }
  }
}
```

### Step 3: Sign your BLS to Execution change

Now that the staking deposit tool is executable, you can then use it to generate your signed **[BLS to Execution](https://github.com/ethereum/staking-deposit-cli/blob/bls-to-execution-change/README.md#generate-bls-to-execution-change-arguments)** request. You need to use your mnemonic for this step, so doing it offline is key and ensuring you do not paste your mnemonic anywhere else than necessary.

:::caution
We recommend doing this next step *without* an Internet connection to be maximally secure. Either turn off the internet before introducing your mnemonic for signing or migrate to an air-gapped environment to continue the following steps.
:::

Here’s the command to get started with the process. This command will **not** submit your signed message to the network yet, and will only generate the data needed for the next steps.

<Tabs
  groupId="staking-deposit-cli-run"
  defaultValue="release"
  values={[
    {label: 'downloaded from release', value: 'release'},
    {label: 'installed from source', value: 'source'},
  ]
}>
<TabItem value="release">
navigate to the downloaded release, extract it, and open a terminal in the extracted folder.

```jsx
./deposit generate-bls-to-execution-change
```
</TabItem>

<TabItem value="source">

```jsx
python ./staking_deposit/deposit.py generate-bls-to-execution-change
```
</TabItem>
</Tabs>

By calling the command above, you should go through an interactive process that will ask you for the following information:

1. **Your mnemonic language**. You can see the different options available, where English is one of the options, among others
2. **The network** you wish to perform this operation for. example: `mainnet`,`goerli`,`sepolia` or `zhejiang`. This tutorial uses the `zhejiang` testnet as an **example**.
3. Enter your **mnemonic** next
4. Next, you will be asked for the starting index you used to create your validators (read more about hd wallets [here](https://eips.ethereum.org/EIPS/eip-2334#path)). For **most users**, this will be 0 unless you created validators from a non default index.


:::info
Inside the original `deposit.json` file used for staking you can count each validator's public key in sequential order starting from 0.
The validator starting index is the index of the first validator key you would like to withdraw (i.e. validator key 1 has an index of 0, validator key 2 has an index of 1 etc.).
For most stakers, the validator starting index should be set to 0 for withdrawing all their validator keys, however the validator starting index will be different if you choose to skip withdrawing some validators. 
There are other niche cases where the mnemonic is used for deposit generation multiple times, resulting in a different validator starting index.
:::

5. You will then be asked the **validator indices** for the validators you wish to generate the message for. You can find your validator indices on block explorers such as [https://beaconcha.in](https://beaconcha.in) or in your Prysm validator client logs. For example, the validator with public key `0x8078c7f4ab6f9eaaf59332b745be8834434af4ab3c741899abcff93563544d2e5a89acf2bec1eda2535610f253f73ee6` on [https://beacocha.in](https://beacocha.in) has validator index 8, which you can verify by navigating to its [page](https://beaconcha.in/validator/8). 

:::info
  Validator indices need to be provided sequentially without skipped indices in the order of original creation. You can find the order in your original `deposit.json` file. 
  The `generate-bls-to-execution-change` command needs to be repeated in cases where multiple validator keys that are not in sequential order need to be withdrawn, and will require either merging of the output files or multiple `blstoexecutionchange` submissions.
:::

6. Next you will be asked for your **withdrawal credentials,** which you should now have if you followed this guide
7. Next you will be asked for the Ethereum address you wish to use to receive your withdrawn funds. This needs to be checksummed, and you can get it from your wallet or a block explorer. **You cannot change this once it is set on-chain**, so triple check it before proceeding.

Below is an example of running through the interactive process explained above:

```
python ./staking_deposit/deposit.py generate-bls-to-execution-change
Please choose your language ['1. العربية', '2. ελληνικά', '3. English', '4. Français', '5. Bahasa melayu', '6. Italiano', '7. 日本語', '8. 한국어', '9. Português do Brasil', '10. român', '11. Türkçe', '12. 简体中文']:  [English]: english

Please choose the (mainnet or testnet) network/chain name ['mainnet', 'goerli', 'sepolia', 'zhejiang']:  [mainnet]: zhejiang

Please enter your mnemonic separated by spaces (" "). Note: you only need to enter the first 4 letters of each word if you'd prefer.: 
bike shoe attitude violin fun life punch enhance attend bright voyage wheel clutch taxi high health siren jealous tell female upon firm manual wage

Please enter the index (key number) of the signing key you want to use with this mnemonic. [0]: 0

Please enter a list of the validator indices of your validator(s). Split multiple items with whitespaces or commas.: 8

Please enter a list of the old BLS withdrawal credentials of your validator(s). Split multiple items with whitespaces or commas.: 00a6bd30000296e9c9f5823b09e689ff0bc0b1bea1d256caab9a5f213a226b33

Please enter the 20-byte execution address for the new withdrawal credentials. Note that you CANNOT change it once you have set it on chain.: 0x9B984D5a03980D8dc0a24506c968465424c81DbE

**[Warning] you are setting an Eth1 address as your withdrawal address. Please ensure that you have control over this address.**

Repeat your execution address for confirmation.: 0x9B984D5a03980D8dc0a24506c968465424c81DbE

**[Warning] you are setting an Eth1 address as your withdrawal address. Please ensure that you have control over this address.**

Success!
Your SignedBLSToExecutionChange JSON file can be found at: /home/me/Desktop/code/python/staking-deposit-cli/bls_to_execution_changes
```

### Step 4: Verify your output

Once you complete the above, you’ll have a file contained in the `bls_to_execution_changes/` folder of your [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli). It will represent a list of BLS to execution messages that have been signed with your private keys and are ready to submit to Ethereum. Here’s what a sample file of these looks like. Example output with placeholder values:

```
[
	{
    "message": {
      "validator_index": "838",
      "from_bls_pubkey": "0xb89bebc655569726a318c8e9971bd3144497c61aea4a6578a7a4f94b547dcba5bac16a89108b6b6a1fe3695d1a874a0b",
      "to_execution_address": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0a"
    },
    "signature": "0xa42103e15d3dbdaa75fb15cea782e4a11329eea77d155864ec682d7907b3b70c7771960bef7be1b1c4e08fe735888b950c1a22053f6049b35736f48e6dd018392efa3896c9e427ea4e100e86e9131b5ea2673388a4bf188407a630ba405b7dc5"
  },
	{
    "message": {
      "validator_index": "20303",
      "from_bls_pubkey": "0xb89bebc699769726a502c8e9971bd3172227c61aea4a6578a7a4f94b547dcba5bac16a89108b6b6a1fe3695d1a874a0b",
      "to_execution_address": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b"
    },
    "signature": "0xa86103e15d3dbdaa75fb15cea782e4a11329eea77d155864ec682d7907b3b70c7771960bef7be1b1c4e08fe735888b950c1a22053f6049b35736f48e6dd018392efa3896c9e427ea4e100e86e9131b5ea2673388a4bf188407a630ba405b7dc5"
  }
]
```

The above demonstrates two different validators withdrawing - one with validator index `838`, the other with validator index `20303`. 

:::caution
Make sure the `validator_index` corresponds to the correct chosen `to_execution_address`. Once this message is accepted on submission you will not be able to change it again!
:::

Move the generated `bls_to_execution_changes-*.json` file to an online environment that has access to a synced beacon node for the next step.

### Step 5: Submit your signed request to the Ethereum network

In this step, you will submit your signed requests to the Ethereum network using a tool provided by the Prysm project called `prysmctl`. Learn how to download and install the prysmctl tool from our [guide](../prysm-usage/prysmctl.md) or check commands on [Command-line options](../prysm-usage/parameters.md). You’ll need access to a synced beacon node to proceed with this step (it does not need to be a Prysm beacon node)

Once Prysmctl is installed, you can use the `prysmctl validator withdraw` command, which will ask for terms of service acceptance and confirmation of command by providing additional flags, and also a path to the bls_to_execution_changes file from the previous step.

```jsx
bazel run //prysmctl -- validator withdraw --beacon-node-host=<node-url> --path=<bls_to_execution_changes-*.json>
```

This command will extract data from the `bls_to_execution_changes-*.json` call the Beacon API endpoint on the synced Beacon Node and validate if it’s in the pool:


```jsx
prysmctl validator withdraw --beacon-node-host=<node-url> --path=<bls_to_execution_changes-*.json>
```

**Using docker:**

```jsx
docker run -it -v $HOME/path/to/bls_to_execution:/bls_dir \
  gcr.io/prysmaticlabs/prysm/prysmctl:latest \
  validator withdraw -beacon-node-host=<node-url> --path=/bls_dir
```

Note that this approach requires mounting of the bls_to_execution_changes-*.json file

### Step 6: Confirm submission

On successful submission, the `SignedBLStoExecutionChange` messages are included in the pool waiting to be included in a block.

```
Verifying requested withdrawal messages known to node...
All (total:#) signed withdrawal messages were found in the pool.
```

The withdrawal will be initiated by using the execution address you provided, and your validators’ withdrawal credentials will change to look something like this:

```rust
*0x010000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b* 
```

where the Ethereum address of your choosing will be found within.

### Step 7: Monitor your submission

Apply the `--verify-only` flag to the prysmctl validator withdrawal command to verify if the provided messages can be found in the pool. If the message is not found in the pool it may have already been included by a block proposer.

### Step 8: Confirm your withdrawal

Ethereum Proof of Stake Block Scanners like [Beaconcha.in](http://Beaconcha.in) do plan to include features to track withdrawals, but there are a few ways to confirm in your local beacon node. 

```rust
curl -X 'GET' \
  'http://YOUR_PRYSM_NODE_HOST:3500/eth/v1/beacon/states/head/validators/YOUR_VALIDATOR_INDEX' \
  -H 'accept: application/json'
```

and you should see a response that contains withdrawal credentials that should have changed to the `0x01` format which includes your Ethereum execution address.

</TabItem>
<TabItem value="full">

## Option 2: Full withdrawals


To fully withdraw a validator and its earnings, your validator needs to also be exited in addition to having its [withdrawal credentials](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/validator.md#withdrawal-credentials) changed.

Please follow our [exiting-a-validator how-to](exiting-a-validator.md).

Refer to the above partial withdrawal guidance to change your validator's withdrawal credentials.

:::caution
Instructions for setting your withdrawal address do not need to be repeated if withdrawal_credentials are updated to the `0x01` prefix.
:::

Once the validator is both exited as well as having its withdrawal credentials changed, the validator will automatically be withdrawn when a block proposer processes the withdrawal. **Note that a maximum of 16 withdrawals can be processed per block.**

</TabItem>
</Tabs>


## Frequently asked questions

<!-- TODO: These questions can now be moved into FAQ CMS and embedded both here and within our root-level FAQ - ping Mick if you'd like to help with this. -->

**Q: When can I withdraw?**

A: After the Capella/Shanghai hardfork withdrawals will be enabled. This is expected to go live this spring, 2023.

**Q: My keys were compromised, can I still withdraw?**

A: You are still able to send the message as long as you have access to the mnemonic and can produce the signed `blstoexecutionchange` message to submit. Depending on where the keys were compromised there may be different protection programs to apply for to "frontrun" the compromiser. Please seek out the ethstaker community on [reddit](https://www.reddit.com/r/ethstaker/) or [discord](https://discord.gg/urhv3xby) for more details if this applies to you.

**Q: I forgot my mnemonic, what can I do?**

A: In most cases the mnemonic is a requirement to enabling withdraws; there are some niche cases where users have both their validator keystore and withdrawal private keys they can still fully withdraw safely without the mnemonic, but unless both are in possession one would not be able to produce the signed `blstoexecutionchange` message. It's important to stay calm and collected and continue searching or see help as needed. The ethstaker community provides an active support network on [reddit](https://www.reddit.com/r/ethstaker/) and [discord](https://discord.gg/urhv3xby)

**Q: I accidentally used my mnemonic on an open internet setting to generate the .json file, what happens?**

A: Using and storing the mnemonic on an open internet puts private keys used for withdrawals at increased risk. Unless the machine was compromised there should not be any immediate consequences, however, the longer the mnemonic stays on an open network the more it will be exposed to future risk. 

**Q: How can I check if my withdrawal address is set?**

A: Withdrawal public keys that begin with `0x01` are set to begin withdrawing either partially as in withdrawing earnings or fully if the associated validator has exited. The associated execution address can be found at the end of the withdrawal credentials i.e. `0x010000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b` There are several ways to check this:

1. [`/eth/v1/beacon/states/{state_id}/validators/{validator_id}`](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Beacon/getStateValidator) Beacon API endpoint will return the `withdrawal_credential` information
2. `ethdo validator info --validator=<yourvalidatorIndex> --verbose` command with [EthDo](https://github.com/wealdtech/ethdo)

**Q: Can I reset my withdrawal address after setting it up once before?**

A: If the withdrawal credentials already begin with `0x01` it will not be able to change to a different execution address. 

**Q: How long do I have to wait for withdrawals?**

A: Each block can add 16 `blstoexecutionchange`messages as well as process 16 withdrawals, time may vary based on the specific validator index, network leakage, and message inclusion time. Validator exits will require additional time to fully withdraw.

**Q: Does using custom builders with Prysm support withdrawals?**

A: Builder support is coming, but is in early preliminary testing! It is not recommended send withdrawals while connected to a custom builder at this time.

**Q: In what order does Prysm process the bls-to-execution-change message pool?**

A: Prysm processes messages last-in-first-out(LIFO) by design which means the latest message that was received is the first message to appear in a block.

**Q: Can withdrawal addresses be set to smart contracts?**

A: Yes, however only account balances will change and there will be no associated triggering of smart contract logic. Read [https://eips.ethereum.org/EIPS/eip-4895](https://eips.ethereum.org/EIPS/eip-4895) for more reasoning.

**Q: I am a non technical user, how can I set my withdrawals in a safe way?**

A: The guide will still provide a safe way to generate the signed `blstoexecutionchange` messages in an offline environment. From there, if you're willing to take a small risk on inclusion guarantees, some block scanners like beaconcha.in will provide front ends to drag and drop the messages for inclusion to set the withdrawal address. 


import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />
