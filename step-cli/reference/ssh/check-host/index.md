---
layout: auto-doc
category: reference
title: step ssh check-host
menu:
  docs:
    parent: step ssh
---

## Name
**step ssh check-host** -- checks if a certificate has been issued for a host

## Usage

```raw
step ssh check-host <hostname> [--verbose,-v]
[--offline] [--ca-config=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>]
```

## Description

**step ssh check-host** checks if a certificate has been issued for a host.

This command returns a zero exit status if the host has a certificate.
Otherwise, it returns 1.

## Positional arguments

`hostname`
The hostname of the server to check.

## Options


**--verbose**, **-v**
Return "true" or "false" in the terminal.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$(step path)/config/ca.json

**--offline**
Creates a certificate without contacting the certificate authority. Offline mode
uses the configuration, certificates, and keys created with **step ca init**,
but can accept a different configuration file using **--ca-config** flag.

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--context**=`name`
The context `name` to apply for the given command.

## Examples

Check that internal.example.com exists:
```shell
$ step ssh check-host internal.smallstep.com
```

