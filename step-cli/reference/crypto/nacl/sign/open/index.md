---
layout: auto-doc
category: reference
title: step crypto nacl sign open
menu:
  docs:
    parent: step crypto nacl sign
---

## Name
**step crypto nacl sign open** -- verify a signed message produced by sign

## Usage

```raw
step crypto nacl sign open <pub-file>
```

## Description

**step crypto nacl sign open** verifies the signature of a message using the
signer's public key.

This command uses an implementation of NaCl's crypto_sign_open function.

For examples, see **step help crypto nacl sign**.

## Options


**--raw**
Indicates that input is not base64 encoded

