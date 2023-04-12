---
layout: auto-doc
category: reference
title: step certificate inspect
menu:
  docs:
    parent: step certificate
---

## Name
**step certificate inspect** -- print certificate or CSR details in human readable format

## Usage

```raw
step certificate inspect <crt-file>
[--bundle] [--short] [--format=<format>] [--roots=<root-bundle>]
[--servername=<servername>]
```

## Description

**step certificate inspect** prints the details of a certificate
or CSR in a human readable format. Output from the inspect command is printed to
STDERR instead of STDOUT. This is an intentional barrier to accidental
misuse: scripts should never rely on the contents of an unvalidated certificate.
For scripting purposes, use **step certificate verify**.

If crt-file contains multiple certificates (i.e., it is a certificate "bundle")
the first certificate in the bundle will be output. Pass the --bundle option to
print all certificates in the order in which they appear in the bundle.

## Positional arguments

`crt-file`
Path to a certificate or certificate signing request (CSR) to inspect. A hyphen ("-") indicates STDIN as `crt-file`.

## Options


**--format**=`format`
The output format for printing the introspection details.

`format` is a string and must be one of:

- **text**: Print output in unstructured text suitable for a human to read.

- **json**: Print output in JSON format.

- **pem**: Print output in PEM format.

**--roots**=`roots`
Root certificate(s) that will be used to verify the
authenticity of the remote server.

`roots` is a case-sensitive string and may be one of:

- **file**: Relative or full path to a file. All certificates in the file will be used for path validation.

- **list of files**: Comma-separated list of relative or full file paths. Every PEM encoded certificate from each file will be used for path validation.

- **directory**: Relative or full path to a directory. Every PEM encoded certificate from each file in the directory will be used for path validation.

**--servername**=`value`
TLS Server Name Indication that should be sent to request a specific certificate from the server.

**--bundle**
Print all certificates in the order in which they appear in the bundle.
If the output format is 'json' then output a list of certificates, even if
the bundle only contains one certificate. This flag will result in an error
if the input bundle includes any PEM that does not have type CERTIFICATE.

**--short**
Print the certificate or CSR details in shorter and more friendly format.

**--insecure**
Use an insecure client to retrieve a remote peer certificate. Useful for
debugging invalid certificates remotely.

## Exit codes

This command returns 0 on success and >0 if any error occurs.

## Examples

Inspect a local certificate (default to text format):
```shell
$ step certificate inspect ./certificate.crt
```

Inspect a local certificate bundle (default to text format):
```shell
$ step certificate inspect ./certificate-bundle.crt --bundle
```

Inspect a local certificate in json format:
```shell
$ step certificate inspect ./certificate.crt --format json
```

Inspect a local certificate bundle in json format:
```shell
$ step certificate inspect ./certificate.crt --format json --bundle
```

Inspect a remote certificate (using the default root certificate bundle to verify the server):
```shell
$ step certificate inspect https://smallstep.com
```

Inspect a remote certificate (using the standard port derived from the URL prefix):
```shell
$ step certificate inspect smtps://smtp.gmail.com
```

Inspect an invalid remote certificate:
```shell
$ step certificate inspect --insecure https://expired.badssl.com
```

Inspect a remote certificate chain (using the default root certificate bundle to verify the server):
```shell
$ step certificate inspect https://google.com --bundle
```

Inspect a remote certificate using a custom root certificate to verify the server:
```shell
$ step certificate inspect https://smallstep.com --roots ./root-ca.crt
```

Inspect a remote certificate using a custom list of root certificates to verify the server:
```shell
$ step certificate inspect https://smallstep.com \
--roots "./root-ca.crt,./root-ca2.crt,/root-ca3.crt"
```

Inspect a remote certificate using a custom directory of root certificates to verify the server:
```shell
$ step certificate inspect https://smallstep.com \
--roots "./path/to/root/certificates/"
```

Inspect a remote certificate chain in json format using a custom directory of
root certificates to verify the server:
```shell
$ step certificate inspect https://google.com --format json \
--roots "./path/to/root/certificates/" --bundle
```

Inspect a remote certificate chain in PEM format:
```shell
$ step certificate inspect https://smallstep.com --format pem --bundle
```

Inspect a local CSR in text format (default):
```shell
$ step certificate inspect foo.csr
```

Inspect a local CSR in json:
```shell
$ step certificate inspect foo.csr --format json
```


