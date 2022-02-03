---
layout: auto-doc
title: step beta ca acme eab
menu:
  docs:
    parent: step beta ca acme
    children:
      - list
      - add
      - remove
---

## Name
**step beta ca acme eab** -- create and manage ACME External Account Binding Keys

## Usage

```raw
step beta ca acme eab <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step beta ca acme eab** command group provides facilities for managing ACME 
    External Account Binding Keys.

## Examples

List the active ACME External Account Binding Keys:
```shell
$ step beta ca acme eab list <provisioner>
```

Add an ACME External Account Binding Key:
```shell
$ step beta ca acme eab add provisioner_name some_name_or_reference
```

Remove an ACME External Account Binding Key:
```shell
$ step beta ca acme eab remove key_id
```


## Commands


| Name | Usage |
|---|---|
| **[list](list/)** | list all ACME External Account Binding Keys |
| **[add](add/)** | add ACME External Account Binding Key |
| **[remove](remove/)** | remove an ACME EAB Key from the CA |

