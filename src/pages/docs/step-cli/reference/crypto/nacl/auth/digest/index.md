---
layout: auto-doc
category: reference
title: step crypto nacl auth digest
menu:
  docs:
    parent: step crypto nacl auth
---

## Name
**step crypto nacl auth digest** -- generate a 32-byte digest for a message

## Usage

```raw
step crypto nacl auth digest <key-file>
```

## Description

**step crypto nacl auth digest** creates a digest to authenticate the message
is read from STDIN using the given secret key.

This command uses an implementation of NaCl's crypto_auth function.

For examples, see **step help crypto nacl auth**.
