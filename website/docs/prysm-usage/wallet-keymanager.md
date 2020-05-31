---
id: wallet-keymanager
title: Wallet Keymanagers
sidebar_label: Wallet keymanager
---

  > **IMPORTANT NOTICE:** As Prysmatic Labs cannot endorse third party tools used to manage keys in a production environment, the guide on this page is no longer maintained and, if followed, there **is a risk that your deposit will experience issues**. It is highly recommended to compliment this guide with the latest `ethdo` installation and usage instructions found in [this guide on Github](https://github.com/wealdtech/ethdo/blob/master/docs/usage.md).

A wallet keymanager is the recommended way of storing and accessing wallet keys on a local filesystem. The below guide outlines the configuration and operation of [ethdo](https://github.com/wealdtech/ethdo), a third-party software package that is used to perform several common tasks on Ethereum 2.0, including keystore functionality. It follows the Ethereum 2.0 specification and provides cross-client support (interoperability) as well as advanced features suitable for multi-node deployments.
  
## Installing ethdo

1. To install `ethdo`, issue the following command:

```sh
GO111MODULE=on go get github.com/wealdtech/ethdo@latest
```

2. Ensure `ethdo` is installed properly by issuing the command:

```sh
ethdo version
```

Ensure the output matches the most recent version listed on the repository's [release history](https://github.com/wealdtech/ethdo/releases/).


## Typical validating setups

This section outlines the process of setting up a configuration with two validators and a single withdrawal account using ethdo.

### Generating a wallet

To create a non-deterministic wallet (keys generated from random data), issue the command:
```sh
ethdo wallet create --wallet=Validators
```

If you prefer to have a hierarchical deterministic wallet, where keys are generated from a seed, issue the command:

```sh
ethdo wallet create --wallet=Validators --type=hd --walletpassphrase=walletsecret`
```

This creates a wallet called "Validators" in your current directory which contains the newly generated seed data.

> The `--walletpassphrase` flag and input is required to protect the seed. It is critical that you keep it private and secure.

 Once the wallet is created, fetch its data to ensure it exists by issuing the following command:

```sh
ethdo wallet info --wallet=Validators
```

This command will produce output like so:

```sh
Type: non-deterministic
Accounts: 0
```

### Generating multiple wallets

To create two separate wallets with different passphrases, issue the command:
```sh
ethdo account create --account=Validators/1 --passphrase=validator1secret
ethdo account create --account=Validators/2 --passphrase=validator2secret
```

 > The two validators are given different passphrases in the above example.  This is not required but is recommended, as it will prevent both validators from being compromised should an attacker acquire the passphrase for one of them.

### Creating a withdrawal wallet and account

It is recommended to set up separate wallets for withdrawals and validator nodes. This allows users to have a validator wallet actively running on the node, while a second wallet key can be kept securely offline in cold storage.

Creating a withdrawal wallet and account is very similar to the process above to generate validator accounts.  For example:

```sh
ethdo wallet create --wallet=Withdrawal
ethdo account create --account=Withdrawal/Primary --passphrase=withdrawalsecret
```

This creates a wallet called "Withdrawal" and within it an account called "Primary". It is also possible to apply additional protection to the Withdrawal wallet if desired; see the `ethdo` documentation for details.

### Depositing funds for a validator

The validator now requires deposited funds. If you do not have any Göerli Ether, the best approach is to follow the steps at https://prylabs.net/participate to use the faucet and make a deposit -- **however**, for step 3, do not run the commands provided.  Instead, run the following command to generate the deposit data requested:

```sh
ethdo validator depositdata \
      --validatoraccount=Validators/1 \
      --withdrawalaccount=Withdrawal/Primary \
      --depositvalue=32Ether \
      --passphrase=validator1secret \
      --raw
```

The raw data output of this command can be pasted in to the webpage above to generate the required transaction for validator 1 (and can be repeated for validator 2, or as many validators as you wish).

Alternatively, if you have your own Göerli ETH, you can send deposit transactions directly to the Göerli testnet.  You can create JSON output containing the deposit data:

```sh
ethdo validator depositdata \
      --validatoraccount=Validators/1 \
      --withdrawalaccount=Withdrawal/Primary \
      --depositvalue=32Ether \
      --passphrase=validator1secret
{"account":"Validators/1","pubkey":"a9ca9cf7fa2d0ab1d5d52d2d8f79f68c50c5296bfce81546c254df68eaac0418717b2f9fc6655cbbddb145daeb282c00","withdrawal_credentials":"0059a28dc2db987d59bdfc4ab20b9ad4c83888bcd32456a629aece07de6895aa","signature":"9335b872253fdab328678bd3636115681d52b42fe826c6acb7f1cd1327c6bba48e3231d054e4f274cc7c1c184f28263b13083e01db8c08c17b59f22277dff341f7c96e7a0407a0a31c8563bcf479d31136c833712ae3bfd93ee9ea6abdfa52d4","value":3200000000,"deposit_data_root":"14278c9345eeeb7b2d5307a36ed1c72eea5ed09a30cf7c47525e34f39f564ef5"}
```

This can be passed to [ethereal](https://github.com/wealdtech/ethereal) to send the deposit:

```sh
DEPOSITDATA=`ethdo validator depositdata \
                   --validatoraccount=Validators/1 \
                   --withdrawalaccount=Withdrawal/Primary \
                   --depositvalue=32Ether \
                   --passphrase=validator1secret`
ethereal beacon deposit \
      --network=goerli \
      --data="${DEPOSITDATA}" \
      --from=0x21A1A52aba41DB18F9F1D2625e1b19A251F3e0A9 \
      --passphrase=eth1secret
```

The `ethereal` command can either take a `passphrase`, if the `from` address is a local account (confirm with `ethereal --network=goerli account list`) or a `privatekey` if not.

### Validating

The next step is to start the validator using the validating keys that have been created.

#### Keymanager options

Although options for the wallet keymanager can be supplied directly on the command-line this is not considered best practice, as it can expose sensitive information such as passphrases.  It is better to create a file that contains this information and reference that file.  For the purposes of this example we will create the keymanager options file at `${HOME}/prysm/validator/keymanager.json`

To create the relevant directory run the following:

```sh
mkdir -p "${HOME}/prysm/validator"
```

and then use your favourite text editor to create a file in this directory called `keymanager.json` with the following contents:

```json
{
  "accounts": [
    "Validators/1",
    "Validators/2"
  ],
  "passphrases": [
    "validator1secret",
    "validator2secret"
  ]
}
```

#### Starting the validator with Bazel

To start the validator you must supply the desired keymanager and the location of the keymanager options file.   Run the following command:

```sh
bazel run //validator:validator -- --keymanager=wallet --keymanageropts="${HOME}/prysm/validator/keymanager.json"
```

> The below commands use the `${HOME}` environment variable, which is standard on GNU/Linux and macOS. For Windows users, replace it with `%LOCALAPPDATA%` e.g. `%LOCALAPPDATA%\ethereum2\wallets`.  This may also require you to remove the double quotes around the `keymanageropts` value, especially on Windows.

#### Starting the validator with Docker

Docker will not have direct access to the wallet created above, and requires the keymanager to be informed of the mapped location of the wallet.  Edit the `keymanager.json` file to include a location entry, as follows:

```json
{
  "location": "/wallets",
  "accounts": [
    "Validators/1",
    "Validators/2"
  ],
  "passphrases": [
    "validator1secret",
    "validator2secret"
  ]
}
```
Then run the validator by issuing the following command:

```sh
 docker run -v "${HOME}/prysm/validator:/data" \
      -v "${HOME}/.config/ethereum2/wallets:/wallets" \
      gcr.io/prysmaticlabs/prysm/validator:latest \
      --keymanager=wallet \
      --keymanageropts=/data/keymanager.json
```

#### Confirming validation

When the validator is operational, you should see output similar to:

```text
[2020-02-07 10:00:59]  INFO node: Found validator keys validators=2
[2020-02-07 10:00:59]  INFO node: Validating for public key pubKey=0x85016bd4ca67e57e1438308fdb3d98b74b81428fb09e6d16d2dcbc72f240be090d5faebb63f84d6f35a950fdbb36f910
[2020-02-07 10:00:59]  INFO node: Validating for public key pubKey=0x8de04b4cd3f0947f4e76fa2f86fa1cfd33cc2500688f2757e406448c36f0f1255758874b46d72002ad206ed560975d39
```

The first line states how many keys the validator is validating with, and subsequent lines state the specific public keys.  Confirm that these values match your expectations.

## Migrating keys from keystore

To migrate keys from the `keystore` keymanager, extract the private keys and then import them into a wallet.

### Extracting private keys from keystore

To extract the private keys you must run the `validator accounts keys` command with the path and passphrase for the local keystore.

#### Extracting with Bazel

Issue the following command:

```sh
 bazel run //validator:validator -- accounts keys --keystore-path="${HOME}/.eth2validators" --password=secret
```

#### Extracting with Docker

Issue the following command:

```sh
 docker run -v "${HOME}/prysm/validator:/data" \
      -v "${HOME}/.eth2validators:/validators" \
      gcr.io/prysmaticlabs/prysm/validator:latest \
      accounts keys \
      --keystore-path=/validators \
      --password=secret
```

### Importing private keys to wallet

The output from the prior extraction piece should include lines similar to:

```sh
Public key: 0xa551e2558c839162b5df961ceb27cd10e9cf711ac15ff7866143cbf6df5fe523e5c3c91fdfa95f47e20b9499ee5766fc private key: 0x3e89ad55d05fa8e412045c4187417e6a480a82203bd85779e673a43761dcbcb1
```

You want to use the information after `private key`.  Each private key can be imported using the command:

```sh
ethdo account import --account=Validators/newname --passphrase=newvalidatorsecret --key=0x3e89ad55d05fa8e412045c4187417e6a480a82203bd85779e673a43761dcbcb1
```

You will need a different `account` for each new account you add. For example, repeating these steps could add another named `Validators/3`, then `Validators/4` and so on. It is recommended to set the passphrase accordingly.

### Exiting a validator

To exit a validator, run the following command:

```sh
ethdo validator exit --account=Validators/1 --passphrase=validator1secret
```

 > **NOTICE:** This assumes you have a beacon chain node running locally with gRPC on port 4000.  If the beacon chain node is elsewhere use the `--connection` option to allow `ethdo` to connect to it.
