---
layout: auto-doc
title: step ca certificate
menu:
  docs:
    parent: step ca
---

## Name
**step ca certificate** -- generate a new private key and certificate signed by the root certificate

## Usage

```raw
step ca certificate <subject> <crt-file> <key-file>
[--token=<token>]  [--issuer=<name>] [--provisioner-password-file=<file>]
[--not-before=<time|duration>] [--not-after=<time|duration>]
[--san=<SAN>] [--set=<key=value>] [--set-file=<file>]
[--acme=<file>] [--standalone] [--webroot=<file>]
[--contact=<email>] [--http-listen=<address>] [--bundle]
[--kty=<type>] [--curve=<curve>] [--size=<size>] [--console]
[--x5c-cert=<file>] [--x5c-key=<file>] [--k8ssa-token-path=<file>]
[--offline] [--password-file] [--ca-url=<uri>] [--root=<file>]
[--context=<name>]
```

## Description

**step ca certificate** command generates a new certificate pair

## Positional arguments

`subject`
The Common Name, DNS Name, or IP address that will be set as the
Subject Common Name for the certificate. If no Subject Alternative Names (SANs)
are configured (via the --san flag) then the `subject` will be set as the only SAN.

`crt-file`
File to write the certificate (PEM format)

`key-file`
File to write the private key (PEM format)

## Options


**--san**=`dns|ip|email|uri`
Add `dns|ip|email|uri` Subject Alternative Name(s) (SANs)
that should be authorized. Use the '--san' flag multiple times to configure
multiple SANs. The '--san' flag and the '--token' flag are mutually exclusive.

**--set**=`key=value`
The `key=value` pair with template data variables to send to the CA. Use the **--set** flag multiple times to add multiple variables.

**--set-file**=`file`
The JSON `file` with the template data to send to the CA.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$(step path)/config/ca.json

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--token**=`token`
The one-time `token` used to authenticate with the CA in order to create the
certificate.

**--context**=`name`
The context `name` to apply for the given command.

**--provisioner**=`name`, **--issuer**=`name`
The provisioner `name` to use.

**--provisioner-password-file**=`file`
The path to the `file` containing the password to decrypt the one-time token
generating key.

**--kty**=`kty`
The `kty` to build the certificate upon.
If unset, default is EC.

`kty` is a case-sensitive string and must be one of:

- **EC**: Create an **elliptic curve** keypair

- **OKP**: Create an octet key pair (for **"Ed25519"** curve)

- **RSA**: Create an **RSA** keypair

**--crv**=`curve`, **--curve**=`curve`
The elliptic `curve` to use for EC and OKP key types. Corresponds
to the **"crv"** JWK parameter. Valid curves are defined in JWA [RFC7518]. If
unset, default is P-256 for EC keys and Ed25519 for OKP keys.

`curve` is a case-sensitive string and must be one of:

- **P-256**: NIST P-256 Curve

- **P-384**: NIST P-384 Curve

- **P-521**: NIST P-521 Curve

- **Ed25519**: Ed25519 Curve

**--size**=`size`
The `size` (in bits) of the key for RSA and oct key types. RSA keys require a
minimum key size of 2048 bits. If unset, default is 2048 bits for RSA keys and 128 bits for oct keys.

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

## Examples

Request a new certificate for a given domain. There are no additional SANs
configured, therefore (by default) the `subject` will be used as the only
SAN extension: DNS Name internal.example.com:
```shell
$ TOKEN=$(step ca token internal.example.com)
$ step ca certificate --token $TOKEN internal.example.com internal.crt internal.key
```

Request a new certificate with multiple Subject Alternative Names. The Subject
Common Name of the certificate will be 'foobar'. However, because additional SANs are
configured using the --san flag and 'foobar' is not one of these, 'foobar' will
not be in the SAN extensions of the certificate. The certificate will have 2
IP Address extensions (1.1.1.1, 10.2.3.4) and 1 DNS Name extension (hello.example.com):
```shell
$ step ca certificate --san 1.1.1.1 --san hello.example.com --san 10.2.3.4 foobar internal.crt internal.key
```

Request a new certificate with a 1h validity:
```shell
$ TOKEN=$(step ca token internal.example.com)
$ step ca certificate --token $TOKEN --not-after=1h internal.example.com internal.crt internal.key
```

Request a new certificate using the offline mode, requires the configuration
files, certificates, and keys created with **step ca init**:
```shell
$ step ca certificate --offline internal.example.com internal.crt internal.key
```

Request a new certificate using the offline mode with additional flags to avoid
console prompts:
```shell
$ step ca certificate --offline \
  --password-file ./pass.txt \
  --provisioner foo \
  --provisioner-password-file ./provisioner-pass.txt \
  internal.example.com internal.crt internal.key
```

Request a new certificate using an OIDC provisioner:
```shell
$ step ca certificate --token $(step oauth --oidc --bare) joe@example.com joe.crt joe.key
```

Request a new certificate using an OIDC provisioner while remaining in the console:
```shell
$ step ca certificate joe@example.com joe.crt joe.key --issuer Google --console
```

Request a new certificate with an RSA public key (default is ECDSA256):
```shell
$ step ca certificate foo.internal foo.crt foo.key --kty RSA --size 4096
```

Request a new certificate with an X5C provisioner:
```shell
$ step ca certificate foo.internal foo.crt foo.key --x5c-cert x5c.cert --x5c-key x5c.key
```

**Certificate Templates** - With a provisioner configured with a custom
template we can use the **--set** flag to pass user variables:
```shell
$ step ca certificate foo.internal foo.crt foo.key --set emailAddresses=root@internal.com
$ step ca certificate foo.internal foo.crt foo.key --set emailAddresses='["foo@internal.com","root@internal.com"]'
```

Or you can pass them from a file using **--set-file**:
```shell
$ cat path/to/data.json
{
  "emailAddresses": ["foo@internal.com","root@internal.com"]
}
$ step ca certificate foo.internal foo.crt foo.key --set-file path/to/data.json
```

**step CA ACME** - In order to use the step CA ACME protocol you must add a
ACME provisioner to the step CA config. See **step ca provisioner add -h**.

Request a new certificate using the step CA ACME server and a standalone server
to serve the challenges locally (standalone mode is the default):
```shell
$ step ca certificate foobar foo.crt foo.key --provisioner my-acme-provisioner --san foo.internal --san bar.internal
```

Request a new certificate using the step CA ACME server and an existing server
along with webroot mode to serve the challenges locally:
```shell
$ step ca certificate foobar foo.crt foo.key --provisioner my-acme-provisioner --webroot "./acme-www" \
--san foo.internal --san bar.internal
```

Request a new certificate using the ACME protocol not served via the step CA
(e.g. letsencrypt). NOTE: Let's Encrypt requires that the Subject Common Name
of a requested certificate be validated as an Identifier in the ACME order along
with any other SANS. Therefore, the Common Name must be a valid DNS Name. The
step CA does not impose this requirement.
```shell
$ step ca certificate foo.internal foo.crt foo.key \
--acme https://acme-staging-v02.api.letsencrypt.org/directory --san bar.internal
```

