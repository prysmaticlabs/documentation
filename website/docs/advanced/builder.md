---
id: builder
title: MEV builder usage
sidebar_label:  MEV builder usage
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="James" lastVerifiedDateString="May 8th, 2023" lastVerifiedVersionString="v4.0.2" />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BuilderPng from '@site/static/img/builder.png';

:::caution
This guide is for advanced Prysm Users and there are risks with using a Custom Builder


:::

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
 - starting with the `proposer-settings-file` flag providing it with an appropriate json or yaml file that includes builder settings. Guide and example on this configuration [here](../execution-node/fee-recipient.md#advanced-configure-mev-builder-and-gas-limit).
 - starting  with the `proposer-settings-url` flag where the response includes the builder settings. Guide and example on this configuration [here](../execution-node/fee-recipient.md#advanced-configure-mev-builder-and-gas-limit).
 - starting the validator client with  `proposer-settings-file` or `proposer-settings-url` flag with no builder settings but providing the `enable-builder` flag instead
 - starting with the `suggested-fee-recipient` and `enable-builder` flags.

 Validators updated through the [Keymanager-API's](../how-prysm-works/keymanager-api.md) fee recipient APIs will take on the default `proposer-settings` provided.

 

 

## 2. Beacon Node

## 3. Is Builder Configured?

## 4. Local Execution Client

## 5. Custom Builder via Relay URL

</TabItem>
<TabItem value="remove">

## 1. Validator Client



## 2. Beacon Node

## 3. Is Builder Configured?



## 4. Local Execution Client

## 5. Custom Builder via Relay URL

</TabItem>
</Tabs>

## Warning - potential side effects

## Frequently asked questions

## Glossary