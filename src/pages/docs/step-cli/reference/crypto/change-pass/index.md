---
layout: auto-doc
title: step crypto change-pass
menu:
  docs:
    parent: step crypto
---

## Name
**step crypto change-pass** -- change password of an encrypted private key (PEM or JWK format)

## Usage

```raw
step crypto change-pass <key-file>
[--out=<file>] [--password-file=<file>] [--new-password-file=<file>]
[--insecure] [--no-password]
```

## Description

**step crypto change-pass** extracts and decrypts
the private key from a file and encrypts and serializes the key to disk using a
new password.

## Positional arguments

`key-file`
The PEM or JWK file with the encrypted key.

## Options


**--password-file**=`file`
The path to the `file` containing the password to decrypt the private key.

**--new-password-file**=`file`
The path to the `file` containing the password to encrypt the private key.

**--out**=`file`, **--output-file**=`file`
The `file` new encrypted key path. Default to overwriting the `key` positional argument

**-f**, **--force**
Force the overwrite of files without asking.

**--insecure**


**--no-password**
Do not ask for a password to encrypt a private key. Sensitive key material will
be written to disk unencrypted. This is not recommended. Requires **--insecure** flag.

## Examples

Change password for PEM formatted key:
```shell
$ step crypto change-pass key.pem
```

Remove password for PEM formatted key:
```shell
$ step crypto change-pass key.pem --no-password --insecure
```

Change password for PEM formatted key and write encrypted key to different file:
```shell
$ step crypto change-pass key.pem --out new-key.pem
```

Change password for JWK formatted key:
```shell
$ step crypto change-pass key.jwk
```

Removed password for JWK formatted key:
```shell
$ step crypto change-pass key.jwk --no-password --insecure
```

Change password for JWK formatted key:
```shell
$ step crypto change-pass key.jwk --out new-key.jwk
```

