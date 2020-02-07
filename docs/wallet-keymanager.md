---
id: wallet-keymanager
title: The wallet keymanager
sidebar_label: The wallet keymanager
---

The wallet keymanager is the recommended way of storing and accessing keys on a local filesystem.  It works with standards to promote compatibility with other beacon node implementations, as well as providing advanced features suitable for multi-node deployments.

## ethdo

`ethdo` is a third-party product that manages Ethereum 2 wallets, amongst other things.  `ethdo` is written in the Go programming language (the same language in which Prysm itself is written) and requires a suitable installation of Go to operate.  To install `ethdo` run the following command:


> In the below and future commands, the `$` sign indicates lines you should type to run the command; these lines should be entered *without* the `$` sign.  Lines without the `$` sign are expected output from commands.


```sh
$ go get -u github.com/wealdtech/ethdo
```

Once this command completes you should check that it is installed correctly by querying its version (note the returned version can be higher than that showed in the output below):

```sh
$ ethdo version
1.2.0
```
## A typical validating setup

This section shows how to set up a configuration with two validators and a single withdrawal account.

### Creating a validator wallet and accounts

```sh
$ ethdo wallet create --wallet=Validators
```

> The above command creates a simple non-deterministic wallet, where keys are generated from random data.  If you prefer to have a hierarchical deterministic wallet, where keys are generated from a seed, you can do so with:
>
> `ethdo wallet create --wallet=Validators --type=hd --walletpassphrase=walletsecret`
>
> The `walletpassphrase` is required to protect the seed.  You will also need to supply this option to all commands below that create accounts, as they need access to the seed.

This creates a wallet called "Validators".  Once the wallet is created you can confirm it exists by asking for information about it:

```sh
$ ethdo wallet info --wallet=Validators
Type: non-deterministic
Accounts: 0
```

```sh
$ ethdo account create --account=Validators/1 --passphrase=validator1secret
$ ethdo account create --account=Validators/2 --passphrase=validator2secret
```

> In the example above the two validators are given different passphrases.  This is not necessary, but is supported and is useful to group validators when they are running across multiple nodes so in the case where one node is compromised and the passphrase obtained it limits the scope of the hacker's subsequent attacks.

### Creating a withdrawal wallet and account

Creating a withdrawal wallet and account is very similar to the process followed above for creating validator accounts.  For example:

```sh
$ ethdo wallet create --wallet=Withdrawal
$ ethdo account create --account=Withdrawal/Primary --passphrase=withdrawalsecret
```

This creates a wallet called "Withdrawal" and within it an account called "Primary".  The reason to create separate wallets for validator and withdrawal accounts is that it allows the former to be deployed on the active validator node whilst keeping the latter safely stored in cold storage.  It is also possible to apply additional protection to the Withdrawal wallet if requested; see the `ethdo` documentation for details.

### Depositing funds for a validator

There are two ways of depositing funds for a validator.  If you do not have any Göerli Ether then the best approach is to follow the steps at https://prylabs.net/participate *however* for step 3 do not run the commands provided.  Instead, run the following command to generate the deposit data requested:

```sh
$ ethdo validator depositdata \
      --validatoraccount=Validators/1 \
      --withdrawalaccount=Withdrawal/Primary \
      --depositvalue=3.2Ether \
      --passphrase=validator1secret \
      --raw
0x22895118000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120599e4286c64323197ce85f0bf4ab8b2ad3a60d1574d71aca2757a6f400ebd4aa0000000000000000000000000000000000000000000000000000000000000030b3bb6b7a8d809e59544472853d219499765bf01d14de1e0549bd6fc2a86627ac9033264c84cd503b6339e3334726562f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000cdb86a7a17ce53ef53d288893d2209e214a262f9a7e87b1cc0b68bfe2209050000000000000000000000000000000000000000000000000000000000000060b79833c2c267f05950460a70202396b3e503851bc832064630a42595f91e5e8ea1355dfb966ec12b35d4e6415f69991b00f675f4a45ed9ccf0781440a570645aff9fef3fdebcbf6419d2bbc548bf88f817b74f40f5324e7c44ebe49c23f71386
```

The output of this command can be pasted in to the webpage above to generate the required transaction for validator 1 (and can be repeated for validator 2, or as many validators as you wish).

Alternatively, if you have your own Göerli Ether you can send deposit transactions directly to the Göerli testnet.  You can create JSON output containing the deposit data:

```sh
$ ethdo validator depositdata \
      --validatoraccount=Validators/1 \
      --withdrawalaccount=Withdrawal/Primary \
      --depositvalue=3.2Ether \
      --passphrase=validator1secret
{"account":"Validators/1","pubkey":"a9ca9cf7fa2d0ab1d5d52d2d8f79f68c50c5296bfce81546c254df68eaac0418717b2f9fc6655cbbddb145daeb282c00","withdrawal_credentials":"0059a28dc2db987d59bdfc4ab20b9ad4c83888bcd32456a629aece07de6895aa","signature":"9335b872253fdab328678bd3636115681d52b42fe826c6acb7f1cd1327c6bba48e3231d054e4f274cc7c1c184f28263b13083e01db8c08c17b59f22277dff341f7c96e7a0407a0a31c8563bcf479d31136c833712ae3bfd93ee9ea6abdfa52d4","value":3200000000,"deposit_data_root":"14278c9345eeeb7b2d5307a36ed1c72eea5ed09a30cf7c47525e34f39f564ef5"}
```

This can be passed to [ethereal](https://github.com/wealdtech/ethereal) to send the deposit.  For example on unix:

```sh
$ DEPOSITDATA=`ethdo validator depositdata \
                   --validatoraccount=Validators/1 \
                   --withdrawalaccount=Withdrawal/Primary \
                   --depositvalue=3.2Ether \
                   --passphrase=validator1secret`
$ ethereal beacon deposit \
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
$ mkdir -p ${HOME}/prysm/validator
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

#### Standalone

To start the validator you must supply the desired keymanager and the location of the keymanager options file.   Run the following command:

```sh
$ bazel run //validator:validator -- --keymanager=wallet --keymanageropts=${HOME}/prysm/validator/keymanager.json
```

#### Docker

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

and run the validator with the following command:

```sh
$ docker run -v ${HOME}/prysm/validator:/data \
      -v ${HOME}/.config/ethereum2/wallets:/wallets \
      bazel/validator:image \
      --keymanager=wallet \
      --keymanageropts=/data/keymanager.json
```

#### Confirming validation

As part of the output when running the validator you should see something like:

```
[2020-02-07 10:00:59]  INFO node: Found validator keys validators=2
[2020-02-07 10:00:59]  INFO node: Validating for public key pubKey=0x85016bd4ca67e57e1438308fdb3d98b74b81428fb09e6d16d2dcbc72f240be090d5faebb63f84d6f35a950fdbb36f910
[2020-02-07 10:00:59]  INFO node: Validating for public key pubKey=0x8de04b4cd3f0947f4e76fa2f86fa1cfd33cc2500688f2757e406448c36f0f1255758874b46d72002ad206ed560975d39
```

The first line states how many keys the validator is validating with, and subsequent lines state the specific public keys.  You should confirm that these values match your expectations.
