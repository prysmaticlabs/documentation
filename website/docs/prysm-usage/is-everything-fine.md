---
id: is-everything-fine
title: How to tell if Prysm is running as expected 
sidebar_label: Checking if Prysm runs as expected
---

## Running the beacon node

Once you run a beacon node for the very first time, it will attempt to process deposits from the eth1 chain's deposit contract. These are all the validators that have deposited 32 ETH to join the eth2 beacon chain. This process may take a few minutes

![image](/img/processingdeposits.png)

Soon after, the beacon node will attempt to download the blockchain via its connected node peers over the Internet. This process may also take a while, depending on how long the chain has been running. As this process is occurring, your validator client connected to your beacon node will be unable to produce blocks or vote on others' blocks. Here's what a beacon node "synchronizing" looks like.

![image](/img/syncing.png)

Finally, once your beacon node is done syncing, here is what an **optimal**, properly-running beacon node looks like. This is how your node should look if everything is ok.

![image](/img/ok.png)

### Common failures

#### Lack of peers

If your beacon node is struggling to find peers, and it says something along the lines of `Waiting for enough suitable peers before syncing`, you might be suffering from connectivity problems. We put together a guide on how to diagnose network issues [here](/docs/prysm-usage/p2p-host-ip).

#### Node stuck during sync

If your node seems stuck in a loop during initial synchronization of the blockchain, a typical restart will usually resolve the problem. If the problem, persists, please get in touch with us via [Discord](https://discord.gg/hmq4y2P).

## Running the validator client

An **optimally-running** validator client should look as follows

![image](/img/validator.png)

This means your validators are properly voting and proposing blocks as expected, and earning rewards while doing so.

Your validators might also be **PENDING** activation, which means it will be a while before they are active. Here's what this would look like:

![image](/img/pending.png)

Around 4 validators are activated every 6 minutes, so you will need to wait for a while if your position is far away in the activation queue.

### Common failures

#### Everything seems fine, but my balance is going down

If your validator client is running fine without errors but you're seeing your validator balance decrease, it is typically a sign your beacon node is either (a) crashed, (b) not synced to the chain head. Check your beacon node logs to see if there are any strange errors or crashes, and please notify us. This might also mean your beacon node doesn't have any peers and is likely not connected to anyone. If this still does not resolve your issue, you can get in touch with our team on [Discord](https://discord.gg/hmq4y2P) anytime.