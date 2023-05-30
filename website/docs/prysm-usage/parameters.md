---
id: parameters
title: Command-line options
sidebar_label: Command-line options
---

import {FetchCLIHelp} from '../../src/fetchCliHelp.js';

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="Raul,James" />

Prysm's client software can be configured using flags and YAML files. This document provides a comprehensive list of all available flags and their descriptions. The flag descriptions that you see in this document are generated from code comments within the latest Prysm release.

## Beacon node flags

<FetchCLIHelp prysmComponent={"beacon-chain"}/>

## Validator flags

:::tip Graffiti
You can use the `--graffiti` validator flag to add a string to your proposed blocks, which will be seen on the block explorer. I.e; `<startup command> --graffiti "Prysm is awesome!"`
:::

<FetchCLIHelp prysmComponent={"validator"}/>

## `prysmctl` flags

Refer to the [Use prysmctl](prysmctl.md) for `prysmctl` download and installation instructions.

<FetchCLIHelp prysmComponent={"prysmctl"}/>

## Client stats flags

Prysm's client stats service is an optional utility that reports process metrics to third-parties such as block explorers. Refer to our [client stats documentation](/docs/prysm-usage/client-stats) for more information.

<FetchCLIHelp prysmComponent={"client-stats"}/>

## Loading parameters from a YAML file

You can optionally configure Prysm to load flag values from a `.yaml` file. Consider this option if you're looking for a streamlined terminal experience or unique, portable configuration profiles.

The below steps show how place a common Prysm flag into a YAML file, and how to specify the YAML file when Prysm starts up.

### GNU\Linux, Mac, ARM64

1. In your Prysm working directory, create a `.yaml` file and open it in a text editor.

2. Add the following lines to the file before closing and saving:
```sh
datadir: '/data'
```

3. Start the Prysm beacon chain as normal, while specifying the location of the `.yaml` like so:
```sh
./prysm.sh beacon-chain --config-file=/path/to/file.yaml
```
or for a validator like so:
```sh
./prysm.sh validator --config-file=/path/to/file.yaml
```

### Windows

1. In your Prysm working directory, create a `.yaml` file and open it in a text editor.

2. Add the following lines to the file before closing and saving:
```sh
datadir: 'c:\prysm'
```

3. Start the Prysm beacon chain as normal, while specifying the location of the `.yaml` like so:
```sh
.\prysm.bat beacon-chain --config-file=c:\path\to\file.yaml
```
or for a validator like so:
```sh
.\prysm.bat validator --config-file=c:\path\to\file.yaml
```

It is possible to provide additional flags alongside the `.yaml` file, though if conflicting flags are provided, the flag defined in the`.yaml` file will take priority. For example, if the flag `--datadir=/data2` is specified and `datadir: "/data1"` is in the `.yaml` file, Prysm would prioritise writing to `/data1`.


