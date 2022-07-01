---
id: getting-started
title:  Welcome to Prysm Documentation
sidebar_label: Welcome!
---

[Prysm](https://github.com/prysmaticlabs/prysm) is an [Ethereum](https://ethereum.org/en/developers/docs/intro-to-ethereum/) [proof-of-stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/) client written in [Go](https://golang.org). You can use Prysm to participate in Ethereum's [decentralized economy](https://ethereum.org/en/developers/docs/web2-vs-web3/) by [running a node](./install/install-with-script.md) and, if you have [32 ETH to stake](https://ethereum.org/en/staking/), a [validator](./install/install-with-script.md#step-6-run-a-validator-using-prysm).

The following index of pages provides a descriptive overview of Prysm's documentation:  

<div class='panel'>
<a href='../install/install-with-script'>Quickstart</a>
<p><strong>New Prysm users</strong> can follow this guidance to get started with Prysm.</p>
</div>
<div class='panel'>
<a href='../prepare-for-merge'>Prepare for The Merge</a>
<p><strong>Current node runners</strong> and validators can follow this guidance to prepare for The Merge, an ongoing event that transitions Ethereum from proof-of-work to proof-of-stake.</p>
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

<p>This section contains <strong>procedural documentation</strong> that walks you through specific tasks related to Prysm.</p>
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
<a href='../execution-node/authentication'>Configure JWT authentication</a>
<p>After The Merge, Prysm will need to securely connect to a local execution node. This how-to shows you how to form this secure connection using a JWT token.</p>
</div>
<div class='panel'>
<a href='../advanced/migrating-keys'>Move to a new machine</a>
<p>Learn how to migrate from one host system to another while minimizing risk of slashing and downtime.</p>
</div>
<div class='panel'>
<a href='../advanced/migrating-keys'>Switch to a new client</a>
<p>Learn how to migrate from one client to another while minimizing risk of slashing and downtime.</p>
</div>
<div class='panel'>
<a href='../wallet/exiting-a-validator'>Exit your validator</a>
<p>Learn how to voluntarily exit your validator from Ethereum's consensus layer Beacon Chain network.</p>
</div>
<div class='panel'>
<a href='../prysm-usage/p2p-host-ip'>Improve network connectivity</a>
<p>Learn how to configure ports, firewalls, and other configuration for improved peer-to-peer connectivity.</p>
</div>
<div class='panel'>
<a href='../monitoring/checking-status'>Check node and validator status</a>
<p>Learn how to check the status of your execution node, beacon node, and validator.</p>
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

### Advanced installation

<p>This subsection contains How-Tos that help you install Prysm using Bazel (building from source) or Docker.</p>
</div>
<div class='panel'>
<a href='../install/install-with-docker'>Install using Docker</a>
<p>Learn how to install Prysm using preconfigured Docker images that ship with every Prysm release.</p>
</div>
<div class='panel'>
<a href='../install/install-with-bazel'>Build from source</a>
<p>Learn how to build Prysm from source using Bazel.</p>
</div>
<div class='panel secondary-panel section-title'>

### Advanced usage

<p>This subsection contains advanced How-Tos that our <strong>power users</strong> may find interesting.</p>
</div>
<div class='panel'>
<a href='../prysm-usage/secure-grpc'>Secure gRPC</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../prysm-usage/slasher'>Run a slasher</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../prysm-usage/graffiti-file'>Add graffiti to blocks</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../advanced/beacon_node_api'>Run an archive node</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../execution-node/configuring-for-prysm'>Configure fallback execution nodes</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../advanced/maintaining-uptime'>Maintain validator uptime with systemd or Docker</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../wallet/remote'>Configure remote signing wallet</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../wallet/we3signer'>Configure Web3Signer</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../wallet/nondeterministic'>Import an existing wallet via keystore</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../wallet/deterministic'>Create a wallet using Prysm</a>
<p>Learn how to...</p>
</div>
<div class='panel section-title'>

## Concepts

<p>This section contains beginner-friendly <strong>conceptual guidance</strong> authored for readers who are new to Prysm and/or Ethereum.</p>
</div>
<div class='panel'>
<a href='../concepts/nodes-networks'>Nodes and networks</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../wallet/introduction'>Keys and Wallets</a>
<p>Learn how to...</p>
</div>
<div class='panel section-title'>

## Developer Wiki

<p>This section contains...</p>
</div>
<div class='panel'>
<a href='../contribute/contribution-guidelines'>Contribute</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../contribute/prysms-golang-principles'>Golang principles</a>
<p>Learn how to...</p>
</div>
<div class='secondary-panel section-title'>

### APIs

<p>This subsection contains...</p>
</div>
<div class='panel'>
<a href='../how-prysm-works/ethereum-public-api'>Beacon node API</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../how-prysm-works/prysm-public-api'>Prysm-specific API</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../how-prysm-works/keymanager-api'>Keymanager API</a>
<p>Learn how to...</p>
</div>
<div class='panel secondary-panel section-title'>

### Developer Concepts

<p>This subsection contains...</p>
</div>
<div class='panel'>
<a href='../devtools/init-state'>Initial synchronization</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../devtools/net-design'>Network design</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../devtools/api-middleware'>API middleware</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../how-prysm-works/overview-technical'>Architecture overview</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../how-prysm-works/beacon-node'>Beacon node</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../how-prysm-works/validator-clients'>Validator client</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../how-prysm-works/validator-lifecycle'>Validator lifecycle</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../how-prysm-works/validator-deposit-contract'>Validator deposit contract</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../how-prysm-works/database-backend-boltdb'>BoltDB database</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../how-prysm-works/p2p-networking'>P2P networking</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../how-prysm-works/bls-signature-aggregation-and-cryptography'>BLS cryptography</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../devtools/end-to-end'>End-to-end tests</a>
<p>Learn how to...</p>
</div>
<div class='panel section-title'>

## Misc

<p>This section contains...</p>
</div>
<div class='panel'>
<a href='../audits/phase0'>Security audits</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../licenses/prysmatic-labs'>Prysm license</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../reading/eth2'>Ethereum learning resources</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../reading/golang'>Golang resources</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../reading/bazel'>Why Bazel?</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../reading/testnet_postmortems'>Testnet postmortems</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../devtools/block-explorers'>Block explorers</a>
<p>Learn how to...</p>
</div>
<div class='panel section-title'>

## vNext

<p>This section contains...</p>
</div>
<div class='panel'>
<a href='../prysm-usage/checkpoint-sync-vNext'>Use Checkpoint Sync (vNext)</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../execution-node/fee-recipient-vNext'>Configure Fee Recipient (vNext)</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../terminology'>Glossary</a>
<p>Learn how to...</p>
</div>
<div class='panel'>
<a href='../contribute/bugreports'>File a bug report</a>
<p>Learn how to...</p>
</div>

<br/>

## Need assistance?

Join our [Discord](https://discord.gg/prysmaticlabs) server - a member of the team or our community will be happy to help.

<br />
<div class="admonition admonition-caution alert alert--secondary">
<div class="admonition-content">
<p><strong>Page freshness</strong>: This page is <strong>up to date</strong> as of June 30th, 2022.</p>
<p><strong>Content author</strong>: <a href='https://twitter.com/symbolpunk'>Mick</a></p>
</div>
</div>