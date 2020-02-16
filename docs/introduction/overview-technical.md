---
id: architecture-overview
title: Architecture Overview
sidebar_label: Architecture overview
---
  This section outlines Prysm's various internal components and their role in
  the client.


## Prysm client components

When a Prysm client is initialised out of the box, it starts a variety of services that run in parallel to handle everything required for the lifecycle of the beacon chain. In no particular order, Prysm includes:

* A [**beacon node**](the-beacon-chain.md) which powers the beacon chain at the core of Ethereum 2.0.
* A [**validator client**](validator-clients.md) connects to the beacon node and manages staking keypairs.
* A [**public RPC server**](ethereum-2.0-public-api.md) to request data about network state, blocks, validators etc.
* A [**persistent key-value store**](database-backend-boltdb.md) in the form of a database \([BoltDB](database-backend-boltdb.md)\).
* A [**P2P networking framework and server**](p2p-networking.md) to connect with other beacon nodes.
* **Monitoring and metrics gathering technologies** [**Grafana**](https://grafana.com/) and [**Prometheus**](https://prometheus.io) track everything. happening across beacon nodes in the network.

## Prysm client functionality

As described in [this section](../introduction/ethereum-2.0.md), Ethereum 2.0 encompasses a distributed network of blockchains called shard chains which are coordinated by a root chain, known as a beacon chain. This beacon chain serves as a mechanism to manage a set of [Proof-of-Stake](../glossaries/terminology.md#proof-of-stake-pos) [validators](../glossaries/terminology.md#validator) and overall consensus across shards.

Shards themselves are similar to the current Ethereum 1.0 chain, which stores blocks containing user-generated transactions such as token transfers and smart contracts. Ethereum 2.0 provides a massive improvement over 1.0 by having 1024 of these shard chains, each with the capacity of the existing [ETH1](../glossaries/terminology.md#eth1) blockchain.

![A visualisation of the Ethereum 2.0 protocol](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-LmSMDZylWZCvjkTTb2l%2F-LmSV6B3TY2O6o9LkvVZ%2F1*OQavLqTl-Oinw0bNPjw9Jg.png?alt=media&token=622f9cb2-02c2-4618-b73b-e69408f1e8c9)

As shown above, the beacon chain runs through a distributed network of nodes known as [beacon nodes](the-beacon-chain.md). Participants who want to run a beacon node and help secure the network can stake 32 ETH to have their [validator client](validator-clients.md) join the overall pool of validators, whom have the responsibility of [proposing](../glossaries/terminology.md#propose) and [attesting](../glossaries/terminology.md#attest) to new blocks on the beacon chain. This deposit does not come out of nowhere however; validators transfer Ether from the [ETH1](../glossaries/terminology.md#eth1) chain to the 2.0 system through the use of a [validator deposit contract](validator-deposit-contract.md).

Each of these components and their roles in the Prysm client are explained within the following sections of this documentation. If you have any questions, please stop by our [Discord](https://discord.gg/KSA7rPr).
