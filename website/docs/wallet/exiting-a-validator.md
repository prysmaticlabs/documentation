---
id: exiting-a-validator
title: Exiting a validator
sidebar_label: Exiting a validator
---

## Performing a voluntary exit

You can exit one or more validator accounts in your wallet (HD, non-HD or remote) using the following command:

```bash
./prysm.sh validator accounts-v2 exit
```

At first, you will be prompted to select one or more validator accounts that you wish to exit.

:::info
You can skip this step by passing providing the `--public-keys` flag to the command.
:::

After completing the selection, you will be presented with an additional conformation step which will require you to enter a specific passphrase to continue. The purpose of this extra security measure is to ensure that you completely understand the consequences of performing a voluntary exit on your validator. Entering the correct passphrase will initiate the exit process by submitting a voluntary exit request.

:::info
The validator client needs to establish a gRPC connection with a running beacon node in order to be able to submit a voluntary exit request. By default, it will try to access a node running on `127.0.0.1:4000`. There are several flags that you can use to modify the connection parameters.
:::

You can view all available command line flags by typing `./prysm.sh validator accounts-v2 exit --help`.

## Withdrawal delay warning

One of the main design decisions of the Ethereum 2 project is performing the roll-out of the system over several phases. This decision has a serious impact on voluntary exits. Even though validators are able to perform an exit in Phase 0 and Phase 1, they will have to wait until Phase 2 to be able to withdraw. This means their staked funds will be frozen until withdrawals are available, which should be around 2 years after Mainnet launch.

* [Learn more about phases of Ethereum 2](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-phases/)

:::caution
Make sure you understand that YOU CAN NOT WITHDRAW your staked GöETH until Phase 2. If you still wish to perform a voluntary exit, please enter the below passphrase when using `accounts-v2 exit`

**Exit my validator**
:::