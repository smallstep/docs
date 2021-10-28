---
layout: auto-doc
title: step crypto nacl box keypair
menu:
  docs:
    parent: step crypto nacl box
---

## Name
**step crypto nacl box keypair** -- generate a key for use with seal and open

## Usage

```raw
step crypto nacl box keypair <pub-file> <priv-file>
```

## Description

Generates a new public/private keypair suitable for use with seal and open.
The private key is encrypted using a password in a nacl secretbox.

This command uses an implementation of NaCl's crypto_box_keypair function.

For examples, see **step help crypto nacl box**.

## Positional arguments

`pub-file`
The path to write the public key.

`priv-file`
The path to write the encrypted private key.

## Options


**-f**, **--force**
Force the overwrite of files without asking.

