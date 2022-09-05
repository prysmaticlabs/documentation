import {GenerateTroubleshootingReportWidget} from '@site/src/components/GenerateTroubleshootingReportWidget.js';

<GenerateTroubleshootingReportWidget />

<div class='troubleshooting-report-area'>
    <p>Execution node startup command</p>
    <span><strong>Tip:</strong> We recommend redacting wallet addresses, IP addresses, and other personal information as a general operational security best practice.</span>
    <textarea id="el-cmd" rows="4" placeholder='Paste something like "Nethermind.Runner --JsonRpc.Enabled true --HealthChecks.Enabled true" (or Docker config) here...'></textarea>
    <p>Beacon node startup command</p>
    <textarea id="bn-cmd" rows="4" placeholder='Paste something like "./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --jwt-secret=path/to/jwt.hex" (or Docker config) here...'></textarea>
    <p>Validator node startup command</p>
    <textarea id="vn-cmd" rows="4" placeholder='Paste something like "./prysm.sh validator" (or Docker config) here...'></textarea>
    <p>Unexpected output</p>
    <span><strong>Tip:</strong> Paste the ~100 lines of output before and including the output you're asking about.</span>
    <textarea id="output" rows="8" placeholder='Paste/share your unexpected output here...'></textarea>
    <a id='generate-report' class='generate-report'>Generate troubleshooting report</a>
    <div id='generated-report' class='generated-report'>Complete the checklist above before generating...</div>
</div>