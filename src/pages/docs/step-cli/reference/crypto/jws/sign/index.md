---
layout: auto-doc
title: step crypto jws sign
menu:
  docs:
    parent: step crypto jws
---

## Name
**step crypto jws sign** -- create a signed JWS data structure

## Usage

```raw
step crypto jws sign [- | <filename>]
[--alg=<algorithm>] [--jku=<jwk-url>] [--jwk] [--typ=<type>]
[--cty=<content-type>] [--key=<file>] [--jwks=<jwks>] [--kid=<kid>]
[--password-file=<file>] [--x5c-cert=<file>] [--x5c-key=<file>]
[--x5t-cert=<file>] [--x5t-key=<file>]
```

## Description

**step crypto jws sign** generates a signed JSON Web Signature (JWS) by
computing a digital signature or message authentication code for an arbitrary
payload. By default, the payload to sign is read from STDIN and the JWS will
be written to STDOUT.

For examples, see **step help crypto jws**.

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

**--jku**=`jwk-url`
The "jku" (JWK Set URL) Header Parameter is a URI that refers to a resource
for a set of JSON-encoded public keys, one of which corresponds to the key
used to digitally sign the JWS. The keys MUST be encoded as a JWK Set (JWK).
The protocol used to acquire the resource MUST provide integrity protection;
an HTTP GET request to retrieve the JWK Set MUST use Transport Layer Security
(TLS); and the identity of the server MUST be validated. Use of `jwk-url` is
optional.

**--jwk**=`jwk`
The "jwk" (JSON Web Key) Header Parameter is the public key that corresponds
to the key used to digitally sign the JWS. This key is represented as a JSON
Web Key (JWK). Use of `jwk` is optional.

**--typ**=`type`, **--type**=`type`
The "typ" (type) Header Parameter is used by JWS applications to declare the
media type of this complete JWS. This is intended for use by the application
when more than one kind of object could be present in an application data
structure that can contain a JWS; the application can use this value to
disambiguate among the different kinds of objects that might be present. It
will typically not be used by applications when the kind of object is already
known. This parameter is ignored by JWS implementations; any processing of
this parameter is performed by the JWS application. Use of `type` is
optional.

The "typ" value "JOSE" can be used by applications to indicate that this
object is a JWS or JWE using the JWS Compact Serialization or the JWE Compact
Serialization. The "typ" value "JOSE+JSON" can be used by applications to
indicate that this object is a JWS or JWE using the JWS JSON Serialization or
the JWE JSON Serialization. Other type values can also be used by
applications.

**--cty**=`content-type`
The "cty" (content type) Header Parameter is used by JWS applications to
declare the media type of the secured content (the payload). This is intended
for use by the application when more than one kind of object could be present
in the JWS Payload; the application can use this value to disambiguate among
the different kinds of objects that might be present. It will typically not be
used by applications when the kind of object is already known. This parameter
is ignored by JWS implementations; any processing of this parameter is
performed by the JWS application. Use of `content-type` is optional.

**--key**=`file`, **--x5c-key**=`file`, **--x5t-key**=`file`
The `file` containing the key with which to sign the JWS.
JWSs can be signed using a private JWK (or a JWK encrypted as a JWE payload) or
a PEM encoded private key (or a private key encrypted using the modes described
on RFC 1423 or with PBES2+PBKDF2 described in RFC 2898).

**--jwks**=`jwks`
The JWK Set containing the key to use to sign the JWS. The `jwks` argument
should be the name of a file. The file contents should be a JWK Set or a JWE
with a JWK Set payload. The **--jwks** flag requires the use of the **--kid**
flag to specify which key to use.

**--kid**=`kid`
The ID of the key used to sign the JWS. The `kid` argument is a case-sensitive
string. When used with '--jwk' the `kid` value must match the **"kid"** member
of the JWK. When used with **--jwks** (a JWK Set) the `kid` value must match
the **"kid"** member of one of the JWKs in the JWK Set.

**--password-file**=`file`
The path to the `file` containing the password to encrypt or decrypt the private key.

**--x5c-cert**=`chain`
Certificate (`chain`) in PEM format to store in the 'x5c' header of a JWT.

**--x5t-cert**=`file`
Certificate `file` in PEM format to use for the 'x5t' header of a JWS or JWT

