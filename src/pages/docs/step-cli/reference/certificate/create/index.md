---
layout: auto-doc
title: step certificate create
menu:
  docs:
    parent: step certificate
---

## Name
**step certificate create** -- create a certificate or certificate signing request

## Usage

```raw
step certificate create <subject> <crt-file> <key-file>
[--csr] [--profile=<profile>] [--template=<file>]
[--not-before=<duration>] [--not-after=<duration>]
[--password-file=<file>] [--ca=<issuer-cert>]
[--ca-key=<issuer-key>] [--ca-password-file=<file>]
[--san=<SAN>] [--bundle] [--key=<file>]
[--kty=<type>] [--curve=<curve>] [--size=<size>]
[--no-password] [--insecure]
```

## Description

**step certificate create** generates a certificate or a
certificate signing request (CSR) that can be signed later using 'step
certificate sign' (or some other tool) to produce a certificate.

By default this command creates x.509 certificates or CSRs for use with TLS. If
you need something else, you can customize the output using templates. See **TEMPLATES** below.

## Positional arguments

`subject`
The subject of the certificate. Typically this is a hostname for services or an email address for people.

`crt-file`
File to write CRT or CSR to (PEM format)

`key-file`
File to write private key to (PEM format). This argument is optional if **--key** is passed.

## Options


**--csr**
Generate a certificate signing request (CSR) instead of a certificate.

**--profile**=`profile`
The certificate profile sets various certificate details such as
  certificate use and expiration. The default profile is 'leaf' which is suitable
  for a client or server using TLS.

`profile` is a case-sensitive string and must be one of:

- **leaf**: Generate a leaf x.509 certificate suitable for use with TLS.

- **intermediate-ca**: Generate a certificate that can be used to sign additional leaf certificates.

- **root-ca**: Generate a new self-signed root certificate suitable for use as a root CA.

- **self-signed**: Generate a new self-signed leaf certificate suitable for use with TLS.
  This profile requires the **--subtle** flag because the use of self-signed leaf
  certificates is discouraged unless absolutely necessary.

**--template**=`file`
The certificate template `file`, a JSON representation of the certificate to create.

**--password-file**=`file`
The `file` to the file containing the password to
encrypt the new private key or decrypt the user submitted private key.

**--ca**=`value`
The certificate authority used to issue the new certificate (PEM file).

**--ca-key**=`value`
The certificate authority private key used to sign the new certificate (PEM file).

**--ca-password-file**=`file`
The `file` to the file containing the password to
decrypt the CA private key.

**--key**=`file`
The `file` of the private key to use instead of creating a new one (PEM file).

**--no-password**
Do not ask for a password to encrypt the private key.
Sensitive key material will be written to disk unencrypted. This is not
recommended. Requires **--insecure** flag.

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

**--san**=`value`
Add DNS or IP Address Subjective Alternative Names (SANs). Use the '--san'
flag multiple times to configure multiple SANs.

**--bundle**
Bundle the new leaf certificate with the signing certificate. This flag requires
the **--ca** flag.

**--kty**=`kty`
The `kty` to build the certificate upon.
If unset, default is EC.

`kty` is a case-sensitive string and must be one of:

- **EC**: Create an **elliptic curve** keypair

- **OKP**: Create an octet key pair (for **"Ed25519"** curve)

- **RSA**: Create an **RSA** keypair

**--size**=`size`
The `size` (in bits) of the key for RSA and oct key types. RSA keys require a
minimum key size of 2048 bits. If unset, default is 2048 bits for RSA keys and 128 bits for oct keys.

**--crv**=`curve`, **--curve**=`curve`
The elliptic `curve` to use for EC and OKP key types. Corresponds
to the **"crv"** JWK parameter. Valid curves are defined in JWA [RFC7518]. If
unset, default is P-256 for EC keys and Ed25519 for OKP keys.

`curve` is a case-sensitive string and must be one of:

- **P-256**: NIST P-256 Curve

- **P-384**: NIST P-384 Curve

- **P-521**: NIST P-521 Curve

- **Ed25519**: Ed25519 Curve

