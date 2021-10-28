---
layout: auto-doc
title: step ssh list
menu:
  docs:
    parent: step ssh
---

## Name
**step ssh list** -- list public keys known to the ssh agent

## Usage

```raw
step ssh list [<subject>] [--raw]
```

## Description

**step ssh list** list public key identities known to the ssh agent.

By default it prints key fingerprints, to list the raw key use the flag **--raw**.

## Positional arguments

`subject`
Optional subject or comment to filter keys by.

## Options


**--raw**
List public keys instead of fingerprints.

## Examples

List all key fingerprints known to the agent:
```shell
$ step ssh list
```

List all the key fingerprints with the comment joe@work:
```shell
$ step ssh list joe@work
```

List all keys known to the agent:
```shell
$ step ssh list --raw
```

List all the keys with the comment joe@work:
```shell
$ step ssh list --raw joe@work
```

