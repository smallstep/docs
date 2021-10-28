---
layout: auto-doc
title: step ca root
menu:
  docs:
    parent: step ca
---

## Name
**step ca root** -- download and validate the root certificate

## Usage

```raw
step ca root [<root-file>]
[--ca-url=<uri>] [--fingerprint=<fingerprint>]
```

## Description

**step ca root** downloads and validates the root certificate from the
certificate authority.

## Positional arguments

`root-file`
File to write root certificate (PEM format)

## Options


**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**-f**, **--force**
Force the overwrite of files without asking.

**--fingerprint**=`fingerprint`
The `fingerprint` of the targeted root certificate.

## Examples

Get the root fingerprint in the CA:
```shell
$ step certificate fingerprint /path/to/root_ca.crt
0d7d3834cf187726cf331c40a31aa7ef6b29ba4df601416c9788f6ee01058cf3
```

Download the root certificate from the configured certificate authority:
```shell
$ step ca root root_ca.crt \
  --fingerprint 0d7d3834cf187726cf331c40a31aa7ef6b29ba4df601416c9788f6ee01058cf3
```

Download the root certificate using a given certificate authority:
```shell
$ step ca root root_ca.crt \
  --ca-url https://ca.smallstep.com:9000 \
  --fingerprint 0d7d3834cf187726cf331c40a31aa7ef6b29ba4df601416c9788f6ee01058cf3
```

Print the root certificate using the flags set by `step ca bootstrap`:
```shell
$ step ca root
```

