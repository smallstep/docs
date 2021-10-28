---
layout: auto-doc
title: step crypto otp verify
menu:
  docs:
    parent: step crypto otp
---

## Name
**step crypto otp verify** -- verify a one-time password

## Usage

```raw
step crypto otp verify [--secret=<file>]
[--period=<seconds>] [--skew=<num>] [--length=<size>]
[--alg=<alg>] [*-time=<time|duration>]
```

## Description

**step crypto otp verify** does TOTP and HTOP

## Options


**--secret**=`file`
The `file` containing TOTP secret.

**--period**=`value`
Number of seconds a TOTP hash is valid. Defaults to 30
seconds.

**--skew**=`value`
Periods before or after current time to allow. Defaults
to 0. Values greater than 1 require '--insecure' flag.

**--length**=`value`, **--digits**=`value`
Length of one-time passwords. Defaults to 6 digits.

**--alg**=`value`, **--algorithm**=`value`
Algorithm to use for HMAC. Defaults to SHA1. Must be
one of: SHA1, SHA256, SHA512

**--time**=`time|duration`
The `time|duration` to use for TOTP validation. If a `time` is
used it is expected to be in RFC 3339 format. If a `duration` is used, it is a
sequence of decimal numbers, each with optional fraction and a unit suffix, such
as "300ms", "-1.5h" or "2h45m". Valid time units are "ns", "us" (or "µs"), "ms",
"s", "m", "h". A `duration` value is added to the current time. An empty
`time|duration` defaults to "time.Now()".

