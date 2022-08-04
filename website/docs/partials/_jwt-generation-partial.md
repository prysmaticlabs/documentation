import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The HTTP connection between your beacon node and execution node needs to be authenticated using a [JWT token](https://jwt.io/). There are several ways to generate this JWT token:

 - Use an online generator like [this](https://seanwasere.com/generate-random-hex/). Copy and paste this value into a `jwt.hex` file.
 - Use a utility like OpenSSL to create the token via command: `openssl rand -hex 32 | tr -d "\n" > "jwt.hex"`.
 - Use an execution client to generate the `jwt.hex` file.
 - Use Prysm to generate the `jwt.hex` file:

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">

```
SET USE_PRYSM_VERSION=v2.1.4-rc.0
prysm.bat beacon-chain generate-auth-secret
```
  
  </TabItem>
  <TabItem value="others">

```
USE_PRYSM_VERSION=v2.1.4-rc.0
./prysm.sh beacon-chain generate-auth-secret
```

  </TabItem>
</Tabs>

Prysm will output a `jwt.hex` file path.