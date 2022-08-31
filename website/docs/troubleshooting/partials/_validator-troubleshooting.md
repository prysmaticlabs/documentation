<table>
    <tr>
        <th style={{minWidth: 180 + 'px'}}>Scenario</th> 
        <th>Solution</th>
    </tr>
    <tr>
      <td>You see <code>Waiting for keymanager to initialize validator client with web UI...</code></td>
      <td>You'll usually see this message when your beacon node is trying to interact with a validator client instance before the beacon node is fully synced. This is a known limitation. When your beacon node is finished syncing, this message should go away. Visit <a href='../monitoring/checking-status'>Check Node and Validator Status</a> to learn how to check the sync status of your beacon node.</td>
    </tr>
    <tr>
      <td>Everything seems fine, but your validator balance is going down.</td>
      <td>If your validator client is running fine without errors but you're seeing your validator balance decrease, your beacon node may be experiencing issues with connectivity, stability, or synchronization. Check your beacon node logs to see if there are any errors or crashes.</td>
    </tr>
    <tr>
      <td>Can't import accounts, stuck in a loop. You see <code>Could not import accounts: could not write accounts: file already exists without proper 0600 permissions</code></td>
      <td>This usually happens when the account you're using doesn't have permission to read and write to the target directory. See <a href='https://github.com/prysmaticlabs/prysm/issues/11130#issuecomment-1199984124'>this GitHub issue</a> for a workaround.</td>
    </tr>
</table>
