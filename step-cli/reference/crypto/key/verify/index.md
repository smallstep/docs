---
layout: auto-doc
category: reference
title: step crypto key verify
menu:
  docs:
    parent: step crypto key
---

## Name
**step crypto key verify** -- verify a signed message

## Usage

```raw
step crypto key verify [<file>] --key=<key-file> --signature=<base64>
[--alg=<algorithm>] [--pss]
```

## Description

**step crypto key verify** verifies the signature of a file or a message.

## Positional arguments

`file`
File to verify.

## Options


**--key**=`file`
The path to the `file` containing the public key.

**--signature**=`base64`, **--sig**=`base64`
The `base64` version of the signature.

**--alg**=`algorithm`
The hash algorithm to use on RSA PKCS #1 1.5 and RSA-PSS signatures.

`algorithm` must be one of:

- **sha1** (or sha): SHA-1 produces a 160-bit hash value

- **sha224**: SHA-224 produces a 224-bit hash value

- **sha256** (default): SHA-256 produces a 256-bit hash value

- **sha384**: SHA-384 produces a 384-bit hash value

- **sha512**: SHA-512 produces a 512-bit hash value

- **sha512-224**: SHA-512/224 uses SHA-512 and truncates the output to 224 bits

- **sha512-256**: SHA-512/256 uses SHA-512 and truncates the output to 256 bits

- **md5**: MD5 produces a 128-bit hash value


**--pss**
Verify using the RSA-PSS signature scheme.

## Examples

Verify a file with its signature:
```shell
s step crypto key verify --key pub.key --sig "base64...=" file.txt
true
```

Verify a file using the PKCS #1 v1.5:
```shell
$ step crypto key verify --key rsa.pub --sig "base64...=" file.txt
```

Verify a file using the PKCS #1 v1.5 and SHA512:
```shell
$ step crypto key verify --key rsa.pub --alg sha512 --sig "base64...=" file.txt
```

Verify a file using the RSA-PSS scheme:
```shell
$ step crypto key verify --key rsa.pub --pss --sig "base64...=" file.txt
```

