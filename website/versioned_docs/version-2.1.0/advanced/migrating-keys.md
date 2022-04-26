---
id: migrating-keys
title: Migrating validator keys between computers or to a new client
sidebar_label: Migrating computers or clients
---

This document provides guidance on migrating Prysm validator keys from one host system to another whilst minimising the risk of slashing.  

:::danger Important Note
As there is a risk of slashing when undertaking migration, it is important to ensure the following key points are understood and followed: 

1.	Never run more than a single validator process with the same keys loaded
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
prysm.sh validator slashing-protection-history export --datadir=/path/to/your/wallet --slashing-protection-export-dir=/path/to/desired/outputdir
```

**Using Docker**

```sh
docker run -it -v /path/to/outputdir:/output -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable -- slashing-protection-history export --datadir=/wallet --slashing-protection-export-dir=/output
```

**Using Bazel**

```sh
bazel run //validator -- slashing-protection-history export --datadir=/path/to/your/wallet --slashing-protection-export-dir=/path/to/desired/outputdir
```

The first time you run the process you will be asked to accept or decline the terms and conditions. Once accepted, the process exports the slashing protection JSON file in your specified /path/to/outputdir folder.

</TabItem>
<TabItem value="win">

**Using the Prysm installation script**

```sh
prysm.bat validator slashing-protection-history export --datadir=\path\to\your\wallet --slashing-protection-export-dir=\path\to\desired\outputdir
```

**Using Docker**

```sh
docker run -it -v \path\to\outputdir:/output -v \path\to\wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable --slashing-protection-history export --datadir=/wallet --slashing-protection-export-dir=/output
```

The first time you run the process you will be asked to accept or decline the terms and conditions. Once accepted, the process exports the slashing protection JSON file in your specified /path/to/outputdir folder.

</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

```sh
prysm.sh validator slashing-protection-history export --datadir=/path/to/your/wallet --slashing-protection-export-dir=/path/to/desired/outputdir
```

**Using Docker**

```sh
docker run -it -v /path/to/outputdir:/output -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable -- slashing-protection-history export --datadir=/wallet --slashing-protection-export-dir=/output
```

**Using Bazel**

```sh
bazel run //validator -- slashing-protection-history export --datadir=/path/to/your/wallet --slashing-protection-export-dir=/path/to/desired/outputdir
```

The first time you run the process you will be asked to accept or decline the terms and conditions. Once accepted, the process exports the slashing protection JSON file in your specified /path/to/outputdir folder.

</TabItem>
<TabItem value="arm">

**Using the Prysm installation script**

```sh
prysm.sh validator slashing-protection-history export --datadir=\path\to\your\wallet --slashing-protection-export-dir=\path\to\desired\outputdir
```

**Using Bazel**

```sh
bazel run //validator -- slashing-protection-history export --datadir=/path/to/your/wallet --slashing-protection-export-dir=/path/to/desired/outputdir
```

The first time you run the process you will be asked to accept or decline the terms and conditions. Once accepted, the process exports the slashing protection JSON file in your specified /path/to/outputdir folder.

</TabItem>
</Tabs>



### Step 2:  Verify and Backup Validator accounts

An important aspect of managing Validator accounts is ensuring you know which account(s) you are working with. This enables you to verify the account(s) loaded in the validator prior to starting or taking any other action using the validator process, and can help reduce the risk of running the same account on more than one validator instance. 


:::tip Wallet Password needed 
You will need the password to the validator wallet in order to undertake Delete, List, Backup or Import actions.   
:::

#### Identify Accounts 
To Identify the account(s) loaded in your validator, issue the following command:

***Using Linux/MacOS based systems***

```sh
./prysm.sh validator accounts list
```

***Using Windows based systems***

```sh
prysm.bat validator accounts list
```
This will produce output in the format of account number, three words seperated by a hyphon (-) and the public keys of each account. The output will be similar to this: 

```sh
Account 0 | three-random-words
[validating public key] 0xabcd1234...........
Account 1 | words-three-random
[validating public key] 0xdcba4321...........
```

We recommend that you keep an accurate and up-to-date record of the name (three word and public key combinations) of your account(s) for management and verification purposes.
 
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
You will now be prompted for the wallet password. Once entered, you will be guided through the backup process where you will able to select individual or all accounts to backup and the location where the backup file is created. You will also be prompted for a **"password"** for the backup file, **it is important to keep a note of this for use during the import process**. 

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

This will import all files that are valid EIP-2335 keystores, such as those generated by the backup process above or the official Ethereum deposit launchpad's command-line tool. 

The files you are importing must have the prefix "keystore-" using the defaults in backup will typically create a zip file containing the sequential keystores for the validators. If you have 1 validator account the zip file will typically contain the file keystore-0.json. If you have 3 validator accounts the keystore will typically contain keystore-0.json, keystore-1.json and keystore-2.json.  

### Step 4: Importing slashing protection history

To import a slashing protection JSON file (all Ethereum consensus clients use the same format defined in EIP-3076) use the appropriate installation method for your Prysm validator.

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
./prysm.sh validator slashing-protection-history import --datadir=/path/to/your/wallet --slashing-protection-json-file=/path/to/desiredimportfile
```

