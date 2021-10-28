---
layout: auto-doc
title: step crypto jwk keyset
menu:
  docs:
    parent: step crypto jwk
    children:
      - add
      - remove
      - list
      - find
---

## Name
**step crypto jwk keyset** -- add, remove, and find JWKs in JWK Sets

## Usage

```raw
step crypto jwk keyset <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step crypto jwk set** command group provides facilities for managing and
inspecting JWK Sets. A is a JSON object that represents a set of JWKs. They
are defined in RFC7517.

A JWK Set is simply a JSON object with a "keys" member whose value is an array
of JWKs. Additional members are allowed in the object. They will be preserved
by this tool, but otherwise ignored. Duplicate member names are not allowed.

For examples, see **step help crypto jwk**.

## Commands


| Name | Usage |
|---|---|
| **[add](add/)** | a JWK to a JWK Set |
| **[remove](remove/)** | a JWK from a JWK Set |
| **[list](list/)** | key IDs of JWKs in a JWK Set |
| **[find](find/)** | a JWK in a JWK Set |

