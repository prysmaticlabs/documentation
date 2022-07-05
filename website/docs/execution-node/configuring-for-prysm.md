---
id: configuring-for-prysm
title: Configure a fallback execution node
sidebar_label: Configure a fallback execution node
---

:::info

Running an execution node will be **required** post-Merge. See [Prepare for The Merge](../prepare-for-merge.md) for the latest Merge preparation guidance.

New to Prysm? See our [Quickstart](../install/install-with-script.md) for step-by-step instructions that help you configure an execution node, beacon node, and validator.

:::

Prysm's beacon node allows you to specify fallback execution nodes. These fallback nodes will be used in the event that your primary node fails. This feature can be configured using flags or a config file.

#### Using regular flags

```
--http-web3provider=<YOUR MAIN ENDPOINT> --fallback-web3provider=<PROVIDER 1> --fallback-web3provider=<PROVIDER 2>
```

You can specify your primary execution node endpoint and as many `--fallback-web3provider`s as you need. For example:

```
--http-web3provider=http://localhost:8545 --fallback-web3provider=http://localhost:8546 --fallback-web3provider=http://localhost:8547
```


:::tip Prysm will resume using your primary
Prysm will automatically switch back to your primary execution node whenever it comes back online.
:::

#### Using a config file

If you're configuring Prysm via a `config.yaml` file, use the following configuration:

```yaml
http-web3provider: http://localhost:8545
fallback-web3provider:
 - http://localhost:8546
 - http://localhost:8547
```