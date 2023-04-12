---
layout: auto-doc
category: reference
title: step context remove
menu:
  docs:
    parent: step context
---

## Name
**step context remove** -- remove a context and all associated configuration

## Usage

```raw
step context remove <name> [--force]
```

## Description

**step context remove** command removes a context, along
with all associated configuration, from disk.

## Positional arguments

`name`
The name of the context to remove .

## Options


**-f**, **--force**
Force the overwrite of files without asking.

## Examples

Remove a context:
```shell
$ step context remove alpha-one
```

