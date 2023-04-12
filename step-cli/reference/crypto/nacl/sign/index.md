---
layout: auto-doc
category: reference
title: step crypto nacl sign
menu:
  docs:
    parent: step crypto nacl
    children:
      - keypair
      - open
      - sign
---

## Name
**step crypto nacl sign** -- sign small messages using public-key cryptography

## Usage

```raw
step crypto nacl sign <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step crypto nacl sign** command group uses public-key cryptography to sign and
verify messages. The implementation is based on NaCl's crypto_sign function.

NaCl crypto_sign is crypto_sign_edwards25519sha512batch, a particular
combination of Curve25519 in Edwards form and SHA-512 into a signature scheme
suitable for high-speed batch verification. This function is conjectured to meet
the standard notion of unforgeability under chosen-message attacks.

These commands are interoperable with NaCl: https://nacl.cr.yp.to/sign.html

## Examples

Create a keypair for verifying and signing messages:
```shell
$ step crypto nacl sign keypair nacl.sign.pub nacl.sign.priv
```

Sign a message using the private key:
```shell
$ step crypto nacl sign sign nacl.sign.priv
Please enter text to sign: 
rNrOfqsv4svlRnVPSVYe2REXodL78yEMHtNkzAGNp4MgHuVGoyayp0zx4D5rjTzYVVrD2HRP306ZILT62ohvCG1lc3NhZ2U

$ cat message.txt | step crypto nacl sign sign ~/step/keys/nacl.recipient.sign.priv
rNrOfqsv4svlRnVPSVYe2REXodL78yEMHtNkzAGNp4MgHuVGoyayp0zx4D5rjTzYVVrD2HRP306ZILT62ohvCG1lc3NhZ2U
```

Verify the signed message using the public key:
```shell
$ echo rNrOfqsv4svlRnVPSVYe2REXodL78yEMHtNkzAGNp4MgHuVGoyayp0zx4D5rjTzYVVrD2HRP306ZILT62ohvCG1lc3NhZ2U \
     | step crypto nacl sign open nacl.sign.pub
message
```

## Commands


| Name | Usage |
|---|---|
| **[keypair](keypair/)** | generate a pair for use with sign and open |
| **[open](open/)** | verify a signed message produced by sign |
| **[sign](sign/)** | sign a message using Ed25519 |

