---
layout: auto-doc
title: step crypto nacl auth verify
menu:
  docs:
    parent: step crypto nacl auth
---

## Name
**step crypto nacl auth verify** -- validate a digest for a message

## Usage

```raw
step crypto nacl auth verify <key-file> <digest>
```

## Description

**step crypto nacl auth verify** checks that the digest is a valid authenticator
of the message is read from STDIN under the given secret key file.

This command uses an implementation of NaCl's crypto_auth_verify function.

For examples, see **step help crypto nacl auth**.
