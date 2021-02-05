---
id: ethereum-2-public-api
title: Ethereum 2.0 public API
sidebar_label: Beacon node API 
description: This section contains service definitions and gRPC instructions to interact with the public API.
---

:::info Our API documentation website is undergoing maintenance
Our API documentation website [https://api.prylabs.network](https://api.prylabs.network) is currently down due to maintenance. In the meantime, you can browse our API schema here: [github.com/prysmaticlabs/ethereumapis](https://github.com/prysmaticlabs/ethereumapis/tree/master/eth/v1alpha1). Our current API version used in Prysm is `v1alpha1`. 
:::

One of the required components nodes in the Ethereum 2.0 network is to expose an API server for outside interaction. This API is critical for running validators on eth2, as validator clients can connect to nodes and query their API to figure out their assigned duties, to submit block proposals, and more. Prysm's eth2 API schema is maintained in its unique repository: [github.com/prysmaticlabs/ethereumapis](https://github.com/prysmaticlabs/ethereumapis) and is implemented by Prysm beacon nodes [here](https://github.com/prysmaticlabs/prysm/blob/master/beacon-chain/rpc/service.go). Note, this API is **only used by Prysm**. 


:::tip Standard API conformance is underway
There is an effort to standardize an eth2 API for all implementations [here](https://github.com/ethereum/eth2.0-apis), and we are currently working on implementing it into Prysm. In the meantime, `ethereumapis` is the only supported API schema by Prysm.
:::

![gRPC](/img/grpc-logo2.png)

Prysm implements its API by using the popular [gRPC](https://grpc.io) project created by Google, providing highly advanced functionality for eth2. Interacting with the API requires the use of protocol buffers, also known as protobuf. These [protocol buffer](https://developers.google.com/protocol-buffers/). For information on the functionality of gRPC and protocol buffers more generally, see the [gRPC guide](https://grpc.io/docs/guides/).

## Calling the API on your local beacon node

By default, the beacon node exposes a [gRPC](https://grpc.io) API on host `127.0.0.1:4000`, which is accessed by the validator client. This is not an HTTP endpoint, so you will not be able to perform API queries via HTTP on that port. However, we also expose a JSON-HTTP endpoint on `127.0.0.1:3500` by default for your needs. If you want to query information such as the chainhead from your local beacon node, you can call:

```
http://127.0.0.1:3500/eth/v1alpha1/beacon/chainhead
```

All our service definitions are explained below:

### Service definitions

| Package | Service | Version | Description |
| :--- | :--- | :--- | :--- |
| eth | [BeaconChain](https://github.com/prysmaticlabs/ethereumapis/blob/master/eth/v1alpha1/beacon_chain.proto#L36) | v1alpha1 | This service is used to retrieve critical data relevant to the Ethereum 2.0 phase 0 beacon chain, including the most recent head block, current pending deposits, the chain state and more. |
| eth | [Node](https://github.com/prysmaticlabs/ethereumapis/blob/master/eth/v1alpha1/node.proto#L33) | v1alpha1 | The Node service returns information about the Ethereum node itself, including versioning and general information as well as network sync status and a list of services currently implemented on the node. |
| eth | [Validator](https://github.com/prysmaticlabs/ethereumapis/blob/master/eth/v1alpha1/validator.proto) | v1alpha1 | This API provides the information a validator needs to retrieve throughout its life cycle, including recieved assignments from the network, its current index in the state as well as the rewards and penalties that have been applied to it. |

## Contributing

Thanks for wanting to contribute to our eth2 API! Go and Java libraries may be generated from the [ethereumapis repository](https://github.com/prysmaticlabs/ethereumapis) using [Bazel](https://bazel.build), making it easy to make changes to the schemas needed and generate Go files or Java packages from them. Here's what you need to get started:

### Dependencies

- A modern, UNIX operating system
- The latest release of [Bazel](https://docs.bazel.build/versions/master/install.html) installed
- The `cmake` package installed
- The `git` package installed

### Making API Schema Changes

Say you want to add a new endpoint to the `BeaconChain` gRPC service in our API schema to retrieve orphaned blocks. First, make sure the functionality you wish to add is not already covered by one of our endpoints on https://api.prylabs.network. Also, keep in mind making strict changes to the API schema can often times be difficult without a significant reason as this API is used by many different developers building on eth2. If you are confident in your desired changes, you can proceed by modifying the protobuf schema:

```go
service BeaconChain {
    // Retrieve orphaned blocks from the eth2 chain.
    rpc GetOrphanedBlocks(OrphanedBlocksRequest) returns (OrphanedBlocksResponse) {
        option (google.api.http) = {
            get: "/eth/v1alpha1/beacon/blocks/orphaned"
        };
    }
    ...
}

message OrphanedBlocksRequest {
    uint64 slot = 1;
}

message OrphanedBlocksResponse {
    repeated BeaconBlock blocks = 1;
}
```

After making your changes, you can regenerate the Go libraries from the schema by running:

```bash
$ ./scripts/update-go-pbs.sh
```

Then, open a pull request with your changes on https://github.com/prysmaticlabs/ethereumapis. Next, you'll be ready to implement your new changes in Prysm itself.

### Implementing Your Changes in Prysm

Ensure you have read our [contribution guidelines](/docs/contribute/contribution-guidelines) first. Then, once your changes to the API schema are merged into the master branch of ethereumapis, you can update Prysm's dependency on ethereumapis to its latest version with the command:

```bash
$ bazel run //:gazelle -- update-repos github.com/prysmaticlabs/ethereumapis
```

Prysm also utilizes generated mocks for testing gRPC requests/responses, so you will also need to regenerate the required mocks by running:

```bash
$ ./scripts/update-mockgen.sh
```

Now, you will be able to implement your required changes in Prysm.

## RESTful endpoints \(gRPC Transcoding\)

All of the gRPC services should define JSON over HTTP endpoints by specifying [HTTPRules](https://github.com/googleapis/googleapis/blob/master/google/api/http.proto). Developers may choose to bundle a REST service of gRPC with their client implementation binaries, or alternatively, they may use a JSON encoding proxy such as [Envoy Proxy](https://www.envoyproxy.io/), [grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway), etc.

For more information on gRPC transcoding, see the examples found [here](https://github.com/googleapis/googleapis/blob/master/google/api/http.proto#L45).

Code sample:

```text
service Messaging {
    rpc GetMessage(GetMessageRequest) returns (Message) {
        option (google.api.http) = {
            get: "/v1/{name=messages/*}"
        };
    }
}
message GetMessageRequest {
    string name = 1; // Mapped to URL Path.
}
message Message {
    string text = 1; // The resource content.
}
```

This enables an HTTP REST to gRPC mapping, as shown below:

| HTTP | gRPC |
| :--- | :--- |
| `GET /v1/messages/123456` | `GetMessage(name: "messages/123456")` |

### JSON mapping

The majority of field primitive types for Ethereum are either `bytes` or `uint64`. The canonical JSON mapping for those fields are a Base64 encoded string for `bytes`, or a string representation of `uint64`. Since JavaScript loses precision for values over [MAX\_SAFE\_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER), uint64 must be a JSON string in order to accommodate those values. If the field value not changed and is still set to protobuf's default, this field will be omitted from the JSON encoding entirely.

For more details on JSON mapping for other types, view the relevant section in the [proto3 language guide](https://developers.google.com/protocol-buffers/docs/proto3#json).

### gRPC tooling and resources

* [Awesome gRPC](https://github.com/grpc-ecosystem/awesome-grpc)
* [Google's API Style Guide](https://cloud.google.com/apis/design/)
* [Language reference for protoc3](https://developers.google.com/protocol-buffers/docs/proto3)
* [Protocol Buffer Basics: Go](https://developers.google.com/protocol-buffers/docs/gotutorial)
* [Transcoding gRPC to JSON/HTTP using Envoy](https://blog.jdriven.com/2018/11/transcoding-grpc-to-http-json-using-envoy/)
