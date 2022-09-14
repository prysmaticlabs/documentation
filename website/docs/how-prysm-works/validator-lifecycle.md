---
id: validator-lifecycle
title: Validator lifecycle
sidebar_label: Validator lifecycle
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

This section discusses the  lifecycle of a [validator](validator-clients.md) as defined by [Ethereum consensus specifications](https://github.com/ethereum/consensus-specs).

![Validator Lifecycle Diagram](/img/validator-lifecycle.png)

## UNKNOWN State
Prysm's [validator](validator-clients.md) client will report that the state of a particular validator is UNKNOWN when it loads validator keys that have not yet submitted a valid deposit to the [Ethereum proof-of-work chain](/docs/terminology#eth1) [validator deposit contract](./validator-deposit-contract).

## DEPOSITED State
Once a valid transaction has been submitted to the [validator deposit contract](./validator-deposit-contract), your [beacon node](./beacon-node) will will detect the presence of the transaction on the ETH1 chain and your [validator](validator-clients.md) client will now report being in the DEPOSITED state.

## PENDING State

The specification for [processing deposits](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/validator.md#process-deposit) requires a minimum of 1024 ETH1 blocks (~4 hours) plus 32 epochs (~3.4 hours) before deposits can be processed into the Ethereum beacon chain.  The validator is then assigned an index number and placed into a queue for activation. Under normal circumstances, four validators will be activated from the queue in each finalised epoch.  Once a validator has reached the front of the queue, it is assigned an activation epoch after an additional four epochs (~25.6 minutes).

## ACTIVE State

Once the activation epoch arrives, the validator is activated and assigned responsibilities including [proposing](/docs/terminology#propose) or [attesting](/docs/terminology#attest) to blocks on the beacon chain.  Validators  receive either rewards or penalties to the initial deposit based upon their overall performance.  A validator must remain in the active state for 2048 epochs (~9 days) before it is eligible to exit.  If a validator's balance drops below 16 ETH (typically due to inactivity), it will be ejected.  Ejections are treated the same as a voluntary exits.

## EXITING State 
An ACTIVE validator may request to exit by submitting a signed [VoluntaryExit](https://github.com/ethereum/consensus-specs/blob/v0.10.0/specs/phase0/beacon-chain.md#voluntary-exits) operation to the Ethereum network. Assuming the validator has been in the active state for at least 2048 epochs (~9 days), the validator will be assigned an exit_epoch that is determined by the length of the exiting queue.  Under normal circumstances, four validators may exit in each finalised epoch.

## SLASHING State
If a slashable event is included in a block while a validator is either ACTIVE, EXITING, or EXITED, it will briefly enter the SLASHING state where slashing penalties are applied, before being forcefully transitioned into the EXITED state.  Slashed validators incur three distinct penalties:
  #### [Minimum Penalty](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#slash_validator) 
  A penalty of (1/32 * Effective Balance), issued immediately
  #### [Missed Attestation Penalties](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#rewards-and-penalties-1)
  A penalty equivalent to that incurred by an inactive validator, issued every epoch until the validator leaves the exit queue
  #### [Attack Multiplier Penalty](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#slashings)
  A penalty proportional to three times the number of other slashings in the past 8192 epochs (~36 days), applied 4096 epochs (~18 days) after the slashing event was first included in a block.  Under normal circumstances this penalty is quite small, however in the event that a large number of slashings occur in a short time frame, this penalty can be as high as 32 ETH.

## EXITED State
In the case that the validator has reached the exited state voluntarily, the funds will become withdrawable after 256 epochs (~27 hours).  If the validator was slashed, this delay is extended to 8,192 epochs (~36 days).  If a slashable event is included in a block before funds have been withdrawn, the validator will move back to the SLASHING state causing withdrawal delays to reset.
> **NOTICE:** Funds will not be able to be withdrawn from validators until transactions are introduced after Ethereum proof-of-stake merges with the current Ethereum chain


import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />