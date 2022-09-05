<table>
    <tr>
        <th style={{minWidth: 180 + 'px'}}>Scenario</th> 
        <th>Solution</th>
    </tr>
    <tr>
      <td>Waiting for peers / peer disconnected / no active peers: <code>Waiting for enough suitable peers before syncing...</code> <code>msg="Peer disconnected" active=0</code></td>
      <td>Peers will continuously disconnect and reconnect, so don't worry about <code>Peer disconnected</code> messages. If your beacon node is struggling to find peers: <br/>
      <ul>
          <li>Your beacon node might be suffering from connectivity problems. Visit <a href='/docs/prysm-usage/p2p-host-ip'>Improve P2P connectivity</a> for connectivity troubleshooting guidance. Ensure that your firewall isn't restricting any <strong>outbound</strong> ports for Prysm.</li>
          <li>You may be using an incorrect genesis state or network flag. Every test network requires its own genesis state and network flag. Visit our <a href='../install/install-with-script'>Quickstart</a> for the latest test network parameters.</li>
      </ul>
      </td>
    </tr>
    <tr>
      <td>Beacon node is stuck during initial sync.</td>
      <td>If your node seems stuck (either doing nothing, or stuck in a loop) while syncing, a restart will usually resolve the problem. If you're on Windows, try selecting your console output window and hitting <code>ENTER</code> - this can "unpause" a paused console output stream.</td>
    </tr>
    <tr>
      <td>Node is currently optimistic and cannot serve validators: <code>level=error msg="Could not request attestation to sign at slot" error="rpc error: code = Unavailable desc = the node is currently optimistic and cannot serve validators" prefix=validator pubKey=0x01234 slot=65740</code></td>
      <td>This usually means that your execution client isn't yet synchronized. Visit <a href='../monitoring/checking-status'>Check Node and Validator Status</a> to learn how to check the sync status of your execution client.</td>
    </tr>
    <tr>
      <td><code>Could not read JWT secret</code>, <code>Could not access JWT secret</code></td>
      <td>You, your terminal window, or the script you're using may not have the permissions required in order to read or write your JWT token. Try elevating privileges or running as Administrator (if you're on Windows).</td>
    </tr>
    <tr>
      <td><code>could not get ancestor state: failed to unmarshal encoding: incorrect size</code></td>
      <td>This usually indicates that your beacon node's data has become corrupt. Try restarting your beacon node with a new or cleared data directory. Consider using [Checkpoint Sync](../../prysm-usage/checkpoint-sync.md) to reduce sync time.</td>
    </tr>
    <tr>
      <td><code>could not process block: could not process block header: parent root 0x... does not match the latest block header signing root in state</code></td>
      <td>This error is being actively investigated. See <a href='https://github.com/prysmaticlabs/prysm/issues/11279'>this open issue</a> for more information.</td>
    </tr>
    <tr>
      <td><code>Could not check configuration values between execution and consensus client" error="method not found" prefix=powchain</code></td>
      <td>Geth users see this error when they're using an old Geth binary. Make sure you're using the <a href='https://github.com/ethereum/go-ethereum/releases'>latest stable release of Geth</a>.</td>
    </tr>
    <tr>
      <td><code>weak-subjectivity-checkpoint not provided. Prysm recommends providing a weak subjectivity checkpoint for nodes synced from genesis</code></td>
      <td>You can safely ignore this warning - it will be removed in an upcoming Prysm release. See <a href='../prysm-usage/checkpoint-sync'>How to configure Checkpoint Sync</a> if you'd like to learn more about checkpoint sync.</td>
    </tr>
    <tr>
      <td>Could not connect to execution client endpoint" error="could not make initial request to verify execution chain ID: 401 Unauthorized</td>
      <td></td>
    </tr>
    <tr>
      <td>level=error msg="Could not connect to execution client endpoint" error="could not make initial request to verify execution chain ID: Post "http://localhost:8551/": dial tcp 127.0.0.1:8551: connect: connection refused" prefix=powchain</td>
      <td></td>
    </tr>
</table>