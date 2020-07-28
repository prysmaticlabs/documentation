---
id: parameters
title: Available parameters
sidebar_label: Available parameters
---

This section lists the various flags used to customise the startup process of beacon nodes and validator clients.

  > **Fun tip:** You can use the `--graffiti` validator flag to add a string to your proposed blocks, which will be seen on the block explorer. I.e; `<startup command> --graffiti "Prysm is awesome!"`

## Loading parameters via .YAML file

> **NOTICE:** Loading parameters via .YAML file is optional.

Prysm now supports loading flag values from a specified `.yaml` file. Defining parameters in this way cuts back on terminal clutter and allows unique startup profiles to be saved independently.

The below steps show how place a common Prysm flag into a YAML file and how to specify it at start up.

### GNU\Linux, Mac, ARM64
1. In your Prysm working directory, create a `.yaml` file and open it in a text editor.

2. Add the following lines to the file before closing and saving:
```sh
datadir: '/data'
```

3. Start the Prysm beacon chain as normal, while specifying the location of the `.yaml` like so:
```sh
./prysm.sh beacon-chain --config-file=/path/to/file.yaml
```
or for a validator like so:
```sh
./prysm.sh validator --config-file=/path/to/file.yaml
```

### Windows
1. In your Prysm working directory, create a `.yaml` file and open it in a text editor.

2. Add the following lines to the file before closing and saving:
```sh
datadir: 'c:\prysm'
```

3. Start the Prysm beacon chain as normal, while specifying the location of the `.yaml` like so:
```sh
.\prysm.bat beacon-chain --config-file=c:\path\to\file.yaml
```
or for a validator like so:
```sh
.\prysm.bat validator --config-file=c:\path\to\file.yaml
```

It is possible to provide additional flags alongside the `.yaml` file, though if there is conflicts, the `.yaml` file will take priority. For example, if the flag `--datadir=/data2` is specified and `datadir: "/data1"` is in the `.yaml` file, Prysm would prioritise writing to `/data1`.

## Shared flags

These flags are shared by both the beacon node and validator client.


| Flag          | Usage         |
| ------------- |:-------------|
| `--config-file` | Allows user to specifying the location of a `.yaml` config file with flag values.
| `--verbosity`     | Logging verbosity (trace, debug, info=default, warn, error, fatal, panic).
| `--datadir [path]`     | Allows user to specify a data directory for the databases and keystore.
| `--enable-tracing` | Enables request tracing.
| `--tracing-endpoint` | Tracing endpoint defines where beacon chain traces are exposed. Default: http://127.0.0.1:14268/api/traces
| `--tracing-process-name` | The name to apply to tracing tag \"process_name\"
| `--trace-sample-fraction` | Indicate what fraction of P@P messages are sampled for tracing. Default: 0.20
| `--disable-monitoring` | Disable all monitoring service.
| `--monitoring-port` | Port used by prometheus for listening and responding to messages. Default: 8080
| `--no-discovery` | Enable only local network P2P and do not connect to cloud bootstrap nodes.
| `--peer` | Connect with a specified peer. This flag may be used multiple times.
| `--bootstrap-node` | The address of bootstrap node. Beacon node will connect for peer discovery via DHT.  Multiple nodes can be separated with a comma. Default:
| `--relay-node ` | The address of relay node. The beacon node will connect to the relay node and advertise their address via the relay node to other peers.
| `--p2p-udp-port ` | The port used by discv5. Default: 12000
| `--p2p-tcp-port` | The port used by libP2P. Default: 13000
| `--p2p-local-ip` | The local ip address to listen for incoming data.
| `--p2p-host-ip` |  The IP address advertised by libp2p. This may be used to advertise a public IP.
| `--p2p-host-dns` | The DNS address advertised by libp2p. This may be used to advertise an external DNS.
| `--p2p-max-peers` | The max number of p2p peers to maintain. Default: 30
| `--p2p-whitelist` | The CIDR subnet for whitelisting peer connections. Example: 192.168.0.0/16 would whitelist connections to peers on your local network only. The default is to accept all connections.
| `--p2p-encoding` | The encoding format of messages sent over the wire. The default is 0, which represents ssz.
| `--force-clear-db` | Clear any previously stored data at the data directory.
| `--clear-db` | Prompt for clearing any previously stored data at the data directory.
| `--log-format` | Specify log formatting. Supports: text, json, fluentd.
| `--log-file` | Specify log file name, relative or absolute.
| `--max-goroutines` | Specifies the upper limit of goroutines running before a status check fails. Default: 5000
| `--enable-upnp` | Enable the service (Beacon chain or Validator) to use UPnP when possible.

