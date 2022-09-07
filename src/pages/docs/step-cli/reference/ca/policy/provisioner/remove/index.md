---
layout: auto-doc
title: step ca policy provisioner remove
menu:
  docs:
    parent: step ca policy provisioner
---

## Name
**step ca policy provisioner remove** -- remove certificate issuance policy

## Usage

```raw
step ca policy authority remove 
[--provisioner=<name>] [--eab-key-id=<eab-ey-id>] [--eab-key-reference=<eab-key-reference>]
[--admin-cert=<file>] [--admin-key=<file>]
[--admin-provisioner=<string>] [--admin-subject=<string>]
[--password-file=<file>] [--ca-url=<uri>] [--root=<file>]
[--context=<name>]
```

## Description

**step ca policy provisioner remove** removes a certificate issuance policy.

Remove the authority certificate issuance policy
```shell
$ step ca policy authority remove
```

Remove a provisioner certificate issuance policy
```shell
$ step ca policy provisioner remove --provisioner my_provisioner
```

Remove an ACME EAB certificate issuance policy by reference
```shell
$ step ca policy acme remove --provisioner my_acme_provisioner --eab-key-reference my_reference
```

Remove an ACME EAB certificate issuance policy by EAB Key ID
```shell
$ step ca policy acme remove --provisioner my_acme_provisioner --eab-key-id "lUOTGwvFQADjk8nxsVufbhyTOwrFmvO2"
```


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

