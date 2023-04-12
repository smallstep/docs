---
layout: auto-doc
category: reference
title: step ca
menu:
  docs:
    parent: step
    children:
      - health
      - init
      - bootstrap
      - token
      - certificate
      - rekey
      - renew
      - revoke
      - provisioner
      - sign
      - root
      - roots
      - federation
      - acme
      - policy
      - admin
---

## Name
**step ca** -- initialize and manage a certificate authority

## Usage

```raw
step ca <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step ca** command group provides facilities to initialize a certificate
authority, retrieve the root of trust, sign and renew certificates, and create
and manage provisioners.

## Examples

Create the configuration for a new certificate authority:
```shell
$ step ca init
```

Configure the ca-url and root in the environment:
```shell
$ step ca bootstrap \
  --ca-url https://ca.smallstep.com \
  --fingerprint 0d7d3834cf187726cf331c40a31aa7ef6b29ba4df601416c9788f6ee01058cf3
$ cat $STEPPATH/config/defaults.json
{
  "ca-url": "https://ca.smallstep.com",
  "fingerprint": "0d7d3834cf187726cf331c40a31aa7ef6b29ba4df601416c9788f6ee01058cf3",
  "root": "/home/user/.step/certs/root_ca.crt"
}
```

Download the root_ca.crt:
```shell
$ step ca root root_ca.crt \
  --ca-url https://ca.smallstep.com \
  --fingerprint 0d7d3834cf187726cf331c40a31aa7ef6b29ba4df601416c9788f6ee01058cf3
```

Get the Health status of the CA:
```shell
$ step ca health --ca-url https://ca.smallstep.com --root /home/user/.step/certs/root_ca.crt
```

Create a new certificate using a token:
```shell
$ TOKEN=$(step ca token internal.example.com)
$ step ca certificate internal.example.com internal.crt internal.key \
  --token $TOKEN --ca-url https://ca.smallstep.com --root root_ca.crt
```

Renew a certificate (certificate must still be valid):
```shell
$ step ca renew internal.crt internal.key \
  --ca-url https://ca.smallstep.com --root root_ca.crt
```

## Commands


| Name | Usage |
|---|---|
| **[health](health/)** | get the status of the CA |
| **[init](init/)** | initialize the CA PKI |
| **[bootstrap](bootstrap/)** | initialize the environment to use the CA commands |
| **[token](token/)** | generate an OTT granting access to the CA |
| **[certificate](certificate/)** | generate a new private key and certificate signed by the root certificate |
| **[rekey](rekey/)** | rekey a certificate |
| **[renew](renew/)** | renew a certificate |
| **[revoke](revoke/)** | revoke a certificate |
| **[provisioner](provisioner/)** | create and manage the certificate authority provisioners |
| **[sign](sign/)** | generate a new certificate signing a certificate request |
| **[root](root/)** | download and validate the root certificate |
| **[roots](roots/)** | download all the root certificates |
| **[federation](federation/)** | download all the federated certificates |
| **[acme](acme/)** | manage ACME settings |
| **[policy](policy/)** | manage certificate issuance policies |
| **[admin](admin/)** | create and manage the certificate authority admins |

