---
layout: auto-doc
category: reference
title: step context current
menu:
  docs:
    parent: step context
---

## Name
**step context current** -- current returns the name of the current context

## Usage

```raw
step context current [--json]
```

## Description

**step context current** returns the name of the current context.

## Options


**--json**
Return stringified JSON containing the main attributes of a context.

## Examples

List all certificate authority contexts:
```shell
$ step context current
test-ca
```

```shell
$ step context current --json
{"name":"test-ca","authority":"internal.ca.smallstep.com","profile":"test-ca"}
```

