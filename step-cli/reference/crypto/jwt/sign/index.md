---
layout: auto-doc
category: reference
title: step crypto jwt sign
menu:
  docs:
    parent: step crypto jwt
---

## Name
**step crypto jwt sign** -- create a signed JWT data structure

## Usage

```raw
step crypto jwt sign [- | <filename>]
[--alg=<algorithm>] [--aud=<audience>] [--iss=<issuer>] [--sub=<sub>]
[--exp=<expiration>] [--iat=<issued_at>] [--nbf=<not-before>]
[--key=<file>] [--jwks=<jwks>] [--kid=<kid>] [--jti=<jti>]
[--header=<key=value>] [--password-file=<file>]
[--x5c-cert=<file>] [--x5c-key=<file>] [--x5c-insecure]
[--x5t-cert=<file>] [--x5t-key=<file>]
```

## Description

**step crypto jwt sign** command generates a signed JSON Web Token (JWT) by
computing a digital signature or message authentication code for a JSON
payload. By default, the payload to sign is read from STDIN and the JWT will
be written to STDOUT. The suggested pronunciation of JWT is the same as the
English word "jot".

A JWT is a compact data structure used to represent some JSON encoded "claims"
that are passed as the payload of a JWS or JWE structure, enabling the claims
to be digitally signed and/or encrypted. The "claims" (or "claim set") are
represented as an ordinary JSON object. JWTs are represented using a compact
format that's URL safe and can be used in space-constrained environments. JWTs
can be passed in HTTP Authorization headers and as URI query parameters.

A "claim" is a piece of information asserted about a subject, represented as a
key/value pair. Logically a verified JWT should be interpreted as "`issuer` says
to `audience` that `subject`'s `claim-name` is `claim-value`" for each claim.

Some optional arguments introduce subtle security considerations if omitted.
These considerations should be carefully analyzed. Therefore, omitting `subtle`
arguments requires the use of the **--subtle** flag as a misuse prevention
mechanism.

A JWT signed using JWS has three parts:

    1. A base64 encoded JSON object representing the JOSE (JSON Object Signing
       and Encryption) header that describes the cryptographic operations
       applied to the JWT Claims Set
    2. A base64 encoded JSON object representing the JWT Claims Set
    3. A base64 encoded digital signature of message authentication code

For examples, see **step help crypto jwt**.

## Options


**--alg**=`algorithm`, **--algorithm**=`algorithm`
The signature or MAC algorithm to use. Algorithms are case-sensitive strings
defined in RFC7518. The selected algorithm must be compatible with the key
type. This flag is optional. If not specified, the "alg" member of the JWK is
used. If the JWK has no "alg" member then a default is selected depending on
the JWK key type. If the JWK has an "alg" member and the "alg" flag is passed
the two options must match unless the '--subtle' flag is also passed.

`algorithm` is a case-sensitive string and must be one of:

- **HS256**: HMAC using SHA-256 (default for "oct" key type)

- **HS384**: HMAC using SHA-384

- **HS512**: HMAC using SHA-512

- **RS256**: RSASSA-PKCS1-v1_5 using SHA-256 (default for "RSA" key type)

- **RS384**: RSASSA-PKCS1-v1_5 using SHA-384

- **RS512**: RSASSA-PKCS1-v1_5 using SHA-512

- **ES256**: ECDSA using P-256 and SHA-256 (default for "EC" key type)

- **ES384**: ECDSA using P-384 and SHA-384

- **ES512**: ECDSA using P-521 and SHA-512

- **PS256**: RSASSA-PSS using SHA-256 and MGF1 with SHA-256

- **PS384**: RSASSA-PSS using SHA-384 and MGF1 with SHA-384

- **PS512**: RSASSA-PSS using SHA-512 and MGF1 with SHA-512

- **EdDSA**: EdDSA signature algorithm

**--iss**=`issuer`, **--issuer**=`issuer`
The issuer of this JWT. The processing of this claim is generally
application specific. Typically, the issuer must match the name of some
trusted entity (e.g., an identity provider like "https://accounts.google.com")
and identify which key(s) to use for JWT verification and/or decryption (e.g.,
the keys at "https://www.googleapis.com/oauth2/v3/certs").

`issuer` is a case-sensitive string.

**--aud**=`audience`, **--audience**=`audience`
The intended recipient(s) of the JWT, encoded as the **"aud"** claim in the
JWT. Recipient(s) must identify themselves with one or more of the values in
the **"aud"** claim. The **"aud"** claim can be a string (indicating a single
recipient) or an array (indicating multiple potential recipients). This flag
can be used multiple times to generate a JWK with multiple intended
recipients.

Each `audience` is a case-sensitive string.

**--sub**=`subject`, **--subject**=`subject`
The subject of this JWT. The "claims" are normally interpreted as statements
about this subject. The subject must either be locally unique in the context
of the issuer or globally unique. The processing of this claim is generally
application specific.

`subject` is a case-sensitive string.

**--exp**=`expiration`, **--expiration**=`expiration`
The expiration time on or after which the JWT must not be accepted.
`expiration` must be a numeric value representing a Unix timestamp.

**--nbf**=`not-before`, **--not-before**=`not-before`
The time before which the JWT must not be accepted. `not-before` must be a
numeric value representing a Unix timestamp. If not provided, the current time
is used.

**--iat**=`value`, **--issued-at**=`value`
The time at which the JWT was issued, used to determine the age of the JWT.
ISSUED_AT must be a numeric value representing a Unix timestamp. If not
provided, the current time is used.

**--jti**=`jti`, **--jwt-id**=`jti`
A unique identifier for the JWT. The identifier must be assigned in a manner
that ensures that there is a negligible probability that the same value will
be accidentally assigned to multiple JWTs. The JTI claim can be used to
prevent a JWT from being replayed (i.e., recipient(s) can use `jti` to make a
JWT one-time-use). The `jti` argument is a case-sensitive string. If the
**--jti** flag is used without an argument a `jti` will be generated randomly
with sufficient entropy to satisfy the collision-resistance criteria.

**--header**=`key=value`
The `key=value` used as a header in the JWT token. Use the flag multiple
times to set multiple headers.

**--key**=`file`, **--x5c-key**=`file`, **--x5t-key**=`file`
The `file` containing the key with which to sign the JWT.
JWTs can be signed using a private JWK (or a JWK encrypted as a JWE payload) or
a PEM encoded private key (or a private key encrypted using the modes described
on RFC 1423 or with PBES2+PBKDF2 described in RFC 2898).

**--jwks**=`jwks`
The JWK Set containing the key to use to sign the JWT. The `jwks` argument
should be the name of a file. The file contents should be a JWK Set or a JWE
with a JWK Set payload. The **--jwks** flag requires the use of the **--kid**
flag to specify which key to use.

**--kid**=`kid`
The ID of the key used to sign the JWT. The `kid` argument is a case-sensitive
string. When used with '--jwk' the `kid` value must match the **"kid"** member
of the JWK. When used with **--jwks** (a JWK Set) the `kid` value must match
the **"kid"** member of one of the JWKs in the JWK Set.

**--password-file**=`file`
The path to the `file` containing the password to decrypt the key.

**--x5c-cert**=`chain`
Certificate (`chain`) in PEM format to store in the 'x5c' header of a JWT.

**--x5t-cert**=`file`
Certificate `file` in PEM format to use for the 'x5t' header of a JWS or JWT

**--x5c-insecure**
Use the JWT header 'x5cInsecure' instead of 'x5c'.

