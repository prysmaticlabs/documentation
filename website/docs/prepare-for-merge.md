---
id: prepare-for-merge
title: Prepare for The Merge
sidebar_label: Prepare for The Merge
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

While the [Prysm Quickstart](install/install-with-script) helps you run a node and validator from scratch, this guide is meant for people who are already running a node and/or validator. The following table summarizes the major changes between pre-Merge operations and post-Merge operations:

<table>
  <tr>
    <th style={{minWidth: 240 + 'px'}}>Before The Merge</th> 
    <th>After The Merge</th>
  </tr>
  <tr>
    <td>You don't need to run a local execution client. You can use a service like Infura instead.</td>
    <td>You <strong>do</strong> need to run an execution client. You <strong>can't</strong> use a service like Infura.</td>
  </tr>
  <tr>
    <td>Execution clients don't need to use the engine API.</td>
    <td>Execution clients <strong>do</strong> need to use the engine API.</td>
  </tr>
  <tr>
    <td>Execution clients don't need to connect to beacon node clients using JWT.</td>
    <td>Execution clients <strong>do</strong> need to connect to beacon node clients using JWT.</td>
  </tr>
  <tr>
    <td>Beacon nodes don't need to use the engine API.</td>
    <td>Beacon nodes <strong>do</strong> need to use the engine API.</td>
  </tr>
  <tr>
    <td>A 1TB hard drive will suffice.</td>
    <td>A 2TB SSD is required.</td>
  </tr>
</table>

Let's walk through the process of making each of these changes.


### Execution client changes

If you aren't yet running an execution client, you'll want to start running one now.


### Beacon node changes


### Validator node changes


### Hardware changes



### Frequently asked questions

**Instead of buying a 2TB SSD, can I use multiple smaller SSDs?**
Yes.

**How do I configure my execution client to use multiple hard drives?**

**How do I configure my beacon node client to use multiple hard drives?**

**How do I monitor my hard drive utilization?**

**How do I monitor the health of my setup?**




