---
id: on-ethereum-2
title: On Ethereum 2.0
sidebar_label: On Ethereum 2.0
---
  This section contains information about Ethereum 2.0. It is aimed at those who
  are new to the core concepts presented in the following sections of this
  documentation.

![Ethereum 2.0](/img/ethereum-2.0.png)

Ethereum 2.0 \( also known as 'Serenity'\) is the most recent iteration of the Ethereum protocol. It includes a number of new features that all aim to address the '**Scalability Trilemma**', a concept regarded as the single biggest impediment to the mass adoption of blockchain. Possibly the keystone of these updates is the introduction of **sharding**, the feature that Prysm itself is designed to leverage. These concepts are explained more in-depth below.

### What is the 'Scalability Trilemma'?

The Scalability Trilemma is a concept originally coined in 2015 by Vitalik Buterin. To put it simply: in the case of current blockchain technology, there will always be a trade-off between three fundamental properties; **decentralisation**, **scalability** and **consistency**.

[![A visual representation of the Scalability Trilemma](https://docs.ethhub.io/assets/images/dcs-triangle.png)](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/sharding/#the-scalability-trilemma)

The trilemma claims that, at most, a blockchain can only feature two of the above properties, but never all three simultaneously. This is primarily due to the fact that current blockchain networks require _every_ participating node to verify _every_ transaction processed by the chain which, while secure, is an inefficient use of the networks resources, and imposes limitations on the number of transactions that can happen at any one given time.

The Ethereum community quickly attached to this concept as the de-facto problem facing global adoption, and ideas quickly began forming to address it directly. A few years \(and many, many manhours\) later, the Ethereum 2.0 testnet was finally released.  

### How does 'sharding' work?

As stated, each node on the Ethereum 1.0 network must verify each transaction made, meaning that the networks speed has a ceiling at its collective transaction-per-second capacity. This is where sharding comes in.

Shards in the context of Ethereum 2.0 are essentially 1024 independent blockchains that operate in sync with the existing [ETH1](/docs/glossaries/terminology#eth1) chain. They communicate and coordinate both transactions and network state via a root chain -- in the case of Ethereum 2.0, this is referred to as the **beacon chain**.

As each shard chain will be able to facilitate as much traffic as the existing Ethereum 1.0 network and transactions will be processed in parallel to the 1.0 chain, sharding allows for magnitudes higher horizontal scalability potential in terms of transactions-per-second capacity. This, among other 2.0 features such as [Proof-of-Stake](/docs/glossaries/terminology#proof-of-stake-pos), will allow the Ethereum ecosystem to grow in a much more sustainable way.

For more general information on blockchains, sharding and the Ethereum protocol, check out the [external reading page](/docs/contribute/required-reading).
