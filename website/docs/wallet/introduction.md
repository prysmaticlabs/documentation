---
id: introduction
title: Wallets and validator accounts
sidebar_label: Introduction
---

This section explains everything about how to manage validator accounts using Prysm's built-in wallet, as well as setup instructions for different types of wallets including HD (hierarchical deterministic), non-HD, and remote signing wallets. If you created a wallet using the official [Medalla testnet launchpad](https://medalla.launchpad.ethereum.org/) and want to run Prysm using it, see our dedicated instructions [here](http://docs.prylabs.network/docs/prysm-usage/medalla-testnet).

:::tip Pro-Tip
Prysm's validator accounts are extensible enough to allow for the most basic setup all the way to advanced production setups where security is paramount
:::

Out of the box, Prysm supports 3 basic kinds of wallets that encompass many different use-cases

1. **HD wallet**: (Default) A common type of blockchain wallet which is generated from a english mnemonic, able to create new accounts deterministically
2. **non-HD wallet**: A simple wallet in which accounts are password protected and validator keys are generated non-deterministically. This is the recommended approach if you want to import an account from the [Medalla testnet launchpad](https://medalla.launchpad.ethereum.org/) and you read dedicated instructions [here](http://docs.prylabs.network/docs/prysm-usage/medalla-testnet).
3. **Remote signing wallet**: An advanced kind of wallet in which validator keys and signing requests are processed by a remote server via gRPC (view our remote server [reference implementation](https://github.com/prysmaticlabs/remote-signer))

At the core of Prysm's validator accounts lies the notion of a validator private key, which is stored in a password-protected, keystore.json file. Prysm supports the ability to manage many validator accounts, making it easy to import and export them as well as easily list all the account info in your wallet. Prysm is compliant with the [EIP-2335](https://eips.ethereum.org/EIPS/eip-2335) standards for storing eth2 validator private keys, making it possible to move keys between different eth2 client implementations.

To run this new version of Prysm's account management, you will need to run your validator client with the `--enable-accounts-v2` flag. For example

```text
./prysm.sh validator --enable-accounts-v2
```

## HD wallets

By default, a Prysm validator client encourages use of an **HD wallet**, which you can recover from a 24-word, simple english sentence should you lose access to it, such as:

```text
glue hawk service repeat album stable arctic piece kiss arrive viable labor connect film deer trap brain fashion duck omit beach ten slot goat
```

HD wallets are password protected, and allow for easy creation of as many validator account as you wish.

[Create and use an HD wallet](https://docs.prylabs.network/docs/wallet/deterministic)

## Non-HD wallets

Prysm also supports a non-deterministic wallet, which is a very simple kind of wallet storing password-protected validating keys on disk, with passwords stored in a separate directory for ease of use. This type of wallet makes it very easy to import and export accounts, useful for certain cloud deployments in which you don't want to store your eth2 withdrawal keys on-disk. This wallet is also the recommended approach if you generated a validator deposit using the [Medalla testnet launchpad](https://medalla.launchpad.ethereum.org/).

```text
wallet-directory/
  perfectly-intense-mosquito/
    keystore.json
passwords-directory/
  perfectly-intense-mosquito.pass
```

[Create and use a non-HD wallet](https://docs.prylabs.network/docs/wallet/nondeterministic)

## Remote signing wallet

Some advanced users may wish to run a remote-signer server, which handles the retrieval of keys and signing of eth2 requests. A Prysm validator client can then connect securely via [gRPC](https://grpc.io) to the remote server and perform its validating duties by relying on the server for the information it needs. Most advanced cloud deployments should likely use this approach, as it is the most customizable.

To be compliant with a Prysm remote signing wallet, your remote signing server needs to implement the gRPC API specified in Prysm [here](https://github.com/prysmaticlabs/prysm/blob/7fff4ec41165e6581dda352b362d77fc6ca2710d/proto/validator/accounts/v2/keymanager.proto#L12).

```go
service RemoteSigner {
    // ListPublicKeysResponse managed by a remote signer.
    rpc ListValidatingPublicKeys(google.protobuf.Empty) returns (ListPublicKeysResponse) {
        option (google.api.http) = {
            get: "/accounts/v2/remote/accounts"
        };
    }

    // Sign a remote request via gRPC.
    rpc Sign(SignRequest) returns (SignResponse) {
        option (google.api.http) = {
            post: "/accounts/v2/remote/sign"
        };
    }
}
```

We have also a created a reference remote signer implementation, maintained as an open source, Apache 2 project on Github [here](https://github.com/prysmaticlabs/remote-signer) as a starting point.

[Create and use a remote signing wallet](https://docs.prylabs.network/docs/wallet/remote)