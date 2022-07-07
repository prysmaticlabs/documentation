---
id: parameters
title: Command-line options
sidebar_label: Command-line options
---

This section lists the various flags used to customise the startup process of Prysm

import {FetchCLIHelp} from '../../src/fetchCliHelp.js';

## Beacon Node Configuration 

Below are all the available configuration parameters for the Prysm beacon node grouped by functionality. All information is retrieved from the latest Prysm release.

<FetchCLIHelp prysmComponent={"beacon-chain"}/>

## Validator Configuration 

Below are all the available configuration parameters for Prysm validator client grouped by functionality. All information is retrieved from the latest Prysm release.

:::tip Graffiti
You can use the `--graffiti` validator flag to add a string to your proposed blocks, which will be seen on the block explorer. I.e; `<startup command> --graffiti "Prysm is awesome!"`
:::

<FetchCLIHelp prysmComponent={"validator"}/>

## Client Stats Configuration

Below are all the available configuration parameters for Prysm client stats software: an optional service that can report process metrics to third-parties such as block explorers. You can read more about this [here](/docs/prysm-usage/client-stats).

<FetchCLIHelp prysmComponent={"client-stats"}/>

## Loading Parameters via a .YAML File

:::info
Loading parameters via .YAML file is optional.
:::

Prysm now supports loading flag values from a specified `.yaml` file. Defining parameters in this way cuts back on terminal clutter and allows unique startup profiles to be saved independently.

The below steps show how place a common Prysm flag into a YAML file and how to specify it at start up.

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

<div class="content-status">
<p><strong class="status-meta">Content freshness:</strong> 🟢 This content is <strong>fresh</strong> as of July 2022.</p>
<p><strong class="status-meta">Content author(s):</strong> <a href='https://github.com/rauljordan'>Raul</a></p>
</div>
<div class="update-request">
<a href="https://github.com/prysmaticlabs/documentation/issues/new?title=Content%20Update%20Request:%20Quickstart">🐼 Request an update</a>
</div>