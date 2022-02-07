---
layout: auto-doc
title: step certificate lint
menu:
  docs:
    parent: step certificate
---

## Name
**step certificate lint** -- lint certificate details

## Usage

```raw
step certificate lint <crt-file> [--roots=<root-bundle>]
[--servername=<servername>]
```

## Description

**step certificate lint** checks a certificate for common
errors and outputs the result in JSON format.

## Positional arguments

`crt-file`
Path to a certificate or certificate signing request (CSR) to lint.

## Options


**--roots**=`roots`
Root certificate(s) that will be used to verify the
authenticity of the remote server.

`roots` is a case-sensitive string and may be one of:

- **file**: Relative or full path to a file. All certificates in the file will be used for path validation.

- **list of files**: Comma-separated list of relative or full file paths. Every PEM encoded certificate from each file will be used for path validation.

- **directory**: Relative or full path to a directory. Every PEM encoded certificate from each file in the directory will be used for path validation.

**--insecure**
Use an insecure client to retrieve a remote peer certificate. Useful for
debugging invalid certificates remotely.

**--servername**=`value`
TLS Server Name Indication that should be sent to request a specific certificate from the server.

## Exit codes

This command returns 0 on success and >0 if any error occurs.

## Examples

```shell
$ step certificate lint ./certificate.crt
```

Lint a remote certificate (using the default root certificate bundle to verify the server):

```shell
$ step certificate lint https://smallstep.com
```

Lint a remote certificate using a custom root certificate to verify the server:

```shell
$ step certificate lint https://smallstep.com --roots ./certificate.crt
```

Lint a remote certificate using a custom list of root certificates to verify the server:

```shell
$ step certificate lint https://smallstep.com \
--roots "./certificate.crt,./certificate2.crt,/certificate3.crt"
```

Lint a remote certificate using a custom directory of root certificates to verify the server:

```shell
$ step certificate lint https://smallstep.com --roots "./path/to/certificates/"
```


