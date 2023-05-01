---
id: proof-of-stake-devnet
title: How to Set Up an Ethereum Proof-of-Stake Devnet in Minutes
sidebar_label: Configure a devnet
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="Raul, Sammy, James" lastVerifiedDateString="March 22nd, 2023" />

:::info

This how-to is an updated copy of Raul Jordan's [How to Set Up an Ethereum Proof-of-Stake Devnet in Minutes](https://rauljordan.com/how-to-setup-a-proof-of-stake-devnet/).

:::


![Image](https://user-images.githubusercontent.com/5572669/186052301-dd487b50-183a-4fa6-bbec-216f32d6f03a.png)

With Ethereum having finally transitioned to proof-of-stake, many people are wondering how to set up a local testing environment given so much has changed.

Running nodes has become easier over the past year, with go-ethereum taking around 2 days to sync and some hyper-optimized clients such as Akula or Erigon taking a week to sync an entire, _archival_ node. It is true that setting up a node on mainnet today is easier than ever. However, developers often want to set up their own, local blockchain for testing purposes. We call these **development networks** or **devnets**.

Devnets are critical for developers working on the protocol as well as smart contract developers that want to run their own chain using their own initial state. However, the latter need can be satisfied by tools such as [Foundry](https://github.com/foundry-rs/foundry/) which runs a “simulated” Ethereum environment that is enough for testing many contract interactions.

Notwithstanding, more complex applications may want an environment that is closer to a **real Ethereum blockchain**, and setting up a local chain from scratch is the best approach. This blog post will help you understand how to set up your own, **local Ethereum chain** from scratch that migrates to proof-of-stake in **minutes**.

## Setting up

With Ethereum switching to proof-of-stake, there are a bunch of buzzwords flying around:

> "Consensus", "Execution", "the Merge", What does it all mean???

Today, running an Ethereum node means simply installing a client such as [go-ethereum](https://github.com/ethereum/go-ethereum) and running a simple command to sync the chain. After the switch to proof-of-stake, running an "Ethereum node" will require **two components**:

1.  **execution client software** in charge of processing transactions and smart contracts. This is go-ethereum
2.  **consensus client software** in charge of running the proof-of-stake logic. This tutorial will use the [Prysm](https://github.com/prysmaticlabs/prysm) implemntation, which my team develops.

Prysm is an open source, Go implementation of the Ethereum proof-of-stake protocol. It can be used to run a node+validator on mainnet and testnet environments with ease, and is highly configurable to meet users’ needs.

## Easy setup using Docker

To get started, install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) for your system. If you are on MacOS, you should adjust your settings on Docker desktop to provide more resources to your Docker containers. Go to Preferences -> Resources and give around 4 CPUs and 8Gb of memory if possible for a smooth installation.

Next, clone a repository containing the configuration needed to run a local devnet with Docker here:

    git clone https://github.com/rauljordan/eth-pos-devnet && cd eth-pos-devnet
    

Finally, simply run docker compose inside of the repository above.

    docker-compose up -d
    

Boom! Your network is up and running.

    $ docker-compose up -d
    [+] Running 7/7
     ⠿ Network eth-pos-devnet_default                          Created
     ⠿ Container eth-pos-devnet-geth-genesis-1                 Started
     ⠿ Container eth-pos-devnet-create-beacon-chain-genesis-1  Started
     ⠿ Container eth-pos-devnet-geth-account-1                 Started
     ⠿ Container eth-pos-devnet-geth-1                         Started
     ⠿ Container eth-pos-devnet-beacon-chain-1                 Started
     ⠿ Container eth-pos-devnet-validator-1                    Started
    

You will now be running a **go-ethereum** execution client, Prysm **consensus client** and a Prysm **validator client** in the background using Docker.

Next, you can inspect the logs of the different services launched.

    docker logs eth-pos-devnet-geth-1 -f
    

Your go-ethereum node should look as follows:

![Image](https://user-images.githubusercontent.com/5572669/186052301-dd487b50-183a-4fa6-bbec-216f32d6f03a.png)

Your Prysm beacon node and validator client should also be functional:

![Image](https://user-images.githubusercontent.com/5572669/186052298-54b82ff2-a901-482e-9e5a-a7c265605ad6.png)

This sets up a single node development network with 64 deterministically-generated validator keys to drive the creation of blocks in an Ethereum proof-of-stake chain. Here's how it works:

1.  We initialize a **go-ethereum**, proof-of-work development node from a [genesis config](https://github.com/rauljordan/eth-pos-devnet/blob/master/execution/genesis.json)
2.  We initialize a **Prysm beacon chain**, proof-of-stake development node from a [genesis config](https://github.com/rauljordan/eth-pos-devnet/blob/master/consensus/config.yml)
3.  We then start mining in **go-ethereum**, and concurrently run proof-of-stake using Prysm
4.  Once the mining difficulty of the go-ethereum node reaches 50, the **node switches to proof-of-stake mode** by letting Prysm drive the consensus of blocks

The development net is fully functional and allows for the deployment of smart contracts and all the features that also come with the Prysm consensus client such as its rich set of APIs for retrieving data from the blockchain.

You now have access to the normal, Ethereum JSON-RPC APIs on http://localhost:8545 and the new consensus client APIs for the beacon chain on http://localhost:3500. You can see a list of available API endpoints for the beacon chain client [here](https://ethereum.github.io/beacon-APIs/)

This development net is a great way to understand the internals of Ethereum proof-of-stake and to mess around with the different settings that make the system possible.

## Manual setup built from source

All you will need for a manual installation guide is the Go programming language and `git`. Install the latest version of Go [here](https://go.dev/doc/install), and verify your installation with:

    go version
    

You should see an output showing you the version you have installed. Next, create a folder called `devnet` and change directory into it

    mkdir devnet && cd devnet

Clone the Prysm repository and build the following binaries. We’ll be outputting them to the `devnet` folder:

    git clone https://github.com/prysmaticlabs/prysm && cd prysm
    go build -o=../beacon-chain ./cmd/beacon-chain
    go build -o=../validator ./cmd/validator
    go build -o=../prysmctl ./cmd/prysmctl
    cd ..
    

Clone the go-ethereum repository and build it:

    git clone https://github.com/ethereum/go-ethereum && cd go-ethereum
    make geth
    cp ./build/bin/geth ../geth
    cd ..
    

You will now have all the executables you need to run the the software for the devnet.

### Configuration files

You will need configuration files for setting up Prysm and Go-Ethereum.

#### Prysm

On the Prysm side, create a file called `config.yml` in your `devnet` folder containing the following:

    CONFIG_NAME: interop
    PRESET_BASE: interop
    
    # Genesis
    GENESIS_FORK_VERSION: 0x20000089
    
    # Altair
    ALTAIR_FORK_EPOCH: 2
    ALTAIR_FORK_VERSION: 0x20000090
    
    # Merge
    BELLATRIX_FORK_EPOCH: 4
    BELLATRIX_FORK_VERSION: 0x20000091
    TERMINAL_TOTAL_DIFFICULTY: 50

    # Capella
    CAPELLA_FORK_VERSION: 0x20000092
    
    # Time parameters
    SECONDS_PER_SLOT: 12
    SLOTS_PER_EPOCH: 6
    
    # Deposit contract
    DEPOSIT_CONTRACT_ADDRESS: 0x4242424242424242424242424242424242424242
    

The configuration above contains information about the different hard-fork versions that are required for Prysm to run, and has some custom parameters to make running your devnet easier. It’s important to note that you can change any of these settings as desired. To see the full list of configuration options you can change, see [here](https://docs.prylabs.network/docs/prysm-usage/parameters/).
```
NOTICE: The config will need to be updated for each hard-fork.
```


#### Go-Ethereum

On the go-ethereum side, you will need to set-up a private key that will help advance the chain from genesis by mining up until it reaches **proof-of-stake** mode. Create a file called `secret.json` inside of your `devnet` folder with the following:

    2e0834786285daccd064ca17f1654f67b4aef298acbb82cef9ec422fb4975622
    

Next, save the following [file](https://github.com/rauljordan/eth-pos-devnet/blob/master/execution/genesis.json) as `genesis.json` inside of your devnet folder as well:

The file above sets up the genesis configuration for go-ethereum, which seeds certain accounts with an ETH balance and deploys a validator deposit contract at address `0x4242424242424242424242424242424242424242` which is used for new validators to deposit 32 ETH and join the proof-of-stake chain. The account that we are running go-ethereum with, `0x123463a4b065722e99115d6c222f267d9cabb524`, will have an ETH balance you can use to submit transactions on your devnet.


## Running the devnet

### Go-Ethereum

Next, we will start by running **go-ethereum** in our `devnet` folder:

    ./geth --datadir=gethdata init genesis.json
    ./geth --datadir=gethdata account import secret.json
    

The last command will ask you to input a password for your secret key. You can just hit enter twice to leave it empty. Next, run geth using the command below

    ./geth --http --http.api "eth,engine" --datadir=gethdata --allow-insecure-unlock --unlock="0x123463a4b065722e99115d6c222f267d9cabb524" --password="" --nodiscover console --syncmode=full --mine --miner.etherbase=0x123463a4b065722e99115d6c222f267d9cabb524
    
`miner.etherbase` can be any Ethereum address, in this case we just use the same address `0x123463a4b065722e99115d6c222f267d9cabb524` as it is an example. For more information about geth you can consult the documentation [here](https://geth.ethereum.org/docs).

You can check the ETH balance in the geth console by typing in

`eth.getBalance("0x123463a4b065722e99115d6c222f267d9cabb524")` which should show `2e+22`

### Prysm

We will then need to run a Prysm beacon node and a validator client. Prysm will need a **genesis state** which is essentially some data that tells it the initial set of validators. We will be creating a genesis state from a deterministic set of keys below:

    ./prysmctl testnet generate-genesis --num-validators=64 --output-ssz=genesis.ssz --chain-config-file=config.yml --override-eth1data=true
    
More information about `prysmctl` and all available commands can be found [here](https://docs.prylabs.network/docs/prysm-usage/prysmctl).

This will out a file `genesis.ssz` in your `devnet` folder. Now, run the Prysm beacon node soon after:

    ./beacon-chain \
      --datadir=beacondata \
      --min-sync-peers=0 \
      --genesis-state=genesis.ssz \
      --bootstrap-node= \
      --chain-config-file=config.yml \
      --config-file=config.yml \
      --chain-id=32382 \
      --execution-endpoint=http://localhost:8551 \
      --accept-terms-of-use \
      --jwt-secret=gethdata/geth/jwtsecret \
      --contract-deployment-block=0
    

and the Prysm validator client soon after:

    ./validator \
      --datadir=validatordata \
      --accept-terms-of-use \
      --interop-num-validators=64 \
      --interop-start-index=0 \
      --force-clear-db \
      --chain-config-file=config.yml \
      --config-file=config.yml
    

### Expected output

Your go-ethereum node should look as follows:

![Image](https://user-images.githubusercontent.com/5572669/186052301-dd487b50-183a-4fa6-bbec-216f32d6f03a.png)

Your Prysm beacon node should show the following:

![Image](https://user-images.githubusercontent.com/5572669/186052300-80d9e6d5-e2b7-4e1a-9113-1593e5a5872f.png)

The errors are normal, cosmetic, and present on all devnet environments. We are working on making the output more aesthetically pleasing in the future.

Your Prysm validator client should also be functional:

![Image](https://user-images.githubusercontent.com/5572669/186052298-54b82ff2-a901-482e-9e5a-a7c265605ad6.png)

Upon entering proof-of-stake mode, once the mining difficulty hits **50** in go-ethereum, you will see our special panda in your Prysm beacon chain below:

![Image](https://user-images.githubusercontent.com/5572669/186052296-03c18e6f-17f2-4d94-830d-ba7522cc09c8.png)


## Adding Prysm peers to your network

You can add additional, Prysm beacon chain peers to your proof-of-stake devnet by running the similar command as your first beacon node, but with a few tweaks. In a terminal window, use the following command:

    curl localhost:8080/p2p
    

You should get output similar to this:

    bootnode=[]
    self=enr:-MK4QCxV5SEkUO1chqZDSqMChX5fTbqeas4PEJqZtzmcWqZOKpZN8ABVrQFTqHI74M9TKNjE6DPAAgyv5JydsQ6NfPqGAYKxymm8h2F0dG5ldHOI-7v9vd4GdE2EZXRoMpCMkQYoIAAAkf__________gmlkgnY0gmlwhAoAAEqJc2VjcDI1NmsxoQNZcfvPnVEfnKz-mFv285nkDzgRXRVujloXQ_tjuCNEbYhzeW5jbmV0cw-DdGNwgjLIg3VkcIIu4A,/ip4/10.0.0.74/tcp/13000/p2p/16Uiu2HAmJg9Sfy8bX4wyjZNTi8soJrdPt9E9pPzJSmewN5rLoRM6
    
    0 peers
    

Copy the part that starts with `/ip4` after the comma, so in the example above,

`/ip4/10.0.0.74/tcp/13000/p2p/16Uiu2HAmJg9Sfy8bX4wyjZNTi8soJrdPt9E9pPzJSmewN5rLoRM6`

then set this as an environment variable:

    export PEER=/ip4/10.0.0.74/tcp/13000/p2p/16Uiu2HAmJg9Sfy8bX4wyjZNTi8soJrdPt9E9pPzJSmewN5rLoRM6
    

Then, run a second Prysm beacon node as follows:

    ./beacon-chain \
      --datadir=beacondata2 \
      --min-sync-peers=1 \
      --genesis-state=genesis.ssz \
      --bootstrap-node= \
      --chain-config-file=config.yml \
      --config-file=config.yml \
      --chain-id=32382 \
      --execution-endpoint=http://localhost:8551 \
      --accept-terms-of-use \
      --rpc-port=4001 \
      --p2p-tcp-port=13001 \
      --p2p-udp-port=12001 \
      --grpc-gateway-port=3501 \
      --monitoring-port=8001 \
      --jwt-secret=gethdata/geth/jwtsecret \
      --peer=$PEER
    

You will see the node start to synchronize with the chain as expected!

![Image](https://user-images.githubusercontent.com/5572669/186052294-70909835-210f-4b13-86a3-cf1f568bb8a3.png)
