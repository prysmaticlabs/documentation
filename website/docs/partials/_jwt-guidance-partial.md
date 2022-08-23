import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import JwtGenerationPartial from '@site/docs/partials/_jwt-generation-partial.md';

<JwtGenerationPartial />

## Configure execution node

Your execution node will need to **expose a new port** and then **use the JWT token** to authenticate your beacon node's connection to that port. This new port exposes your execution node's **Engine API**, a new API that facilitates Ethereum's transition to a proof-of-stake consensus mechanism.

Using the latest version of your execution client software, issue the following command to configure your execution node's JWT token and Engine API endpoint:

import QuickstartRunExecutionNodeJWTPartial from '@site/docs/install/partials/_quickstart-run-execution-node-jwt.md';

<QuickstartRunExecutionNodeJWTPartial />

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
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state from Github</a> and run the following command:</p>
        <pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --ropsten --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
      <TabItem value="sepolia">
      <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a> and run the following command:</p>
        <pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --sepolia --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a>.</p>
        <pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --prater --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
      </TabItem>
      <TabItem value="mainnet">
        <pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --mainnet --jwt-secret=path/to/jwt.hex --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
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
      <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state from Github</a>and run the following command:</p>
      <pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --ropsten --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
    </TabItem>
    <TabItem value="sepolia">
      <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a> and run the following command:</p>
      <pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --sepolia --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
    </TabItem>
    <TabItem value="goerli-prater">
      <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a>.</p>
      <pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --prater --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
    </TabItem>
    <TabItem value="mainnet">
      <pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --jwt-secret=path/to/jwt.hex --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
    </TabItem>
  </Tabs>
  </TabItem>
</Tabs>