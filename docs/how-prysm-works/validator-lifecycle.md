---
id: validator-lifecycle
title: Validator lifecycle
sidebar_label: Validator lifecycle
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

This section discusses the lifecycle of a [validator](validator-clients.md) as defined by [Ethereum consensus specifications](https://github.com/ethereum/consensus-specs).

![Validator Lifecycle Diagram](/images/validator-lifecycle-electra.png)

:::info

After the Deneb hardfork
- [EIP-7514](https://eips.ethereum.org/EIPS/eip-7514): Add Max Epoch Churn Limit: reduces activations from 4 ~ 16 per epoch to 4 ~ 8 per epoch

:::

## `UNKNOWN` State
Prysm's [validator](validator-clients.md) client will report that the state of a particular validator is `UNKNOWN` when it loads validator keys that have not yet submitted a valid deposit to the [Ethereum proof-of-work chain](/terminology#eth1) [validator deposit contract](/how-prysm-works/validator-deposit-contract).

## `DEPOSITED` State
Once a valid transaction has been submitted to the [validator deposit contract](/how-prysm-works/validator-deposit-contract), your [beacon node](/how-prysm-works/beacon-node) will detect the presence of the transaction on the ETH1 chain and your [validator](validator-clients.md) client will now report being in the `DEPOSITED` state. The validator will get added to the beacon state within the next finalization period as a pending deposit. Learn about execution requestions [here](/concepts/execution-requests).

## `PENDING` State
Before a deposit can appear in the Beacon Chain, it must pass through [process_pending_deposits](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md#new-process_pending_deposits). Once processed, the depositor—if new—receives a validator index and enters the activation queue. The usual follow-distance rule still withholds deposits during the brief transition window after the Electra hard fork. However, this becomes irrelevant after a few weeks as sufficient epochs get finalized.

Only a capped number of pending deposits get handled each epoch. Because the queue also includes balance top‑ups, not every item results in a new validator. The activation churn limit is unchanged: the chain may activate 4 – 8 validators per finalized epoch, the exact number scaling with the total active‑validator count. When a validator reaches the front of the queue, it receives an activation_epoch. The validator becomes active four to five epochs later—about 31 minutes in real-time.

## `ACTIVE` State
Once the activation epoch arrives, the validator is activated and assigned responsibilities including [proposing](/terminology#propose) or [attesting](/terminology#attest) to blocks on the beacon chain. Validators receive either rewards or penalties to the initial deposit based upon their overall performance. If a validator's balance drops below 16 `ETH` (typically due to inactivity), it will be ejected. Ejections are treated the same as a voluntary exits.

## Withdrawals
Validators that have been active and have a validator index (including validators that are slashed/exited) can initiate a [BLStoExecutionChange](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/beacon-chain.md#blstoexecutionchange) request that changes its `withdrawal_credentials` which begins the withdrawal process. Once the `withdrawal_credentials` are changed withdrawals will automatically be processed at the rate of 16 per block. Fully exited validators will also be fully withdrawn once withdrawals are initiated. Learn more in our [withdrawal guide](/wallet/withdraw-validator.md).

## `EXITING` State 
An `ACTIVE` validator may request to exit by submitting a signed [VoluntaryExit](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#voluntary-exits) operation to the Ethereum network. Assuming the validator has been in the active state for the `SHARD_COMMITTEE_PERIOD`or 256 epochs ~ 27 hours plus the look ahead 4~5 epochs(~31 minutes), the validator will be assigned an exit_epoch that is determined by the length of the exiting queue. The beacon chain can process the exits of 4 ~ 16 validators per finalized epoch, the difference in the number is determined by the number of total active validators on the chain.

## `SLASHING` State
If a slashable event is included in a block while a validator is either `ACTIVE`, `EXITING`, or `EXITED`, it will briefly enter the `SLASHING` state where slashing penalties are applied, before being forcefully transitioned into the `EXITED` state. Slashed validators incur three distinct penalties:
  #### [Minimum Penalty](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#slash_validator) 
  A penalty of (1/32 * Effective Balance), issued immediately
  #### [Missed Attestation Penalties](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#rewards-and-penalties-1)
  A penalty equivalent to that incurred by an inactive validator, issued every epoch until the validator leaves the exit queue
  #### [Attack Multiplier Penalty](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#slashings)
  A penalty proportional to three times the number of other slashings in the past 8192 epochs (4 <abbr title="An eek is a period of 2048 epochs (~9.1 days), it is short for Ethereum week">eeks</abbr>, ~36 days), applied 4096 epochs (2 eeks, ~18 days) after the slashing event was first included in a block. Under normal circumstances this penalty is quite small, however in the event that a large number of slashings occur in a short time frame, this penalty can be as high as 32 `ETH`.

## `EXITED` State
In the case that the validator has reached the exited state voluntarily, the funds will become withdrawable after 256 epochs (~27 hours). If the validator was slashed, this delay is extended to 4 eeks (2048 epochs*4 or ~36 days). If a slashable event is included in a block before funds have been withdrawn, the validator will move back to the `SLASHING` state causing withdrawal delays to reset.

:::warning
Funds will not be able to be withdrawn from validators until transactions are introduced after Ethereum proof-of-stake merges with the current Ethereum chain.

:::
