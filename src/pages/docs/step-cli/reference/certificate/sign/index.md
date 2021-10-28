---
layout: auto-doc
title: step certificate sign
menu:
  docs:
    parent: step certificate
---

## Name
**step certificate sign** -- sign a certificate signing request (CSR)

## Usage

```raw
step certificate sign <csr_file> <crt_file> <key_file>
[--profile=<profile>] [--template=<file>]
[--password-file=<file>] [--path-len=<maximum>]
[--not-before=<time|duration>] [--not-after=<time|duration>]
[--bundle]
```

## Description

**step certificate sign** generates a signed
certificate from a certificate signing request (CSR).

## Positional arguments

`csr_file`
The path to a certificate signing request (CSR) to be signed.

`crt_file`
The path to an issuing certificate.

`key_file`
The path to a private key for signing the CSR.

## Options


**--profile**=`profile`
The certificate profile sets various certificate details such as
  certificate use and expiration. The default profile is 'leaf' which is suitable
  for a client or server using TLS.

`profile` is a case-sensitive string and must be one of:

- **leaf**: Signs a leaf x.509 certificate suitable for use with TLS.

- **intermediate-ca**: Signs a certificate that can be used to sign additional leaf certificates.

- **csr**: Signs a x.509 certificate without modifying the CSR.

**--template**=`file`
The certificate template `file`, a JSON representation of the certificate to create.

**--password-file**=`file`
The path to the `file` containing the password to encrypt or decrypt the private key.

**--not-before**=`time|duration`
The `time|duration` set in the NotBefore property of the certificate. If a
`time` is used it is expected to be in RFC 3339 format. If a `duration` is
used, it is a sequence of decimal numbers, each with optional fraction and a
unit suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".

**--not-after**=`time|duration`
The `time|duration` set in the NotAfter property of the certificate. If a
`time` is used it is expected to be in RFC 3339 format. If a `duration` is
used, it is a sequence of decimal numbers, each with optional fraction and a
unit suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".

**--path-len**=`maximum`
The `maximum` path length to set in the pathLenConstraint of an intermediate-ca.
Defaults to 0. If it's set to -1 no path length limit is imposed.

**--bundle**
Bundle the new leaf certificate with the signing certificate.

## Exit codes

This command returns 0 on success and >0 if any error occurs.

## Examples

Sign a certificate signing request using the leaf profile:
```shell
$ step certificate sign leaf.csr issuer.crt issuer.key
# or
$ step certificate sign --profile leaf leaf.csr issuer.crt issuer.key
```

Sign a CSR and bundle the new certificate with the issuer:
```shell
$ step certificate sign --bundle leaf.csr issuer.crt issuer.key
```

Sign a CSR with custom validity and bundle the new certificate with the issuer:
```shell
$ step certificate sign --bundle --not-before -1m --not-after 16h leaf.csr issuer.crt issuer.key
```

Sign an intermediate ca:
```shell
$ step certificate sign --profile intermediate-ca intermediate.csr issuer.crt issuer.key
```

Sign an intermediate ca that can sign other intermediates; in this example, the
issuer must set the pathLenConstraint at least to 2 or without a limit:
```shell
$ step certificate sign --profile intermediate-ca --path-len 1 intermediate.csr issuer.crt issuer.key
```

Sign a CSR but only use information present in it, it doesn't add any key or
extended key usages if they are not in the CSR.
```shell
$ step certificate sign --profile csr test.csr issuer.crt issuer.key
```

Sign a CSR with only clientAuth as key usage using a template:
```shell
$ cat coyote.tpl
{
  "subject": {
    "country": "US",
        "organization": "Coyote Corporation",
        "commonName": "{{ .Subject.CommonName }}"
  },
  "emailAddresses": {{ toJson .Insecure.CR.EmailAddresses }},
  "keyUsage": ["digitalSignature"],
  "extKeyUsage": ["clientAuth"]
}
$ step certificate create --csr coyote@acme.corp coyote.csr coyote.key
$ step certificate sign --template coyote.tpl coyote.csr issuer.crt issuer.key
```

