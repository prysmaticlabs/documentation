---
id: remote
title: Configure a remote signing wallet
sidebar_label: Configure a remote signing wallet
---


:::caution Deprecated Content

**This content is now deprecated.** See [Configure Web3Signer](./we3signer.md) for the latest and recommended remote signing guidance.

:::

A **remote signing wallet** provides the ability to connect to a remote server to retrieve validating public keys and process signing requests via a secure [gRPC](https://grpc.io) connection. You must supply valid TLS certificates for establishing the secure connection to your server. We have created a reference implementation of a remote signer server, maintained as an open source, Apache 2 project on Github [here](https://github.com/prysmaticlabs/remote-signer) as a starting point

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

To create a new remote signing-capable wallet, you will need to prepare TLS certificates to connect securely to your remote gRPC server. Then, you can run:

```bash
./prysm.sh validator wallet create
```

:::info
You will need a TLS client cert, client key, and a Certificate Authority (CA) cert to establish a secure gRPC connection
:::

Then select **Remote** wallet when prompted. You can also create a wallet **non-interactively** by using the following command line flags, which are also viewable by typing `./prysm.sh validator wallet create --help`.

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2").
| `--keymanager-kind`     | Type of wallet to create, either "direct", "derived, or "remote" (default "derived").
| `--grpc-remote-address`     | Host:port of a gRPC server for the remote signer server.
| `--remote-signer-crt-path`     | /path/to/client.crt for establishing a secure, TLS gRPC connection to a remote signer server.
| `--remote-signer-key-path`     | /path/to/client.key for establishing a secure, TLS gRPC connection to a remote signer server.
| `--remote-signer-ca-crt-path`     | /path/to/ca.crt for establishing a secure, TLS gRPC connection to a remote signer server.

### Wallet edit configuration

To edit your existing remote wallet configuration, such as changing the path of your TLS certs or remote address, you can run

```bash
./prysm.sh validator wallet-v2 edit-config
```

You can also edit your wallet configuration **non-interactively** by using the following command line flags, which are also viewable by typing `./prysm.sh validator wallet create --help`.

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2").
| `--grpc-remote-address`     | Host:port of a gRPC server for the remote signer server.
| `--remote-signer-crt-path`     | /path/to/client.crt for establishing a secure, TLS gRPC connection to a remote signer server.
| `--remote-signer-key-path`     | /path/to/client.key for establishing a secure, TLS gRPC connection to a remote signer server.
| `--remote-signer-ca-crt-path`     | /path/to/ca.crt for establishing a secure, TLS gRPC connection to a remote signer server.

### List validator accounts

You can list all validator accounts in your non-HD wallet using the following command

```bash
./prysm.sh validator accounts list
```

Where you'll see the following output

```bash
[2020-07-27 14:30:13]  INFO accounts: (wallet path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-v2
(keymanager kind) remote signer
(configuration file path) /Users/johndoe/Library/Eth2Validators/prysm-wallet-v2/remote/keymanageropts.json

Configuration options
Remote gRPC address: localhost:4000
Client cert path: /path/to/example-client.crt
Client key path: /path/to/example.client.key
CA cert path: /path/to/ca.crt

Showing **1** validator account

personally-conscious-echidna
[validating public key] 0x971d780edfe98743f41cdcdba8521548fc343ffcd958e90968c4f1cc5a2e9b6ea11a984397c34c6cc13e9d4e8d14ce1e
[created at] 16 minutes ago
```

You can view all available options to run the `list` command by typing `./prysm.sh validator accounts list --help.

| Flag          | Usage         |
| ------------- |:-------------|
| `--wallet-dir` | Path to a wallet directory (default: "$HOME/Eth2Validators/prysm-wallet-v2")


import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />