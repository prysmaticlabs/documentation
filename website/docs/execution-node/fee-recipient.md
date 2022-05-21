---
id: fee-recipient
title: Configuring a Fee Recipient Address 
sidebar_label: Configuring a Fee Recipient Address 
doc_type: how-to
sme: james-prysm
---

# Configuring a Fee Recipient Address 

<p style={{color: gray, fontSize: 11 + 'px'}}>Authors: <a href='https://twitter.com/hesatprylabs'>hesatprylabs</a>, <a href='https://twitter.com/symbolpunk'>symbolpunk</a></p>

:::caution

**This feature is currently in public preview** and may change significantly as we receive feedback from users like you. Join our [Discord server](https://discord.com/invite/XkyZSSk4My) to share your feedback.

:::


<!-- alt: ## How to configure Fee Recipient on your client instance and/or beacon node -->

**Fee Recipient** is a feature that lets you specify a priority fee recipient address on your validator client instance and beacon node. After [The Merge](https://ethereum.org/en/upgrades/merge/), execution clients will begin depositing priority fees into this address whenever your validator client proposes a new block.

## Background
<!-- this content could be pushed into a concept doc and linked to from the intro, but we don't have a clear conceptual IA yet. We can either keep this here and move later, or stash this into a developer wiki doc and then align on IA later. -->

When users pay gas to submit transactions to the Ethereum network, they can specify a **priority fee**. Priority fees are like tips. End-users use priority fees to incentivize block proposers to prioritize the inclusion of particular transactions in the blocks that they propose.

Miners currently collect these priority fees. After The Merge, proof-of-work consensus will be replaced with proof-of-stake consensus. At this point, validators will collect these priority fees [<a href='#footnote-1'>1</a>, <a href='#footnote-2'>2</a>].

Because priority fees are captured by execution clients in the execution layer, validator clients need to tell execution clients where to forward these priority fees. This priority fee “forwarding address” is referred to as your **fee recipient** address.

:::tip Configure this before The Merge
If you don't configure your fee recipient address before The Merge, your priority fee earnings will be deposited into a [burn address](https://etherscan.io/address/0x0000000000000000000000000000000000000000).
:::


## Configuring Fee Recipient

Your fee recipient address can be configured in two places: on your **validator client instance** and on your **beacon node**. We recommend configuring it in both places. Your validator client instance configuration will override the beacon node configuration, while the beacon node configuration will be treated like a backup in the event that your client instance configuration fails.

<br />

### Configuring Fee Recipient on your validator client instance

A fee recipient address can be configured on your client instance by using one of the following flags in the Prysm CLI:

<!-- I'm using HTML tables because maintaining markdown tables where cells contain multiple lines of content is unwieldy. Also note that with docusaurus, markdown doesn't render in (or even next to) HTML. -->

<!-- using ad-hoc styles to improve readability. tested on mobile. -->

<table>
  <tr>
    <th style={{minWidth: 240 + 'px'}}>Flag</th> 
    <th>Description</th>
  </tr>
  <tr>
    <td><code>suggested-fee-recipient</code></td>
    <td>
    Sets a default ETH address for all validator public keys. <br /> <br /> 
    <strong>Example</strong>: <code>--suggested-fee-recipient=0x0123456722E6b0000012BFEBf6177F1D2e9758D9</code> <br /> <br /> 
    <strong>Note</strong>: This setting overrides the two config options below. If you set this, the config options will be ignored.
    </td>
  </tr>
  <tr>
    <td><code>fee-recipient-config-file</code></td>
    <td>
    Sets the local file location for the fee recipient JSON configuration. <br /> <br /> 
    <strong>Example</strong>: <code>--fee-recipient-config-file=./fee_recipient_config.json</code> <br /> <br /> 
    <strong>Note</strong>: This setting overrides the two config options below. If you set this, the config options will be ignored.
    </td>
  </tr>
  <tr>
    <td><code>fee-recipient-config-url</code></td>
    <td>
    Sets a URL for a remote fee recipient JSON configuration.  <br /> <br /> 
    <strong>Example</strong>: <code>--fee-recipient-config-url=http://example.com/api/getFeeRecipient</code> <br /> <br /> 
    <strong>Note</strong>: JSON should be delivered as a JSON payload, not as a JSON file. Your client will issue a GET request and expects the response <code>Content-Type</code> header to be <code>application/json</code>.
    </td>
  </tr>
</table>

<br />


An example invocation: `./prysm.sh validator --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9`. 

If you don't see any errors after issuing one of the above commands, your fee recipient address has been successfully configured.

<br />

#### Fee Recipient JSON Config File

If you use either `fee-recipient-config-file` or `fee-recipent-config-url` to specify your fee recipient address, your JSON configuration should follow this schema:

```
{
  "proposer_config": {
    "0x01234567155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
      "fee_recipient": "0x012345670FCE8a85ec7055A5F8b2bE214B3DaeFd3"
    },
    "0x0123456748ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a057816155ad77931185101128655c0191bd0214": {
      "fee_recipient": "0x01234567bE214B3DaeFd350155530FCE8a85ec705"
    }
  },
  "default_config": {
    "fee_recipient": "0x01234567c5af9B61374A128e6F85f553aF09ff89A"
  }
}
```
<br />

The above JSON demonstrates configuring two 1:1 mappings between `validator public key`:`fee_recipient` and a default `fee_recipient`. In this case, the `default_config` fee recipient address would apply to all validator public keys not specified in `proposer_config`. JSON configuration members are listed in the following table:

<br />

<table>
  <tr>
    <th>Member</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>proposer_config</code></td>
    <td>
    Optional. Your validator client instance’s public key. <br /> <br /> 
    <strong>Type:</strong> Validator public key. 98 characters long.<br /> <br /> 
    <strong>Note:</strong> Use this to map a single validator instance public key to a single fee recipient ETH address.
    </td>
  </tr>
  <tr>
    <td><code>proposer_config.fee_recipient</code></td>
    <td>
    Optional. Required if validator instance public key is provided via <code>proposer_config</code>.  <br /> <br /> 
    <strong>Type:</strong> ETH address. 42 characters long. <br /> <br /> 
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
    Required.<br /> <br /> 
    <strong>Type:</strong> ETH address. 42 characters long. <br /> <br /> 
    <strong>Note:</strong> This sets the default ETH address for all remaining validator public keys that don’t have 1:1 mapping already from the <code>proposer_config</code> member.
    </td>
  </tr>
</table>

<br />


### Configuring Fee Recipient on your beacon node

A fee recipient address can be configured on your beacon node instance by using the `suggested-fee-recipient` flag.


<table>
  <tr>
    <th style={{minWidth: 240 + 'px'}}>Flag</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>suggested-fee-recipient</code></td>
    <td>
    Sets a default ETH address for all validator public keys. <br /> <br />
    <strong>Example</strong>: <code>--suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code> <br /> <br />
    <strong>Note</strong>: When a fee recipient address is configured on both the validator client instance and beacon node, the validator client instance configuration will be prioritized, and the beacon node configuration will function as a fallback configuration.
    </td>
  </tr>
</table>

<br />

Note that when configuring fee recipient on your beacon node, the beacon node will cache the fee recipient address locally.


<br />

------------------

Footnotes:

<!-- markdown links won't render alongside html elements - have to use anchors -->
<strong id="footnote-1">1.</strong> The <a href='https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md#block-proposal'>Bellatrix -- Honest Validator spec</a> contains Fee Recipient implementation details pertaining to validator clients. <br />

<strong id="footnote-2">2.</strong> The <a href='https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/beacon-chain.md#executionpayload'>Bellatrix -- The Beacon Chain spec</a> contains Fee Recipient implementation details pertaining to beacon nodes.
