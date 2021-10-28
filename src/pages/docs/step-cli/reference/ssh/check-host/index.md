---
layout: auto-doc
title: step ssh check-host
menu:
  docs:
    parent: step ssh
---

## Name
**step ssh check-host** -- checks if a certificate has been issued for a host

## Usage

```raw
step ssh check-host <hostname>
[--ca-url=<uri>] [--root=<file>]
[--offline] [--ca-config=<file>] [--verbose,-v]
```

## Description

**step ssh check-host** checks if a certificate has been issued for a host.

This command returns a zero exit status if the host has a certificate.
Otherwise, it returns 1.

## Positional arguments

`hostname`
The hostname of the server to check.

## Options


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

**--verbose**, **-v**
Return "true" or "false" in the terminal.

## Examples

Check that internal.example.com exists:
```shell
$ step ssh check-host internal.smallstep.com
```

