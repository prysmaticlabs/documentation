---
id: ethereum-public-api
title: Ethereum 2.0 REST API
sidebar_label: Ethereum 2.0 API 
description: This section contains information about the official Ethereum 2.0 REST API.
---

Prysm supports the official [Ethereum 2.0 REST API specification](https://ethereum.github.io/eth2.0-APIs/?urls.primaryName=v1), the official API standard developed by the Ethereum R&D team. The specification describes a RESTful set of endpoints which should be implemented by an Eth2 client or a third-party service. This reduces the overhead of having to learn a new set of APIs when trying out a different client, and it allows network participants to reliably talk to each other over HTTP. As an example of an external service implementing the spec, Infura's beacon chain API is described [here](https://infura.io/docs/eth2#tag/Beacon).

:::caution The official Ethereum 2.0 specification contains multiple definitions
As of the time of writing, there are two definitions: [v1](https://ethereum.github.io/eth2.0-APIs/?urls.primaryName=v1) and [dev](https://ethereum.github.io/eth2.0-APIs/?urls.primaryName=dev). The latter is an unstable version and supporting it is **not** to be expected.
:::

## Performing requests against a local Prysm node

:::danger Do not publicly expose the API
The API's purpose is a means of communication between your beacon node and your validator client. Because of this it is not protected against external malicious users. Some endpoints are vulnerable to Denial-of-Service attacks, while others may disclose information about your beacon node. The communication between the beacon node and the validator client should be done privately, either on the same machine or through an SSH connection.
:::

The Eth2 JSON REST API is exposed by default on `127.0.0.1:3501`. The host can be changed by manipulating the `--grpc-gateway-host` flag and the port can be modified with the `--eth-api-port` flag. Performing a request is straightforward - simply concatenate the Prysm's API endpoint with the API's URL, providing any required URL and query parameters. As an example, the finalized state's root can be obtained using:
```
http://127.0.0.1:3501/eth/v1/beacon/states/finalized/root
```
Notice that in this example the `{state_id}` URL parameter has been replaced with the literal value `finalized`. Please read the specification carefully to understand how each endpoint behaves.

:::caution Do not use the `--grpc-gateway-port`, use `--eth-api-port` instead
[The existing Prysm API](/docs/how-prysm-works/prysm-public-api) uses the port specified in the `--grpc-gateway-port` flag, and all request to this API should be done using that port. However, because of technical challenges of making the Ethereum 2.0 REST API conform to the official specification the `--eth-api-port` flag was introduced, and all request to the Ethereum 2.0 REST API should be done using the port specified in that flag. Although requests to `--grpc-gateway-port` are possible, results may be incorrectly encoded, malformed, simply wrong or even not possible to obtain due to server-side errors.
:::

## Supported endpoints

While Prysm would like to support all endpoints from the official specification, some of them have a higher priority for us than others, and there are other features that the development team might find more important. Therefore it is plausible that some endpoints will return a `404 Not Found` response for the time being.

| Definition | Group | Support |
| :--- | :--- | :--- |
| v1 | Beacon | All endpoints are supported |
| v1 | Config | All endpoints are supported |
| v1 | Debug | All endpoints are supported |
| v1 | Events | All endpoints are supported |
| v1 | Node | All endpoints are supported |
| v1 | Validator | No support |
| v1 | ValidatorRequiredApi | Partial support. `/eth/v1/validator` endpoints not supported. |