---
id: web-interface
title: Using the Prysm Web Interface
sidebar_label: Prysm web interface
---

This section outlines the step-by-step process for how to use Prysm with its built-in web interface.

![Dashboard](/img/webdashboard.png "Main Dashboard")

## Step 1: Get Prysm and join eth2 mainnet or testnet

To begin, follow the instructions to run Prysm in either the eth2 mainnet or the test network

- [Joining Eth2 Mainnet](/docs/mainnet/joining-eth2)
- [Joining the Testnet](/docs/testnet/pyrmont)

By the end of the documentation, you should have a functioning beacon node and validator client running!

## Step 2: Restart your validator client with --web

To launch the web interface, you will need to restart your validator client from step 1 with the `--web` flag. This will allow you to access the web interface by default on `http://localhost:7500` if running on the same computer as your validator client and using `prysm.sh`, `prysm.bat` or building from source. For more advanced configurations, keep reading below in step (3).

If it is the first time you have ran your Prysm validator and have not yet created a wallet, you will be faced with a wallet creation screen allowing you to import the keystores generated from the eth2.0-deposit-cli.

![Image](/img/walletcreate.png)

If you have _already created a wallet_, you will instead be faced with a signup page where you must set a password for your web interface.

![Image](/img/createwebpass.png)

:::tip The password for the web interface
For security reasons, the password for the Prysm web interface is different from your wallet password. We wouldn't want you typing your precious wallet password every time you login via a browser!
:::

After you signup, you'll be able to access your dashboard and login any future times to the web interface.

## Step 3: Configuration and common issues

The way the web interface works today is as follows:

```text
      /---> beacon-node (default: localhost:3500)
web -- 
      \---> validator client (default: localhost:7500)
```

:::info Default setup only works on same machine!
The default setup will **only work** if you are accessing the web interface from the same computer where the beacon node and validator are running. If you want to customize the `host` or `port` for the beacon node and validator client backends, you can use the flags:
```
--grpc-gateway-host (default: 127.0.0.1)
--grpc-gateway-port (default: 7500 for validator, 3500 for beacon node)
```
:::

If you are **running with docker**, you ideally want to set the `--grpc-gateway-host` in **both** the beacon node and validator client to `0.0.0.0`, allowing the backends to accessible beyond the localhost within the running docker containers.

The available parameters to customize are:

### Beacon node
| Flag          | Usage         |
| ------------- |:-------------|
|`--grpc-gateway-host` | The host for the beacon node's JSON-HTTP API, default `127.0.0.1`
|`--grpc-gateway-port` | The port for the beacon node's JSON-HTTP API, default `3500`
|`--grpc-gateway-corsdomain` | Comma separated list of allowed domains to access the JSON-HTTP API, default includes `http://0.0.0.0:7500,http://127.0.0.1:7500,http://localhost:7500`
|`--monitoring-host` | The host for where the beacon node's /logs websocket endpoint is served, default `127.0.0.1`
|`--monitoring-port` | The port for where the beacon node's /logs websocket endpoint is served, default `8080`

### Validator
| Flag          | Usage         |
| ------------- |:-------------|
|`--grpc-gateway-host` | The host for the validator client's JSON-HTTP API, default `127.0.0.1`
|`--grpc-gateway-port` | The port for the validator client's JSON-HTTP API, default `7500`
|`--monitoring-host` | The host for where the validator client's /logs websocket endpoint is served, default `127.0.0.1`
|`--monitoring-port` | The port for where the validator client's /logs websocket endpoint is served, default `8081`

## Step 4: Accessing the web interface from a remote computer

If you are running your beacon node and validator on some server that you want to access from the outside, we recommend SSH local port forwarding to access it. For example, you would do the following from your home computer:

```
ssh -L 7500:127.0.0.1:7500 user@host_ip
```

where you replace `user@host_ip` with the user and host ip address of the remote machine you are trying to access. This will forward all requests from your home computer's localhost:7500 to the remote instance's localhost:7500, allowing you to visit `http://localhost:7500` from your favorite browser and then access the validator web interface! This is the safest approach to access it, as you are exposing the web interface to the open Internet.

## Step 4: Monitor your beacon node and validator client logs, accounts, and more

You can visualize your beacon node and validator client logs from the web interface easily by navigating to `System Process -> Logs` on the left-hand sidebar.

![Logs](/img/logs.png "Logs")

This page is useful to monitor how your processes are doing without needing to navigate to your terminal! In addition, you can visit your `Wallet and Accounts -> Accounts` page to view all your validating keys in an ordered table, explore their historical performance on https://beaconcha.in, and import new ones.

## Step 5: Contributing to the web interface code

The web interface is open source and located at [github.com/prysmaticlabs/prysm-web-ui](https://github.com/prysmaticlabs/prysm-web-ui). It is an Angular application, and we are always welcome to have your help!

:::warning Web UI in development mode uses mock data by default
The recommended way to run prysm web is from the validator client itself via the `--web` flag. If you are building the web UI from source and doing `npm start`, you **will be using fake, mock data!** Keep that in mind if you are trying to use real accounts with the web UI.
:::