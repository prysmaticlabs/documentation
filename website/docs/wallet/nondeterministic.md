---
id: nondeterministic
title: Non-deterministic wallet 
sidebar_label: Non-HD wallet
---

## Background

A Non-HD wallet provides the ability to create simple, encrypted validators accounts stored directly-on disk. Validator private keys are generated non-deterministically, meaning there is **no seed phrase** (mnemonic) which can be used to recover an entire wallet. If you created a deposit using the official [Medalla testnet launchpad](https://medalla.launchpad.ethereum.org/) and want to run Prysm using it, see our dedicated instructions [here](/docs/testnet/medalla).

:::tip Pro-Tip
This is one of the safest ways of running Prysm, because you can generate your wallet using any other software you prefer such as the official [eth2.0-deposit-cli](https://github.com/ethereum/eth2.0-deposit-cli) and simply import the validating keys you need. You can then keep your mnemonic and all other sensitive information secure and away from your validator.
:::

Validator private keys are encrypted with a password using the [EIP-2335](https://eips.ethereum.org/EIPS/eip-2335) keystore.json standard for storing BLS12-381 private keys.

Validating keys are stored in the wallet's directory under a single `all-accounts.keystore.json` file which is encrypted with a strong wallet password.

```
wallet-dir/
	accounts/
		all-accounts.keystore.json
```

Your password to unlock this file is **not** stored on disk. You will need to provide it anytime you run the validator or provide it via your own file using the `--wallet-password-file` flag.

## Usage

### Wallet creation

A non-HD wallet is the most basic sort of wallet, storing all information on-disk. This approach makes it trivial to import, export and list all associated accounts within the wallet. To start using the non-HD wallet, you can create a new wallet using

```bash
./prysm.sh validator wallet create
```

and selecting **non-HD** wallet when prompted during an interactive process. You can also create a wallet **non-interactively** by using the following command line flags, which are also viewable by typing `./prysm.sh validator wallet create --help.

:::info
You'll need to set a **strong** password for your new validator account, containing at least 1 uppercase letter, 1 number, a special character, and be at least 8 characters long. Any unicode characters can be used for your account passwords.
:::

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")
| `--wallet-password-file` | Path to a file containing your wallet's password for automatic unlocking
| `--keymanager-kind`     | Type of wallet to create, either "direct", "derived, or "remote" (default "derived")

Here's a full example on how to create a non-HD wallet at `$HOME/mynonhdwallet`.
```bash
./prysm.sh validator wallet create --wallet-dir=$HOME/nonhdwallet --wallet-password-file=/path/to/password.txt --keymanager-kind=direct
```

### New validator account

You can create a new validator account for your non-HD wallet using the following command

```bash
./prysm.sh validator accounts create
```

Soon after, the command will complete and you will see two **important** pieces of information you'll need for your validator.

```go
INFO accounts: (wallet path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-v2█

INFO non-hd-wallet: Write down the private key, as it is your unique withdrawal private key for eth2

==========================Withdrawal Key===========================

0x14d0acc3eb479b5a7da91a5cb8c6a7454bed05322e189abea...

===================================================================

===================Eth1 Deposit Transaction Data===================

0x2289511800000000000000000000000000000000000000000...

===================================================================

INFO non-hd-wallet: Successfully created new validator account
account_name=personally-conscious-echidna
```

Copy your **withdrawal key** somewhere safe and offline, as it is your only means of withdrawing your validator rewards from participating in eth2. You can then copy the deposit data text and use it when sending 32ETH to the Validator Deposit Contract for eth2.

You can also create a new validator account **non-interactively** by using the following command line flags, which are also viewable by typing `./prysm.sh validator accounts create --help.

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")
| `--wallet-password-file`     | Path to a plain-text, password.txt file containing your wallet password


Here's a full example on how to create a new validator account for your non-HD wallet stored at `$HOME/mynonhdwallet` with account passwords stored at `$HOME/myaccountpasswords`.

```bash
./prysm.sh validator accounts create --wallet-dir=$HOME/nonhdwallet --wallet-password-file=password.txt
```

### List validator accounts

You can list all validator accounts in your non-HD wallet using the following command

```bash
./prysm.sh validator accounts list
```

Where you'll see the following output

```bash
INFO accounts: (wallet path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-v2

Showing **1** validator account

personally-conscious-echidna
[public key] 0x971d780edfe98743f41cdcdba8521548fc343ffcd958e90968c4f1cc5a2e9b6ea11a984397c34c6cc13e9d4e8d14ce1e
[created at] 16 minutes ago
```

You can also run the `accounts list` command **non-interactively** by using the following command line flags, which are also viewable by typing `./prysm.sh validator accounts list --help.

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")
| `--wallet-password-file`     | Path to a plain-text file containing your wallet password

### Import validator accounts

You can import validator keystores from a separate folder into your wallet with the following command

```bash
./prysm.sh validator accounts import --keys-dir=/path/to/keystores
```

This will import all files that are valid [EIP-2335](https://eips.ethereum.org/EIPS/eip-2335) keystores, such as those generated by the official [eth2 deposit launchpad](https://medalla.launchpad.ethereum.org/)'s command-line tool. For more information on how to run Prysm when coming from launchpad, read our [Medalla testnet onboarding](/docs/testnet/medalla) documentation. The files you are importing must have the prefix `keystore-`.

### Export validator accounts

You can export validator accounts from your non-HD wallet using the following command

```bash
./prysm.sh validator accounts export
```

TODO: Work-in-progress.
