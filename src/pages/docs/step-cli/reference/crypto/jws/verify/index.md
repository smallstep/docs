---
layout: auto-doc
title: step crypto jws verify
menu:
  docs:
    parent: step crypto jws
---

## Name
**step crypto jws verify** -- verify a signed JWS data structure and return the payload

## Usage

```raw
step crypto jws verify
[--alg=<algorithm>] [--key=<file>] [--jwks=<jwks>] [--kid=<kid>]
```

## Description

**step crypto jws verify** reads a JWS data structure from STDIN; checks that
the algorithm are in agreement with expectations; verifies the digital
signature or message authentication code as appropriate; and outputs the
decoded payload of the JWS on STDOUT. If verification fails a non-zero failure
code is returned. If verification succeeds the command returns 0.

For a JWS to be verified successfully:

  * The JWS must be well formed (no errors during deserialization)
  * The `algorithm` must match the **"alg"** member in the JWS header
  * The `kid` must match the **"kid"** member in the JWS header (if both are
    present) and must match the **"kid"** in the JWK or the **"kid"** of one of the
    JWKs in JWKS
  * The JWS signature must be successfully verified

For examples, see **step help crypto jws**.

## Options


**--alg**=`algorithm`, **--algorithm**=`algorithm`
The signature or MAC `algorithm` to use. Algorithms are case-sensitive strings
defined in RFC7518. If the key used do verify the JWS is not a JWK, or if it
is a JWK but does not have an **"alg"** member indicating its the intended
algorithm for use with the key, then the **--alg** flag is required to prevent
algorithm downgrade attacks. To disable this protection you can pass the
**--insecure** flag and omit the **--alg** flag.

**--key**=`file`
The `file` containing the key with which to verify the JWS.
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

**--json**
Displays the header, payload and signature as a JSON object. The payload will
be encoded using Base64.

