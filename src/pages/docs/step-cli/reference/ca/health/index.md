---
layout: auto-doc
title: step ca health
menu:
  docs:
    parent: step ca
---

## Name
**step ca health** -- get the status of the CA

## Usage

```raw
step ca health
[--ca-url=<URI>] [--root=<file>]
```

## Description

**step ca health** makes an API request to the /health
endpoint of the Step CA to check if it is running. If the CA is healthy, the
response will be 'ok'.

## Options


**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

## Examples

Using the required flags:
```shell
$ step ca health --ca-url https://ca.smallstep.com:8080 --root path/to/root_ca.crt
ok
```

With the required flags preconfigured:

**--ca-url** is set using environment variables (as STEP_CA_URL) or the default
configuration file in `$STEPPATH/config/defaults.json`.

**--root** is set using environment variables (as STEP_ROOT), the default
configuration file in `$STEPPATH/config/defaults.json` or the default root
certificate located in `$STEPPATH/certs/root_ca.crt`

```shell
$ step ca health
ok
```

