---
id: is-everything-fine
title: Monitor Prysm for expected behavior
sidebar_label: Monitor Prysm for expected behavior
---

## Expected behavior: Beacon node

When running a beacon node for the first time, it will attempt to process deposits from the execution-layer deposit contract. This deposit contract contains 32ETH deposits from all validators that have joined Ethereum's beacon chain. This process may take a few minutes. While processing these deposits, your beacon chain output should display `INFO` logs that look like this:

```
INFO powchain: Processing deposits...
```

Soon after, the beacon node will attempt to sync with its peers. "Syncing" is the process of downloading the Ethereum blockchain. While your beacon node is syncing, any validator client(s) connected to your beacon node won't be able to produce blocks or vote on others' blocks. A syncing beacon node will produce `INFO` logs that look like this:

```
Processing block 0x8fc287271... 222/12082 - estimated time remaining...
```

When your beacon node is done syncing, you should see a continuous stream of `INFO` logs that look like this:

```
INFO blockchain: synced new block block=0x7373721...
INFO blockchain: finished appluing state transition attestations=71... 
INFO p2p: peer disconnected
INFO p2p: peer connected
```

Note that peers will be continuously disconnecting and connecting. If you notice anything concerning or have any questions, feel free to get in touch with us on [Discord](https://discord.gg/prysmaticlabs).

## Expected behavior: Validator client

Validators are generally in one of the following states: `Unknown`, `Deposited`, `Pending`, `Active`, `Exiting`, `Slashing`, or `Exited`. To learn more about these states, visit [Validator Lifecycle](../how-prysm-works/validator-lifecycle.md).

When your validator is in `Deposited` state, it will produce `INFO` logs that look like this:

```
INFO validator: Deposit processed, entering activation queue after finalization... 
```

When your validator is `Pending` activation, it will produce `INFO` logs that look like this:

```
INFO validator: Waiting to be assigned activation epoch
```

A healthy `Active` validator client will produce `INFO` logs that look like this:

```
INFO validator: Submitted new attestations...
```

If you notice anything concerning or have any questions, feel free to get in touch with us on [Discord](https://discord.gg/prysmaticlabs).
