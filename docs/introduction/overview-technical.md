---
id: architecture-overview
title: Architecture Overview
sidebar_label: Architecture overview
---
  This section outlines Prysm's various internal components and their role in
  the client.


## Prysm client components

When a Prysm client is initialised out of the box, it starts a variety of services that run in parallel to handle everything required for the lifecycle of the beacon chain. In no particular order, Prysm includes:

* A [**beacon node**](/docs/how-prysm-works/beacon-node) which powers the beacon chain at the core of Ethereum 2.0.
* A [**validator client**](/docs/how-prysm-works/validator-clients) connects to the beacon node and manages staking keypairs.
* A [**public RPC server**](/docs/how-prysm-works/ethereum-2-public-api) to request data about network state, blocks, validators etc.
* A [**persistent key-value store**](/docs/how-prysm-works/database-backend-boltdb) in the form of a database \([BoltDB](/docs/how-prysm-works/database-backend-boltdb)\).
* A [**P2P networking framework and server**](/docs/how-prysm-works/p2p-networking) to connect with other beacon nodes.
* **Monitoring and metrics gathering technologies** [**Grafana**](https://grafana.com/) and [**Prometheus**](https://prometheus.io) track everything. happening across beacon nodes in the network.

## Prysm client functionality

As described in [this section](ethereum-2.0), Ethereum 2.0 encompasses a distributed network of blockchains called shard chains which are coordinated by a root chain, known as a beacon chain. This beacon chain serves as a mechanism to manage a set of [Proof-of-Stake](/docs/glossaries/terminology#proof-of-stake-pos) [validators](/docs/glossaries/terminology#validator) and overall consensus across shards.

Shards themselves are similar to the current Ethereum 1.0 chain, which stores blocks containing user-generated transactions such as token transfers and smart contracts. Ethereum 2.0 provides a massive improvement over 1.0 by having 1024 of these shard chains, each with the capacity of the existing [ETH1](/docs/glossaries/terminology#eth1) blockchain.

![A visualisation of the Ethereum 2.0 protocol](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LRNnKRqTm4z1mzdDqDF%2F-LmSMDZylWZCvjkTTb2l%2F-LmSV6B3TY2O6o9LkvVZ%2F1*OQavLqTl-Oinw0bNPjw9Jg.png?alt=media&token=622f9cb2-02c2-4618-b73b-e69408f1e8c9)

As shown above, the beacon chain runs through a distributed network of nodes known as [beacon nodes](/docs/how-prysm-works/beacon-node). Participants who want to run a beacon node and help secure the network can stake 32 ETH to have their [validator client](/docs/how-prysm-works/validator-clients) join the overall pool of validators, whom have the responsibility of [proposing](/docs/glossaries/terminology#propose) and [attesting](/docs/glossaries/terminology#attest) to new blocks on the beacon chain. This deposit does not come out of nowhere however; validators transfer Ether from the [ETH1](/docs/glossaries/terminology#eth1) chain to the 2.0 system through the use of a [validator deposit contract](/docs/how-prysm-works/validator-deposit-contract).

Each of these components and their roles in the Prysm client are explained within the following sections of this documentation. If you have any questions, please stop by our [Discord](https://discord.gg/KSA7rPr).
