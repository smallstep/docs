---
layout: auto-doc
category: reference
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
[--ca-url=<uri>] [--root=<file>] [--context=<name>]
```

## Description

**step ca provisioner list** lists the provisioners configured
in the CA.

## Options


**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--context**=`name`
The context `name` to apply for the given command.

## Examples

Prints a JSON list with active provisioners:
```shell
$ step ca provisioner list
```

