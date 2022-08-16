---
id: issues-errors
title: Troubleshooting Prysm
sidebar_label: Troubleshooting
---


## Validator node

<table>
    <tr>
        <th style={{minWidth: 180 + 'px'}}>Scenario</th> 
        <th>Solution</th>
    </tr>
    <tr>
      <td><code>Waiting for keymanager to initialize validator client with web UI...</code></td>
      <td>You'll usually see this message when your beacon node is trying to interact with a validator client instance before the beacon node is fully synced. This is a known limitation. When your beacon node is finished syncing, this message should go away. Visit <a href='../monitoring/checking-status.md'>Check Node and Validator Status</a> to learn how to check the sync status of your beacon node.</td>
    </tr>
</table>


### Waiting for keymanager





### Everything seems fine, but my validator balance is going down

If your validator client is running fine without errors but you're seeing your validator balance decrease, your beacon node may be experiencing issues with connectivity, stability, or synchronization. Check your beacon node logs to see if there are any errors or crashes. 

### Can't import accounts, stuck in a loop

```
Could not import accounts: could not write accounts: file already exists without proper 0600 permissions
```

This usually happens when the account you're using doesn't have permission to read and write to the target directory. See [this GitHub issue](https://github.com/prysmaticlabs/prysm/issues/11130#issuecomment-1199984124) for a workaround.


## Beacon node

### Waiting for peers / peer disconnected / no active peers

```
Waiting for enough suitable peers before syncing
```

```
msg="Peer disconnected" active=0
```

Peers will continuously disconnect and reconnect, so don't worry about `Peer disconnected` messages. If your beacon node is struggling to find peers:

 - Your beacon node might be suffering from connectivity problems. Visit [Improve P2P connectivity](/docs/prysm-usage/p2p-host-ip) for connectivity troubleshooting guidance.
 - Make sure that your firewall isn't restricting any **outbound** ports for Prysm.
 - You may be using an incorrect genesis state or network flag. Every test network requires its own genesis state and network flag. Visit our [Quickstart](../install/install-with-script.md) for the latest test network parameters.


### Stuck during sync

If your node seems stuck in a loop while it is syncing the blockchain, a restart will usually resolve the problem.


### Node is currently optimistic and cannot serve validators

```
level=error msg="Could not request attestation to sign at slot" error="rpc error: code = Unavailable desc = the node is currently optimistic and cannot serve validators" prefix=validator pubKey=0x860f48f1a502 slot=65740
```

This usually means that your execution client isn't yet synchronized. Visit [Check Node and Validator Status](../monitoring/checking-status.md) to learn how to check the sync status of your execution client. If your execution client is reporting that it's synchronized and you're still seeing this error, reach out to us on [Discord](https://discord.gg/prysmaticlabs).


## Execution node

### Chain not synced

```
chain not synced beyond EIP-155
```

This usually means that your execution client needs more time to "catch up". If you see that your node is connected to peers and is importing data, your node is healthy. If you're still seeing this error after a few hours, let us know on [Discord](https://discord.gg/prysmaticlabs).

### Genesis not found

```
Fatal: Failed to register the Ethereum service: genesis not found in chain
```

This can happen when your execution client tries to use an old data directory. Try running


## General

### I couldn't find my issue here, or the above solutions didn't help

Feel free to reach out to us on [Discord](https://discord.gg/prysmaticlabs) and we'll help you troubleshoot.


import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />