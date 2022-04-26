---
id: authentication
title: Authenticating Execution Node Connections
sidebar_label: Authenticating Connections
---

Connecting Prysm to an execution node is a requirement for Ethereum at the time of the proof-of-stake merge.

## Authorizing connection to a third-party eth1 provider

In case you need to authorize to your eth1 node, both `--http-web3provider` and `--fallback-web3provider` flags support the following HTTP authorization methods:
- Basic Authentication
- Bearer Authentication (Token Authentication)

In order to pass authorization data, append the authorization header to the flag's value, separating the URL and the authorization header with a comma. In the following example:
- the main endpoint is a custom node without authorization
- the first fallback endpoint is a Chainstack endpoint with Basic Authentication
- the second fallback endpoint is an Infura endpoint with Bearer Authentication using a JWT token
```
--http-web3provider=$HOME/Mainnet/geth.ipc \
--fallback-web3provider="https://nd-123-456-789.p2pify.com,Basic myusername:mypassword" \
--fallback-web3provider="https://mainnet.infura.io/v3/0fcc2de059aa4f0a88b5b1708b614472,Bearer eyJhbGciOiAiUlMyNTYiLCJ0eXAiOiJKV1QiLCJraWQiOiJiZGM2ZGI2NmFlM2M0NzdhYmI0ZDk1NDc0N2ZiZjE4YSJ9.eyJleHAiOjE2MjExNTMwMDgsImF1ZCI6ImluZnVyYS5pbyJ9._evYtVED3VnKzyjQYTmlR98DRxa7oCJapG44MqFDKDQ"
```

:::tip 
Note that you can specify multiple authorization values for the same endpoint by reusing the endpoint URL in `--fallback-web3provider` and changing the value of the authorization header.
:::