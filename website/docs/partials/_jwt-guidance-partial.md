import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import JwtGenerationPartial from '@site/docs/partials/_jwt-generation-partial.md';

After The Merge, beacon nodes will require a locally-running execution node. The connection between your beacon node and execution node will require **JWT authentication**. This how-to shows you how to create and configure your JWT token.

<JwtGenerationPartial />

## Configure execution node

Your execution node will need to **expose a new port** and then **use the JWT token** to authenticate your beacon node's connection to that port. This new port exposes your execution node's **Engine API**, a new API that facilitates Ethereum's transition to a proof-of-stake consensus mechanism.

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
        With JWT configured (when Merge-testing):
        <pre><code>Nethermind.Runner --config goerli --JsonRpc.Enabled true --JsonRpc.Enabled true --JsonRpc.JwtSecretFile=path/to/jwt.hex</code></pre>
        Without JWT configured:
        <pre><code>Nethermind.Runner --config goerli --JsonRpc.Enabled true</code></pre>
      </TabItem>
      <TabItem value="mainnet">
        <div class="admonition admonition-caution alert alert--warning">
          <div class="admonition-content"><p><strong>Mainnet</strong> isn't ready for Merge configuration yet, so JWT configuration isn't available.</p></div>
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
        When Merge-testing:
        <pre><code>besu --network=goerli --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=path/to/jwt.hex  --engine-host-allowlist="*"</code></pre>
        When not Merge-testing:
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
        When Merge-testing:
        <pre><code>geth --goerli --http --http.api eth,net,engine,admin --authrpc.vhosts="localhost" --authrpc.jwtsecret=path/to/jwt.hex</code></pre>
        When not Merge-testing:
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
        <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a>.</p>
        <p>If you're Merge-testing:</p>
        <pre><code>prysm.bat beacon-chain --http-web3provider=http://localhost:8551 --prater --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
        <p>If you're not Merge-testing:</p>
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
      <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a>.</p>
      If you're Merge-testing:
      <pre><code>./prysm.sh beacon-chain --http-web3provider=http://localhost:8551 --prater --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      If you're not Merge-testing:
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