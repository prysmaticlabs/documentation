---
id: beacon_node_api
title: Beacon node for API access
sidebar_label: Beacon node for API access
---

## Using the Beacon node as a Blockchain API

The title of this document could be considered a little ambiguous, but it is appropriate. The beacon chain is the coordinator of the Ethereum 2.0 network, responsible for creating new blocks, ensuring the blocks are valid and then rewarding, or penalizing, validators for their actions. 

This responsibility gives the beacon node full visibility of actions performed on the blockchain, as such, it can be used as a retrospective API in order to query chain information.  Whilst this could be considered analogous to log analysis, unlike in log analysis, previous states, that have not had full data stored locally for review can be requested, then fetched retrospectively and queried.

By default, the Prysm beacon node saves the state of the chain locally in a database every 32 slots. For clarity, a slot is every 12 seconds and 32 slots make an epoch. Hence the beacon node, by default, saves the state on a per epoch basis. Should more detailed information on historical slots be required these can be requested retrospectively, however, there will be a time delay whilst the data is requested and retrieved. 

:::tip Aditional storage will be required
In addition to having to download the slot/epoch data there will be an increased local storage requirement, potentially by a multiple of 32 should all data be requested. 
:::


The approximate difference in storage requirements are as follows; the default setting will store one state per epoch, each being ~ 1Mb (or more) of data, setting the beacon node to capture all slots per epoch will increase the storage requirements to ~ 32Mb (or more) per epoch. 

## Rationale

Whilst the default setting is more than adequate for normal use it is not optimized for users who query the API multiple times per slot or require historical data not available within the currently saved state. In order to avoid the delays outlined above when retrieving data, the beacon node can be configured to save the state for each slot. 

**This will significantly improve performance for users creating multiple requests of local beacon nodes.**  

## Beacon chain API information  

Full details of the Ethereum 2.0 API are available here: 

The Prysm documenation portal [Ethereum 2.0 public API] (https://docs.prylabs.network/docs/how-prysm-works/ethereum-2-public-api)

The Prysm github [ethereumapis page] (https://github.com/prysmaticlabs/ethereumapis/blob/master/eth/v1alpha1/beacon_chain.proto#L36) 

## Command line/Configuration file usage:

Setting the beacon node to save the state for each slot can be done both on the command line and through the configuration file as outlined below.  


**Using Linux/MacOS based systems**

```sh
./prysm.sh beacon-chain --slots-per-archive-point=1 
```

**Using Windows based systems**

```sh
prysm.bat beacon-chain --slots-per-archive-point=1
```
**Using the Configuration file:**

If you are running Prysm and specifying command line flags via a configuration file such as ***/home/beacon/config.yaml*** on Linux or MacOS or ***c:\prysm\beacon\config.yaml*** on Windows, you can add the following to that file:



```sh
slots-per-archive-point: 1 
```

