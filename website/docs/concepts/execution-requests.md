---
id: execution-requests
title: Execution Requests
sidebar_label: Execution Requests
---

:::info

Only applicable after the Electra/Prague Hardfork

:::

# Execution Requests

Execution requests are a new feature introduced in the Electra/Prague hardfork. They allow for triggering consensus operations such as withdrawals and consolidations in addition to the existing deposit functionality directly from smart contract calls on the execution layer. Previously, these operations were only possible through calling Beacon API endpoints on the consensus layer. The execution requests currently supported through [EIP-7685](https://eips.ethereum.org/EIPS/eip-7685) include the following: deposit requests, withdrawal requests, and consolidation requests.

## Deposit Requests

These requests are used to deposit funds into the Beacon Chain for the activation of validator keys. This will continue working the same way as before the Electra/Prague hardfork. The contract address can be located at [0x00000000219ab540356cbb839cbe05303d7705fa](https://etherscan.io/address/0x00000000219ab540356cbb839cbe05303d7705fa#code). The difference post hardfork is that once deposit requests begin processing the wait time to see the deposited validator in the activation queue is reduced from over 12 hours to 13 minutes. The deposit contract can be called at the [launch pad](https://launchpad.ethereum.org/en/) or directly through a transaction. 

Read more at [EIP-6110](https://eips.ethereum.org/EIPS/eip-6110).

## Withdrawal Requests

These requests are used to withdraw validator funds from the Beacon Chain to the execution layer. A validator is able to withdraw their funds by having their withdrawal credentials set to an execution address and be fully exited. This request allows the set execution address to trigger the validator exit process, which was previously only possible through calling the [`/eth/v1/beacon/pool/bls_to_execution_changes`Beacon API endpoint on the consensus layer](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Beacon/submitPoolBLSToExecutionChange). 

Triggering the withdrawal request is done by system calling the withdrawal requests contract as a transaction or using one of the community provided resources such as: TODO

Read more at [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002).

## Consolidation Requests

These are new requests that are used to consolidate validator balances on the Beacon Chain or simply raise the max effective balance of an existing validator. Previously the max effective balance was set to 32 ETH and the request allows the validator to raise the max effective balance to 2048 ETH. This is useful for operators that want to run less validator keys on a single validator client while still allowing them to earn scaling staking rewards based on the effective balance. Validators may also want to restake their earnings and earn compounding rewards without having to redeposit their funds, this can also be done through this request. When the request is processed the validator's withdrawal credentials will be set with a new `COMPOUNDING_WITHDRAWAL_PREFIX`.

Triggering the consolidation request is done by system calling the consolidations requests contract as a transaction or using one of the community provided resources such as: TODO

Read more at [EIP-7251](https://eips.ethereum.org/EIPS/eip-7251).