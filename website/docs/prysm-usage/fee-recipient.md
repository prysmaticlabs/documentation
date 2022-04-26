---
id: fee-recipient
title: Fee Recipient
sidebar_label: fee recipient
---

# Fee Recipient

Validators don't currently receive any portion of the transaction fees paid by end-users when proposing new blocks.

**Fee Recipient** is a new feature that addresses this. With Fee Recipient configured, validators will receive a portion of transaction fees when proposing blocks. These gas fees are sometimes referred to as inclusion rewards.

This document shows you how to configure Fee Recipient on your validator client instance. 

:::tip Post-Merge
This feature will activate after [The Merge](https://ethereum.org/en/upgrades/merge/).
:::

:::warning Known Release Bug
Setting a default fee recipient through the validator client is currently not working in the upcoming branch a fix was created and merged into develop for the following release. please refer to [#10555](https://github.com/prysmaticlabs/prysm/pull/10555)
:::

:::warning Incorrectly configured Fee Recipient settings could lead to a loss of earnings.

To ensure that your Fee Recipient settings are correctly configured, ___________________.

If you don't configure your Fee Recipient settings, the Fee Recipient address will default to the burn address (`0x000....0`). Be sure to specify a valid Ethereum wallet address (that you own) as the fee recipient. 

:::

## New Flags


## Validator Client
- `suggested-fee-recipient` to set default eth address for ALL validators.
( i.e. --suggested-fee-recipient=0x046Fb65722E6b0000012BFEBf6177F1D2e9758D9)
- `fee-recipient-config-file` to set file location for fee recipient json. 
( i.e. --fee-recipient-config-file=./fee_recipient_config.json)
- `fee-recipient-config-url` to set URL for fee recipient json.
( i.e. --fee-recipient-config-url=http://example.com/api/getFeeRecipient)

suggested fee recipient flag will override the configuration file.

you can not use both the file and url flags at the same time.

the validator client will send the fee recipient information at startup for all public keys that are active
as well as when the public key becomes active. It does this by calling the beacon api `prepareBeaconProposer`

### Fee Recipient Config File based on Teku Implementation
JSON file for defining validator public key to eth address
This will allow you to map your validators to corresponding eth addresses or generally cover the remaining keys with a default.

```
{
  "proposer_config": {
    "0xa057816155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
      "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3",
    }
  },
  "default_config": {
    "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A"
  }
}
```
- `proposer_config` is optional
- `default_config` is mandatory
- `fee_recipient` is mandatory in each config


## Beacon Node
- `suggested-fee-recipient` to set default eth address from validator client cli 
( i.e. --suggested-fee-recipient=0x046Fb65722E6b0000012BFEBf6177F1D2e9758D9)

this sets the fall back default fee recipient on the beacon node if the validator restarts without fee recipient flags set

The beacon node will cache fee recipient information locally to be persistent.

### No Flags
by default Prysm uses the eth burn address (0x0000...) 
