---
id: exiting-a-validator
title: Exiting a validator
sidebar_label: Exiting a validator
---

## Performing a voluntary exit

Exiting one or more validator accounts in a wallet (HD, non-HD or remote) is possible using the following command:

```bash
./prysm.sh validator accounts voluntary-exit
```

At first, a prompt will be displayed, asking to select one or more validator accounts that should be exited.

:::info
This step can be skipped by providing the `--public-keys` flag to the command.
:::

After completing the selection, an additional conformation step will be presented, which requires entering a specific passphrase to continue. The purpose of this extra security measure is to ensure that a complete understanding of the consequences of performing a voluntary exit on a validator. Entering the correct passphrase will initiate the exit process by submitting a voluntary exit request.

:::info
The validator client needs to establish a gRPC connection with a running beacon node in order to be able to submit a voluntary exit request. By default, it will try to access a node running on `127.0.0.1:4000`. There are several flags that can be used to modify the connection parameters.
:::

All available command line flags can be inspected with `./prysm.sh validator accounts voluntary-exit --help`.

## Withdrawal delay warning

One of the main design decisions of the Ethereum 2 project is performing the roll-out of the system over several phases. This decision has a serious impact on voluntary exits. Even though validators are able to perform an exit in Phase 0 and Phase 1, they will have to wait until Phase 2 to be able to withdraw. This means their staked funds will be frozen until withdrawals are available, which should be around 2 years after Mainnet launch.

* [Learn more about phases of Ethereum 2](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-phases/)

:::caution
It is important to note that ONE CANNOT WITHDRAW their staked ETH until Phase 2 of the system. In order to perform a voluntary exit, please enter the below words when using `accounts voluntary-exit`:
:::

**Exit my validator**
