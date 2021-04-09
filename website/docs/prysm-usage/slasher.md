---
id: slasher
title: Running a slasher
sidebar_label: Running a slasher
---
This section provides instructions to run [slasher](https://github.com/prysmaticlabs/prysm/tree/master/slasher) as an **optional** process to report slashable offenses on eth2 .  If slasher detects a slashable offense, proof is sent to the [beacon-chain node](https://docs.prylabs.network/docs/how-prysm-works/beacon-node/) for inclusion in a block.  [Validators](https://docs.prylabs.network/docs/how-prysm-works/prysm-validator-client/) earn a small whistleblower reward for including this proof into a block.  

:::tip Slasher Requires Significant Disk Space
Slasher is essentially a beacon node with **superpowers**. It will use over 70Gb of disk space mainnet today, and we recommend running a slasher with more than the minimal specifications in our [installation guides](/docs/install/install-with-script)
:::

## Slashable Offenses

#### Validator slashings 
 - Double voting
   - occurs when a validator signs two different beacon blocks in the same epoch
 - Surround votes
   - occurs when a validator signs two conflicting attestations  

#### Block Proposer slashings
 - occurs when a proposer broadcasts more than one block for the same slot
 
## Get Prysm and start beacon-chain
> **NOTICE:** If beacon-chain is already running, skip to step 2 

1. To begin, follow the instructions for [GNU\Linux](/docs/install/linux), [macOS](/docs/install/mac), [ARM64](/docs/install/arm), or [Windows](/docs/install/windows) to fetch and install Prysm.  The beacon-chain process should be running and fully synced before proceeding.

## Run Slasher

3. Slasher will spin up and immediately begin communicating with the beacon-chain process.

**Congratulations, you are now ready to identify and report slashable attestations and block proposals**

**Still have questions?**  Stop by our [Discord](https://discord.gg/KSA7rPr) for further assistance!
