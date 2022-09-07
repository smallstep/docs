---
layout: auto-doc
category: reference
title: step crypto jwe encrypt
menu:
  docs:
    parent: step crypto jwe
---

## Name
**step crypto jwe encrypt** -- encrypt a payload using JSON Web Encryption (JWE)

## Usage

```raw
step crypto jwe encrypt
[--alg=<key-enc-algorithm>] [--enc=<content-enc-algorithm>]
[--key=<file>] [--jwks=<jwks>] [--kid=<kid>]
```

## Description

**step crypto jwe encrypt** encrypts a payload using JSON Web Encryption
(JWE). By default, the payload to encrypt is read from STDIN and the JWE data
structure will be written to STDOUT.

For examples, see **step help crypto jwe**.

## Options


**--alg**=`key-enc-algorithm`, **--algorithm**=`key-enc-algorithm`
The cryptographic algorithm used to encrypt or determine the value of the
content encryption key (CEK). Algorithms are case-sensitive strings defined in
RFC7518. The selected algorithm must be compatible with the key type. This
flag is optional. If not specified, the **"alg"** member of the JWK is used. If
the JWK has no **"alg"** member then a default is selected depending on the JWK
key type. If the JWK has an **"alg"** member and the **--alg** flag is passed the two
options must match unless the **--subtle** flag is also passed.

`key-enc-algorithm` is a case-sensitive string and must be one of:

- **RSA1_5**: RSAES-PKCS1-v1_5

- **RSA-OAEP**: RSAES OAEP using default parameters

- **RSA-OAEP-256** (default for RSA keys): RSAES OAEP using SHA-256 and MGF1 with SHA-256

- **A128KW**: AES Key Wrap with default initial value using 128-bit key

- **A192KW**: AES Key Wrap with default initial value using 192-bit key

- **A256KW**: AES Key Wrap with default initial value using 256-bit key

- **dir**: Direct use of a shared symmetric key as the content encryption key (CEK)

- **ECDH-ES** (default for EC keys): Elliptic Curve Diffie-Hellman Ephemeral Static key agreement

- **ECDH-ES+A128KW**: ECDH-ES using Concat KDF and CEK wrapped with "A128KW

- **ECDH-ES+A192KW**: ECDH-ES using Concat KDF and CEK wrapped with "A192KW

- **ECDH-ES+A256KW**: ECDH-ES using Concat KDF and CEK wrapped with "A256KW

- **A128GCMKW**: Key wrappiung with AES GCM using 128-bit key

- **A192GCMKW**: Key wrappiung with AES GCM using 192-bit key

- **A256GCMKW** (default for oct keys): Key wrappiung with AES GCM using 256-bit key

- **PBES2-HS256+A128KW**: PBES2 with HMAC SHA-256 and "A128KW" wrapping

- **PBES2-HS384+A192KW**: PBES2 with HMAC SHA-256 and "A192KW" wrapping

- **PBES2-HS512+A256KW**: PBES2 with HMAC SHA-256 and "A256KW" wrapping

**--enc**=`content-enc-algorithm`, **--encryption-algorithm**=`content-enc-algorithm`
The cryptographic content encryption algorithm used to perform authenticated
encryption on the plaintext payload (the content) to produce ciphertext and
the authentication tag.

`content-enc-algorithm` is a case-sensitive string and must be one of:

- **A128CBC-HS256**: AES_128_CBC_HMAC_SHA_256 authenticated encryption algorithm

- **A192CBC-HS384**: AES_192_CBC_HMAC_SHA_384 authenticated encryption algorithm

- **A256CBC-HS512**: AES_256_CBC_HMAC_SHA_512 authenticated encryption algorithm

- **A128GCM**: AES GCM using 128-bit key

- **A192GCM**: AES GCM using 192-bit key

- **A256GCM** (default): AES GCM using 256-bit key

**--key**=`file`
The `file` containing the JWE recipient's public key.
JWEs can be encrypted for a recipient using a public JWK or a PEM encoded public key.

**--jwks**=`jwks`
The JWK Set containing the recipient's public key. The `jwks` argument should
be the name of a file. The file contents should be a JWK Set. The **--jwks**
flag requires the use of the **--kid** flag to specify which key to use.

**--kid**=`kid`
The ID of the recipient's public key. `kid` is a case-sensitive string. When
used with **--key** the `kid` value must match the **"kid"** member of the JWK. When
used with **--jwks** (a JWK Set) the `kid` value must match the **"kid"** member of
one of the JWKs in the JWK Set.

**--typ**=`value`, **--type**=`value`
The media type of the JWE, used for disambiguation in applications where
more than one type of JWE may be processed. While this parameter might be
useful to applications, it is ignored by JWE implementations.

**--cty**=`value`, **--content-type**=`value`
The media type of the JWE payload, used for disambiguation of JWE objects in
applications where more than one JWE payload type may be present. This
parameter is ignored by JWE implementations, but may be processed by
applications that use JWE.

