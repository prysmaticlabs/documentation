---
id: web-interface
title: Use Prysm's web UI
sidebar_label: Use Prysm's web UI
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

:::caution
Dear Prysmers,

We would like to take a moment to inform you of an important update regarding our software. After careful consideration, we have made the difficult decision to deprecate our web UI. While we understand that this news may be disappointing, please know that it was not a decision we made lightly. We recognize that many of you have been loyal users of our software and have come to rely on its features and capabilities. Please know that this decision was made with your best interests in mind. We believe that by deprecating our web UI, we can focus our efforts on the core needs of the consensus client, bringing more software that is more resilient, more maintainable, and more sustainable. 

We understand that this may cause some inconvenience and disruption, and we want to assure you that we will do everything we can to make this transition as smooth as possible. 
We will continue to provide support for our software for a limited period of time to help you with the transition to alternative solutions. We are also open to any feedback or suggestions you may have, as we strive to improve our products and services; reach out to us on our discord.

Sincerely,
The Prysm Team
:::

:::info
## FAQ on Prysm UI Deprecation.

**Q:What does it mean for the Web UI to be removed?**

A: The web UI and its associated API endpoints ( aside from the keymanager APIs) will be marked for deprecation for the current hard fork and fully removed in a future hard fork. 
You may see logs that mention that an endpoint is marked for deprecation and should no longer be used in the future. Our team will continue to provide support as users transition to alternative solutions.

**Q: Where can I view my validator metrics such as attestations without the Web UI**

A: Users will need to migrate to using [grafana dashboards](./monitoring/grafana-dashboard.md) or our [individual validator monitoring guide](./individual-validator-monitoring.md) as well as look to online block explorers. Please let us know if any of these do not cover your usecase and provide any feedback on how we can improve our monitoring tools. 

**Q: How do I recover a prysm wallet from a mnemonic without the Web UI?**

A: Prysm wallets (derived wallets) can be recovered with the associated mnemonic using the [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli). We recommend you do this recovery in an offline environment.

**Q: How do I set a fee recipient without the Web UI**

A: Community provided UI solutions will continue to provide a graphical interface to setting your fee recipient via the client standard [keymanager APIs](https://ethereum.github.io/keymanager-APIs/). Alternatively, the Prysm team can provide a way to set the fee recipient via the [prysmctl tool](./prysmctl.md).

**Q: How do I exit my validator without the Web UI**

A: A cli command through the prysmctl tool or validator client can be used to exit the validator. Learn more about that [here](../wallet/exiting-a-validator.md).

**Q: How do I export slashing protection without the Web UI**

A: A cli command through the validator client can provide slashing protection exports, Community provided UI solutions can also provide this information via the client standard [keymanager APIs](https://ethereum.github.io/keymanager-APIs/) when removing a local validator. Learn more about it [here](../wallet/slashing-protection.md).

:::

## What is Prysm's web UI?

The Prysm Web UI is a locally hosted website that is launched from the validator client to provide users with a visual alternative to the validator cli( command-line interface).

The website will provide users with a visual way to set up their Prysm Wallet, manage their keys, and provide information on the current state of their validator. You will also be able to see a peer map for users who decide to share their location among the peers in their network.

The website at this time does not provide additional metrics over those that you would find on your Grafana dashboards or beaconcha.in.

## Launching and Logging In

To begin, follow the instructions to run Prysm in mainnet or testnet:

- [Joining Mainnet](/docs/install/install-with-script)

To launch the web interface, you will need to restart your validator client from step 1 with the `--web` flag. This will allow you to access the web interface by default on `http://localhost:7500` if running on the same computer as your validator client and using `prysm.sh`, `prysm.bat` or building from source.

Prysm protects web users with a special URL for authentication instead of requiring the user to remember a password. The URL can be retrieved in the terminal logs where the `validator --web` command was run. please copy it into a web browser to initialize the website with authentication. The base url `http://127.0.0.1:7500` or `http://localhost:7500` may differ based on your own validator settings.

example of URL in logs

```
[2021-10-21 14:07:28]  INFO rpc: Once your validator process is running, navigate to the link below to authenticate with the Prysm web interface
[2021-10-21 14:07:28]  INFO rpc: http://127.0.0.1:7500/initialize?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzQzMzIyOTJ9.EgkawrXjxSkO26FcwuiB6IFI-KUMyLAc9FKkuLOTHl8&expiration=1634332292
```

:::tip Print your unique authentication URL again
Sometimes your browser cache gets cleared requiring you to reauthenticate, or you want to retrieve a new URL with token without restarting the validator.
In that case, you can run the following command `validator web generate-auth-token`
:::

:::warning Auth Token must be located inside the wallet directory you are running the validator on
The `--wallet-dir` flag can also be added to the `validator web generate-auth-token` command to specify the specific location where the auth token would apply. This is important when running the validator with a wallet directory that is not in the default directory. When this happens the website may return an invalid token page.
:::

:::tip 3rd party tools
Third party tools such as DAppNode will initialize the user without use of the cli commands and will automatically redirect users to the dashboard. These tools will typically use the generated `auth-token` file located in the Prysm Wallet directory.
:::

If it is the first time you have ran your Prysm validator and have not yet created a wallet, you will be faced with a wallet creation screen allowing you to import the keystores generated from the Ethereum `deposit-cli`.

![Image](/img/walletcreate.png)

upon completion of onboarding, your web page should always redirect you to the main dashboard.

## Configuration

### Managing Ports

The web UI runs by default on port 7500 of the validator client if you are running with the `--web` flag. To customize this port, change the following flag to your liking:

```
--http-port (default: 7500 for validator)
```

The available parameters to customize are:

| Flag                  | Usage                                                                  |
| --------------------- | :--------------------------------------------------------------------- |
| `--http-host` | The host for the validator client's JSON-HTTP API, default `127.0.0.1` |
| `--http-port` | The port for the validator client's JSON-HTTP API, default `7500`      |

:::caution
`http-host` and `http-port` have replaced `--grpc-gateway-host` and `--grpc-gateway-port` respectively.
:::

### Wallet Directory

the `--wallet-dir` flag will determine the location where your auth token as well as other related configurations are stored. you can provide this flag with a file director to change it from the default location.

### Accessing the web interface from a remote computer

If you are running your beacon node and validator on some server that you want to access from the outside, we recommend SSH local port forwarding to access it. For example, you would do the following from your home computer:

```
ssh -L 7500:127.0.0.1:7500 user@host_ip
```

where you replace `user@host_ip` with the user and host ip address of the remote machine you are trying to access. This will forward all requests from your home computer's localhost:7500 to the remote instance's localhost:7500, allowing you to visit `http://localhost:7500` from your favorite browser and then access the validator web interface! This is the safest approach to access it, as you are exposing the web interface to the open Internet.

:::warning Please use HTTPS
If you plan to expose the website to the open Internet, please look into protecting yourself with HTTPS. Prysm web does not come with certificates or HTTPS pre-configured. If you are running Prysm Web on the open internet without HTTPS you are running at your own risk.
:::

## Troubleshooting

### Issues logging in

If your browser cache was cleared, you're running on a new browser, or validator was restarted you may be stuck on the initialize page. All you need to do is retrieve the special URL again and you should be re-authenticated which will redirect you to the main dashboard.

![Dialog-expanded](/img/dialog-error-expanded.png "dialog error expanded")

### HTTP Error Codes

| Error Code | Reason                                                                                                                                                         |
| ---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 503 or 0   | No server response, services having difficulty communicating, meaning network problems, or services being un available, or even firewalls or adblock settings. |
| 401        | Unauthorized, requiring to reauthenticate with the special url                                                                                                 |
| 500        | Internal Server Error, something failed internally in Prysm services                                                                                           |
| 404        | API endpoint is not found                                                                                                                                      |

### Reporting Issues

Please create a [github issue](https://github.com/prysmaticlabs) or contact the team on [Discord](https://discord.gg/prysmaticlabs) to report an issue

## Contributing

The web interface is open source and located at [github.com/prysmaticlabs/prysm-web-ui](https://github.com/prysmaticlabs/prysm-web-ui). It is an Angular application, and we always welcome your help!

### Prerequisites

- latest node
- ide (i.e. visual studio code)

after cloning the repo navigate to where the `package.json` file and run `npm install` to retrieve the dependencies you will need.

### Running in Develop

run `npm start` in the folder path where `package.json` lives and open the website on `localhost:4200`.

:::warning Web UI in development mode uses mock data by default
The recommended way to run prysm web is from the validator client itself via the `--web` flag. If you are building the web UI from source and doing `npm start`, you **will be using fake, mock data!** Keep that in mind if you are trying to use real accounts with the web UI.
:::

:::tip Develop URL login
for authentication in develop you may use any token in the url query parameter i.e. `localhost:4200/initialize?token=anytoken`
:::

### Running in Staging

run `npm run start:staging` will run a 'like' production build where the backend expects to be connected to `localhost:7500`. You will need to start the validator client with `--web` but interact with your angular application on `localhost:4200`.


