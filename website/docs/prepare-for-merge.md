---
id: prepare-for-merge
title: Prepare for The Merge
sidebar_label: Prepare for The Merge
---


While the [Prysm Quickstart](install/install-with-script) helps you run a node and validator from scratch, this guide is meant for people who are already running a node and/or validator. The following table summarizes the major changes between pre-Merge operations and post-Merge operations:

| Before The Merge                                                                           | After The Merge                                                                      |
|--------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| You don't need to run a local execution client. You can use a service like Infura instead. | You **do** need to run an execution client. You **can't** use a service like Infura. |
| Execution clients don't need to use the engine API.                                        | Execution clients **do** need to use the engine API.                                 |
| Execution clients don't need to connect to beacon node clients using JWT.                  | Execution clients **do** need to connect to beacon node clients using JWT.           |
| Beacon nodes don't need to use the engine API.                                             | Beacon nodes <strong>do</strong> need to use the engine API.                         |
| A 1TB hard drive is enough.                                                                | A 2TB SSD is required.                                                               |


Let's walk through the process of making each of these changes.


### Execution client changes

If you aren't yet running an execution client, you'll want to start running one now. 

Engine API endpoint

JWT token


### Beacon node changes

Engine API endpoint

JWT token


### Validator node changes




### Hardware changes




### Frequently asked questions

**Instead of buying a 2TB SSD, can I use multiple smaller SSDs?**
Yes.

**How do I configure my execution client to use multiple hard drives?**

**How do I configure my beacon node client to use multiple hard drives?**

**How do I monitor my hard drive utilization?**

**How do I monitor the health of my setup?**




