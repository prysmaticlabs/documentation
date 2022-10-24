---
id: exiting-a-validator
title: Exit your validator
sidebar_label: Exit your validator
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To voluntarily exit your validator from the Ethereum network, you'll follow this procedure:

 1. Ensure that a beacon node is running locally. 
 1. Issue the `voluntary-exit` command to your validator (examples provided below).
 2. Select the account(s) that should be exited. This step can be skipped by specifying the account(s) via the `--public-keys` flag when issuing the `--voluntary-exit` command.
 3. Confirm your understanding of the consequences of exiting your validator by typing `Exit my validator` when prompted.

After providing confirmation, your validator node will initiate the voluntary exit by broadcasting your request through your beacon node. By default, your validator node will try to access a beacon node running on `127.0.0.1:4000`. Learn how to update this and other settings via the `--help` flag (for example: `./prysm.sh prysmctl sign voluntary-exit --help`). Alternatively, visit our [Parameters documentation](../prysm-usage/parameters.md).

:::caution 

Although validator nodes can voluntarily exit, you won't be able to withdraw your staked funds or re-enroll your validator until withdrawal functionality is implemented, which will likely happen soon. Visit the [Ethereum Validator FAQ](https://launchpad.ethereum.org/en/faq) to learn more.

:::

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

**Using Prysm.sh**

```bash
./prysm.sh prysmctl sign voluntary-exit --public-keys=="0x8b91f34c039c348f73c2dda492998e268c2815a433f59a6667258267739947dcfc8ade6823b3f1f3cfef824497eb113c"
```

**Using Docker**

```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  gcr.io/prysmaticlabs/prysm/prysmctl:latest \
  sign voluntary-exit --wallet-dir=/wallet \ --public-keys=="0x8b91f34c039c348f73c2dda492998e268c2815a433f59a6667258267739947dcfc8ade6823b3f1f3cfef824497eb113c"
```

**Using Bazel**

```bash
bazel run //prysmctl --config=release -- sign voluntary-exit
```

</TabItem>
<TabItem value="win">

**Using Prysm.bat**

```bash
prysm.bat prysmctl sign voluntary-exit --wallet-dir=/wallet --public-keys=="0x8b91f34c039c348f73c2dda492998e268c2815a433f59a6667258267739947dcfc8ade6823b3f1f3cfef824497eb113c"
```

**Using Docker**

```text
docker run -it -v %LOCALAPPDATA%\Eth2Validators\prysm-wallet-v2:/wallet gcr.io/prysmaticlabs/prysm/validator:latest sign voluntary-exit --wallet-dir=/wallet
```

</TabItem>
<TabItem value="mac">

**Using Prysm.sh**

```bash
./prysm.sh validator sign voluntary-exit --public-keys=="0x8b91f34c039c348f73c2dda492998e268c2815a433f59a6667258267739947dcfc8ade6823b3f1f3cfef824497eb113c"
```

**Using Docker**

```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  gcr.io/prysmaticlabs/prysm/validator:latest \
  sign voluntary-exit --wallet-dir=/wallet --public-keys=="0x8b91f34c039c348f73c2dda492998e268c2815a433f59a6667258267739947dcfc8ade6823b3f1f3cfef824497eb113c"
```

**Using Bazel**

```bash
bazel run //prysmctl --config=release -- sign voluntary-exit --public-keys=="0x8b91f34c039c348f73c2dda492998e268c2815a433f59a6667258267739947dcfc8ade6823b3f1f3cfef824497eb113c"
```

</TabItem>
<TabItem value="arm">

```bash
./prysm.sh prysmctl sign voluntary-exit --public-keys=="0x8b91f34c039c348f73c2dda492998e268c2815a433f59a6667258267739947dcfc8ade6823b3f1f3cfef824497eb113c"
```

</TabItem>
</Tabs>

### DevNet/TestNet configuration

Validator Exit is also supported on testnet and devnet with corresponding flags.

Example in bash
<Tabs className="tabgroup-with-label network-tabgroup" groupId="network" defaultValue="mainnet" values={[
        {label: 'Network:', value: 'label'},
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
    <TabItem className="unclickable-element" value="label"></TabItem>
    <TabItem value="mainnet">
    ```example in bash
    ./prysm.sh prysmctl sign voluntary-exit --public-keys=="0x8b91f34c039c348f73c2dda492998e268c2815a433f59a6667258267739947dcfc8ade6823b3f1f3cfef824497eb113c"
    ```
    </TabItem>
    <TabItem value="goerli-prater">
    ```example in bash
    ./prysm.sh prysmctl sign voluntary-exit --public-keys=="0x8b91f34c039c348f73c2dda492998e268c2815a433f59a6667258267739947dcfc8ade6823b3f1f3cfef824497eb113c" --goerli
    ```
    </TabItem>
    <TabItem value="sepolia">
     ```example in bash
    ./prysm.sh prysmctl sign voluntary-exit --public-keys=="0x8b91f34c039c348f73c2dda492998e268c2815a433f59a6667258267739947dcfc8ade6823b3f1f3cfef824497eb113c" --sepolia
    ```
    </TabItem>
</Tabs>



### Advanced: Exiting with Web3signer

Remote Keys that use the [web3signer](./web3signer.md) will require additional flags `--validators-external-signer-url` and `--validators-external-signer-public-keys` instead of the `--wallet-dir` flag.

#### example with prysm.sh

```text
./prysm.sh prysmctl sign voluntary-exit --beacon-rpc-provider=127.0.0.1:4000 --validators-external-signer-url=http://localhost:9000 --validators-external-signer-public-keys="0x855ae9c6184d6edd46351b375f16f541b2d33b0ed0da9be4571b13938588aee840ba606a946f0e8023ae3a4b2a43b4d4" --public-keys="0x855ae9c6184d6edd46351b375f16f541b2d33b0ed0da9be4571b13938588aee840ba606a946f0e8023ae3a4b2a43b4d4"
```

import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />