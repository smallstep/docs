---
layout: auto-doc
title: step ssh fingerprint
menu:
  docs:
    parent: step ssh
---

## Name
**step ssh fingerprint** -- print the fingerprint of an SSH public key or certificate

## Usage

```raw
step ssh fingerprint <file>
```

## Description

**step ssh fingerprint** prints the fingerprint of an ssh public key or
certificate.

## Positional arguments

`file`
The path to an SSH public key or certificate.

## Examples

Print the fingerprint for a certificate:
```shell
$ step ssh fingerprint id_ecdsa-cert.pub
```

Print the fingerprint for an SSH public key:
```shell
$ step ssh fingerprint id_ecdsa.pub
```
