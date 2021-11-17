---
layout: auto-doc
title: step ca token
menu:
  docs:
    parent: step ca
---

## Name
**step ca token** -- generate an OTT granting access to the CA

## Usage

```raw
step ca token <subject>
[--kid=<kid>] [--issuer=<name>]
[--cert-not-before=<time|duration>] [--cert-not-after=<time|duration>]
[--not-before=<time|duration>] [--not-after=<time|duration>]
[--password-file=<file>] [--provisioner-password-file=<file>]
[--output-file=<file>] [--key=<file>] [--san=<SAN>] [--offline]
[--revoke] [--x5c-cert=<file>] [--x5c-key=<file>]
[--sshpop-cert=<file>] [--sshpop-key=<file>]
[--ssh] [--host] [--principal=<name>] [--k8ssa-token-path=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>]
```

## Description

**step ca token** command generates a one-time token granting access to the
certificates authority.

## Positional arguments

`subject`
The Common Name, DNS Name, or IP address that will be set by the certificate authority.
When there are no additional Subject Alternative Names configured (via the
--san flag), the subject will be added as the only element of the 'sans' claim
on the token.

## Options


**--cert-not-after**=`time|duration`
The `time|duration` when the certificate validity period ends. If a `time` is
used it is expected to be in RFC 3339 format. If a `duration` is used, it is a
sequence of decimal numbers, each with optional fraction and a unit suffix, such
as "300ms", "-1.5h" or "2h45m". Valid time units are "ns", "us" (or "µs"), "ms",
"s", "m", "h".

**--cert-not-before**=`time|duration`
The `time|duration` when the certificate validity period starts. If a `time` is
used it is expected to be in RFC 3339 format. If a `duration` is used, it is a
sequence of decimal numbers, each with optional fraction and a unit suffix, such
as "300ms", "-1.5h" or "2h45m". Valid time units are "ns", "us" (or "µs"), "ms",
"s", "m", "h".

**--kid**=`kid`
The provisioner `kid` to use.

**--san**=`dns|ip|email|uri`
Add `dns|ip|email|uri` Subject Alternative Name(s) (SANs)
that should be authorized. A certificate signing request using this token must
match the complete set of SANs in the token 1:1. Use the '--san' flag multiple
times to configure multiple SANs.

**--principal**=`name`, **-n**=`name`
Add the principals (user or host `name`s) that the token is authorized to
request. The signing request using this token won't be able to add
extra names. Use the '--principal' flag multiple times to configure
multiple principals.

**--host**
Create a host certificate instead of a user certificate.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$(step path)/config/ca.json

**-f**, **--force**
Force the overwrite of files without asking.

**--not-after**=`time|duration`
The `time|duration` when the certificate validity period ends. If a `time` is
used it is expected to be in RFC 3339 format. If a `duration` is used, it is a
sequence of decimal numbers, each with optional fraction and a unit suffix, such
as "300ms", "-1.5h" or "2h45m". Valid time units are "ns", "us" (or "µs"), "ms",
"s", "m", "h".

**--not-before**=`time|duration`
The `time|duration` when the certificate validity period starts. If a `time` is
used it is expected to be in RFC 3339 format. If a `duration` is used, it is a
sequence of decimal numbers, each with optional fraction and a unit suffix, such
as "300ms", "-1.5h" or "2h45m". Valid time units are "ns", "us" (or "µs"), "ms",
"s", "m", "h".

**--provisioner**=`name`, **--issuer**=`name`
The provisioner `name` to use.

**--password-file**=`file`
The path to the `file` containing the password to encrypt or decrypt the private key.

**--provisioner-password-file**=`file`
The path to the `file` containing the password to decrypt the one-time token
generating key.

**--x5c-cert**=`chain`
Certificate (`chain`) in PEM format to store in the 'x5c' header of a JWT.

**--x5c-key**=`file`
Private key `file`, used to sign a JWT, corresponding to the certificate that will
be stored in the 'x5c' header.

