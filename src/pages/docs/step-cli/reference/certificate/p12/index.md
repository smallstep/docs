---
layout: auto-doc
category: reference
title: step certificate p12
menu:
  docs:
    parent: step certificate
---

## Name
**step certificate p12** -- package a certificate and keys into a .p12 file

## Usage

```raw
step certificate p12 <p12-path> [<crt-path>] [<key-path>]
[--ca=<file>] [--password-file=<file>]
```

## Description

**step certificate p12** creates a .p12 (PFX / PKCS12)
file containing certificates and keys. This can then be used to import
into Windows / Firefox / Java applications.

## Options


**--ca**=`file`
The path to the `file` containing a CA or intermediate certificate to
add to the .p12 file. Use the '--ca' flag multiple times to add
multiple CAs or intermediates.

**--password-file**=`file`
The path to the `file` containing the password to encrypt the .p12 file.

**--no-password**
Do not ask for a password to encrypt a private key. Sensitive key material will
be written to disk unencrypted. This is not recommended. Requires **--insecure** flag.

**-f**, **--force**
Force the overwrite of files without asking.

**--insecure**


## Exit codes

This command returns 0 on success and >0 if any error occurs.

## Examples

Package a certificate and private key together:

```shell
$ step certificate p12 foo.p12 foo.crt foo.key
```

Package a certificate and private key together, and include an intermediate certificate:

```shell
$ step certificate p12 foo.p12 foo.crt foo.key --ca intermediate.crt
```

Package a CA certificate into a "trust store" for Java applications:

```shell
$ step certificate p12 trust.p12 --ca ca.crt
```

Package a certificate and private key with an empty password:

```shell
$ step certificate p12 --no-password --insecure foo.p12 foo.crt foo.key
```

