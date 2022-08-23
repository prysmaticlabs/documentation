import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this step, you'll use Geth to run an execution-layer client that Prysm's beacon node will connect to.

<p>Download and run the latest 64-bit stable release of the <strong>Geth installer</strong> for your operating system from the <a href='https://geth.ethereum.org/downloads/'>Geth downloads page</a>.</p>

<p>Note that Geth 1.10.22 contains a regression that the team is actively working on. Either monitor the <a href='https://github.com/ethereum/go-ethereum/releases'>Geth releases page on GitHub</a> or join the <a href='https://discord.com/invite/nthXNEv'>Geth Discord</a> for the latest information.</p>

<p>Navigate to your <code>execution</code> directory and run the following command to start your execution node:</p>

<Tabs groupId="network" defaultValue="mainnet" values={[
    {label: 'Mainnet', value: 'mainnet'},
    {label: 'Goerli-Prater', value: 'goerli-prater'},
    {label: 'Sepolia', value: 'sepolia'},
    {label: 'Ropsten', value: 'ropsten'}
]}> 
  <TabItem value="mainnet">
    <pre><code>geth --http --http.api eth,net,engine,admin --datadir . </code></pre>
  </TabItem>
  <TabItem value="goerli-prater">
    <pre><code>geth --goerli --http --http.api eth,net,engine,admin --datadir . </code></pre>
  </TabItem>
  <TabItem value="sepolia">
    <pre><code>geth --sepolia --http --http.api eth,net,engine,admin --datadir . --override.terminaltotaldifficulty 17000000000000000</code></pre>
  </TabItem>
  <TabItem value="ropsten">
    <pre><code>geth --ropsten --http --http.api eth,net,engine,admin --datadir . --override.terminaltotaldifficulty 50000000000000000</code></pre>
  </TabItem>
</Tabs>

<p>See Geth's <a href='https://geth.ethereum.org/docs/interface/command-line-options'>command-line options</a> for parameter definitions.</p>

<p>Your Geth execution node will begin syncing. You can check your Geth execution node's sync status by running the following commands from a separate terminal window:</p>

```
## if you're not using Windows
geth attach 


## if you're using Windows
geth attach ipc:\\.\pipe\geth.ipc
eth.syncing
```

<p>A sync status of <code>false</code> indicates that your node is fully synced. You can proceed to the next step while Geth syncs.</p>

Congratulations - you’re now running an <strong>execution node</strong> in Ethereum’s execution layer.