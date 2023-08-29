import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="execution-clients" defaultValue="geth" values={[
    {label: 'Execution client:', value: 'label'},
    {label: 'Nethermind', value: 'nethermind'},
    {label: 'Besu', value: 'besu'},
    {label: 'Geth', value: 'geth'}
    ]}>
  <TabItem value="nethermind">
   <p className='hidden-in-jwt-guide hidden-in-mergeprep-guide'>Download the latest stable release of Nethermind for your operating system from the <a href='https://downloads.nethermind.io/'>Nethermind downloads page</a>. Extract the contents into your <code>execution</code> folder. Run the following command to start your execution node:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Holesky', value: 'holesky'},
    ]}>
      <TabItem value="mainnet">
        <Tabs className='tabs-hidden-in-jwt-guide' groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>Nethermind.Runner --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.JwtSecretFile=/path/to/jwt.hex</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>Nethermind.Runner --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.IpcUnixDomainSocketPath=/path/to/&lt;your.ipc&gt;</code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="goerli-prater">
          <Tabs className='tabs-hidden-in-jwt-guide' groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>Nethermind.Runner --config goerli --JsonRpc.Enabled true  --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.JwtSecretFile=/path/to/jwt.hex</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>Nethermind.Runner --config goerli --JsonRpc.Enabled true  --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.IpcUnixDomainSocketPath=/path/to/&lt;your.ipc&gt;</code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="sepolia">
        <Tabs className='tabs-hidden-in-jwt-guide' groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>Nethermind.Runner --config sepolia --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.JwtSecretFile=/path/to/jwt.hex --Merge.TerminalTotalDifficulty 17000000000000000</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>Nethermind.Runner --config sepolia --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.IpcUnixDomainSocketPath=/path/to/&lt;your.ipc&gt; --Merge.TerminalTotalDifficulty 17000000000000000</code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="holesky">
        <Tabs className='tabs-hidden-in-jwt-guide' groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>Nethermind.Runner --config holesky --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.JwtSecretFile=/path/to/jwt.hex --Merge.TerminalTotalDifficulty 17000000000000000</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>Nethermind.Runner --config holesky --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.IpcUnixDomainSocketPath=/path/to/&lt;your.ipc&gt; --Merge.TerminalTotalDifficulty 17000000000000000</code></pre></TabItem>
            </Tabs>
      </TabItem>
    </Tabs>
    <p>See Nethermind's <a href='https://docs.nethermind.io/nethermind/ethereum-client/configuration'>command-line options</a> for parameter definitions.</p>
  </TabItem>
  <TabItem value="besu">
    <p className='hidden-in-jwt-guide hidden-in-mergeprep-guide'>Ensure that the latest 64-bit version of the <a href='https://www.oracle.com/java/technologies/downloads/'>Java JDK</a> is installed. Download the latest stable release of Besu from the <a href='https://github.com/hyperledger/besu/releases'>Besu releases</a> page. OS-specific instructions are available on Besu's <a href='https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Installation-Options/Install-Binaries/'>binary installation page</a>. Run the following command to start your execution node:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Holesky', value: 'holesky'},
    ]}>
      <TabItem value="mainnet">
          <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>besu --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=path/to/jwt.hex  --engine-host-allowlist="*"</code></pre></TabItem>
                <TabItem value="ipc"><div className="admonition admonition-danger alert alert--info"><div className="admonition-content"><p>Content under construction.</p></div></div></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="goerli-prater">
        <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>besu --network=goerli --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=path/to/jwt.hex  --engine-host-allowlist="*"</code></pre></TabItem>
                <TabItem value="ipc"><div className="admonition admonition-danger alert alert--info"><div className="admonition-content"><p>Content under construction.</p></div></div></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="sepolia">
        <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>besu --network=sepolia --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=/path/to/jwt.hex --engine-host-allowlist="*" --override-genesis-config="terminalTotalDifficulty=17000000000000000"</code></pre></TabItem>
                <TabItem value="ipc"><div className="admonition admonition-danger alert alert--info"><div className="admonition-content"><p>Content under construction.</p></div></div></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="holesky">
        <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>besu --network=holesky --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=/path/to/jwt.hex --engine-host-allowlist="*" --override-genesis-config="terminalTotalDifficulty=17000000000000000"</code></pre></TabItem>
                <TabItem value="ipc"><div className="admonition admonition-danger alert alert--info"><div className="admonition-content"><p>Content under construction.</p></div></div></TabItem>
            </Tabs>
      </TabItem>
    </Tabs>
    <p>See Besu's <a href='https://besu.hyperledger.org/en/stable/Reference/CLI/CLI-Syntax/'>command-line options</a> for parameter definitions.</p>
  </TabItem>
  <TabItem value="geth">
    <p className='hidden-in-jwt-guide hidden-in-mergeprep-guide'>Download and run the latest 64-bit stable release of the <strong>Geth installer</strong> for your operating system from the <a href='https://geth.ethereum.org/downloads/'>Geth downloads page</a>.</p>
    <p className='hidden-in-jwt-guide hidden-in-mergeprep-guide'>Navigate to your <code>execution</code> directory and run the following command to start your execution node:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Holesky', value: 'holesky'},
    ]}>
      <TabItem value="mainnet">
        <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>geth --http --http.api eth,net,engine,admin --authrpc.jwtsecret /path/to/jwt.hex </code></pre></TabItem>
                <TabItem value="ipc"><pre><code>geth --http --http.api eth,net,engine,admin </code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="goerli-prater">
        <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>geth --goerli --http --http.api eth,net,engine,admin --authrpc.jwtsecret /path/to/jwt.hex </code></pre></TabItem>
                <TabItem value="ipc"><pre><code>geth --goerli --http --http.api eth,net,engine,admin </code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="sepolia">
        <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>geth --sepolia --http --http.api eth,net,engine,admin --authrpc.jwtsecret /path/to/jwt.hex</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>geth --sepolia --http --http.api eth,net,engine,admin</code></pre></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="holesky">
        <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>geth --holesky --http --http.api eth,net,engine,admin --authrpc.jwtsecret /path/to/jwt.hex</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>geth --holesky --http --http.api eth,net,engine,admin</code></pre></TabItem>
            </Tabs>
      </TabItem>
    </Tabs>
    <p>See Geth's <a href='https://geth.ethereum.org/docs/interface/command-line-options'>command-line options</a> for parameter definitions.</p>
  </TabItem>
</Tabs>

Syncing can take a long time - from hours to days. <span className='hidden-in-jwt-guide hidden-in-execution-guide'>You can proceed to the next step while your execution node syncs.</span>

