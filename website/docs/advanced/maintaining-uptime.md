---
id: maintain-uptime
title: Maintain validator uptime with systemd or Docker
sidebar_label: Maintain Validator Uptime
---

## Maintain validator uptime using systemd or Docker

Validators are expected to maintain connectivity with the Ethereum network 24/7. If you're running your validator on a cloud server, or if you want your validator to automatically start running when the host machine restarts, consider running your client software as a background service. Docker and systemd let you run Prysm as a background service. 

This may be overkill for at-home stakers who use the `prysm.sh` script to run Prysm. To those users, we recommend keeping an eye on your validator. The penalties for occasional downtime are generally negligible. Learn more by reading our [Security Best Practices](../security-best-practices.md).

<Tabs
  groupId="service"
  defaultValue="docker"
  values={[
    {label: 'Docker', value: 'docker'},
    {label: 'Systemd', value: 'systemd'},
  ]
}>
<TabItem value="docker">

You can use Docker to run your beacon node and validators as background services.

```text
docker run -it -d -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node gcr.io/prysmaticlabs/prysm/beacon-chain:latest --datadir=/data --rpc-host=0.0.0.0 --monitoring-host=0.0.0.0
```

The `-d` option will run the node in the background. Likewise, for the validator client:

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
