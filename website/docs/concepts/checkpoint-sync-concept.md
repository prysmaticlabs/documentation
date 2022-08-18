---
id: checkpoint-sync-concept
title: "Checkpoint sync: Conceptual overview"
sidebar_label: "Checkpoint sync: Conceptual overview"
---
import CheckpointSyncPresent from '@site/static/img/checkpoint-sync-present.png';
import CheckpointSyncAbsent from '@site/static/img/checkpoint-sync-absent.png';
import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="Kasey,Mick,James" lastVerifiedDateString="August 18th, 2022" lastVerifiedVersionString="v2.1.4" />

:::info Looking for the how-to?

This is a conceptual overview. See [How to sync from a checkpoint](../prysm-usage/checkpoint-sync.md) to learn how to configure checkpoint sync. 

:::

Beacon nodes maintain a local copy of the Ethereum's [Beacon Chain](https://ethereum.org/en/upgrades/beacon-chain/). When you tell Prysm's beacon node to start running for the first time, Prysm will fetch the very first Beacon Chain block (the Beacon Chain's [genesis block](https://beaconscan.com/slots?epoch=0)). Your beacon node will then "replay" the history of the Beacon Chain, fetching the oldest blocks from peers until the entire chain has been downloaded:

<img style={{width: 100 + '%', margin: 'auto', marginBottom: 20 + 'px', display: 'block', maxWidth: 616 + 'px'}} src={CheckpointSyncAbsent} /> 

This sync process can take a long time. Checkpoint sync speeds things up by telling your beacon node to piggyback off of a peer beacon node, skipping over the majority of the Beacon Chain's history and syncing from a recently finalized checkpoint:

<img style={{width: 100 + '%', margin: 'auto', marginBottom: 20 + 'px', display: 'block', maxWidth: 631 + 'px'}} src={CheckpointSyncPresent} /> 

Note that currently, Prysm's implementation syncs forward-only. The process of syncing backwards towards the genesis block is called "backfilling", and will be supported in a future Prysm release. Backfilling isn't required to run a validator - it's only required if you want to run an archive node or query chain history through your beacon node.

To sync from a checkpoint, your Prysm beacon node needs three pieces of information: the latest finalized `BeaconState`, the `SignedBeaconBlock`, and the **genesis state** for the network you're using. Together, the `BeaconState` and `SignedBeaconBlock` represent a single **checkpoint state**. 

This information can be retrieved either via a **network request**, or via **file export/import**.


<RequestUpdateWidget />