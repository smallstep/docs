---
layout: auto-doc
title: step ca roots
menu:
  docs:
    parent: step ca
---

## Name
**step ca roots** -- download all the root certificates

## Usage

```raw
step ca roots [<roots-file>]
[--ca-url=<uri>] [--root=<file>]
```

## Description

**step ca roots** downloads a certificate bundle with all the root
certificates.

## Positional arguments

`roots-file`
File to write all the root certificates (PEM format)

## Options


**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**-f**, **--force**
Force the overwrite of files without asking.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

## Examples

Download the roots with flags set by `step ca bootstrap`:
```shell
$ step ca roots roots.pem
```

Download the roots with custom flags:
```shell
$ step ca roots roots.pem \
    --ca-url https://ca.example.com \
    --root /path/to/root_ca.crt
```

Print the roots using flags set by `step ca bootstrap`:
```shell
$ step ca roots
```

