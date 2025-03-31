---
id: blobs
title: Blobs
sidebar_label: Blobs
---

import BlobsPng from '@site/static/images/blobs.png';


:::info

Only applicable after the Deneb/Cancun Hardfork

:::

## Background

[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) aka proto-danksharding in the Deneb/Cancun hardfork brings a data availability layer to Ethereum that allows for temporary storage of arbitrary data on the blockchain. The arbitrary data stored in this way are called `blobs` and there can be 3 ~ 6 blob sidecars (an object wrapper for blobs) associated to each block. This EIP marks ethereum's first steps towards sharding and scalability by allowing L2s to leverage this DA layer to reduce gas fees for their users and allowing for more transitions to be processed.

One design decision in the implementation of EIP-4844 to verify blobs and to enable the future path of proposer-builder separation is the use of [KZG commitments](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). In order to use KZG commitments a [Trusted Setup](https://vitalik.eth.limo/general/2022/03/14/trustedsetup.html) is needed. For the Deneb hardfork a [KZG Ceremony](https://github.com/ethereum/kzg-ceremony/tree/main) was conducted to create the Trusted Setup. For technical awareness, Prysm loads the Trusted Setup from `prysm/beacon-chain/blockchain/kzg/trusted_setup.json`

<img style={{maxWidth: 760 + 'px'}} src={BlobsPng} />

## Storage Requirements: 

The most significant impact on node operators is the increased storage requirement. Node runners have a new slightly increased storage requirement 

```
131928 blob ssz byte size * blobs retention period * 32 potential blocks per epoch * 3~6 Blob sidecars per block 

= 52GB~104GB
```

By default these blobs will be retained for 4096 epochs ,and Prysm will prune the oldest blobs once the retention period is reached.

Retention periods and storage paths can be configured using the following flags.

### New Flags

`--blob-path` : Location for blob storage. Default location will be a 'blobs' directory next to the beacon db. i.e. `--data-dir=/path/to/storage`

`--blob-retention-epochs` :  Override the default blob retention period (measured in epochs). The node will exit with an error at startup if the value is less than the default of 4096 epochs. i.e. `--blob-retention-epochs=6000`
