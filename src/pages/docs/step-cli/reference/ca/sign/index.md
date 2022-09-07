---
layout: auto-doc
title: step ca sign
menu:
  docs:
    parent: step ca
---

## Name
**step ca sign** -- generate a new certificate signing a certificate request

## Usage

```raw
step ca sign <csr-file> <crt-file>
[--token=<token>] [--issuer=<name>] [--provisioner-password-file=<file>]
[--not-before=<time|duration>] [--not-after=<time|duration>]
[--set=<key=value>] [--set-file=<file>]
[--acme=<uri>] [--standalone] [--webroot=<file>]
[--contact=<email>] [--http-listen=<address>] [--console]
[--x5c-cert=<file>] [--x5c-key=<file>] [--k8ssa-token-path=<file>]
[--offline] [--password-file=<file>] [--ca-url=<uri>]
[--root=<file>] [--context=<name>]
```

## Description

**step ca sign** command signs the given csr and generates a new certificate.

## Positional arguments

`csr-file`
File with the certificate signing request (PEM format)

`crt-file`
File to write the certificate (PEM format)

## Options


**--token**=`token`
The one-time `token` used to authenticate with the CA in order to create the
certificate.

**--provisioner**=`name`, **--issuer**=`name`
The provisioner `name` to use.

**--provisioner-password-file**=`file`
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
The `key=value` pair with template data variables to send to the CA. Use the **--set** flag multiple times to add multiple variables.

**--set-file**=`file`
The JSON `file` with the template data to send to the CA.

**-f**, **--force**
Force the overwrite of files without asking.

**--offline**
Creates a certificate without contacting the certificate authority. Offline mode
uses the configuration, certificates, and keys created with **step ca init**,
but can accept a different configuration file using **--ca-config** flag.

**--password-file**=`file`
The path to the `file` containing the password to encrypt or decrypt the private key.

**--console**
Complete the flow while remaining inside the terminal

**--x5c-cert**=`chain`
Certificate (`chain`) in PEM format to store in the 'x5c' header of a JWT.

**--x5c-key**=`file`
Private key `file`, used to sign a JWT, corresponding to the certificate that will
be stored in the 'x5c' header.

**--nebula-cert**=`file`
Certificate `file` in PEM format to store in the 'nebula' header of a JWT.

**--nebula-key**=`file`
Private key `file`, used to sign a JWT, corresponding to the certificate that will
be stored in the 'nebula' header.

**--acme**=`url`
ACME directory `url` to be used for requesting certificates via the ACME protocol.
Use this flag to define an ACME server other than the Step CA. If this flag is
absent and an ACME provisioner has been selected then the '--ca-url' flag must be defined.

**--standalone**
Get a certificate using the ACME protocol and standalone mode for validation.
Standalone is a mode in which the step process will run a server that will
will respond to ACME challenge validation requests. Standalone is the default
mode for serving challenge validation requests.

**--webroot**=`file`
Specify a `file` to use as a 'web root' for validation in the ACME protocol.
Webroot is a mode in which the step process will write a challenge file to a
location being served by an existing fileserver in order to respond to ACME
challenge validation requests.

**--contact**=`email-address`
The `email-address` used for contact as part of the ACME protocol. These contacts
may be used to warn of certificate expiration or other certificate lifetime events.
Use the '--contact' flag multiple times to configure multiple contacts.

**--http-listen**=`address`
Use a non-standard http `address`, behind a reverse proxy or load balancer, for
serving ACME challenges. The default address is :80, which requires super user
(sudo) privileges. This flag must be used in conjunction with the '--standalone'
flag.

**--k8ssa-token-path**=`file`
Configure the `file` from which to read the kubernetes service account token.

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

Sign a new certificate for the given CSR:
```shell
$ TOKEN=$(step ca token internal.example.com)
$ step ca sign --token $TOKEN internal.csr internal.crt
```

Sign a new certificate with a 1h validity:
```shell
$ TOKEN=$(step ca token internal.example.com)
$ step ca sign --token $TOKEN --not-after=1h internal.csr internal.crt
```

Sign a new certificate using the offline mode, requires the configuration
files, certificates, and keys created with **step ca init**:
```shell
$ step ca sign --offline internal internal.csr internal.crt
```

Sign a new certificate using the offline mode with additional flag to avoid
console prompts:
```shell
$ step ca sign --offline --password-file ./pass.txt internal internal.csr internal.crt
```

Sign a new certificate using an X5C provisioner:
NOTE: You must have a X5C provisioner configured (using **step ca provisioner add**).
```shell
$ step ca sign foo.internal foo.csr foo.crt --x5c-cert leaf-x5c.crt --x5c-key leaf-x5c.key
```

**Certificate Templates** - With a provisioner configured with a custom
template we can use the **--set** flag to pass user variables:
```shell
$ step ca sign foo.csr foo.crt --set dnsNames=foo.internal.com
$ step ca sign foo.csr foo.crt --set dnsNames='["foo.internal.com","bar.internal.com"]'
```

Or you can pass them from a file using **--set-file**:
```shell
$ cat path/to/data.json
{
  "dnsNames": ["foo.internal.com","bar.internal.com"]
}
$ step ca sign foo.csr foo.crt --set-file path/to/data.json
```

**step CA ACME** - In order to use the step CA ACME protocol you must add a
ACME provisioner to the step CA config. See **step ca provisioner add -h**.

Sign a CSR using the step CA ACME server and a standalone server
to serve the challenges locally (standalone mode is the default):
```shell
$ step ca sign foo.csr foo.crt --provisioner my-acme-provisioner
```

Sign a CSR using the step CA ACME server and an existing server
along with webroot mode to serve the challenges locally:
```shell
$ step ca sign foo.csr foo.crt \
  --provisioner my-acme-provisioner --webroot "./acme-www" \
```

Sign a CSR using the ACME protocol served by another online CA (not step CA,
e.g. letsencrypt). NOTE: Let's Encrypt requires that the Subject Common Name
of a requested certificate be validated as an Identifier in the ACME order along
with any other SANS. Therefore, the Common Name must be a valid DNS Name. The
step CA does not impose this requirement.
```shell
$ step ca sign foo.csr foo.crt \
--acme https://acme-staging-v02.api.letsencrypt.org/directory
```

