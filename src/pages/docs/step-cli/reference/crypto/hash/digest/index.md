---
layout: auto-doc
title: step crypto hash digest
menu:
  docs:
    parent: step crypto hash
---

## Name
**step crypto hash digest** -- generate a hash digest of a file or directory

## Usage

```raw
step crypto hash digest <file-or-directory>...
[--alg=<algorithm>]
```

## Description

**step crypto hash digest** generates a hash digest for a given file or
directory. For a file, the output is the same as tools like 'shasum'. For
directories, the tool computes a hash tree and outputs a single hash digest.

For examples, see **step help crypto hash**.

## Positional arguments

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

- **sha512-224**: SHA-512/224 uses SHA-512 and truncates the output to 224 bits

- **sha512-256**: SHA-512/256 uses SHA-512 and truncates the output to 256 bits

- **md5** (requires --insecure): MD5 produces a 128-bit hash value


