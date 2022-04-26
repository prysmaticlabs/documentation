---
id: authentication
title: Authenticating Execution Node Connections
sidebar_label: Authenticating Connections
---

Connecting Prysm to an execution node is a requirement for Ethereum at the time of the proof-of-stake merge. For many execution clients, this connection **requires authentication**. Here is how to setup an authenticated connection to an execution node in Prysm.

## Setting up Authentication

:::info
Go-ethereum currently does not require authentication for Prysm to connect with it via HTTP. Authentication is mandatory for other execution clients, however.
:::

### Step 1: Generate a secret key used for authenticating your connection

You will need a 32-byte hex string used as a secret for authenticating Prysm with an execution client. You can generate your own via various means, such as using an online generator [here](https://seanwasere.com/generate-random-hex/). Then, copy and paste this value into a file on your computer.

:::info
We understand this user experience is pretty terrible, as users should be able to specify a text password instead of having to deal with raw hex strings. We are working on improving this flow.
:::

### Step 2: Specify the file containing the authentication secret 

You will need to specify the file path containing the authentication secret when running Prysm and your execution client. They must both be using the same secret.

When running Prysm, specify:

```
--jwt-secret=<PATH TO FILE>
```

When using an execution client, look at their documentation to find their respective flag for JWT authentication. In go-ethereum, this flag is called `--authrpc.jwtsecret`.

### Step 3: Run your nodes

Next, you will be able to run your beacon node and execution client with an authenticated connection. When using a remote connection, also make sure you are connecting via `https` and not through insecure, http.
