---
id: getting-started
title:  Welcome to Prysm Documentation
sidebar_label: Welcome!
---

[Prysm](https://github.com/prysmaticlabs/prysm) is an [Ethereum](https://ethereum.org/en/developers/docs/intro-to-ethereum/) [proof-of-stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/) client written in [Go](https://golang.org). You can use Prysm to participate in Ethereum's [decentralized economy](https://ethereum.org/en/developers/docs/web2-vs-web3/) by [running a node](./install/install-with-script.md) and, if you have [32 ETH to stake](https://ethereum.org/en/staking/), a [validator](./install/install-with-script.md#step-6-run-a-validator-using-prysm).

The following index of pages provides a descriptive overview of Prysm's documentation:  

<div class='primary-panel'>
<a href='../install/install-with-script'>Quickstart</a>
<p><strong>New Prysm users</strong> can follow this guidance to get started with Prysm.</p>
</div>
<div class='primary-panel'>
<a href='../prepare-for-merge'>Prepare for The Merge</a>
<p><strong>Current node runners</strong> and validators can follow this guidance to prepare for The Merge, an ongoing event that transitions Ethereum from proof-of-work to proof-of-stake.</p>
</div>
<div class='primary-panel'>
<a href='../security-best-practices'>Security best practices</a>
<p>Learn how to <strong>minimize risk</strong> as a validator. The guidelines provided in this document are client-agnostic (they apply to Prysm and other clients, too).</p>
</div>
<div class='primary-panel'>
<a href='../prysm-usage/parameters'>Command-line options</a>
<p>Learn how to configure Prysm's beacon node client, validator client, and more through its <strong>command-line interface</strong>.</p>
</div>
<div class='primary-panel'>
<a href='../troubleshooting/issues-errors'>Troubleshooting</a>
<p>Review common troubleshooting scenarios and solutions.</p>
</div>
<div class='primary-panel'>
<a href='../faq'>Frequently asked questions</a>
<p>Review frequently asked questions and answers.</p>
</div>
<div class='primary-panel section-title'>

## How-tos

<p>This section contains <strong>procedural documentation</strong> that walks you through specific tasks related to Prysm.</p>
</div>
<div class='primary-panel'>
<a href='../prysm-usage/staying-up-to-date'>Update and downgrade Prysm</a>
<p>Learn how to <strong>keep Prysm updated</strong>, how to downgrade Prysm, and how to use release candidates.</p>
</div>
<div class='primary-panel'>
<a href='../prysm-usage/checkpoint-sync'>Use Checkpoint Sync</a>
<p><strong>Checkpoint Sync</strong> significantly reduces the time it takes for Prysm's beacon node to sync by piggypacking off of another fully-synced node.</p>
</div>
<div class='primary-panel'>
<a href='../execution-node/fee-recipient'>Configure Fee Recipient</a>
<p>Learn how to specify a Fee Recipient wallet address that allows validators to earn <strong>transaction fee tips</strong> post-Merge.</p>
</div>
<div class='primary-panel'>
<a href='../prysm-usage/database-backups'>Back up & restore database</a>
<p>Learn how to back up and restore your beacon node and validator databases so you can minimize downtime in the event of a system failure.</p>
</div>
<div class='primary-panel'>
<a href='../wallet/slashing-protection'>Import & export slashing protection history</a>
<p>Learn how to import and export your <strong>slashing protection history database</strong>, a special-purpose database that protects your validator from slashable events.</p>
</div>
<div class='primary-panel'>
<a href='../prysm-usage/web-interface'>Use Prysm's Web UI</a>
<p>Prysm's Web UI can be used to monitor and configure your beacon node and validator on <code>localhost</code> using an app-like interface.</p>
</div>
<div class='primary-panel'>
<a href='../execution-node/authentication'>Configure JWT authentication</a>
<p>After The Merge, Prysm will need to securely connect to a local execution node. This how-to shows you how to form this secure connection using a JWT token.</p>
</div>
<div class='primary-panel'>
<a href='../advanced/migrating-keys'>Move to a new machine</a>
<p>Learn how to migrate from one host system to another while minimizing risk of slashing and downtime.</p>
</div>
<div class='primary-panel'>
<a href='../advanced/migrating-keys'>Switch to a new client</a>
<p>Learn how to migrate from one client to another while minimizing risk of slashing and downtime.</p>
</div>
<div class='primary-panel'>
<a href='../wallet/exiting-a-validator'>Exit your validator</a>
<p>Learn how to voluntarily exit your validator from Ethereum's consensus layer Beacon Chain network.</p>
</div>
<div class='primary-panel'>
<a href='../prysm-usage/p2p-host-ip'>Improve network connectivity</a>
<p>Learn how to configure ports, firewalls, and other configuration for improved peer-to-peer connectivity.</p>
</div>
<div class='primary-panel'>
<a href='../monitoring/checking-status'>Check node and validator status</a>
<p>Learn how to check the status of your execution node, beacon node, and validator.</p>
</div>


<br/>
<br/>

------



 - How-tos
   - [Check node and validator status](./monitoring/checking-status.md)
   - [Create a wallet using Prysm](./wallet/deterministic.md)
   - Monitoring, metrics, and alerts
      - [Monitor Prysm for expected behavior](./monitoring/is-everything-fine.md)
      - [Monitor validators by index](./prysm-usage/individual-validator-monitoring.md)
      - [Configure monitoring and alerts with Grafana](./prysm-usage/monitoring/grafana-dashboard.md)
      - [Collect metrics with client-stats](./prysm-usage/client-stats.md)
   - Advanced installation
     - [Install using Docker](./install/install-with-docker.md)
     - [Build from source](./install/install-with-bazel.md)
   - Advanced usage
     - [Secure gRPC](./prysm-usage/secure-grpc.md)
     - [Run a slasher](./prysm-usage/slasher.md)
     - [Add graffiti to blocks](./prysm-usage/graffiti-file.md)
     - [Run an archive node](./advanced/beacon_node_api.md)
     - [Configure fallback execution nodes](./execution-node/configuring-for-prysm.md)
     - [Maintain validator uptime with systemd or Docker](./advanced/maintaining-uptime.md)
     - [Configure remote signing wallet](./wallet/remote.md)
     - [Configure Web3Signer](./wallet/we3signer.md)
     - [Import an existing wallet via keystore](./wallet/nondeterministic.md)
 - Concepts
   - [Nodes and networks](./concepts/nodes-networks.md)
   - Slashing
   - The Merge
   - Danksharding
   - Checkpoint sync
   - Validator state
   - [Keys and wallets](./wallet/introduction.md)
   - JWT
   - Proof-of-work
   - Proof-of-stake
   - Forkchoice
   - Engine API
 - Community updates
   - June 2022
 - Developer wiki
   - [Contribute](./contribute/contribution-guidelines.md)
   - [Golang principles](./contribute/prysms-golang-principles.md)
   - APIs
     - [Beacon node API](./how-prysm-works/ethereum-public-api.md)
     - [Prysm-specific API](./how-prysm-works/prysm-public-api.md)
     - [Keymanager API](./how-prysm-works/keymanager-api.md)
   - Concepts
     - [Initial synchronization](./devtools/init-state.md)
     - [Network design](./devtools/net-design.md)
     - [API middleware](./devtools/api-middleware.md)
     - [Architecture overview](./how-prysm-works/overview-technical.md)
     - [Beacon node](./how-prysm-works/beacon-node.md)
     - [Validator client](./how-prysm-works/validator-clients.md)
     - [Validator lifecycle](./how-prysm-works/validator-lifecycle.md)
     - [Validator deposit contract](./how-prysm-works/validator-deposit-contract.md)
     - [BoltDB database](./how-prysm-works/database-backend-boltdb.md)
     - [P2P networking](./how-prysm-works/p2p-networking.md)
     - [BLS cryptography](./how-prysm-works/bls-signature-aggregation-and-cryptography.md)
     - [End-to-end tests](./devtools/end-to-end.md)
 - Misc
   - [Security audits](./audits/phase0.md)
   - [Prysm license](./licenses/prysmatic-labs.md)
   - [Ethereum learning resources](./reading/eth2.md)
   - [Golang resources](./reading/golang.md)
   - [Why Bazel?](./reading/bazel.md)
   - [Testnet portmortems](./reading/testnet_postmortems.md)
   - [Block explorers](./devtools/block-explorers.md)
 - vNext
   - [Use Checkpoint Sync (vNext)](./prysm-usage/checkpoint-sync-vNext.md)
   - [Configure Fee Recipient (vNext)](./execution-node/fee-recipient-vNext.md)
 - [Glossary](terminology.md)
 - [File a bug report](./contribute/bugreports.md)


## Need assistance?

Join our [Discord](https://discord.gg/prysmaticlabs) server - a member of the team or our community will be happy to help.



<br />
<div class="admonition admonition-caution alert alert--secondary">
<div class="admonition-content">
<p><strong>Page freshness</strong>: This page is <strong>up to date</strong> as of June 30th, 2022.</p>
<p><strong>Content author</strong>: <a href='https://twitter.com/symbolpunk'>Mick</a></p>
</div>
</div>