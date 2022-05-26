---
layout: auto-doc
title: step beta ca admin
menu:
  docs:
    parent: step beta ca
    children:
      - list
      - add
      - remove
      - update
---

## Name
**step beta ca admin** -- create and manage the certificate authority admins

## Usage

```raw
step beta ca admin <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step ca admin** command group provides facilities for managing the
certificate authority admins.

WARNING: The 'beta' prefix is deprecated and will be removed in a future release.
Please use 'step ca admin ...' going forwards.

An admin is an entity that manages administrative resources (like authority
configuration, provisioner configuration, and other admins) within a certificate
authority.

## Examples

List the active admins:
```shell
$ step beta ca admin list
```

Add an admin:
```shell
$ step beta ca admin add max@smallstep.com my-jwk-provisioner --super
```

Update an admin:
```shell
$ step beta ca admin update max@smallstep.com --super=false
```

Remove an admin:
```shell
$ step beta ca admin remove max@smallstep.com
```

## Commands


| Name | Usage |
|---|---|
| **[list](list/)** | list all admins in the CA configuration |
| **[add](add/)** | add an admin to the CA configuration |
| **[remove](remove/)** | remove an admin from the CA configuration |
| **[update](update/)** | update an admin |

