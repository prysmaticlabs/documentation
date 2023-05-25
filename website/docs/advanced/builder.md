---
id: builder
title: Configure MEV Builder
sidebar_label: Configure MEV Builder
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="James" lastVerifiedDateString="May 18th, 2023" lastVerifiedVersionString="v4.0.2" />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BuilderPng from '@site/static/img/builder.png';

:::caution

This guide is for advanced Prysm users to configure their client for the purposes of extracting [MEV](https://ethereum.org/en/developers/docs/mev/). 
There are risks to using a builder which may result in missed rewards, missed proposals, censored transactions, omitted transactions, and even slashing when used incorrectly. The Prysm team does not provide guidance on which builders/relays are recommended but lists are available for you to make a judgement based on your own values. 

:::

The provided guide offers explanations on configuring the Prysm client to utilize a [custom builder](https://docs.flashbots.net/flashbots-mev-boost/block-builders) through a [relay](https://docs.flashbots.net/flashbots-mev-boost/relay). The relay acts as a middleware that connects validators to block builders. This configuration involves adjusting flags and settings on both the validator client and the beacon node. It's important to note that this guide does not cover setting up your own relay, builder, or MEV-boost (a middleware aggregator of relays). For detailed instructions on those components, please refer to their respective guides for up-to-date information. In the Prysm client, the builder is used through the relay to produce execution payloads containing transactions that maximize the validator's benefits, prioritizing them over the execution client. However, the execution client will still be necessary for Prysm to handle synchronization and serve as a fallback option in case any issues arise while utilizing the builder. The builder will only come into play when there is a validator proposal.

### Builder Lifecycle

1. Sign a validator registration request: This request contains validator `proposer_settings` with fields like `fee_recipient`, `gas_limit` and the current timestamp to be signed.
2. Submit signed validator registrations to the builder: call the [beacon api endpoint](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Validator/registerValidator) which calls a [build api endpoint](https://ethereum.github.io/builder-specs/#/Builder/registerValidator) on the builder for the registration. some relays will allow you to query which validators are registered currently.
3. Validator selected as a block proposer: extracting MEV will only be applicable when your validator has its turn to propose a block. 
4. Check if the builder is configured: The beacon node does a check to see if the builder is properly configured and the proposing validator is registered. You will not be able to retrieve a blinded block if you do not pass the builder configuration check.
5. Get and verify a blinded block: If the builder is configured, the beacon node will call the [builder API](https://ethereum.github.io/builder-specs/#/Builder/getHeader) to get a payload header which is used to produce the blinded block. There are several steps of verification in this process.
6. Sign the blinded block: once the blinded block passes internal validation it is signed. At this point, the validator will no longer have the power to propose a block other than the builder's block or risk being slashed as the builder holds the validator's signature. 
7. Submit the blinded block to the builder to get the full execution payload: the signed blinded block is returned to the builder via the [builder API](https://ethereum.github.io/builder-specs/#/Builder/submitBlindedBlock) for the full payload. 
8. Un-blind the block with the full payload: using the response of the builder, the blinded block can be converted into a full block with the full execution payload.
9. broadcast the full block: the full block at this point is broadcasted to the network.

Within several steps of this process whether there are failures in the validator or bad connections or bad configurations the beacon node will attempt to fall back to local execution which will connect back to a normal execution client for a proper block.

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

## 1. Validator Client: register validator

Validator `proposer-settings` will need to be configured to set through one of the following ways to `register` the validator against the builder. Having your validator registered against the builder is a requirement for using custom builders.

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

## 2. Beacon Node: connect to builder

To use a Builder the beacon node needs to start with the following configuration:

- `--http-mev-relay` flag pointed to a mev boost instance or running relay (5. Builder: connected via relay URL).

Each relay's URL will correspond to a specific network and will need to be chosen accordingly, i.e. running a beacon node on mainnet will require the mainnet relay.

### Circuit breaker

The circuit breaker is a safety feature for falling back to local execution when using a builder.
This occurs when the builder or client using the builder endpoints encounter issues which cause missed blocks. 
By default, the circuit breaker will be triggered after 3 slots are consecutively missed or 5 slots are missed in an epoch, but this can be configured through the `--max-builder-consecutive-missed-slots` and `max-builder-epoch-missed-slots` flags.

## Enable registration cache

`--enable-registration-cache` flag will enable storage of validator registrations in a cache instead of bolt db when starting the beacon node. The cache will enable the following features:
  - in memory storage of the validator registrations, this clears all validator registrations on restart.
  - validator registrations will expire after 3 epochs unless sent consistently from the validator client.
This feature solves the unintended issue of wanting some validators unregistered while maintaining mev boost on others. In the future the db used to store registrations will be removed completely and the flag will no longer be required for this feature. validator settings will be persisted on the validator client side.

:::caution

This feature is currently `not ready` for [Keymanager-API's](../how-prysm-works/keymanager-api.md) use as restarting the validator and beacon node (especially during upgrades) will clear the validator settings for validator registrations. 
Current persisted values in the db will start but will not be migrated to the cache.

:::

### Parallel Execution

`--build-block-parallel` flag on the beacon node will construct the consensus and execution portions of the beacon block in parallel to improve speed and efficiency. 

### prioritizing local blocks

`--local-block-value-boost` flag is a float64 value that provides an additional percentage to multiply local block value. Use builder block if: `builder_bid_value * 100 > local_block_value * (local-block-value-boost + 100)`. This will encourage your setup to use the local execution if the value earned is not above your threshold, helping to mitigate censorship concerns.

## 3. Is builder configured?

When a validator is proposing a block, the following is checked before attempting to use the Builder through the relay.
- `--http-mev-relay` flag was provided and is pointed to mev-boost or an active relay of the correct network
- circuit breaker is not triggered 
- validator is registered (beacon API was successfully called to save to local storage)

If all checks are satisfied then 5. Builder via Relay URL will be used to get the execution payload which contains the transactions and build a blinded block. However, if the checks do not pass then the beacon node will fall back to 4. Local Execution Client.


## 4. Local Execution Client: kept in sync and up to date

local execution clients such as `geth` or `nethermind` must continue to run as usual even while using a builder and will be used in case the builder does not pass the `Is Builder Configured?` check. The execution client should be synced and running alongside your beacon node and earnings from the block will be compared to the earnings from the builder's payload. If the local execution payload fails then the entire function will fail.

## 5. Builder: connected via relay URL

The ETHStaker community provides a list of some of the relays that can be used as well as any censorship they may have [here](https://github.com/eth-educators/ethstaker-guides/blob/main/MEV-relay-list.md). You can also run your own locally such as MEV boost but each relay on the list will have their own instructions on how to run. If running your own instead of using a provided url due to latency, you will simply need to update your `--http-mev-relay` flag on your beacon node with the appropriate url for the specific network in use. The relay will connect to a builder which connects to block searchers. 

:::info

Make sure you are using the correct version that supports the current version of the beacon node. Hard-forks will typically require updates to relays.


:::

</TabItem>
<TabItem value="remove">

## 1. Validator Client: unregister validator

Update the following configurations and restart the validator client to stop periodic registration of the validator. 
- remove the `--enable-builder` flag.
- remove all wanted references of the `builder` field from the associated file/json for the validators you no longer want to register with in the `--proposer-settings-file` and `--proposer-settings-url` flag.

### validator registration expiration

:::caution

There is currently an issue with unregistering validators in the db, it's suggested to re-register while using the `--enable-registration-cache` flag on the beacon node so that registrations can properly unregister.

:::

The registration will expire in the `cache` after `3 epochs` without a new call to the [register validator Beacon API](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Validator/registerValidator). 

## 2. Beacon Node: remove builder related flags

The following flag should be removed to disable builder use on the beacon node.
 - `--http-mev-relay` flag

:::info

The [register validator Beacon API](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Validator/registerValidator) will also stop working with the removal of the `--http-mev-relay` flag and will no longer know the url to mev-boost or the active relay.

:::

The following flags will be disabled after this flag is removed, and can optionally be removed.
 - `--max-builder-consecutive-missed-slots`
 - `--max-builder-epoch-missed-slots`
 - `--local-block-value-boost`

## 3. Is Builder Configured?

Once the appropriate flags are fully removed this check shouldn't pass and will fall back to local execution.

## 4. Local Execution Client: kept the same

The execution client can safely continue to run as is with no changes. Once the validator client and beacon node have their settings changed to local execution that is enough to set back. 

## 5. Builder: remove relay URL

removing the `--http-mev-relay` flag from the beacon node will disconnect the builder. Once removed you can safely turn off your builder related services such as your mev boost or relays.

</TabItem>
</Tabs>

## Frequently asked questions

**Q:** What are the risks of running Prysm with a custom builder instead of using local execution?

**A:** The custom builder whether connected through mev boost or as a relay url will need to be updated consistently with the Prysm adding to another layer of complexity. Depending on the relay used some rewards may be missed due to the relay's connectivity or any builder bugs. Transactions may be censored under certain conditions prior to builders being in protocol through PBS. 

**Q:** Do I need to run my execution client while using a custom builder?

**A:** Yes, the execution client will perform standard tasks and also be the fallback mechanism if the builder is not working correctly. 

**Q:** How do I recover if circuit breaker is triggered?

**A:** Once the circuit breaker is triggered local execution will continue to be used until both conditions max consecutive slots missed, and slots missed in epoch are no longer true. The beacon node does not need to be restarted.

**Q:** What happens if the execution client goes down while connected to the builder?

**A:** The earnings from the local payload will be compared to the earnings from the mev payload and will error if local execution is offline or unavailable.

**Q:** My setup is no longer using the builder, what happened?

**A:** There are multiple reasons why this could happen, including an incorrect relay URL, a relay that is offline or outdated compared to your Ethereum node setup, or a possible bug. Additionally, it's possible that the circuit breaker has been activated.

**Q:** What if the earnings from the builder are lower than the local execution?

**A:** The block from local execution will be used, this could also be triggered through `--local-block-value-boost` if the earnings from the builder don't pass some percentage threshold.
