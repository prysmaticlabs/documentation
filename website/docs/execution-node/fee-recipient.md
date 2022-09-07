---
id: fee-recipient
title: Configure Fee Recipient 
sidebar_label: Configure Fee Recipient
---
import FeeRecipientPng from '@site/static/img/fee-recipient-ui.png'
import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="James,Mick" lastVerifiedDateString="September 5th, 2022" lastVerifiedVersionString="v3.1.0" />


:::caution Breaking changes

[Prysm v3.1.0](https://github.com/prysmaticlabs/prysm/releases) introduces breaking changes that may impact your Fee Recipient configuration:

- The existing `gaslimit` property within the proposer settings file has been replaced with an optional `builder` object that contains the `gaslimit` property.
- The existing `suggested-fee-recipient` flag must now be used with the new `enable-builder` flag. This allows your validator client to use the MEV Builder API.

:::

<br/>

**Fee Recipient** is a feature that lets you specify a priority fee recipient address on your validator client instance and beacon node. 

Your fee recipient wallet address is a **standard Ethereum wallet address**, just like the wallet address used when sending and receiving tokens from Metamask. After [The Merge](https://ethereum.org/en/upgrades/merge/), execution clients will begin depositing priority fees into this address whenever your validator client proposes a new block.

## Background

When users pay gas to submit transactions to the Ethereum network, they can specify a **priority fee**. Priority fees are like tips. End-users use priority fees to incentivize block proposers to prioritize the inclusion of particular transactions in the blocks that they propose.

Miners currently collect these priority fees. After The Merge, proof-of-work will be replaced with proof-of-stake. At this point, validators will collect these priority fees <a class="footnote" href='#footnote-1'>[1]</a>.

Because priority fees are captured by execution clients in the execution layer <a class="footnote" href='#footnote-2'>[2]</a>, validator clients need to tell execution clients where to forward these priority fees. This priority fee "forwarding address" is referred to as your **fee recipient** wallet address.

:::tip Configure this before The Merge
If you don't configure your fee recipient wallet address before The Merge, your priority fee earnings will be deposited into a [burn address](https://etherscan.io/address/0x0000000000000000000000000000000000000000).
:::


## Configuring Fee Recipient

Your fee recipient wallet address can be configured in two places: on your **validator client instance** and on your **beacon node**. Configuring fee recipient on your validator client instance lets you configure a different fee recipient wallet address for each validator public key.

We recommend configuring a fee recipient wallet address on both your validator and beacon node, even if you only have one validator public key. Your validator client instance configuration will override the beacon node configuration, while the beacon node configuration will be treated like a backup in the event that your client instance configuration fails.


### Configuring Fee Recipient on your validator client instance

A fee recipient wallet address can be configured on your client instance by using one of the following flags in the Prysm CLI:

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
    <strong>Note</strong>: This setting is overwritten by the flags below. If you don't configure an address using one of the flags below, this address will be mapped to each of your validator public keys.
    </td>
  </tr>
  <tr>
    <td><code>proposer-settings-file</code></td>
    <td>
    Sets the local file location for your <code>proposer-settings</code> YAML or JSON configuration. This lets you configure proposer settings like <code>fee_recipient</code> and <code>gas_limit</code> for your validator keys. This lets you override the ETH address specified by <code>suggested-fee-recipient</code> for any number of public keys. <br /> <br /> 
    <strong>Example</strong>: <code>--proposer-settings-file=./proposer_settings.json</code> 
    </td>
  </tr>
  <tr>
    <td><code>proposer-settings-url</code></td>
    <td>
    A remote <code>proposer-settings</code> configuration endpoint in URL format. This lets you override the ETH address specified by <code>suggested-fee-recipient</code> for any number of public keys. <br /> <br /> 
    <strong>Example</strong>: <code>--proposer-settings-url=http://example.com/api/getProposerSettings</code> <br /> <br /> 
    <strong>Note</strong>: JSON should be delivered as a JSON payload, not as a JSON file. Your client will issue a GET request and expects the response <code>Content-Type</code> header to be <code>application/json</code>.
    </td>
  </tr>
  <tr>
    <td><code>enable-builder</code></td>
    <td>
    This flag enables the periodic calling of Validator Registration API <a href="https://github.com/ethereum/builder-specs">(a Builder API)</a> while using the <code>suggested-fee-recipient</code> flag. <br /> <br /> 
    <strong>Example</strong>: <code>--enable-builder</code> <br /> <br /> 
    <strong>Note</strong>: this flag will not affect the proposer settings file. The proposer settings can specify builder configuration through its own fields. If you don't run a builder, you can ignore this.
    </td>
  </tr>
</table>

<br />


An example invocation: `./prysm.sh validator --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9`. 

If you don't see any errors after issuing one of the above commands, your fee recipient address has been successfully configured.




#### Fee Recipient JSON Config File

:::warning Breaking changes
`fee-recipient-config-file` and `fee-recipient-config-url` flags are deprecated and have been replaced with `proposer-settings-file` and `proposer-settings-url` flags as of Prysm v2.1.3.
:::

If you use either `proposer-settings-file` or `proposer-settings-url` to specify your fee recipient address, your YAML/JSON configuration should follow this schema:

```
---
proposer_config:
  '0x01234567155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a':
    fee_recipient: '0x012345670FCE8a85ec7055A5F8b2bE214B3DaeFd3'
    builder:
      enabled: true
      gas_limit: '30000000'
  '0x0123456748ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a057816155ad77931185101128655c0191bd0214':
    fee_recipient: '0x01234567bE214B3DaeFd350155530FCE8a85ec705'
    builder:
      enabled: true
      gas_limit: '30000000'
default_config:
  fee_recipient: '0x01234567c5af9B61374A128e6F85f553aF09ff89A'
  builder:
      enabled: true
      gas_limit: '30000000'

```

JSON example:

```
{
  "proposer_config": {
    "0x01234567155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
      "fee_recipient": "0x012345670FCE8a85ec7055A5F8b2bE214B3DaeFd3",
      "builder": {
        "enabled": true,
        "gas_limit": "30000000"
      }
    },
    "0x0123456748ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a057816155ad77931185101128655c0191bd0214": {
      "fee_recipient": "0x01234567bE214B3DaeFd350155530FCE8a85ec705",
      "builder": {
        "enabled": false,
        "gas_limit": "30000000"
      }
    }
  },
  "default_config": {
    "fee_recipient": "0x01234567c5af9B61374A128e6F85f553aF09ff89A"
    "builder": {
      "enabled": true,
      "gas_limit": "30000000"
    }
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
    <strong>Type:</strong> Validator public key. 98 characters long hexstring.<br /> <br /> 
    <strong>Note:</strong> Use this to map a single validator instance public key to a single fee recipient ETH address. <br /> <br /> 
    <strong>Example:</strong> <code>"0x01234567155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a"</code>
    </td>
  </tr>
  <tr>
    <td><code>proposer_config.fee_recipient</code></td>
    <td>
    Optional. Required if validator instance public key is provided via <code>proposer_config</code>.  <br /> <br /> 
    <strong>Type:</strong> ETH address. 42 characters long hexstring. <br /> <br /> 
    <strong>Note:</strong> Use this to map a single validator key to a single ETH fee recipient address.  <br /> <br /> 
    <strong>Example:</strong> <code>"0x012345670FCE8a85ec7055A5F8b2bE214B3DaeFd3"</code>
    </td>
  </tr>
  <tr>
    <td><code>proposer_config.builder</code></td>
    <td>
    Optional. A configuration object that contains <code>enable</code> and <code>gas_limit</code> properties.<br /> <br /> 
    <strong>Type:</strong> Object<br /> <br /> 
    <strong>Note:</strong> Applicable only when using custom block builders. If you don't run a builder, you can ignore this.
    </td>
  </tr>
  <tr>
    <td><code>..builder.enabled</code></td>
    <td>
    Optional. Sets whether or not the validator registration is enabled or not.<br /> <br /> 
    <strong>Type:</strong> bool <br /> <br /> 
    <strong>Note:</strong> Applicable only when using custom block builders. If you don't run a builder, you can ignore this.<br /> <br /> 
    <strong>Example:</strong> <code>true</code> 
    </td>
  </tr>
  <tr>
    <td><code>..builder.gas_limit</code></td>
    <td>
    Optional. Sets an upper gas limit (in gwei) for block builders.<br /> <br /> 
    <strong>Type:</strong> string(uint64) <br /> <br /> 
    <strong>Note:</strong> Applicable only when using custom block builders. If you don't run a builder, you can ignore this. Block limits can only change a fixed amount per proposal - the default limit is 30M gwei. <br /> <br /> 
    <strong>Example:</strong> <code>"35000000"</code>
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
    <strong>Type:</strong> ETH address. 42 characters long hexstring. <br /> <br /> 
    <strong>Note:</strong> This sets the default ETH address for all remaining validator public keys that don’t have 1:1 mapping already from the <code>proposer_config</code> member. <br /> <br />
    <strong>Example:</strong> <code>"0x012345670FCE8a85ec7055A5F8b2bE214B3DaeFd3"</code> 
    </td>
  </tr>
   <tr>
    <td><code>default_config.builder</code></td>
    <td>
    Optional. A configuration object that contains <code>enable</code> and <code>gas_limit</code> properties.<br /> <br /> 
    <strong>Type:</strong> Object<br /> <br /> 
    <strong>Note:</strong> Applicable only when using custom block builders. If you don't run a builder, you can ignore this.
    </td>
  </tr>
  <tr>
    <td><code>..builder.enabled</code></td>
    <td>
    Optional.<br /> <br /> 
    <strong>Type:</strong> bool <br /> <br /> 
    <strong>Note:</strong> Sets whether or not the MEV builder validator registration is enabled or not. Applicable only when using custom block builders. If you don't run a builder, you can ignore this.  <br /> <br /> 
    <strong>Example:</strong> <code>true</code> 
    </td>
  </tr>
  <tr>
    <td><code>..builder.gas_limit</code></td>
    <td>
    Optional. Sets a gas limit upper limit (in gwei) for block builders. <br /> <br /> 
    <strong>Type:</strong> string(uint64) <br /> <br /> 
    <strong>Note:</strong> Applicable only when using custom block builders. If you don't run a builder, you can ignore this. Block limits can only change a fixed amount per proposal - the default limit is 30M gwei.<br /> <br />
    <strong>Example:</strong> <code>"35000000"</code>  
    </td>
  </tr>
</table>


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

## Configuring Fee Recipient through Web UI

<img style={{maxWidth: 700 + 'px'}} src={FeeRecipientPng} /> 

The fee recipient can also be set through the <a href='../prysm-usage/web-interface'>web UI</a> on the dashboard. The UI uses the <a href='../how-prysm-works/keymanager-api'>Key Manager APIs</a> to set the fee recipient.
 
:::warning Fee Recipient changes from UI/API don't persist on client restart

If you configure your fee recipient wallet address through the web UI or Keymanager APIs, your configuration **will not persist** if you restart your validator client.

See [this issue](https://github.com/prysmaticlabs/prysm/issues/11322) to track the status of configuration persistence, and use the `--proposer-settings-file` or `--proposer-settings-url` flags for persistent validator settings in the meantime.

:::

------------------

Footnotes:

<strong id="footnote-1">1.</strong> The <a href='https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md#block-proposal'>Bellatrix -- Honest Validator spec</a> contains Fee Recipient implementation details pertaining to validator clients. The <a href='https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/beacon-chain.md#executionpayload'>Bellatrix -- The Beacon Chain spec</a> contains Fee Recipient implementation details pertaining to beacon nodes. <br /><br />

<strong id="footnote-1">2.</strong> See <a href='../concepts/nodes-networks'>Nodes and Networks</a> for a quick refresher on the fundamentals of Ethereum nodes. <br />


import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />
