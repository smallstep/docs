---
layout: auto-doc
title: step crypto key inspect
menu:
  docs:
    parent: step crypto key
---

## Name
**step crypto key inspect** -- print key details in human readable format

## Usage

```raw
step crypto key inspect <key-file>
```

## Description

**step crypto key inspect** prints details of a public or a private key in a
human readable format the public key corresponding to the given `key-file`.

## Positional arguments

`key-file`
Path to a public or private key.

## Options


**--password-file**=`file`
The path to the `file` containing passphrase to decrypt private key.

## Examples

Print details of the given key:
```shell
$ step crypto key inspect priv.pem
```

## Notes

This command shows the raw parameters of the keys, it does not include headers
that the marshaled version of the keys might have. For example, a marshaled
version an EC public key will have 0x04 in the first byte to indicate the
uncompressed form specified in section 4.3.6 of ANSI X9.62.

