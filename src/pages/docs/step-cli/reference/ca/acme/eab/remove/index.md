---
layout: auto-doc
category: reference
title: step ca acme eab remove
menu:
  docs:
    parent: step ca acme eab
---

## Name
**step ca acme eab remove** -- remove an ACME EAB Key from the CA

## Usage

```raw
step ca acme eab remove <provisioner> <eab-key-id>
[--admin-cert=<file>] [--admin-key=<file>]
[--admin-provisioner=<string>] [--admin-subject=<string>]
[--password-file=<file>] [--ca-url=<uri>] [--root=<file>]
[--context=<name>]
```

## Description

**step ca acme eab remove** removes an ACME EAB Key from the CA.

## Positional arguments

`provisioner`
Name of the provisioner to remove an ACME EAB key for

`eab-key-id`
The ACME EAB Key ID to remove

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

Remove ACME EAB Key with Key ID "zFGdKC1sHmNf3Wsx3OujY808chxwEdmr" from my_acme_provisioner:
```shell
$ step ca acme eab remove my_acme_provisioner zFGdKC1sHmNf3Wsx3OujY808chxwEdmr
```


