import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The connection between your beacon node and execution node needs to be authenticated when formed over HTTP. To authenticate the HTTP connection between beacon node / execution node, a **JWT token** is needed. [JWT tokens](https://jwt.io/) are an industry-standard way to form a secure connection between two parties. Generating a JWT token will allow your beacon node to form an authenticated HTTP connection with your execution node.

There are several ways to generate this JWT token:

 - Use an online generator like [this](https://seanwasere.com/generate-random-hex/). Copy and paste this value into a `jwt.hex` file.
 - Use a utility like OpenSSL to create the token via command: `openssl rand -hex 32 | tr -d "\n" > "jwt.hex"`.
 - Use an execution client to generate the `jwt.hex` token.
 - Use Prysm to generate the `jwt.hex` token:

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
  <pre><code>prysm.bat beacon-chain jwt generate-auth-secret</code></pre>
  </TabItem>
  <TabItem value="others">
  <pre><code>./prysm.sh beacon-chain jwt generate-jwt-secret</code></pre>
  </TabItem>
</Tabs>

Prysm will output a `jwt.hex` file path.
