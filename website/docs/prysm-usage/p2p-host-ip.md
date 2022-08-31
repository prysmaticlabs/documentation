---
id: p2p-host-ip
title: Configure ports and firewalls for improved peer-to-peer connectivity
sidebar_label: Configure ports and firewalls
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="Nishant,Raul,Mick" lastVerifiedDateString="August 30th, 2022" lastVerifiedVersionString="v3.0.0" />


:::info Knowledge Check

**Not familiar with nodes, networks, and related terminology?** Consider reading [Nodes and networks](../concepts/nodes-networks.md) before proceeding. 

:::

In some cases, small changes to your port and firewall configuration can significantly improve your node's **peer-to-peer connectivity**. Improved peer-to-peer connectivity benefits the broader Ethereum ecosystem by making blockchain data more available. It can also help your validator find more work and earn more ETH.

## Configure your firewall

Your node and validator will try to establish several types of connections:

 1. Validator nodes try to connect to a single, dedicated beacon node. This beacon node must be local.
 2. Beacon nodes try to connect to a single, dedicated execution node. This execution node can be local or remote.
 3. Beacon nodes try to connect to many peer beacon nodes.
 4. Execution nodes try to connect to many peer execution nodes.

To establish these connections, your client software needs to be able to send and receive messages through specific ports. As a security best practice, we recommend blocking inbound traffic across all local ports, allowing inbound traffic on a port-by-port basis. The following firewall rules should be configured on any local operating system, software, or hardware firewalls between you and your internet connection:


| Port/Protocol   | Firewall rule                       | Reason                                                                                                                                                                                                                                                         |
|-----------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `8545/TCP`      | Block inbound traffic.              | This is the JSON-RPC port for your execution node's Query API. You (and apps) can use this port to check execution node status, query execution-layer chain data, and even submit transactions. This port generally shouldn't be exposed to the outside world. |
| `3500/TCP`      | Block inbound traffic.              | This is the JSON-RPC port for your beacon node's Query API. You (and apps) can use this port to check beacon node status and query consensus-layer chain data. This port generally shouldn't be exposed to the outside world.                                  |
| `4000/TCP`      | Block inbound traffic.              | Your validator uses this port to connect to your beacon node via [gRPC](https://grpc.io).                                                                                                                                                                      |
| `*/UDP+TCP`     | Allow outbound traffic.             | To [discover](https://github.com/ethereum/devp2p/wiki/Discovery-Overview) peers, Prysm's beacon node dials out through random UDP ports. Allowing outbound UDP connections from any UDP port will help Prysm find peers.                                       |
| `13000/TCP`     | Allow outbound traffic.             | After we discover peers, we dial them through this port to establish an ongoing connection for [libp2p](https://libp2p.io/) and through which all gossip/p2p request and responses will flow.                                                                  |
| `12000/UDP`     | Allow inbound and outbound traffic  | Your beacon node exposes this TCP port so that other Ethereum nodes can discover your node, request chain data, and provide chain data.                                                                                                                        |
| `8551/TCP`      | Allow inbound and outbound traffic. | This lets your local beacon node connect to a dedicated remote execution node's [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/specification.md). You can ignore this if your BN and EN are on the same machine.                 |
| `8551/TCP`      | Allow inbound and outbound traffic. | This lets your remote execution node connect to a dedicated remote execution node. You can ignore this if your BN and EN are on the same machine.                                                                                                              |
| `30303/TCP+UDP` | Allow inbound and outbound traffic. | `30303/TCP` is your execution node's listener port, while `30303/UDP` is its discovery port. Some clients use `30301` by default.                                                                                                                              |

Note that clients allow you to customize many of these ports. The above table of port rules uses default port values.



## Configure your router

> If you're running on a virtual public cloud (VPC) instance, you can skip this step.

To ensure that other nodes can connect with your node, you may need to forward ports `13000/TCP` and `12000/UDP` using your router's admin interface.  The specific steps required vary based on your router, but can be summarised as follows:

1. Determine your router's IP address
2. Log in to your router's browser-based admin interface (usually something like http://192.168.1.1)
3. Look for `Port Forwarding`.
4. Configure a port forwarding rule with the following values:
    - External port: `13000`
    - Internal port: `13000`
    - Protocol: `TCP`
    - IP Address: The private IP address of the computer running your beacon node
5. Configure a second port forwarding rule with the following values:
    - External port: `12000`
    - Internal port: `12000`
    - Protocol: `UDP`
    - IP Address: The private IP address of the computer running your beacon node


### Determine your private IP address

Run the following command:


**Windows:**
```
ipconfig | findstr /i "IPv4 Address"
```
**macOS/linux:**
```
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### Determine your public IP address

Visit (http://v4.ident.me/) or run this command:

```
curl v4.ident.me
```

### Determine your router's IP address

Run the following command:

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

## Broadcast your public IP address

Your beacon node will broadcast your **public IP address** to other peers if you configure either the following flags:

 - `--p2p-host-ip=<your public IP>`: If you haven't configured a DNS record for your public IP. For example: `--p2p-host-ip=67.127.151.89`
 - `--p2p-host-dns="host.domain.com"`: For example: `--p2p-host-dns=host.domain.com`


## Verify your discoverability

Use the [MX Toolbox TCP Lookup tool](https://mxtoolbox.com/SuperTool.aspx?): `https://mxtoolbox.com/SuperTool.aspx?action=tcp%3a{Your-Public-IP-Address}%3a13000&run=toolpage`

Note the above placeholder for `Your-Public-IP-Address`, and the specification of `13000/TCP`.

If the results are as below, then your beacon node is discoverable:

![image](https://user-images.githubusercontent.com/2212651/81552111-7c703400-93a0-11ea-83b5-abeebc63c285.png)

You can perform the same test using `30303/TCP` to test your execution node's discoverability. See [Check your node and validator status](../monitoring/checking-status.md) for a comprehensive status checklist.


import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />