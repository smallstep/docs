---
layout: auto-doc
category: reference
title: step certificate
menu:
  docs:
    parent: step
    children:
      - bundle
      - create
      - format
      - inspect
      - fingerprint
      - lint
      - needs-renewal
      - sign
      - verify
      - key
      - install
      - uninstall
      - p12
---

## Name
**step certificate** -- create, revoke, validate, bundle, and otherwise manage certificates

## Usage

```raw
step certificate SUBCOMMAND [ARGUMENTS] [GLOBAL_FLAGS] [SUBCOMMAND_FLAGS]
```

## Description

**step certificate** command group provides facilities for creating
certificate signing requests (CSRs), creating self-signed certificates
(e.g., for use as a root certificate authority), generating leaf or
intermediate CA certificate by signing a CSR, validating certificates,
renewing certificates, generating certificate bundles, and key-wrapping
of private keys.

## Examples

Create a root certificate and private key using the default parameters (EC P-256 curve):
```shell
$ step certificate create foo foo.crt foo.key --profile root-ca
```

Create a leaf certificate and private key using the default parameters (EC P-256 curve):
```shell
$ step certificate create baz baz.crt baz.key --ca ./foo.crt --ca-key ./foo.key
```

Create a CSR and private key using the default parameters (EC P-256 curve):
```shell
$ step certificate create zap zap.csr zap.key --csr
```

Sign a CSR and generate a signed certificate:
```shell
$ step certificate sign zap.csr foo.crt foo.key
```

Inspect the contents of a certificate:
```shell
$ step certificate inspect ./baz.crt
```

Verify the signature of a certificate:
```shell
$ step certificate verify ./baz.crt --roots ./foo.crt
```

Lint the contents of a certificate to check for common errors and missing fields:
```shell
$ step certificate lint ./baz.crt
```

Bundle an end certificate with the issuing certificate:
```shell
$ step certificate bundle ./baz.crt ./foo.crt bundle.crt
```

Convert PEM format certificate to DER and write to disk.
```shell
$ step certificate format foo.pem --out foo.der
```

Extract the public key from a PEM encoded certificate:
```shell
$ step certificate key foo.crt
```

Install a root certificate in the system truststore:
```shell
$ step certificate install root-ca.crt
```

Uninstall a root certificate from the system truststore:
```shell
$ step certificate uninstall root-ca.crt
```

## Commands


| Name | Usage |
|---|---|
| **[bundle](bundle/)** | bundle a certificate with intermediate certificate(s) needed for certificate path validation |
| **[create](create/)** | create a certificate or certificate signing request |
| **[format](format/)** | reformat certificate |
| **[inspect](inspect/)** | print certificate or CSR details in human readable format |
| **[fingerprint](fingerprint/)** | print the fingerprint of a certificate |
| **[lint](lint/)** | lint certificate details |
| **[needs-renewal](needs-renewal/)** | Check if a certificate needs to be renewed |
| **[sign](sign/)** | sign a certificate signing request (CSR) |
| **[verify](verify/)** | verify a certificate |
| **[key](key/)** | print public key embedded in a certificate |
| **[install](install/)** | install a root certificate in the system truststore |
| **[uninstall](uninstall/)** | uninstall a root certificate from the system truststore |
| **[p12](p12/)** | package a certificate and keys into a .p12 file |

