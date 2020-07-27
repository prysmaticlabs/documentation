---
id: nondeterministic
title: Non-deterministic wallet 
sidebar_label: Non-HD wallet
---

## Background

A Non-HD wallet provides the ability to create simple, encrypted validators accounts stored directly-on disk. Validator private keys are generated non-deterministically, meaning there is **no seed phrase** (mnemonic) which can be used to recover an entire wallet. If you created a deposit using the official [Medalla testnet launchpad](https://medalla.launchpad.ethereum.org/) and want to run Prysm using it, see our dedicated instructions [here](http://docs.prylabs.network/docs/prysm-usage/medalla-testnet).

:::tip Pro-Tip
In general, we recommend using an [HD wallet](http://docs.prylabs.network/docs/wallet/deterministic), as it provides the greatest flexibility, security, and compatibility with blockchain standards. Using an HD wallet allows you to recover your wallet with all your precious accounts easily from a mnemonic phrase you can store offline should anything happen to your computer.
:::

Validator private keys are encrypted with a password using the [EIP-2335](https://eips.ethereum.org/EIPS/eip-2335) keystore.json standard for storing BLS12-381 private keys. This keystore.json file, along with a human-readable name, comprises an **account** in a non-HD wallet.

Accounts are stored in the wallet's directory using human-readable names such as `personally-conscious-echidna`.

```
wallet-dir/
	personally-conscious-echidna/
		keystore.json
 		created_at.txt
	shy-extroverted-robin/
		keystore.json
 		created_at.txt
```

For ease of use, passwords for each account are also stored on disk at a separate, user-selected directory. This makes it easy to run the non-HD wallet without needing to manually unlock every account each time.

```
wallet-passwords/
	personally-conscious-echidna.pass
	shy-extroverted-robin.pass
```

Validator deposit credentials are also stored under the account's path in the wallet directory, containing a `deposit_transaction.rlp` with raw bytes eth1 transaction data ready to be used to submit a 32ETH deposit to the eth2 deposit contract for the corresponding validator account.

## Usage

### Wallet creation

A non-HD wallet is the most basic sort of wallet, storing all information on-disk. This approach makes it trivial to import, export and list all associated accounts within the wallet. To start using the non-HD wallet, you can create a new wallet using

```bash
./prysm.sh validator wallet-v2 create
```

and selecting **non-HD** wallet when prompted during an interactive process. You can also create a wallet **non-interactive** by using the following command line flags, which are also viewable by typing `./prysm.sh validator wallet-v2 create --help.

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")
| `--passwords-dir`     | Path to a directory where account passwords will be stored (default: "$HOME/Eth2Validators/prysm-wallet-passwords")
| `--keymanager-kind`     | Type of wallet to create, either "direct", "derived, or "remote" (default "derived")

Here's a full example on how to create a non-HD wallet at `$HOME/mynonhdwallet` with account passwords stored at `$HOME/myaccountpasswords`.

```bash
./prysm.sh validator wallet-v2 create --wallet-dir=$HOME/nonhdwallet --passwords-dir=$HOME/myaccountpasswords --keymanager-kind=direct
```

### New validator account

You can create a new validator account for your non-HD wallet using the following command

```bash
./prysm.sh validator accounts-v2 create
```

:::info
You'll need to set a **strong** password for your new validator account, containing at least 1 uppercase letter, 1 number, a special character, and be at least 8 characters long. Any unicode characters can be used for your account passwords.
:::

You'll be guided through an interactive process where you'll need to pick a new password for your validator. Soon after, the command will complete and you will see two **important** pieces of information you'll need for your validator.

```go
INFO accounts-v2: (wallet path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-v2
INFO accounts-v2: (account passwords path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-v2-passwords
New account password: *********█
Confirm password: *********█

INFO non-hd-wallet: Write down the private key, as it is your unique withdrawal private key for eth2

==========================Withdrawal Key===========================

0x14d0acc3eb479b5a7da91a5cb8c6a7454bed05322e189abea...

===================================================================

Copy + paste the deposit data below when using the eth1 deposit contract

========================Deposit Data===============================

0x2289511800000000000000000000000000000000000000000...

===================================================================

INFO non-hd-wallet: Successfully created new validator account
account_name=personally-conscious-echidna
```

Copy your **withdrawal key** somewhere safe and offline, as it is your only means of withdrawing your validator rewards from participating in eth2. You can then copy the deposit data text and use it when sending 32ETH to the Validator Deposit Contract for eth2.

You can also create a new validator account **non-interactively** by using the following command line flags, which are also viewable by typing `./prysm.sh validator accounts-v2 create --help.

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")
| `--passwords-dir`     | Path to a directory where account passwords will be stored (default: "$HOME/Eth2Validators/prysm-wallet-passwords")
| `--password-file`     | Path to a plain-text, password.txt file containing your desired new account password


Here's a full example on how to create a new validator account for your non-HD wallet stored at `$HOME/mynonhdwallet` with account passwords stored at `$HOME/myaccountpasswords`.

```bash
./prysm.sh validator accounts-v2 create --wallet-dir=$HOME/nonhdwallet --passwords-dir=$HOME/myaccountpasswords --password-file=password.txt
```

Where you provide a plain-text `password.txt` containing your account password.

### List validator accounts

You can list all validator accounts in your non-HD wallet using the following command

```bash
./prysm.sh validator accounts-v2 list
```

Where you'll see the following output

```bash
INFO accounts-v2: (wallet path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-v2
INFO accounts-v2: (account passwords path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-passwords

Showing **1** validator account
View the eth1 deposit transaction data for your accounts by running `validator accounts-v2 list --show-deposit-data

personally-conscious-echidna
[public key] 0x971d780edfe98743f41cdcdba8521548fc343ffcd958e90968c4f1cc5a2e9b6ea11a984397c34c6cc13e9d4e8d14ce1e
[created at] 16 minutes ago
```

You can view the `deposit_data` needed to send 32ETH to the eth2 deposit contract for your validator accounts by optionally passing in a `--show-deposit-data` flag as follows.

```bash
./prysm.sh validator accounts-v2 list --show-deposit-data
```

Where you'll see the following output

```bash
INFO accounts-v2: (wallet path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-v2
INFO accounts-v2: (account passwords path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-passwords

Showing **1** validator account

personally-conscious-echidna
[validating public key] 0x971d780edfe98743f41cdcdba8521548fc343ffcd958e90968c4f1cc5a2e9b6ea11a984397c34c6cc13e9d4e8d14ce1e
[created at] 16 minutes ago

========================Deposit Data===============================

0x2289511800000000000000000000000000000000000000000...

===================================================================
```

You can also run the `accounts-v2 list` command **non-interactively** by using the following command line flags, which are also viewable by typing `./prysm.sh validator accounts-v2 list --help.

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")
| `--passwords-dir`     | Path to a directory where account passwords will be stored (default: "$HOME/Eth2Validators/prysm-wallet-passwords")
| `--show-deposit-data`     |  Display raw eth1 tx deposit data for validator accounts-v2 (default: false

### Import validator accounts

You can import a validator account from a zip file into your non-HD wallet using the following command

```bash
./prysm.sh validator accounts-v2 import
```

TODO: Work-in-progress

### Export validator accounts

You can export validator accounts from your non-HD wallet into their own zip file using the following command

```bash
./prysm.sh validator accounts-v2 export
```

TODO: Work-in-progress