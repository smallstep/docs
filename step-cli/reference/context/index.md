---
layout: auto-doc
category: reference
title: step context
menu:
  docs:
    parent: step
    children:
      - current
      - list
      - remove
      - select
---

## Name
**step context** -- manage certificate authority contexts

## Usage

```raw
step context [global-flags] <subcommand> [arguments] [subcommand-flags]
```

## Description

**step context** command group provides facilities to manage certificate
authority contexts.

## Examples

```shell
$ cat $(step path --base)/contexts.json
{
    "alpha-one": {
        "authority": "alpha-one.ca.smallstep.com",
        "profile": "alpha-one"
    },
    "alpha-two": {
        "authority": "alpha-two.ca.smallstep.com",
        "profile": "alpha-two"
    },
    "beta": {
        "authority": "beta.ca.smallstep.com",
        "profile": "beta"
    }
}
```

Select the default certificate authority context:
```shell
$ step context select alpha-one
```

List the available certificate authority contexts:
```shell
$ step context list
▶ alpha-one
alpha-two
beta
```

## Commands


| Name | Usage |
|---|---|
| **[current](current/)** | current returns the name of the current context |
| **[list](list/)** | list available certificate authority contexts |
| **[remove](remove/)** | remove a context and all associated configuration |
| **[select](select/)** | select the default certificate authority context |

