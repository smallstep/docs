---
layout: auto-doc
title: step ssh config
menu:
  docs:
    parent: step ssh
---

## Name
**step ssh config** -- configures ssh to be used with certificates

## Usage

```raw
step ssh config
[--team=<name>] [--host] [--set=<key=value>] [--set-file=<file>]
[--dry-run] [--roots] [--federation]
[--force] [--ca-url=<uri>] [--root=<file>]
[--offline] [--ca-config=<file>] [--team-url=<url>]
```

## Description

**step ssh config** configures SSH to be used with certificates. It also supports
flags to inspect the root certificates used to sign the certificates.

This command uses the templates defined in step-certificates to set up user and
hosts environments.

## Options


**--host**
Configures a SSH server instead of a client.

**--team**=`ID`
The team `ID` used to bootstrap the environment.

**--team-url**=`url`
The `url` step queries to retrieve initial team configuration. Only used with
the **--team** option. If the url contains `<>` placeholders, they are replaced with the team ID.

**--roots**
Prints the public keys used to verify user or host certificates.

**--federation**
Prints all the public keys in the federation. These keys are used to verify
user or host certificates

**--set**=`key=value`
The `key=value` used as a variable in the templates. Use the flag multiple
times to set multiple variables.

**--set-file**=`file`
The JSON `file` with the template data to send to the CA.

**--dry-run**
Executes the command without changing any file.

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--offline**
Creates a certificate without contacting the certificate authority. Offline mode
uses the configuration, certificates, and keys created with **step ca init**,
but can accept a different configuration file using **--ca-config** flag.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$STEPPATH/config/ca.json

**-f**, **--force**
Force the overwrite of files without asking.

## Examples

Print the public keys used to verify user certificates:
```shell
$ step ssh config --roots
```

Print the public keys used to verify host certificates:
```shell
$ step ssh config --host --roots
```

Apply configuration templates on the user system:
```shell
$ step ssh config
```

Apply configuration templates on a host:
```shell
$ step ssh config --host
```

Apply configuration templates with custom variables:
```shell
$ step ssh config --set User=joe --set Bastion=bastion.example.com
```

