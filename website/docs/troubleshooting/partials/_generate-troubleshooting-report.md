<div class='troubleshooting-report-area'>
    <p>Execution node startup command/config</p>
    <span><strong>Tip:</strong> We recommend redacting wallet addresses and other personal information as a general operational security best practice.</span>
    <textarea rows="4" placeholder='Paste something like "Nethermind.Runner --JsonRpc.Enabled true --HealthChecks.Enabled true" (or Docker config) here...'></textarea>
    <p>Beacon node startup command/config</p>
    <textarea rows="4" placeholder='Paste something like "./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --jwt-secret=path/to/jwt.hex" (or Docker config) here...'></textarea>
    <p>Validator node startup command/config</p>
    <textarea rows="4" placeholder='Paste something like "./prysm.sh validator" (or Docker config) here...'></textarea>
    <p>Unexpected output</p>
    <span><strong>Tip:</strong> Paste the ~100 lines of output before and including the output you're asking about.</span>
    <textarea rows="8" placeholder='Unexpected output goes here...'></textarea>
    <a class='generate-report'>Generate troubleshooting report</a>
    <div class='generated-report'>Troubleshooting report</div>
</div>