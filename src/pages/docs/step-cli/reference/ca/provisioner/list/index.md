---
layout: auto-doc
title: step ca provisioner list
menu:
  docs:
    parent: step ca provisioner
---

## Name
**step ca provisioner list** -- list provisioners configured in the CA

## Usage

```raw
step ca provisioner list 
[--ca-url=<uri>] [--root=<file>]
```

## Description

**step ca provisioner list** lists the provisioners configured
in the CA.

## Options


**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

## Examples

Prints a JSON list with active provisioners:
```shell
$ step ca provisioner list
```

