---
id: getting-started
title:  Prysm Documentation
sidebar_label: Table of contents
slug: /
description: Join our community of innovators shaping the decentralized future. Your node matters.
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

[Prysm](https://github.com/OffchainLabs/prysm) is an [Ethereum](https://ethereum.org/en/developers/docs/intro-to-ethereum/) [proof-of-stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/) client written in [Go](https://golang.org). You can use Prysm to participate in Ethereum's [decentralized economy](https://ethereum.org/en/developers/docs/web2-vs-web3/) by [running a node](./install/install-with-script.md) and, if you have [32 `ETH` to stake](https://ethereum.org/en/staking/), a [validator client](./install/install-with-script.md#step-6-run-a-validator-using-prysm). If you're new to Ethereum, you may enjoy our beginner-friendly [Nodes and networks](./concepts/nodes-networks.md) explainer.

:::info

## Upcoming Hardfork: Electra/Prague [May 7th,2025](https://ethereum-magicians.org/t/all-core-devs-consensus-acdc-154/23340/3)

New Requirements: 

- Upgrade Prysm (validator & beacon node)
- Upgrade Execution client
- New blob retention requirements (100GB ~ 150GB). read more [here](./concepts/blobs.md)

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

#### [Quickstart: Run a node and (optionally) stake `ETH` using Prysm](/install/install-with-script.md)
**New Prysm users** can follow this guidance to get started with Prysm.

---

#### [Withdraw your earnings or fully withdraw your validator](/wallet/withdraw-validator.md)
Learn how to withdraw your validator's earnings, or entire stake, from Ethereum's Beacon Chain.

---

#### [Security best practices](/security-best-practices.md)
Learn how to **minimize risk** as a validator. The guidelines provided in this document are client-agnostic (they apply to Prysm and other clients, too).

---

#### [Command-line options](/prysm-usage/parameters.md)
Learn how to configure Prysm's beacon node client, validator client, and more through its **command-line** interface.

---

#### [Troubleshooting](/troubleshooting/issues-errors.md)
Review common troubleshooting scenarios and solutions.

---

#### [FAQs](/faq.md)
Review frequently asked questions and answers.

---


## Advanced installation guides
This section contains alternatives to the script-based installation guidance provided within our [Quickstart](/install/install-with-script.md)

---

#### [Install using Docker](/install/install-with-docker.md)
Learn how to install Prysm using preconfigured Docker images that ship with every Prysm release.

---

#### [Build from source](/install/install-with-bazel.md)
Learn how to build Prysm from source using Bazel.

---

#### [Configure MEV builder](/advanced/builder.md)
Learn how to run your Beacon node with a MEV builder via a relay. This is an advanced option requiring some technical prowess and poses some risks as a validator.

---


## How-tos
This section contains procedural documentation that walks you through **specific tasks related to Prysm**

---

#### [Configure Fee Recipient](/execution-node/fee-recipient.md)
Learn how to specify a Fee Recipient wallet address that allows validators to earn **transaction fee tips** post-Merge.

---

#### [Configure JWT authentication](/execution-node/authentication.md)
Prysm needs to securely connect to a local execution node. This how-to shows you how to form this secure connection using a JWT token.

---

#### [Update and downgrade Prysm](/prysm-usage/staying-up-to-date.md)
Learn how to **keep Prysm updated**, how to downgrade Prysm, and how to use release candidates.

---

#### [Sync from a checkpoint](/prysm-usage/checkpoint-sync.md)
Syncing from a checkpoint significantly reduces the time it takes for Prysm's Beacon node to sync by piggybacking off of another fully-synced node.

---

#### [Check node and validator status](/monitoring/checking-status.md)
Learn how to check the status of your execution node, Beacon node, and validator.

---

#### [Run a slasher](/prysm-usage/slasher.md)
Learn how to run a slasher, an optional Beacon node process that detects and reports slashable offenses on the Ethereum proof-of-stake network.

---

#### [Run an archival node](/advanced/beacon_node_api.md)
Learn how to run your Beacon node as an archival node. Archival nodes are like regular Beacon nodes that are configured to store more blockchain data locally, increasing data retrieval performance in exchange for increased data storage requirements.

---


## Backups and migrations
This section contains how-tos that will help you back up and migrate Prysm's data.

---

#### [Back up & restore database](/prysm-usage/database-backups.md)
Learn how to back up and restore your Beacon node and validator databases so you can minimize downtime in the event of a system failure.

---

#### [Import & export slashing protection history](/wallet/slashing-protection.md)
Learn how to import and export your **slashing protection history database**, a special-purpose database that protects your validator from slashable events.

---

#### [Move to a new machine](/advanced/migrating-keys.md)
Learn how to migrate from one host system to another while minimizing risk of slashing and downtime.

---

#### [Switch to a new client](/advanced/switch-clients)
Learn how to migrate from one client to another while minimizing risk of slashing and downtime.

---


## Validator and wallet management
This section contains how-tos that help you manage your validator and associated keys/wallets.

---

#### [Create a Prysm wallet](/wallet/deterministic.md)
Learn how to create a wallet using Prysm.

---

#### [Import keys into a Prysm wallet](/wallet/nondeterministic.md)
Learn how to import EIP-2335 keystore files into Prysm, such as those generated by the Ethereum deposit CLI.

---

#### [Maintain validator uptime with `systemd` or Docker](/advanced/maintaining-uptime.md)
Learn how to minimize validator downtime by running your validator as a background service through either Docker or `systemd`.

---

#### [Use Web3Signer](/wallet/web3signer.md)
Learn how to use [Web3Signer](https://github.com/ConsenSys/web3signer), an open-source remote signing service that allows you to store your validator keys remotely instead of locally.

---

#### [Add graffiti to blocks](/prysm-usage/graffiti-file.md)
Learn how to configure your validator to add graffiti to the blocks that it proposes.

---

#### [Exit your validator](/wallet/exiting-a-validator.md)
Learn how to voluntarily exit your validator from an Ethereum Beacon Chain.

---

#### [Withdraw your earnings or fully withdraw your validator](/wallet/withdraw-validator.md)
Learn how to withdraw your validator's earnings, or entire stake, from Ethereum's Beacon Chain.

---


## Monitoring, metrics, and alerts
This subsection contains how-tos that help you configure monitoring and alerts for Prysm.

---

#### [Monitor Prysm for expected behavior](/monitoring/is-everything-fine.md)
Learn how to assess the health of your Prysm Beacon node and/or validator by analyzing output logs.

---

#### [Monitor validators by index](/prysm-usage/individual-validator-monitoring.md)
Learn how to use Prysm to monitor block proposals, attestations, slashings, and more for any number of validators.

---

#### [Configure dashboarding and alerts with Prometheus and Grafana](/prysm-usage/monitoring/grafana-dashboard.md)
Learn how to configure dashboarding and alerts for your node, validator, and slasher using Prometheus (to aggregate data) and Grafana (to display it within a dashboard).

---

#### [Collect metrics with client-stats](/prysm-usage/client-stats.md)
Learn how to collect Beacon node and validator metrics using Prysm's `client-stats` utility. This can be used to relay metrics data to the Beacon Chain stats service.

---

#### [Use Prysm's Web UI](/prysm-usage/web-interface.md)
:::warning Deprecated

This feature is marked for deprecation. Prysm's Web UI can be used to monitor and configure your Beacon node and validator on `localhost` using an app-like interface.

:::

---


## Managing connections
This section contains how-tos that will help you manage your gRPC and P2P connectivity.

---

#### [Secure gRPC connections](/prysm-usage/secure-grpc.md)
Learn how to create and configure TLS certificates that enable secure gRPC connections to your Beacon node.

---

#### [Configure ports and firewalls for improved network connectivity](/prysm-usage/p2p-host-ip.md)
Learn how to configure ports and firewalls so your node can build stronger connections with more peers.

---


## Concepts
This section contains beginner-friendly **conceptual guidance** for readers who are new to Prysm and/or Ethereum.

---

#### [Nodes and networks](/concepts/nodes-networks.md)
Learn about the various node types, networks, network layers, and how it all relates.

---

#### [Keys, wallets, and accounts](/wallet/introduction.md)
Learn how keys, wallets, and accounts relate to each other within the context of Prysm and Ethereum.

---

#### [Slashing](/concepts/slashing.md)
Learn about slashing, a mechanism that incentivizes Ethereum nodes to detect and punish malicious actors in the Ethereum network.

---


## Developer wiki
This section ocntains documents targeted at developers who want to contribute to Prysm's codebase.

---

#### [Contribute to Prysm's codebase](/contribute/contribution-guidelines.md)

---

#### [Golang principles](/contribute/golang-principles)

---

#### [Golang resources](/reading/golang.md)

---

#### [About Bazel](/reading/bazel.md)

---


## APIs

---

#### [Beacon node API](/how-prysm-works/ethereum-public-api.md)

---

#### [Prysm-specific API](/how-prysm-works/prysm-public-api.md)

---

#### [Keymanager API](/how-prysm-works/keymanager-api.md)

---


## Developer Concepts

---

#### [Initial synchronization](/devtools/init-state.md)

---

#### [Network design](/devtools/net-design.md)

---

#### [Architecture overview](/how-prysm-works/overview-technical.md)

---

#### [Optimistic sync](/how-prysm-works/optimistic-sync.md)

---

#### [Beacon node](/how-prysm-works/beacon-node.md)

---

#### [Validator client](/how-prysm-works/validator-clients.md)

---

#### [Validator lifecycle](/how-prysm-works/validator-lifecycle.md)

---

#### [Validator deposit contract](/how-prysm-works/validator-deposit-contract.md)

---

#### [BoltDB database](/how-prysm-works/database-backend-boltdb)

---

#### [P2P networking](/how-prysm-works/p2p-networking.md)

---

#### [BLS cryptography](/how-prysm-works/bls-signature-aggregation-and-cryptography.md)

---

#### [End-to-end tests](/devtools/end-to-end.md)

---


## Misc


---

#### [Security audits](/audits/phase0.md)

---

#### [Prysm license](/licenses/prysm.md)

---

#### [Ethereum learning resources](/reading/eth2.md)

---

#### [Testnet postmortems](/reading/testnet_postmortems.md)

---

#### [Block explorers](/devtools/block-explorers.md)

---

#### [Glossary](terminology.md)

---

#### [File a bug report](/contribute/bugreports.md)

---


## Need assistance?

Join our [Discord](https://discord.gg/prysm) server - a member of the team or our community will be happy to help.
