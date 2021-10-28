---
layout: auto-doc
title: step crypto jwk thumbprint
menu:
  docs:
    parent: step crypto jwk
---

## Name
**step crypto jwk thumbprint** -- compute thumbprint for a JWK

## Usage

```raw
step crypto jwk thumbprint
```

## Description

**step crypto jwk thumbprint** reads a JWK from STDINT, derives the
corresponding JWK Thumbprint (RFC7638), and prints the base64-urlencoded
thumbprint to STDOUT.

For examples, see **step help crypto jwk**.
