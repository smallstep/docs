---
layout: auto-doc
title: step crypto otp generate
menu:
  docs:
    parent: step crypto otp
---

## Name
**step crypto otp generate** -- generate a one-time password

## Usage

```raw
step crypto otp generate [--issuer=<name>]
[--account=<user-name>] [--period=<seconds>] [--length=<size>]
[--alg=<alg>] [--url] [--qr]
```

## Description

**step crypto otp generate** does TOTP and HTOP

## Options


**--issuer**=`value`, **--iss**=`value`
Name of the issuing organization (e.g., smallstep.com)

**--account**=`value`
Name of the user's account (e.g., a username or email
address)

**--period**=`value`
Number of seconds a TOTP hash is valid. Defaults to 30
seconds.

**--length**=`value`, **--digits**=`value`
Length of one-time passwords. Defaults to 6.

**--secret-size**=`value`
Size of generated TOTP secret. Defaults to 20.

**--alg**=`value`, **--algorithm**=`value`
Algorithm to use for HMAC. Defaults to SHA1. Must be
one of: SHA1, SHA256, SHA512

**--url**
Output a TOTP Key URI. See
https://github.com/google/google-authenticator/wiki/Key-Uri-Format

**--qr**=`value`
Write a QR code to the specified path

**-f**, **--force**
Force the overwrite of files without asking.

