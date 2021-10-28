---
layout: auto-doc
title: step crypto nacl secretbox seal
menu:
  docs:
    parent: step crypto nacl secretbox
---

## Name
**step crypto nacl secretbox seal** -- produce an encrypted ciphertext

## Usage

```raw
step crypto nacl secretbox seal <nonce> <key-file>
[--raw]
```

## Description

**step crypto nacl secretbox seal** encrypts and authenticates a message using
a secret key and a nonce.

This command uses an implementation of NaCl's crypto_secretbox function.

For examples, see **step help crypto nacl secretbox**.

## Positional arguments

`nonce`
Must be unique for each distinct message for a given key.

To use a binary nonce use the prefix 'base64:' and the standard base64
encoding. e.g. base64:081D3pFPBkwx1bURR9HQjiYbAUxigo0Z

`key-file`
The path to the shared key.

## Options


**--raw**
Do not base64 encode output

