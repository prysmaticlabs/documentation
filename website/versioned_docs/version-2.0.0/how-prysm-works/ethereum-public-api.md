---
id: ethereum-public-api
title: Ethereum 2.0 REST API
sidebar_label: Ethereum 2.0 API 
description: This section contains information about the official Ethereum 2.0 REST API.
---

Prysm supports the official [Ethereum 2.0 REST API specification](https://ethereum.github.io/beacon-APIs/), the official API standard developed by the Ethereum R&D team. The specification describes a RESTful set of endpoints which should be implemented by an Eth2 client or a third-party service. This reduces the overhead of having to learn a new set of APIs when trying out a different client, and it allows network participants to reliably talk to each other over HTTP. As an example of an external service implementing the spec, Infura's beacon chain API is described [here](https://infura.io/docs/eth2#tag/Beacon).

:::caution The official Ethereum 2.0 specification contains multiple definitions
As of the time of writing, there are three definitions: [v1](https://ethereum.github.io/eth2.0-APIs/?urls.primaryName=v1), [v2.0.0](https://ethereum.github.io/beacon-APIs/) and [dev](https://ethereum.github.io/eth2.0-APIs/?urls.primaryName=dev). `dev` is an unstable version and supporting it is **not** to be expected.
:::

## Performing requests against a local Prysm node

:::danger Do not publicly expose the API
The API's purpose is a means of communication between your beacon node and your validator client. Because of this it is not protected against external malicious users. Some endpoints are vulnerable to Denial-of-Service attacks, while others may disclose information about your beacon node. The communication between the beacon node and the validator client should be done privately, either on the same machine or through an SSH connection.
:::

The Eth2 JSON REST API is exposed by default on `127.0.0.1:3500`. The host can be changed by manipulating the `--grpc-gateway-host` flag and the port can be modified with the `--grpc-gateway-port` flag. Performing a request is straightforward - simply concatenate the Prysm's API endpoint with the API's URL, providing any required URL and query parameters. As an example, the finalized state's root can be obtained using:
```
http://127.0.0.1:3500/eth/v1/beacon/states/finalized/root
```
Notice that in this example the `{state_id}` URL parameter has been replaced with the literal value `finalized`. Please read the specification carefully to understand how each endpoint behaves.

## Disabling the API

By default the beacon node runs with all available set of APIs enabled. You might want to disable one or more APIs, for example for security reasons. The `--http-modules` flags allows fine-grained control over which APIs are available on your node.

## Supported endpoints

While Prysm would like to support all endpoints from the official specification, some of them have a higher priority for us than others, and there are other features that the development team might find more important. Therefore it is plausible that some endpoints will return a `404 Not Found` response for the time being.

| Definition | Group | Support |
| :--- | :--- | :--- |
| v1 & v2.0.0 | Beacon | Full support |
| v1 & v2.0.0 | Config | Full support |
| v1 & v2.0.0 | Debug | Full support |
| v1 & v2.0.0 | Events | Full support |
| v1 & v2.0.0 | Node | Full support |
| v1 & v2.0.0 | Validator | Full support |