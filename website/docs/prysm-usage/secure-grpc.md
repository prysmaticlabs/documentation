---
id: secure-grpc
title: Securing your gRPC connections
sidebar_label: Securing your gRPC connection
---

This section will help advanced users create and setup TLS certificates to allow for secure gRPC connections to their beacon nodes.

:::tip Pro-Tip
You should be concerned with securing your gRPC connection if you're hosting a remote beacon node that you plan connecting to via the Internet. No need to add a secure gRPC connection if you are running a beacon node and a validator on a single machine.
:::

A beacon node, by default, hosts a gRPC server on host 127.0.0.1 and port 4000, allowing any other process, such as a validator client, to establish an insecure connection on that port. The beacon node can also allow for secure, TLS connections if ran with a `--tls-crt` flag, ensuring all connections via gRPC are secured. 

A validator client will attempt to connect to a beacon node by default with an insecure connection, but can be a secure TLS connection by using a `--tls` flag. Let's see a practical example:

## Free TLS certificates with Let's Encrypt (Recommended)

## Generating self-signed TLS certificates (Not recommended)

Self-signed certificates are not recommended for production deployments, but can help you verify that a secure connection is working. First, make sure you install [openssl](https://www.openssl.org/) for your operating system. Next up:

**Create a root signing key**

```text
openssl genrsa -out ca.key 4096
```

**Create a self-signed root certificate**

```text
openssl req -new -x509 -key ca.key -sha256 -subj "/C=US/ST=NJ/O=CA, Inc." -days 365 -out ca.cert
```

**Create a key certificate for the beacon node**

```text
openssl genrsa -out beacon.key 4096
```

**Create a signing CSR**

```text
openssl req -new -key beacon.key -out beacon.csr -config certificate.conf
```

**Generate a certificate for the beacon node**

```text
openssl x509 -req -in beacon.csr -CA ca.cert -CAkey ca.key -CAcreateserial -out beacon.pem -days 365 -sha256 -extfile certificate.conf -extensions req_ext
```

**Verify your certificate is correct with openssl**

```text
openssl x509 -in beacon.pem -text -noout
```

You'll see some output like this below:

```text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number: 12510557889986420634 (0xad9e6e1dfe99df9a)
    Signature Algorithm: sha256WithRSAEncryption
        Issuer: C=US, ST=NJ, O=CA, Inc.
        Validity
            Not Before: Jun 15 21:12:24 2020 GMT
            Not After : Jun 15 21:12:24 2021 GMT
        Subject: C=US, ST=NJ, O=Test, Inc., CN=localhost
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (4096 bit)
```

