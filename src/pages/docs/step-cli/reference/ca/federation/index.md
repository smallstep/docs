---
layout: auto-doc
title: step ca federation
menu:
  docs:
    parent: step ca
---

## Name
**step ca federation** -- download all the federated certificates

## Usage

```raw
step ca federation [<federation-file>]
[--ca-url=<uri>] [--root=<file>]
```

## Description

**step ca federation** downloads a certificate bundle with all the root
certificates in the federation.

## Positional arguments

`federation-file`
File to write federation certificates (PEM format)

## Options


**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**-f**, **--force**
Force the overwrite of files without asking.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

## Examples

Download the federated roots with flags set by `step ca bootstrap`:
```shell
$ step ca federation federation.pem
```

Download the federated roots with custom flags:
```shell
$ step ca federation federation.pem \
    --ca-url https://ca.example.com \
    --root /path/to/root_ca.crt
```

Print the federated roots using flags set by `step ca bootstrap`:
```shell
$ step ca federation
```

