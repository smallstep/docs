---
layout: auto-doc
category: reference
title: step crypto jwk keyset find
menu:
  docs:
    parent: step crypto jwk keyset
---

## Name
**step crypto jwk keyset find** -- a JWK in a JWK Set

## Usage

```raw
step crypto jwk keyset find <jwks-file> [--kid=<kid>]
```

## Description

**step crypto jwk keyset find** command locates the JWK with a key ID matching
`kid` from the JWK Set stored in `jwks-file`. The matching JWK is printed to
STDOUT.

## Positional arguments

`jwks-file`
File containing a JWK Set

## Options


**--kid**=`kid`
The key ID of the JWK to locate from the JWK Set. `kid` is a case-sensitive
string.

