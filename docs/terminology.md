---
id: terminology
title: Glossary
sidebar_label: Glossary
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

This page houses definitions to the various technical terms found throughout this documentation portal. See a word or phrase that should be here? Let us know!




## General terms

#### Proof-of-Stake \(PoS\)
The PoS concept states that a person can mine or validate block transactions according to how many coins they hold. This is a vastly improved iteration on Proof-of-Work \(PoW\), which relies on immense amounts of computational power to advance the state of the blockchain.

#### Execution node
Execution nodes use execution client software to process transactions and smart contracts in Ethereum's execution layer. An execution node will talk to other execution nodes via peer-to-peer networking, and to a local beacon node.

#### Beacon chain
The Beacon Chain maintains the network's state and manages the validators involved in the consensus process. It oversees the shard chains of Ethereum, which operate in parallel to the main chain, providing a more efficient and decentralized system.

#### Beacon node
Beacon nodes use beacon node client software to coordinate Ethereum's proof-of-stake consensus. A beacon node will talk to other beacon nodes via peer-to-peer networking, to a local execution node, and (optionally) to a local validator.

#### Validator
Most often refers to a [validator client](#validator-client) instance, but can also refer to an individual that is physically managing a validator client.

#### Validator client
Allows users running the software to stake `ETH`, propose and validate new blocks, earn staking rewards, and staking tips.

#### Proposal \(propose\) <a id="propose"></a>
The process of creating and adding new blocks to the beacon chain.

#### Attestation \(attest\) <a id="attest"></a>
The process of voting on the validity of newly created blocks on the beacon chain.

#### ETH1
The existing Ethereum 1.0 protocol.

#### Consensus
A protocol that governs how to choose validators to propose or validate blocks and process transactions. In cases where multiple blocks are at the head of the chain, a fork-choice mechanism selects the "heaviest" chain based on the number of validators voting for the blocks, weighted by the amount of staked ether.

#### JWT token
JSON Web Token (JWT) is an industry-standard method for decoding, verifying, and generating tokens that securely represent claims between two parties. It serves as a reliable and effective solution for ensuring secure communication.

#### Checkpoint
An endpoint that can include state and verification of the Ethereum blockchain. It allows syncing a node to be faster and takes less space than syncing from genesis.

#### Execution layer
The execution client, also referred to as the Execution Engine or EL client, listens for new transactions on the network, executes them in the Ethereum Virtual Machine (EVM), and maintains the latest state of Ethereum data.

It works together with the [Consensus layer](#consensus-layer) to track the head of the Ethereum blockchain and allow user interaction with the network.

#### Consensus layer
The consensus client, or Beacon Node, implements the proof-of-stake algorithm, allowing the network to reach agreement based on verified data from the execution client. A validator can also be added to the client, enabling a node to help secure the network.

It works together with the [Execution layer](#execution-layer) to track the head of the Ethereum blockchain and allow user interaction with the network.

#### Slasher
A slasher is software that detects slashable events from validators and reports them to the protocol, acting as the network's "police." Running a slasher is optional. It records the proposing and attesting history for each validator and cross-references this with broadcast messages to identify incidents, such as double blocks or conflicting votes.



## Technical terms

#### Canonical head block
The latest block to be proposed on a blockchain.

#### Key-value store
A data storage paradigm designed for storing, retrieving, and managing hash tables.

#### Fork choice rule
A function evaluated by the client that takes, as input, the set of blocks and other messages that have been produced, and outputs to the client what the 'canonical chain' is.


