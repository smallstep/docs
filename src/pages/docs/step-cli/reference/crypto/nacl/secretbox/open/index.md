---
layout: auto-doc
category: reference
title: step crypto nacl secretbox open
menu:
  docs:
    parent: step crypto nacl secretbox
---

## Name
**step crypto nacl secretbox open** -- authenticate and decrypt a box produced by seal

## Usage

```raw
step crypto nacl secretbox open <nonce> <key-file>
[--raw]
```

## Description

**step crypto nacl secretbox open** verifies and decrypts a ciphertext using a
secret key and a nonce.

This command uses an implementation of NaCl's crypto_secretbox_open function.

For examples, see **step help crypto nacl secretbox**.

## Positional arguments

`nonce`
The nonce provided when the secretbox was sealed.

To use a binary nonce use the prefix 'base64:' and the standard base64
encoding. e.g. base64:081D3pFPBkwx1bURR9HQjiYbAUxigo0Z

`key-file`
The path to the shared key.

## Options


**--raw**
Indicates that input is not base64 encoded

