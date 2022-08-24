import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this step, you'll run a beacon node using Prysm.

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">  
        <p>Use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --jwt-secret=path/to/jwt.hex --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre></TabItem>
                <TabItem value="ipc">
                  <div class="admonition admonition-info alert alert--info"><div class="admonition-content"><p><code>--http-web3provider</code> is deprecated and has been replaced with <code>--execution-endpoint</code>, but IPC currently only works through <code>--http-web3provider</code> on Windows. This will be fixed in our next release. You can safely ignore any related "deprecated flag" warnings you see in the meantime.</p></div></div>
                  <pre><code>prysm.bat beacon-chain --http-web3provider=//./pipe/geth.ipc --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
                </TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="goerli-prater">
        <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --prater --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre></TabItem>
                <TabItem value="ipc">
                <div class="admonition admonition-info alert alert--info"><div class="admonition-content"><p><code>--http-web3provider</code> is deprecated and has been replaced with <code>--execution-endpoint</code>, but IPC currently only works through <code>--http-web3provider</code> on Windows. This will be fixed in our next release. You can safely ignore any related "deprecated flag" warnings you see in the meantime.</p></div></div>
                <pre><code>prysm.bat beacon-chain --http-web3provider=//./pipe/geth.ipc --prater --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre></TabItem>
            </Tabs> 
      </TabItem>
      <TabItem value="sepolia">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --sepolia --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre></TabItem>
                <TabItem value="ipc">
                <div class="admonition admonition-info alert alert--info"><div class="admonition-content"><p><code>--http-web3provider</code> is deprecated and has been replaced with <code>--execution-endpoint</code>, but IPC currently only works through <code>--http-web3provider</code> on Windows. This will be fixed in our next release. You can safely ignore any related "deprecated flag" warnings you see in the meantime.</p></div></div>
                <pre><code>prysm.bat beacon-chain --http-web3provider=//./pipe/geth.ipc --sepolia --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --genesis-state=genesis.ssz</code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="ropsten">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --ropsten --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre></TabItem>
                <TabItem value="ipc">
                <div class="admonition admonition-info alert alert--info"><div class="admonition-content"><p><code>--http-web3provider</code> is deprecated and has been replaced with <code>--execution-endpoint</code>, but IPC currently only works through <code>--http-web3provider</code> on Windows. This will be fixed in our next release. You can safely ignore any related "deprecated flag" warnings you see in the meantime.</p></div></div>
                <pre><code>prysm.bat beacon-chain --http-web3provider=//./pipe/geth.ipc --ropsten --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --genesis-state=genesis.ssz</code></pre></TabItem>
            </Tabs>
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="others">
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <p>Use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --jwt-secret=path/to/jwt.hex --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>./prysm.sh beacon-chain --execution-endpoint=$HOME/.ethereum/geth.ipc --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="goerli-prater">
        <p>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --prater --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>./prysm.sh beacon-chain --execution-endpoint=$HOME/.ethereum/geth.ipc --prater --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="sepolia">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --sepolia --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>./prysm.sh beacon-chain --execution-endpoint=$HOME/.ethereum/geth.ipc --sepolia --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --genesis-state=genesis.ssz</code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="ropsten">
        <p>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --ropsten --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>./prysm.sh beacon-chain --execution-endpoint=$HOME/.ethereum/geth.ipc --ropsten --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --genesis-state=genesis.ssz</code></pre></TabItem>
            </Tabs>
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

If you're running a validator, specifying a <code>suggested-fee-recipient</code> wallet address will allow you to earn what were previously miner transaction fee tips. See [How to configure Fee Recipient](../../execution-node/fee-recipient.md) for more information about this feature.

Your beacon node will now begin syncing. This usually takes a couple days, but it can take longer depending on your network and hardware specs.

You can check your beacon node's <a href='https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Node/getSyncingStatus'>sync status</a> by running the following command from a separate terminal window:

```
curl http://localhost:3500/eth/v1/node/syncing | jq
```

This should produce the following output:


```
{"data":{"head_slot":"6944","sync_distance":"3003133","is_syncing":true,"is_optimistic":true}}
```

When you see `"is_syncing":false`, your beacon node is fully synchronized. When you see `"is_optimistic":false`, your execution node is fully synchronized.

You can verify that your beacon node has successfully connected to your execution node by running the following command from a separate terminal window:

```
curl http://localhost:3500/eth/v1alpha1/node/eth1/connections
```

<!-- You should see TODO. -->

Congratulations - you’re now running a <strong>full Ethereum node</strong>. Your full node consists of an <strong>execution node</strong> in Ethereum’s execution layer, and a <strong>beacon node</strong> in Ethereum’s consensus layer.