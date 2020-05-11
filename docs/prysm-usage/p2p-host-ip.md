---
id: p2p-host-ip
title: Improve Peer-to-Peer Connectivity
sidebar_label: Improve P2P connectivity
---

The ETH2 [architecture](/docs/how-prysm-works/architecture-overview/) is designed to be a fully peer to peer (P2P) network.  This section describes how to configure the Prysm [beacon node](/docs/how-prysm-works/beacon-node) and your network to optimise the number of peers that you communicate with on the ETH2 Network.  Increasing peers helps improve the health, performance and stablity of nodes and the overall network.

> **NOTICE:** This section contains advanced network configurations and is optional.

ETH2 leverages [libp2p](/docs/how-prysm-works/p2p-networking), a framework and suite of protocols for building peer-to-peer network applications.  When a [beacon node](/docs/how-prysm-works/beacon-node) first starts up, it does two things to start communicating with other participants:
- Begins listening for new incoming P2P connections
- Starts a [discovery](https://github.com/ethereum/devp2p/wiki/Discovery-Overview) process to find and connect to new peers

![P2P Network Diagram](/img/prysm-p2p-host-ip.png)

## Home networks & routers

Many participants on the ETH2 network operate their nodes on a home network. Home networks typically have a router that provides a logical boundary between your private home network, and the public internet.  While this is good for keeping bad traffic out of your network, it presents a challenge for communicating with other nodes who are also on home networks.

## Virtual public cloud (VPC) networks

Other participants on the ETH2 network operate their nodes on a virtual public cloud (VPC) instance.  This is basically a computer running in a datacenter that quite often is directly connected to the public internet.

## Incoming P2P connection prerequisites

In order for other participants on the ETH2 network to establish incoming P2P connections with your [beacon node](/docs/how-prysm-works/beacon-node), a number of conditions must be met:
1. Your public IP address must be known.
2. The protocol (TCP/UDP) and port number (0-65535) on which your [beacon node](/docs/how-prysm-works/beacon-node) is listening must be known (Default - TCP/13000 and UDP/12000).
3. All routers & firewalls must be configured to allow incoming traffic on that protocol/port combination.

## Private IP addresses

Computers on a home network will typically have a private IP address.  Attempting to establish a P2P connection to another participant on the ETH2 network using that participant's **private** IP address is not possible, you must use the **public** IP address.  Private IPv4 addresses will always fall into one of the following ranges, as per [RFC1918](https://en.wikipedia.org/wiki/Private_network):
 - 192.168.0.0 – 192.168.255.255
 - 172.16.0.0 – 172.31.255.255
 - 10.0.0.0 – 10.255.255.255

> **NOTICE:** You may have more than one private IP address

To determine your **private** IP address, or run the appropriate command for your OS:

**GNU/Linux:**
```
ip addr show | grep "inet " | grep -v 127.0.0.1
```
**Windows:**
```
ipconfig | findstr /i "IPv4 Address"
```
**macOS:**
```
ifconfig | grep "inet " | grep -v 127.0.0.1
```

## Public IP addresses

Public IP addresses include all other IP addresses not in the private ranges mentioned above, with some exceptions for [Special-Use IPv4 Addresses](https://tools.ietf.org/html/rfc3330).

To determine your **public**  IP  address, visit (http://v4.ident.me/) or run this command:
```
curl v4.ident.me
```

## Port forwarding
Participants on home networks will need to configure their router to perform port forwarding so that other ETH2 participants can establish a connection to your [beacon node](/docs/how-prysm-works/beacon-node) on TCP/13000 and UDP/12000.  The specific steps required vary based on your router, but can be summarised as follows:

> **NOTICE:** Participants with nodes on a virtual public cloud (VPC) instance can skip this step.

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

There are many websites available with more detailed instructions on how to perform the steps above on your specific router. A quick search should help get you started.  Feel free to ask for help in our [Discord](https://discord.gg/YMVYzv6).

To determine the IP address for your home router, run the appropriate command for your OS:

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

## Firewalls

Many computers have a local firewall that blocks incoming connections. Ensure that you have configured the firewall to allow incoming connections on TCP/13000 and UDP/12000 from all source IP addresses.

## Setting the `--p2p-host-ip` flag

The [beacon node](/docs/how-prysm-works/beacon-node) needs to know what your **public** IP address is so that it can inform other peers how to reach your node.  Do this by including the `--p2p-host-ip=<your public IP>` flag when you start up the `beacon-chain`.

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

## Verifying `--p2p-host-ip` settings

To verify the `--p2p-host-ip` settings are operating correctly, use [MX Toolbox TCP Lookup tool](https://mxtoolbox.com/SuperTool.aspx?action=tcp%3a{node-IP-address}%3a13000&run=toolpage).

Enter the IP Address of the node, followed by `:13000` and click "TCP Lookup".

If the results are as below, then the settings are correct:

![image](https://user-images.githubusercontent.com/2212651/81552111-7c703400-93a0-11ea-83b5-abeebc63c285.png)

