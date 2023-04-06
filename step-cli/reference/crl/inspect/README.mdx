---
layout: auto-doc
category: reference
title: step crl inspect
menu:
  docs:
    parent: step crl
---

## Name
**step crl inspect** -- print certificate revocation list (CRL) details in human-readable format

## Usage

```raw
step crl inspect <file|url>
```

## Description

**step crl inspect** validates and prints the details of a certificate revocation list (CRL).
A CRL is considered valid if its signature is valid, the CA is not expired, and the next update time is in the future.

## Positional arguments

`file|url`
The file or URL where the CRL is. If `--from` is passed it will inspect
the certificate and extract the CRL distribution point from.

## Options


**--format**=`format`
The output format for printing the introspection details.

`format` is a string and must be one of:

- **text**: Print output in unstructured text suitable for a human to read.
     This is the default format.

- **json**: Print output in JSON format.

- **pem**: Print output in PEM format.

**--ca**=`file`
The certificate `file` used to validate the CRL.

**--from**
Extract CRL and CA from the URL passed as argument.

**--roots**=`roots`
Root certificate(s) that will be used to verify the
authenticity of the remote server.

`roots` is a case-sensitive string and may be one of:

- **file**: Relative or full path to a file. All certificates in the file will be used for path validation.

- **list of files**: Comma-separated list of relative or full file paths. Every PEM encoded certificate from each file will be used for path validation.

- **directory**: Relative or full path to a directory. Every PEM encoded certificate from each file in the directory will be used for path validation.

**--insecure**


## Examples

Inspect a CRL:
```shell
$ step crl inspect --insecure http://ca.example.com/crls/exampleca.crl
```

Inspect and validate a CRL in a file:
```shell
$ step crl inspect --ca ca.crt exampleca.crl
```

Format the CRL in JSON:
```shell
$ step crl inspect --insecure --format json exampleca.crl
```

Inspect the CRL from the CRL distribution point of a given url:
```shell
$ step crl inspect --from https://www.google.com
```

