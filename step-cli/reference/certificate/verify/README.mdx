---
layout: auto-doc
category: reference
title: step certificate verify
menu:
  docs:
    parent: step certificate
---

## Name
**step certificate verify** -- verify a certificate

## Usage

```raw
step certificate verify <crt-file> [--host=<host>]
[--roots=<root-bundle>] [--servername=<servername>]
```

## Description

**step certificate verify** executes the certificate path
validation algorithm for x.509 certificates defined in RFC 5280. If the
certificate is valid this command will return '0'. If validation fails, or if
an error occurs, this command will produce a non-zero return value.

## Positional arguments

`crt-file`
The path to a certificate to validate.

## Options


**--host**=`value`
Check whether the certificate is for the specified host.

**--roots**=`roots`
Root certificate(s) that will be used to verify the
authenticity of the remote server.

`roots` is a case-sensitive string and may be one of:

- **file**: Relative or full path to a file. All certificates in the file will be used for path validation.

- **list of files**: Comma-separated list of relative or full file paths. Every PEM encoded certificate from each file will be used for path validation.

- **directory**: Relative or full path to a directory. Every PEM encoded certificate from each file in the directory will be used for path validation.

**--servername**=`value`
TLS Server Name Indication that should be sent to request a specific certificate from the server.

## Exit codes

This command returns 0 on success and >0 if any error occurs.

## Examples

Verify a certificate using your operating system's default root certificate bundle:

```shell
$ step certificate verify ./certificate.crt
```

Verify a remote certificate using your operating system's default root certificate bundle:

```shell
$ step certificate verify https://smallstep.com
```

Verify a certificate using a custom root certificate for path validation:

```shell
$ step certificate verify ./certificate.crt --roots ./root-certificate.crt
```

Verify a certificate using a custom list of root certificates for path validation:

```shell
$ step certificate verify ./certificate.crt \
--roots "./root-certificate.crt,./root-certificate2.crt,/root-certificate3.crt"
```

Verify a certificate using a custom directory of root certificates for path validation:

```shell
$ step certificate verify ./certificate.crt --roots ./root-certificates/
```