**-f**, **--force**
Force the overwrite of files without asking.

**--subtle**


## Exit codes

This command returns 0 on success and >0 if any error occurs.

## Templates

With templates, you can customize the generated certificate or CSR.
Templates are JSON files representing a [certificate](https://pkg.go.dev/go.step.sm/crypto/x509util?tab=doc#Certificate) [1]
or a [certificate request](https://pkg.go.dev/go.step.sm/crypto/x509util?tab=doc#CertificateRequest) [2].
They use Golang's [`text/template`](https://golang.org/pkg/text/template/) package [3] and
[`Sprig`](https://masterminds.github.io/sprig/) functions [4].

Here's the default template used for generating a leaf certificate:
```shell
{
  "subject": {{ toJson .Subject }},
  "sans": {{ toJson .SANs }},
{{- if typeIs "*sa.PublicKey" .Insecure.CR.PublicKey }}
  "keyUsage": ["keyEncipherment", "digitalSignature"],
{{- else }}
  "keyUsage": ["digitalSignature"],
{{- end }}
  "extKeyUsage": ["serverAuth", "clientAuth"]
}
```

And this is the default template for a CSR:
```shell
{
  "subject": {{ toJson .Subject }},
  "sans": {{ toJson .SANs }}
}
```

In a custom template, you can change the **subject**, **dnsNames**,
**emailAddresses**, **ipAddresses**, and **uris**, and you can add custom
x.509 **extensions** or set the **signatureAlgorithm**.

For certificate templates, the common extensions **keyUsage**, **extKeyUsage**, and
**basicConstraints** are also represented as JSON fields.

Two variables are available in templates: **.Subject** contains the `subject` argument,
and **.SANs** contains the SANs provided with the **--san** flag.

Both .Subject and .SANs are objects, and they must be converted to JSON to be used in
the template, you can do this using Sprig's **toJson** function. On the .Subject
object you can access the common name string using the template variable
**.Subject.CommonName**. In **EXAMPLES** below, you can see how these
variables are used in a certificate request.

For more information on the template properties and functions see:
```raw
[1] https://pkg.go.dev/go.step.sm/crypto/x509util?tab=doc#Certificate
[2] https://pkg.go.dev/go.step.sm/crypto/x509util?tab=doc#CertificateRequest
[3] https://golang.org/pkg/text/template/
[4] https://masterminds.github.io/sprig/
```

## Examples

Create a CSR and key:

```shell
$ step certificate create foo foo.csr foo.key --csr
```

Create a CSR using an existing private key:

```shell
$ step certificate create --csr --key key.priv foo foo.csr
```

Create a CSR using an existing encrypted private key:

```shell
$ step certificate create --csr --key key.priv --password-file key.pass foo foo.csr
```

Create a CSR and key with custom Subject Alternative Names:

```shell
$ step certificate create foo foo.csr foo.key --csr \
  --san inter.smallstep.com --san 1.1.1.1 --san ca.smallstep.com
```

Create a CSR and key - do not encrypt the key when writing to disk:

```shell
$ step certificate create foo foo.csr foo.key --csr --no-password --insecure
```

Create a root certificate and key:

```shell
$ step certificate create root-ca root-ca.crt root-ca.key --profile root-ca
```

Create an intermediate certificate and key:

```shell
$ step certificate create intermediate-ca intermediate-ca.crt intermediate-ca.key \
  --profile intermediate-ca --ca ./root-ca.crt --ca-key ./root-ca.key
```

Create a leaf certificate and key:

```shell
$ step certificate create foo foo.crt foo.key --profile leaf \
  --ca ./intermediate-ca.crt --ca-key ./intermediate-ca.key
```

Create a leaf certificate and encrypt the private key:

```shell
$ step certificate create foo foo.crt foo.key --profile leaf \
   --password-file ./leaf.pass \
   --ca ./intermediate-ca.crt --ca-key ./intermediate-ca.key
```

Create a leaf certificate and decrypt the CA private key:

```shell
$ step certificate create foo foo.crt foo.key --profile leaf \
   --ca ./intermediate-ca.crt --ca-key ./intermediate-ca.key --ca-password-file ./intermediate.pass
```

Create a leaf certificate and key with custom Subject Alternative Names:

```shell
$ step certificate create foo foo.crt foo.key --profile leaf \
  --ca ./intermediate-ca.crt --ca-key ./intermediate-ca.key \
  --san inter.smallstep.com --san 1.1.1.1 --san ca.smallstep.com
```

Create a leaf certificate and key with custom validity:

```shell
$ step certificate create foo foo.crt foo.key --profile leaf \
  --ca ./intermediate-ca.crt --ca-key ./intermediate-ca.key \
  --not-before 24h --not-after 2160h
```

Create a self-signed leaf certificate and key:

```shell
$ step certificate create self-signed-leaf.local leaf.crt leaf.key --profile self-signed --subtle
```

Create a root certificate and key with underlying OKP Ed25519:

```shell
$ step certificate create root-ca root-ca.crt root-ca.key --profile root-ca \
  --kty OKP --curve Ed25519
```

Create an intermediate certificate and key with underlying EC P-256 key pair:

```shell
$ step certificate create intermediate-ca intermediate-ca.crt intermediate-ca.key \
  --profile intermediate-ca --ca ./root-ca.crt --ca-key ./root-ca.key --kty EC --curve P-256
```

Create a leaf certificate and key with underlying RSA 2048 key pair:

```shell
$ step certificate create foo foo.crt foo.key --profile leaf \
  --ca ./intermediate-ca.crt --ca-key ./intermediate-ca.key --kty RSA --size 2048
```

Create a CSR and key with underlying OKP Ed25519:

```shell
$ step certificate create foo foo.csr foo.key --csr --kty OKP --curve Ed25519
```

Create a root certificate using a custom template. The root certificate will
have a path length constraint that allows at least 2 intermediates:
```shell
$ cat root.tpl
{
  "subject": {
    "commonName": "Acme Corporation Root CA"
  },
  "issuer": {
    "commonName": "Acme Corporation Root CA"
  },
  "keyUsage": ["certSign", "crlSign"],
  "basicConstraints": {
    "isCA": true,
    "maxPathLen": 2
  }
}
$ step certificate create --template root.tpl \
  "Acme Corporation Root CA" root_ca.crt root_ca_key
```

Create an intermediate certificate using the previous root. This intermediate
will be able to sign also new intermediate certificates:
```shell
$ cat intermediate.tpl
{
  "subject": {
    "commonName": "Acme Corporation Intermediate CA"
  },
  "keyUsage": ["certSign", "crlSign"],
  "basicConstraints": {
    "isCA": true,
    "maxPathLen": 1
  }
}
$ step certificate create --template intermediate.tpl \
  --ca root_ca.crt --ca-key root_ca_key \
  "Acme Corporation Intermediate CA" intermediate_ca.crt intermediate_ca_key
```

Sign a new intermediate using the previous intermediate, now with path
length 0 using the **--profile** flag:
```shell
$ step certificate create --profile intermediate-ca \
  --ca intermediate_ca.crt --ca-key intermediate_ca_key \
  "Coyote Corporation" coyote_ca.crt coyote_ca_key
```

Create a leaf certificate, that is the default profile and bundle it with
the two intermediate certificates and validate it:
```shell
$ step certificate create --ca coyote_ca.crt --ca-key coyote_ca_key \
  "coyote@acme.corp" leaf.crt coyote.key
$ cat leaf.crt coyote_ca.crt intermediate_ca.crt > coyote.crt
$ step certificate verify --roots root_ca.crt coyote.crt
```

Create a certificate request using a template:
```shell
$ cat csr.tpl
{
    "subject": {
        "country": "US",
        "organization": "Coyote Corporation",
        "commonName": "{{ .Subject.CommonName }}"
    },
  "sans": {{ toJson .SANs }}
}
$ step certificate create --csr --template csr.tpl --san coyote@acme.corp \
  "Wile E. Coyote" coyote.csr coyote.key
```

