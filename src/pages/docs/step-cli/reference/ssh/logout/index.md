---
layout: auto-doc
title: step ssh logout
menu:
  docs:
    parent: step ssh
---

## Name
**step ssh logout** -- removes a private key from the ssh-agent

## Usage

```raw
step ssh logout <identity>
    [--all] [--ca-url=<uri>] [--root=<file>]
    [--offline] [--ca-config=<file>]
```

## Description

**step ssh logout** commands removes a key from the ssh-agent.

By default it only removes certificate keys signed by step-certificates, but the
flag **--all** can be used to remove all keys with a given subject or all keys.

## Positional arguments

`identity`
The certificate identity or comment in the key.

## Options


**--all**
Removes all the keys stored in the SSH agent.

**--identity**=`value`
The certificate identity. It is usually passed as a positional argument, but a
flag exists so it can be configured in $STEPPATH/config/defaults.json.

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--offline**
Creates a certificate without contacting the certificate authority. Offline mode
uses the configuration, certificates, and keys created with **step ca init**,
but can accept a different configuration file using **--ca-config** flag.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$STEPPATH/config/ca.json

## Examples

Remove the certificate mariano@work from the SSH agent:
```shell
$ step ssh logout mariano@work
```

Remove the all the keys and certificates for mariano@work from the SSH agent:
```shell
$ step ssh logout --all mariano@work
```

Remove the key mariano@work from the agent listening in /tmp/ssh/agent:
```shell
$ SSH_AUTH_SOCK=/tmp/ssh/agent step ssh logout mariano@work
```

Remove all the keys stored in the SSH agent:
```shell
$ step ssh logout --all
```

