---
layout: auto-doc
category: reference
title: step crypto jwt verify
menu:
  docs:
    parent: step crypto jwt
---

## Name
**step crypto jwt verify** -- verify a signed JWT data structure and return the payload

## Usage

```raw
step crypto jwt verify
[--aud=<audience>] [--iss=<issuer>] [--alg=<algorithm>]
[--key=<file>] [--jwks=<jwks>] [--kid=<kid>]
```

## Description

**step crypto jwt verify** reads a JWT data structure from STDIN; checks that
the audience, issuer, and algorithm are in agreement with expectations;
verifies the digital signature or message authentication code as appropriate;
and outputs the decoded payload of the JWT on STDOUT. If verification fails a
non-zero failure code is returned. If verification succeeds the command
returns 0.

For a JWT to be verified successfully:

  * The JWT must be well formed (no errors during deserialization)
  * The `algorithm` must match the **"alg"** member in the JWT header
  * The `issuer` and `audience` must match the **"iss"** and **"aud"** claims in the JWT,
    respectively
  * The `kid` must match the **"kid"** member in the JWT header (if both are
    present) and must match the **"kid"** in the JWK or the **"kid"** of one of the
    JWKs in JWKS
  * The JWT signature must be successfully verified
  * The JWT must not be expired

For examples, see **step help crypto jwt**.

## Options


**--iss**=`issuer`, **--issuer**=`issuer`
The issuer of this JWT. The `issuer` must match the value of the **"iss"** claim in
the JWT. `issuer` is a case-sensitive string. Required unless disabled with the **--subtle** flag.

**--aud**=`audience`, **--audience**=`audience`
The identity of the principal running this command. The `audience` specified
must match one of the values in the **"aud"** claim, indicating the intended
recipient(s) of the JWT. `audience` is a case-sensitive string. Required unless disabled with the
**--subtle** flag.

**--alg**=`algorithm`, **--algorithm**=`algorithm`
The signature or MAC `algorithm` to use. Algorithms are case-sensitive strings
defined in RFC7518. If the key used do verify the JWT is not a JWK, or if it
is a JWK but does not have an **"alg"** member indicating its the intended
algorithm for use with the key, then the **--alg** flag is required to prevent
algorithm downgrade attacks. To disable this protection you can pass the
**--insecure** flag and omit the **--alg** flag.

**--key**=`file`
The `file` containing the key to use to verify the JWT.
The contents of the file can be a public or private JWK (or a JWK
encrypted as a JWE payload) or a public or private PEM (or a private key
encrypted using the modes described on RFC 1423 or with PBES2+PBKDF2 described
in RFC 2898).

**--jwks**=`jwks`
The JWK Set containing the key to use to verify the JWS. The `jwks` argument
should be the name of a file. The file contents should be a JWK Set or a JWE
with a JWK Set payload. The JWS being verified should have a "kid" member that
matches the "kid" of one of the JWKs in the JWK Set. If the JWS does not have
a "kid" member the '--kid' flag can be used.

**--kid**=`kid`
The ID of the key used to sign the JWK, used to select a JWK from a JWK Set.
The KID argument is a case-sensitive string. If the input JWS has a "kid"
member its value must match `kid` or verification will fail.

**--password-file**=`file`
The path to the `file` containing the password to decrypt the key.

