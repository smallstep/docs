---
layout: auto-doc
title: step certificate fingerprint
menu:
  docs:
    parent: step certificate
---

## Name
**step certificate fingerprint** -- print the fingerprint of a certificate

## Usage

```raw
step certificate fingerprint <crt-file>
[--bundle] [--roots=<root-bundle>] [--servername=<servername>] [--format=<format>]
```

## Description

**step certificate fingerprint** reads a certificate and prints to STDOUT the
certificate SHA256 of the raw certificate.

If `crt-file` contains multiple certificates (i.e., it is a certificate
"bundle") the fingerprint of the first certificate in the bundle will be
printed. Pass the --bundle option to print all fingerprints in the order in
which they appear in the bundle.

## Positional arguments

`crt-file`
A certificate PEM file, usually the root certificate.

## Options


**--roots**=`roots`
Root certificate(s) that will be used to verify the
authenticity of the remote server.

`roots` is a case-sensitive string and may be one of:

- **file**: Relative or full path to a file. All certificates in the file will be used for path validation.

- **list of files**: Comma-separated list of relative or full file paths. Every PEM encoded certificate from each file will be used for path validation.

- **directory**: Relative or full path to a directory. Every PEM encoded certificate from each file in the directory will be used for path validation.

**--bundle**
Print all fingerprints in the order in which they appear in the bundle.

**--insecure**
Use an insecure client to retrieve a remote peer certificate. Useful for
debugging invalid certificates remotely.

**--servername**=`value`
TLS Server Name Indication that should be sent to request a specific certificate from the server.

**--format**=`format`
The `format` of the fingerprint, it must be "hex", "base64" or "base64-url".

## Examples

Get the fingerprint for a root certificate:
```shell
$ step certificate fingerprint /path/to/root_ca.crt
0d7d3834cf187726cf331c40a31aa7ef6b29ba4df601416c9788f6ee01058cf3
```

Get the fingerprint for a remote certificate:
```shell
$ step certificate fingerprint https://smallstep.com
e2c4f12edfc1816cc610755d32e6f45d5678ba21ecda1693bb5b246e3c48c03d
```

Get the fingerprints for a remote certificate with its intemediate:
```shell
$ step certificate fingerprint --bundle https://smallstep.com
e2c4f12edfc1816cc610755d32e6f45d5678ba21ecda1693bb5b246e3c48c03d
25847d668eb4f04fdd40b12b6b0740c567da7d024308eb6c2c96fe41d9de218d
```

