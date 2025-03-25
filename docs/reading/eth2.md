---
id: eth2
title: Ethereum reading resources
sidebar_label: Ethereum readings
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

This page serves material necessary to catch up with the current state of Ethereum proof-of-stake development and provides readers with the knowledge required to begin making meaningful contributions to the Prysm client. Whether you are an expert on all things Ethereum or are new to the blockchain world entirely, there are appropriate resources here that will help you get up to speed.

## **Ethereum fundamentals**

### Introduction

* [What is Ethereum?](http://ethdocs.org/en/latest/introduction/what-is-ethereum.html)
* [How Does Ethereum Work Anyway?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)
* [Ethereum Introduction](https://ethereum.org/en/what-is-ethereum/)
* [Ethereum Foundation](https://ethereum.org/en/foundation/)
* [Ethereum Wiki](https://eth.wiki/)
* [Ethereum Research](https://ethresear.ch/)
* [Ethereum White Paper](https://github.com/ethereum/wiki/wiki/White-Paper)
* [What is Hashing?](https://blockgeeks.com/guides/what-is-hashing/)
* [Hashing Algorithms and Security](https://www.youtube.com/watch?v=b4b8ktEV4Bg)
* [Understanding Merkle Trees](https://www.codeproject.com/Articles/1176140/Understanding-Merkle-Trees-Why-use-them-who-uses-t)
* [Ethereum Block Architecture](https://ethereum.stackexchange.com/questions/268/ethereum-block-architecture/6413#6413)
* [What is an Ethereum Token?](https://blockgeeks.com/guides/ethereum-token/)
* [What is Ethereum Gas?](https://blockgeeks.com/guides/ethereum-gas-step-by-step-guide/)
* [Client Implementations](https://eth.wiki/eth1/clients)

## **ETH2 fundamentals**

*Disclaimer: Because some parts of Ethereum consensus are still an active area of research and/or development, some resources may be outdated.* 

### Introduction and specifications

* [The Explainer You Need to Read First](https://ethos.dev/beacon-chain/)
* [Official Specifications](https://github.com/ethereum/eth2.0-specs)
* [Annotated Spec](https://benjaminion.xyz/eth2-annotated-spec/)
* [Another Annotated Spec](https://notes.ethereum.org/@djrtwo/Bkn3zpwxB)
* [Rollup-Centric Roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

### Sharding

* [Blockchain Scalability: Why?](https://blockgeeks.com/guides/blockchain-scalability/)
* [What Are Ethereum Nodes and Sharding](https://blockgeeks.com/guides/what-are-ethereum-nodes-and-sharding/)
* [How to Scale Ethereum: Sharding Explained](https://medium.com/prysmatic-labs/how-to-scale-ethereum-sharding-explained-ba2e283b7fce)
* [Sharding FAQ](https://eth.wiki/sharding/Sharding-FAQs)
* [Sharding Introduction: R&D Compendium](https://eth.wiki/en/sharding/sharding-introduction-r-d-compendium)

### Peer-to-peer networking

* [Ethereum Peer to Peer Networking](https://geth.ethereum.org/docs/interface/peer-to-peer)
* [P2P Library](https://libp2p.io/)
* [Discovery Protocol](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md)

### Latest News

* [Ethereum Blog](https://blog.ethereum.org/)
* [News from Ben Edgington](https://hackmd.io/@benjaminion/eth2_news)

### Holesky Testnet Blockchain

* [Launchpad](https://holesky.launchpad.ethereum.org/en/)
* [Beacon Chain Explorer](https://holesky.beaconcha.in/)

### Mainnet Blockchain

* [Launchpad](https://launchpad.ethereum.org/en/)
* [Beacon Chain Explorer](https://beaconcha.in/)
* [Another Beacon Chain Explorer](https://explorer.bitquery.io/eth2)
* [Validator Queue Statistics](https://eth2-validator-queue.web.app/index.html)
* [Slashing Detector](https://twitter.com/eth2slasher)

### Client Implementations

* [Prysm](https://github.com/prysmaticlabs/prysm) developed in Golang and maintained by [Prysmatic Labs](https://prysmaticlabs.com/)
* [Lighthouse](https://github.com/sigp/lighthouse) developed in Rust and maintained by [Sigma Prime](https://sigmaprime.io/)
* [Lodestar](https://github.com/ChainSafe/lodestar) developed in TypeScript and maintained by [ChainSafe Systems](https://chainsafe.io/)
* [Nimbus](https://github.com/status-im/nimbus-eth2) developed in Nim and maintained by [status](https://status.im/)
* [Teku](https://github.com/ConsenSys/teku) developed in Java and maintained by [ConsenSys](https://consensys.net/)

## Other

### Serenity concepts

* [Sharding Concepts Mental Map](https://www.mindomo.com/zh/mindmap/sharding-d7cf8b6dee714d01a77388cb5d9d2a01)
* [Taiwan Sharding Workshop Notes](https://hackmd.io/s/HJ_BbgCFz#%E2%9F%A0-General-Introduction)
* [Sharding Research Compendium](http://notes.ethereum.org/s/BJc_eGVFM)
* [Torus Shaped Sharding Network](https://ethresear.ch/t/torus-shaped-sharding-network/1720/8)
* [General Theory of Sharding](https://ethresear.ch/t/a-general-theory-of-what-quadratically-sharded-validation-is/1730/10)
* [Sharding Design Compendium](https://ethresear.ch/t/sharding-designs-compendium/1888/25)

### Serenity research posts

* [Sharding v2.1 Spec](https://notes.ethereum.org/SCIg8AH5SA-O4C1G1LYZHQ)
* [Casper/Sharding/Beacon Chain FAQs](https://notes.ethereum.org/9MMuzWeFTTSg-3Tz_YeiBA?view)
* [RETIRED! Sharding Phase 1 Spec](https://ethresear.ch/t/sharding-phase-1-spec-retired/1407/92)
* [Exploring the Proposer/Collator Spec and Why it Was Retired](https://ethresear.ch/t/exploring-the-proposer-collator-split/1632/24)
* [The Stateless Client Concept](https://ethresear.ch/t/the-stateless-client-concept/172/4)
* [Shard Chain Blocks vs. Collators](https://ethresear.ch/t/shard-chain-blocks-vs-collators/429)
* [Ethereum Concurrency Actors and Per Contract Sharding](https://ethresear.ch/t/ethereum-concurrency-actors-and-per-contract-sharding/375)
* [Future Compatibility for Sharding](https://ethresear.ch/t/future-compatibility-for-sharding/386)
* [Fork Choice Rule for Collation Proposal Mechanisms](https://ethresear.ch/t/fork-choice-rule-for-collation-proposal-mechanisms/922/8)
* [State Execution](https://ethresear.ch/t/state-execution-scalability-and-cost-under-dos-attacks/1048)
* [Fast Shard Chains With Notarization](https://ethresear.ch/t/as-fast-as-possible-shard-chains-with-notarization/1806/2)
* [RANDAO Notary Committees](https://ethresear.ch/t/fork-free-randao/1835/3)
* [Safe Notary Pool Size](https://ethresear.ch/t/safe-notary-pool-size/1728/3)
* [Cross Links Between Main and Shard Chains](https://ethresear.ch/t/cross-links-between-main-chain-and-shards/1860/2)

### Serenity-related conference talks

* [Sharding Presentation by Vitalik from IC3-ETH Bootcamp](https://vod.video.cornell.edu/media/Sharding+-+Vitalik+Buterin/1_1xezsfb4/97851101)
* [Latest Research and Sharding by Justin Drake from Tech Crunch](https://www.youtube.com/watch?v=J6xO7DH20Js)
* [Beacon Casper Chain by Vitalik and Justin Drake](https://www.youtube.com/watch?v=GAywmwGToUI)
* [Proofs of Custody by Vitalik and Justin Drake](https://www.youtube.com/watch?v=jRcS9D_gw_o)
* [So You Want To Be a Casper Validator by Vitalik](https://www.youtube.com/watch?v=rl63S6kCKbA)
* [Ethereum Sharding from EDCon by Justin Drake](https://www.youtube.com/watch?v=J4rylD6w2S4)
* [Casper CBC and Sharding by Vlad Zamfir](https://www.youtube.com/watch?v=qDa4xjQq1RE&t=1951s)
* [Casper FFG in Depth by Carl](https://www.youtube.com/watch?v=uQ3IqLDf-oo)
* [Ethereum & Scalability Technology from Asia Pacific ETH meet up by Hsiao Wei](https://www.youtube.com/watch?v=GhuWWShfqBI)

### Ethereum Virtual Machine

* [What is the Ethereum Virtual Machine?](https://themerkle.com/what-is-the-ethereum-virtual-machine/)
* [Ethereum VM](https://medium.com/@jeff.ethereum/go-ethereums-jit-evm-27ef88277520)
* [Ethereum Protocol Subtleties](https://github.com/ethereum/wiki/wiki/Subtleties)
* [Awesome Ethereum Virtual Machine](https://github.com/ethereum/wiki/wiki/Ethereum-Virtual-Machine-%28EVM%29-Awesome-List)

### Ethereum-flavoured WebAssembly

* [eWASM background, motivation, goals, and design](https://github.com/ewasm/design)
* [The current eWASM spec](https://github.com/ewasm/design/blob/master/eth_interface.md)
* [Latest eWASM community call including live demo of the testnet](https://www.youtube.com/watch?v=apIHpBSdBio)
* [Why eWASM? by Alex Beregszaszi](https://www.youtube.com/watch?v=VF7f_s2P3U0)
* [Panel: entire eWASM team discussion and Q&A](https://youtu.be/ThvForkdPyc?t=119)
* [Ewasm community meetup at ETHBuenosAires](https://www.youtube.com/watch?v=qDzrbj7dtyU)


