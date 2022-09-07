---
layout: auto-doc
category: reference
title: step crypto hash
menu:
  docs:
    parent: step crypto
    children:
      - digest
      - compare
---

## Name
**step crypto hash** -- generate and check hashes of files and directories

## Usage

```raw
step crypto hash <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step crypto hash** command group provides facilities for generating and
checking hashes of files and directories.

## Examples

SHA-256 digest and compare of a file:
```shell
$ step crypto hash digest foo.crt
1d14bfeab8532f0fca6220f6a870d069496798e92520c4437e13b9921a3cb7f3  foo.crt

$ step crypto hash compare 1d14bfeab8532f0fca6220f6a870d069496798e92520c4437e13b9921a3cb7f3 foo.crt
ok
```

SHA-1 digest and compare of a directory:
```shell
$ step crypto hash digest --alg sha1 config/
d419284e29382983683c294f9593183f7e00961b  config/

$ step crypto hash compare --alg sha1 d419284e29382983683c294f9593183f7e00961b config
ok
```

MD5 of a file:
```shell
$ step crypto hash digest --alg md5 --insecure foo.crt
a2c5dae8eae7d116019f0478e8b0a35a  foo.crt
```

SHA-512/256 of a list of files:
```shell
$ find . -type f | xargs step crypto hash digest --alg sha512-256
```

Compare a previously created checksum file:
```shell
$ find path -type f | xargs step crypto hash digest --alg sha512-256 > checksums.txt

$ cat checksums.txt | xargs -n 2 step crypto hash compare --alg sha512-256
```

## Commands


| Name | Usage |
|---|---|
| **[digest](digest/)** | generate a hash digest of a file or directory |
| **[compare](compare/)** | verify the hash digest for a file or directory matches an expected value |

