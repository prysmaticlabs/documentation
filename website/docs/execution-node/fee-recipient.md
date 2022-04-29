---
id: fee-recipient
title: How to configure Fee Recipient on your client instance and/or beacon node
sidebar_label: How to configure Fee Recipient on your client instance and/or beacon node
doc_type: how-to
sme: james-prysm
---


# How to configure Fee Recipient on your client instance and/or beacon node

**Fee Recipient** is a feature that lets you specify a priority fee recipient address on either your validator client instance or your beacon node. After [The Merge](https://ethereum.org/en/upgrades/merge/), execution clients will begin depositing priority fees (tips) into this address whenever validator clients propose blocks.

## Background
When users pay gas to submit transactions to the Ethereum network, they can specify a **priority fee**. Priority fees are like tips. End-users use priority fees to incentivize block proposers to prioritize the inclusion of particular transactions in the blocks that they propose.

Miners currently collect these priority fees. Post-merge, proof-of-work consensus will be completely replaced with proof-of-stake consensus. At this point, validators will collect these priority fees [<a href='#footnote-1'>1</a>, <a href='#footnote-2'>2</a>].

Because priority fees are captured by execution clients in the execution layer, validator clients need to tell execution clients where to forward these priority fees. This priority fee “forwarding address” is referred to as your **fee recipient** address. This feature lets you configure that address.

:::tip Configure this before The Merge!
If you don't configure your fee recipient address before The Merge, priority fees will be deposited into a burn address (0x000....0). Be sure to specify a valid Ethereum wallet address (that you own) as the fee recipient before [The Merge]([https://ethereum.org/en/upgrades/merge/](https://ethereum.org/en/upgrades/merge/)).
:::


## Configuring Fee Recipient

Your fee recipient address can be configured in two places: directly on your **validator client instance**, and on your **beacon node**. We recommend configuring it in both places. Your validator client instance configuration will override the beacon node configuration, but the beacon node configuration will function as a fallback in the event that your client instance configuration fails.

:::warning Known Release Bug
Release 2.0.7 contains a bug that prevents you from configuring a default fee recipient on your validator client instance. This was fixed in a [recent pull request](https://github.com/prysmaticlabs/prysm/pull/10555) and is available in the `develop` branch of the [Prysm repository](https://github.com/prysmaticlabs/prysm).
:::

:::warning
An incorrectly configured fee recipient address will lead to a loss of priority fee earnings.
:::

### Configuring Fee Recipient on your validator client instance

A fee recipient address can be configured on your validator client instance by using the Prysm CLI. Use one of the following flags to specifying the address either directly within your CLI command, or by specifying the location of a JSON file that contains your fee recipient address:

<table>
  <tr>
    <th>Flag</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>suggested-fee-recipient</code></td>
    <td>
    Sets a default ETH address for all validator public keys. <br /> 
    <strong>Example</strong>: <code>-suggested-fee-recipient=0x046Fb65722E6b0000012BFEBf6177F1D2e9758D9</code> <br /> 
    <strong>Note</strong>: This setting overrides the two config options below. If you set this, the config options will be ignored.
    </td>
  </tr>
  <tr>
    <td><code>fee-recipient-config-file</code></td>
    <td>
    Sets the local file location for the fee recipient JSON configuration. <br /> 
    <strong>Example</strong>: <code>-fee-recipient-config-file=./fee_recipient_config.json</code> <br /> 
    <strong>Note</strong>: This setting overrides the two config options below. If you set this, the config options will be ignored.
    </td>
  </tr>
  <tr>
    <td>`fee-recipient-config-url`</td>
    <td>
    Sets a URL for a remote fee recipient JSON configuration.  <br /> 
    <strong>Example</strong>: <code>-fee-recipient-config-url=http://example.com/api/getFeeRecipient</code> <br /> 
    <strong>Note</strong>: JSON should be delivered as a JSON payload, not as a JSON file. Your client will issue a GET request and expects the response <code>Content-Type</code> header to be <code>application/json</code>.
    </td>
  </tr>
</table>

An example invocation: `./prysm.sh validator --suggested-fee-recipient=0x046Fb65722E6b0000012BFEBf6177F1D2e9758D9`. 

If you don't see any errors after issuing one of the above commands, your fee recipient address has been successfully configured.


#### Fee Recipient JSON Config File

If you use either `fee-recipient-config-file` or `fee-recipent-config-url` to specify your fee recipient address, your JSON configuration should follow this schema:

```
{
  "proposer_config": {
    "0xa057816155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
      "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3",
    },
    "0xac201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a057816155ad77931185101128655c0191bd0214": {
      "fee_recipient": "0x5A5F8b2bE214B3DaeFd350155530FCE8a85ec705",
    }
  },
  "default_config": {
    "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A"
  }
}
```

The above JSON demonstrates configuring two 1:1 mappings between `validator public key`:`fee_recipient` and a default `fee_recipient`. In this case, the `default_config` fee recipient address would apply to all validator public keys not specified in `proposer_config`. Details:

<table>
  <tr>
    <th>Member</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>proposer_config</code></td>
    <td>
    Optional. Your validator client instance’s public key. <br /> 
    <strong>Type:</strong> Validator public key. 98 characters long.<br /> 
    <strong>Note:</strong> Use this to map a single validator instance public key to a single fee recipient ETH address.
    </td>
  </tr>
  <tr>
    <td>`proposer_config.fee_recipient`</td>
    <td>
    Optional. Required if validator instance public key is provided via <code>proposer_config</code>.  <br /> 
    <strong>Type:</strong> ETH address. 42 characters long. <br /> 
    <strong>Note:</strong> Use this to map a single validator key to a single ETH fee recipient address.
    </td>
  </tr>
  <tr>
    <td><code>default_config</code></td>
    <td>
    Required. 
    </td>
  </tr>
  <tr>
    <td><code>default_config.fee_recipient</code></td>
    <td>
    Required.<br /> 
    <strong>Type:</strong> ETH address. 42 characters long. <br /> 
    <strong>Note:</strong> This sets the default ETH address for all remaining validator public keys that don’t have 1:1 mapping already from the <code>proposer_config</code> member.
    </td>
  </tr>
</table>


### Configuring Fee Recipient on your beacon node

A fee recipient address can be configured on your Beacon Node instance by using the `suggested-fee-recipient` flag.

:::warning This is an additive flag
When using this flag, be sure to include existing flags along with it.
:::


<table>
  <tr>
    <th>Flag</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>suggested-fee-recipient</code></td>
    <td>
    Sets a default ETH address for all validator public keys. <br /> 
    <strong>Example</strong>: <code>--suggested-fee-recipient=0x046Fb65722E6b0000012BFEBf6177F1D2e9758D9</code> <br /> 
    <strong>Note</strong>: When a fee recipient address is configured on both the validator client instance and beacon node, the validator client instance configuration will be prioritized, and the beacon node configuration will function as a fallback configuration.
    </td>
  </tr>
</table>

Note that when configuring fee recipient on your beacon node, the beacon node will cache the fee recipient address locally.



------------------

Footnotes:

<strong id="footnote-1">1.</strong> The [Bellatrix -- Honest Validator spec](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md#block-proposal) contains Fee Recipient implementation details pertaining to validator clients.
<strong id="footnote-2">2.</strong> The [Bellatrix -- The Beacon Chain spec](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/beacon-chain.md#executionpayload) contains Fee Recipient implementation details pertaining to beacon nodes.


