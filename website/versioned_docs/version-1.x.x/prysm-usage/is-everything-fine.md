---
id: is-everything-fine
title: How to tell if Prysm is running as expected 
sidebar_label: Checking if Prysm runs as expected
---

## Running the beacon node

When running a beacon node for the first time, it will attempt to process deposits from the eth1 chain's deposit contract. These are all the validators that have deposited 32 ETH to join the eth2 beacon chain. This process may take a few minutes.

![image](/img/processingdeposits.png)

Soon after, the beacon node will attempt to download the blockchain via its connected node peers over the Internet. This process may also take a while, depending on how long the chain has been running. As this process is occurring, the validator client connected to your beacon node will be unable to produce blocks or vote on others' blocks. Here's what a beacon node "synchronizing" looks like.

![image](/img/syncing.png)

Finally, once your beacon node is done syncing, here is what an **optimal**, properly-running beacon node looks like. This is how your node should look if everything is ok.

![image](/img/ok.png)

### Common failures

#### Lack of peers

If your beacon node is struggling to find peers, and it says something along the lines of `Waiting for enough suitable peers before syncing`, you might be suffering from connectivity problems. We put together a guide on how to diagnose network issues [here](/docs/prysm-usage/p2p-host-ip).

#### Node stuck during sync

If your node seems stuck in a loop while it is syncing the blockchain, a restart will usually resolve the problem. If the problem persists, please get in touch with us via [Discord](https://discord.gg/hmq4y2P).

## Running the validator client

An **optimally-running** validator client should look as follows

![image](/img/validator.png)

This means your validators are properly voting and proposing blocks as expected, and earning rewards while doing so.

Your validators might also be **PENDING** activation, which means it will be a while before they are active. Here's what this would look like:

![image](/img/pending.png)

Around 4 validators are activated every 6 minutes, so you will need to wait for a while if your position is far away in the activation queue.

Your validator might also be in the status **DEPOSITED** and the info message says something along the lines of `Deposit processed, entering activation queue after finalization`

### Common failures

#### Everything seems fine, but my balance is going down

If your validator client is running fine without errors but you're seeing your validator balance decrease, it is typically a sign your beacon node is either (a) crashed, (b) not synced to the chain head. Check your beacon node logs to see if there are any strange errors or crashes, and please notify us. This might also mean your beacon node doesn't have any peers and is likely not connected to anyone or server time is not synchronized. If this still does not resolve your issue, you can get in touch with our team on [Discord](https://discord.gg/prysmaticlabs) anytime.

## Keeping your validator always online using systemd or Docker

Running a validator is a 24/7 task, meaning you can't always expect to be in front of your computer to manage it. If you're running the validator on a cloud server, or you want the ability for it to restart automatically once your computer restarts, you need a way to run the software in the background. There are several ways of doing this, but we'll cover Docker and systemd, which are popular methods of running software as a service.

<Tabs
  groupId="service"
  defaultValue="docker"
  values={[
    {label: 'Docker', value: 'docker'},
    {label: 'Systemd', value: 'systemd'},
  ]
}>
<TabItem value="docker">

You can use Docker to run your beacon node and validators in the background effectively.

```text
docker run -it -d -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node gcr.io/prysmaticlabs/prysm/beacon-chain:latest --datadir=/data --rpc-host=0.0.0.0 --monitoring-host=0.0.0.0
```

The `-d` option will run the node in the background. Likewise, for the validator client

```text
docker run -it -d -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet --network="host" gcr.io/prysmaticlabs/prysm/validator:latest --beacon-rpc-provider=127.0.0.1:4000 --wallet-dir=/wallet
```

You can monitor and view your running containers using `docker ps`.

</TabItem>
<TabItem value="systemd">

Linux systems allow for easy running of services in the background through a daemon process called [systemd](https://www.digitalocean.com/community/tutorials/systemd-essentials-working-with-services-units-and-the-journal). You can follow the tutorial posted by [Digital Ocean](https://www.digitalocean.com/community/tutorials/systemd-essentials-working-with-services-units-and-the-journal) on setting up systemd services.

You can run your beacon node with the following systemd configuration, where you can modify some of the fields and flags to your liking. Assuming your prysm.sh script is at `/home/prysm/prysm.sh`.

```text
[Unit]
Description=Prysm Beacon chain daemon
After=network.target

[Service]
ExecStart=/home/prysm/prysm.sh beacon-chain
Restart=always
User=YOUR_USER

[Install]
WantedBy=multi-user.target
```

You can also run your validator client in systemd using the following configuration.

```text
[Unit]
Description=Prysm Validator daemon
After=network.target
Wants=prysm-beacon.service

[Service]
ExecStart=/home/prysm/prysm.sh validator --wallet-dir DIR/TO/prysm-wallet-v2 --wallet-password-file DIR/TO/YOUR_PASSWORDFILE --graffiti YOUR_GRAFFITI
Restart=always
User=YOUR_USER

[Install]
WantedBy=multi-user.target
```

</TabItem>
</Tabs>
