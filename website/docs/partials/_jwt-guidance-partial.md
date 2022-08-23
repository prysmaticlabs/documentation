import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import JwtGenerationPartial from '@site/docs/partials/_jwt-generation-partial.md';

<JwtGenerationPartial />

## Configure execution node

Your execution node will need to **expose a new port** and then **use the JWT token** to authenticate your beacon node's connection to that port. This new port exposes your execution node's **Engine API**, a new API that facilitates Ethereum's transition to a proof-of-stake consensus mechanism.

Using the latest version of your execution client software, issue the following command to configure your execution node's JWT token and Engine API endpoint:

import QuickstartRunExecutionNodeJWTPartial from '@site/docs/install/partials/_quickstart-run-execution-node.md';

<QuickstartRunExecutionNodeJWTPartial />

## Configure beacon node

Next, we'll configure your beacon node to consume your JWT token so it can form an authenticated HTTP connection with your execution node. 

If you're running a validator, specifying a `suggested-fee-recipient` wallet address will allow you to earn what were previously miner transaction fee tips. Note that transaction fee tips are forwarded to a Ethereum Mainnet address (liquid, withdrawable), not to your validator's account balance (illiquid, not yet withdrawable). This `suggested-fee-recipient` address **must** be specified if you're running a validator, otherwise the transaction fee tips that you earn will be permanently lost. See [Configuring a Fee Recipient Address](./execution-node/fee-recipient.md) to learn more about this feature.

import QuickstartRunBeaconNodePartial from '@site/docs/install/partials/_quickstart-run-beacon-node.md';

<QuickstartRunBeaconNodePartial />