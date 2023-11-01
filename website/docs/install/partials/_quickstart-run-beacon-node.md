import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<p className='hidden-in-jwt-guide hidden-in-mergeprep-guide'>In this step, you'll run a beacon node using Prysm.</p>

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <Tabs groupId="network" defaultValue="mainnet" values={[
      {label: 'Mainnet', value: 'mainnet'},
      {label: 'Goerli', value: 'goerli'},
      {label: 'Sepolia', value: 'sepolia'},
      {label: 'Holesky', value: 'holesky'}
    ]}>
      <TabItem value="mainnet">
        <Tabs groupId="protocol" defaultValue="jwt" values={[
          {label: 'JWT', value: 'jwt'},
          {label: 'IPC', value: 'ipc'}
        ]}>
          <TabItem value="jwt">
            <p>Navigate to your <code>consensus</code> directory and run the following command to start your beacon node that connects to your local execution node by replacing <code>&lt;PATH_TO_JWT_FILE&gt;</code> by the path to the JWT file generated during the previous step:</p>
            <pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --mainnet --jwt-secret=&lt;PATH_TO_JWT_FILE&gt;</code></pre>
          </TabItem>
          <TabItem value="ipc">
            <p>Navigate to your <code>consensus</code> directory and run the following command to start your beacon node that connects to your local execution node by replacing <code>&lt;PATH_TO_IPC_FILE&gt;</code> by the path to the IPC file the execution client created for you during the previous step:</p>
            <pre><code>prysm.bat beacon-chain --execution-endpoint=&lt;PATH_TO_IPC_FILE&gt; --mainnet </code></pre>
          </TabItem>
        </Tabs>
      </TabItem>
      <TabItem value="goerli">
        <p className='hidden-in-jwt-guide'>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Goerli genesis state from Github</a> into your <code>consensus</code> directory. Then use the following command to start a beacon node that connects to your local execution node by replacing <code>&lt;PATH_TO_IPC_FILE&gt;</code> by the path to the IPC file the execution client created for you during the previous step:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
          {label: 'JWT', value: 'jwt'},
          {label: 'IPC', value: 'ipc'}
        ]}>
          <TabItem value="jwt"><pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --goerli --jwt-secret=&lt;PATH_TO_JWT_FILE&gt; --genesis-state=genesis.ssz </code></pre></TabItem>
          <TabItem value="ipc"><pre><code>prysm.bat beacon-chain --execution-endpoint=&lt;PATH_TO_IPC_FILE&gt; --goerli --genesis-state=genesis.ssz</code></pre></TabItem>
        </Tabs>
        <p>You may wonder why the previous link contains the "Prater" word instead of "Goerli". The reason is, in the pre-merge world, "Goerli" was the name of the execution layer for this testnet, and "Prater" the name of the consensus layer for this testnet. Post-merge, the name "Prater" was deprecated and now only "Goerli" remains.</p>
      </TabItem>
      <TabItem value="sepolia">
        <p className='hidden-in-jwt-guide'>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a> into your <code>consensus</code> directory. Then use the following command to start a beacon node that connects to your local execution node by replacing <code>&lt;PATH_TO_IPC_FILE&gt;</code> by the path to the IPC file the execution client created for you during the previous step:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
          {label: 'JWT', value: 'jwt'},
          {label: 'IPC', value: 'ipc'}
        ]}>
          <TabItem value="jwt"><pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --sepolia --jwt-secret=&lt;PATH_TO_JWT_FILE&gt; --genesis-state=genesis.ssz</code></pre></TabItem>
          <TabItem value="ipc"><pre><code>prysm.bath beacon-chain --execution-endpoint=&lt;PATH_TO_IPC_FILE&gt; --sepolia --genesis-state=genesis.ssz</code></pre></TabItem>
        </Tabs>
      </TabItem>
      <TabItem value="holesky">
        <p className='hidden-in-jwt-guide'>Download the <a href='https://github.com/eth-clients/holesky/blob/main/custom_config_data/genesis.ssz'>Holesky genesis state from Github</a> into your <code>consensus</code> directory. Then use the following command to start a beacon node that connects to your local execution node by replacing <code>&lt;PATH_TO_IPC_FILE&gt;</code> by the path to the IPC file the execution client created for you during the previous step:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
          {label: 'JWT', value: 'jwt'},
          {label: 'IPC', value: 'ipc'}
        ]}>
          <TabItem value="jwt"><pre><code>prysm.bat beacon-chain --execution-endpoint=http://localhost:8551 --holesky --jwt-secret=&lt;PATH_TO_JWT_FILE&gt; --genesis-state=genesis.ssz</code></pre></TabItem>
          <TabItem value="ipc"><pre><code>prysm.bat beacon-chain --execution-endpoint=&lt;PATH_TO_IPC_FILE&gt; --holesky --genesis-state=genesis.ssz</code></pre></TabItem>
        </Tabs>
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="others">
    <Tabs groupId="network" defaultValue="mainnet" values={[
      {label: 'Mainnet', value: 'mainnet'},
      {label: 'Goerli', value: 'goerli'},
      {label: 'Sepolia', value: 'sepolia'},
      {label: 'Holesky', value: 'holesky'}
    ]}>
      <TabItem value="mainnet">
        <Tabs groupId="protocol" defaultValue="jwt" values={[
          {label: 'JWT', value: 'jwt'},
          {label: 'IPC', value: 'ipc'}
        ]}>
          <TabItem value="jwt">
            <p>Navigate to your <code>consensus</code> directory and run the following command to start your beacon node that connects to your local execution node by replacing <code>&lt;PATH_TO_JWT_FILE&gt;</code> by the path to the JWT file generated during the previous step:</p>
            <pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --mainnet --jwt-secret=&lt;PATH_TO_JWT_FILE&gt;</code></pre>
          </TabItem>
          <TabItem value="ipc">
            <p>Navigate to your <code>consensus</code> directory and run the following command to start your beacon node that connects to your local execution node by replacing <code>&lt;PATH_TO_IPC_FILE&gt;</code> by the path to the IPC file the execution client created for you during the previous step:</p>
            <pre><code>./prysm.sh beacon-chain --execution-endpoint=&lt;PATH_TO_IPC_FILE&gt; --mainnet </code></pre>
          </TabItem>
        </Tabs>
      </TabItem>
      <TabItem value="goerli">
        <p className='hidden-in-jwt-guide'>Download the <a href='https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz'>Goerli genesis state from Github</a> into your <code>consensus</code> directory. Then use the following command to start a beacon node that connects to your local execution node by replacing <code>&lt;PATH_TO_IPC_FILE&gt;</code> by the path to the IPC file the execution client created for you during the previous step:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
          {label: 'JWT', value: 'jwt'},
          {label: 'IPC', value: 'ipc'}
          ]}>
            <TabItem value="jwt"><pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --goerli --jwt-secret=&lt;PATH_TO_JWT_FILE&gt; --genesis-state=genesis.ssz </code></pre></TabItem>
            <TabItem value="ipc"><pre><code>./prysm.sh beacon-chain --execution-endpoint=&lt;PATH_TO_IPC_FILE&gt; --goerli --genesis-state=genesis.ssz</code></pre></TabItem>
          </Tabs>
          <p>You may wonder why the previous link contains the "Prater" word instead of "Goerli". The reason is, in the pre-merge world, "Goerli" was the name of the execution layer for this testnet, and "Prater" the name of the consensus layer for this testnet. Post-merge, the name "Prater" was deprecated and now only "Goerli" remains.</p>
      </TabItem>
      <TabItem value="sepolia">
        <p className='hidden-in-jwt-guide'>Download the <a href='https://github.com/eth-clients/merge-testnets/blob/main/sepolia/genesis.ssz'>Sepolia genesis state from Github</a> into your <code>consensus</code> directory. Then use the following command to start a beacon node that connects to your local execution node by replacing <code>&lt;PATH_TO_IPC_FILE&gt;</code> by the path to the IPC file the execution client created for you during the previous step:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
          {label: 'JWT', value: 'jwt'},
          {label: 'IPC', value: 'ipc'}
        ]}>
          <TabItem value="jwt"><pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --sepolia --jwt-secret=&lt;PATH_TO_JWT_FILE&gt; --genesis-state=genesis.ssz</code></pre></TabItem>
          <TabItem value="ipc"><pre><code>./prysm.sh beacon-chain --execution-endpoint=&lt;PATH_TO_IPC_FILE&gt; --sepolia --genesis-state=genesis.ssz</code></pre></TabItem>
          </Tabs>
      </TabItem>
      <TabItem value="holesky">
        <p className='hidden-in-jwt-guide'>Download the <a href='https://github.com/eth-clients/holesky/blob/main/custom_config_data/genesis.ssz'>Holesky genesis state from Github</a> into your <code>consensus</code> directory. Then use the following command to start a beacon node that connects to your local execution node by replacing <code>&lt;PATH_TO_IPC_FILE&gt;</code> by the path to the IPC file the execution client created for you during the previous step:</p>
        <Tabs groupId="protocol" defaultValue="jwt" values={[
          {label: 'JWT', value: 'jwt'},
          {label: 'IPC', value: 'ipc'}
        ]}>
          <TabItem value="jwt"><pre><code>./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --holesky --jwt-secret=&lt;PATH_TO_JWT_FILE&gt; --genesis-state=genesis.ssz</code></pre></TabItem>
          <TabItem value="ipc"><pre><code>./prysm.sh beacon-chain --execution-endpoint=&lt;PATH_TO_IPC_FILE&gt; --holesky --genesis-state=genesis.ssz</code></pre></TabItem>
        </Tabs>
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

<div className='hidden-in-jwt-guide hidden-in-mergeprep-guide'>

If you are plannig to run a validator, it is <strong>strongly</strong> advised to use the <code>--suggested-fee-recipient=<WALLET ADDRESS\></code> option. When your validator proposes a block, it will allow you to earn block priority fees, also sometimes called "tips". See [How to configure Fee Recipient](../../execution-node/fee-recipient.md) for more information about this feature.

Your beacon node will now begin syncing from genesis. This usually takes a couple days, but it can take longer depending on your network and hardware specs.

It is also possible to sync your beacon node from a checkpoint. This option is considered safer, and will allow your beacon node to sync considerably faster. See [Sync from a checkpoint](../../prysm-usage/checkpoint-sync.md) for more information about this feature.

<p className="hidden-in-mergeprep-guide">Congratulations - you’re now running a <strong>full Ethereum node</strong>. To check the status of your node, visit <a href='https://docs.prylabs.network/docs/monitoring/checking-status'>Check node and validator status</a>.</p>

</div>
