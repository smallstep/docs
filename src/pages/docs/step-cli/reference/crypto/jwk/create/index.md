---
layout: auto-doc
category: reference
title: step crypto jwk create
menu:
  docs:
    parent: step crypto jwk
---

## Name
**step crypto jwk create** -- create a JWK (JSON Web Key)

## Usage

```raw
step crypto jwk create <public-jwk-file> <private-jwk-file>
[--kty=<type>] [--alg=<algorithm>] [--use=<use>]
[--size=<size>] [--crv=<curve>] [--kid=<kid>]
[--from-pem=<pem-file>] [--password-file=<file>]
```

## Description

**step crypto jwk create** generates a new JWK (JSON Web Key) or constructs a
JWK from an existing key. The generated JWK conforms to RFC7517 and can be used
to sign and encrypt data using JWT, JWS, and JWE.

Files containing private keys are encrypted by default. You'll be prompted for
a password. Keys are written with file mode **0600** (i.e., readable and
writable only by the current user).

All flags are optional. Defaults are suitable for most use cases.

## Positional arguments

`public-jwk-file`
Path to which the the public JWK should be written

`private-jwk-file`
Path to which the (JWE encrypted) private JWK should be written

## Options


**--kty**=`type`, **--type**=`type`
The `type` of key to create. Corresponds to the **"kty"** JWK parameter.
If unset, default is EC.

`type` is a case-sensitive string and must be one of:

- **EC**: Create an **elliptic curve** keypair

- **oct**: Create a **symmetric key** (octet stream)

- **OKP**: Create an octet key pair (for **"Ed25519"** curve)

- **RSA**: Create an **RSA** keypair


**--size**=`size`
The `size` (in bits) of the key for RSA and oct key types. RSA keys require a
minimum key size of 2048 bits. If unset, default is 2048 bits for RSA keys and 128 bits for oct keys.

**--crv**=`curve`, **--curve**=`curve`
The elliptic `curve` to use for EC and OKP key types. Corresponds
to the **"crv"** JWK parameter. Valid curves are defined in JWA [RFC7518]. If
unset, default is P-256 for EC keys and Ed25519 for OKP keys.

`curve` is a case-sensitive string and must be one of:

- **P-256**: NIST P-256 Curve

- **P-384**: NIST P-384 Curve

- **P-521**: NIST P-521 Curve

- **Ed25519**: Ed25519 Curve

**--alg**=`algorithm`, **--algorithm**=`algorithm`
The `algorithm` intended for use with this key. Corresponds to the
**"alg"** JWK parameter. `algorithm` is case-sensitive. If unset, the default
depends on the key use, key type, and curve (for EC and OKP keys). Defaults are:

| key type | use | curve   | default algorithm |
  |----------|-----|---------|-------------------|
  | EC       | sig | P-256   | ES256             |
  | EC       | sig | P-384   | ES384             |
  | EC       | sig | P-521   | ES512             |
  | oct      | sig | N/A     | HS256             |
  | RSA      | sig | N/A     | RS256             |
  | OKP      | sig | Ed25519 | EdDSA             |
  | EC       | enc | P-256   | ECDH-ES           |
  | EC       | enc | P-384   | ECDH-ES           |
  | EC       | enc | P-521   | ECDH-ES           |
  | oct      | enc | N/A     | A256GCMKW         |
  | RSA      | enc | N/A     | RSA-OAP-256       |

If the key **"use"** is **"sig"** (signing) `algorithm` must be one of:

- **HS256**: HMAC using SHA-256

- **HS384**: HMAC using SHA-384

- **HS512**: HMAC using SHA-512

- **RS256**: RSASSA-PKCS1-v1_5 using SHA-256

- **RS384**: RSASSA-PKCS1-v1_5 using SHA-384

- **RS512**: RSASSA-PKCS1-v1_5 using SHA-512

- **ES256**: ECDSA using P-256 and SHA-256

- **ES384**: ECDSA using P-384 and SHA-384

- **ES512**: ECDSA using P-521 and SHA-512

- **PS256**: RSASSA-PSS using SHA-256 and MGF1 with SHA-256

- **PS384**: RSASSA-PSS using SHA-384 and MGF1 with SHA-384

- **PS512**: RSASSA-PSS using SHA-512 and MGF1 with SHA-512

- **EdDSA**: EdDSA signature algorithm

If the key **"use"** is **"enc"** (encryption) `algorithm` must be one of:

- **RSA1_5**: RSAES-PKCS1-v1_5

- **RSA-OAEP**: RSAES OAEP using default parameters

- **RSA-OAEP-256**: RSAES OAEP using SHA-256 and MGF1 with SHA-256

- **A128KW**: AES Key Wrap with default initial value using 128-bit key

- **A192KW**: AES Key Wrap with default initial value using 192-bit key

- **A256KW**: AES Key Wrap with default initial value using 256-bit key

- **dir**: Direct use of a shared symmetric key as the content encryption key (CEK)

- **ECDH-ES**: Elliptic Curve Diffie-Hellman Ephemeral Static key agreement

- **ECDH-ES+A128KW**: ECDH-ES using Concat KDF and CEK wrapped with "A128KW"

