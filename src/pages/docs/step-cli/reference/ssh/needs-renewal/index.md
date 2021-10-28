---
layout: auto-doc
title: step ssh needs-renewal
menu:
  docs:
    parent: step ssh
---

## Name
**step ssh needs-renewal** -- Check if an SSH certificate needs to be renewed

## Usage

```raw
step ssh needs-renewal <crt-file or hostname> [--expires-in=<percent|duration>]
```

## Description

**step ssh needs-renewal** returns '0' if the SSH certificate needs
to be renewed based on it's remaining lifetime. Returns '1' if the SSH certificate is
within it's validity lifetime bounds and does not need to be renewed. Returns
'255' for any other error. By default, an SSH certificate "needs renewal" when it has
passed 66% (default threshold) of it's allotted lifetime. This threshold can be
adjusted using the '--expires-in' flag.

## Positional arguments

`cert-file or hostname`
The path to an SSH certificate.

## Options


**--expires-in**=`percent|duration`
Check if the certificate expires within the given time window
using `percent|duration`. If using `percent`, the input must be followed by a "%"
character. If using `duration`, the input must be a sequence of decimal numbers,
each with optional fraction and a unit suffix, such as "300ms", "-1.5h" or "2h45m".
Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h".

## Exit codes

This command returns '0' if the SSH certificate needs renewal, '1' if the
SSH certificate does not need renewal, '2' if the SSH certificate file does not
exist, and '255' for any other error.

## Examples

Check if an SSH certificate needs renewal using the default threshold (66%):
```shell
$ step ssh needs-renewal ./ssh_host_ed25519_key.pub
```

Check if certificate will expire within a given duration:
```shell
$ step ssh needs-renewal ./ssh_host_ed25519_key.pub --expires-in 1h15m
```

Check if an SSH certificate has passed 75 percent of it's lifetime:
```shell
$ step certificate needs-renewal ./ssh_host_ed25519_key.pub --expires-in 75%
```


