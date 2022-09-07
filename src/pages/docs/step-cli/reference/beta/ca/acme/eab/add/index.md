---
layout: auto-doc
category: reference
title: step beta ca acme eab add
menu:
  docs:
    parent: step beta ca acme eab
---

## Name
**step beta ca acme eab add** -- add ACME External Account Binding Key

## Usage

```raw
step ca acme eab add <provisioner> [<eab-key-reference>]
[--admin-cert=<file>] [--admin-key=<file>]
[--admin-provisioner=<string>] [--admin-subject=<string>]
[--password-file=<file>] [--ca-url=<uri>] [--root=<file>]
[--context=<name>]
```

## Description

**step ca acme eab add** adds ACME External Account Binding Key.

## Positional arguments

`provisioner`
Name of the provisioner to which the ACME EAB key will be added

`eab-key-reference`
(Optional) reference (from external system) for the key that will be added

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

## Examples

Add an ACME External Account Binding Key without reference:
```shell
$ step ca acme eab add my_acme_provisioner
```

Add an ACME External Account Binding Key with reference:
```shell
$ step ca acme eab add my_acme_provisioner my_first_eab_key
```

