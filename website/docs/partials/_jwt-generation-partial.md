import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The HTTP connection between your beacon node and execution node needs to be authenticated using a [JWT token](https://jwt.io/). There are several ways to generate this JWT token:

 - Use an online generator like [this](https://seanwasere.com/generate-random-hex/). Copy and paste this value into a `jwt.hex` file.
 - Use a utility like OpenSSL to create the token via command: `openssl rand -hex 32 | tr -d "\n" > "jwt.hex"`.
 - Use an execution client to generate the `jwt.hex` file.
 - Use Prysm [v3](https://github.com/prysmaticlabs/prysm/releases/tag/v3.0.0) to generate the `jwt.hex` file:

<Tabs groupId="os" values={[
    {label: 'Linux, MacOS, Arm64', value: 'others'},
    {label: 'Windows', value: 'win'}
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


<div class="admonition admonition-caution alert alert--warning"><div class="admonition-content"><p>Ensure that the script, user, or terminal window used to create and access your JWT token has the permissions it needs. Windows users may need to run command windows as Administrator.</p></div></div>