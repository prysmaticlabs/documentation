---
id: remote
title: Remote signing wallet
sidebar_label: Remote signing wallet
---

## Background

A **remote signing wallet** provides the ability to connect to a remote server to retrieve validating public keys and process eth2 signing requests via a secure [gRPC](https://grpc.io) connection. You must supply valid TLS certificates for establishing the secure connection to your server. We have created a reference implementation of a remote signer server, maintained as an open source, Apache 2 project on Github [here](https://github.com/prysmaticlabs/remote-signer) as a starting point

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

Remote sign requests are defined by the following protobuf schema

```go
// SignRequest is a message type used by a keymanager
// as part of Prysm's accounts implementation.
message SignRequest {
  // 48 byte public key corresponding to an associated private key
  // being requested to sign data.
  bytes public_key = 1;

  // Raw bytes signing root the client is requesting to sign. The client is
  // expected to determine these raw bytes from the appropriate BLS
  // signing domain as well as the signing root of the data structure
  // the bytes represent.
  bytes signing_root = 2;
}
```

Remote signing responses will contain a BLS12-381 signature along with the
status of the signing response from the remote server, signifying the
request either failed, was denied, or completed successfully.

```go
message SignResponse {
  enum Status {
    UNKNOWN = 0;
    SUCCEEDED = 1;
    DENIED = 2;
    FAILED = 3;
  }
  // BLS12-381 signature for the data specified in the request.
  bytes signature = 1;
}
```

A Prysm validator client can then connect securely via [gRPC](https://grpc.io) to the remote server and perform its validating duties by relying on the server for the information it needs. Most advanced cloud deployments should likely use this approach, as it is the most customizable.

## Usage

### Wallet creation

To create a new remote signing-capable wallet, you will need to prepare TLS certificates to connect securely to your remote gRPC server. Then, you can run

```bash
./prysm.sh validator wallet-v2 create
```

:::info
You will need a TLS client cert, client key, and a Certificate Authority (CA) cert to establish a secure gRPC connection
:::

and selecting **Remote** wallet when prompted during an interactive process. You can also create a wallet **non-interactively** by using the following command line flags, which are also viewable by typing `./prysm.sh validator wallet-v2 create --help`.

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")
| `--keymanager-kind`     | Type of wallet to create, either "direct", "derived, or "remote" (default "derived")
| `--password-file`     | Path to a plain-text, password.txt file to lock your wallet

### Wallet edit configuration

To edit your existing remote wallet configuration, such as for changing the path of your TLS certs or remote address, you can run

```bash
./prysm.sh validator wallet-v2 edit-config
```

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