---
id: getting-started
title:  Prysm Documentation
sidebar_label: Table of contents
slug: /
description: Join our community of innovators shaping the decentralized future. Your node matters.
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

[Prysm](https://github.com/OffchainLabs/prysm) is an [Ethereum](https://ethereum.org/en/developers/docs/intro-to-ethereum/) [proof-of-stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/) client written in [Go](https://golang.org). You can use Prysm to participate in Ethereum's [decentralized economy](https://ethereum.org/en/developers/docs/web2-vs-web3/) by [running a node](./install/install-with-script.md) and, if you have [32 `ETH` to stake](https://ethereum.org/en/staking/), a [validator client](/install-prysm/install-with-script.md#step-5-run-a-validator-using-prysm). If you're new to Ethereum, you may enjoy our beginner-friendly [Nodes and networks](/learn/concepts/nodes-and-networks.md) explainer.

:::info

## Upcoming Hardfork: Electra/Prague [May 7th,2025](https://ethereum-magicians.org/t/all-core-devs-consensus-acdc-154/23340/3)

New Requirements: 

- Upgrade Prysm (validator & beacon node)
- Upgrade Execution client
- New blob retention requirements (100GB ~ 150GB). read more [here](/learn/concepts/blobs.md)

New EIP features in Hard fork: (EIPs related directly to Prysm are marked)

- [EIP-2537: Precompile for BLS12-381 curve operations](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-2537.md)
- [EIP-2935: Save historical block hashes in state](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-2935.md)
- [EIP-6110: Supply validator deposits onchain](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-6110.md) (prysm)
- [EIP-7002: Execution layer triggerable withdrawals](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-7002.md) (prysm)
- [EIP-7251: Increase the MAX_EFFECTIVE_BALANCE](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-7251.md) (prysm)
- [EIP-7549: Move committee index outside Attestation](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-7549.md) (prysm)
- [EIP-7623: Increase calldata cost](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-7623.md)
- [EIP-7685: General purpose execution layer requests](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-7685.md)
- [EIP-7691: Blob throughput increase](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-7691.md) (prysm)
- [EIP-7702: Set EOA account code](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-7702.md)
- [EIP-7840: Add blob schedule to EL config files](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-7840.md)

:::

The following table of contents provides a descriptive overview of Prysm's documentation:

---

#### [Quickstart: Run a node and (optionally) stake `ETH` using Prysm](/install-prysm/install-with-script.md)
**New Prysm users** can follow this guidance to get started with Prysm.

---

#### [Withdraw your earnings or fully withdraw your validator](/manage-validator/withdraw-validator.md)
Learn how to withdraw your validator's earnings, or entire stake, from Ethereum's Beacon Chain.

---

#### [Security best practices](/security-best-practices.md)
Learn how to **minimize risk** as a validator. The guidelines provided in this document are client-agnostic (they apply to Prysm and other clients, too).

---

#### [Command-line options](/configure-prysm/command-line-options.md)
Learn how to configure Prysm's beacon node client, validator client, and more through its **command-line** interface.

---

#### [Troubleshooting](/troubleshooting/troubleshooting.md)
Review common troubleshooting scenarios and solutions.

---

#### [FAQs](/faq.md)
Review frequently asked questions and answers.

---


## Advanced installation guides
This section contains alternatives to the script-based installation guidance provided within our [Quickstart](/install/install-with-script.md)

---

#### [Install using Docker](/install-prysm/install-with-docker.md)
Learn how to install Prysm using preconfigured Docker images that ship with every Prysm release.

---

#### [Build from source](/install-prysm/install-with-bazel.md)
Learn how to build Prysm from source using Bazel.

---

#### [Configure MEV builder](/configure-prysm/configure-mev-builder.md)
Learn how to run your Beacon node with a MEV builder via a relay. This is an advanced option requiring some technical prowess and poses some risks as a validator.

---


## How-tos
This section contains procedural documentation that walks you through **specific tasks related to Prysm**

---

#### [Configure Fee Recipient](/configure-prysm/configure-fee-recipient.md)
Learn how to specify a Fee Recipient wallet address that allows validators to earn **transaction fee tips** post-Merge.

---

#### [Configure JWT authentication](/configure-prysm/configure-jwt.md)
Prysm needs to securely connect to a local execution node. This how-to shows you how to form this secure connection using a JWT token.

---

#### [Update and downgrade Prysm](/configure-prysm/stay-up-to-date.md)
Learn how to **keep Prysm updated**, how to downgrade Prysm, and how to use release candidates.

---

#### [Sync from a checkpoint](/configure-prysm/sync-from-a-checkpoint.md)
Syncing from a checkpoint significantly reduces the time it takes for Prysm's Beacon node to sync by piggybacking off of another fully-synced node.

---

#### [Check node and validator status](/monitoring-alerts-metrics/check-node-and-validator-status.md)
Learn how to check the status of your execution node, Beacon node, and validator.

---

#### [Run a slasher](/configure-prysm/run-a-slasher.md)
Learn how to run a slasher, an optional Beacon node process that detects and reports slashable offenses on the Ethereum proof-of-stake network.

---

#### [Run an archival node](/configure-prysm/run-an-archival-node.md)
Learn how to run your Beacon node as an archival node. Archival nodes are like regular Beacon nodes that are configured to store more blockchain data locally, increasing data retrieval performance in exchange for increased data storage requirements.

---


## Backups and migrations
This section contains how-tos that will help you back up and migrate Prysm's data.

---

#### [Back up & restore database](/backup-and-migration/backup-and-restore.md)
Learn how to back up and restore your Beacon node and validator databases so you can minimize downtime in the event of a system failure.

---

#### [Import & export slashing protection history](/backup-and-migration/slashing-protection.md)
Learn how to import and export your **slashing protection history database**, a special-purpose database that protects your validator from slashable events.

---

#### [Move to a new machine](/backup-and-migration/migrating-keys.md)
Learn how to migrate from one host system to another while minimizing risk of slashing and downtime.

---

#### [Switch to a new client](/backup-and-migration/switch-clients.md)
Learn how to migrate from one client to another while minimizing risk of slashing and downtime.

---


## Validator and wallet management
This section contains how-tos that help you manage your validator and associated keys/wallets.

---

#### [Create a Prysm wallet](/manage-wallet/create-a-prysm-wallet.md)
Learn how to create a wallet using Prysm.

---

#### [Import keys into a Prysm wallet](/manage-wallet/import-keys-into-prysm-wallet.md)
Learn how to import EIP-2335 keystore files into Prysm, such as those generated by the Ethereum deposit CLI.

---

#### [Maintain validator uptime with `systemd` or Docker](/manage-wallet/maintain-validator-uptime.md)
Learn how to minimize validator downtime by running your validator as a background service through either Docker or `systemd`.

---

#### [Use Web3Signer](/manage-wallet/use-web3signer.md)
Learn how to use [Web3Signer](https://github.com/ConsenSys/web3signer), an open-source remote signing service that allows you to store your validator keys remotely instead of locally.

---

#### [Add graffiti to blocks](/manage-validator/add-graffiti.md)
Learn how to configure your validator to add graffiti to the blocks that it proposes.

---

#### [Exit your validator](/manage-validator/exit-a-validator.md)
Learn how to voluntarily exit your validator from an Ethereum Beacon Chain.

---

#### [Withdraw your earnings or fully withdraw your validator](/manage-validator/withdraw-validator.md)
Learn how to withdraw your validator's earnings, or entire stake, from Ethereum's Beacon Chain.

---


## Monitoring, metrics, and alerts
This subsection contains how-tos that help you configure monitoring and alerts for Prysm.

---

#### [Monitor Prysm for expected behavior](/monitoring-alerts-metrics/monitoring-prysm.md)
Learn how to assess the health of your Prysm Beacon node and/or validator by analyzing output logs.

---

#### [Monitor validators by index](/monitoring-alerts-metrics/monitor-validators-by-index.md)
Learn how to use Prysm to monitor block proposals, attestations, slashings, and more for any number of validators.

---

#### [Configure dashboarding and alerts with Prometheus and Grafana](/monitoring-alerts-metrics/grafana-dashboard.md)
Learn how to configure dashboarding and alerts for your node, validator, and slasher using Prometheus (to aggregate data) and Grafana (to display it within a dashboard).

---

#### [Collect metrics with client-stats](/monitoring-alerts-metrics/collect-metrics-with-client-stats.md)
Learn how to collect Beacon node and validator metrics using Prysm's `client-stats` utility. This can be used to relay metrics data to the Beacon Chain stats service.

---

#### [Use Prysm's Web UI](/monitoring-alerts-metrics/web-interface.md)
:::warning Deprecated

This feature is marked for deprecation. Prysm's Web UI can be used to monitor and configure your Beacon node and validator on `localhost` using an app-like interface.

:::

---


## Managing connections
This section contains how-tos that will help you manage your gRPC and P2P connectivity.

---

#### [Secure gRPC connections](/manage-connections/secure-grpc-connections.md)
Learn how to create and configure TLS certificates that enable secure gRPC connections to your Beacon node.

---

#### [Configure ports and firewalls for improved network connectivity](/manage-connections/configure-ports-and-firewalls.md)
Learn how to configure ports and firewalls so your node can build stronger connections with more peers.

---


## Concepts
This section contains beginner-friendly **conceptual guidance** for readers who are new to Prysm and/or Ethereum.

---

#### [Nodes and networks](/learn/concepts/nodes-and-networks.md)
Learn about the various node types, networks, network layers, and how it all relates.

---

#### [Keys, wallets, and accounts](/learn/concepts/keys-wallets-accounts.md)
Learn how keys, wallets, and accounts relate to each other within the context of Prysm and Ethereum.

---

#### [Slashing](/backup-and-migration/slashing-protection.md)
Learn about slashing, a mechanism that incentivizes Ethereum nodes to detect and punish malicious actors in the Ethereum network.

---


## Developer wiki
This section ocntains documents targeted at developers who want to contribute to Prysm's codebase.

---

#### [Contribute to Prysm's codebase](/contribute/contribution-guidelines.md)

---

#### [Golang principles](/learn/tools/golang-principles.md)

---

#### [Golang resources](/learn/tools/golang.md)

---

#### [About Bazel](/learn/tools/bazel.md)

---


## APIs

---

#### [Beacon node API](/apis/ethereum-beacon-node-api.md)

---

#### [Prysm-specific API](/apis/prysm-public-api.md)

---

#### [Keymanager API](/apis/keymanager-api.md)

---


## Developer Concepts

---

#### [Initial synchronization](/learn/dev-concepts/initial-sync.md)

---

#### [Network design](/learn/dev-concepts/network-design.md)

---

#### [Architecture overview](/learn/dev-concepts/architecture-overview.md)

---

#### [Optimistic sync](/learn/dev-concepts/optimistic-sync.md)

---

#### [Beacon node](/learn/dev-concepts/prysm-beacon-node.md)

---

#### [Validator client](/learn/dev-concepts/prysm-validator-client.md)

---

#### [Validator lifecycle](/learn/concepts/validator-lifecycle.md)

---

#### [Validator deposit contract](/learn/dev-concepts/validator-deposit-contract.md)

---

#### [BoltDB database](/learn/dev-concepts/boltdb-database.md)

---

#### [P2P networking](/learn/dev-concepts/p2p-networking.md)

---

#### [BLS cryptography](/learn/dev-concepts/bls-cryptography.md)

---

#### [End-to-end tests](/learn/dev-concepts/end-to-end-tests.md)

---


## Misc


---

#### [Security audits](/misc/security-audits.md)

---

#### [Prysm license](/misc/prysm-license.md)

---

#### [Ethereum learning resources](/learn/ethereum-reading.md)

---

#### [Testnet postmortems](/misc/testnet-postmortems.md)

---

#### [Block explorers](/misc/block-explorers.md)

---

#### [Glossary](terminology.md)

---

#### [File a bug report](/contribute/file-bug-report.md)

---


## Need assistance?

Join our [Discord](https://discord.gg/prysm) server - a member of the team or our community will be happy to help.
