---
layout: auto-doc
title: step certificate needs-renewal
menu:
  docs:
    parent: step certificate
---

## Name
**step certificate needs-renewal** -- Check if a certificate needs to be renewed

## Usage

```raw
step certificate needs-renewal <cert-file or hostname>
[--expires-in=<percent|duration>] [--roots=<root-bundle>] [--servername=<servername>]
```

## Description

**step certificate needs-renewal** returns '0' if the certificate needs
to be renewed based on it's remaining lifetime. Returns '1' the certificate is
within it's validity lifetime bounds and does not need to be renewed. Returns
'255' for any other error. By default, a certificate "needs renewal" when it has
passed 66% (default threshold) of it's allotted lifetime. This threshold can be
adjusted using the '--expires-in' flag.

## Positional arguments

`cert-file or hostname`
The path to a certificate OR a hostname with protocol prefix.

## Options


**--expires-in**=`percent|duration`
Check if the certificate expires within the given time window
using `percent|duration`. If using `percent`, the input must be followed by a "%"
character. If using `duration`, the input must be a sequence of decimal numbers,
each with optional fraction and a unit suffix, such as "300ms", "-1.5h" or "2h45m".
Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h".

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

This command returns '0' if the X509 certificate needs renewal, '1' if the
X509 certificate does not need renewal, '2' if the X509 certificate file does not
exist, and '255' for any other error.

## Examples

Check certificate for renewal using custom directory:
```shell
$ step certificate needs-renewal ./certificate.crt
```

Check certificate for renewal using a hostname:
```shell
$ step certificate needs-renewal https://smallstep.com
```

Check if certificate will expire within a given duration:
```shell
$ step certificate needs-renewal ./certificate.crt --expires-in 1h15m
```

Check if certificate from hostname will expire within a given duration:
```shell
$ step certificate needs-renewal https://smallstep.com --expires-in 1h15m
```

Check if certificate has passed 75 percent of it's lifetime:
```shell
$ step certificate needs-renewal ./certificate.crt --expires-in 75%
```

Check if certificate from a hostname has passed 75 percent of it's lifetime:
```shell
$ step certificate needs-renewal https://smallstep.com --expires-in 75%
```

Check a remote certificate using a custom root certificate:
```shell
$ step certificate needs-renewal https://smallstep.com --roots ./root-ca.crt
```

Check a remote certificate using a custom list of root certificates:
```shell
$ step certificate needs-renewal https://smallstep.com \
--roots "./root-ca.crt,./root-ca2.crt,/root-ca3.crt"
```

Check a remote certificate using a custom directory of root certificates:
```shell
$ step certificate needs-renewal https://smallstep.com \
--roots "./path/to/root/certificates/"
```


