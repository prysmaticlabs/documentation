## Create JWT token

The connection between your beacon node and execution node needs to be authenticated when formed over HTTP. Although this requirement currently applies only to nodes running on Ropsten and Sepolia, it will soon apply to Goerli-Prater and then Mainnet.

To authenticate the HTTP connection between beacon node / execution node, a **JWT token** is needed. [JWT tokens](https://jwt.io/) are an industry-standard way to form a secure connection between two parties. Generating a JWT token will allow your beacon node to form an authenticated HTTP connection with your execution node. 

There are several ways to generate this JWT token:

 - Use an online generator like [this](https://seanwasere.com/generate-random-hex/). Copy and paste this value into a `jwt.hex` file.
 - Use a utility like OpenSSL to create the token via command: `openssl rand -hex 32 | tr -d "\n" > "jwt.hex"`.
 - Use an execution client to generate the `jwt.hex` token.
 - Use Prysm to generate the `jwt.hex` token.

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

Prysm will output a `jwt.hex` file path. If you're running on **Ropsten** or **Sepolia**, record this - we'll use it in the next step. If you're running on **Mainnet** or **Goerli-Prater**, you won't use this now, but be prepared to use it when these networks are Merged.

## Configure execution node

Your execution node will need to **use the JWT token** from the previous step, and it will need to **expose a new port**. This new port exposes your execution node's **Engine API**, a new API that facilitates Ethereum's transition to a proof-of-stake consensus mechanism.

Using the latest version of your execution client software, issue the following command to configure your execution node's JWT token and Engine API endpoint:

<Tabs groupId="execution-clients" defaultValue="nethermind" values={[
{label: 'Nethermind', value: 'nethermind'},
{label: 'Besu', value: 'besu'},
{label: 'Geth', value: 'geth'}
]}>
  <TabItem value="nethermind">
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Ropsten', value: 'ropsten'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Mainnet', value: 'mainnet'}
    ]}>
      <TabItem value="ropsten">
        <pre><code>Nethermind.Runner --config ropsten --JsonRpc.Enabled true --JsonRpc.JwtSecretFile=path/to/jwt.hex --Merge.TerminalTotalDifficulty 50000000000000000</code></pre>
      </TabItem>
      <TabItem value="sepolia">
        <pre><code>Nethermind.Runner --config sepolia --JsonRpc.Enabled true --JsonRpc.JwtSecretFile=path/to/jwt.hex --Merge.TerminalTotalDifficulty 17000000000000000</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <div class="admonition admonition-caution alert alert--warning">
          <div class="admonition-content"><p><strong>Goerli</strong> isn't ready for Merge configuration yet, so no changes are needed.</p></div>
        </div>
        <pre><code>Nethermind.Runner --config goerli --JsonRpc.Enabled true</code></pre>
      </TabItem>
      <TabItem value="mainnet">
        <div class="admonition admonition-caution alert alert--warning">
          <div class="admonition-content"><p><strong>Mainnet</strong> isn't ready for Merge configuration yet, so no changes are needed.</p></div>
        </div>
        <pre><code>Nethermind.Runner --config mainnet --JsonRpc.Enabled true</code></pre>
      </TabItem>
    </Tabs>
    <p>See Nethermind's <a href='https://docs.nethermind.io/nethermind/first-steps-with-nethermind/running-nethermind-post-merge'>Running Nethermind Post Merge</a> for more information.</p>
  </TabItem>
  <TabItem value="besu">
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Ropsten', value: 'ropsten'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Mainnet', value: 'mainnet'}
    ]}>
      <TabItem value="ropsten">
        <pre><code>besu --network=ropsten --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=path/to/jwt.hex  --engine-host-allowlist="*" --override-genesis-config="terminalTotalDifficulty=50000000000000000"</code></pre>
      </TabItem>
      <TabItem value="sepolia">
        <pre><code>besu --network=sepolia --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=path/to/jwt.hex  --engine-host-allowlist="*" --override-genesis-config="terminalTotalDifficulty=17000000000000000"</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <div class="admonition admonition-caution alert alert--warning">
          <div class="admonition-content"><p><strong>Goerli</strong> isn't ready for Merge configuration yet, so no changes are needed.</p></div>
        </div>
        <pre><code>besu --network=goerli --rpc-http-enabled</code></pre>
      </TabItem>
      <TabItem value="mainnet">
        <div class="admonition admonition-caution alert alert--warning">
          <div class="admonition-content"><p><strong>Mainnet</strong> isn't ready for Merge configuration yet, so no changes are needed.</p></div>
        </div>
        <pre><code>besu --network=mainnet --rpc-http-enabled</code></pre>
      </TabItem>
    </Tabs>
    <p>See Besu's <a href='https://besu.hyperledger.org/en/stable/Reference/CLI/CLI-Syntax/'>command-line options</a> for parameter definitions.</p>
  </TabItem>
  <TabItem value="geth">
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Ropsten', value: 'ropsten'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Mainnet', value: 'mainnet'}
    ]}>
      <TabItem value="ropsten">
        <pre><code>geth --ropsten --http --http.api eth,net,engine,admin --authrpc.vhosts="localhost" --authrpc.jwtsecret=path/to/jwt.hex --override.terminaltotaldifficulty 50000000000000000</code></pre>
      </TabItem>
      <TabItem value="sepolia">
        <pre><code>geth --sepolia --http --http.api eth,net,engine,admin --authrpc.vhosts="localhost" --authrpc.jwtsecret=path/to/jwt.hex --override.terminaltotaldifficulty 17000000000000000</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <div class="admonition admonition-caution alert alert--warning">
          <div class="admonition-content"><p><strong>Goerli</strong> isn't ready for Merge configuration yet, so no changes are needed.</p></div>
        </div>
        <pre><code>geth --goerli --http --http.api eth,net,engine,admin</code></pre>
      </TabItem>
      <TabItem value="mainnet">
        <div class="admonition admonition-caution alert alert--warning">
          <div class="admonition-content"><p><strong>Mainnet</strong> isn't ready for Merge configuration yet, so no changes are needed.</p></div>
        </div>
        <pre><code>geth --mainnet --http --http.api eth,net,engine,admin</code></pre>
      </TabItem>
    </Tabs>
    <p>See Geth's <a href='https://geth.ethereum.org/docs/interface/command-line-options'>command-line options</a> for parameter definitions.</p>
  </TabItem>
