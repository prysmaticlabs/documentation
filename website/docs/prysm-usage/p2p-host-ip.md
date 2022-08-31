---
id: p2p-host-ip
title: Configure ports and firewalls for peer-to-peer connectivity
sidebar_label: Configure ports and firewalls
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="Nishant" lastVerifiedDateString="August 30th, 2022" lastVerifiedVersionString="v3.0.0" />


:::info Knowledge Check

**Not familiar with nodes, networks, and related terminology?** Consider reading [Nodes and networks](../concepts/nodes-networks.md) before proceeding. 

:::

In some cases, small changes to your port and firewall configuration can significantly improve your node's peer-to-peer **connectivity** and **discoverability**. In this how-to, we'll review the following information:

 1. Configure firewall
 2. Configure IP address
 3. Configure port forwarding


## Configure firewall

Your node and validator will try to establish several types of connections:

 0. Validator nodes try to connect to a single, dedicated beacon node. This beacon node must be local.
 1. Beacon nodes try to connect to a single, dedicated execution node. This execution node can be local or remote.
 2. Beacon nodes try to connect to many peer beacon nodes.
 3. Execution nodes try to connect to many peer execution nodes.

To establish these connections, your client software needs to be able to send and receive messages through specific ports. We can use **port rules** to describe how ports should be configured. The following table of port rules uses default port values:

| Port/Protocol   | Firewall rule                       | Reason                                                                                                                                                                                                                                                         |
|-----------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| */UDP           | Allow outbound traffic.             | To [discover](https://github.com/ethereum/devp2p/wiki/Discovery-Overview) peers, Prysm's beacon node dials out through random UDP ports. Allowing outbound UDP connections from any UDP port will help Prysm find peers.                                       |
| 13000/TCP       | Allow outbound traffic.             | After we discover peers, we dial them through this port to establish an ongoing connection for [libp2p](https://libp2p.io/) and through which all gossip/p2p request and responses will flow                                                                   |
| 12000/UDP       | Allow inbound and outbound traffic  | Your beacon node exposes this TCP port so that other Ethereum nodes can discover your node, request chain data, and provide chain data.                                                                                                                        |
| 8551/TCP        | Allow inbound and outbound traffic. | This lets your local beacon node connect to a dedicated remote execution node's [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/specification.md). You can ignore this if your BN and EN are on the same machine.                 |
| 8551/TCP        | Allow inbound and outbound traffic. | This lets your remote execution node connect to a dedicated remote execution node. You can ignore this if your BN and EN are on the same machine.                                                                                                              |
| `30303/TCP+UDP` | Allow inbound and outbound traffic. | `30303/TCP` is your execution node's listener port, while `30303/UDP` is its discovery port. Some clients use `30301` by default.                                                                                                                              |
| 8545/TCP        | Block inbound traffic.              | This is the JSON-RPC port for your execution node's Query API. You (and apps) can use this port to check execution node status, query execution-layer chain data, and even submit transactions. This port generally shouldn't be exposed to the outside world. |
| 3500/TCP        | Block inbound traffic.              | This is the JSON-RPC port for your beacon node's Query API. You (and apps) can use this port to check beacon node status and query consensus-layer chain data. This port generally shouldn't be exposed to the outside world.                                  |
| 4000/TCP        | Block inbound traffic.              | Your validator uses this port to connect to your beacon node via [gRPC](https://grpc.io)                                                                                                                                                                       |


As a security best practice, we recommend blocking all incoming connections across all local ports, exposing inbound connections through specific ports only as needed. Ensure that your firewall is configured to allow incoming connections on TCP/13000 and UDP/12000 from all source IP addresses so that Prysm can connect to peers.

Prysm uses a randomly selected outbound port when forming outbound TCP connections with peers, so you shouldn't restrict Prysm's ability to form outbound connections through any local ports. You may need to add a firewall rule specifically to grant Prysm outbound access via all local TCP/UDP ports.





## Configure router

TCP/13000 and UDP/12000.  The specific steps required vary based on your router, but can be summarised as follows:

> If you're running on a virtual public cloud (VPC) instance, you can skip this step.

1. Determine the IP address for your home router
2. Browse to the management website for your home router (typically http://192.168.1.1)
3. Log in as admin / root
4. Find the section to configure port forwarding
5. Configure a port forwarding rule with the following values:
    - External port: 13000
    - Internal port: 13000
    - Protocol: TCP
    - IP Address: Private IP address of the computer running beacon-chain
5. Configure a second port forwarding rule with the following values:
    - External port: 12000
    - Internal port: 12000
    - Protocol: UDP
    - IP Address: Private IP address of the computer running beacon-chain


## Set the `--p2p-host-ip` or `--p2p-host-dns` flag

The [beacon node](/docs/how-prysm-works/beacon-node) needs to know what your **public** IP address is so that it can inform other peers how to reach your node.  Do this by including either the `--p2p-host-ip=<your public IP>` or, if you have a valid DNS record `--p2p-host-dns="host.domain.com"` flag when you start up the `beacon-chain`.

**For DNS:**
```
prysm.sh beacon-chain --p2p-host-dns=host.domain.com
```

**On GNU\Linux, MacOS, and ARM:**
```
prysm.sh beacon-chain --p2p-host-ip=$(curl -s v4.ident.me)
```
**Windows:**
```
for /f %i in ('curl -s v4.ident.me') do set PRYSM-P2P-HOST-IP=%i
prysm.bat beacon-chain --p2p-host-ip=%PRYSM-P2P-HOST-IP%
```

> **NOTICE:** If you are using this command in a `.bat` script, replace both instances of `%i` with `%%i`.

## Verify your discoverability

Use [MX Toolbox TCP Lookup tool](https://mxtoolbox.com/SuperTool.aspx?action=tcp%3a{node-IP-address}%3a13000&run=toolpage).

Enter the IP Address or DNS Name of the node, followed by `:13000` and click "TCP Lookup".

If the results are as below, then the settings are correct:

![image](https://user-images.githubusercontent.com/2212651/81552111-7c703400-93a0-11ea-83b5-abeebc63c285.png)



## Determine your IP Address


To determine your **private IP address**, run the following command:

**Windows:**
```
ipconfig | findstr /i "IPv4 Address"
```
**macOS/linux:**
```
ifconfig | grep "inet " | grep -v 127.0.0.1
```


To determine your **public IP address**, visit (http://v4.ident.me/) or run this command:

```
curl v4.ident.me
```

To determine your **home router IP address**, run the following command:

> **NOTICE:** You may have more then one gateway IP address

**GNU/Linux:**
```
ip route | grep default
```
**Windows:**
```
ipconfig | findstr /i "Gateway"
```
**macOS:**
```
netstat -nr | grep default
```


## FAQ





import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />