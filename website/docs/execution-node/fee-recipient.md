---
id: fee-recipient
title: Configure Fee Recipient 
sidebar_label: Configure Fee Recipient
---
import FeeRecipientPng from '@site/static/img/fee-recipient-ui.png'
import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="James,Mick" lastVerifiedDateString="September 5th, 2022" lastVerifiedVersionString="v3.1.0" />

:::tip Configure this before The Merge

If you don't configure your fee recipient wallet address before The Merge, your priority fee earnings will be deposited into a [burn address](https://etherscan.io/address/0x0000000000000000000000000000000000000000).

:::

**Fee Recipient** is a feature that lets you specify a priority fee recipient address on your validator client instance and beacon node. 

Your fee recipient wallet address is a **standard Ethereum wallet address**, just like the wallet address used when sending and receiving tokens from Metamask. After [The Merge](https://ethereum.org/en/upgrades/merge/), execution clients will begin depositing priority fees into this address whenever your validator client proposes a new block.

## Background

When users pay gas to submit transactions to the Ethereum network, they can specify a **priority fee**. Priority fees are like tips. End-users use priority fees to incentivize block proposers to prioritize the inclusion of particular transactions in the blocks that they propose.

Miners currently collect these priority fees. After The Merge, proof-of-work will be replaced with proof-of-stake. At this point, validators will collect these priority fees <a class="footnote" href='#footnote-1'>[1]</a>.

Priority fees are captured by execution clients in the execution layer <a class="footnote" href='#footnote-2'>[2]</a>, so validator clients need to tell execution clients where to forward the fees. This "forwarding address" is referred to as your **fee recipient** wallet address.


## Configure fee recipient

Your fee recipient wallet address can be configured on your **validator client instance** and on your **beacon node**. We recommend configuring it in both places. Your validator's configuration will override the beacon node configuration, while the beacon node configuration will be treated like a backup in the event that your validator configuration fails.


### Configure fee recipient via flags

Your fee recipient wallet address can be configured through the `--suggested-fee-recipient` flag. For example:

 - **Beacon node**: `./prysm.sh validator --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9`
 - **Validator node**: `./prysm.sh beacon-chain --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9`

If your validator is running multiple keys (for example, staking 64 ETH using two validator public keys that have been imported into a single validator client instance), all validator public keys will use the wallet address specified through the `--suggested-fee-recipient` flag. This wallet address can optionally be overridden by wallet addresses specified in a JSON/YAML file.


### Configure fee recipient via JSON/YAML (validator only)

You can assign different wallet addresses to each of your validator public keys using JSON/YAML configuration. Fee recipient address assignments specified through JSON/YAML override those configured through the `--suggested-fee-recipient` flag. This method of configuration uses the following JSON/YAML schema:


<Tabs groupId="format" defaultValue="json" values={[
        {label: 'JSON', value: 'json'},
        {label: 'YAML', value: 'yaml'}
    ]}>
  <TabItem value="json">


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


   </TabItem>
   <TabItem value="yaml">


```
---
proposer_config:
  '0x01234567155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a':
    fee_recipient: '0x012345670FCE8a85ec7055A5F8b2bE214B3DaeFd3'
  '0x0123456748ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a057816155ad77931185101128655c0191bd0214':
    fee_recipient: '0x01234567bE214B3DaeFd350155530FCE8a85ec705'
default_config:
  fee_recipient: '0x01234567c5af9B61374A128e6F85f553aF09ff89A'
```


   </TabItem>
</Tabs>

Property definitions are as follows:

 - `proposer_config`: An object containing key-value pairs, where member keys are validator public keys.
 - `0x01234567155ad77931185...`: A validator public key (98 characters long - not a wallet address) used as a key.
 - `fee_recipient`: A fee recipient wallet address.
 - `default_config`: An object containing a default fee recipient wallet address. Validator public keys not specified in `proposer_config` will use this wallet address.


The above example demonstrates configuring two 1:1 mappings between `validator public key`:`fee_recipient` and a default `fee_recipient`. In this case, the `default_config` fee recipient address would apply to all validator public keys not specified in `proposer_config`.

Tell your validator to use the JSON/YAML configuration through one of the following flags: 

 - 






















<Tabs groupId="format" defaultValue="json" values={[
        {label: 'JSON', value: 'json'},
        {label: 'YAML', value: 'yaml'}
    ]}>
  <TabItem value="json">


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
    "fee_recipient": "0x01234567c5af9B61374A128e6F85f553aF09ff89A",
    "builder": {
      "enabled": true,
      "gas_limit": "30000000"
    }
  }
}
```


   </TabItem>
   <TabItem value="yaml">


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


   </TabItem>
</Tabs>










- The existing `suggested-fee-recipient` flag must now be used with the new `enable-builder` flag. This allows your validator client to use the MEV Builder API.



We recommend configuring a fee recipient wallet address on both your validator and beacon node, even if you only have one validator public key. 


### Configuring Fee Recipient on your validator client instance

A fee recipient wallet address can be configured on your client instance by using one of the following flags in the Prysm CLI:



<br />


If you don't see any errors after issuing one of the above commands, your fee recipient address has been successfully configured.




#### Fee Recipient JSON Config File

:::warning Breaking changes
`fee-recipient-config-file` and `fee-recipient-config-url` flags are deprecated and have been replaced with `proposer-settings-file` and `proposer-settings-url` flags as of Prysm v2.1.3.
:::

If you use either `proposer-settings-file` or `proposer-settings-url` to specify your fee recipient address, your YAML/JSON configuration should follow this schema:





<br />

 JSON configuration members are listed in the following table:

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
    <strong>Type:</strong> Validator public key.  hexstring.<br /> <br /> 
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

### Configuring Fee Recipient through Web UI

<img style={{maxWidth: 700 + 'px'}} src={FeeRecipientPng} /> 

The fee recipient can also be set through the <a href='../prysm-usage/web-interface'>web UI</a> on the dashboard. The UI uses the <a href='../how-prysm-works/keymanager-api'>Key Manager APIs</a> to set the fee recipient.
 
:::warning Fee Recipient changes from UI/API don't persist on client restart

If you configure your fee recipient wallet address through the web UI or Keymanager APIs, your configuration **will not persist** if you restart your validator client.

See [this issue](https://github.com/prysmaticlabs/prysm/issues/11322) to track the status of configuration persistence, and use the `--proposer-settings-file` or `--proposer-settings-url` flags for persistent validator settings in the meantime.

:::


## Using 


------------------

Footnotes:

<strong id="footnote-1">1.</strong> The <a href='https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md#block-proposal'>Bellatrix -- Honest Validator spec</a> contains Fee Recipient implementation details pertaining to validator clients. The <a href='https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/beacon-chain.md#executionpayload'>Bellatrix -- The Beacon Chain spec</a> contains Fee Recipient implementation details pertaining to beacon nodes. <br /><br />

<strong id="footnote-1">2.</strong> See <a href='../concepts/nodes-networks'>Nodes and Networks</a> for a quick refresher on the fundamentals of Ethereum nodes. <br />


import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />
