---
layout: auto-doc
title: step ca policy authority ssh host allow dns
menu:
  docs:
    parent: step ca policy authority ssh host allow
---

## Name
**step ca policy authority ssh host allow dns** -- add or remove DNS domains

## Usage

```raw
step ca policy authority ssh host allow dns <domain> [--remove]
[--provisioner=<name>] [--eab-key-id=<eab-key-id>] [--eab-key-reference=<eab-key-reference>]
[--admin-cert=<file>] [--admin-key=<file>]
[--admin-provisioner=<string>] [--admin-subject=<string>]
[--password-file=<file>] [--ca-url=<uri>] [--root=<file>]
[--context=<name>]
```

## Description

**step ca policy authority ssh host allow dns** command manages DNS domains in policies

## Options


**--provisioner**=`name`
The provisioner `name`

**--eab-key-id**=`value`
An ACME EAB Key ID.

**--eab-key-reference**=`value`
An ACME EAB Key Reference.

**--remove**
removes the provided DNS names from the policy instead of adding them

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

Allow www.example.com DNS in X.509 certificates on authority level
```shell
$ step ca policy authority x509 allow dns www.example.com
```

Allow all DNS subdomains of "local" in X.509 certificates on authority level
```shell
$ step ca policy authority x509 allow dns "*local"
```

Deny DNS badhost.local in X.509 certificates on authority level
```shell
$ step ca policy authority x509 deny dns "badhost.local"
```

Remove badhost.local from denied DNS names in X.509 certificates on authority level
```shell
$ step ca policy authority x509 deny dns "badhost.local" --remove
```

Allow all DNS subdomains of "example.com" in X.509 certificates on provisioner level
```shell
$ step ca policy provisioner x509 allow dns "*example.com" --provisioner my_provisioner
```

Allow all DNS subdomains of "account1.acme.example.com" in X.509 certificates on ACME Account level
```shell
$ step ca policy acme x509 allow dns "*account1.acme.example.com" --provisioner my_acme_provisioner --reference account1
```

Allow all DNS subdomains of "local" in SSH host certificates on authority level
```shell
$ step ca policy authority ssh host allow dns "*local"
```

Deny badsshhost.local in SSH host certificates on authority level
```shell
$ step ca policy authority ssh host allow dns "badsshhost.local"
```



