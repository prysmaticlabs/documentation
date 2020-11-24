---
id: deterministic
title: Deterministic, HD wallet 
sidebar_label: HD wallet
---

:::danger Our Code Is Not Yet Updated to Mainnet!
Our latest release of Prysm, beta.1, is not mainnet compatible. Please do not run Prysm yet until we announce it in our Discord channel, our [releases page](https://github.com/prysmaticlabs/prysm/releases), our [official mailing list](https://groups.google.com/g/prysm-dev) or in this documentation portal.
:::

## Background

An HD wallet provides the ability to create new validator private keys deterministically from a seed phrase, shown as an english mnemonic following the [BIP-39 standard](https://en.bitcoin.it/wiki/Seed_phrase) upon wallet creation. If you created a deposit using the official [eth2 launchpad](https://launchpad.ethereum.org/) and want to run Prysm using it, see our dedicated instructions [here](/docs/mainnet/joining-eth2).

Validator private keys are encrypted with the wallet's password using the [EIP-2335](https://eips.ethereum.org/EIPS/eip-2335) keystore.json standard for storing BLS12-381 private keys. This keystore.json file, along with its derivation path, comprises an **account** in an HD wallet.

## Usage

### Wallet creation

To start using the HD wallet, you can create a new wallet using:

```bash
./prysm.sh validator wallet create
```

:::info
You'll need to set a **strong** password for your new HD wallet, containing at least 1 uppercase letter, 1 number, a special character, and be at least 8 characters long. Any unicode characters can be used for your wallet password.
:::

Then select **HD** wallet when prompted. You can also create a wallet **non-interactively** by using the following command line flags, which are also viewable by typing `./prysm.sh validator wallet create --help`.

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")
| `--keymanager-kind`     | Type of wallet to create, either "direct", "derived, or "remote" (default "derived")
| `--wallet-password-file`     | Path to a plain-text, password.txt file to lock your wallet

Here's a full example on how to create an HD wallet at `$HOME/myhdwallet`

```bash
./prysm.sh validator wallet create --wallet-dir=$HOME/myhdwallet --keymanager-kind=derived --wallet-password-file=password.txt
```

### Wallet recovery

You can fully recover an HD wallet along with all its accounts from a 24-word english mnemonic phrase generated during the wallet's creation process (which you should have stored offline). To recover your HD wallet in Prysm, you can run

```bash
./prysm.sh validator wallet recover
```

Output

```text
✔ Enter the wallet recovery phrase: layer write film stuff camp album strong ...
Enter a wallet directory: /Users/johndoe/Library/Eth2Validators/.prysm-wallet-v2
New wallet password: *********
Confirm password: *********
Enter how many accounts you would like to recover: 2
[2020-07-27 11:54:16]  INFO accounts: Successfully recovered HD wallet with 2 accounts. Please use accounts list to view details for your accounts. wallet-path=/Users/johndoe/Library/Eth2Validators/prysm-wallet-v2
```

:::info Recovering many accounts
Your accounts are generated deterministically from your recovery phrase, so you had 100 validator accounts on the wallet you want to recover, you can easily do so in Prysm.
:::

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")
| `--num-accounts` | Total number of accounts to recover from the wallet (default 1)

### New validator account

You can create a new validator account for your HD wallet using the following command

```bash
./prysm.sh validator accounts create
```

This command will generate both a withdrawal key and a validating key for eth2. Soon after, the command will complete and you will see an **important** piece of information you'll need to activate your eth2 validator.

```go
INFO accounts: (wallet path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-v2

Copy + paste the deposit data below when using the eth1 deposit contract

========================Deposit Data===============================

0x2289511800000000000000000000000000000000000000000...

===================================================================

INFO hd-wallet: Successfully created new validator 
account_name=personally-conscious-echidna
```

You can then copy the deposit data text and use it when sending 32ETH to the Validator Deposit Contract for eth2.

You can also create a new validator account **non-interactively** by using the following command line flags, which are also viewable by typing `./prysm.sh validator accounts create --help`.

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")
| `--wallet-password-file` | Path to a plain-text, password.txt file to unlock your wallet
| `--num-accounts` | Total number of accounts to generate (default: 1)

Here's a full example on how to create a new validator account for your HD wallet stored at `$HOME/myhdwallet`.

```bash
./prysm.sh validator accounts create --wallet-dir=$HOME/myhdwallet --wallet-password-file=password.txt
```

### List validator accounts

You can list all validator accounts in your HD wallet using the following command

```bash
./prysm.sh validator accounts list
```

Where you'll see the following output

```bash
INFO accounts: (wallet path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-v2

Showing **1** validator account
View the eth1 deposit transaction data for your accounts by running `validator accounts list --show-deposit-data

personally-conscious-echidna
[withdrawal public key] 0xa9c19b160cdc5c6dd74bf5a528d53b9a196ab8dda550e7e5858d84bf356952a310b826e269b9b462293f1c2812263161
[validating public key] 0x971d780edfe98743f41cdcdba8521548fc343ffcd958e90968c4f1cc5a2e9b6ea11a984397c34c6cc13e9d4e8d14ce1e
[created at] 16 minutes ago
```

You can view the `deposit_data` needed to send 32ETH to the eth2 deposit contract for your validator accounts by optionally passing in a `--show-deposit-data` flag as follows.

```bash
./prysm.sh validator accounts list --show-deposit-data
```

Where you'll see the following output

```bash
INFO accounts: (wallet path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-v2

Showing **1** validator account

personally-conscious-echidna
[withdrawal public key] 0xa9c19b160cdc5c6dd74bf5a528d53b9a196ab8dda550e7e5858d84bf356952a310b826e269b9b462293f1c2812263161
[validating public key] 0x971d780edfe98743f41cdcdba8521548fc343ffcd958e90968c4f1cc5a2e9b6ea11a984397c34c6cc13e9d4e8d14ce1e
[created at] 16 minutes ago

========================Deposit Data===============================

0x2289511800000000000000000000000000000000000000000...

===================================================================
```

You can also run the `accounts list` command **non-interactively** by using the following command line flags, which are also viewable by typing `./prysm.sh validator accounts list --help`.

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")
| `--wallet-password-file` | Path to plain-text file containing your wallet's password
| `--show-deposit-data`     |  Display raw eth1 tx deposit data for validator accounts (default: false

