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
</table>