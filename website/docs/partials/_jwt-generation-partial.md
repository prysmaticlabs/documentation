import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div class="hidden-in-quickstart">

:::info HTTP-JWT only

This guidance is relevant only if your beacon node is connecting to your execution node over HTTP. If you're using IPC, you can ignore this. If you want to learn how to use IPC, see our [Quickstart](../install/install-with-script.md).

:::

</div>

The HTTP connection between your beacon node and execution node needs to be authenticated using a [JWT token](https://jwt.io/). There are several ways to generate this JWT token:

 - Use an online generator like [this](https://seanwasere.com/generate-random-hex/). Copy and paste this value into a `jwt.hex` file.
 - Use a utility like OpenSSL to create the token via command: `openssl rand -hex 32 | tr -d "\n" > "jwt.hex"`.
 - Use an execution client to generate the `jwt.hex` file.
 - Use Prysm [v3](https://github.com/prysmaticlabs/prysm/releases/tag/v3.0.0) to generate the `jwt.hex` file:

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">

```
## Optional. This command is necessary only if you've previously configured USE_PRYSM_VERSION
SET USE_PRYSM_VERSION=v3.0.0

## Required.
prysm.bat beacon-chain generate-auth-secret
```
  
  </TabItem>
  <TabItem value="others">

```
## Optional. This command is necessary only if you've previously configured USE_PRYSM_VERSION
USE_PRYSM_VERSION=v3.0.0

## Required.
./prysm.sh beacon-chain generate-auth-secret
```

  </TabItem>
</Tabs>

Prysm will output a `jwt.hex` file path.