---
layout: auto-doc
title: step crypto jwk keyset remove
menu:
  docs:
    parent: step crypto jwk keyset
---

## Name
**step crypto jwk keyset remove** -- a JWK from a JWK Set

## Usage

```raw
step crypto jwk keyset remove <jwks-file> [--kid=<kid>]
```

## Description

**step crypto jwk keyset remove** removes the JWK with a key ID matching `kid`
from the JWK Set stored in `jwks-file`. Modifications to `jwks-file` are
in-place. The file is 'flock'd while it's being read and modified.

## Positional arguments

`jwks-file`
File containing a JWK Set

## Options


**--kid**=`kid`
The key ID of the JWK to remove from the JWK Set. `kid` is a case-sensitive
string.

