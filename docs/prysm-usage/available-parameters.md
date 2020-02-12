---
id: available-parameters
title: Available parameters
sidebar_label: Available parameters
---

#Startup parameters

## Base parameters
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
## Beacon chain parameters
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
## Validator parameters
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

# Docker Commands
The beacon node can be halted by either using `Ctrl+c` or with the command:

```text
docker stop beacon-node
```

To restart the beacon node, issue the following command:

```text
docker start -ai beacon-node
```

To delete a corrupted container, issue the following command:

```text
docker rm beacon-node
```

To recreate a deleted container and refresh the chain database, issue the start command with an additional `--clear-db` parameter:

```text
docker run -it -v $HOME/prysm:/data -p 4000:4000 -p 13000:13000 --name beacon-node \
  gcr.io/prysmaticlabs/prysm/beacon-chain:latest \
  --datadir=/data \
  --clear-db
```
