---
layout: auto-doc
title: step crypto otp
menu:
  docs:
    parent: step crypto
    children:
      - generate
      - verify
---

## Name
**step crypto otp** -- generate and verify one-time passwords

## Usage

```raw
step crypto otp <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step crypto otp** command group implements TOTP and HOTP one-time passwords
(mention RFCs)

## Examples

Generate a new TOTP token and it's QR Code to scan:
```shell
$ step crypto otp generate --issuer smallstep.com --account name@smallstep.com -qr smallstep.png > smallstep.totp

$ cat smallstep.totp
55RU6WTUISKKGEYVNSSI7H6FTJWJ4IPP
```

Scan the QR Code using Google Authenticator, Authy or a similar software and
use it to verify the TOTP token:
```shell
$ step crypto otp verify --secret smallstep.totp
Enter Passcode: 614318
ok
```

## Commands


| Name | Usage |
|---|---|
| **[generate](generate/)** | generate a one-time password |
| **[verify](verify/)** | verify a one-time password |

