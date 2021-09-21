---
id: parameters
title: Available parameters
sidebar_label: Available parameters
---

This section lists the various flags used to customise the startup process of beacon nodes and validator clients.

:::tip Graffiti
You can use the `--graffiti` validator flag to add a string to your proposed blocks, which will be seen on the block explorer. I.e; `<startup command> --graffiti "Prysm is awesome!"`
:::

## Loading parameters via .YAML file

:::info
Loading parameters via .YAML file is optional.
:::

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

It is possible to provide additional flags alongside the `.yaml` file, though if conflicting flags are provided, the flag defined in the`.yaml` file will take priority. For example, if the flag `--datadir=/data2` is specified and `datadir: "/data1"` is in the `.yaml` file, Prysm would prioritise writing to `/data1`.

## Shared flags

These flags are shared by both the beacon node, validator client.


| Flag          | Usage         |
| ------------- |:-------------|
| `--accept-terms-of-use` | Allows user to to accept our legal [Terms of Use](https://github.com/prysmaticlabs/prysm/blob/master/TERMS_OF_SERVICE.md) programmatically.
| `--config-file` | Allows user to specifying the location of a `.yaml` config file with flag values.
| `--chain-config-file` | Allows user to specifying the location of a `.yaml` file with chain configuration values.
| `--verbosity`     | Verbosity of logs to display (trace, debug, info=default, warn, error, fatal, panic).
| `--datadir [path]`     | Allows user to specify a directory for the client database.
| `--rpc-max-page-size` | Define the max number of items returned per page in RPC responses for paginated endpoints. (Default: 500)
| `--enable-tracing` | Enables p2p message tracing.
| `--tracing-endpoint` | Tracing endpoint defines where beacon chain traces are exposed. (Default: http://127.0.0.1:14268/api/traces)
| `--tracing-process-name` | The name to apply to tracing tag \"process_name\"
| `--trace-sample-fraction` | Indicate what fraction of P2P messages are sampled for tracing. (Default: 0.20)
| `--disable-monitoring` | Disable all monitoring services.
| `--monitoring-port` | Port used by prometheus metrics for listening and responding to messages. (Default: Beacon:8080, Validator:8081, Slasher: 8082)
| `--monitoring-host` | Host IP address used for prometheus monitoring. Default: 127.0.0.1
| `--force-clear-db` | Clear any previously stored data at the data directory.
| `--clear-db` | Prompt for clearing any previously stored data at the data directory.
| `--log-format` | Specify log formatting. Supports: text, json, fluentd.
| `--log-file` | Prints logs to the provided file path. Path can be relative or absolute.
| `--max-goroutines` | Specifies the upper limit of goroutines running before a status check fails. (Default: 5000)
| `--enable-upnp` | Enable the service (Beacon chain or Validator) to use UPnP when possible.

## Beacon node parameters
These flags are specific to launching the beacon node.
### Management flags
| Flag        | Usage           |
| ------------- |:-------------|
| `--deposit-contract` | Define a deposit contract address. Beacon chain node will listen to logs coming from the deposit contract to determine when validator is eligible to participate.
| `--contract-deployment-block` | Define the ETH1 block in which the deposit contract was deployed. (Default: 11184524)
| `--head-sync` | Starts the beacon node with the previously saved head state instead of finalized state.
| `--disable-sync` | Starts the beacon node without entering initial sync and instead exits to regular sync immediately.
| `--slots-per-archive-point` | The slot durations of when an archived state gets saved in the DB. (Default: 2048)
| `--weak-subjectivity-checkpoint` | Input in `block_root:epoch_number` format to sync from the weak subjectivity checkpoint.
| `--gc-percent` | The percentage of freshly allocated data to live data on which the gc will be run again. (Default: 100)
| `--enable-db-backup-webhook` | Serve HTTP handler to initiate database backups. The handler is served on the monitoring port at path /db/backup.
| `--db-backup-output-dir` | Output directory for database backups.
| `--chain-id` | Sets the chain id of the beacon chain.
| `--network-id` | Sets the network id of the beacon chain.

### gRPC flags 
| Flag        | Usage           |
| ------------- |:-------------|
| `--http-web3provider` | Define an eth1 web3 provider string http endpoint. See [here](/docs/prysm-usage/setup-eth1)
| `--rpc-host` | Define an address of the host on which the RPC server should listen. Default: 0.0.0.0
| `--rpc-port` | Define a RPC port to be exposed by the beacon node. >Value: 4000
| `--tls-cert` | Certificate for secure gRPC. Pass this and the tls-key flag in order to use gRPC securely.
| `--tls-key` | Key for secure gRPC. Pass this and the tls-cert flag in order to use gRPC securely.
| `--grpc-gateway-host` | The host on which the gateway server runs on. Default: 127.0.0.1
| `--grpc-gateway-port` | Enable gRPC gateway for JSON requests. Default: 3500

### P2P flags
| Flag        | Usage           |
| ------------- |:-------------|
| `--p2p-max-peers` | The max number of p2p peers to maintain. Default: 45
| `--no-discovery` | Enable only local network P2P and do not connect to cloud bootstrap nodes.
| `--disable-discv5` | Does not run the discoveryV5 DHT.
| `--block-batch-limit` | The amount of blocks the local peer is bounded to request and respond to in a batch. Default: 64
| `--block-batch-limit-burst-factor` | The factor by which block batch limit may increase on burst. Default: 10
| `--peer` | Connect with a specified peer. This flag may be used multiple times.
| `--bootstrap-node` | The address of bootstrap node. Beacon node will connect for peer discovery via DHT.  Multiple nodes can be separated with a comma. Default:
| `--relay-node` | The address of relay node. The beacon node will connect to the relay node and advertise their address via the relay node to other peers.
| `--p2p-udp-port ` | The port used by discv5. Default: 12000
| `--p2p-tcp-port` | The port used by libP2P. Default: 13000
| `--p2p-local-ip` | The local ip address to listen for incoming data.
| `--p2p-host-ip` |  The IP address advertised by libp2p. This may be used to advertise a public IP.
| `--p2p-host-dns` | The DNS address advertised by libp2p. This may be used to advertise an external DNS.
| `--p2p-whitelist` | The CIDR subnet for whitelisting peer connections. Example: 192.168.0.0/16 would whitelist connections to peers on your local network only. The default is to accept all connections.
| `--p2p-encoding` | The encoding format of messages sent over the wire. The default is 0, which represents ssz.

### Interop flags
| Flag          | Usage         |
| ------------- |:-------------|
|`--interop-genesis-state` | The genesis state file (.SSZ) to load from.
|`--interop-eth1data-votes` | Enable mocking of eth1 data votes for proposers to package into blocks.
|`--interop-genesis-time` | Specify the genesis time for interop genesis state generation. Must be used with `--interop-num-validators`.
|`--interop-num-validators` | Specify number of genesis validators to generate for interop. Must be used with `--interop-genesis-time`.

## Validator parameters
These flags are specific to launching a validator client.
### Management flags
| Flag          | Usage         |
| ------------- |:-------------|
|`--no-custom-config` | Run the beacon chain with the real parameters from phase 0.
|`--beacon-rpc-provider` | Beacon node RPC provider endpoint. Default: localhost:4000
|`--rpc-host` | Specify the RPC host exposed by the validator. Default: localhost
|`--rpc-port` | Specify the RPC port exposed by the validator. Default: 7000
|`--grpc-gateway-host` | Specify the gRPC gateway port exposed by the validator. Default: localhost
|`--grpc-gateway-port` | Specify the gRPC gateway port exposed by the validator. Default: 7500
|`--tls-cert` | Certificate for secure gRPC. Pass this and the tls-key flag in order to use gRPC securely.
|`--graffiti` | A string to include in proposed block.
|`--web` | Enables the web portal for the validator client (work in progress).
|`--monitoring-host` | Host used to listening and respond metrics for prometheus. (Default: 127.0.0.1)
|`--monitoring-port` | Port used to listening and respond metrics for prometheus. (Default: 8081)
|`--grpc-max-msg-size`| Integer to define max recieve message call size. Default: 52428800 (for 50Mb).
|`--disable-rewards-penalties-logging` | Disable reward/penalty logging during cluster deployment.
|`--disable-account-metrics` | Disable prometheus metrics for validator accounts.

### RPC flags 
| Flag          | Usage         |
| ------------- |:-------------|
|`--beacon-rpc-provider` | Beacon node RPC provider endpoint. Default: localhost:4000
|`--beacon-rpc-gateway-provider` | Beacon node RPC gateway provider endpoint. (Default: localhost:3500)
|`--tls-cert` | Certificate for secure gRPC. Pass this and the tls-key flag in order to use gRPC securely.
|`--rpc`| Enables the RPC server for the validator client (without Web UI).
|`--rpc-host`| Host on which the RPC server should listen (default: "127.0.0.1")
|`--rpc-port`| RPC port exposed by a validator client (default: 7000)
|`--grpc-gateway-port`| Enable gRPC gateway for JSON requests (default: 7500)
|`--grpc-gateway-host`| The host on which the gateway server runs on (default: 127.0.0.1)
|`--grpc-retries`| Number of attempts to retry gRPC requests (default: 5)
|`--grpc-retry-delay`| The amount of time between gRPC retry requests. (default: 1s)
|`--grpc-headers`| A comma separated list of key value pairs to pass as gRPC headers for all gRPC calls. Example: --grpc-headers=key=value
|`--grpc-gateway-corsdomain`| Comma separated list of domains from which to accept cross origin requests (browser enforced). This flag has no effect if not used with --grpc-gateway-port. (default: "http://localhost:4242,http://127.0.0.1:4242,http://localhost:4200,http://0.0.0.0:4242,http://0.0.0.0:4200")


### Accounts flags
| Flag          | Usage         |
| ------------- |:-------------|
|`--wallet-dir`| Path to a wallet directory on-disk for Prysm validator accounts.
|`--wallet-password-file`| Path to a plain-text, .txt file containing your wallet password.
|`--keys-dir`| Path to a directory where keystores to be imported are stored.
|`--backup-dir`| Path to a directory where accounts will be backed up into a zip file.
|`--num-accounts`| Number of accounts to generate for derived wallets (default: 1).
|`--account-password-file`| Path to a plain-text, .txt file containing a password for a validator account.
|`--backup-password-file`| Path to a plain-text, .txt file containing the desired password for your backed up accounts.
|`--mnemonic-file`| File to retrieve mnemonic for non-interactively passing a mnemonic phrase into wallet recover.
|`--mnemonic-25th-word-file`| (Advanced) Path to a plain-text, .txt file containing a 25th word passphrase for your mnemonic for HD wallets.
|`--skip-mnemonic-25th-word-check`| Allows for skipping the check for a mnemonic 25th word passphrase for HD wallets.
|`--import-private-key-file`| Path to a plain-text, .txt file containing a hex string representation of a private key to import.
|`--keymanager-kind`| Kind of keymanager, either imported, derived, or remote, specified during wallet creation.
|`--delete-public-keys`| Comma-separated list of public key hex strings to specify which validator accounts to delete.
|`--disable-public-keys`| Comma-separated list of public key hex strings to specify which validator accounts to disable.
|`--enable-public-keys`| Comma-separated list of public key hex strings to specify which validator accounts to enable.
|`--backup-public-keys`| Comma-separated list of public key hex strings to specify which validator accounts to backup.
|`--public-keys`| Comma-separated list of public key hex strings to specify on which validator accounts to perform a voluntary exit.
|`--show-deposit-data`| Display raw eth1 tx deposit data for validator accounts.
|`--show-private-keys`| Display the private keys for validator accounts.
|`--skip-deposit-confirmation`| Skips the y/n confirmation prompt for sending a deposit to the deposit contract.

### Interop flags
| Flag          | Usage         |
| ------------- |:-------------|
|`--interop-start-index` | The start index to deterministically generate validator keys when used in combination with `--interop-num-validators`. Example: `--interop-start-index=5 --interop-num-validators=3` would generate keys from index 5 to 7.
|`--interop-num-validators` | The number of validators to deterministically generate validator keys when used in combination with `--interop-num-validators`. Example: `--interop-start-index=5 --interop-num-validators=3` would generate keys from index 5 to 7.

## General debug flags
| Flag          | Usage         |
| ------------- |:-------------|
|`--cpuprofile` | Write CPU profile to the given file
|`--memprofilerate` | Turn on memory profiling with the given rate Default: 524288
|`--pprof` | Enable the pprof HTTP server Default: false
|`--pprofaddr` | pprof HTTP server listening interface Default: "127.0.0.1"
|`--pprofport` | pprof HTTP server listening port Default: 6060
|`--trace` | Write execution trace to the given file
