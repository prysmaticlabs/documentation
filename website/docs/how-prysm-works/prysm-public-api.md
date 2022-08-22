---
id: prysm-public-api
title: Prysm public API
sidebar_label: Prysm-specific API 
description: This section contains service definitions and gRPC instructions to interact with the Prysm public API.
---

:::info This API is only used by Prysm
For a standard API that all Ethereum beacon nodes implement, see [here](/docs/how-prysm-works/ethereum-public-api). Over the next few quarters, we plan on deprecating this API and replacing it with the standard API.
:::

One of the required components of nodes in the Ethereum beacon chain network is to expose an API server for outside interaction. This API is critical for running validators on Ethereum, as validator clients can connect to nodes and query their API to figure out their assigned duties, to submit block proposals, and more. Prysm's Ethereum consensus API schema is maintained in Prysm itself here: [github.com/prysmaticlabs/prysm/proto](https://github.com/prysmaticlabs/prysm/tree/develop/proto) and is implemented by Prysm beacon nodes and validators.

![gRPC](/img/grpc-logo2.png)

Prysm implements its API by using the popular [gRPC](https://grpc.io) project created by Google, providing highly advanced functionality for Ethereum consensus. Interacting with the API requires the use of protocol buffers, also known as protobuf. These [protocol buffer](https://developers.google.com/protocol-buffers/). For information on the functionality of gRPC and protocol buffers more generally, see the [gRPC guide](https://grpc.io/docs/guides/).

## Calling the API on your local beacon node

:::danger Do not publicly expose the API
The API's purpose is a means of communication between your beacon node and your validator client. Because of this it is not protected against external malicious users. Some endpoints are vulnerable to Denial-of-Service attacks, while others may disclose information about your beacon node. The communication between the beacon node and the validator client should be done privately, either on the same machine or through an SSH connection.
:::

By default, the beacon node exposes a [gRPC](https://grpc.io) API on host `127.0.0.1:4000`, which is accessed by the validator client. This is not an HTTP endpoint, so you will not be able to perform API queries via HTTP on that port. However, we also expose a JSON-HTTP endpoint on `127.0.0.1:3500` by default for your needs. If you want to query information such as the chainhead from your local beacon node, you can call:

```
http://127.0.0.1:3500/eth/v1alpha1/beacon/chainhead
```

## Disabling the API

By default the beacon node runs with all available set of APIs enabled. You might want to disable one or more APIs, for example for security reasons. The `--http-modules` flags allows fine-grained control over which APIs are available on your node.

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

| HTTP                      | gRPC                                  |
|:--------------------------|:--------------------------------------|
| `GET /v1/messages/123456` | `GetMessage(name: "messages/123456")` |

### JSON mapping

The majority of field primitive types for Ethereum are either `bytes` or `uint64`. The canonical JSON mapping for those fields are a Base64 encoded string for `bytes`, or a string representation of `uint64`. Since JavaScript loses precision for values over [MAX\_SAFE\_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER), uint64 must be a JSON string in order to accommodate those values. If the field value has not changed and is still set to protobuf's default, this field will be omitted from the JSON encoding entirely.

For more details on JSON mapping for other types, view the relevant section in the [proto3 language guide](https://developers.google.com/protocol-buffers/docs/proto3#json).

### gRPC tooling and resources

* [Awesome gRPC](https://github.com/grpc-ecosystem/awesome-grpc)
* [Google's API Style Guide](https://cloud.google.com/apis/design/)
* [Language reference for protoc3](https://developers.google.com/protocol-buffers/docs/proto3)
* [Protocol Buffer Basics: Go](https://developers.google.com/protocol-buffers/docs/gotutorial)
* [Transcoding gRPC to JSON/HTTP using Envoy](https://blog.jdriven.com/2018/11/transcoding-grpc-to-http-json-using-envoy/)

import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />