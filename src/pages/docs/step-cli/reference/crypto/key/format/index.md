---
layout: auto-doc
title: step crypto key format
menu:
  docs:
    parent: step crypto key
---

## Name
**step crypto key format** -- reformat a public or private key

## Usage

```raw
step crypto key format <key-file> [--out=<file>]
```

## Description

**step crypto key format** prints or writes the key in
a different format.

By default PEM formated keys will be converted to DER with the following rules:

 * ECDSA, RSA, AND Ed25519 public keys will use the DER-encoded PKIX format.
 * ECDSA, AND RSA private keys will use the ASN.1, DER format.
 * Ed25519 private keys will use the DER-encoded PKCS8 encoded form.

And DER encoded keys will be converted to PEM with the following rules:

 * ECDSA, RSA, AND Ed25519 public keys will use the PEM-encoded PKIX format.
 * ECDSA private keys will use the PEM-encoded format defined in RFC 5915 and
   SEC1.
 * RSA private keys will use the PEM-encoded PKCS#1 format.
 * Ed25519 private keys will use the PEM-encoded PKCS#8 format.

The flags **--pkcs8**, **--pem**, **--der**, **--ssh**, and **--jwk** can be use
to change the previous defaults. For example we can use **--pkcs8** to save a
PKCS#1 RSA key to the PKCS#8 form. Or we can combine **--pem** and **--pkcs8**
to convert to PKCS#8 a PEM file.

## Positional arguments

`key-file`
Path to a file with a public or private key, or the public key of an
   X.509 certificate.

## Options


**--pkcs8**
Convert RSA and ECDSA private keys to PKCS#8 PEM/DER format.

**--pem**
Uses PEM as the result encoding format. If neither **--pem** nor **--der** nor
**--ssh** nor **--jwk** are set it will always switch to the DER format.

**--der**
Uses DER as the result enconfig format. If neither **--pem** nor **--der** nor
**--ssh** nor **--jwk** are set it will always switch to the PEM format.

**--ssh**
Uses OpenSSH as the result encoding format.

**--jwk**
Uses JSON Web Key as the result encoding format.

**--out**=`value`
Path to write the reformatted result.

**--password-file**=`value`
Location of file containing passphrase to decrypt private key.

**--no-password**
Do not ask for a password to encrypt a private key with PEM format. Sensitive
key material will be written to disk unencrypted. This is not recommended.
Requires **--insecure** flag.

**--insecure**


**-f**, **--force**
Force the overwrite of files without asking.

## Exit codes

This command returns 0 on success and >0 if any error occurs.

## Examples

Convert a PEM file to DER:
```shell
$ step crypto key format key.pem
```

Convert DER file to PEM:
```shell
$ step crypto key format key.der
```

Convert a PEM file to OpenSSH:
```shell
$ step crypto key format --ssh key.pem
```

Convert a PEM file to JWK:
```shell
$ step crypto key format --jwk key.pem
```

Convert PEM file to DER and write to disk:
```shell
$ step crypto key format key.pem --out key.der
```

Convert a PKCS#1 RSA private key to PKCS#8 using the PEM format:
```shell
$ step crypto key format --pem --pkcs8 rsa.pem --out rsa-pkcs8.pem
```

Convert PKCS#8 RSA private key to the PKCS#1 format:
```shell
$ step crypto key format --pem rsa-pkcs8.pem --out rsa.pem
```

Convert an ASN.1 DER format to the PEM-encoded PKCS#8 format:
```shell
$ step crypto key format --pkcs8 key.der --out key-pkcs8.der
```

Convert an ASN.1 DER format to the DER-encoded PKCS#8 format:
```shell
$ step crypto key format --der --pkcs8 key.der --out key-pkcs8.der
```