**--sshpop-cert**=`chain`
Certificate (`chain`) in PEM format to store in the 'sshpop' header of a JWT.

**--sshpop-key**=`file`
Private key `file`, used to sign a JWT, corresponding to the certificate that will
be stored in the 'sshpop' header.

**--key**=`file`
The private key `file` used to sign the JWT. This is usually downloaded from
the certificate authority.

**--output-file**=`file`
The destination `file` of the generated one-time token.

**--revoke**
Create a token for authorizing 'Revoke' requests. The audience will
be invalid for any other API request.

**--renew**
Create a token for authorizing 'renew' requests. The audience will
be invalid for any other API request.

**--rekey**
Create a token for authorizing 'rekey' requests. The audience will
be invalid for any other API request.

**--ssh**
Create a token for authorizing an SSH certificate signing request.

**--k8ssa-token-path**=`file`
Configure the `file` from which to read the kubernetes service account token.

**--offline**
Creates a certificate without contacting the certificate authority. Offline mode
uses the configuration, certificates, and keys created with **step ca init**,
but can accept a different configuration file using **--ca-config** flag.

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--context**=`name`
The context `name` to apply for the given command.

## Examples

 Most of the following examples assumes that **--ca-url** and **--root** are
 set using environment variables or the default configuration file in
 `$STEPPATH/config/defaults.json`.

Get a new token for a DNS. Because there are no Subject Alternative Names
configured (via the '--san' flag), the 'sans' claim of the token will have a
default value of ['internal.example.com']:
```shell
$ step ca token internal.example.com
```

Get a new token for a 'Revoke' request:
```shell
$ step ca token --revoke 146103349666685108195655980390445292315
```

Get a new token for an IP address. Because there are no Subject Alternative Names
configured (via the '--san' flag), the 'sans' claim of the token will have a
default value of ['192.168.10.10']:
```shell
$ step ca token 192.168.10.10
```

Get a new token with custom Subject Alternative Names. The value of the 'sans'
claim of the token will be ['1.1.1.1', 'hello.example.com'] - 'foobar' will not
be in the 'sans' claim unless explicitly configured via the '--san' flag:
```shell
$ step ca token foobar --san 1.1.1.1 --san hello.example.com
```

Get a new token that expires in 30 minutes:
```shell
$ step ca token --not-after 30m internal.example.com
```

Get a new token that becomes valid in 30 minutes and expires 5 minutes after that:
```shell
$ step ca token --not-before 30m --not-after 35m internal.example.com
```

Get a new token signed with the given private key, the public key must be
configured in the certificate authority:
```shell
$ step ca token internal.smallstep.com --key token.key
```

Get a new token for a specific provisioner kid, ca-url and root:
```shell
$ step ca token internal.example.com \
    --kid 4vn46fbZT68Uxfs9LBwHkTvrjEvxQqx-W8nnE-qDjts \
    --ca-url https://ca.example.com \
    --root /path/to/root_ca.crt
```

Get a new token using the simple offline mode, requires the configuration
files, certificates, and keys created with **step ca init**:
```shell
$ step ca token internal.example.com --offline
```

Get a new token using the offline mode with all the parameters:
```shell
$ step ca token internal.example.com \
    --offline \
    --kid 4vn46fbZT68Uxfs9LBwHkTvrjEvxQqx-W8nnE-qDjts \
    --issuer you@example.com \
    --key provisioner.key \
    --ca-url https://ca.example.com \
    --root /path/to/root_ca.crt
```

Get a new token for a 'Revoke' request:
```shell
$ step ca token --revoke 146103349666685108195655980390445292315
```

Get a new token in offline mode for a 'Revoke' request:
```shell
$ step ca token --offline --revoke 146103349666685108195655980390445292315
```

Get a new token for an SSH user certificate:
```shell
$ step ca token max@smallstep.com --ssh
```

Get a new token for an SSH host certificate:
```shell
$ step ca token my-remote.hostname --ssh --host
```

