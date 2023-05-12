---
id: builder
title: Configure MEV Builder
sidebar_label: Configure MEV Builder
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="James" lastVerifiedDateString="May 8th, 2023" lastVerifiedVersionString="v4.0.2" />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BuilderPng from '@site/static/img/builder.png';

:::caution

This guide is for advanced Prysm Users to configure their client for the purposes of extracting MEV. 
There are risks to using a builder and may result in missed rewards, missed proposals, censored transactions, omitted transactions, and even slashing when used incorrectly. The Prysm team does not provide guidance on which builders/relays are recommended but lists are available for you to make judgement on based on your own values. 

:::

The following guide explains the options to configure the Prysm client to use a [custom builder](https://docs.flashbots.net/flashbots-mev-boost/block-builders) via a [relay](https://docs.flashbots.net/flashbots-mev-boost/relay). This configuration is accomplished through flags and settings used on the validator client as well as the beacon node, and will NOT cover how to run your own relay,builder,mev-boost. 

### Builder Lifecycle

1. Sign a validator registration request: This request contains validator `proposer_settings` with fields like `fee_recipient`,`gas_limit` and the current timestamp to be signed.
2. Submit signed validator registrations to the builder: call the [beacon api endpoint](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Validator/registerValidator) which calls a [build api endpoint](https://ethereum.github.io/builder-specs/#/Builder/registerValidator) on the builder for the registration. some builders will allow for you to query which validators are registered currently.
3. Validator selected as a block proposer: extracting MEV will only be applicable when your validator has its turn to propose a block. 
4. Check if builder is configured: The beacon node does a check to see if the builder is properly configured and the proposing validator is registered. You will not be able to retrieve a blinded block if you do not pass the builder is configured check.
5. Get and verify a blinded block: If the builder is configured the beacon node will call the [builder API](https://ethereum.github.io/builder-specs/#/Builder/getHeader) to get a payload header which is used to produce the blinded block. There are several steps of verification in this process.
6. Sign the blinded block: once the blinded block passes internal validation it is signed.
7. Submit the blinded block to the builder to get the full execution payload: the signed blinded block is returned to the builder via the [builder API](https://ethereum.github.io/builder-specs/#/Builder/submitBlindedBlock) for the full payload. At this point the validator will no longer have the power to propose a block other than the builder's block or risk being slashed as the builder holds the validator's signature. 
8. Un-blind the block with the full payload: using the response of the builder, the blinded block can be converted into a full block with the full execution payload.
9. broadcast the full block: the full block at this point broadcasted to the network.

Within several steps of this process whether there are failures in validator or bad connections or bad configurations the beacon node will attempt to fall back to local execution which will connect back to a normal execution client for a proper block.

## Builder Configuration

<img style={{maxWidth: 846 + 'px'}} src={BuilderPng} /> 

<Tabs
  groupId="configure-builder"
  defaultValue="add"
  values={[
    {label: 'Add Builder', value: 'add'},
    {label: 'Remove Builder', value: 'remove'},
  ]
}>
<TabItem value="add">

## 1. Validator Client

validator `proposer-settings` will need to be configured to set through the one of the following ways to `register` the validator against the builder. Having your validator registered against the builder is a requirement for using custom builders.

The builder can be configured through the `proposer-settings` in the following ways.
 - starting with the `--proposer-settings-file` flag providing it with an appropriate json or yaml file that includes builder settings. Guide and example on this configuration [here](../execution-node/fee-recipient.md#advanced-configure-mev-builder-and-gas-limit).
 - starting  with the `--proposer-settings-url` flag where the response includes the builder settings. Guide and example on this configuration [here](../execution-node/fee-recipient.md#advanced-configure-mev-builder-and-gas-limit).
 - starting the validator client with  `--proposer-settings-file` or `--proposer-settings-url` flag with no builder settings but providing the `--enable-builder` flag instead
 - starting with the `--suggested-fee-recipient` and `--enable-builder` flags. **note:**  `--proposer-settings-file` or `--proposer-settings-url` flags with builder settings will override values provided from `--suggested-fee-recipient` and `--enable-builder`flags.

:::info

Validators updated through the [Keymanager-API's](../how-prysm-works/keymanager-api.md) fee recipient APIs will take on the default `proposer-settings` provided.

if `--enable-builder` is provided without `--suggested-fee-recipient`, or `--proposer-settings-file`, or  `--proposer-settings-url` an error is thrown.

The validator client will use the `proposer-settings` to call the beacon node's [Beacon API](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Validator/registerValidator) which calls the builder via the [Builder API](https://ethereum.github.io/builder-specs/#/Builder/registerValidator).

Only validators that are active will be registered against the builder. Registrations for applicable validators will be pushed at the start of the validator client and at the start of each epoch. Success of the API is not guaranteed and will try again at the start of each epoch.

The beacon node must also be configured to enable builder via the `--http-mev-relay` flag.

:::

## 2. Beacon Node

To use a Builder the beacon node needs to start with the following configuration:

- `--http-mev-relay` flag pointed to an active running relay (5.Builder via Relay URL).

Each Relay's URL will correspond to a specific network and will need to be chosen accordingly. i.e. running beacon node on mainnet will require the mainnet relay.

### circuit breaker

is a safety feature for falling back to local execution when using the Builder.
This occurs when the builder or client using the builder endpoints encounter issues which cause missed blocks. 
By default the circuit breaker will be triggered after 3 slots are consecutively missed or 5 slots are missed in an epoch, but this can be configured through the `--max-builder-consecutive-missed-slots` and `max-builder-epoch-missed-slots` flags.

:::info

The beacon node should still be running with a 4.local execution client at all times in case of fall back.

:::

## Enable Registration Cache

`--enable-registration-cache` flag will enable storage of validator registrations in a cache instead of bolt db when starting the beacon node. The cache will enable the following features.
  - in memory storage of the validator registrations, this clears all vaidator registrations on restart.
  - validator registrations will expire after 3 epochs unless sent consistently from the validator client.
This feature solves the unintended issue of wanting some validators unregistered while maintaining mev boost on others. In the future the db used to store registrations will be removed completely and the flag will no longer be required for this feature. validator settings will be persisted on the validator client side.

:::caution

This feature is currently `not ready` for [Keymanager-API's](../how-prysm-works/keymanager-api.md) use as restarting the validator and beacon node (especially during upgrades) will clear the validator settings for validator registrations. 
Current persisted values in the db will start but will not be migrated to the cache.

:::

## 3. Is Builder Configured?

When a validator is proposing a block, the following is checked before attempting to use the Builder through the relay.
- `--http-mev-relay` flag was provided and is pointed to an active relay of the correct network
- circuit breaker is not triggered 
- validator is registered (beacon API was successfully called to save to local storage)

If all checks are satisfied then 5. Builder via Relay URL will be used to get the execution payload which contains the transactions and build a blinded block. However, if the checks do not pass then the beacon node will fall back to 4. Local Execution Client.


## 4. Local Execution Client

local execution clients such as `geth` or `nethermind` must continue to run as usual even while using a Builder and will be used in case the Builder does not pass the `Is Builder Configured?` check. The Execution client should be synced and running alongside your beacon node. No additional changes need to be made to the execution client.

## 5. Builder via Relay URL

TODO: example builders vs Relay

The ETHStaker community provides a list of some of the relays that can be used as well as any censorship they may have [here](https://github.com/eth-educators/ethstaker-guides/blob/main/MEV-relay-list.md). You can also run your own locally such as MEV boost but each relayer on the list will have their own instructions on how to run. If running your own instead of using a provided url due to latency, you will simple need to update your `--http-mev-relay` flag on your beacon node with the appropriate url where your 


</TabItem>
<TabItem value="remove">

## 1. Validator Client

## 2. Beacon Node

## 3. Is Builder Configured?

## 4. Local Execution Client

## 5. Builder via Relay URL

</TabItem>
</Tabs>

## Frequently asked questions

Q: What are the risks of running prysm with a custom builder instead of using local execution?

Q: Do I need to run my execution client while using a custom builder?

Q: How do I recover if circuit breaker is triggered?

Q: 