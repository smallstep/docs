---
layout: auto-doc
category: reference
title: step crypto key
menu:
  docs:
    parent: step crypto
    children:
      - format
      - public
      - inspect
      - fingerprint
      - sign
      - verify
---

## Name
**step crypto key** -- manage keys

## Usage

```raw
step crypto key SUBCOMMAND [ARGUMENTS] [GLOBAL_FLAGS] [SUBCOMMAND_FLAGS]
```

## Description

**step crypto key** command group provides facilities for
managing cryptographic keys.

## Examples

Convert PEM format to PKCS8.
```shell
$ step crypto key format foo-key.pem
```


## Commands


| Name | Usage |
|---|---|
| **[format](format/)** | reformat a public or private key |
| **[public](public/)** | print the public key from a private key or certificate |
| **[inspect](inspect/)** | print key details in human readable format |
| **[fingerprint](fingerprint/)** | print the fingerprint of a public key |
| **[sign](sign/)** | sign a message using an asymmetric key |
| **[verify](verify/)** | verify a signed message |

