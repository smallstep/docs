---
layout: auto-doc
title: step ca policy acme x509 allow ip
menu:
  docs:
    parent: step ca policy acme x509 allow
---

## Name
**step ca policy acme x509 allow ip** -- add or remove ip addresses

## Usage

```raw
step ca policy acme x509 allow ip <ip address> [--remove]
[--provisioner=<name>] [--eab-key-id=<eab-key-id>] [--eab-key-reference=<eab-key-reference>]
[--admin-cert=<file>] [--admin-key=<file>]
[--admin-provisioner=<string>] [--admin-subject=<string>]
[--password-file=<file>] [--ca-url=<uri>] [--root=<file>]
[--context=<name>]
```

## Description

**step ca policy acme x509 allow ip** command manages IP addresses and ranges in policies

## Options


**--provisioner**=`name`
The provisioner `name`

**--eab-key-id**=`value`
An ACME EAB Key ID

**--eab-key-reference**=`value`
An ACME EAB Key Reference

**--remove**
removes the provided IPs from the policy instead of adding them

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

Allow IP address 127.0.0.1 in X.509 certificates on authority level
```shell
$ step ca policy authority x509 allow ip 127.0.0.1
```    

Allow IP address range 10.0.0.0/24 in X.509 certificates on authority level
```shell
$ step ca policy authority x509 allow ip 10.0.0.0/24
```    

Deny IP address 10.0.0.30 in X.509 certificates on authority level
```shell
$ step ca policy authority x509 deny ip 10.0.0.30
```    

Remove IP address range 10.0.0.0/24 from being allowed in X.509 certificates on authority level
```shell
$ step ca policy authority x509 allow ip 10.0.0.0/24 --remove
```    

Allow IP address range 10.10.0.0/24 in X.509 certificates on provisioner level
```shell
$ step ca policy provisioner x509 allow ip 10.10.0.0/24 --provisioner my_provisioner
```    

Deny IP address 10.10.0.50 in X.509 certificates on provisioner level
```shell
$ step ca policy provisioner x509 deny ip 10.10.0.50 --provisioner my_provisioner
```    

Remove IP address 10.10.0.50 from being denied in X.509 certificates on provisioner level
```shell
$ step ca policy provisioner x509 deny ip 10.10.0.50 --provisioner my_provisioner --remove
```    

Allow IP address range 10.20.0.0/24 in X.509 certificates on ACME account level by EAB key reference
```shell
$ step ca policy provisioner x509 allow ip 10.10.0.0/24 --provisioner my_acme_provisioner --eab-key-reference my_ref
```    

Deny IP address 10.20.0.70 in X.509 certificates on ACME account level by EAB key reference
```shell
$ step ca policy provisioner x509 deny ip 10.20.0.70 --provisioner my_acme_provisioner --eab-key-reference my_ref
```    

Remove IP address 10.20.0.70 from being denied in X.509 certificates on ACME account level by EAB key reference
```shell
$ step ca policy provisioner x509 deny ip 10.20.0.70 --provisioner my_acme_provisioner --eab-key-reference my_ref --remove
```    

Allow IP address range 192.168.0.0/24 in SSH host certificates on authority level
```shell
$ step ca policy authority ssh host allow ip 192.168.0.0/24
```    

Deny IP address 192.168.0.40 in SSH host certificates on authority level
```shell
$ step ca policy authority ssh host deny ip 192.168.0.40
```    



