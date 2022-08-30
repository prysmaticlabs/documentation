---
id: checking-status
title: Check node and validator status
sidebar_label: Check node and validator status
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

<div class='status-guide'>

## Select a configuration 

import MultidimensionalContentControlsPartial from '@site/docs/partials/_multidimensional-content-controls-partial.md';

<MultidimensionalContentControlsPartial />

<div class='hide-tabs'>


## Status checking checklist

<div class='checklist'>
    <div class='task'>
        <div class='input-container'><input id="cl-1" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-1">Check execution node sync status</label>
            <p>TODO</p>
        </div>
    </div>
    <div class='task'>
        <div class='input-container'><input id="cl-1" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-1">Check execution node peer connectivity</label>
            <p>TODO</p>
        </div>
    </div>
        <div class='task'>
        <div class='input-container'><input id="cl-1" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-1">Check execution client version</label>
            <p>TODO</p>
        </div>
    </div>
    <div class='task'>
        <div class='input-container'><input id="cl-1" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-1">Check beacon node sync status</label>
            <p>TODO</p>
        </div>
    </div>
    <div class='task'>
        <div class='input-container'><input id="cl-1" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-1">Check beacon node peer connectivity</label>
            <p>TODO</p>
        </div>
    </div>
    <div class='task'>
        <div class='input-container'><input id="cl-1" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-1">Check beacon node version</label>
            <p>TODO</p>
        </div>
    </div>
    <div class='task'>
        <div class='input-container'><input id="cl-1" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-1">Check beacon node <> execution node connectivity</label>
            <p>TODO</p>
        </div>
    </div>
    <div class='task'>
        <div class='input-container'><input id="cl-1" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-1">Check fee recipient configuration</label>
            <p>TODO</p>
        </div>
    </div>
</div>


## Check status: Execution client

### Sync status

<Tabs groupId="execution-clients" defaultValue="geth" values={[
  {label: 'Execution client:', value: 'label'},
  {label: 'Nethermind', value: 'nethermind'},
  {label: 'Besu', value: 'besu'},
  {label: 'Geth', value: 'geth'}
  ]}>

  <TabItem value="nethermind">
    <p>You can <a href='https://docs.nethermind.io/nethermind/ethereum-client/monitoring-node-health'>check your Nethermind execution node's sync status</a> by navigating to <a href='http://localhost:8545/healthchecks-ui'><code>http://localhost:8545/healthchecks-ui</code></a> or by running the following command from a separate terminal window:</p>

```
curl localhost:8545/health
```

  <p>A sync status of <code>false</code> indicates that your node is fully synced.</p>
  </TabItem>
  <TabItem value="besu">
    <p>You can <a href='https://besu.hyperledger.org/en/stable/Reference/API-Methods/#eth_syncing'>check your Besu execution node's sync status</a> by running the following command from a separate terminal window:</p>

```
curl -H "Content-Type: application/json" -X POST http://localhost:8545 -d "{""jsonrpc"":""2.0"",""method"":""eth_syncing"",""params"":[],""id"":51}" 
```

  <p>A sync status of <code>false</code> indicates that your node is fully synced.</p>
  </TabItem>
  <TabItem value="geth">

 <p>Your Geth execution node will begin syncing. To check its sync status, issue the following commands from a separate terminal window:</p>
        <Tabs className="tabgroup-with-label" groupId="os" defaultValue="others" values={[
          {label: 'Operating system:', value: 'label'},
          {label: 'Linux, MacOS, Arm64', value: 'others'},
          {label: 'Windows', value: 'win'}
          ]}>
        <TabItem className="unclickable-element" value="label"></TabItem>
  <TabItem value="others">


```
geth attach
eth.syncing
```


  </TabItem>
  <TabItem value="win">


```
geth attach ipc:\\.\pipe\geth.ipc
eth.syncing
```


  </TabItem>
  </Tabs>
  <p>A sync status of <code>false</code> indicates that your node is fully synced.</p>
  </TabItem>
</Tabs>

### Peer connectivity

TODO


### Version

TODO


## Check status: Beacon node

### Sync status

You can check your beacon node's <a href='https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Node/getSyncingStatus'>sync status</a> by running the following command from a separate terminal window:

```
curl http://localhost:3500/eth/v1/node/syncing | jq
```

This should produce the following output:

```
{"data":{"head_slot":"6944","sync_distance":"3003133","is_syncing":true,"is_optimistic":true}}
```

When you see `"is_syncing":false`, your beacon node is fully synchronized with the beacon chain. When you see `"is_optimistic":false`, your beacon node sees that your execution node is either 1) not yet started, or 2) fully synchronized with the execution-layer blockchain.


### Peer connectivity

TODO


### Version

TODO


### Beacon node <> execution node connectivity

TODO


### Fee recipient

TODO


## Check status: Validator node

Paste your validator's public key (available in your `deposit_data-*.json` file) into a blockchain explorer to check the status of your validator:

 - [Beaconcha.in (Mainnet)](https://beaconcha.in) 
 - [Beaconcha.in (Prater)](https://prater.beaconcha.in/)
 - [Beaconcha.in (Ropsten)](https://ropsten.beaconcha.in/)


</div>

</div>

If you see unexpected output, refer to [Troubleshooting Prysm](../troubleshooting/issues-errors.md) for troubleshooting tips. Feel free to reach out to us on our [Discord](https://discord.gg/prysmaticlabs) for support.

import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />