---
layout: auto-doc
category: reference
title: step crypto jwk
menu:
  docs:
    parent: step crypto
    children:
      - create
      - keyset
      - public
      - thumbprint
---

## Name
**step crypto jwk** -- create JWKs (JSON Web Keys) and manage JWK Key Sets

## Usage

```raw
step crypto jwk <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

The **step crypto jwk** command group provides facilities for creating JWKs
(JSON Web Keys) as defined in RFC7517. It also includes command line utilities
for managing Key Sets and working with encrypted keys.

A JWK is a JSON data structure that represents a cryptographic key. The
members of this data structure represent properties of the key, including its
value. A JWK Set is a simple data structure for representing a set of JWKs. A
JWK Set is a JSON object with a "keys" member whose value is an array of JWKs.
Cryptographic algorithms and identifiers for used by JWKs are defined by the
JSON Web Algorithms (JWA) specification in RFC7518. This tool also supports
extensions defined in standards track RFC8037 defining curve and algorithm
identifiers for Edwards-curve Digital Signatures.

JWKs and JWK Sets are used in the JSON Web Signature (JWS; RFC7515) and JSON
Web Encryption (JWE; RFC7516) specifications for signing and encrypting JSON
data, respectively.

## Examples

Create a JWK using the default parameters (NIST P-256 curve):
```shell
$ step crypto jwk create pub.json priv.json
```

Add the previous public keys to a JWK Set (JWKS):
```shell
$ cat pub.json | step crypto jwk keyset add ks.json
```

List the keys in a JWKS:
```shell
$ step crypto jwk keyset list ks.json
ZI9Ku2jJQL84ewxVn8C_67iDaTN_DFTXE9Gypo6-3YE
L38TOXsig8h6FeBOos03nFy6iXmwusFcIBBB0ZilahY
```

Remove a JWK from a JWKS:
```shell
$ step crypto jwk keyset remove ks.json --kid ZI9Ku2jJQL84ewxVn8C_67iDaTN_DFTXE9Gypo6-3YE

$ step crypto jwk keyset list ks.json
L38TOXsig8h6FeBOos03nFy6iXmwusFcIBBB0ZilahY
```

Extract a JWK from a JWKS:
```shell
$ step crypto jwk keyset find ks.json --kid L38TOXsig8h6FeBOos03nFy6iXmwusFcIBBB0ZilahY
{
  "use": "sig",
  "kty": "EC",
  "kid": "L38TOXsig8h6FeBOos03nFy6iXmwusFcIBBB0ZilahY",
  "crv": "P-256",
  "alg": "ES256",
  "x": "n_vvepi2bAby8LhsmY396msumgs4EQGoNNzar6wtyAc",
  "y": "hDRyGFO3M0-4_4MReiwbwXvh6XL3PMh4BAPu0qnTItM"
}
```

See the public version of a private JWK:
```shell
$ cat priv.json | step crypto jwk public
{
  "use": "sig",
  "kty": "EC",
  "kid": "L38TOXsig8h6FeBOos03nFy6iXmwusFcIBBB0ZilahY",
  "crv": "P-256",
  "alg": "ES256",
  "x": "n_vvepi2bAby8LhsmY396msumgs4EQGoNNzar6wtyAc",
  "y": "hDRyGFO3M0-4_4MReiwbwXvh6XL3PMh4BAPu0qnTItM"
}
```

Create a JWK Thumbprint for a JWK:
```shell
$ cat priv.json | step crypto jwk thumbprint
L38TOXsig8h6FeBOos03nFy6iXmwusFcIBBB0ZilahY
```

## Commands


| Name | Usage |
|---|---|
| **[create](create/)** | create a JWK (JSON Web Key) |
| **[keyset](keyset/)** | add, remove, and find JWKs in JWK Sets |
| **[public](public/)** | extract a public JSON Web Key (JWK) from a private JWK |
| **[thumbprint](thumbprint/)** | compute thumbprint for a JWK |

