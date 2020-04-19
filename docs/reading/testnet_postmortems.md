---
id: testnet-postmortems
title: Testnet Postmortems
sidebar_label: Testnet Postmortems
---

## Testnet Incident Reports

As part of our day to day job in building eth2 with our Prysm project, we are tasked with maintaining a high integrity cloud deployment that runs several nodes in our testnet. Additionally, we are always on call to determine problems which arise in the network and must be addressed by the team. This page outlines a collection of incident reports and their resolutions from catastrophic events in our testnet. We hope it will shed more light on our devops process and how we tackle the hard problems managing a distributed system such as eth2 entails.

### Not Receiving P2P Blocks (Incident #8)

**Date:** 2020/04/18

**Authors:** Preston, Raul

**Status:** Root cause identified, resolved

**Network:** Topaz

**Summary:** Beacon nodes were not receiving blocks via gossipsub p2p at all, making it impossible to keep up with the chain head after initial sync completes. 

**Reference issues:**
https://github.com/prysmaticlabs/prysm/issues/5476
https://github.com/prysmaticlabs/prysm/issues/5491

**Impact:** This incident was reproducible on most node restarts, making it likely to kill our testnet if left unchecked. 

**Root Causes:** There was a race condition from the sync service needing access to the genesis time to compute a fork digest for subscribing to gossipsub topics. This value is set in the p2p service, but sometimes sync would begin before the p2p service, leading it to have a genesis time of 0.

**Trigger:** Performing beacon node restarts could easily reproduce this issue.

**Resolution:** We resolve the race condition by not making sync rely on p2p to set its ForkDigest, but instead get the genesis time directly from the blockchain service and refactoring ForkDigest to be a pure stateless function.

**Detection:** Local runs, user reports.

#### Where we got lucky
- Our pods haven’t had any rolling restarts or canaries rolling out that would trigger this issue, which is reproducible many times upon starting a beacon node. If our pods restarted, our testnet could have likely been killed and have had multiple forks.

#### Root Cause

Regular sync topic subscription was using a `forkDigest` of zero due to a race condition where the p2p service’s genesis time and genesis validator root was not yet initialized.

Preston realized he would see weird subscribed topics in his local node’s p2p metrics:

```
p2p_topic_peer_count{topic="/eth2/00000000/attester_slashing/ssz_snappy"} 0
p2p_topic_peer_count{topic="/eth2/00000000/beacon_aggregate_and_proof/ssz_snappy"} 0
p2p_topic_peer_count{topic="/eth2/00000000/beacon_block/ssz_snappy"} 0
p2p_topic_peer_count{topic="/eth2/00000000/proposer_slashing/ssz_snappy"} 0
p2p_topic_peer_count{topic="/eth2/00000000/voluntary_exit/ssz_snappy"} 0
p2p_topic_peer_count{topic="/eth2/f071c66c/attester_slashing/ssz_snappy"} 3
p2p_topic_peer_count{topic="/eth2/f071c66c/beacon_aggregate_and_proof/ssz_snappy"} 3
p2p_topic_peer_count{topic="/eth2/f071c66c/beacon_block/ssz_snappy"} 2
p2p_topic_peer_count{topic="/eth2/f071c66c/proposer_slashing/ssz_snappy"} 3
p2p_topic_peer_count{topic="/eth2/f071c66c/voluntary_exit/ssz_snappy"} 3
```

Showing duplicate values for various topics, where the 00000000 and f071c66c are the fork digests for the node. The 0 value was problematic, likely showing the sync service was started with a genesis time of 0. Preston then identified: 

#### Timeline

2020-04-16 (all times UTC)
- 02:00:00 Terence reports his nodes are not getting blocks via the gossip network in local chain testing, he mentions it doesn’t occur all the time and we put the issue on the backburner.

2020-04-18 (all times UTC)
- 08:02:00 Preston mentions he observes fork ENR mismatches in peer connections, Raul dismisses it as likely just a bootnode failure, and Preston also observes his local node isn’t receiving any blocks via gossip sub p2p
- 22:16:00 Preston tries to discover a potential race condition by making the p2p.ForkDigest() function return an error if p2p.genesisTime is not set, which ended up panicking right away, giving us a clue
- 22:30:00 Raul mentions there are two places where the state initialized feed fires, and they are not likely to have bugs. This feed is what notifies other services in Prysm of the genesis time and the genesis validators root, two critical values to compute a small hex digest used for subscribing to gossipsub topics.
- 22:33:00 Preston confirms the sync genesis time value is set to 0, and that we are likely subscribing to wrong gossip topics
- 22:35:00 Nishant mentions: “so sync needs to wait after p2p is initialized seems like sync and p2p start at the same time which is our main problem”
- 22:36:00 Preston reports the ForkDigest method does not need to be a pointer receiver of the p2p service, but can instead be a pure helper function that services can fill in with canonical values from the blockchain service, preventing any potential race conditions
- 22:39:00 Preston reports the issue is now resolved in his local node after seeing the beacon block p2p received metrics go up p2p_message_received_total{topic="/eth2/f071c66c/beacon_block/ssz_snappy"} 19 