**Using Docker**

```sh
docker run -it -v /path/to/desiredimportfile.json:/import/desiredimportfile.json -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable -- slashing-protection-history import --datadir=/wallet --slashing-protection-json-file=/import/desiredimportfile.json
```

**Using Bazel**

```sh
bazel run //validator -- slashing-protection-history import --datadir=/path/to/your/wallet --slashing-protection-json-file=/path/to/desiredimportfile
```

</TabItem>
<TabItem value="win">

**Using the Prysm installation script**

```sh
prysm.bat validator slashing-protection-history import --datadir=\path\to\your\wallet --slashing-protection-json-file=\path\to\desiredimportfile
```
**Using Docker**

```sh
docker run -it -v \path\to\desiredimportfile.json:/import/desiredimportfile.json -v \path\to\wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable -- slashing-protection-history import --datadir=/wallet --slashing-protection-json-file=/import/desiredimportfile.json
```

</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

```sh
./prysm.sh validator slashing-protection-history import --datadir=/path/to/your/wallet --slashing-protection-json-file=/path/to/desiredimportfile
```

**Using Docker**

```sh
docker run -it -v /path/to/desiredimportfile.json:/import/desiredimportfile.json -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/prysm/validator:stable -- slashing-protection-history import --datadir=/wallet --slashing-protection-json-file=/import/desiredimportfile.json
```

**Using Bazel**

```sh
bazel run //validator -- slashing-protection-history import --datadir=/path/to/your/wallet --slashing-protection-json-file=/path/to/desiredimportfile
```

</TabItem>
<TabItem value="arm">

**Using the Prysm installation script**

```sh
./prysm.sh validator slashing-protection-history import --datadir=/path/to/your/wallet --slashing-protection-json-file=/path/to/desiredimportfile
```

**Using Bazel**

```sh
bazel run //validator -- slashing-protection-history import --datadir=/path/to/your/wallet --slashing-protection-json-file=/path/to/desiredimportfile
```

</TabItem>
</Tabs>


### Step 5:  Verification and restarting the validator client

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


## Guidelines on Switching Between Ethereum Client Software

This portion of the document will provide guidance on switching between Prysm and other consensus clients, such as Teku, Lighthouse, or Nimbus. These steps will be similar to the above steps in Migrating Computers with some key differences. A portion of this guide will be redundant to areas covered elsewhere in the documentation and will link to those places where it is relevant. 

Regarding why one may wish to switch to a different client, see our team's note on the importance of client diversity [here](https://medium.com/prysmatic-labs/prysmatic-labs-statement-on-client-diversity-c0e3c2f05671).

:::danger Important Note
As there is a risk of slashing when switching clients, it is important to ensure the following key points are understood and followed: 

1.	Never run more than a single validator process with the same keys loaded
2.	Maintain and utilize slashing protection
3.	Accept downtime as part of a successful migration
:::

