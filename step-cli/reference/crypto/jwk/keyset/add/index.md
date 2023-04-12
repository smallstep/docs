---
layout: auto-doc
category: reference
title: step crypto jwk keyset add
menu:
  docs:
    parent: step crypto jwk keyset
---

## Name
**step crypto jwk keyset add** -- a JWK to a JWK Set

## Usage

```raw
step crypto jwk keyset add <jwks-file>
```

## Description

**step crypto jwk keyset add** reads a JWK from STDIN and adds it to the JWK
Set in `jwks-file`. Modifications to `jwks-file` are in-place. The file is
'flock'd while it's being read and modified.

## Positional arguments

`jwks-file`
File containing a JWK Set
