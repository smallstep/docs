---
layout: auto-doc
category: reference
title: step ssh
menu:
  docs:
    parent: step
    children:
      - certificate
      - check-host
      - config
      - fingerprint
      - hosts
      - inspect
      - list
      - login
      - logout
      - needs-renewal
      - proxycommand
      - rekey
      - renew
      - revoke
---

## Name
**step ssh** -- create and manage ssh certificates

## Usage

```raw
step ssh <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step ssh** command group provides facilities to sign SSH certificates.

## Examples

Generate a new SSH key pair and user certificate:
```shell
$ step ssh certificate joe@work id_ecdsa
```

Generate a new SSH key pair and host certificate:
```shell
$ step ssh certificate --host internal.example.com ssh_host_ecdsa_key
```

Add a new user certificate to the agent:
```shell
$ step ssh login joe@example.com
```

Remove a certificate from the agent:
```shell
$ step ssh logout joe@example.com
```

List all keys in the agent:
```shell
$ step ssh list
```

Configure a user environment with the SSH templates:
```shell
$ step ssh config
```

Inspect an ssh certificate file:
```shell
$ step ssh inspect id_ecdsa-cert.pub
```

Inspect an ssh certificate in the agent:
```shell
$ step ssh list --raw joe@example.com | step ssh inspect
```

List all the hosts you have access to:
```shell
$ step ssh hosts
```

Login into one host:
```shell
$ ssh internal.example.com
```

## Commands


| Name | Usage |
|---|---|
| **[certificate](certificate/)** | sign a SSH certificate using the the SSH CA |
| **[check-host](check-host/)** | checks if a certificate has been issued for a host |
| **[config](config/)** | configures ssh to be used with certificates |
| **[fingerprint](fingerprint/)** | print the fingerprint of an SSH public key or certificate |
| **[hosts](hosts/)** | returns a list of all valid hosts |
| **[inspect](inspect/)** | print the contents of an ssh certificate |
| **[list](list/)** | list public keys known to the ssh agent |
| **[login](login/)** | adds a SSH certificate into the authentication agent |
| **[logout](logout/)** | removes a private key from the ssh-agent |
| **[needs-renewal](needs-renewal/)** | Check if an SSH certificate needs to be renewed |
| **[proxycommand](proxycommand/)** | proxy ssh connections according to the host registry |
| **[rekey](rekey/)** | rekey a SSH certificate using the SSH CA |
| **[renew](renew/)** | renew a SSH certificate using the SSH CA |
| **[revoke](revoke/)** | revoke a SSH certificate using the SSH CA |

