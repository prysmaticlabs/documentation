import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<p class='hidden-in-jwt-guide hidden-in-mergeprep-guide'>In this step, you'll run a beacon node using Prysm.</p>

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
        <p class='hidden-in-jwt-guide hidden-in-mergeprep-guide'>Use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --jwt-secret=path/to/jwt.hex --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre></TabItem>
                <TabItem value="ipc">
                  <div class="admonition admonition-info alert alert--info"><div class="admonition-content"><p><code>--http-web3provider</code> is deprecated and has been replaced with <code>--execution-endpoint</code>, but IPC currently only works through <code>--http-web3provider</code> on Windows. This will be fixed in our next release. You can safely ignore any related "deprecated flag" warnings you see in the meantime.</p></div></div>
                  <pre><code>prysm.bat beacon-chain --http-web3provider=//./pipe/geth-or-nethermind.ipc --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre>
                </TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="goerli-prater">
        <p class='hidden-in-jwt-guide'>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --prater --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre></TabItem>
                <TabItem value="ipc">
                <div class="admonition admonition-info alert alert--info"><div class="admonition-content"><p><code>--http-web3provider</code> is deprecated and has been replaced with <code>--execution-endpoint</code>, but IPC currently only works through <code>--http-web3provider</code> on Windows. This will be fixed in our next release. You can safely ignore any related "deprecated flag" warnings you see in the meantime.</p></div></div>
                <pre><code>prysm.bat beacon-chain --http-web3provider=//./pipe/geth-or-nethermind.ipc --prater --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre></TabItem>
            </Tabs> 
      </TabItem>
      <TabItem value="sepolia">
        <p class='hidden-in-jwt-guide'>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --sepolia --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre></TabItem>
                <TabItem value="ipc">
                <div class="admonition admonition-info alert alert--info"><div class="admonition-content"><p><code>--http-web3provider</code> is deprecated and has been replaced with <code>--execution-endpoint</code>, but IPC currently only works through <code>--http-web3provider</code> on Windows. This will be fixed in our next release. You can safely ignore any related "deprecated flag" warnings you see in the meantime.</p></div></div>
                <pre><code>prysm.bat beacon-chain --http-web3provider=//./pipe/geth-or-nethermind.ipc --sepolia --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --genesis-state=genesis.ssz</code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="ropsten">
        <p class='hidden-in-jwt-guide'>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --ropsten --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre></TabItem>
                <TabItem value="ipc">
                <div class="admonition admonition-info alert alert--info"><div class="admonition-content"><p><code>--http-web3provider</code> is deprecated and has been replaced with <code>--execution-endpoint</code>, but IPC currently only works through <code>--http-web3provider</code> on Windows. This will be fixed in our next release. You can safely ignore any related "deprecated flag" warnings you see in the meantime.</p></div></div>
                <pre><code>prysm.bat beacon-chain --http-web3provider=//./pipe/geth-or-nethermind.ipc --ropsten --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --genesis-state=genesis.ssz</code></pre></TabItem>
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
                <TabItem value="ipc"><pre><code>./prysm.sh beacon-chain --execution-endpoint=$HOME/.ethereum/geth-or-nethermind.ipc --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="goerli-prater">
        <p class='hidden-in-jwt-guide'>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Prater genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --prater --jwt-secret=path/to/jwt.hex --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>./prysm.sh beacon-chain --execution-endpoint=$HOME/.ethereum/geth-or-nethermind.ipc --prater --genesis-state=genesis.ssz --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9</code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="sepolia">
        <p class='hidden-in-jwt-guide'>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --sepolia --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>./prysm.sh beacon-chain --execution-endpoint=$HOME/.ethereum/geth-or-nethermind.ipc --sepolia --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --genesis-state=genesis.ssz</code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="ropsten">
        <p class='hidden-in-jwt-guide'>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/ropsten-beacon-chain/genesis.ssz'>Ropsten genesis state from Github</a> into your <code>consensus/prysm</code> directory. Then use the following command to start a beacon node that connects to your local execution node:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --ropsten --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --jwt-secret=jwt.hex --genesis-state=genesis.ssz</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>./prysm.sh beacon-chain --execution-endpoint=$HOME/.ethereum/geth-or-nethermind.ipc --ropsten --suggested-fee-recipient=0x01234567722E6b0000012BFEBf6177F1D2e9758D9 --genesis-state=genesis.ssz</code></pre></TabItem>
            </Tabs>
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

<div class='hidden-in-jwt-guide hidden-in-mergeprep-guide'>

If you're running a validator, specifying a <code>suggested-fee-recipient</code> wallet address will allow you to earn what were previously miner transaction fee tips. See [How to configure Fee Recipient](../../execution-node/fee-recipient.md) for more information about this feature.

Your beacon node will now begin syncing. This usually takes a couple days, but it can take longer depending on your network and hardware specs.

<p class="hidden-in-mergeprep-guide">Congratulations - you’re now running a <strong>full, Merge-ready Ethereum node</strong>. To check the status of your node, visit <a href='https://docs.prylabs.network/docs/monitoring/checking-status'>Check node and validator status</a>.</p>

</div>
