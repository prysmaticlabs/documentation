---
id: migrating-keys
title: Migrating validator keys between computers
sidebar_label: Migrating between computers
---

The aim of this document is to provide guidance on migrating validator keys from one active system to another whilst minimising the risk of slashing.  

:::danger Important Note
As there is a risk of slashing when undertaking migration, it is important to ensure the following key points are understood and followed: 

1.	Never run more than a single Validator process with the same keys loaded
2.	Maintain and utilize slashing protection
3.	Accept downtime as part of a successful migration
:::
## Understanding Slashing

Slashing is a mechanism designed to encourage good behaviour on the Ethereum network and discourage attacks and bad behaviour. Where a validator is found to have broken the rules it will be slashed and removed from the network. In addition to being removed from the network a significant part, up to the entire validator stake, may be removed. 

Being slashed is the result of a validator undertaking one of three “bad” actions: 

1. As a proposer, sign two different beacon blocks for the same slot.
2. As an attester, sign an attestation that surrounds another (surround vote).
3. As an attester, sign two different attestations having the same target.

**Slashing is a permanent action.** 

## Slashing protection

Basic slashing protection is enabled by default using a database that keeps track of objects your validator has previously signed, ensuring the validator does not sign the same message again, causing a violation and getting slashed. 

## Migration Process

The migration process is straightforward and not too dissimilar to backing up and restoring important data.  

### Step 1:   Export slashing protection history

:::tip Stop the Validator
Exporting the slashing protection database is a real-time process and can be undertaken at any time. During migration, you should run the export once you have stopped the validator you are migrating away from. This ensures all validator actions are captured and subsequently imported into the new validator process.  
:::

To export your slashing protection history, use Prysm's built in commands which will work with any installation method.

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

```sh
prysm.sh validator slashing-protection export --datadir=/path/to/your/wallet --slashing-protection-export-dir=/path/to/desired/outputdir
```

**Using Docker**

```sh
docker run -it -v /path/to/outputdir:/output -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable -- slashing-protection export --datadir=/wallet --slashing-protection-export-dir=/output
```

**Using Bazel**

```sh
bazel run //validator -- slashing-protection export --datadir=/path/to/your/wallet --slashing-protection-export-dir=/path/to/desired/outputdir
```

The first time you run the process you will be asked to accept or decline the terms and conditions. Once accepted, the process exports the slashing protection JSON file in your specified /path/to/outputdir folder.

</TabItem>
<TabItem value="win">

**Using the Prysm installation script**

```sh
prysm.bat validator slashing-protection export --datadir=\path\to\your\wallet --slashing-protection-export-dir=\path\to\desired\outputdir
```

**Using Docker**

```sh
docker run -it -v \path\to\outputdir:/output -v \path\to\wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable --slashing-protection export --datadir=/wallet --slashing-protection-export-dir=/output
```

The first time you run the process you will be asked to accept or decline the terms and conditions. Once accepted, the process exports the slashing protection JSON file in your specified /path/to/outputdir folder.

</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

```sh
prysm.sh validator slashing-protection export --datadir=/path/to/your/wallet --slashing-protection-export-dir=/path/to/desired/outputdir
```

**Using Docker**

```sh
docker run -it -v /path/to/outputdir:/output -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable -- slashing-protection export --datadir=/wallet --slashing-protection-export-dir=/output
```

**Using Bazel**

```sh
bazel run //validator -- slashing-protection export --datadir=/path/to/your/wallet --slashing-protection-export-dir=/path/to/desired/outputdir
```

The first time you run the process you will be asked to accept or decline the terms and conditions. Once accepted, the process exports the slashing protection JSON file in your specified /path/to/outputdir folder.

</TabItem>
<TabItem value="arm">

**Using the Prysm installation script**

```sh
prysm.sh validator slashing-protection export --datadir=\path\to\your\wallet --slashing-protection-export-dir=\path\to\desired\outputdir
```

**Using Bazel**

```sh
bazel run //validator -- slashing-protection export --datadir=/path/to/your/wallet --slashing-protection-export-dir=/path/to/desired/outputdir
```

The first time you run the process you will be asked to accept or decline the terms and conditions. Once accepted, the process exports the slashing protection JSON file in your specified /path/to/outputdir folder.

</TabItem>
</Tabs>



### Step 2:  Verify and Backup Validator accounts

An important aspect of managing Validator accounts is ensuring you know which account(s) you are working with, this enables you to verify the account(s) loaded in the Validator prior to starting or taking any other action using the validator process. This can help reduce the risk of running the same account on more than one Validator. 


:::tip Wallet Password needed 
You will need the password to the Validator wallet in order to undertake Delete, List, Backup or Import actions.   
:::

#### Identify Accounts 
To Identify the account(s) loaded in your validator use the following command:

***Using Linux/MacOS based systems***

```sh
./prysm.sh validator accounts list
```

***Using Windows based systems***

```sh
prysm.bat validator accounts list
```
This will produce output in the format of account number, three words seperated by a hyphon (-) and the public keys of each account, the output will be similar to this: 

```sh
Account 0 | three-random-words
[validating public key] 0xabcd1234...........
Account 1 | words-three-random
[validating public key] 0xdcba4321...........
```

We recommend that you keep an accurate and up to date record of the name (three word and public key combinations) of your account(s) for management and verification purposes.
 
 #### Backup
 
You can backup validator accounts from your wallet using the following command:

***Using Linux/MacOS based systems***

