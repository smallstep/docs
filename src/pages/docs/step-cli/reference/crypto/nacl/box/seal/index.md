---
layout: auto-doc
title: step crypto nacl box seal
menu:
  docs:
    parent: step crypto nacl box
---

## Name
**step crypto nacl box seal** -- produce an authenticated and encrypted ciphertext

## Usage

```raw
step crypto nacl box seal <nonce> <recipient-pub-key> <priv-key>
[--raw]
```

## Description

Reads plaintext from STDIN and writes an encrypted and authenticated
ciphertext to STDOUT. The "box" can be open by the a recipient who has access
to the private key corresponding to `recipient-pub-key`.

This command uses an implementation of NaCl's crypto_box function.

For examples, see **step help crypto nacl box**.

## Positional arguments

`nonce`
Must be unique for each distinct message for a given pair of keys.

To use a binary nonce use the prefix 'base64:' and the standard base64
encoding. e.g. base64:081D3pFPBkwx1bURR9HQjiYbAUxigo0Z

`recipient-pub-key`
The path to the public key of the intended recipient of the sealed box.

`priv-key`
The path to the private key used for authentication.

## Options


**--raw**
Do not base64 encode output

