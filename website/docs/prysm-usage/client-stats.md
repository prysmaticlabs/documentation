---
id: client-stats
title: Using client-stats to collect beaconcha.in metrics
sidebar_label: using client-stats
---
This section provides instructions on how to run the client-stats cli utility to collect metrics from your prysm validator or beacon node processes and push them to the beaconcha.in stats service.

## Why is this a separate process?

In order to ensure that running client-stats is an intentional action on the part of the user, we have chosen to break it out into a separate executable that needs to be run on its own. It can be run on the same host as the validator and/or beacon-node, or on a separate host with access to the remote host ip and port.

## API URL
The beaconcha.in client-stats collection endpoint is authenticated via an api key embedded in the server url path. A unique identifier for the machine name can also be added to the path. When you configure your account with beaconcha.in they will give you the api key, simply replace {api-key} in the example commands below. If you do not wish to use the machine name feature, that part of the path can simply be excluded. For example, to specify a machine name:

`https://beaconcha.in/api/v1/stats/{apikey}/{machineName}`

Or without the machine name:

`https://beaconcha.in/api/v1/stats/{machineName}`

## Running client-stats

To collect metrics from your validator node, assuming that your validator is running on localhost:
`client-stats --validator-metrics-url=http://localhost:8081/metrics --clientstats-api-url=https://beaconcha.in/api/v1/stats/{apikey}/{machineName}`

To collect metrics from your beacon node, also assuming that the beacon node is running on localhost:
`client-stats --beacon-node-metrics-url=http://localhost:8080/metrics --clientstats-api-url=https://beaconcha.in/api/v1/stats/{apikey}/{machineName}`

# What metrics does client-stats collect?

To get a detailed picture of exactly what client-stats collects, try running the commands without a `--clientstats-api-url` argument. In this "debug" mode, client-stats will print the json messages to stdout, so you can look at exactly what data would be sent to the remote server.
