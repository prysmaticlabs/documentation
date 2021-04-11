---
id: slasher
title: Running a slasher
sidebar_label: Running a slasher
---
This section provides instructions on how to run [slasher](https://github.com/prysmaticlabs/prysm/tree/master/slasher) in order to identify and report slashable offenses on eth2 .  If the slasher detects a slashable offense, proof is sent to the [beacon-chain node](https://docs.prylabs.network/docs/how-prysm-works/beacon-node/) for inclusion in a block.  [Validators](https://docs.prylabs.network/docs/how-prysm-works/prysm-validator-client/) earn a small whistleblower reward for including this proof into a block.  

:::danger Slasher Can Be a Resource Hog
The Slasher process can be a huge resource hog during times of no chain finality, which can manifest itself as massive RAM usage. Please make sure you understand the risks of running the Slasher, especially if you want high uptime for your beacon nodes. The Slasher can place significant stress on beacon nodes and the increased load on the beacon nodes could contribute to your validators underperforming.  
:::

> NOTICE: Running slasher is optional, but helps secure the chain and may result in additional earnings.

## Slashable Offenses

#### Validator slashings 
 - Double voting
   - occurs when a validator signs two different beacon blocks in the same epoch
 - Surround votes
   - occurs when a validator signs two conflicting attestations  

#### Block Proposer slashings
 - occurs when a proposer broadcasts more than one block for the same slot
 
![Prysm with Slasher](/img/prysm-with-slasher.png)

## Get Prysm and start beacon-chain
> **NOTICE:** If beacon-chain is already running, skip to step 2 

1. To begin, follow the instructions for [GNU\Linux](/docs/install/linux), [MacOS](/docs/install/mac), [ARM64](/docs/install/arm), or [Windows](/docs/install/windows) to fetch and install Prysm.  The beacon-chain process should be running and fully synced before proceeding.

## Run Slasher

2. Depending on your platform, issue the appropriate command alongside any [startup parameters](/docs/prysm-usage/parameters#slasher-parameters) from the examples below to start slasher.

#### Running slasher with prysm.bat on Windows

```sh
.\prysm.bat slasher
```

#### Running slasher with prysm.sh on GNU\Linux, macOS, and ARM64

```sh
./prysm.sh slasher
```

#### Running slasher with Docker on GNU\Linux, and macOS 

```text
docker pull gcr.io/prysmaticlabs/prysm/slasher:stable
docker run -it --network="host" -v $HOME/.eth2:/data --name slasher \
  gcr.io/prysmaticlabs/prysm/slasher:stable \
  --datadir=/data
```
#### Running slasher with Docker on Windows

```text
docker pull gcr.io/prysmaticlabs/prysm/slasher:stable
docker run -it --network="host" -v c:/prysm:/data gcr.io/prysmaticlabs/prysm/slasher:stable
```

#### Running slasher with Bazel on GNU\Linux, macOS, and ARM64

```text
bazel run //slasher
```

3. Slasher will spin up and immediately begin communicating with the beacon-chain process.

**Congratulations, you are now ready to identify and report slashable attestations and block proposals**

**Still have questions?**  Stop by our [Discord](https://discord.gg/KSA7rPr) for further assistance!