</Tabs>


## Configure beacon node

Next, we'll configure your beacon node to consume your JWT token so it can form an authenticated HTTP connection with your execution node. 

If you're running a validator, specifying a `suggested-fee-recipient` wallet address will allow you to earn what were previously miner transaction fee tips. Note that transaction fee tips are forwarded to a Ethereum Mainnet address (liquid, withdrawable), not to your validator's account balance (illiquid, not yet withdrawable). This `suggested-fee-recipient` address **must** be specified if you're running a validator, otherwise the transaction fee tips that you earn will be permanently lost. See [Configuring a Fee Recipient Address](./execution-node/fee-recipient.md) to learn more about this feature.

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Ropsten', value: 'ropsten'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Mainnet', value: 'mainnet'}
    ]}>
      <TabItem value="ropsten">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state from Github</a>.</p>
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8551 --ropsten --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
      <TabItem value="sepolia">
      <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a>.</p>
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8551 --sepolia --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <div class="admonition admonition-caution alert alert--warning">
          <div class="admonition-content"><p><strong>Prater</strong> isn't ready for Merge configuration yet, so no changes are needed.</p></div>
        </div>
        <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a>.</p>
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8545 --prater --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
      <TabItem value="mainnet">
        <div class="admonition admonition-caution alert alert--warning">
          <div class="admonition-content"><p><strong>Mainnet</strong> isn't ready for Merge configuration yet, so no changes are needed.</p></div>
        </div>
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8545 --mainnet --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="others">
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Ropsten', value: 'ropsten'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Mainnet', value: 'mainnet'}
    ]}> 
    <TabItem value="ropsten">
      <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state from Github</a>.</p>
      <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8551 --ropsten --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
    </TabItem>
    <TabItem value="sepolia">
      <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a>.</p>
      <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8551 --sepolia --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
    </TabItem>
    <TabItem value="goerli-prater">
      <div class="admonition admonition-caution alert alert--warning">
          <div class="admonition-content"><p><strong>Prater</strong> isn't ready for Merge configuration yet, so no changes are needed.</p></div>
      </div>
      <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a>.</p>
      <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8545 --prater --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
    </TabItem>
    <TabItem value="mainnet">
      <div class="admonition admonition-caution alert alert--warning">
          <div class="admonition-content"><p><strong>Mainnet</strong> isn't ready for Merge configuration yet, so no changes are needed.</p></div>
      </div>
      <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8545 --mainnet --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
    </TabItem>
  </Tabs>
  </TabItem>
</Tabs>