---
layout: auto-doc
title: step crypto nacl secretbox
menu:
  docs:
    parent: step crypto nacl
    children:
      - open
      - seal
---

## Name
**step crypto nacl secretbox** -- encrypt and authenticate small messages using secret-key cryptography

## Usage

```raw
step crypto nacl secretbox <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step crypto nacl secretbox** command group uses secret-key cryptography to
encrypt, decrypt and authenticate messages. The implementation is based on NaCl's
crypto_secretbox function.

NaCl crypto_secretbox is designed to meet the standard notions of privacy and
authenticity for a secret-key authenticated-encryption scheme using nonces. For
formal definitions see, e.g., Bellare and Namprempre, "Authenticated encryption:
relations among notions and analysis of the generic composition paradigm,"
Lecture Notes in Computer Science 1976 (2000), 531–545,
http://www-cse.ucsd.edu/~mihir/papers/oem.html. Note that the length is not
hidden. Note also that it is the caller's responsibility to ensure the
uniqueness of nonces—for example, by using nonce 1 for the first message, nonce
2 for the second message, etc. Nonces are long enough that randomly generated
nonces have negligible risk of collision.

By default nonces are alphanumeric, but it's possible to use binary nonces using
the prefix 'base64:' and the standard base64 encoding of the data, e.g.
'base64:081D3pFPBkwx1bURR9HQjiYbAUxigo0Z'. The prefix 'string:' is also
accepted, but it will be equivalent to not using a prefix. Nonces cannot be
longer than 24 bytes.

NaCl crypto_secretbox is crypto_secretbox_xsalsa20poly1305, a particular
combination of Salsa20 and Poly1305 specified in "Cryptography in NaCl". This
function is conjectured to meet the standard notions of privacy and
authenticity.

These commands are interoperable with NaCl: https://nacl.cr.yp.to/secretbox.html

## Examples

Encrypt a message using a 256-bit secret key, a new nacl box private key can
be used as the secret:
```shell
$ step crypto nacl secretbox seal nonce secretbox.key
Please enter text to seal: 
o2NJTsIJsk0dl4epiBwS1mM4xFED7iE

$ cat message.txt | step crypto nacl secretbox seal nonce secretbox.key
o2NJTsIJsk0dl4epiBwS1mM4xFED7iE
```

Encrypt the message using a base64 nonce:
```shell
$ cat message.txt | step crypto nacl secretbox seal base64:bm9uY2U= secretbox.key
o2NJTsIJsk0dl4epiBwS1mM4xFED7iE
```

Decrypt and authenticate the message:
```shell
$ echo o2NJTsIJsk0dl4epiBwS1mM4xFED7iE | step crypto nacl secretbox open nonce secretbox.key
message
```

## Commands


| Name | Usage |
|---|---|
| **[open](open/)** | authenticate and decrypt a box produced by seal |
| **[seal](seal/)** | produce an encrypted ciphertext |

