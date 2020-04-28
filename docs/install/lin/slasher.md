---
id: slasher
title: Run a slasher
sidebar_label: Run a slasher
---
This section provides instructions to run slasher for GNU/Linux to identify and report slashable offenses on the testnet.

## Get Prysm and start beacon-chain
> NOTICE: If beacon-chain is already running, skip to step 2 

1. To begin, follow the instructions to fetch and install Prysm with either the [Prysm Installation Script](../linux), [Docker](./docker) or [Bazel](./bazel). The beacon-chain process should be running and fully synced before proceeding.

## Run Slasher

2. Depending on your platform, issue the appropriate command alongside any [startup parameters](/docs/prysm-usage/parameters#slasher-parameters) from the examples below to start slasher.

#### Running slasher with prysm.sh

```sh
.\prysm.sh slasher
```

#### Running slasher with Docker

```text
docker pull gcr.io/prysmaticlabs/prysm/slasher:latest
docker run -it -v $HOME/prysm:/data --name slasher \
  gcr.io/prysmaticlabs/prysm/slasher:latest \
  --datadir=/data
```

#### Running slasher with Bazel

```text
bazel run //slasher
```

3. Slasher will spin up and immediately begin communicating with the beacon-chain process.

**Congratulations, you are now ready to identify and report slashable attestations and block proposals**

**Still have questions?**  Stop by our [Discord](https://discord.gg/KSA7rPr) for further assistance!
