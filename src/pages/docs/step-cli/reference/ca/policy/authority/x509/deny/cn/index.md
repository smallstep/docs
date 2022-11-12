---
layout: auto-doc
category: reference
title: step ca policy authority x509 deny cn
menu:
  docs:
    parent: step ca policy authority x509 deny
---

## Name
**step ca policy authority x509 deny cn** -- add or remove common names

## Usage

```raw
step ca policy authority x509 deny cn <name> [--remove]
[--provisioner=<name>] [--eab-key-id=<eab-key-id>] [--eab-key-reference=<eab-key-reference>]
[--admin-cert=<file>] [--admin-key=<file>] [--admin-subject=<subject>]
[--admin-provisioner=<name>] [--admin-password-file=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>]
```

## Description

**step ca policy authority x509 deny cn** command manages common names in policies

## Options


**--provisioner**=`name`
The provisioner `name`

**--eab-key-id**=`value`
An ACME EAB Key ID.

**--eab-key-reference**=`value`
An ACME EAB Key Reference.

**--remove**
removes the provided Common Names from the policy instead of adding them

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

Allow "My CA Name" as Common Name in X.509 certificates on authority level
```shell
$ step ca policy authority x509 allow cn "My CA Name"
```

Allow www.example.com as Common Name in X.509 certificates on authority level.
This can be used in case www.example.com is not allowed as a DNS SAN, but is
allowed to be used in the Common Name.
```shell
$ step ca policy authority x509 allow cn www.example.com
```

Remove www.example.com from allowed Common Names in X.509 certificates on authority level.
```shell
$ step ca policy authority x509 allow cn www.example.com --remove
```

Deny "My Bad CA Name" as Common Name in X.509 certificates on authority level
```shell
$ step ca policy authority x509 deny cn "My Bad CA Name"
```

