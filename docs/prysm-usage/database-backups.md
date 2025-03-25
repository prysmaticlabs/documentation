---
id: database-backups
title: Back up & restore database
sidebar_label: Back up & restore database
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

This section outlines how to perform database backups for your beacon node and validator client. The validator client services expose an **HTTP backup endpoint** which is the **safest way** to trigger a database backup.

:::danger Doing manual folder backups while the cllient is running is not safe
If you perform backups by manually copying the database while the client is running, you risk copying a corrupted database! You might be copying the folder right when the client is in the middle of writing data to the database, and could end up with a bad backup.
:::

## Beacon node

### Backing up the database manually

Your first need to find your base directory. If you don't usually run your beacon node with the `--datadir` option, then you can find the base directory by running your beacon node with
the `--help` option. It will vary depending the operating system you use.

For MacOS, it is:

    --datadir value      Data directory for the databases. (default: "/Users/<user>/Library/Eth2")

If you usually run your beacon node with the `--datadir` option, then your base directory is the one specified by the `--datadir` option.

Finally, your database is located in the `beaconchaindata` subdirectory, at the `beaconchain.db` file.

### Restoring from a backup

Ensure your beacon node is turned off if restoring a backup. You can restore a beacon chain DB from a backup file with the following command:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  groupId="operating-systems"
  defaultValue="lin"
  values={[
    {label: 'Linux', value: 'lin'},
    {label: 'Windows', value: 'win'},
    {label: 'MacOS', value: 'mac'},
    {label: 'Arm64', value: 'arm'},
  ]
}>
<TabItem value="lin">

**Using the Prysm installation script**

```sh
prysm.sh beacon-chain db restore --restore-source-file=/path/to/backup --restore-target-dir=/path/to/desired/datadir
```

**Using Bazel**

```sh
bazel run //cmd/beacon-chain -- db restore --restore-source-file=/path/to/backup --restore-target-dir=/path/to/desired/datadir
```

</TabItem>
<TabItem value="win">

**Using the Prysm installation script**

```sh
prysm.bat beacon-chain db restore --restore-source-file=\path\to\backup --restore-target-dir=\path\to\desired\datadir
```

</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

```sh
prysm.sh beacon-chain db restore --restore-source-file=/path/to/backup --restore-target-dir=/path/to/desired/datadir
```

**Using Bazel**

```sh
bazel run //cmd/beacon-chain -- db restore --restore-source-file=/path/to/backup --restore-target-dir=/path/to/desired/datadir
```

</TabItem>
<TabItem value="arm">

**Using the Prysm installation script**

```sh
prysm.sh beacon-chain db restore --restore-source-file=/path/to/backup --restore-target-dir=/path/to/desired/datadir
```

**Using Bazel**

```sh
bazel run //cmd/beacon-chain -- db restore --restore-source-file=/path/to/backup --restore-target-dir=/path/to/desired/datadir
```

</TabItem>
</Tabs>

## Validator client

### Add the backup webhook flags to your validator client 

Add the following flags to your validator client:

- `--enable-db-backup-webhook`: Serve an http server to initiate database backups. The handler is served on the validator client's monitoring host and port. Default endpoint is `http://127.0.0.1:8081/db/backup` if the flag is enabled.
- `--db-backup-output-dir`: Folder path to where backups will be output to, such as `/path/to/mybackups`.

Now, your validator client will expose an HTTP endpoint `http://monitoringhost:monitoringport/db/backup`, which is `http://127.0.0.1:8081/db/backup` by default. You can hit this endpoint using curl or any other tool you prefer, and a backup will initiate which will be output to your `--db-backup-output-dir` path.


### Restoring from a backup

Ensure your validator client is turned off if restoring a backup. You can restore a validator DB from a backup file with the following command:

<Tabs
  groupId="operating-systems"
  defaultValue="lin"
  values={[
    {label: 'Linux', value: 'lin'},
    {label: 'Windows', value: 'win'},
    {label: 'MacOS', value: 'mac'},
    {label: 'Arm64', value: 'arm'},
  ]
}>
<TabItem value="lin">

**Using the Prysm installation script**

```sh
prysm.sh validator db restore --restore-source-file=/path/to/backup --restore-target-dir=/path/to/desired/datadir
```

**Using Bazel**

```sh
bazel run //cmd/validator -- db restore --restore-source-file=/path/to/backup --restore-target-dir=/path/to/desired/datadir
```

</TabItem>
<TabItem value="win">

**Using the Prysm installation script**

```sh
prysm.bat validator db restore --restore-source-file=\path\to\backup --restore-target-dir=\path\to\desired\datadir
```

</TabItem>
<TabItem value="mac">

**Using the Prysm installation script**

```sh
prysm.sh validator db restore --restore-source-file=/path/to/backup --restore-target-dir=/path/to/desired/datadir
```

**Using Bazel**

```sh
bazel run //cmd/validator -- db restore --restore-source-file=/path/to/backup --restore-target-dir=/path/to/desired/datadir
```

</TabItem>
<TabItem value="arm">

**Using the Prysm installation script**

```sh
prysm.sh validator db restore --restore-source-file=/path/to/backup --restore-target-dir=/path/to/desired/datadir
```

**Using Bazel**

```sh
bazel run //cmd/validator -- db restore --restore-source-file=/path/to/backup --restore-target-dir=/path/to/desired/datadir
```

</TabItem>
</Tabs>
