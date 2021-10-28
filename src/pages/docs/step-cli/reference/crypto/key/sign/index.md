---
layout: auto-doc
title: step crypto key sign
menu:
  docs:
    parent: step crypto key
---

## Name
**step crypto key sign** -- sign a message using an asymmetric key

## Usage

```raw
step crypto key sign [<file>] --key=<key-file>
[--alg=<algorithm>] [--pss] [--raw] [--password-file=<file>]
```

## Description

**step crypto key sign** generates a signature of the digest of a file or a message
using an asymmetric key.

For an RSA key, the resulting signature is either a PKCS #1 v1.5 or PSS
signature. For an (EC)DSA key, it is a DER-serialized, ASN.1 signature
structure.

## Positional arguments

`file`
File to sign

## Options


**--key**=`file`
The path to the `file` containing the private key.

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
Use RSA-PSS signature scheme.

**--raw**
Print the raw bytes instead of the base64 format.

**--password-file**=`file`
The path to the `file` containing passphrase to decrypt the private key.

## Examples

Sign a file using the default options:
```shell
$ step crypto key sign --key priv.key file.txt
```

Sign a message using the default options:
```shell
$ echo "message to be signed" | step crypto key sign --key priv.key
```

Sign a file using SHA512 as a digest algorithm:
```shell
$ step crypto key sign --key priv.key --alg sha512 file.txt
```

Sign a file using the PKCS #1 v1.5:
```shell
$ step crypto key sign --key rsa.key file.txt
```

Sign a file using the RSA-PSS scheme:
```shell
$ step crypto key sign --key rsa.key --pss file.txt
```

