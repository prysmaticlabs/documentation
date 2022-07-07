---
id: getting-started
title:  Prysm documentation - table of contents
sidebar_label: Table of contents
---

[Prysm](https://github.com/prysmaticlabs/prysm) is an [Ethereum](https://ethereum.org/en/developers/docs/intro-to-ethereum/) [proof-of-stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/) client written in [Go](https://golang.org). You can use Prysm to participate in Ethereum's [decentralized economy](https://ethereum.org/en/developers/docs/web2-vs-web3/) by [running a node](./install/install-with-script.md) and, if you have [32 ETH to stake](https://ethereum.org/en/staking/), a [validator](./install/install-with-script.md#step-6-run-a-validator-using-prysm).

The following table of contents provides a descriptive overview of Prysm's documentation:

<div class='panel'>
<a href='../install/install-with-script'>Quickstart: Run a Node and Stake ETH using Prysm</a>
<p><strong>New Prysm users</strong> can follow this guidance to get started with Prysm.</p>
</div>
<div class='panel'>
<a href='../prepare-for-merge'>Prepare for The Merge</a>
<p><strong>Current Prysm users</strong> can follow this guidance to prepare their nodes and validators for <a href='https://ethereum.org/en/upgrades/merge/'>The Merge</a>, an ongoing event that transitions Ethereum from proof-of-work to proof-of-stake.</p>
</div>
<div class='panel'>
<a href='../security-best-practices'>Security best practices</a>
<p>Learn how to <strong>minimize risk</strong> as a validator. The guidelines provided in this document are client-agnostic (they apply to Prysm and other clients, too).</p>
</div>
<div class='panel'>
<a href='../prysm-usage/parameters'>Command-line options</a>
<p>Learn how to configure Prysm's beacon node client, validator client, and more through its <strong>command-line interface</strong>.</p>
</div>
<div class='panel'>
<a href='../troubleshooting/issues-errors'>Troubleshooting</a>
<p>Review common troubleshooting scenarios and solutions.</p>
</div>
<div class='panel'>
<a href='../faq'>Frequently asked questions</a>
<p>Review frequently asked questions and answers.</p>
</div>
<div class='panel section-title'>

## How-tos

<p>This section contains procedural documentation that walks you through <strong>specific tasks related to Prysm</strong>.</p>
</div>
<div class='panel'>
<a href='../prysm-usage/staying-up-to-date'>Update and downgrade Prysm</a>
<p>Learn how to <strong>keep Prysm updated</strong>, how to downgrade Prysm, and how to use release candidates.</p>
</div>
<div class='panel'>
<a href='../prysm-usage/checkpoint-sync'>Use Checkpoint Sync</a>
<p><strong>Checkpoint Sync</strong> significantly reduces the time it takes for Prysm's beacon node to sync by piggypacking off of another fully-synced node.</p>
</div>
<div class='panel'>
<a href='../execution-node/fee-recipient'>Configure Fee Recipient</a>
<p>Learn how to specify a Fee Recipient wallet address that allows validators to earn <strong>transaction fee tips</strong> post-Merge.</p>
</div>
<div class='panel'>
<a href='../prysm-usage/database-backups'>Back up & restore database</a>
<p>Learn how to back up and restore your beacon node and validator databases so you can minimize downtime in the event of a system failure.</p>
</div>
<div class='panel'>
<a href='../wallet/slashing-protection'>Import & export slashing protection history</a>
<p>Learn how to import and export your <strong>slashing protection history database</strong>, a special-purpose database that protects your validator from slashable events.</p>
</div>
<div class='panel'>
<a href='../prysm-usage/web-interface'>Use Prysm's Web UI</a>
<p>Prysm's Web UI can be used to monitor and configure your beacon node and validator on <code>localhost</code> using an app-like interface.</p>
</div>
<div class='panel'>
<a href='../advanced/migrating-keys'>Move to a new machine</a>
<p>Learn how to migrate from one host system to another while minimizing risk of slashing and downtime.</p>
</div>
<div class='panel'>
<a href='../advanced/switch-clients'>Switch to a new client</a>
<p>Learn how to migrate from one client to another while minimizing risk of slashing and downtime.</p>
</div>
<div class='panel'>
<a href='../monitoring/checking-status'>Check node and validator status</a>
<p>Learn how to check the status of your execution node, beacon node, and validator.</p>
</div>
<div class='panel'>
<a href='../wallet/exiting-a-validator'>Exit your validator</a>
<p>Learn how to voluntarily exit your validator from Ethereum's consensus layer Beacon Chain network.</p>
</div>
<div class='panel secondary-panel section-title'>

### Monitoring, metrics, and alerts

<p>This subsection contains How-Tos that help you maintain validator uptime.</p>
</div>

<div class='panel'>
<a href='../monitoring/is-everything-fine'>Monitor Prysm for expected behavior</a>
<p>Learn how to assess the health of your Prysm beacon node and/or validator by analyzing output logs.</p>
</div>
<div class='panel'>
<a href='../prysm-usage/individual-validator-monitoring'>Monitor validators by index</a>
<p>Learn how to use Prysm to monitor block proposals, attestations, slashings, and more for any number of validators.</p>
</div>
<div class='panel'>
<a href='../prysm-usage/monitoring/grafana-dashboard'>Configure dashboarding and alerts with Prometheus and Grafana</a>
<p>Learn how to configure dashboarding and alerts for your node, validator, and slasher using Prometheus (to aggregate data) and Grafana (to display it within a dashboard).</p>
</div>
<div class='panel'>
<a href='../prysm-usage/client-stats'>Collect metrics with client-stats</a>
<p>Learn how to collect beacon node and validator metrics using Prysm's <code>client-stats</code> utility. This can be used to relay metrics data to the beaconcha.in stats service.</p>
</div>


<div class='panel secondary-panel section-title'>

### Advanced usage

<p>This subsection contains advanced How-Tos that our <strong>power users</strong> may find interesting.</p>
</div>
<div class='panel'>
<a href='../install/install-with-docker'>Install using Docker</a>
<p>Learn how to install Prysm using preconfigured Docker images that ship with every Prysm release.</p>
</div>
<div class='panel'>
<a href='../install/install-with-bazel'>Build from source</a>
<p>Learn how to build Prysm from source using Bazel.</p>
</div>
<div class='panel'>
<a href='../prysm-usage/secure-grpc'>Secure gRPC connections</a>
<p>Learn how to create and configure TLS certificates that enable secure gRPC connections to your beacon node.</p>
</div>
<div class='panel'>
<a href='../execution-node/authentication'>Configure JWT authentication</a>
<p>After The Merge, Prysm will need to securely connect to a local execution node. This how-to shows you how to form this secure connection using a JWT token.</p>
</div>
<div class='panel'>
<a href='../prysm-usage/slasher'>Run a slasher</a>
<p>Learn how to run a slasher, an optional beacon node process that detects and reports slashable offenses on the Ethereum proof-of-stake network.</p>
</div>
<div class='panel'>
<a href='../prysm-usage/graffiti-file'>Add graffiti to blocks</a>
<p>Learn how to configure your validator to add graffiti to the blocks that it proposes.</p>
</div>
<div class='panel'>
<a href='../advanced/beacon_node_api'>Run an archival node</a>
<p>Learn how to run your beacon node as an archival node. Archival nodes are like regular beacon nodes that are configured to store more blockchain data locally, increasing data retrieval performance in exchange for increased data storage requirements.</p>
</div>
<div class='panel'>
<a href='../execution-node/configuring-for-prysm'>Configure a fallback execution node</a>
<p>Learn how to configure a fallback execution node that your beacon node will automatically switch to in the event that your primary execution node fails.</p>
</div>
<div class='panel'>
<a href='../advanced/maintaining-uptime'>Maintain validator uptime with systemd or Docker</a>
<p>Learn how to minimize validator downtime by running your validator as a background service through either Docker or <code>systemd</code>. </p>
</div>
<div class='panel'>
<a href='../prysm-usage/p2p-host-ip'>Configure ports and firewalls for improved network connectivity</a>
<p>Learn how to configure ports and firewalls so your node can build stronger connections with more peers.</p>
</div>
<div class='panel'>
<a href='../wallet/remote'>Configure a remote signing wallet</a>
<p>Learn how to configure a <strong>remote signing wallet</strong>, a special type of wallet that lets your validator connect to a remote server to retrieve the keys you need to process signing requests via a secure gRPC connection. This guidance is targeted at power users who are willing to increase complexity in exchange for increased validator key security.</p>
</div>
<div class='panel'>
<a href='../wallet/web3signer'>Use Web3Signer</a>
<p>Learn how to use <a href='https://github.com/ConsenSys/web3signer'>Web3Signer</a>, an open-source remote signing service that allows you to store your validator keys remotely instead of locally.</p>
</div>
<div class='panel'>
<a href='../wallet/nondeterministic'>Import an existing wallet via keystore</a>
<p>Learn how to import EIP-2335 keystore files into Prysm, such as those generated by the Ethereum deposit CLI.</p>
</div>
<div class='panel'>
<a href='../wallet/deterministic'>Create a wallet using Prysm</a>
<p>Learn how to create a wallet using Prysm.</p>
</div>
<div class='panel section-title'>

## Concepts

<p>This section contains beginner-friendly <strong>conceptual guidance</strong> authored for readers who are new to Prysm and/or Ethereum.</p>
</div>
<div class='panel'>
<a href='../concepts/nodes-networks'>Nodes and networks</a>
<p>Learn about the various node types, networks, network layers, and how it all relates.</p>
</div>
<div class='panel'>
<a href='../wallet/introduction'>Keys, wallets, and accounts</a>
<p>Learn how keys, wallets, and accounts relate to each other within the context of Prysm and Ethereum.</p>
</div>
<div class='panel'>
<a href='../concepts/slashing'>Slashing</a>
<p>Learn about slashing, a mechanism that incentivizes Ethereum nodes to detect and punish malicious actors in the Ethereum network.</p>
</div>
<div class='panel section-title'>

## Developer Wiki

<p>This section contains documents targeted at developers.</p>
</div>
<div class='panel'>
<a href='../contribute/contribution-guidelines'>Contribute to Prysm's codebase</a>
</div>
<div class='panel'>
<a href='../contribute/golang-principles'>Golang principles</a>
</div>
<div class='panel'>
<a href='../reading/golang'>Golang resources</a>
</div>
<div class='panel'>
<a href='../reading/bazel'>About Bazel</a>
</div>
<div class='panel secondary-panel section-title'>

### APIs

</div>
<div class='panel'>
<a href='../how-prysm-works/ethereum-public-api'>Beacon node API</a>
</div>
<div class='panel'>
<a href='../how-prysm-works/prysm-public-api'>Prysm-specific API</a>
</div>
<div class='panel'>
<a href='../how-prysm-works/keymanager-api'>Keymanager API</a>
</div>
<div class='panel secondary-panel section-title'>

### Developer Concepts

</div>
<div class='panel'>
<a href='../devtools/init-state'>Initial synchronization</a>
</div>
<div class='panel'>
<a href='../devtools/net-design'>Network design</a>
</div>
<div class='panel'>
<a href='../devtools/api-middleware'>API middleware</a>
</div>
<div class='panel'>
<a href='../how-prysm-works/architecture-overview'>Architecture overview</a>
</div>
<div class='panel'>
<a href='../how-prysm-works/beacon-node'>Beacon node</a>
</div>
<div class='panel'>
<a href='../how-prysm-works/prysm-validator-client'>Validator client</a>
</div>
<div class='panel'>
<a href='../how-prysm-works/validator-lifecycle'>Validator lifecycle</a>
</div>
<div class='panel'>
<a href='../how-prysm-works/validator-deposit-contract'>Validator deposit contract</a>
</div>
<div class='panel'>
<a href='../how-prysm-works/database-backend-boltdb'>BoltDB database</a>
</div>
<div class='panel'>
<a href='../how-prysm-works/p2p-networking'>P2P networking</a>
</div>
<div class='panel'>
<a href='../how-prysm-works/bls-cryptography'>BLS cryptography</a>
</div>
<div class='panel'>
<a href='../devtools/end-to-end'>End-to-end tests</a>
</div>
<div class='panel section-title'>

## Misc

</div>
<div class='panel'>
<a href='../audits/phase0'>Security audits</a>
</div>
<div class='panel'>
<a href='../licenses/prysmatic-labs'>Prysm license</a>
</div>
<div class='panel'>
<a href='../reading/eth2'>Ethereum learning resources</a>
</div>
<div class='panel'>
<a href='../reading/testnet-postmortems'>Testnet postmortems</a>
</div>
<div class='panel'>
<a href='../devtools/block-explorers'>Block explorers</a>
</div>
<div class='panel'>
<a href='../terminology'>Glossary</a>
</div>
<div class='panel'>
<a href='../contribute/bugreports'>File a bug report</a>
</div>
<div class='panel section-title'>

## vNext

<p>This section contains documentation that applies to vNext versions of Prysm.</p>
</div>
<div class='panel'>
<a href='../execution-node/fee-recipient-vNext'>Configure Fee Recipient (vNext)</a>
</div>

<br/>

## Need assistance?

Join our [Discord](https://discord.gg/prysmaticlabs) server - a member of the team or our community will be happy to help.

<br />
<div class="content-status">
<p><strong class="status-meta">Content freshness:</strong> 🟢 This content is <strong>fresh</strong> as of July 2022.</p>
<p><strong class="status-meta">Content author(s):</strong> <a href='https://github.com/symbolpunk'>Mick</a></p>
</div>