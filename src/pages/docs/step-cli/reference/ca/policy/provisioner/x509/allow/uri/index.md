---
layout: auto-doc
title: step ca policy provisioner x509 allow uri
menu:
  docs:
    parent: step ca policy provisioner x509 allow
---

## Name
**step ca policy provisioner x509 allow uri** -- add or remove URI domains

## Usage

```raw
step ca policy provisioner x509 allow uri <uri domain> [--remove]
[--provisioner=<name>] [--admin-cert=<file>] [--admin-key=<file>]
[--admin-provisioner=<string>] [--admin-subject=<string>]
[--password-file=<file>] [--ca-url=<uri>] [--root=<file>]
[--context=<name>]
```

## Description

**step ca policy provisioner x509 allow uri** command manages URI domains in policies
               
## Options


**--provisioner**=`name`
The provisioner `name`

**--remove**
removes the provided URIs from the policy instead of adding them

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

Allow all URI subdomains of "local" in X.509 certificates on authority level
```shell
$ step ca policy authority x509 allow uri "*local"
```

Deny URI badhost.local domain in X.509 certificates on authority level
```shell
$ step ca policy authority x509 deny uri badhost.local
```

Remove badhost.local from denied URI domain names in X.509 certificates on authority level
```shell
$ step ca policy authority x509 deny uri badhost.local --remove
```

Allow all URI subdomains of "example.com" in X.509 certificates on provisioner level
```shell
$ step ca policy provisioner x509 allow uri "*example.com" --provisioner my_provisioner
```
    


