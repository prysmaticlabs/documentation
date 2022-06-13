---
id: issues-errors
title: How to resolve issues and errors
sidebar_label: Issues and Errors
---

### Beacon node waiting for peers

```
Waiting for enough suitable peers before syncing

msg="Peer disconnected" active=0
```

Troubleshooting tips:

 - Your beacon node might be suffering from connectivity problems. Visit [Improve P2P connectivity](/docs/prysm-usage/p2p-host-ip) for connectivity troubleshooting guidance.
 - You may be using an incorrect genesis state or network flag. Every test network requires its own genesis state and network flag. Visit our [Quickstart](../install/install-with-script.md) for the latest test network parameters.


### Beacon node stuck during sync

If your node seems stuck in a loop while it is syncing the blockchain, a restart will usually resolve the problem.


### Validator client waiting for keymanager

```
Waiting for keymanager to initialize validator client with web UI...
```

You'll usually see this message when your beacon node is trying to interact with a validator client before the beacon node is fully synced. This is a known limitation. When your beacon node is finished syncing, this message should go away. Visit [Check Node and Validator Status](../monitoring/checking-status.md) to learn how to check the sync status of your beacon node. If your beacon node is reporting that it's synchronized and you're still seeing this message, reach out to us on [Discord](https://discord.gg/prysmaticlabs) and we'll help you troubleshoot.


### Node is currently optimistic and cannot serve validators

```
level=error msg="Could not request attestation to sign at slot" error="rpc error: code = Unavailable desc = the node is currently optimistic and cannot serve validators" prefix=validator pubKey=0x860f48f1a502 slot=65740
```

This usually means that your execution client isn't yet synchronized. Visit [Check Node and Validator Status](../monitoring/checking-status.md) to learn how to check the sync status of your execution client. If your execution client is reporting that it's synchronized and you're still seeing this error, reach out to us on [Discord](https://discord.gg/prysmaticlabs).


### Everything seems fine, but my validator balance is going down

If your validator client is running fine without errors but you're seeing your validator balance decrease, your beacon node may be experiencing issues with connectivity, stability, or synchronization. Check your beacon node logs to see if there are any errors or crashes. 

### I couldn't find my issue here, or the above solutions didn't help

Feel free to reach out to us on [Discord](https://discord.gg/prysmaticlabs) and we'll help you troubleshoot.