---
id: keymanager-api
title: Keymanager APIs
sidebar_label: Keymanager APIs
---

Prysm supports the official [Keymanager APIs](https://github.com/ethereum/keymanager-APIs), a REST API specification for validator clients to provide an alternative to CLI commands for onboarding and offboarding their validator keys on the consensus client. 

All Prysm Validator Client APIs require the use of the `--rpc` flag. 

Please refer to the "local keystores APIs" to manage locally stored validator keys, and to the "remote keystores APIs" to manage public key settings for Web3Signer.
Go to our [Web3Signer](/docs/wallet/web3signer) docs page for more information.

## Authentication
A JWT token is needed to use the Keymanager APIs. This token is automatically generated and can be found on the second line of the `auth-token` file, located in the Prysm wallet directory. The Prysm wallet directory is defined by the `--wallet-dir` flag default or custom value, and is also displayed in the Validator Client logs at start.

The JWT token itself is directly displayed at the Validator Client start as well, in this log:


    INFO rpc: http://127.0.0.1:7500/initialize?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.ck3J6tcvHcI74IiFjyJqcBH-MmNAq-fMr0ncyZkGvFM


The token needs to be copied and set in the header of the API request:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.ck3J6tcvHcI74IiFjyJqcBH-MmNAq-fMr0ncyZkGvFM


## Other Prysm specific errors and usecases

Prysm comes with some client specific edge cases and usages. These cases will be documented on the [Keymanager API repos under flows](https://github.com/ethereum/keymanager-APIs/tree/master/flows/client-specific/prysm).


