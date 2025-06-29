---
id: nondeterministic
title: Import keys into a Prysm wallet
sidebar_label: Import keys into a Prysm wallet
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

## Background

You can import existing EIP-2335 keystore files (such as those generated by the [eth2.0-deposit-cli](https://github.com/ethereum/eth2.0-deposit-cli)) into Prysm. Importing your own keys is a recommended security best practice because it allows you to create a mnemonic (and derived validator keys) using software that you choose. This makes it easy for you to keep your sensitive mnemonic phrase physically isolated away from your validator machine.

Validator private keys are encrypted with a strong wallet password using the [EIP-2335](https://eips.ethereum.org/EIPS/eip-2335) `keystore.json` standard. Your `keystore.json` file is usually available in your wallet's directory, often labeled `all-accounts.keystore.json`:

```sh
wallet-dir/
	accounts/
		all-accounts.keystore.json
```

Your password to unlock this file is **not** stored on disk by Prysm, but you will need to provide it whenever you run the validator.

## Usage

:::tip Running Windows?

The commands in this document use `prysm.sh`, a convenient script built for Linux and MacOS environments. Replace `prysm.sh` with `prysm.bat` if you're on Windows.

:::

### Wallet creation

A non-HD wallet is the most basic sort of wallet, storing all information on-disk. This approach makes it trivial to import, export and list all associated accounts within the wallet. To start using the non-HD wallet, you can create a new wallet using:

```bash
./prysm.sh validator wallet create
```

Then select **non-HD** wallet when prompted. You can also create a wallet **non-interactively** by using the following command line flags, which are also viewable by typing `./prysm.sh validator wallet create --help.

:::info

You'll need to set a **strong** password for your wallet, containing at least one uppercase letter, one number, a special character, and be at least eight characters long. Any unicode characters can be used for passwords.

:::

| Flag                     | Usage                                                                                  |
| ------------------------ | :------------------------------------------------------------------------------------- |
| `--wallet-dir`           | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")           |
| `--wallet-password-file` | Path to a file containing your wallet's password for automatic unlocking               |
| `--keymanager-kind`      | Type of wallet to create, either "imported", "derived, or "remote" (default "derived") |

Here's a full example on how to create a non-HD wallet at `$HOME/mynonhdwallet`.

```bash
./prysm.sh validator wallet create --wallet-dir=$HOME/nonhdwallet --wallet-password-file=/path/to/password.txt --keymanager-kind=imported
```

### Import validator accounts

You can import validator keystores from a separate folder into your wallet with the following command:

```bash
./prysm.sh validator accounts import --keys-dir=/path/to/keystores
```

This will import all files that are valid [EIP-2335](https://eips.ethereum.org/EIPS/eip-2335) keystores, such as those generated by the official [eth2 deposit launchpad](https://launchpad.ethereum.org/)'s command-line tool. The files you are importing must have the prefix `keystore-`.

### List validator accounts

You can list all validator accounts in your non-HD wallet using the following command:

```bash
./prysm.sh validator accounts list
```

Where you'll see the following output:

```bash
INFO accounts: (wallet path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-v2

Showing **1** validator account

personally-conscious-echidna
[public key] 0x971d780edfe98743f41cdcdba8521548fc343ffcd958e90968c4f1cc5a2e9b6ea11a984397c34c6cc13e9d4e8d14ce1e
[created at] 16 minutes ago
```

You can also run the `accounts list` command **non-interactively** by using the following command line flags, which are also viewable by typing: `./prysm.sh validator accounts list --help`.

| Flag                     | Usage                                                                        |
| ------------------------ | :--------------------------------------------------------------------------- |
| `--wallet-dir`           | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2") |
| `--wallet-password-file` | Path to a plain-text file containing your wallet password                    |


### Backup validator accounts

:::danger Be very careful using validator account backups!

If you have made a validator account backup and plan to use it on a different instance, 
please **confirm** that you do not run multiple instances of the same validator twice. 
This _will_ result in slashing and major loss of user funds.

:::


You can backup validator accounts from your imported wallet using the following command.

```bash
./prysm.sh validator accounts backup
```

You can also run the `accounts backup` command **non-interactively** by using the following command line flags, which are also viewable by typing `./prysm.sh validator accounts backup --help.

| Flag                     | Usage                                                                                                            |
| ------------------------ | :--------------------------------------------------------------------------------------------------------------- |
| `--wallet-dir`           | Path to a wallet directory on-disk for Prysm validator accounts. (default: $HOME/Eth2Validators/prysm-wallet-v2) |
| `--wallet-password-file` | Path to a plain-text, .txt file containing your wallet password.                                                 |
| `--backup-dir`           | Path to a directory where accounts will be backed up into a zip file. (default: $HOME/Eth2Validators/)           |
| `--backup-public-keys`   | Comma-separated list of public key hex strings to specify which validator accounts to backup.                    |
| `--backup-password-file` | Path to a plain-text, .txt file containing the desired password for your backed up accounts.                     |

