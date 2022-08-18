---
id: checkpoint-sync-concept
title: "Checkpoint sync: Conceptual overview"
sidebar_label: "Checkpoint sync"
---
import CheckpointSyncPresent from '@site/static/img/checkpoint-sync-present.png';
import CheckpointSyncAbsent from '@site/static/img/checkpoint-sync-absent.png';
import NetworkPng from '@site/static/img/network.png';
import BlockchainSimplified from '@site/static/img/blockchain-simplified.png';
import ClientStackPng from '@site/static/img/client-stack.png';
import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

# Checkpoint sync: Conceptual overview

<HeaderBadgesWidget commaDelimitedContributors="Kasey,Mick,James" />

:::info Looking for the how-to?

This is a conceptual overview. See [How to sync from a checkpoint](../prysm-usage/checkpoint-sync.md) to learn how to configure checkpoint sync. 

:::

**Checkpoint sync** is a feature that significantly speeds up the initial sync between your beacon node and the Beacon Chain. With checkpoint sync configured, your beacon node will begin syncing from a recently finalized checkpoint instead of syncing from genesis. This can make installations, validator migrations, recoveries, and testnet deployments *way* faster.

This conceptual overview will help you understand how checkpoint sync works under the hood. We'll speed-run through some foundational concepts before digging into checkpoint sync.

## Foundations

### Ethereum, nodes, and networks

Ethereum is a decentralized **network** of **nodes** that communicate via peer-to-peer connections. These connections are formed by computers running Ethereum's specialized client software (like Prysm):

<img style={{maxWidth: 461 + 'px'}} src={NetworkPng} />

An Ethereum **node** is a running instance of Ethereum's client software. This software is responsible for running the Ethereum blockchain. There are two primary types of nodes in Ethereum: **execution nodes** and **beacon nodes**. Colloquially, a "node" refers to an execution node and beacon node working together:

<img src={ClientStackPng} /> 

If you're not familiar with the various types of nodes and networks that power the Ethereum ecosystem, see [Nodes and networks](nodes-networks.md) for a refresher.


### Blockchain data structure

Ethereum's "world state" is stored in a blockchain data structure. At the most rudimentary level, a blockchain is a [linked list](https://en.wikipedia.org/wiki/Linked_list) on steroids. Like a linked list, Ethereum's blockchain is a sequence of blocks that starts with a "tail" and ends at its "head". Ethereum's tail is called its **genesis block** - the first block that was ever created. Its head is referred to as the "head of the chain":

<img src={BlockchainSimplified} />

Ethereum's nodes work together to process one batch of transactions at a time. These batches are Ethereum's blocks. As users and applications submit transactions to the network, new blocks are proposed and ultimately finalized.

### Finality and checkpoints

Ethereum's nodes are responsible for broadcasting, verifying, and finalizing transactions as they're submitted by users and apps. **Finality** describes a state in which the probability of transaction reversal is near-zero. To understand how Ethereum handles finality, let's imagine that Bob wants to send Alice some ETH. In the best case scenario, Bob's transaction would flow through the following (oversimplified) transaction lifecycle:

 1. **Transaction signed**: Bob signs a transaction that moves ETH from his wallet to Alice's wallet using the private key associated with his wallet.
 2. **Transaction submitted**: Bob submits this transaction to the Ethereum network. All nodes receive it.
 3. **Proposer selected**: The Ethereum network protocol randomly selects a validator node to propose the network's next block. 
 4. **Block created**: This randomly selected block proposer verifies the legitimacy of Bob's transaction, and any other transactions it's received, before including Bob's transaction in a new block.
 5. **Block proposed**: The block proposer broadcasts this proposed new block to peer nodes.
 6. **Attesters selected**: The Ethereum network protocol randomly selects a committee of other validator nodes to attest to the legitimacy of the proposed block and the transactions it contains.
 7. **Block justified**: After a sufficient number and percentage of selected attesters nodes have attested to the legitimacy of the proposed block, the block is marked as "justified".
 8. **Block finalized**: After a sufficient number of additional blocks are justified, the block containing Bob's transaction is "finalized".

Familiarity with this lifecycle will help you appreciate the difference between **finalized blocks** and **checkpoints**. 


### Peer-to-peer synchronization

When Ethereum's nodes first come online, they ask other peer nodes to provide 



## Checkpoint sync

### Syncing without checkpoint sync

Beacon nodes maintain a local copy of the Ethereum's [Beacon Chain](https://ethereum.org/en/upgrades/beacon-chain/). When you tell Prysm's beacon node to start running for the first time, Prysm will fetch the very first Beacon Chain block (the Beacon Chain's [genesis block](https://beaconscan.com/slots?epoch=0)). Your beacon node will then "replay" the history of the Beacon Chain, fetching the oldest blocks from peers until the entire chain has been downloaded:

<img src={CheckpointSyncAbsent} /> 

This sync process can take a very long time - on the magnitude of days to weeks. 

## Syncing with checkpoint sync

Checkpoint sync speeds things up by telling your beacon node to sync from a recently finalized checkpoint, allowing it to skip over the majority of the Beacon Chain's history:

<img src={CheckpointSyncPresent} /> 

Note that currently, Prysm's implementation syncs forward-only. The process of syncing backwards towards the genesis block is called "backfilling", and will be supported in a future Prysm release. Backfilling isn't required to run a validator - it's only required if you want to run an archive node, serve peer node requests, or query chain history through your local beacon node.


<RequestUpdateWidget />