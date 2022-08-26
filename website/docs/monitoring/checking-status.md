---
id: checking-status
title: Check node and validator status
sidebar_label: Check node and validator status
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

## Check status: Execution client

<Tabs groupId="execution-clients" defaultValue="geth" values={[
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
    <p>You can <a href='https://besu.hyperledger.org/en/stable/Reference/API-Methods/#eth_syncing'>check your Geth execution node's sync status</a> by running the following commands from a separate terminal window:</p>

```
## if you're not using Windows
geth attach

## if you're using Windows 
geth attach ipc:\\.\pipe\geth.ipc 
eth.syncing
```

  <p>A sync status of <code>false</code> indicates that your node is fully synced.</p>
  </TabItem>
</Tabs>

## Check status: Beacon node

You can check your beacon node's <a href='https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Node/getSyncingStatus'>sync status</a> by running the following command from a separate terminal window:

```
curl http://localhost:3500/eth/v1/node/syncing | jq
```

This should produce the following output:

```
{"data":{"head_slot":"6944","sync_distance":"3003133","is_syncing":true,"is_optimistic":true}}
```

When you see `"is_syncing":false`, your beacon node is fully synchronized with the beacon chain. When you see `"is_optimistic":false`, your execution node is fully synchronized with the execution-layer blockchain. 

## Check status: Validator node

Paste your validator's public key (available in your `deposit_data-*.json` file) into a blockchain explorer to check the status of your validator:

 - [Beaconcha.in (Mainnet)](https://beaconcha.in) 
 - [Beaconcha.in (Prater)](https://prater.beaconcha.in/)
 - [Beaconcha.in (Ropsten)](https://ropsten.beaconcha.in/)


import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />