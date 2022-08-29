<table>
    <tr>
        <th style={{minWidth: 180 + 'px'}}>Scenario</th> 
        <th>Solution</th>
    </tr>
    <tr>
      <td><code>chain not synced beyond EIP-155</code></td>
      <td>This usually means that your execution client needs more time to "catch up", which you don't need to worry about. If you see that your node is connected to peers and is importing data, your node is healthy.</td>
    </tr>
    <tr>
      <td><code>Fatal: Failed to register the Ethereum service: genesis not found in chain</code></td>
      <td>This can happen when your Geth tries to use an old data directory. Try restarting Geth with a new data directory specified.</td>
    </tr>
    <tr>
      <td>Can't find peers on mainnet</td>
      <td>Some users have reported peer-to-peer connectivity issues that were caused by old binaries or old data directories. Try using a new data directory, make sure you're using the latest version of your execution client software, and review <a href='../prysm-usage/p2p-host-ip'>Configure ports and firewalls for improved network connectivity</a> for port configuration guidance.</td>
    </tr>
    <tr>
      <td>I'm running on mainnet, but I see a testnet (Goerli, Prater, etc) specified in my output logs</td>
      <td>Your execution client may be using an old binary, or an old database. Try using a new data directory, and make sure you're using the latest version of your execution client software.</td>
    </tr>
</table>