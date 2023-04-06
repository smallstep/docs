---
layout: auto-doc
category: reference
title: step crypto nacl auth
menu:
  docs:
    parent: step crypto nacl
    children:
      - digest
      - verify
---

## Name
**step crypto nacl auth** -- authenticate a message using a secret key

## Usage

```raw
step crypto nacl auth <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step crypto nacl auth** command group uses secret key cryptography to
authenticate and verify messages using a secret key. The implementation is based on NaCl's
crypto_auth function.

NaCl crypto_auth function, viewed as a function of the message for a uniform
random key, is designed to meet the standard notion of unforgeability. This
means that an attacker cannot find authenticators for any messages not
authenticated by the sender, even if the attacker has adaptively influenced the
messages authenticated by the sender. For a formal definition see, e.g., Section
2.4 of Bellare, Kilian, and Rogaway, "The security of the cipher block chaining
message authentication code," Journal of Computer and System Sciences 61 (2000),
362–399; http://www-cse.ucsd.edu/~mihir/papers/cbc.html.

NaCl crypto_auth does not make any promises regarding "strong" unforgeability;
perhaps one valid authenticator can be converted into another valid
authenticator for the same message. NaCl auth also does not make any promises
regarding "truncated unforgeability."

NaCl crypto_auth is currently an implementation of HMAC-SHA-512-256, i.e., the
first 256 bits of HMAC-SHA-512. HMAC-SHA-512-256 is conjectured to meet the
standard notion of unforgeability.

These commands are interoperable with NaCl: https://nacl.cr.yp.to/auth.html

## Examples

Authenticate a message using a 256-bit key, a new nacl box private key can be
used as the secret:
```shell
$ step crypto nacl auth digest auth.key
Please enter text to authenticate: 
33c54aeb54077808fcfccadcd2f01971b120e314dffa61516b0738b74fdc8ff1

$ cat message.txt | step crypto nacl auth digest auth.key
33c54aeb54077808fcfccadcd2f01971b120e314dffa61516b0738b74fdc8ff1
```

Verify the message with the hash:
```shell
$ step crypto nacl auth verify auth.key 33c54aeb54077808fcfccadcd2f01971b120e314dffa61516b0738b74fdc8ff1
Please enter text to verify: 
ok

$ cat message.txt | step crypto nacl auth verify auth.key 33c54aeb54077808fcfccadcd2f01971b120e314dffa61516b0738b74fdc8ff1
ok
```

## Commands


| Name | Usage |
|---|---|
| **[digest](digest/)** | generate a 32-byte digest for a message |
| **[verify](verify/)** | validate a digest for a message |

