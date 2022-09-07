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
[--team=<name>] [--team-authority=<sub-domain>] [--host]
[--set=<key=value>] [--set-file=<file>] [--dry-run] [--roots]
[--federation] [--force] [--offline] [--ca-config=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>]
[--authority=<name>] [--profile=<name>]
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

**--team-authority**=`sub-domain`
The `sub-domain` of the certificate authority to bootstrap. E.g., for an authority with
domain name 'certs.example-team.ca.smallstep.com' the value would be 'certs'.

**--team-url**=`url`
The `url` step queries to retrieve initial team configuration. Only used with
the **--team** option. If the url contains `<>` placeholders, they are replaced with the team ID.
Replacing the authority-id section of the url is not supported with placeholders.

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

**-f**, **--force**
Force the overwrite of files without asking.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$(step path)/config/ca.json

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--offline**
Creates a certificate without contacting the certificate authority. Offline mode
uses the configuration, certificates, and keys created with **step ca init**,
but can accept a different configuration file using **--ca-config** flag.

**--context**=`name`
The `name` of the context for the new authority.

**--profile**=`name`
The `name` that will serve as the profile name for the context.

**--authority**=`name`
The `name` that will serve as the authority name for the context.

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

