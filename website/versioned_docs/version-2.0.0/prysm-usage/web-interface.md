---
id: web-interface
title: Using the Prysm Web Interface
sidebar_label: Prysm web interface
---

This section outlines the step-by-step process for how to use Prysm with its built-in web interface.

![Dashboard](/img/webdashboard.png "Main Dashboard")

## Step 1: Get Prysm and join Ethreum mainnet or testnet

To begin, follow the instructions to run Prysm in mainnet or testnet:

- [Joining Mainnet](/docs/install/install-with-script)

By the end of the documentation, you should have a functioning beacon node and validator client running!

## Step 2: Restart your validator client with --web

To launch the web interface, you will need to restart your validator client from step 1 with the `--web` flag. This will allow you to access the web interface by default on `http://localhost:7500` if running on the same computer as your validator client and using `prysm.sh`, `prysm.bat` or building from source. For more advanced configurations, keep reading below in step (3).

Prysm protects web users with a special URL for authentication instead of requiring the user to remember a password. The URL can be retreived in the terminal logs where the `validator --web` command was run. please copy it into a web browser to intialize the website with authentication. The base url `http://127.0.0.1:7500` or `http://localhost:7500` may differ based on your own validator settings.

example of URL in logs

```
[2021-10-21 14:07:28]  INFO rpc: Once your validator process is runinng, navigate to the link below to authenticate with the Prysm web interface
[2021-10-21 14:07:28]  INFO rpc: http://127.0.0.1:7500/initialize?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzQzMzIyOTJ9.EgkawrXjxSkO26FcwuiB6IFI-KUMyLAc9FKkuLOTHl8&expiration=1634332292
```
:::tip Print your unique authentication URL again
Sometimes your browser cache gets cleared requiring you to reauthenticate, or you want to retrieve a new URL with token without restarting the validator.
In that case, you can run the following command `validator web generate-auth-token`
:::

:::tip 3rd party tools
Third party tools such as Dappnode will intialize the user without use of the cli commands and will automatically redirect users to the dashboard. These tools will typically use the generated auth-token file located in the Prysm Wallet Directory.
:::

If it is the first time you have ran your Prysm validator and have not yet created a wallet, you will be faced with a wallet creation screen allowing you to import the keystores generated from the Ethereum deposit-cli.

![Image](/img/walletcreate.png)

upon completion of onboarding, your web page should always redirect you to the main dashboard.

![Dashboard](/img/webdashboard.png "Main Dashboard")


## Step 3: Configuration and common issues

The web UI runs by default on port 7500 of the validator client if you are running with the --web flag. To customize this port, change the following flag to your liking:

```
--grpc-gateway-port (default: 7500 for validator)
```

The available parameters to customize are:

| Flag          | Usage         |
| ------------- |:-------------|
|`--grpc-gateway-host` | The host for the validator client's JSON-HTTP API, default `127.0.0.1`
|`--grpc-gateway-port` | The port for the validator client's JSON-HTTP API, default `7500`

If your browser cache was cleared, you're running on a new browser, or validator was restarted you may be stuck on the initalize page. All you need to do is retreive the special URL again and you should be reauthenticated which will redirect you to the main dashboard. 

![Initialize-Alert](/img/initialize-alert.png "intialize alert")

### common errors 

Toaster errors represent some sort of notification, something isn't working completely correctly but doesn't limit the user on core functionality. 

example:

![Toaster](/img/toaster-error.png "toaster error")

Dialog box errors are used for HTTP errors with the validator API. It will provide a summary on what the problem is and for next steps to either review our docs for anything commonly tracked as well as a link for creating an issue for the team to look into. 

![Dialog](/img/dialog-error.png "dialog error")

The dialog can also be expanded to copy the error seen for further analysis

![Dialog-expanded](/img/dialog-error-expanded.png "dialog error expanded")

| Error Code         | Reason        |
| ------------- |:-------------|
| 503 or 0 | No server response, services having difficulty communicating, meaning network problems, or services being un available.
| 401 | Unauthorized, requiring to reauthenticate with the special url
| 500 | Internal Server Error, something failed internally in Prysm services
| 404 | API endpoint is not found

Please create a github issue or contact the team on Discord to report an issue

## Step 4: Accessing the web interface from a remote computer

If you are running your beacon node and validator on some server that you want to access from the outside, we recommend SSH local port forwarding to access it. For example, you would do the following from your home computer:

```
ssh -L 7500:127.0.0.1:7500 user@host_ip
```

where you replace `user@host_ip` with the user and host ip address of the remote machine you are trying to access. This will forward all requests from your home computer's localhost:7500 to the remote instance's localhost:7500, allowing you to visit `http://localhost:7500` from your favorite browser and then access the validator web interface! This is the safest approach to access it, as you are exposing the web interface to the open Internet.

## Step 4: Monitor your beacon node and validator client logs, accounts, and more

You can visualize your beacon node and validator client logs from the web interface easily by navigating to `System Process -> Logs` on the left-hand sidebar.  
![Logs](/img/logs.png "Logs")

- We recommend going through the ["imported wallet"](/docs/wallet/nondeterministic) route, and importing your keys you obtained during the [Ethereumlaunchpad deposit-cli](https://launchpad.ethereum.org/) process, as this is the most secure setup. Upon completing wallet creation, you will be redirected to your main dashboard, where you can see several important items such as your recent validating performance or your beacon node's sync status.  

This page is useful to monitor how your processes are doing without needing to navigate to your terminal! In addition, you can visit your `Wallet and Accounts -> Accounts` page to view all your validating keys in an ordered table, explore their historical performance on https://beaconcha.in, and import new ones.

## Step 5: Contributing to the web interface code

The web interface is open source and located at [github.com/prysmaticlabs/prysm-web-ui](https://github.com/prysmaticlabs/prysm-web-ui). It is an Angular application, and we always welcome your help!

:::warning Web UI in development mode uses mock data by default
The recommended way to run prysm web is from the validator client itself via the `--web` flag. If you are building the web UI from source and doing `npm start`, you **will be using fake, mock data!** Keep that in mind if you are trying to use real accounts with the web UI.
:::