```sh
./prysm.sh validator accounts backup
```

***Using Windows based systems***

```sh
prysm.bat validator accounts backup
```
You will now be promted for the wallet password, once entered, you will be guided through the backup process where you will able to select individual or all accounts to backup and the location where the backup file is created. You will also be prompted for a **"password"** for the backup file, **it is important to keep a note of this for use during the import process**. 

You can also run the accounts backup command non-interactively by using the following command line flags, which are also viewable by appending --help to the command line listed above:


**Flag Usage**

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")
| `--wallet-password-file` | Path to a plain-text, .txt file containing your wallet's password.
| `--backup-dir`     | Path to a directory where accounts will be backed up into a zip file. (default: $HOME/Eth2Validators/)
| `--backup-public-keys`	| Comma-separated list of public key hex strings to specify which validator accounts to backup.
| `--backup-password-file` |	Path to a plain-text, .txt file containing the desired password for your backed up accounts.


### Step 3:  Importing Validator accounts

Expand (unzip) the backup file created above. The file will contain one JSON file for each account in the validator. Once the JSON files have been created, import them using the following command:

***Using Linux/MacOS based systems***

```sh
./prysm.sh validator accounts import --keys-dir=/path/to/keystore-file.json
```

***Using Windows based systems***

```sh
prysm.bat validator accounts import --keys-dir=\path\to\keystore-file.json
```

This will import all files that are valid EIP-2335 keystores, such as those generated by the backup process above or the official eth2 deposit launchpad's command-line tool. 

The files you are importing must have the prefix "keystore-" using the defaults in backup will typically create a zip file containing the sequential keystores for the validators. If you have 1 validator account the zip file will typically contain the file keystore-0.json. If you have 3 validator accounts the keystore will typically contain keystore-0.json, keystore-1.json and keystore-2.json.  

### Step 4: Importing slashing protection history

To import a slashing protection JSON file (all eth2 clients use the same format defined in EIP-3076) use the appropriate installation method for your Prysm validator.

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

```sh
./prysm.sh validator slashing-protection import --datadir=/path/to/your/wallet --slashing-protection-json-file=/path/to/desiredimportfile
```

**Using Docker**

```sh
docker run -it -v /path/to/desiredimportfile.json:/import/desiredimportfile.json -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable -- slashing-protection import --datadir=/wallet --slashing-protection-json-file=/import/desiredimportfile.json
```

**Using Bazel**

```sh
bazel run //validator -- slashing-protection import --datadir=/path/to/your/wallet --slashing-protection-json-file=/path/to/desiredimportfile
```

</TabItem>
<TabItem value="win">

**Using the Prysm installation script**

```sh
prysm.bat validator slashing-protection import --datadir=\path\to\your\wallet --slashing-protection-json-file=\path\to\desiredimportfile
```
**Using Docker**

```sh
docker run -it -v \path\to\desiredimportfile.json:/import/desiredimportfile.json -v \path\to\wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable -- slashing-protection import --datadir=/wallet --slashing-protection-json-file=/import/desiredimportfile.json
```

</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

```sh
./prysm.sh validator slashing-protection import --datadir=/path/to/your/wallet --slashing-protection-json-file=/path/to/desiredimportfile
```

**Using Docker**

```sh
docker run -it -v /path/to/desiredimportfile.json:/import/desiredimportfile.json -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable -- slashing-protection import --datadir=/wallet --slashing-protection-json-file=/import/desiredimportfile.json
```

**Using Bazel**

```sh
bazel run //validator -- slashing-protection import --datadir=/path/to/your/wallet --slashing-protection-json-file=/path/to/desiredimportfile
```

</TabItem>
<TabItem value="arm">

**Using the Prysm installation script**

```sh
./prysm.sh validator slashing-protection import --datadir=/path/to/your/wallet --slashing-protection-json-file=/path/to/desiredimportfile
```

**Using Bazel**

```sh
bazel run //validator -- slashing-protection import --datadir=/path/to/your/wallet --slashing-protection-json-file=/path/to/desiredimportfile
```

</TabItem>
</Tabs>


### Step 5:  Verification and restart Validator

It is highly recommended that the validator process on the original, migrated validator is stopped and disabled to ensure it is not restarted automatically or accidently. 

On the original system, with the validator process stopped, remove the account(s) using the process below: 

***Using Linux/MacOS based systems***

```sh
./prysm.sh validator accounts delete 
```

***Using Windows based systems***

```sh
prysm.bat validator accounts delete
```
This will produce output in the same format as the list function, three words identifying the account seperated by a hyphon (-) and the public keys of each account, the output will be similar to this: 

```sh
Use the arrow keys to navigate 
Select the account(s) you would like to delete
    Done Selecting
    All Accounts
    0 | three-random-words | 0xabcd1234...........
    1 | words-three-random | 0xdcba4321...........
```
Using the arrow keys (up-down-left-right) navigate to the Validator(s) that has been migrated and that you want to delete and select it.  

Once complete, verify the account removal using the validator accounts list command outlined above in [Identify Accounts](#identify-accounts). 

**When removal of the account has been confirmed, the new, migrated validator process can be started.**  

:::danger Good Practice
In order to minimise slashing risk, it is recommended that the migrated validator is not started until at least 1 epoch following the last action taken by the original validator. Epoch status can be monitored on multipe websites, however, typically a new epoch is created approximatley every 6.5 minutes, waiting 7.5 minutes after stopping the original validator should significantly reduce the risk of slashing.  
:::
