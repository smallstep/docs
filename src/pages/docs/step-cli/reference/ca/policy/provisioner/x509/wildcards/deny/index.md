---
layout: auto-doc
category: reference
title: step ca policy provisioner x509 wildcards deny
menu:
  docs:
    parent: step ca policy provisioner x509 wildcards
---

## Name
**step ca policy provisioner x509 wildcards deny** -- deny wildcard names in X.509 certificate issuance policies

## Usage

```raw
step ca policy x509 wildcards deny
[--provisioner=<name>] [--eab-key-id=<eab-key-id>] [--eab-key-reference=<eab-key-reference>]
[--admin-cert=<file>] [--admin-key=<file>]
[--admin-provisioner=<string>] [--admin-subject=<string>]
[--password-file=<file>] [--ca-url=<uri>] [--root=<file>]
[--context=<name>]
```

## Description

**step ca policy x509 wildcards deny** deny wildcard names in X.509 policy

## Options


**--provisioner**=`name`
The provisioner `name`

**--eab-key-id**=`value`
An ACME EAB Key ID.

**--eab-key-reference**=`value`
An ACME EAB Key Reference.

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

Deny wildcard names in X.509 certificates on authority level
```shell
$ step ca policy authority x509 wildcards deny
```    

Deny wildcard names in X.509 certificates on provisioner level
```shell
$ step ca policy provisioner x509 wildcards deny --provisioner my_provisioner
```    

Deny wildcard names in X.509 certificates on ACME account level by reference
```shell
$ step ca policy acme x509 wildcards deny --provisioner my_acme_provisioner --eab-reference my_reference
```