## Beacon node parameters
These flags are specific to launching the beacon node.
### Base flags
| Flag        | Usage           |
| ------------- |:-------------|
| `--no-custom-config` | Run the beacon chain with the real Phase 0 parameters.
| `--http-web3provider` | Define a mainchain web3 provider string http endpoint. Default:  https://goerli.prylabs.net
| `--web3provider` | Define a mainchain web3 provider string endpoint. Can be either a IPC file string or a WebSocket endpoint. Cannot be an HTTP endpoint. Default: wss://goerli.prylabs.net/websocket
| `--deposit-contract` |Define a deposit contract address. Beacon chain node will listen logs coming from the deposit contract to determine when validator is eligible to participate.
| `--rpc-host` | Define an address of the host on which the RPC server should listen. Default: 0.0.0.0
| `--rpc-port` | Define a RPC port to be exposed by the beacon node. >Value: 4000
| `--rpc-max-page-size` | Define the max number of items returned per page in RPC responses for paginated endpoints. Default: 500
| `--tls-cert` |Certificate for secure gRPC. Pass this and the tls-key flag in order to use gRPC securely.
| `--tls-key` | Key for secure gRPC. Pass this and the tls-cert flag in order to use gRPC securely.
| `--grpc-gateway-host` | Enable gRPC gateway for JSON requests. Default: 127.0.0.1
| `--grpc-gateway-port` | Enable gRPC gateway for JSON requests. Default: 3500
| `--min-sync-peers` | The required number of valid peers to connect with before syncing."
| `--contract-deployment-block` | Define the ETH1 block in which the deposit contract was deployed. Default: 1960177
| `--slasher-tls-cert` | Certificate for secure slasher gRPC connection. Pass this in order to use slasher gRPC securely.
| `--slasher-provider` | Define a slasher provider string endpoint. Can either be an gRPC server endpoint. Default: 127.0.0.1:5000
### Interop flags
| Flag          | Usage         |
| ------------- |:-------------|
|`--interop-genesis-state` | The genesis state file (.SSZ) to load from.
|`--interop-eth1data-votes` | Enable mocking of eth1 data votes for proposers to package into blocks.
|`--interop-genesis-time` | Specify the genesis time for interop genesis state generation. Must be used with `--interop-num-validators`.
|`--interop-num-validators` | Specify number of genesis validators to generate for interop. Must be used with `--interop-genesis-time`.

## Validator parameters
These flags are specific to launching a validator client.
### Base flags
| Flag          | Usage         |
| ------------- |:-------------|
|`--no-custom-config` | Run the beacon chain with the real parameters from phase 0.
|`--beacon-rpc-provider` | Beacon node RPC provider endpoint. Default: localhost:4000
|`--tls-cert` | Certificate for secure gRPC. Pass this and the tls-key flag in order to use gRPC securely.
|`--keystore-path` | Path to the desired keystore directory.
|`--unencrypted-keys` | Filepath to a JSON file of unencrypted validator keys for easier launching of the validator client.
|`--keymanager`| The keymanger to use (unencrypted, interop, keystore, wallet).
|`--keymanageropts`| The options for the keymanger, either a JSON string or path to same.
|`--password` | String value of the password for your validator private keys. (Not recommended - your password may get logged in command history)
|`--disable-rewards-penalties-logging` | Disable reward/penalty logging during cluster deployment.
|`--graffiti` | A string to include in proposed block.
|`--grpc-max-msg-size`| Integer to define max recieve message call size. Default: 52428800 (for 50Mb).
|`--enable-account-metrics` | Enable prometheus metrics for validator accounts.

### Interop flags
| Flag          | Usage         |
| ------------- |:-------------|
|`--interop-start-index` | The start index to deterministically generate validator keys when used in combination with `--interop-num-validators`. Example: `--interop-start-index=5 --interop-num-validators=3` would generate keys from index 5 to 7.
|`--interop-num-validators` | The number of validators to deterministically generate validator keys when used in combination with `--interop-num-validators`. Example: `--interop-start-index=5 --interop-num-validators=3` would generate keys from index 5 to 7.

## Slasher parameters
These flags are specific to launching a slasher client.
### Base flags
| Flag          | Usage         |
| ------------- |:-------------|
|`--beacon-rpc-provider` | Specify the beacon node RPC provider endpoint Default: "localhost:4000"
|`--beacon-tls-cert` | Provide the certificate for secure beacon gRPC connection. Pass this in order to use beacon gRPC securely.
|`--rebuild-span-maps` | Rebuild span maps from indexed attestations in db Default: false
|`--rpc-port` | Specify the RPC port exposed by the slasher Default: 5000
|`--tls-cert` | Specify the certificate to use for secure gRPC. Pass this and the tls-key flag in order to use gRPC securely.
|`--tls-key` | Specify the private key for secure gRPC. Pass this and the tls-cert flag in order to use gRPC securely.

### Debug flags
| Flag          | Usage         |
| ------------- |:-------------|
|`--cpuprofile` | Write CPU profile to the given file
|`--memprofilerate` | Turn on memory profiling with the given rate Default: 524288
|`--pprof` | Enable the pprof HTTP server Default: false
|`--pprofaddr` | pprof HTTP server listening interface Default: "127.0.0.1"
|`--pprofport` | pprof HTTP server listening port Default: 6060
|`--trace` | Write execution trace to the given file


