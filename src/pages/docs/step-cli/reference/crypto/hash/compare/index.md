---
layout: auto-doc
title: step crypto hash compare
menu:
  docs:
    parent: step crypto hash
---

## Name
**step crypto hash compare** -- verify the hash digest for a file or directory matches an expected value

## Usage

```raw
step crypto hash compare <hash> <file-or-directory>
[--alg ALGORITHM]
```

## Description

**step crypto hash compare** verifies that the expected hash value matches the
computed hash value for a file or directory.

For examples, see **step help crypto hash**.

## Positional arguments

`hash`
The expected hash digest

`file-or-directory`
The path to a file or directory to hash.

## Options


**--alg**=`algorithm`
The hash algorithm to use.

`algorithm` must be one of:

- **sha1** (or sha): SHA-1 produces a 160-bit hash value

- **sha224**: SHA-224 produces a 224-bit hash value

- **sha256** (default): SHA-256 produces a 256-bit hash value

- **sha384**: SHA-384 produces a 384-bit hash value

- **sha512**: SHA-512 produces a 512-bit hash value

- **sha512-224**: SHA-512/224 produces a 224-bit hash value

- **sha512-256**: SHA-512/256 produces a 256-bit hash value

- **md5** (requires --insecure): MD5 produces a 128-bit hash value


