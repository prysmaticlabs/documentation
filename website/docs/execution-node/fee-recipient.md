---
id: fee-recipient
title: Configure Fee Recipient 
sidebar_label: Configure Fee Recipient
---
import FeeRecipientPng from '@site/static/img/fee-recipient-ui.png'
import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="James,Mick" lastVerifiedDateString="September 5th, 2022" lastVerifiedVersionString="v3.1.0" />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


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

If your validator is running multiple keys (for example, staking 64 ETH using two validator public keys that have been imported into a single validator client instance), all validator public keys will use the wallet address specified through the `--suggested-fee-recipient` flag. You can optionally associate different fee recipient wallet addresses to individual validator public keys using the JSON/YAML configuration method detailed in the following section.


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


The above example demonstrates configuring two 1:1 mappings between `validator public key`:`fee_recipient` and a default `fee_recipient`. In this case, the `default_config` fee recipient address would apply to all validator public keys not specified in `proposer_config`, and will override any wallet address specified by the `--suggested-fee-recipient` flag.

Tell your validator to use the JSON/YAML configuration through one of the following flags: 

 - `proposer-settings-file`: Points to a local JSON/YAML file. 
 - `proposer-settings-url`: Points to a remote JSON/YAML configuration endpoint in URL format. JSON should be delivered as a JSON payload, not as a JSON file. Your client will issue a GET request and expects the response <code>Content-Type</code> header to be <code>application/json</code>



### Advanced: Configuring MEV builder and gas limit

In the previous section, we reviewed a sample JSON/YAML file. The following file reveals additional properties that can optionally be included in order to configure MEV builder validator registration and gas limits:

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


New property definitions are as follows:

 - `builder`: An object containing key-value pairs related to builder configuration. Applicable only when using custom block builders. If you don't run a builder, you can ignore this.
 - `enabled`: A boolean value that determines whether or not the MEV builder validator registration is enabled. Applicable only when using custom block builders. If you don't run a builder, you can ignore this. `false` by default.
 - `gas_limit`: A gas limit. Default limit is 30M gwei - `30000000`.



### Advanced: Configuring fee recipient through the Web UI

<img style={{maxWidth: 700 + 'px'}} src={FeeRecipientPng} /> 

Your fee recipient wallet address can also be set through the <a href='../prysm-usage/web-interface'>Web UI</a> dashboard. The Web UI uses the <a href='../how-prysm-works/keymanager-api'>Key Manager APIs</a> to set the fee recipient.
 
:::warning Fee Recipient changes from UI/API don't persist on client restart

If you configure your fee recipient wallet address through the web UI or Keymanager APIs, your configuration **will not persist** if you restart your validator client.

See [this issue](https://github.com/prysmaticlabs/prysm/issues/11322) to track the status of configuration persistence, and use the `--proposer-settings-file` or `--proposer-settings-url` flags for persistent validator settings in the meantime.

:::


## Frequently asked questions

**How do I know if fee recipient was properly configured?** <br />
If you don't see any errors after issuing one of the above commands, your fee recipient address has been successfully configured.

**What happened to `fee-recipient-config-file`?** <br />
`fee-recipient-config-file` and `fee-recipient-config-url` flags are deprecated and have been replaced with `proposer-settings-file` and `proposer-settings-url` flags as of Prysm v2.1.3.

**TODO: what does this mean?** <br />
- The existing `suggested-fee-recipient` flag must now be used with the new `enable-builder` flag. This allows your validator client to use the MEV Builder API.

**TODO: when should I set my own gas_limit, and how do I know what to set?** <br />
- TODO




------------------

Footnotes:

<strong id="footnote-1">1.</strong> The <a href='https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md#block-proposal'>Bellatrix -- Honest Validator spec</a> contains Fee Recipient implementation details pertaining to validator clients. The <a href='https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/beacon-chain.md#executionpayload'>Bellatrix -- The Beacon Chain spec</a> contains Fee Recipient implementation details pertaining to beacon nodes. <br /><br />

<strong id="footnote-1">2.</strong> See <a href='../concepts/nodes-networks'>Nodes and Networks</a> for a quick refresher on the fundamentals of Ethereum nodes. <br />


import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />
