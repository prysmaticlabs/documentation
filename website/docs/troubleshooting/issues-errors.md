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
      <td>You see <code>Waiting for keymanager to initialize validator client with web UI...</code></td>
      <td>You'll usually see this message when your beacon node is trying to interact with a validator client instance before the beacon node is fully synced. This is a known limitation. When your beacon node is finished syncing, this message should go away. Visit <a href='../monitoring/checking-status.md'>Check Node and Validator Status</a> to learn how to check the sync status of your beacon node.</td>
    </tr>
    <tr>
      <td>Everything seems fine, but my validator balance is going down.</td>
      <td>If your validator client is running fine without errors but you're seeing your validator balance decrease, your beacon node may be experiencing issues with connectivity, stability, or synchronization. Check your beacon node logs to see if there are any errors or crashes.</td>
    </tr>
    <tr>
      <td>Can't import accounts, stuck in a loop. <code>Could not import accounts: could not write accounts: file already exists without proper 0600 permissions</code></td>
      <td>This usually happens when the account you're using doesn't have permission to read and write to the target directory. See [this GitHub issue](https://github.com/prysmaticlabs/prysm/issues/11130#issuecomment-1199984124) for a workaround.</td>
    </tr>
</table>


## Beacon node

<table>
    <tr>
      <td>Waiting for peers / peer disconnected / no active peers: <code>Waiting for enough suitable peers before syncing...</code> <code>msg="Peer disconnected" active=0</code></td>
      <td>Peers will continuously disconnect and reconnect, so don't worry about <code>Peer disconnected</code> messages. If your beacon node is struggling to find peers:
      <ul>
          <li>Your beacon node might be suffering from connectivity problems. Visit [Improve P2P connectivity](/docs/prysm-usage/p2p-host-ip) for connectivity troubleshooting guidance.</li>
          <li>Make sure that your firewall isn't restricting any **outbound** ports for Prysm.</li>
          <li>You may be using an incorrect genesis state or network flag. Every test network requires its own genesis state and network flag. Visit our [Quickstart](../install/install-with-script.md) for the latest test network parameters.</li>
      </ul>
      </td>
    </tr>
    <tr>
      <td>Stuck during sync</td>
      <td>If your node seems stuck (either doing nothing, or stuck in a loop) while syncing, a restart will usually resolve the problem. If you're on Windows, try selecting your console output window and hitting <code>ENTER</code> to "unpause" a paused console output stream.</td>
    </tr>
    <tr>
      <td>Node is currently optimistic and cannot serve validators: <code>level=error msg="Could not request attestation to sign at slot" error="rpc error: code = Unavailable desc = the node is currently optimistic and cannot serve validators" prefix=validator pubKey=0x01234 slot=65740</code></td>
      <td>
      
      This usually means that your execution client isn't yet synchronized. Visit [Check Node and Validator Status](../monitoring/checking-status.md) to learn how to check the sync status of your execution client. If your execution client is reporting that it's synchronized and you're still seeing this error, reach out to us on [Discord](https://discord.gg/prysmaticlabs).
      
      </td>
    </tr>
</table>



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