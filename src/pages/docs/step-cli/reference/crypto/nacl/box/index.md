---
layout: auto-doc
category: reference
title: step crypto nacl box
menu:
  docs:
    parent: step crypto nacl
    children:
      - keypair
      - open
      - seal
---

## Name
**step crypto nacl box** -- authenticate and encrypt small messages using public-key cryptography

## Usage

```raw
step crypto nacl box <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step crypto nacl box** command group uses public-key cryptography to encrypt,
decrypt and authenticate messages. The implementation is based on NaCl's
crypto_box function.

NaCl crypto_box function is designed to meet the standard notions of
privacy and third-party unforgeability for a public-key authenticated-encryption
scheme using nonces. For formal definitions see, e.g., Jee Hea An,
"Authenticated encryption in the public-key setting: security notions and
analyzes," https://eprint.iacr.org/2001/079. Distinct messages between the same
{sender, receiver} set are required to have distinct nonces. For example, the
lexicographically smaller public key can use nonce 1 for its first message to
the other key, nonce 3 for its second message, nonce 5 for its third message,
etc., while the lexicographically larger public key uses nonce 2 for its first
message to the other key, nonce 4 for its second message, nonce 6 for its third
message, etc. Nonces are long enough that randomly generated nonces have
negligible risk of collision.

There is no harm in having the same nonce for different messages if the {sender,
receiver} sets are different. This is true even if the sets overlap. For
example, a sender can use the same nonce for two different messages if the
messages are sent to two different public keys.

By default nonces are alphanumeric, but it's possible to use binary nonces using
the prefix 'base64:' and the standard base64 encoding of the data, e.g.
'base64:081D3pFPBkwx1bURR9HQjiYbAUxigo0Z'. The prefix 'string:' is also
accepted, but it will be equivalent to not using a prefix. Nonces cannot be
longer than 24 bytes.

NaCl crypto_box is not meant to provide non-repudiation. On the contrary: they
guarantee repudiability. A receiver can freely modify a boxed message, and
therefore cannot convince third parties that this particular message came from
the sender. The sender and receiver are nevertheless protected against forgeries
by other parties. In the terminology of
https://groups.google.com/group/sci.crypt/msg/ec5c18b23b11d82c, NaCl crypto_box
uses "public-key authenticators" rather than "public-key signatures."

Users who want public verifiability (or receiver-assisted public verifiability)
should instead use signatures (or signcryption).

NaCl crypto_box is curve25519xsalsa20poly1305, a particular combination of
Curve25519, Salsa20, and Poly1305 specified in "Cryptography in NaCl". This
function is conjectured to meet the standard notions of privacy and third-party
unforgeability.

These commands are interoperable with NaCl: https://nacl.cr.yp.to/box.html

## Examples

Create a keypair for encrypting/decrypting messages:
```shell
# Bob
$ step crypto nacl box keypair bob.box.pub bob.box.priv

# Alice
$ step crypto nacl box keypair alice.box.pub alice.box.priv
```

Bob encrypts a message for Alice using her public key and signs it using his
private key:
```shell
$ echo message | step crypto nacl box seal nonce alice.box.pub bob.box.priv
0oM0A6xIezA6iMYssZECmbMRQh77mzDt
```

Alice receives the encrypted message and the nonce and decrypts with her
private key and validates the message from Bob using his public key:
```shell
$ echo 0oM0A6xIezA6iMYssZECmbMRQh77mzDt | step crypto nacl box open nonce bob.box.pub alice.box.priv
message
```

Decrypt the message using a base64 nonce:
```shell
$ echo 0oM0A6xIezA6iMYssZECmbMRQh77mzDt | step crypto nacl box open base64:bm9uY2U= bob.box.pub alice.box.priv
message
```

## Commands


| Name | Usage |
|---|---|
| **[keypair](keypair/)** | generate a key for use with seal and open |
| **[open](open/)** | authenticate and decrypt a box produced by seal |
| **[seal](seal/)** | produce an authenticated and encrypted ciphertext |

