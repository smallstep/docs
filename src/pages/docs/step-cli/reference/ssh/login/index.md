---
layout: auto-doc
title: step ssh login
menu:
  docs:
    parent: step ssh
---

## Name
**step ssh login** -- adds a SSH certificate into the authentication agent

## Usage

```raw
step ssh login [<identity>]
[--token=<token>] [--provisioner=<name>] [--provisioner-password-file=<file>]
[--principal=<string>] [--not-before=<time|duration>] [--not-after=<time|duration>]
[--set=<key=value>] [--set-file=<file>] [--force]
[--offline] [--ca-config=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>]
```

## Description

**step ssh login** generates a new SSH key pair and send a request to [step
certificates](https://github.com/smallstep/certificates) to sign a user
certificate. This certificate will be automatically added to the SSH agent.

With a certificate servers may trust only the CA key and verify its signature on
a certificate rather than trusting many user keys.

## Positional arguments

`identity`
The certificate identity. If no principals are passed we will use
the identity as a principal, if it has the format abc@def then the
principal will be abc.

## Options


**--token**=`token`
The one-time `token` used to authenticate with the CA in order to create the
certificate.

**--add-user**
Create a user provisioner certificate used to create a new user.

**--principal**=`value`, **-n**=`value`
Add the specified principal (username) to the certificate request.
      This flag can be used multiple times. However, it cannot be used in conjunction
      with '--token' when requesting certificates from OIDC, JWK, and X5C provisioners, or
      from any provisioner with 'disableCustomSANs' set to 'true'. These provisioners will
      use the contents of the token to determine the principals.

**--identity**=`value`
The certificate identity. It is usually passed as a positional argument, but a
flag exists so it can be configured in $STEPPATH/config/defaults.json.

**--provisioner**=`name`, **--issuer**=`name`
The provisioner `name` to use.

**--provisioner-password-file**=`file`, **--password-file**=`file`
The path to the `file` containing the password to decrypt the one-time token
generating key.

**--not-before**=`time|duration`
The `time|duration` when the certificate validity period starts. If a `time` is
used it is expected to be in RFC 3339 format. If a `duration` is used, it is a
sequence of decimal numbers, each with optional fraction and a unit suffix, such
as "300ms", "-1.5h" or "2h45m". Valid time units are "ns", "us" (or "µs"), "ms",
"s", "m", "h".

**--not-after**=`time|duration`
The `time|duration` when the certificate validity period ends. If a `time` is
used it is expected to be in RFC 3339 format. If a `duration` is used, it is a
sequence of decimal numbers, each with optional fraction and a unit suffix, such
as "300ms", "-1.5h" or "2h45m". Valid time units are "ns", "us" (or "µs"), "ms",
"s", "m", "h".

**--set**=`key=value`
The `key=value` pair with template data variables. Use the **--set** flag multiple times to add multiple variables.

**--set-file**=`file`
The JSON `file` with the template data variables.

**-f**, **--force**
Force the overwrite of files without asking.

**--offline**
Creates a certificate without contacting the certificate authority. Offline mode
uses the configuration, certificates, and keys created with **step ca init**,
but can accept a different configuration file using **--ca-config** flag.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$(step path)/config/ca.json

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--context**=`name`
The context `name` to apply for the given command.

## Examples

Request a new SSH certificate and add it to the agent:
```shell
$ step ssh login bob
```

Request a new SSH certificate using an OIDC provisioner:
```shell
$ step ssh login
```

Request a new SSH certificate valid only for 1h:
```shell
$ step ssh login --not-after 1h alice
```

Request a new SSH certificate with multiple principals:
```shell
$ step ssh login --principal admin --principal bob bob@smallstep.com
```

