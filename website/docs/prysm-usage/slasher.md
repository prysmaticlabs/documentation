---
id: slasher
title: Running a slasher
sidebar_label: Running a slasher
---
This section provides instructions to run [slasher](https://github.com/prysmaticlabs/prysm/tree/master/slasher) as an **optional** process to report slashable offenses on eth2 .  If slasher detects a slashable offense, proof is sent to the [beacon-chain node](https://docs.prylabs.network/docs/how-prysm-works/beacon-node/) for inclusion in a block.  [Validators](https://docs.prylabs.network/docs/how-prysm-works/prysm-validator-client/) earn a small whistleblower reward for including this proof into a block.  

:::tip Slasher Requires Significant Disk Space
Slasher is essentially a beacon node with **superpowers**. It might use over 70Gb of disk space mainnet today, and we recommend running a slasher with more than the minimal specifications in our [installation guides](/docs/install/install-with-script) and instead running the **recommended** specifications.
:::

## What is Slashing

Slashing occurs when a validator has provably acted against the Ethereum network. Ethereum proof of stake works on a penalty-based incentive mechanism to heavily discourage actions on the network that could cause instability, malicious forking, and conflicting information from validators. Slashing doesn’t need to have malicious intent necessarily, however, as it could happen from misconfiguration as well. If a validator acts in a way that can confuse or disrupt the integrity of the system, the protocol removes, or **slashes**, a portion of the offending validators existing stake, causing a gradual loss of ETH over time until the validator is forcefully ejected and marked as SLASHED. This is **irreversible**.

The main purpose of slashing is to mitigate attacks that might be otherwise cheap to perform on the eth2 network, such as trivially creating conflicting forks of validators attesting on a different view of historical checkpoints.
A validator that correctly follows the protocol never emits a slashable vote in normal operations. Validators will not be slashed for simply being offline.

## What is a Slasher

**Slasher** is the name of software that can detect slashable events from validators and report those to the protocol. You can think of a slasher as the “police” of the network. Running a slasher is **optional**. In order to detect slashable messages, the slasher records the attesting and proposing history for every validator on the network, and cross references this history with what is broadcasted to find slashable messages such as double blocks or surrounding votes.

All the network needs is *1 honest, properly functioning slasher* to monitor the network because any slashings found are propagated to the entire network for it to be put into a block as soon as possible.

Running a slasher is not meant to be profitable. Slashing is meant to be rare and whistleblower rewards are low on purpose. Running a slasher is meant to be an *altruistic action*, and once again, only a single honest, properly functioning slasher needs to be active in the network to catch slashable offenses. Thankfully, this is a low bar to entry, and we envision quite a lot of users and entities will run slashers to ensure network security.

## Running Slasher

Running a slasher is as simple as adding the `--slasher` flag to your **beacon node**. Doing this will power up your beacon node to perform slashing detection. Slasher is very heavy on database access and disk usage, so you might see it using over 70Gb of extra storage on disk than normal on mainnet. Given slasher needs to store a lot of information about attestations and blocks happening in the network, this is to be expected.

### Whistleblower Rewards

Running a slasher can also offer some profits to your validators given certain conditions. If slasher detects a slashable condition, it will **broadcast it to the network by default**. Some lucky validator will then package this slashing proof into a block and be rewarded for doing this. You can **disable** this broadcast in Prysm using the `--disable-broadcast-slashings` option in your **beacon node**.

## Using Slasher for Advanced Slashing Protection

An alternative implementation for slashing prevention is the use of slasher itself as a middleware between your beacon node and validator client. Before a validator client submits a block or an attestation, it asks the slasher if the object is slashable first. If the check passes, the data will go through to the beacon node. This is the most advanced form of slashing protection as slasher is, ideally, aware of everything happening in the network and has recorded history of blocks and attestations for every validator.

You can enable remote slashing protection if you are running a beacon node with `--slasher` by adding the flag `--enable-external-slashing-protection` to your validator client.

## Further Reading

We recommend reading our piece on [slashing prevention tips](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) which has more detailed information about how to protect your own validator from being slashed and clarifying common misconceptions.