- **ECDH-ES+A192KW**: ECDH-ES using Concat KDF and CEK wrapped with "A192KW"

- **ECDH-ES+A256KW**: ECDH-ES using Concat KDF and CEK wrapped with "A256KW"

- **A128GCMKW**: Key wrapping with AES GCM using 128-bit key

- **A192GCMKW**: Key wrapping with AES GCM using 192-bit key

- **A256GCMKW**: Key wrapping with AES GCM using 256-bit key

- **PBES2-HS256+A128KW**: PBES2 with HMAC SHA-256 and "A128KW" wrapping

- **PBES2-HS384+A192KW**: PBES2 with HMAC SHA-256 and "A192KW" wrapping

- **PBES2-HS512+A256KW**: PBES2 with HMAC SHA-256 and "A256KW" wrapping

**--use**=`use`
The intended `use` of the public key. Corresponds to the "use" JWK parameter.
The "use" parameter indicates whether the public key is used for encrypting
data or verifying the signature on data.

`use` is a case-sensitive string and may be one of:

- **sig**: The public key is used for verifying signatures.

- **enc**: The public key is used for encrypting data.

Other values may be used but the generated JWKs will not work for signing or
encryption with this tool.

**--kid**=`kid`
The `kid` (key ID) for this JWK. Corresponds to the
"kid" JWK parameter. Used to identify an individual key in a JWK Set, for
example. `kid` is a case-sensitive string. If unset, the JWK Thumbprint
[RFC7638] is used as `kid`. See **step help crypto jwk thumbprint** for more
information on JWK Thumbprints.

**--from-pem**=`pem-file`
Create a JWK representing the key encoded in an
existing `pem-file` instead of creating a new key.

**--password-file**=`file`
The path to the `file` containing the password to encrypt or decrypt the private key.

**--no-password**
Do not ask for a password to encrypt a private key. Sensitive key material will
be written to disk unencrypted. This is not recommended. Requires **--insecure** flag.

**--subtle**


**--insecure**


**-f**, **--force**
Force the overwrite of files without asking.

## Exit codes

This command returns 0 on success and >0 if any error occurs.

## Security considerations

All security considerations from **step help crypto** are relevant here.

**Preventing hostile disclosure of non-public key material**

It is critical that any private and symmetric key material be protected from
  unauthorized disclosure or modification. This includes the private key for
  asymmetric key types (RSA, EC, and OKP) and the shared secret for symmetric key
  types (oct). One means of protection is encryption. Keys can also be stored in
  hardware or software "security enclaves" such as HSMs and TPMs or operating
  system keychain management tools.

**Key provenance and bindings**

Key provenance should always be scrutinized. You should not trust a key that
  was obtained in an untrustworthy manner (e.g., non-TLS HTTP).

Usually applications use keys to make authorization decisions based on
  attributes "bound" to the key such as the key owner's name or role. In these
  scenarios the strength of the system's security depends on the strength of
  these "bindings". There are a variety of mechanisms for securely binding
  attributes to keys, including:

  * Cryptographically binding attributes to the public key using x509
    certificates (e.g., as defined in PKIX / RFC2580)
  * Cryptographically binding attributes to the public key using JWTs
  * Storing the public key or (hashed) shared secret along with the bound
    attributes in a secure database

Cryptographic mechanisms require establishing a "root of trust" that can sign
  the bindings (the certificates or JWTs) asserting that the bound attributes are
  correct.

## Standards

[RFC7517]
Jones, M., "JSON Web Key (JWK)", https://tools.ietf.org/html/rfc7517

[RFC7518]
Jones, M., "JSON Web Algorithms (JWA)", https://tools.ietf.org/html/rfc7518

[RFC7638]
M. Jones, N. Sakimura., "JSON Web Key (JWK) Thumbprint",
  https://tools.ietf.org/html/rfc7638

[RFC8037]
I. Liusvaara., "CFRG Elliptic Curve Diffie-Hellman (ECDH) and Signatures in
  JSON Object Signing and Encryption (JOSE)",
  https://tools.ietf.org/html/rfc8037

## Examples

Create a new JWK using default options:

```shell
$ step crypto jwk create jwk.pub.json jwk.json
```

Create an RSA JWK:

```shell
$ step crypto jwk create rsa.pub.json rsa.json --kty RSA
```

Create a symmetric key (oct key type):

```shell
$ step crypto jwk create oct.pub.json oct.json --kty oct
```

Create a key for use with the Ed25519 cryptosystem:

```shell
$ step crypto jwk create ed.pub.json ed.json \
    --kty OKP --crv Ed25519
```

Create a key from an existing PEM file:

```shell
$ step crypto jwk create jwk.pub.json jwk.json \
    --from-pem key.pem
```

Create an 4096 bit RSA encryption key:

```shell
$ step crypto jwk create rsa-enc.pub.json rsa-enc.json \
   --kty RSA --size 4096 --use enc
```

Create a 192 bit symmetric encryption key for use with AES Key Wrap:

```shell
$ step crypto jwk create kw.pub.json kw.json \
    --kty oct --size 192 --use enc --alg A192GCMKW
```


