---
layout: auto-doc
category: reference
title: step crypto keypair
menu:
  docs:
    parent: step crypto
---

## Name
**step crypto keypair** -- generate a public / private keypair in PEM format

## Usage

```raw
step crypto keypair <pub_file> <priv_file>
[--kty=<key-type>] [--curve=<curve>] [--size=<size>]
[--password-file=<file>] [--no-password] [--insecure]
```

## Description

**step crypto keypair** generates a raw public /
private keypair in PEM format. These keys can be used by other operations
to sign and encrypt data, and the public key can be bound to an identity
in a CSR and signed by a CA to produce a certificate.

Private keys are encrypted using a password. You'll be prompted for this
password automatically when the key is used.

## Positional arguments

`pub_file`
The path to write the public key.

`priv_file`
The path to write the private key.

## Options


**--kty**=`kty`
The `kty` to build the certificate upon.
If unset, default is EC.

`kty` is a case-sensitive string and must be one of:

- **EC**: Create an **elliptic curve** keypair

- **OKP**: Create an octet key pair (for **"Ed25519"** curve)

- **RSA**: Create an **RSA** keypair

**--size**=`size`
The `size` (in bits) of the key for RSA and oct key types. RSA keys require a
minimum key size of 2048 bits. If unset, default is 2048 bits for RSA keys and 128 bits for oct keys.

**--crv**=`curve`, **--curve**=`curve`
The elliptic `curve` to use for EC and OKP key types. Corresponds
to the **"crv"** JWK parameter. Valid curves are defined in JWA [RFC7518]. If
unset, default is P-256 for EC keys and Ed25519 for OKP keys.

`curve` is a case-sensitive string and must be one of:

- **P-256**: NIST P-256 Curve

- **P-384**: NIST P-384 Curve

- **P-521**: NIST P-521 Curve

- **Ed25519**: Ed25519 Curve

**--from-jwk**=`jwk-file`
Create a PEM representing the key encoded in an
existing `jwk-file` instead of creating a new key.

**--password-file**=`file`
The path to the `file` containing the password to encrypt or decrypt the private key.

**--no-password**
Do not ask for a password to encrypt a private key. Sensitive key material will
be written to disk unencrypted. This is not recommended. Requires **--insecure** flag.

**--insecure**


**-f**, **--force**
Force the overwrite of files without asking.

## Exit codes

This command returns 0 on success and >0 if any error occurs.

## Examples

Create an RSA public / private key pair with 4096 bits:

```shell
$ step crypto keypair foo.pub foo.key --kty RSA --size 4096
```

Create an RSA public / private key with fewer than the recommended number of
bits (recommended `= 2048 bits):

```shell
$ step crypto keypair foo.pub foo.key --kty RSA --size 1024 --insecure
```

Create an EC public / private key pair with curve P-521:

```shell
$ step crypto keypair foo.pub foo.key --kty EC --curve "P-521"
```

Create an EC public / private key pair but do not encrypt the private key file:

```shell
$ step crypto keypair foo.pub foo.key --kty EC --curve "P-256" \
--no-password --insecure
```

Create an Octet Key Pair with curve Ed25519:

```shell
$ step crypto keypair foo.pub foo.key --kty OKP --curve Ed25519
```


