---
layout: auto-doc
title: step beta ca acme eab list
menu:
  docs:
    parent: step beta ca acme eab
---

## Name
**step beta ca acme eab list** -- list all ACME External Account Binding Keys

## Usage

```raw
step beta ca acme eab list <provisioner> [<reference>]
[--limit=<number>] [--admin-cert=<file>] [--admin-key=<file>]
[--admin-provisioner=<string>] [--admin-subject=<string>]
[--password-file=<file>] [--ca-url=<uri>] [--root=<file>]
[--context=<name>]
```

## Description

**step beta ca acme eab list** lists all ACME External Account Binding (EAB) Keys.

Output will go to stdout by default. If many EAB keys are stored in the ACME provisioner, output will be sent to $PAGER (when set). 

## Positional arguments

`provisioner`
Name of the provisioner to list ACME EAB keys for

`reference`
(Optional) reference (from external system) for the key to be listed


## Options


**--limit**=`value`
The number of entities to return per (paging) API request.

**--no-pager**
Disables usage of $PAGER for paging purposes

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

List all ACME External Account Binding Keys:
```shell
$ step beta ca acme eab list my_acme_provisioner
```

Show ACME External Account Binding Key with specific reference:
```shell
$ step beta ca acme eab list my_acme_provisioner my_reference
```


