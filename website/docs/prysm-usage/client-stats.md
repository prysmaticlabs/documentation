---
id: client-stats
title: Collect metrics with client-stats
sidebar_label: Collect metrics with client-stats
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

:::danger Alpha testing
This functionality is in its early stage alpha testing and may not be fully functional at this time. 
:::

This section provides instructions on how to run the client-stats cli utility to collect metrics from your prysm validator or beacon node processes and push them to the beaconcha.in stats service.

## Why is this a separate process?

In order to ensure that running client-stats is an intentional action on the part of the user, we have chosen to break it out into a separate executable that needs to be run on its own. It can be run on the same host as the validator and/or beacon-node, or on a separate host with access to the remote host ip and port.

:::danger Do not run a second validator
You need to run the `client-stats` executable, **not** another instance of `validator`. You could get yourself slashed if running a second instance of `validator`.
:::

## API URL
The beaconcha.in client-stats collection endpoint is authenticated via an api key embedded in the server url path. A unique identifier for the machine name can also be added to the path. When you configure your account with beaconcha.in they will give you the api key, simply replace {apikey} in the example commands below. If you do not wish to use the machine name feature, that part of the path can simply be excluded. For example, to specify a machine name:

`https://beaconcha.in/api/v1/stats/{apikey}/{machineName}`

Or without the machine name:

`https://beaconcha.in/api/v1/stats/{apikey}`

## Running client-stats

To collect metrics from your validator node, assuming that your validator is running on localhost:

`client-stats --validator-metrics-url=http://localhost:8081/metrics --clientstats-api-url=https://beaconcha.in/api/v1/stats/{apikey}/{machineName}`

To collect metrics from your beacon node, also assuming that the beacon node is running on localhost:

`client-stats --beacon-node-metrics-url=http://localhost:8080/metrics --clientstats-api-url=https://beaconcha.in/api/v1/stats/{apikey}/{machineName}`

To collect metrics from both, also assuming that the validator and beacon node are running on localhost:

`client-stats --validator-metrics-url=http://localhost:8081/metrics --beacon-node-metrics-url=http://localhost:8080/metrics --clientstats-api-url=https://beaconcha.in/api/v1/stats/{apikey}/{machineName}`

To run client-stats from `prysm.sh` or `prysm.bat`, while adjusting the parameters to `client-stats` as per the above:

`prysm.sh client-stats --validator-metrics-url=http://localhost:8081/metrics --beacon-node-metrics-url=http://localhost:8080/metrics --clientstats-api-url=https://beaconcha.in/api/v1/stats/{apikey}/{machineName}`

or

`prysm.bat client-stats --validator-metrics-url=http://localhost:8081/metrics --beacon-node-metrics-url=http://localhost:8080/metrics --clientstats-api-url=https://beaconcha.in/api/v1/stats/{apikey}/{machineName}`

> If you see an error message that "PROCESS can be beacon-chain, validator, or slasher.", you need to manually update the `prysm.sh` or `prysm.bat` file to
> its latest version, see [download instructions](https://docs.prylabs.network/docs/install/install-with-script).

# What metrics does client-stats collect?

To get a detailed picture of exactly what client-stats collects, try running the commands without a `--clientstats-api-url` argument. In this "debug" mode, client-stats will print the json messages to stdout, so you can look at exactly what data would be sent to the remote server.

import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />