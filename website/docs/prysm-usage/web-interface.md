---
id: web-interface
title: Using the Prysm Web Interface
sidebar_label: Using the Prysm Web Interface
---

This section outlines the step-by-step process for how to use Prysm with its built-in web interface.

![Dashboard](/img/webdashboard.png "Main Dashboard")

## Step 1: Get Prysm

To begin, follow the instructions to fetch and install Prysm for your operating system.

* [Using the Prysm installation script (Recommended)](/docs/install/install-with-script)
* [Using Docker](/docs/install/install-with-docker)
* [Building from source with Bazel (Advanced)](/docs/install/install-with-bazel)

Based on the instructions above, you should now have a running beacon node.

## Step 2: Start your validator client

You'll then need to start your validator client with the `--web` flag in a second terminal window. Depending on your platform, issue the appropriate command from the examples below to start the validator.

:::danger Important Caveats
The --web interface is currently and beta and has some limitations. At the moment, this assumes you are running your beacon node and validator client with default RPC ports, and on the same machines or at least within the same network. For more advanced configurations, you can get in touch with our team on Discord or follow the progress of prysm-web [here](https://github.com/prysmaticlabs/prysm-web-ui).
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  groupId="operating-systems"
  defaultValue="lin"
  values={[
    {label: 'Linux', value: 'lin'},
    {label: 'Windows', value: 'win'},
    {label: 'MacOS', value: 'mac'},
    {label: 'Arm64', value: 'arm'},
  ]
}>
<TabItem value="lin">

**Using the Prysm installation script**

```text
./prysm.sh validator --web
```

**Using Docker**

At the moment, docker installations do not work with the web UI due to some assumptions about default ports which will be resolved in future releases, we apologize in advance.

**Using Bazel**

```text
bazel run //validator -- --web
```

</TabItem>
<TabItem value="win">

**Using the prysm.bat script**

```text
prysm.bat validator -- --web
```

**Using Docker**

At the moment, docker installations do not work with the web UI due to some assumptions about default ports which will be resolved in future releases, we apologize in advance.

</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

```text
./prysm.sh validator --web
```

**Using Docker**

At the moment, docker installations do not work with the web UI due to some assumptions about default ports which will be resolved in future releases, we apologize in advance.

**Using Bazel**

```text
bazel run //validator -- --web
```

</TabItem>
<TabItem value="arm">

**Using the Prysm installation script**

```text
./prysm.sh validator --web
```

**Using Bazel**

```text
bazel run //validator --web
```

</TabItem>
</Tabs>

## Step 3: Create a wallet

The Prysm web interface will open in your default browser automatically, and you can then navigate to the create a wallet page.

![Onboarding](/img/createawallet.png "Create a Wallet")

We recommend going through the "imported wallet" route, and importing your keys you obtained during the eth2 launchpad deposit-cli process, as this is the most secure setup. Upon completing wallet creation, you will be redirected to your main dashboard, where you can see several important items such as your recent validating performance, your beacon node's sync status.

## Step 4: Monitor your beacon node and validator client logs, manage accounts, and more

You can visualize your beacon node and validator client logs from the web interface easily by navigating to `System Process -> Logs` on the left-hand sidebar.

![Logs](/img/logs.png "Logs")

This page is useful to monitor how your processes are doing without needing to navigate to your terminal! In addition, you can visit your `Wallet and Accounts -> Accounts` page to view all your validating keys in an ordered table, explore their historical performance on https://beaconcha.in, back up your accounts, import new ones, and more. The web UI is an easy way to do a lot of common validator commands without needing to be an expert with CLI or terminal commands.

## Step 5: Report bugs and let us know how we can improve your experience

We spent a lot of time thinking about what we could create to help our stakers the most, especially those who might not want to use terminal or CLI commands to manage their validator. Starting in Prysm release [alpha.29](https://github.com/prysmaticlabs/prysm/releases/tag/v1.0.0-alpha.29), you can now run your validator with the - web option to start a local frontend in your browser. Keep in mind this is a beta release, so we are looking for feedback on the UI and need help with finding edge cases or bugs that worsen your experience. For any feedback, please join us on [Discord](https://discord.com/invite/fCsERUa) and chat with us in our #prysm-web channel.

This is not meant to be a block explorer, but rather, an interface used to monitor your beacon node and validator client logs and perform common validator commands.