Please refer to the [above section](https://docs.prylabs.network/docs/advanced/migrating-keys#understanding-slashing) regarding the importance of mitigating slashing risk. 

### Step 1: Sync the beacon node

Regardless of which client you are switching to, the first step of the process will be to sync the beacon node. This may take some time to complete. Some clients offer a feature known as "checkpoint sync" which allows you to sync a node within a few minutes. Without this, the process may take several hours to a few days.

Installation documentation links for each client can be found below:

Prysm: https://nimbus.guide/quick-start.html  
Teku: https://docs.teku.consensys.net/en/latest/HowTo/Get-Started/Installation-Options/Install-Binaries/    
Nimbus: https://nimbus.guide/quick-start.html  
Lighthouse: https://lighthouse-book.sigmaprime.io/installation.html  
Lodestar: https://chainsafe.github.io/lodestar/installation/  

### Step 2: Stop and Disable Prysm

Ensuring you stop and disable Prysm is critical to avoiding slashing events before proceeding further. 

Disabling Prysm prevents it from automatically starting up again after a reboot. 

Remove Prysm's validator keys as an added protection by following [these](http://localhost:3000/docs/advanced/migrating-keys#step-5--verification-and-restarting-the-validator-client) instructions above.  

### Step 3: Export slashing protection history

Ensure that you stop Prysm before exporting slashing protection in order to capture all validator actions. 

We have a section dedicated to exporting and importing slashing protection history [here.](https://docs.prylabs.network/docs/wallet/slashing-protection) Follow the steps regarding exporting slashing protection history. 

### Step 4: Update port forwarding

This step is not required for nodes which are running on a virtual public cloud, but keep in mind - nodes will be required to run a an execution client locally post merge!  

By default, Prysm uses TCP/13000 and UDP/12000. Remove those two rules and replace them with the appropriate port forwards for the client you are switching to. The process will be very similar to the steps laid out [here.](https://docs.prylabs.network/docs/prysm-usage/p2p-host-ip#port-forwarding) 

Teku, Nimbus, and Lighthouse all use port 9000 for both TCP and UDP. 

### Step 5: Import Validator Keys

To minimise slashing risk, wait until at least 1 full epoch has elapsed between stopping prysm and importing your validator keys, approximately 6.5 minutes, before proceeding. The inactivity leak cost is negligible compared to the cost of getting slashed.  

Once that amount of time has passed, import your validator keys into the respective validator client you wish to run.  
 
<Tabs
  groupId="importing keys"
  defaultValue="nim"
  values={[
    {label: 'Nimbus', value: 'nim'},
    {label: 'Lighthouse', value: 'lit'},
    {label: 'Teku', value: 'tek'},
    {label: 'Lodestar', value: 'lod'},
  ]
}>



<TabItem value="nim">

https://nimbus.guide/migration.html#step-3---import-your-validator-keys-into-nimbus

</TabItem>

<TabItem value="lit">

https://lighthouse-book.sigmaprime.io/validator-import-launchpad.html#1-run-the-lighthouse-account-validator-import-command

</TabItem>

<TabItem value="tek">

https://docs.teku.consensys.net/en/latest/HowTo/Get-Started/Connect/Connect-To-Mainnet/#run-the-validator-and-beacon-node-as-a-single-process

</TabItem>

<TabItem value="lod">

https://chainsafe.github.io/lodestar/usage/key-management/#import-a-validator-keystore-from-deposit-launch-pad

</TabItem>
</Tabs>

### Step 6: Import Slashing Protection History

Follow your new clients' instructions regarding importing slashing protection history. 

<Tabs
  groupId="importing slashing protection"
  defaultValue="nim"
  values={[
    {label: 'Nimbus', value: 'nim'},
    {label: 'Lighthouse', value: 'lit'},
    {label: 'Teku', value: 'tek'},
    {label: 'Lodestar', value: 'lod'},
  ]
}>



<TabItem value="nim">

https://nimbus.guide/migration.html?highlight=import%20slashing#step-4---import-your-slashing-protection-history

</TabItem>

<TabItem value="lit">

https://lighthouse-book.sigmaprime.io/slashing-protection.html?highlight=import#import-and-export

</TabItem>

<TabItem value="tek">

https://docs.teku.consensys.net/en/stable/HowTo/Prevent-Slashing/

</TabItem>

<TabItem value="lod">

https://chainsafe.github.io/lodestar/reference/cli/#account-validator-slashing-protection

</TabItem>
</Tabs>


### Step 7: Start the New Validator

Ensure your beacon node is fully synced with the network by checking your clients logs prior to starting your validator. Once it is fully synced, start the validator.  

Search a block explorer like https://beaconcha.in/ with your validator's public key to confirm that your validator is now active!