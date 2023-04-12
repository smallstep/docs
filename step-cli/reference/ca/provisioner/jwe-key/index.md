---
layout: auto-doc
category: reference
title: step ca provisioner jwe-key
menu:
  docs:
    parent: step ca provisioner
---

## Name
**step ca provisioner jwe-key** -- retrieve and print a provisioning key in the CA

## Usage

```raw
step ca provisioner jwe-key <kid>
[--ca-url=<uri>] [--root=<file>] [--context=<name>]
```

## Description

**step ca provisioner jwe-key** returns the encrypted
private jwk for the given key-id.

## Options


**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--context**=`name`
The context `name` to apply for the given command.

## Examples

Retrieve the encrypted private jwk for the given key-id:
```shell
$ step ca provisioner jwe-key 1234 --ca-url https://127.0.0.1 --root ./root.crt
```


