---
layout: auto-doc
title: step ssh hosts
menu:
  docs:
    parent: step ssh
---

## Name
**step ssh hosts** -- returns a list of all valid hosts

## Usage

```raw
step ssh hosts [--set=<key=value>] [--set-file=<file>]
[--offline] [--ca-config=<file>] [--ca-url=<uri>] [--root=<file>]
[--context=<name>]
```

## Description

**step ssh hosts** returns a list of valid hosts for SSH.

This command returns a zero exit status then the server exists, it will return 1
otherwise.

## Options


**--set**=`key=value`
The `key=value` pair with template data variables to send to the CA. Use the **--set** flag multiple times to add multiple variables.

**--set-file**=`file`
The JSON `file` with the template data to send to the CA.

**--offline**
Creates a certificate without contacting the certificate authority. Offline mode
uses the configuration, certificates, and keys created with **step ca init**,
but can accept a different configuration file using **--ca-config** flag.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$(step path)/config/ca.json

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--context**=`name`
The context `name` to apply for the given command.

## Examples

Get a list of valid hosts for SSH:
```shell
$ step ssh hosts
```

