---
id: slasher
title: Run a slasher
sidebar_label: Run a slasher
---
This section provides instructions to run slasher to identify and report slashable offenses on the testnet.

## Get Prysm and start beacon-chain
> NOTICE: If beacon-chain is already running, skip to step 2 

1. To begin, follow the instructions for [GNU\Linux](../install/linux), [macOS](../install/mac), [ARM64](../install/arm), or [Windows](../install/windows) to fetch and install Prysm.  The beacon-chain process should be running and fully synced before proceeding.

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
docker pull gcr.io/prysmaticlabs/prysm/slasher:latest
docker run -it -v $HOME/prysm:/data --name slasher \
  gcr.io/prysmaticlabs/prysm/slasher:latest \
  --datadir=/data
```
#### Running slasher with Docker on Windows

```text
docker pull gcr.io/prysmaticlabs/prysm/slasher:latest
docker run -it -v c:/prysm:/data gcr.io/prysmaticlabs/prysm/slasher:latest
```

#### Running slasher with Bazel on GNU\Linux, macOS, and ARM64

```text
bazel run //slasher
```

3. Slasher will spin up and immediately begin communicating with the beacon-chain process.

**Congratulations, you are now ready to identify and report slashable attestations and block proposals**

**Still have questions?**  Stop by our [Discord](https://discord.gg/KSA7rPr) for further assistance!
