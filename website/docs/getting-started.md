---
id: getting-started
title:  Welcome to Prysm Documentation
sidebar_label: Welcome!
---

[Prysm](https://github.com/prysmaticlabs/prysm) is an [Ethereum](https://ethereum.org/en/developers/docs/intro-to-ethereum/) [proof-of-stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/) client written in [Go](https://golang.org). You can use Prysm to participate in Ethereum's [decentralized economy](https://ethereum.org/en/developers/docs/web2-vs-web3/) by [running a node](./install/install-with-script.md) and, if you have [32 ETH to stake](https://ethereum.org/en/staking/), a [validator](./install/install-with-script.md#step-6-run-a-validator-using-prysm).

The following **descriptive table of contents** maps to the way that our content is organized within the sidebar. Use it to quickly explore our docs and find what you're looking for:

 - [Quickstart](./install/install-with-script.md): New Prysm users can follow this guidance to get started with Prysm.
 - [Security best practices](./security-best-practices.md): Learn how to responsibly stake and validate. 
 - [Prepare for The Merge](./prepare-for-merge.md): Current node runners and validators can follow this guidance to prepare for The Merge, an ongoing event that transitions Ethereum from proof-of-work to proof-of-stake.
 - [Command-line options](./prysm-usage/parameters.md): Learn how to configure Prysm's beacon node, validator, and more through its command-line interface.
 - [Troubleshooting](./troubleshooting/issues-errors.md): Review common troubleshooting scenarios and solutions.
 - [Frequently asked questions](faq.md): Review frequently asked questions and answers.
 - How-tos
   - [Update Prysm's version](./prysm-usage/staying-up-to-date.md): Learn how to update and downgrade Prysm's version, and how to use release candidates.
   - [Use Checkpoint Sync](./prysm-usage/checkpoint-sync.md): Checkpoint sync significantly reduces the time it takes for Prysm's beacon node to sync by piggypacking off of another fully-synced node.
   - [Configure Fee Recipient](./execution-node/fee-recipient.md): Learn how to specify a Fee Recipient wallet address that collects transaction fee tips post-Merge.
   - [Backup & restore database](./prysm-usage/database-backups.md): Learn how to back up and restore your...
   - [Import & export slashing protection history](./wallet/slashing-protection.md): Prysm uses slashing protection history to protect your validator from slashable events. This shows you how to import/export this history when migrating between machines.
   - [Use the Prysm Web UI](./prysm-usage/web-interface.md): Prysm's Web UI can be used to monitor and configure your beacon node and validator on localhost using a pleasant app-like interface.
   - [Configure JWT authentication](./execution-node/authentication.md): Execution nodes will need to form authenticated connections with beacon nodes when connecting over HTTP post-Merge. JWT tokens facilitate this authentication.
   - [Move to a new machine](./advanced/migrating-keys.md): Learn how to migrate from one host system to another while minimizing risk of slashing and downtime.
   - [Switch to a new client](./advanced/migrating-keys.md): Learn how to migrate from one client to another while minimizing risk of slashing and downtime.
   - [Exit your validator](./wallet/exiting-a-validator.md): Learn how to voluntarily exit your validator from Ethereum's consensus layer Beacon Chain network.
   - [Improve network connectivity](./prysm-usage/p2p-host-ip.md): 
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


:::note Metadata

Status: This page is **up to date** as of June 30th, 2022.

Author: [Mick](https://twitter.com/symbolpunk)

:::