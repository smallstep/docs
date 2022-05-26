---
layout: auto-doc
title: step ca admin
menu:
  docs:
    parent: step ca
    children:
      - list
      - add
      - remove
      - update
---

## Name
**step ca admin** -- create and manage the certificate authority admins

## Usage

```raw
step ca admin <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step ca admin** command group provides facilities for managing the
certificate authority admins.

An admin is an entity that manages administrative resources (like authority
configuration, provisioner configuration, and other admins) within a certificate
authority.

## Examples

List the active admins:
```shell
$ step ca admin list
```

Add an admin:
```shell
$ step ca admin add max@smallstep.com my-jwk-provisioner --super
```

Update an admin:
```shell
$ step ca admin update max@smallstep.com --super=false
```

Remove an admin:
```shell
$ step ca admin remove max@smallstep.com
```

## Commands


| Name | Usage |
|---|---|
| **[list](list/)** | list all admins in the CA configuration |
| **[add](add/)** | add an admin to the CA configuration |
| **[remove](remove/)** | remove an admin from the CA configuration |
| **[update](update/)** | update an admin |

