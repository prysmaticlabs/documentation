---
id: prepare-for-merge
title: Prepare for The Merge
sidebar_label: Prepare for The Merge
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import JwtGuidancePartial from '@site/docs/partials/_jwt-guidance-partial.md';

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="Mick,Raul,James" lastVerifiedDateString="August 24th, 2022" lastVerifiedVersionString="v3.0.0" />

:::info New user?

This guidance is targeted at users who are already running Prysm. If you're starting from scratch, see our [Quickstart](./install/install-with-script.md).

:::

<p><strong>Select a configuration</strong>:</p>

import MultidimensionalContentControlsPartial from '@site/docs/partials/_multidimensional-content-controls-partial.md';

<MultidimensionalContentControlsPartial />


[Prysm v3](https://github.com/prysmaticlabs/prysm/releases/tag/v3.0.0) can be used to run a node on Mainnet using Merge-ready configuration. In this guide, we'll step through the tasks that you need to complete in order to be Merge-prepared. 


## Merge preparation checklist


<div class='hide-tabs mergeprep-guide'>

<div class='checklist'>
    <div class='task'>
        <div class='input-container'><input id="cl-1" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-1">Use Prysm v3.0.0</label>
            <p><a href='https://github.com/prysmaticlabs/prysm/releases/tag/v3.0.0'>Prysm v3</a> is a <strong>Merge-ready release</strong> that includes updates, deprecations, and breaking changes. Review the <a href='https://github.com/prysmaticlabs/prysm/releases/tag/v3.0.0'>release notes</a> to understand how this release impacts your configuration.</p>
        </div>
    </div>
    <div class='task'>
        <div class='input-container'><input id="cl-5" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-5">Unset <code>USE_PRYSM_VERSION</code></label>
            <p>If you've ever set the <code>USE_PRYSM_VERSION</code> environment variable, either clear this variable via <code>UNSET USE_PRYSM_VERSION</code> (Linux/MacOS) / <code>set USE_PRYSM_VERSION=</code> (Windows), or use <code>set USE_PRYSM_VERSION=v3.0.0</code> to ensure that Prysm uses Prysm v3.</p>
        </div>
    </div>
        <div class='task'>
        <div class='input-container'><input id="cl-6" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-6">Verify your Prysm version</label>
            <p>Verify that you're running Prysm <code>v3.0.0</code> by issuing the following command: <code>prysm.sh beacon-chain --version</code> (Linux) <code>prysm.bat beacon-chain --version</code> (Windows).</p>
        </div>
    </div>
    <div class='task'>
        <div class='input-container'><input id="cl-2" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-2">Review "Before and now"</label>
            <p>The <a href='#the-merge-before-and-now'>Before and now</a> section below gives you a high-level overview of the items that you need to keep in mind while preparing for The Merge. See the Ethereum.org <a href='https://blog.ethereum.org/2022/08/24/mainnet-merge-announcement/'>Merge announcement</a> and <a href='https://launchpad.ethereum.org/en/merge-readiness'>Merge readiness checklist</a> for more detailed information.</p>
        </div>
    </div>
    <div class='task'>
        <div class='input-container'><input id="cl-prereqs" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-prereqs">Review system requirements</label>
            <p>Review the <a href='#post-merge-system-requirements'>post-Merge system requirements</a> section below to ensure that your configuration will support The Merge. Note that <strong>a 2TB+ SSD is highly recommended</strong>.</p>
        </div>
    </div>
    <div class='task'>
        <div class='input-container'><input id="cl-3" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-3">Use a Merge-ready version of your execution client</label>
            <p>
            <Tabs className="with-label" groupId="execution-clients" values={[
                {label: 'Geth', value: 'geth'},
                {label: 'Nethermind', value: 'nethermind'},
                {label: 'Besu', value: 'besu'}
                ]}>
                <TabItem value="geth">See <a href='https://github.com/ethereum/go-ethereum/releases'>Geth's releases page</a> and join <a href='https://discord.gg/invite/nthXNEv'>their Discord</a> to stay up to date as we approach Mainnet Merge.</TabItem>
                <TabItem value="nethermind">See <a href='https://github.com/NethermindEth/nethermind/releases'>Nethermind's releases page</a> and join <a href='https://discord.com/invite/DedCdvDaNm'>their Discord</a> to stay up to date as we approach Mainnet Merge.</TabItem>
                <TabItem value="besu">See Besu's <a href='https://github.com/hyperledger/besu/releases'>releases page</a> and join <a href='https://discord.com/invite/hyperledger'>their Discord</a> to stay up to date as we approach Mainnet Merge.</TabItem>
                </Tabs>
            </p>
        </div>
    </div>
    <Tabs className="with-label" groupId="execution-clients" defaultValue="geth" values={[
            {label: 'Execution client:', value: 'label'},
            {label: 'Geth', value: 'geth'},
            {label: 'Nethermind', value: 'nethermind'},
            {label: 'Besu', value: 'besu'}
            ]}>
        <TabItem value="geth">
            <div class='task'>
                <div class='input-container'><input id="cl-4" type='checkbox'/><span class='done'></span></div>
                <div class='guidance-container'>
                    <label for="cl-4">Update Geth now</label>
                    <p>Geth 1.10.22 contains a regression. Update to <a href='https://github.com/ethereum/go-ethereum/releases'>v1.10.23+</a> if you haven't already.</p>
                </div>
            </div>
        </TabItem>
        <TabItem value="nethermind"></TabItem>
        <TabItem value="besu"></TabItem>
    </Tabs>
    <Tabs className="with-label" groupId="protocol" defaultValue="jwt" values={[
        {label: 'EN-BN connection:', value: 'label'},
        {label: 'HTTP-JWT', value: 'jwt'},
        {label: 'IPC', value: 'ipc'}
    ]}>
        <TabItem value="jwt">
            <div class='task'>
                <div class='input-container'><input id="cl-7" type='checkbox'/><span class='done'></span></div>
                <div class='guidance-container'>
                    <label for="cl-7">Configure JWT</label>
                    <p>If you're not using IPC to connect your beacon node and execution node, ensure that both your execution node and beacon node are configured to use JWT authentication. These instructions are included below, and are also available here: <a href='./execution-node/authentication'>Configure JWT</a></p>
                </div>
            </div>
        </TabItem>
        <TabItem value="ipc"></TabItem>
    </Tabs>
    <div class='task'>
        <div class='input-container'><input id="cl-8" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-8">Update your firewall</label>
            <p>If you're not using IPC to connect your beacon node and execution node, your beacon node will need to connect to its execution node on port <code>8551</code>. Previously, port <code>8545</code> was used. Ensure that your firewall rules are updated accordingly, and refer to <a href='./prysm-usage/p2p-host-ip'>Configure ports and firewalls for improved network connectivity</a> for general connectivity improvement tips.</p>
        </div>
    </div>
    <div class='task'>
        <div class='input-container'><input id="cl-9" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-9">Configure a fee recipient address</label>
            <p>If you're running a validator, configuring a fee recipient address will allow you to earn what were previously miners' transaction fee tips. Instructions are provided below, and also here: <a href='./execution-node/fee-recipient'>Configure a Fee Recipient address</a>.</p>
        </div>
    </div>
    <div class='task'>
        <div class='input-container'><input id="cl-expected" type='checkbox'/><span class='done'></span></div>
        <div class='guidance-container'>
            <label for="cl-expected">Ensure that Prysm is running as expected</label>
            <p>See <a href='./monitoring/checking-status'>Check node and validator status</a> to learn how to check the status of your execution node, beacon node, and validator node.</p>
        </div>
    </div>
</div>

<br />

## The Merge: Before and now

| Before                                                                                                         | Now                                                                                                                                      |
|----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| You don't need to run a local execution client. You can use a service like Infura instead.                     | You **do** need to run an execution client. You **can't** use Infura as an execution endpoint provider.                                  |
| The HTTP connection between beacon node and execution node doesn't need to be authenticated using a JWT token. | The HTTP connection between beacon node and execution node **does** need to be authenticated using a JWT token.                          |
| Beacon nodes connect to execution nodes on port `8545` by default when using HTTP.                             | Beacon nodes connect to execution nodes on port **`8551`** by default when using HTTP.                                                   |
| Miners receive transaction fee tips.                                                                           | **Validators** receive transaction fee tips. The "fee" is now a base fee that's burned - block producers earn only transaction fee tips. |
| A fee recipient address does not need to be specified.                                                         | A fee recipient address **does** need to be specified.                                                                                   |
| A 1TB hard drive is enough.                                                                                    | A **2TB+ SSD** is highly recommended.                                                                                                    |


<br />


## Post-Merge system requirements

import QuickstartPrereqsPartial from '@site/docs/install/partials/_quickstart-prereqs.md';

<QuickstartPrereqsPartial />


<Tabs className="with-label hidden-in-jwt-guide" groupId="protocol" values={[
        {label: 'HTTP-JWT', value: 'jwt'},
        {label: 'IPC', value: 'ipc'}
    ]}>
    <TabItem value="jwt">
    
<h2>Configure JWT authentication</h2>

<JwtGuidancePartial />

</TabItem>
<TabItem value="ipc"></TabItem>
</Tabs>

</div>

## Prepare validator node (optional)

Other than ensuring that you're using the [latest stable Prysm release](https://github.com/prysmaticlabs/prysm/releases), validator client configuration doesn't need to be updated for The Merge. A fee recipient address can optionally be configured on your validator node if you want redundancy or multiple fee recipient addresses. See [Configure a Fee Recipient address](./execution-node/fee-recipient.md) to learn more.

<div class="admonition admonition-caution alert alert--warning"><div class="admonition-content"><p><strong>Ensure that you're not running multiple instances of the same validator public key</strong>, especially if you're using scripts or other forms of automation. If the Ethereum network detects two instances of the validator key submitting proposals, attestations, or votes, it may assume malicious intent and slash accordingly.</p></div></div>

## Upgrade hardware

We recommend updating your hard drive to a 2TB+ SSD as soon as possible.

:::tip Congratulations!

You’re now ready for The Merge. If you have any questions, feel free ask them on our [Discord](https://discord.gg/prysmaticlabs).

:::


## Frequently asked questions

**I'm currently running a validator on Ethereum Mainnet. When should I make changes?** <br />
You can now make these changes, regardless of the network you're running on.

**Can I use IPC post-Merge?** <br />
Yes. You also won't have to worry about JWT if you use IPC. See our [Quickstart](./install/install-with-script.md) for IPC instructions.

**Can I use a light node with Prysm, or do I need to run a full execution node?** <br />
No - at this time, a full node is required.


import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />