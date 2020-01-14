---
id: ethereum-2-public-api
title: Ethereum 2.0 Public API
sidebar_label:  Ethereum 2.0 Public API
description: This section contains service definitions and gRPC instructions to interact with the public API.
---

One of the required components for staking on the Ethereum 2.0 network is the [gRPC](https://grpc.io) server. It is utilised by the client to query the network for a variety of different public data, from the [canonical head block](../glossaries/terminology.md#canonical-head-block) to versioning and assignments.

Interacting with the API requires the use of protocol buffers, also known as protobuf. These [protocol buffer](https://developers.google.com/protocol-buffers/) service definitions support both [gRPC](https://grpc.io/) as well as JSON over HTTP.  For information on the functionality of gRPC and protocol buffers more generally, see the [gRPC guide](https://grpc.io/docs/guides/).

## Service definitions

| Package | Service | Version | Description |
| :--- | :--- | :--- | :--- |
| eth | [BeaconChain](https://github.com/prysmaticlabs/ethereumapis/blob/master/eth/v1alpha1/beacon_chain.proto#L36) | v1alpha1 | This service is used to retrieve critical data relevant to the Ethereum 2.0 phase 0 beacon chain, including the most recent head block, current pending deposits, the chain state and more. |
| eth | [Node](https://github.com/prysmaticlabs/ethereumapis/blob/master/eth/v1alpha1/node.proto#L33) | v1alpha1 | The Node service returns information about the Ethereum node itself, including versioning and general information as well as network sync status and a list of services currently implemented on the node. |
| eth | [Validator](https://github.com/prysmaticlabs/ethereumapis/blob/master/eth/v1alpha1/validator.proto) | v1alpha1 | This API provides the information a validator needs to retrieve throughout its lifecycle, including recieved assignments from the network, its current index in the state as well as the rewards and penalties that have been applied to it. |

## Generating client libraries

Client libraries may be generated using [protoc](https://github.com/protocolbuffers/protobuf), a language-neutral tool for serializing structured data. Below are instructions for performing an installation and compiling a `.proto` file.

### Dependencies

* The latest release of [**protobuf compiler** \(protoc\)](https://github.com/protocolbuffers/protobuf/releases/tag/v3.9.0)

### Compiling with protoc

First, ensure you have the most recent version of `protoc` installed.

```text
protoc --version
```

Then, to install the Go protocol buffers plugin, issue the command:

```text
go get -u github.com/golang/protobuf/protoc-gen-go
```

The compiler plugin `protoc-gen-go` will be installed in `$GOBIN`, defaulting to `$GOPATH/bin`. It must be in your `$PATH` for `protoc` to locate it.

The compiler can now be run. Note that this command requires a few parameters; namely a source directly, a destination directory and a path to the `.proto` file itself.

```text
protoc -I=$SRC_DIR --go_out=$DST_DIR $SRC_DIR/node.proto
```

The above command will generate a `node.pb.go` file in your specified destination directory.

## Additional information

### RESTful endpoints \(gRPC Transcoding\)

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
    message GetMessageRequest {
        string name = 1; // Mapped to URL Path.
    }
    message Message {
        string text = 1; // The resource content.
    }
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

