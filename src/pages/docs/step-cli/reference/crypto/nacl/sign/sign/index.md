---
layout: auto-doc
title: step crypto nacl sign sign
menu:
  docs:
    parent: step crypto nacl sign
---

## Name
**step crypto nacl sign sign** -- sign a message using Ed25519

## Usage

```raw
step crypto nacl sign sign <priv-file>
```

## Description

**step crypto nacl sign sign** signs a message m using the signer's private
key.

This command uses an implementation of NaCl's crypto_sign function.

For examples, see **step help crypto nacl sign**.

## Options


**--raw**
Do not base64 encode output

