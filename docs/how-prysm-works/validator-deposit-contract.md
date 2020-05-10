---
id: validator-deposit-contract
title: Validator Deposit Contract
sidebar_label: Validator deposit contract
---

A **validator deposit contract** is a smart contract specifically used to submit the 32 ETH deposit required to initialise a [validator](validator-clients.md) and fully participate in the Ethereum 2.0 network.

A [validator](validator-clients.md) is queued in the full [Proof-of-Stake](/docs/terminology#proof-of-stake-pos) system once a 32 ETH deposit is made from the existing Ethereum blockchain into a **validator deposit contract** and the node has fully spun up. By ensuring that all initial deposits come from the [ETH1](/docs/terminology#eth1) chain, Ethereum 2.0 is able to leverage the security pool and value of existing Ether to secure the network upon launch. Prysm nodes automatically listen for deposit logs from this contract on the [ETH1](/docs/terminology#eth1) chain and detect when a validator is ready for activation.

For more information and current developments, see the official [Ethereum 2.0 deposit contract specification](https://github.com/ethereum/eth2.0-specs/blob/dev/specs/phase0/deposit-contract.md).
