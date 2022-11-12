---
layout: auto-doc
category: reference
title: step ca policy provisioner ssh user deny principal
menu:
  docs:
    parent: step ca policy provisioner ssh user deny
---

## Name
**step ca policy provisioner ssh user deny principal** -- add or remove principals

## Usage

```raw
step ca policy provisioner ssh user deny principal <principal> [--remove] [--provisioner=<name>]
[--admin-cert=<file>] [--admin-key=<file>] [--admin-subject=<subject>]
[--admin-provisioner=<name>] [--admin-password-file=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>]
```

## Description

**step ca policy provisioner ssh user deny principal** command manages principals in SSH policies

## Options


**--provisioner**=`name`
The provisioner `name`

**--remove**
removes the provided Principals from the policy instead of adding them

**--admin-cert**=`chain`
Admin certificate (`chain`) in PEM format to store in the 'x5c' header of a JWT.

**--admin-key**=`file`
Private key `file`, used to sign a JWT, corresponding to the admin certificate that will
be stored in the 'x5c' header.

**--admin-subject**=`subject`, **--admin-name**=`subject`
The admin `subject` to use for generating admin credentials.

**--admin-provisioner**=`name`, **--admin-issuer**=`name`
The provisioner `name` to use for generating admin credentials.

**--admin-password-file**=`file`, **--password-file**=`file`
The path to the `file` containing the password to decrypt the one-time token
generating key.

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--context**=`name`
The context `name` to apply for the given command.

## Examples

Allow all principals in SSH host certificates on authority level
```shell
$ step ca policy authority ssh host allow principal "*
```

Allow all principals in SSH user certificates on authority level
```shell
$ step ca policy authority ssh user allow principal "*
```

Allow principal machine-name in SSH host certificates on provisioner level
```shell
$ step ca policy provisioner ssh host allow principal machine-name --provisioner my_ssh_host_provisioner
```

Allow principal user in SSH user certificates on provisioner level
```shell
$ step ca policy provisioner ssh host allow principal user --provisioner my_ssh_user_provisioner
```

Deny principal root in SSH user certificates on provisioner level
```shell
$ step ca policy provisioner ssh host deny principal root --provisioner my_ssh_user_provisioner
```

