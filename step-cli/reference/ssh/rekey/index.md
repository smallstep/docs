---
layout: auto-doc
category: reference
title: step ssh rekey
menu:
  docs:
    parent: step ssh
---

## Name
**step ssh rekey** -- rekey a SSH certificate using the SSH CA

## Usage

```raw
step ssh rekey <ssh-cert> <ssh-key> [--out=<file>]
[--issuer=<name>] [--password-file=<file>] [--force]
[--offline] [--ca-config=<file>] [--ca-url=<uri>] [--root=<file>]
[--context=<name>]
```

## Description

**step ssh rekey** command generates a new SSH Certificate and key using
an existing SSH Certificate and key pair to authenticate and templatize the
request. It writes the new certificate to disk - either overwriting
`ssh-cert` or using new files when the **--out**=`file` flag is used.

## Positional arguments

`ssh-cert`
The ssh certificate to renew.

`ssh-key`
The ssh certificate private key.

## Options


**--out**=`file`
The new key `file`. Defaults to overwriting the `ssh-key` positional argument.

**--provisioner**=`name`, **--issuer**=`name`
The provisioner `name` to use.

**--provisioner-password-file**=`file`
The path to the `file` containing the password to decrypt the one-time token
      generating key.

**--no-password**
Do not ask for a password to encrypt a private key. Sensitive key material will
be written to disk unencrypted. This is not recommended. Requires **--insecure** flag.

**--insecure**


**-f**, **--force**
Force the overwrite of files without asking.

**--sshpop-cert**=`chain`
Certificate (`chain`) in PEM format to store in the 'sshpop' header of a JWT.

**--sshpop-key**=`file`
Private key `file`, used to sign a JWT, corresponding to the certificate that will
be stored in the 'sshpop' header.

**--offline**
Creates a certificate without contacting the certificate authority. Offline mode
uses the configuration, certificates, and keys created with **step ca init**,
but can accept a different configuration file using **--ca-config** flag.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$(step path)/config/ca.json

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--context**=`name`
The context `name` to apply for the given command.

## Examples

Rekey an ssh certificate:
```shell
$ step ssh rekey id_ecdsa-cert.pub id_ecdsa
```

Rekey an ssh certificate creating id2_ecdsa, id2_ecdsa.pub, and id2_ecdsa-cert.pub:
```shell
$ step ssh rekey --out id2_ecdsa id_ecdsa-cert.pub id_ecdsa
```

