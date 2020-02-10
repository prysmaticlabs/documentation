---
id: parameters
title: Available parameters
sidebar_label: Available parameters
---

## Docker Commands
The beacon node can be halted by either using `Ctrl+c` or with the command:

```text
docker stop beacon-node
```

To restart the beacon node, issue the following command:

```text
docker start -ai beacon-node
```

To delete a corrupted container, issue the following command:

```text
docker rm beacon-node
```

To recreate a deleted container and refresh the chain database, issue the start command with an additional `--clear-db` parameter:

```text
docker run -it -v $HOME/prysm:/data -p 4000:4000 -p 13000:13000 --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:latest \
  --datadir=/data \
  --clear-db
```

## Startup parameters

### Base flags
| Flag | Usage         |
|:----|:-------------|
| `--verbosity`     | Logging verbosity (trace, debug, info=default, warn, error, fatal, panic). |
| `--datadir [path]`     | Allows user to specify a data directory for the databases and keystore. |
| `--enable-tracing` | Enables request tracing.    |
| `--tracing-endpoint` | Tracing endpoint defines where beacon chain traces are exposed. <br>Default: http://127.0.0.1:14268/api/traces |
| `--tracing-process-name` | The name to apply to tracing tag \"process_name\" |
| `--trace-sample-fraction` | Indicate what fraction of P@P messages are sampled for tracing. <br>Default: 0.20 |
| `--disable-monitoring` | Disable all monitoring service.
| `--monitoring-port` | Port used by prometheus to listen and respond to messages. Default: 8080 |
| `--no-discovery` | Enable only local network P2P and do not connect to cloud bootstrap nodes.
| `--peer` | Connect with a specified peer. This flag may be used multiple times. |
| `--bootstrap-node` | The address of bootstrap node. Beacon node will connect for peer discovery via DHT.  Multiple nodes can be separated with a comma. <br>Default:
| `--relay-node ` |
| `--p2p-udp-port ` |
| `--p2p-tcp-port` |
| `--p2p-local-ip` |
| `--p2p-host-ip` |
| `--p2p-host-dns` |
| `--p2p-max-peers` |
| `--p2p-whitelist` |
| `--p2p-encoding` |
| `--force-clear-db` |
| `--clear-db` |
| `--log-format` |
| `--log-file` |
| `--max-goroutines` |
| `--enable-upnp` |
### Beacon chain flags
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### Validator flags
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

https://github.com/prysmaticlabs/prysm/blob/master/shared/cmd/flags.go
https://github.com/prysmaticlabs/prysm/tree/master/beacon-chain/flags
https://github.com/prysmaticlabs/prysm/tree/master/validator/flags
