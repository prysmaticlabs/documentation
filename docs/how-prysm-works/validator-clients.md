---
id: database-backend-boltdb
title: Prysm Validator Client
sidebar_label: Prysm Validator Client
---

Although [beacon nodes](the-beacon-chain.md) handle network syncronisation, drawing consensus and performing several other low-level functions, the role of [validators](../glossaries/terminology.md#validator) whom stake ETH to in order to perform block [proposals](../glossaries/terminology.md#propose) and [attestations](../glossaries/terminology.md#attest) are an equally critical component of the Ethereum 2.0 network.

As mentioned, validators have two responsibilities: to [propose](../glossaries/terminology.md#propose) \(or produce\) blocks known as beacon blocks, which contain consensus information about shards across the network, or to [attest](../glossaries/terminology.md#attest) \(or vote on\) the validity of blocks that have already been produced.

## How does it work?

A validator instance is permitted to begin participating in the network once 32 ETH is locked up in a [validator deposit contract](validator-deposit-contract.md). Validators are tasked with correctly [proposing](../glossaries/terminology.md#propose) or [attesting](../glossaries/terminology.md#attest) to blocks on the beacon chain, and receive either rewards or penalties to the initial deposit based upon their overall performance.

If validators act against the protocol, their locked up deposit will be cut in a process known as 'slashing'. Validators that are intermittently offline or do not have reliable uptime will gradually lose their deposit, eventually leaking enough to be automatically removed from the network entirely. More on this topic can be found in the [Ethereum 2.0 economics](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-economics/) outline.

## Validator client functionality

Validators are quite lightweight pieces of software and perform only a small number of tasks, though it is critical that they are performed properly. They run in a single function that effectively summarizes every step of their lifecycle succinctly.

In order of operations, the client:

1. Waits for the event log signaling a start to have occurred in the [validator deposit contract](validator-deposit-contract.md).
2. Checks if public key corresponding to the validator instance has been activated on the beacon chain.
3. A validator is assigned to a shard either as a[ proposer](../glossaries/terminology.md#proposal-propose) \(creator\) or [attester](../glossaries/terminology.md#attestation-attest) \(voter\).
4. The validator then has a ticker that works every slot \(6 seconds\). If the slot ticks at the validator's assigned slot, a beacon block is either [proposed](../glossaries/terminology.md#propose) or [attested](../glossaries/terminology.md#attest), depending on assigned role.
5. This repeats forever until the validator decides to exit the system voluntarily, or is penalized by the system for either acting maliciously or being idle when assigned tasks to perform.

As mentioned, every validator instance represents 32 ETH being staked in the network. In Prysm, this is currently the default; however, the goal is to implement support for running multiple public keys that correspond to multiple validators in a single runtime, simplifying the process of deploying several nodes for those whom want to stake more funds to help secure the network.

### Proposing a beacon block

A block proposal must include several items to meet the minimum requirements for verification by the protocol. These steps in chronological order are:

1. Fetch the [canonical head block](../glossaries/terminology.md#canonical-head-block) from the beacon node, uses its root as the parent root of the new block.
2. Fetch pending deposits which have not yet been included in the chain.
3. Fetch [ETH1](../glossaries/terminology.md#eth1) data used to vote on deposit objects.
4. Fetch pending slashings and [validator](../glossaries/terminology.md#validator) voluntary exits.
5. Fetch latest fork data from the beacon chain.
6. generate a randao reveal by [BLS](bls-signature-aggregation-and-cryptography.md) signing the epoch.
7. Fetch any pending attestations from the beacon node.
8. Construct the block object by packaging the above items into a block data structure.
9. Compute the state root hash, sign the block with the [validator](../glossaries/terminology.md#validator)'s private key.
10. Propose the block by sending it to the beacon node via [gRPC](ethereum-2.0-public-api.md).

### Attesting to a Beacon Block

Attesting to a block is a similar process to proposing, albeit with a few slightly different steps:

1. An attestation data structure is assembled and the validator's assigned shard is fetched.
2. A request is made to the beacon node for the information required to attest a block.
3. An attestation bitfield is constructed using the validator index.
4. The attestation key is then signed with a validator's secret key.
5. Halfway through the slot duration, the attestation is sent to the beacon node via [gRPC](ethereum-2.0-public-api.md).

