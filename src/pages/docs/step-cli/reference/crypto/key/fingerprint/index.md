---
layout: auto-doc
title: step crypto key fingerprint
menu:
  docs:
    parent: step crypto key
---

## Name
**step crypto key fingerprint** -- print the fingerprint of a public key

## Usage

```raw
step crypto key fingerprint <key-file>
```

## Description

**step crypto key fingerprint** prints the fingerprint of a public key. The
fingerprint of a private key will be only based on the public part of the
key.

By default the fingerprint calculated is the SHA-256 hash with raw Base64 encoding
of the ASN.1 BIT STRING of the subjectPublicKey defined in RFC 5280.

Using the flag **--ssh** the fingerprint would be based on the SSH encoding of
the public key.

Note that for certificates and certificate request, the fingerprint would be
based only on the public key embedded in the certificate. To get the certificate
fingerprint use the appropriate commands:

```shell
$ step certificate fingerprint <x509-crt|x509-csr>
$ step ssh fingerprint <ssh-crt>
```

## Positional arguments

`key-file`
Path to a public, private key, certificate (X.509 and SSH) or
   certificate request.

## Options


**--sha1**
Use the SHA-1 hash with hexadecimal format. The result will be equivalent to the Subject Key Identifier in a X.509 certificate.

**--ssh**
Use the SSH marshaling format instead of X.509.

**--password-file**=`file`
The path to the `file` containing passphrase to decrypt a private key.

**--raw**
Print the raw bytes instead of the fingerprint. These bytes can be piped to a different hash command.

## Examples

Print the fingerprint of a public key:
```shell
$ step crypto key fingerprint pub.pem
```

Print the fingerprint of the public key using the SSH marshaling:
```shell
$ step crypto key fingerprint --ssh pub.pem
```

Print the fingerprint of the key embedded in a certificate using the SHA-1 hash:
```shell
$ step crypto key fingerprint --sha1 cert.pem
```

Print the same fingerprint for a public key, a private key and a
certificate all of with the same public key.
```shell
$ step crypto key fingerprint id_ed25519
$ step crypto key fingerprint id_ed25519.pub
$ step crypto key fingerprint id_ed25519-cert.pub
```

Print the fingerprint of the key using an external tool:
```shell
$ step crypto key fingerprint --raw pub.pem | md5sum
```

Print the fingerprint of the public key of an encrypted private key:
```shell
$ step crypto key fingerprint --password-file pass.txt priv.pem
```

