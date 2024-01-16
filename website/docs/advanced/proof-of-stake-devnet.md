---
id: proof-of-stake-devnet
title: How to Set Up an Ethereum Proof-of-Stake Devnet in Minutes
sidebar_label: Configure a devnet
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="Raul, Sammy, James" />

:::info

This how-to is an updated copy of Raul Jordan's [How to Set Up an Ethereum Proof-of-Stake Devnet in Minutes](https://rauljordan.com/how-to-setup-a-proof-of-stake-devnet/).

:::

With Ethereum having finally transitioned to proof-of-stake, many people are wondering how to set up a local testing environment given so much has changed.

Running nodes has become easier over the past few years, with go-ethereum taking around 1 day to sync and some hyper-optimized clients such Reth or Erigon taking less than a week to sync an entire, _archival_ node. It is true that setting up a node on mainnet today is easier than ever. However, developers often want to set up their own, local blockchain for testing purposes. We call these **development networks** or **devnets**.

Devnets are critical for developers working on the protocol as well as smart contract developers that want to run their own chain using their own initial state. However, the latter need can be satisfied by tools such as [Foundry](https://github.com/foundry-rs/foundry/) which runs a “simulated” Ethereum environment that is enough for testing many contract interactions.

Notwithstanding, more complex applications may want an environment that is closer to a **real Ethereum blockchain**, and setting up a local chain from scratch is the best approach. This section will help you understand how to set up your own, **local Ethereum chain** from scratch.

## Setting up

Today, running an Ethereum node require **two components**:

1.  **execution client software** in charge of processing transactions and smart contracts. Example of execution client softwares are: [go-ethereum](https://geth.ethereum.org), [besu](https://besu.hyperledger.org/), [erigon](https://github.com/ledgerwatch/erigon), [nethermind](https://nethermind.io/) or [reth](https://paradigmxyz.github.io/reth/).
2.  **consensus client software** in charge of running the proof-of-stake logic. This tutorial will use the [Prysm](https://github.com/prysmaticlabs/prysm) implementation, which my team develops.

Prysm is an open source, Go implementation of the Ethereum proof-of-stake protocol. It can be used to run a node+validator client on mainnet and testnet environments with ease, and is highly configurable to meet users’ needs.

## Easy setup using Docker

To get started, install [Docker](https://docs.docker.com/get-docker/) for your system. If you are on MacOS, you should adjust your settings on Docker desktop to provide more resources to your Docker containers. Go to Preferences -> Resources and give around 4 CPUs and 8GB of memory if possible for a smooth installation.

Next, clone a repository containing the configuration needed to run a local devnet with Docker here:

    git clone https://github.com/Offchainlabs/eth-pos-devnet && cd eth-pos-devnet
    

Finally, simply run docker compose inside of the repository above.

    docker compose up -d
    

Boom! Your network is up and running.

    [+] Building 0.0s (0/0)                                                                         docker:desktop-linux
    [+] Running 6/6
    ✔ Container eth-pos-devnet-geth-remove-db-1               Exited                                               0.0s
    ✔ Container eth-pos-devnet-create-beacon-chain-genesis-1  Exited                                               0.0s
    ✔ Container eth-pos-devnet-beacon-chain-1                 Running                                              0.0s
    ✔ Container eth-pos-devnet-geth-genesis-1                 Exited                                               0.0s
    ✔ Container eth-pos-devnet-validator-1                    Running                                              0.0s
    ✔ Container eth-pos-devnet-geth-1                         Running                                              0.0s
    

You will now be running a **go-ethereum** execution client, Prysm **consensus client** and a Prysm **validator client** in the background using Docker.

Next, you can inspect the logs of the different services launched.
    
Your go-ethereum node should look as follows:

    docker logs eth-pos-devnet-geth-1

    ...
    INFO [01-08|15:20:19.341] Starting work on payload                 id=0x77d9198e3268c273
    INFO [01-08|15:20:19.341] Updated payload                          id=0x77d9198e3268c273 number=1 hash=23f384..138a29 txs=0 withdrawals=0 gas=0 fees=0 root=c1d76f..66d1da elapsed="49.875µs"
    INFO [01-08|15:20:19.342] Stopping work on payload                 id=0x77d9198e3268c273 reason=delivery
    INFO [01-08|15:20:19.420] Imported new potential chain segment     number=1 hash=23f384..138a29 blocks=1 txs=0 mgas=0.000 elapsed="464.209µs" mgasps=0.000 triedirty=0.00B
    INFO [01-08|15:20:19.421] Left PoW stage
    INFO [01-08|15:20:19.473] Chain head was updated                   number=1 hash=23f384..138a29 root=c1d76f..66d1da elapsed="193.5µs"
    INFO [01-08|15:20:19.473] Starting work on payload                 id=0x8e683e75fcfca3db
    INFO [01-08|15:20:19.473] Updated payload                          id=0x8e683e75fcfca3db number=2 hash=c994d2..09a059 txs=0 withdrawals=0 gas=0 fees=0 root=c1d76f..66d1da elapsed="57.584µs"
    INFO [01-08|15:20:31.270] Stopping work on payload                 id=0x8e683e75fcfca3db reason=delivery
    INFO [01-08|15:20:31.285] Imported new potential chain segment     number=2 hash=c994d2..09a059 blocks=1 txs=0 mgas=0.000 elapsed="273.292µs" mgasps=0.000 triedirty=0.00B
    INFO [01-08|15:20:31.311] Chain head was updated                   number=2 hash=c994d2..09a059 root=c1d76f..66d1da elapsed="230.416µs"
    INFO [01-08|15:20:31.312] Starting work on payload                 id=0x074d481423d436a7
    INFO [01-08|15:20:31.312] Updated payload                          id=0x074d481423d436a7 number=3 hash=ad96be..cf85bf txs=0 withdrawals=0 gas=0 fees=0 root=c1d76f..66d1da elapsed="16.583µs"
    INFO [01-08|15:20:43.293] Stopping work on payload                 id=0x074d481423d436a7 reason=delivery
    INFO [01-08|15:20:43.301] Imported new potential chain segment     number=3 hash=ad96be..cf85bf blocks=1 txs=0 mgas=0.000 elapsed="435.333µs" mgasps=0.000 triedirty=0.00B
    INFO [01-08|15:20:43.329] Chain head was updated                   number=3 hash=ad96be..cf85bf root=c1d76f..66d1da elapsed="244.375µs"
    INFO [01-08|15:20:43.329] Starting work on payload                 id=0xd5e6ef6b8e57a9ad
    INFO [01-08|15:20:43.330] Updated payload                          id=0xd5e6ef6b8e57a9ad number=4 hash=27ac9b..dbceb0 txs=0 withdrawals=0 gas=0 fees=0 root=c1d76f..66d1da elapsed=1.071ms
    INFO [01-08|15:20:55.289] Stopping work on payload                 id=0xd5e6ef6b8e57a9ad reason=delivery
    INFO [01-08|15:20:55.296] Imported new potential chain segment     number=4 hash=27ac9b..dbceb0 blocks=1 txs=0 mgas=0.000 elapsed="295.292µs" mgasps=0.000 triedirty=0.00B
    INFO [01-08|15:20:55.324] Chain head was updated                   number=4 hash=27ac9b..dbceb0 root=c1d76f..66d1da elapsed="170.417µs"
    INFO [01-08|15:20:55.324] Starting work on payload                 id=0x4cb3bfb6e571648b
    INFO [01-08|15:20:55.324] Updated payload                          id=0x4cb3bfb6e571648b number=5 hash=b2337e..f4d6ff txs=0 withdrawals=0 gas=0 fees=0 root=c1d76f..66d1da elapsed="41.792µs"
    ...

Your Prysm beacon node should look as follows:

    docker logs -f eth-pos-devnet-beacon-chain-1

    ...
    time="2024-01-08 15:22:31" level=info msg="Begin building block" prefix="rpc/validator" sinceSlotStartTime=298.938597ms slot=12
    time="2024-01-08 15:22:31" level=info msg="Finished building block" prefix="rpc/validator" sinceSlotStartTime=308.06093ms slot=12 validator=29
    time="2024-01-08 15:22:31" level=info msg="Synced new block" block=0xfdb07f5c... epoch=2 finalizedEpoch=0 finalizedRoot=0x00000000... prefix=blockchain slot=12
    time="2024-01-08 15:22:31" level=info msg="Finished applying state transition" attestations=1 payloadHash=0x7dcaa5069592 prefix=blockchain slot=12 syncBitsCount=512 txCount=0
    time="2024-01-08 15:22:43" level=info msg="Begin building block" prefix="rpc/validator" sinceSlotStartTime=276.035047ms slot=13
    time="2024-01-08 15:22:43" level=info msg="Finished building block" prefix="rpc/validator" sinceSlotStartTime=287.046922ms slot=13 validator=20
    time="2024-01-08 15:22:43" level=info msg="Synced new block" block=0xbbd9fcdb... epoch=2 finalizedEpoch=0 finalizedRoot=0x00000000... prefix=blockchain slot=13
    time="2024-01-08 15:22:43" level=info msg="Finished applying state transition" attestations=1 payloadHash=0xbb5b42f29b27 prefix=blockchain slot=13 syncBitsCount=512 txCount=0
    time="2024-01-08 15:22:53" level=info msg="Peer summary" activePeers=0 inbound=0 outbound=0 prefix=p2p
    time="2024-01-08 15:22:55" level=info msg="Begin building block" prefix="rpc/validator" sinceSlotStartTime=262.454927ms slot=14
    time="2024-01-08 15:22:55" level=info msg="Finished building block" prefix="rpc/validator" sinceSlotStartTime=268.294677ms slot=14 validator=43
    time="2024-01-08 15:22:55" level=info msg="Synced new block" block=0x2b23cfb9... epoch=2 finalizedEpoch=0 finalizedRoot=0x00000000... prefix=blockchain slot=14
    time="2024-01-08 15:22:55" level=info msg="Finished applying state transition" attestations=1 payloadHash=0x8646bc1ab780 prefix=blockchain slot=14 syncBitsCount=512 txCount=0
    time="2024-01-08 15:23:07" level=info msg="Begin building block" prefix="rpc/validator" sinceSlotStartTime=306.54396ms slot=15
    time="2024-01-08 15:23:07" level=info msg="Finished building block" prefix="rpc/validator" sinceSlotStartTime=311.619794ms slot=15 validator=38
    time="2024-01-08 15:23:07" level=info msg="Synced new block" block=0x8f8323c7... epoch=2 finalizedEpoch=0 finalizedRoot=0x00000000... prefix=blockchain slot=15
    time="2024-01-08 15:23:07" level=info msg="Finished applying state transition" attestations=1 payloadHash=0xe128a09437ca prefix=blockchain slot=15 syncBitsCount=512 txCount=0
    time="2024-01-08 15:23:19" level=info msg="Begin building block" prefix="rpc/validator" sinceSlotStartTime=304.775549ms slot=16
    time="2024-01-08 15:23:19" level=info msg="Finished building block" prefix="rpc/validator" sinceSlotStartTime=309.306049ms slot=16 validator=16
    time="2024-01-08 15:23:19" level=info msg="Synced new block" block=0x55554a29... epoch=2 finalizedEpoch=0 finalizedRoot=0x00000000... prefix=blockchain slot=16
    time="2024-01-08 15:23:19" level=info msg="Finished applying state transition" attestations=1 payloadHash=0xe4b997c067a0 prefix=blockchain slot=16 syncBitsCount=512 txCount=0
    ...

Your Prysm validator client should look as follows:

    docker logs -f eth-pos-devnet-validator-1

    ...
    time="2024-01-08 15:27:55" level=info msg="Submitted new block" blockRoot=0x1d5ab10912de fork=capella gasUtilized=0 graffiti="" numAttestations=1 ...
    time="2024-01-08 15:27:59" level=info msg="Submitted new sync message" blockRoot=0x1d5ab10912de prefix=validator slot=39 slotStartTime=2024-01-08 15:27:55 ...
    time="2024-01-08 15:27:59" level=info msg="Submitted new sync message" blockRoot=0x1d5ab10912de prefix=validator slot=39 slotStartTime=2024-01-08 15:27:55 ...
    ...
    time="2024-01-08 15:27:59" level=info msg="Submitted new sync message" blockRoot=0x1d5ab10912de prefix=validator slot=39 slotStartTime=2024-01-08 15:27:55 ...
    time="2024-01-08 15:27:59" level=info msg="Submitted new sync message" blockRoot=0x1d5ab10912de prefix=validator slot=39 slotStartTime=2024-01-08 15:27:55...
    time="2024-01-08 15:28:03" level=info msg="Submitted new sync contribution and proof" aggregatorIndex=25 bitsCount=128 blockRoot=0x1d5ab10912de prefix=validator ...
    time="2024-01-08 15:28:03" level=info msg="Submitted new sync contribution and proof" aggregatorIndex=36 bitsCount=128 blockRoot=0x1d5ab10912de prefix=validator ...
    ...
    time="2024-01-08 15:28:03" level=info msg="Submitted new sync contribution and proof" aggregatorIndex=25 bitsCount=128 blockRoot=0x1d5ab10912de prefix=validator ...
    time="2024-01-08 15:28:03" level=info msg="Submitted new sync contribution and proof" aggregatorIndex=31 bitsCount=128 blockRoot=0x1d5ab10912de prefix=validator ...
    time="2024-01-08 15:28:03" level=info msg="Submitted new attestations" AggregatorIndices=[35] AttesterIndices=[35 19 37 51 10 29 46 41 11 30] BeaconBlockRoot=0x1d5ab10912de ...
    ...


This sets up a single node development network with 64 deterministically-generated validator keys to drive the creation of blocks in an Ethereum proof-of-stake chain. Here's how it works:

1. It sets the genesis time of the beacon chain 15 seconds into the future.  
2. It initializes a **go-ethereum**, execution development node from [genesis.json](https://github.com/OffchainLabs/eth-pos-devnet/blob/master/execution/genesis.json).
3. It initializes a **Prysm beacon chain**, consensus development node from [config.yml](https://github.com/OffchainLabs/eth-pos-devnet/blob/master/consensus/config.yml).

The development net is fully functional and allows for the deployment of smart contracts and all the features that also come with the
Prysm consensus client such as its rich set of APIs for retrieving data from the blockchain.

You now have access to the normal, Ethereum JSON-RPC APIs on [http://localhost:8545](http://localhost:8545) and the new consensus
client APIs for the beacon chain on [http://localhost:3500](http://localhost:3500).
You can see a list of available API endpoints for the beacon chain client [here](https://ethereum.github.io/beacon-APIs/).

This development network is a great way to understand the internals of Ethereum proof-of-stake and to mess around with the different settings that make the system possible.

Setting up a devnet using Docker is great but if you don't dig into the `docker-compose.yml` file, you may feel using a blackbox.
If you want to understand how it works under the hood, please follow the following section as well.

## Manual setup built from source

### Building binaries

All you will need for a manual installation guide is the Go programming language and `git`. Install the latest version of Go [here](https://go.dev/doc/install), and verify your installation with:

    go version
    

You should see an output showing you the version you have installed. Next, create a folder called `devnet` and change directory into it.

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

You will need configuration files for setting up go-ethereum and Prysm.

#### Geth and Prysm

##### JWT secret
To communicate through the engine API, go-ethereum and Prysm need to share a common JWT token.
In your `devnet` directory, create a `jwt.hex` file and put the following JWT token inside. (You can use any valid JWT token you wish, this one is only an working example.)

    0xfad2709d0bb03bf0e8ba3c99bea194575d3e98863133d1af638ed056d1d59345

##### Beacon chain configuration
Save the following [config.yml](https://github.com/OffchainLabs/eth-pos-devnet/blob/master/consensus/config.yml) file into your `devnet` directory.
    
The configuration above contains information about the different hard-fork versions that are required for Prysm to run,
and has some custom parameters to make running your devnet easier. It’s important to note that you can change any of these settings as desired.

```
NOTICE: The config will need to be updated for each hard-fork.
```

##### Genesis
Save the following [genesis.json](https://github.com/rauljordan/eth-pos-devnet/blob/master/execution/genesis.json) into your `devnet` directory.
This file contains an `alloc` section, with 4 interesting fields.

The first one is:

		"4242424242424242424242424242424242424242": {
			"code": "0x60806040526004361061003f5760003560e01c806301ffc9a71461004457806322895118146100b6578063621fd130146101e3578063c5f2892f14610273575b600080fd5b34801561005057600080fd5b5061009c6004803603602081101561006757600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019092919050505061029e565b604051808215151515815260200191505060405180910390f35b6101e1600480360360808110156100cc57600080fd5b81019080803590602001906401000000008111156100e957600080fd5b8201836020820111156100fb57600080fd5b8035906020019184600183028401116401000000008311171561011d57600080fd5b90919293919293908035906020019064010000000081111561013e57600080fd5b82018360208201111561015057600080fd5b8035906020019184600183028401116401000000008311171561017257600080fd5b90919293919293908035906020019064010000000081111561019357600080fd5b8201836020820111156101a557600080fd5b803590602001918460018302840111640100000000831117156101c757600080fd5b909192939192939080359060200190929190505050610370565b005b3480156101ef57600080fd5b506101f8610fd0565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561023857808201518184015260208101905061021d565b50505050905090810190601f1680156102655780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561027f57600080fd5b50610288610fe2565b6040518082815260200191505060405180910390f35b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061036957507f85640907000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b9050919050565b603087879050146103cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806116ec6026913960400191505060405180910390fd5b60208585905014610428576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260368152602001806116836036913960400191505060405180910390fd5b60608383905014610484576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602981526020018061175f6029913960400191505060405180910390fd5b670de0b6b3a76400003410156104e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806117396026913960400191505060405180910390fd5b6000633b9aca0034816104f457fe5b061461054b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260338152602001806116b96033913960400191505060405180910390fd5b6000633b9aca00348161055a57fe5b04905067ffffffffffffffff80168111156105c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260278152602001806117126027913960400191505060405180910390fd5b60606105cb82611314565b90507f649bbc62d0e31342afea4e5cd82d4049e7e1ee912fc0889aa790803be39038c589898989858a8a610600602054611314565b60405180806020018060200180602001806020018060200186810386528e8e82818152602001925080828437600081840152601f19601f82011690508083019250505086810385528c8c82818152602001925080828437600081840152601f19601f82011690508083019250505086810384528a818151815260200191508051906020019080838360005b838110156106a657808201518184015260208101905061068b565b50505050905090810190601f1680156106d35780820380516001836020036101000a031916815260200191505b508681038352898982818152602001925080828437600081840152601f19601f820116905080830192505050868103825287818151815260200191508051906020019080838360005b8381101561073757808201518184015260208101905061071c565b50505050905090810190601f1680156107645780820380516001836020036101000a031916815260200191505b509d505050505050505050505050505060405180910390a1600060028a8a600060801b6040516020018084848082843780830192505050826fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff1916815260100193505050506040516020818303038152906040526040518082805190602001908083835b6020831061080e57805182526020820191506020810190506020830392506107eb565b6001836020036101000a038019825116818451168082178552505050505050905001915050602060405180830381855afa158015610850573d6000803e3d6000fd5b5050506040513d602081101561086557600080fd5b8101908080519060200190929190505050905060006002808888600090604092610891939291906115da565b6040516020018083838082843780830192505050925050506040516020818303038152906040526040518082805190602001908083835b602083106108eb57805182526020820191506020810190506020830392506108c8565b6001836020036101000a038019825116818451168082178552505050505050905001915050602060405180830381855afa15801561092d573d6000803e3d6000fd5b5050506040513d602081101561094257600080fd5b8101908080519060200190929190505050600289896040908092610968939291906115da565b6000801b604051602001808484808284378083019250505082815260200193505050506040516020818303038152906040526040518082805190602001908083835b602083106109cd57805182526020820191506020810190506020830392506109aa565b6001836020036101000a038019825116818451168082178552505050505050905001915050602060405180830381855afa158015610a0f573d6000803e3d6000fd5b5050506040513d6020811015610a2457600080fd5b810190808051906020019092919050505060405160200180838152602001828152602001925050506040516020818303038152906040526040518082805190602001908083835b60208310610a8e5780518252602082019150602081019050602083039250610a6b565b6001836020036101000a038019825116818451168082178552505050505050905001915050602060405180830381855afa158015610ad0573d6000803e3d6000fd5b5050506040513d6020811015610ae557600080fd5b810190808051906020019092919050505090506000600280848c8c604051602001808481526020018383808284378083019250505093505050506040516020818303038152906040526040518082805190602001908083835b60208310610b615780518252602082019150602081019050602083039250610b3e565b6001836020036101000a038019825116818451168082178552505050505050905001915050602060405180830381855afa158015610ba3573d6000803e3d6000fd5b5050506040513d6020811015610bb857600080fd5b8101908080519060200190929190505050600286600060401b866040516020018084805190602001908083835b60208310610c085780518252602082019150602081019050602083039250610be5565b6001836020036101000a0380198251168184511680821785525050505050509050018367ffffffffffffffff191667ffffffffffffffff1916815260180182815260200193505050506040516020818303038152906040526040518082805190602001908083835b60208310610c935780518252602082019150602081019050602083039250610c70565b6001836020036101000a038019825116818451168082178552505050505050905001915050602060405180830381855afa158015610cd5573d6000803e3d6000fd5b5050506040513d6020811015610cea57600080fd5b810190808051906020019092919050505060405160200180838152602001828152602001925050506040516020818303038152906040526040518082805190602001908083835b60208310610d545780518252602082019150602081019050602083039250610d31565b6001836020036101000a038019825116818451168082178552505050505050905001915050602060405180830381855afa158015610d96573d6000803e3d6000fd5b5050506040513d6020811015610dab57600080fd5b81019080805190602001909291905050509050858114610e16576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252605481526020018061162f6054913960600191505060405180910390fd5b6001602060020a0360205410610e77576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602181526020018061160e6021913960400191505060405180910390fd5b60016020600082825401925050819055506000602054905060008090505b6020811015610fb75760018083161415610ec8578260008260208110610eb757fe5b018190555050505050505050610fc7565b600260008260208110610ed757fe5b01548460405160200180838152602001828152602001925050506040516020818303038152906040526040518082805190602001908083835b60208310610f335780518252602082019150602081019050602083039250610f10565b6001836020036101000a038019825116818451168082178552505050505050905001915050602060405180830381855afa158015610f75573d6000803e3d6000fd5b5050506040513d6020811015610f8a57600080fd5b8101908080519060200190929190505050925060028281610fa757fe5b0491508080600101915050610e95565b506000610fc057fe5b5050505050505b50505050505050565b6060610fdd602054611314565b905090565b6000806000602054905060008090505b60208110156111d057600180831614156110e05760026000826020811061101557fe5b01548460405160200180838152602001828152602001925050506040516020818303038152906040526040518082805190602001908083835b60208310611071578051825260208201915060208101905060208303925061104e565b6001836020036101000a038019825116818451168082178552505050505050905001915050602060405180830381855afa1580156110b3573d6000803e3d6000fd5b5050506040513d60208110156110c857600080fd5b810190808051906020019092919050505092506111b6565b600283602183602081106110f057fe5b015460405160200180838152602001828152602001925050506040516020818303038152906040526040518082805190602001908083835b6020831061114b5780518252602082019150602081019050602083039250611128565b6001836020036101000a038019825116818451168082178552505050505050905001915050602060405180830381855afa15801561118d573d6000803e3d6000fd5b5050506040513d60208110156111a257600080fd5b810190808051906020019092919050505092505b600282816111c057fe5b0491508080600101915050610ff2565b506002826111df602054611314565b600060401b6040516020018084815260200183805190602001908083835b6020831061122057805182526020820191506020810190506020830392506111fd565b6001836020036101000a0380198251168184511680821785525050505050509050018267ffffffffffffffff191667ffffffffffffffff1916815260180193505050506040516020818303038152906040526040518082805190602001908083835b602083106112a55780518252602082019150602081019050602083039250611282565b6001836020036101000a038019825116818451168082178552505050505050905001915050602060405180830381855afa1580156112e7573d6000803e3d6000fd5b5050506040513d60208110156112fc57600080fd5b81019080805190602001909291905050509250505090565b6060600867ffffffffffffffff8111801561132e57600080fd5b506040519080825280601f01601f1916602001820160405280156113615781602001600182028036833780820191505090505b50905060008260c01b90508060076008811061137957fe5b1a60f81b8260008151811061138a57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350806006600881106113c657fe5b1a60f81b826001815181106113d757fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508060056008811061141357fe5b1a60f81b8260028151811061142457fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508060046008811061146057fe5b1a60f81b8260038151811061147157fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350806003600881106114ad57fe5b1a60f81b826004815181106114be57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350806002600881106114fa57fe5b1a60f81b8260058151811061150b57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508060016008811061154757fe5b1a60f81b8260068151811061155857fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508060006008811061159457fe5b1a60f81b826007815181106115a557fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535050919050565b600080858511156115ea57600080fd5b838611156115f757600080fd5b600185028301915084860390509450949250505056fe4465706f736974436f6e74726163743a206d65726b6c6520747265652066756c6c4465706f736974436f6e74726163743a207265636f6e7374727563746564204465706f7369744461746120646f6573206e6f74206d6174636820737570706c696564206465706f7369745f646174615f726f6f744465706f736974436f6e74726163743a20696e76616c6964207769746864726177616c5f63726564656e7469616c73206c656e6774684465706f736974436f6e74726163743a206465706f7369742076616c7565206e6f74206d756c7469706c65206f6620677765694465706f736974436f6e74726163743a20696e76616c6964207075626b6579206c656e6774684465706f736974436f6e74726163743a206465706f7369742076616c756520746f6f20686967684465706f736974436f6e74726163743a206465706f7369742076616c756520746f6f206c6f774465706f736974436f6e74726163743a20696e76616c6964207369676e6174757265206c656e677468a2646970667358221220230afd4b6e3551329e50f1239e08fa3ab7907b77403c4f237d9adf679e8e43cf64736f6c634300060b0033",
			"balance": "0x0"
		},

This field deploys a validator deposit contract at address `0x4242424242424242424242424242424242424242` which is used for new validators
to deposit 32 ETH and join the proof-of-stake chain.

You can compare the EVM-compiled code of the contract with the
[official deposit contract deployed on mainnet](https://etherscan.io/address/0x00000000219ab540356cbb839cbe05303d7705fa#code).

The second one is:

		"123463a4b065722e99115d6c222f267d9cabb524": {
			"balance": "0x43c33c1937564800000"
		},

This field indicates that the account with the `0x123463a4b065722e99115d6c222f267d9cabb524` address will have, from the genesis block, an amount of `0x43c33c1937564800000 Wei`.
`0x43c33c1937564800000 Wei` corresponds to `20.000.000.000.000.000.000.000 Wei`, which corresponds to `20.000 ETH`.

The third one is:

    "config": {
        ...
        "shanghaiTime": 1694203366,
        ...
    }

It indicates when the Shanghai update should occur. This corresponds to **Friday 8 September 2023 08:02:46 PM**, which is already into the past.

And the last one is:

    "timestamp": "0x64fb7de6",

which corresponds to `1694203366`, and which defines the genesis time of the chain.
The fact that `timestamp` is equal to `config.shanghaiTime` tells that the chain will start directly at the time of the Shanghai upgrade.

We want to start our nodes **before** the gensis time of the chain, so we need to move these two fields into the future.

To do that, in the `devnet` directory, let's run:

    ./prysmctl testnet generate-genesis --fork capella --num-validators 64 --genesis-time-delay 600 --chain-config-file config.yml --geth-genesis-json-in genesis.json  --geth-genesis-json-out genesis.json --output-ssz genesis.ssz

This command takes `config.yaml`, `genesis.json` and some other parameters in inputs, and outputs `genesis.ssz` and `genesis.json`.
(`genesis.json` is both an input AND an output because it is both used in `--geth-genesis-json-in` and `--geth-genesis-json-out`.)

- `genesis.json` will be used later in go-ethereum.
- `genesis.ssz` will be used later in Prysm.

Let's detail some used options:
- `--num-validators 64` deterministically creates 64 validators in the output file specified by `--output-ssz`. Runnning two times this command will generate two times the same set of validators. In this output file, the field named `genesis_validators_root` contains the merkle root of data related to the initial set of validators.
- `--genesis-time-delay 600` modifies `timestamp` and a `config.shanghaiTime` in the file specified by `--geth-genesis-json-out` 600 seconds (10 minutes) in the future.  We use 10 minutes to be sure you will be able to read the rest of this tutorial and to launch all the clients without rushing before the end of this delay. You can of course reduce it to a few seconds later.

`genesis.ssz` is a binary file and is not easily readable. If you want to see the content of this file, you can add to the previous command the flag `--output-json <path to a file>`. It will outputs a human readable equivalent file to `genesis.ssz`.

#### go-ethereum


In order to use this account in the go-ethereum console, we need to tell go-ethereum what is the secret key corresponding to the `0x123463a4b065722e99115d6c222f267d9cabb524` address.
It turns out this secret key is 
    
    2e0834786285daccd064ca17f1654f67b4aef298acbb82cef9ec422fb4975622

You can derive the address from the secret key if you are not convinced.

In the `devnet` directory:
- Create a `secret.txt` file and write the private key into this file.
- Run the command:


    ./geth --datadir=gethdata account import secret.txt

Choose the password you like. You'll need it after, when running go-ethereum.

This command will import the private key into go-ethereum, so we will able to use the corresponding account in the geth console.

:::danger

Do **NOT** send real ETH to the `0x123463a4b065722e99115d6c222f267d9cabb524` address. Since the corresponding secret key is available on the internet, someone will
probably steal these funds.

:::

### Running the devnet

#### go-ethereum

Next, we will initialize the genesis state of **go-ethereum**  by running **go-ethereum** in our `devnet` folder:

    ./geth --datadir=gethdata init genesis.json

This way, geth knows that the deposit contract leaves at `0x4242424242424242424242424242424242424242` address and that our account
`0x123463a4b065722e99115d6c222f267d9cabb524` has `20.000` ETH.

Then, we will run **go-ethereum**.

    ./geth --http --http.api eth,net,web3 --ws --ws.api eth,net,web3 --authrpc.jwtsecret jwt.hex --datadir gethdata --nodiscover --syncmode full --allow-insecure-unlock --unlock 0x123463a4b065722e99115d6c222f267d9cabb524


Enter the password you created when previously importing the account.
If you don't want to type the password every time, you can write the password into a file, and then use the following option when starting go-ethereum.

    --password <path to the file containing the password>

You should now see these logs:

    INFO [01-09|18:38:23.618] Unlocked account                         address=0x123463a4B065722E99115D6c222f267d9cABb524
    WARN [01-09|18:38:58.164] Post-merge network, but no beacon client seen. Please launch one to follow the chain!

The first line indicates that go-ethereum successfully unlocked our account.
The second one indicates that go-ethereum is waiting for a beacon node to drive it. We are going to do it in the following steps.

#### Prysm

Run the Prysm beacon node:

    ./beacon-chain --datadir beacondata --min-sync-peers 0 --genesis-state genesis.ssz --bootstrap-node= --interop-eth1data-votes --chain-config-file config.yml --contract-deployment-block 0 --chain-id 32382 --accept-terms-of-use --jwt-secret jwt.hex --suggested-fee-recipient 0x123463a4B065722E99115D6c222f267d9cABb524 --minimum-peers-per-subnet 0 --enable-debug-rpc-endpoints --execution-endpoint gethdata/geth.ipc
    

and the Prysm validator client soon after:

    ./validator --datadir validatordata --accept-terms-of-use --interop-num-validators 64 --chain-config-file config.yml


Until the genesis time is not reached, you should see something like

    [2024-01-10 14:42:18]  INFO slotutil: 6m55s until chain genesis genesisStateRoot=a97895d2be4529508cf8d61d9eeb02629a59e0bcbacbf24b14b0d9a7ceec4b3a genesisTime=2024-01-10 14:49:14 +0100 CET genesisValidators=64

in the logs of your beacon node.

Once the genesis time is reached:

Your go-ethereum node should look as follows:

    ...
    INFO [01-10|15:10:51.144] Stopping work on payload                 id=0xeaba502eddee0a5b reason=delivery
    INFO [01-10|15:10:51.164] Imported new potential chain segment     number=8 hash=9cb319..c81c3f blocks=1 txs=0 mgas=0.000 elapsed=4.361ms    mgasps=0.000 triedirty=0.00B
    INFO [01-10|15:10:51.179] Chain head was updated                   number=8 hash=9cb319..c81c3f root=c1d76f..66d1da elapsed=4.877292ms
    INFO [01-10|15:10:51.188] Starting work on payload                 id=0x80c80b0a4973d343
    INFO [01-10|15:10:51.188] Updated payload                          id=0x80c80b0a4973d343 number=9 hash=d03b0d..926611 txs=0 withdrawals=0 gas=0 fees=0 root=c1d76f..66d1da elapsed="27.75µs"
    ...

Your Prysm beacon node should look as follows:

    ...
    [2024-01-10 15:12:03]  INFO rpc/validator: Begin building block sinceSlotStartTime=149.902ms slot=14
    [2024-01-10 15:12:03]  INFO rpc/validator: Finished building block sinceSlotStartTime=153.435ms slot=14 validator=23
    [2024-01-10 15:12:03]  INFO blockchain: Synced new block block=0xa80e52a0... epoch=2 finalizedEpoch=0 finalizedRoot=0x00000000... slot=14
    [2024-01-10 15:12:03]  INFO blockchain: Finished applying state transition attestations=1 payloadHash=0xe4360f97c18a slot=14 syncBitsCount=512 txCount=0
    [2024-01-10 15:12:03]  INFO blockchain: Forkchoice updated with payload attributes for proposal blockRoot=0xa80e52a0f4b2 headSlot=14 payloadID=0xa5ff73b0694f
    ...

Your Prysm validator client should look as follows:

    ...
    [2024-01-10 15:13:07]  INFO validator: Submitted new sync message blockRoot=0x37533aa83c35 slot=19 slotStartTime=2024-01-10 15:13:03 +0100 CET timeSinceSlotStart=4.019243s validatorIndex=23
    [2024-01-10 15:13:07]  INFO validator: Submitted new sync message blockRoot=0x37533aa83c35 slot=19 slotStartTime=2024-01-10 15:13:03 +0100 CET timeSinceSlotStart=4.019451s validatorIndex=31
    [2024-01-10 15:13:07]  INFO validator: Submitted new sync message blockRoot=0x37533aa83c35 slot=19 slotStartTime=2024-01-10 15:13:03 +0100 CET timeSinceSlotStart=4.019471s validatorIndex=54
    ...
    INFO validator: Submitted new sync contribution and proof aggregatorIndex=1 bitsCount=128 blockRoot=0x37533aa83c35 slot=19 slotStartTime=2024-01-10 15:13:03 +0100 CET subcommitteeIndex=3 timeSinceSlotStart=8.026767s
    [2024-01-10 15:13:11]  INFO validator: Submitted new sync contribution and proof aggregatorIndex=26 bitsCount=128 blockRoot=0x37533aa83c35 slot=19 slotStartTime=2024-01-10 15:13:03 +0100 CET subcommitteeIndex=2 timeSinceSlotStart=8.02678s
    [2024-01-10 15:13:11]  INFO validator: Submitted new sync contribution and proof aggregatorIndex=42 bitsCount=128 blockRoot=0x37533aa83c35 slot=19 slotStartTime=2024-01-10 15:13:03 +0100 CET subcommitteeIndex=3 timeSinceSlotStart=8.026795s
    ...
    INFO validator: Submitted new attestations AggregatorIndices=[42] AttesterIndices=[60 30 7 54 47 22 23 6 8 42 33] BeaconBlockRoot=0x37533aa83c35 CommitteeIndex=0 Slot=19 SourceEpoch=2 SourceRoot=0xd3d2d7a5c1cd TargetEpoch=3 TargetRoot=0xae1488d642e0
    [2024-01-10 15:13:15]  INFO validator: Submitted new block blockRoot=0x5019f6867b7f fork=capella gasUtilized=0 graffiti= numAttestations=1 numDeposits=0 parentHash=0x98627513e7b2 payloadHash=0xcf17a0ea61d9 pubKey=0x8dd74e1bb522 slot=20 txCount=0 withdrawalCount=0
    You can check the ETH balance in the go-ethereum console by typing in
    ...

    
## Using our newsly created devnet.
The devnet you just launched is a full-fledged Ethereum network. This means you can deploy smart contracts, call these smart contracts, send some Ethers from one account to an other etc...

### Send ETH using the go-ethereum console.
Connect to the go ethereum console with

    ./geth attach http://localhost:8545

Check the balance of your `0x123463a4b065722e99115d6c222f267d9cabb524` address:

    web3.fromWei(eth.getBalance("0x123463a4B065722E99115D6c222f267d9cABb524"), "ether")

It should output `20000`. Those `20.000 ETH` correspond to what have been set in the `genesis.json` file of the address `0x123463a4b065722e99115d6c222f267d9cabb524`.

Because we previously imported into go-ethereum the private key corresponding to the address `0x123463a4b065722e99115d6c222f267d9cabb524`, we have the control of this account.

Using the go-ethereum console, we will send some Ethers from `0x123463a4b065722e99115d6c222f267d9cabb524` to 
`0x123c0ffee567beef890decade123fade456bed78`.

Check the balance of `0x123c0ffee567beef890decade123fade456bed78`:

    web3.fromWei(eth.getBalance("0x123c0ffee567beef890decade123fade456bed78"), "ether")

This account was not part of the `genesis.json` and nobody sent any ETH to it, so it should output `0`. 

Now, send `1 ETH` from our address `0x123463a4b065722e99115d6c222f267d9cabb524` to the address `0x123c0ffee567beef890decade123fade456bed78`.

    web3.eth.sendTransaction({
        from: "0x123463a4b065722e99115d6c222f267d9cabb524",
        to: "0x123c0ffee567beef890decade123fade456bed78",
        value: web3.toWei(1, "ether")
    })

Just after doing that, go-ethereum logs should containt:

    INFO [01-10|15:42:22.550] Submitted transaction                    hash=0x4ac2a0e386ed41d8c56cf83226c44eba0858170a0964941b1f722dd54bb79e4d from=0x123463a4B065722E99115D6c222f267d9cABb524 nonce=0 recipient=0x123C0ffeE567BeeF890DECadE123FaDe456BeD78 value=1,000,000,000,000,000,000
    INFO [01-10|15:42:23.246] Updated payload                          id=0xd1f71f92ca68ab12 number=79 hash=da5ebe..271e9d txs=1 withdrawals=0 gas=21000 fees=2.1e-05 root=088b29..07ccf1 elapsed="365.625µs"

Note the field `txs=1` in the second log, meaning there is one transaction pending.

Now let's check again the balance of the source and the target account.

- The source account should now contain `19.999 ETH` (minus fees paid for the transaction)
- The target account should now contain exactly `1 ETH`.

### Send ETH using MetaMask

You need to import the private key corresponding to the `0x123463a4b065722e99115d6c222f267d9cabb524` address into MetaMask.

This private key is 

    2e0834786285daccd064ca17f1654f67b4aef298acbb82cef9ec422fb4975622

:::danger

Do **NOT** send real ETH to the `0x123463a4b065722e99115d6c222f267d9cabb524` address. Since the corresponding secret key is available on the internet, someone will
probably steal these funds.

:::


In MetaMask, click on your account in the top bar, then click on `+ Add account or hardware wallet`, and then on `Import Account`.

Enter the private key listed earlier. Now MetaMask should recognise you as the owner of the account with the `0x123463a4b065722e99115d6c222f267d9cabb524` address.
![Image](https://github.com/prysmaticlabs/documentation/assets/4943830/d745801f-9693-4a0d-ba63-f69f4be7f42e).

You can see you have 0 ETH instead of the 20.000 ETH expected. We need to connect MetaMask to your devnet. Click on the top left button in MetaMask, then click on `Add network`, and then on `Add a network manually`.

Fill the fields as following:
- `Network name`: `Personnal ETH devnet` (This is informative, choose what you want.)
- `New RPC URL`: `http://localhost:8545` (This will connect MetaMask to your local go-ethereum instance to submit transactions.)
- `Chain ID`: `32382` (This must be the same that the one in the `config.ChainId` in the `genesis.json` file)
- `Currency symbol`: `pdETH` (For personal devnet ETH. This is informative, choose what you want.)

It should look something like:
![Image](https://github.com/prysmaticlabs/documentation/assets/4943830/3b8a96ce-6f32-4e76-8946-79e8cc1af915)

Then click on `Save` and on `Switch to Personal ETH devnet`.

Now, you should have something like 
![image](https://github.com/prysmaticlabs/documentation/assets/4943830/593c3159-def7-4644-ac25-a86508894f35)

You can now send transactions as you usually do with MetaMask.

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
    

Run a second go-ethereum node as follows:

    ./geth --datadir=gethdata2 init genesis.json
    ./geth --http --http.api eth,net,web3 --ws --ws.api eth,net,web3 --authrpc.jwtsecret jwt.hex --datadir gethdata2 --nodiscover --syncmode full --discovery.port 30304 --port 30304 --http.port 8547 --ws.port 8548 --authrpc.port 8552

Then, run a second Prysm beacon node as follows:

    ./beacon-chain --datadir beacondata2 --min-sync-peers 1 --genesis-state genesis.ssz --bootstrap-node= --interop-eth1data-votes --chain-config-file config.yml --contract-deployment-block 0 --chain-id 32382 --accept-terms-of-use --jwt-secret jwt.hex --suggested-fee-recipient 0x123463a4B065722E99115D6c222f267d9cABb524 --minimum-peers-per-subnet 0 --enable-debug-rpc-endpoints --execution-endpoint gethdata2/geth.ipc --peer=$PEER --p2p-udp-port 12001 --p2p-tcp-port 13001 --grpc-gateway-port 3501 --rpc-port 4001
    

You will see the node start to synchronize with the chain as expected!

    [2024-01-10 17:34:49]  INFO initial-sync: Processing block batch of size 64 starting from  0x2bc4fae2... 128/194 - estimated time remaining 20s blocksPerSecond=3.2 peers=1
    [2024-01-10 17:34:49]  INFO initial-sync: Synced to finalized epoch - now syncing blocks up to current head currentSlot=194 syncedSlot=191
    [2024-01-10 17:34:50]  INFO initial-sync: Processing block 0x8a2a6514... 192/195 - estimated time remaining 0s blocksPerSecond=3.2 peers=1
    [2024-01-10 17:34:50]  INFO blockchain: Synced new block block=0x8a2a6514... epoch=32 finalizedEpoch=30 finalizedRoot=0xb45af45a... slot=192
    [2024-01-10 17:34:50]  INFO blockchain: Finished applying state transition attestations=1 payloadHash=0xc214c0e60ed6 slot=192 syncBitsCount=512 txCount=0
    [2024-01-10 17:34:50]  INFO blockchain: Synced new block block=0x2bca1c56... epoch=32 finalizedEpoch=30 finalizedRoot=0xb45af45a... slot=193
    [2024-01-10 17:34:50]  INFO blockchain: Finished applying state transition attestations=1 payloadHash=0x37915eb48ed7 slot=193 syncBitsCount=512 txCount=0
    [2024-01-10 17:34:50]  INFO blockchain: Synced new block block=0x9f847fc1... epoch=32 finalizedEpoch=30 finalizedRoot=0xb45af45a... slot=194
    [2024-01-10 17:34:50]  INFO blockchain: Finished applying state transition attestations=1 payloadHash=0xb874756475fd slot=194 syncBitsCount=512 txCount=0
    [2024-01-10 17:34:50]  INFO initial-sync: Synced to head of chain currentSlot=195 syncedSlot=194
    [2024-01-10 17:34:50]  INFO initial-sync: Synced up to slot 194
