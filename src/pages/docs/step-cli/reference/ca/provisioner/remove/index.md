---
layout: auto-doc
title: step ca provisioner remove
menu:
  docs:
    parent: step ca provisioner
---

## Name
**step ca provisioner remove** -- remove a provisioner from the CA configuration

## Usage

```raw
step ca provisioner remove <name>
[--admin-cert=<file>] [--admin-key=<file>] [--admin-provisioner=<name>]
[--admin-subject=<subject>] [--password-file=<file>] [--ca-url=<uri>]
[--root=<file>] [--context=<name>] [--ca-config=<file>]
```

## Description

**step ca provisioner remove** removes a provisioner from the CA configuration.

## Options


**--admin-cert**=`chain`
Admin certificate (`chain`) in PEM format to store in the 'x5c' header of a JWT.

**--admin-key**=`file`
Private key `file`, used to sign a JWT, corresponding to the admin certificate that will
be stored in the 'x5c' header.

**--admin-provisioner**=`name`, **--admin-issuer**=`name`
The provisioner `name` to use for generating admin credentials.

**--admin-subject**=`subject`, **--admin-name**=`subject`
The admin `subject` to use for generating admin credentials.

**--password-file**=`file`
The path to the `file` containing the password to encrypt or decrypt the private key.

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--context**=`name`
The context `name` to apply for the given command.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$(step path)/config/ca.json

## Examples

Remove provisioner by name:
```shell
$ step ca provisioner remove acme
```

Remove provisioner from a ca.json that is not in the default location:
```shell
$ step ca provisioner remove acme --ca-config /path/to/ca.json
```


