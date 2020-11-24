---
id: ethereum-2-minimal-slashing-api
title: Ethereum 2.0 minimal slashing API
sidebar_label: Eth2 minimal slashing API
description: This section contains service definitions and gRPC instructions to interact with the slasher's minimal slashing API.
---


## Problem statement
The basic eth2 phase 0 slashing conditions premise dictates that a validator can’t forget past signed messages without a penalty. It’s a simple rule, don’t sign the same message but with different parameters (double voting) or try to change history by signing a message “deleting” a previous one (surrounded and surrounding votes).
There are 3 types of slashing events:

![gRPC](/img/slashing_conditions.png)

Under a naive approach this is fairly easy to implement, simply code the slashing conditions into the validator client and write to a local database every time the validator signs any message. Things get complicated in the real world.
A validator has a duty every 6.4 minutes, the amount of signed messages can grow rapidly to tens of thousands and even more. A naive implementation will quickly face performance issues and backup issues, the latter more severe under a recovery from seed scenario. 

The basic promise of a seed managed wallet is that all a user needs to recover fully is the seed. Under eth2 slashing conditions that same user will now need all the historical slashing data as well to stay safe. That’s just not feasible nor convenient.

## Minimal Slashing protection
A solution can be found in adopting more stringent slashing rules that enable reducing the footprint of a slashing database significantly. Instead of holding the entire past attestation history, we can minimize it to just holding the highest source and highest target attestation ever signed, then force inner validator rules that reference only those 2 pieces of data to validate and ultimately sign an attestation.<br />
The rules are:

1) New attestation source epoch must be equal or higher than known highest source.<br />
2) New attestation target epoch must be higher than known highest target.

**Minimal slashing protection was first discussed by Michael Sproul (lighthouse team) and initiallly incldued in the [Slashing protection Database Interchange Format](https://hackmd.io/@sproul/Bk0Y0qdGD).** 

## Highset Attestation API
```go
	address := "<slasher_address>:<slasher_port>"
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		fmt.Printf("%s", err.Error())
		return
	}
	defer conn.Close()

	client := slashpb.NewSlasherClient(conn)
	res, err := client.HighestAttestations(context.Background(), &slashpb.HighestAttestationRequest{
		Epoch:                1,
		ValidatorIds:         []uint64{}, // array of validator indexes
	})
```
