---
layout: auto-doc
title: step ca revoke
menu:
  docs:
    parent: step ca
---

## Name
**step ca revoke** -- revoke a certificate

## Usage

```raw
step ca revoke <serial-number>
[--cert=<file>] [--key=<file>] [--token=<ott>]
[--reason=<string>] [--reasonCode=<code>] [-offline]
[--ca-url=<uri>] [--root=<file>] [--context=<name>]
```

## Description


**step ca revoke** command revokes a certificate with the given serial
number.

**Active Revocation**: A certificate is no longer valid from the moment it has
been actively revoked. Clients are required to check against centralized
sources of certificate validity information (e.g. by using CRLs (Certificate
Revocation Lists) or OCSP (Online Certificate Status Protocol)) to
verify that certificates have not been revoked. Active Revocation requires
clients to take an active role in certificate validation for the benefit of
real time revocation.

**Passive Revocation**: A certificate that has been passively revoked can no
longer be renewed. It will still be valid for the remainder of it's validity period,
but cannot be prolonged. The benefit of passive revocation is that clients
can verify certificates in a simple, decentralized manner without relying on
centralized 3rd parties. Passive revocation works best with short
certificate lifetimes.

**step ca revoke** currently only supports passive revocation. Active revocation
is on our roadmap.

A revocation request can be authorized using a JWK provisioner token, or using a
client certificate.

When you supply a serial number, you're prompted to choose a provisioner,
and a provisioner token is transparently generated. Any JWK provisioner
can revoke any certificate.

When you supply a certificate and private key (with --crt and --key),
mTLS is used to authorize the revocation.

Certificates generated using an OIDC provisioner cannot be revoked
by their serial number.

## Positional arguments

`serial-number`
The serial number of the certificate that should be revoked. Can be left blank,
either to be supplied by prompt, or when using the --cert and --key flags for
revocation over mTLS.

## Options


**--cert**=`file`
The `file` containing the cert that should be revoked.

**--key**=`file`
The `file` containing the key corresponding to the cert that should be revoked.

**--reason**=`string`
The `string` representing the reason for which the cert is being revoked.

**--reasonCode**=`reasonCode`
The `reasonCode` specifies the reason for revocation - chose from a list of
common revocation reasons. If unset, the default is Unspecified.

`reasonCode` can be a number from 0-9 or a case insensitive string matching
one of the following options:

- **Unspecified**: No reason given (Default -- reasonCode=0).

- **KeyCompromise**: The key is believed to have been compromised (reasonCode=1).

- **CACompromise**: The issuing Certificate Authority itself has been compromised (reasonCode=2).

- **AffiliationChanged**: The certificate contained affiliation information, for example, it may
have been an EV certificate and the associated business is no longer owned by
the same entity (reasonCode=3).

- **Superseded**: The certificate is being replaced (reasonCode=4).

- **CessationOfOperation**: If a CA is decommissioned, no longer to be used, the CA's certificate
should be revoked with this reason code. Do not revoke the CA's certificate if
the CA no longer issues new certificates, yet still publishes CRLs for the
currently issued certificates (reasonCode=5).

- **CertificateHold**: A temporary revocation that indicates that a CA will not vouch for a
certificate at a specific point in time. Once a certificate is revoked with a
CertificateHold reason code, the certificate can then be revoked with another
Reason Code, or unrevoked and returned to use (reasonCode=6).

- **RemoveFromCRL**: If a certificate is revoked with the CertificateHold reason code, it is
possible to "unrevoke" a certificate. The unrevoking process still lists the
certificate in the CRL, but with the reason code set to RemoveFromCRL.
Note: This is specific to the CertificateHold reason and is only used in DeltaCRLs
(reasonCode=8).

- **PrivilegeWithdrawn**: The right to represent the given entity was revoked for some reason
(reasonCode=9).

- **AACompromise**: It is known or suspected that aspects of the AA validated in the
attribute certificate have been compromised (reasonCode=10).


**--token**=`token`
The one-time `token` used to authenticate with the CA in order to create the
certificate.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$(step path)/config/ca.json

**--offline**
Creates a certificate without contacting the certificate authority. Offline mode
uses the configuration, certificates, and keys created with **step ca init**,
but can accept a different configuration file using **--ca-config** flag.

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--context**=`name`
The context `name` to apply for the given command.

## Examples

Revoke a certificate using a transparently generated JWK provisioner token and the default
'unspecified' reason:
```shell
$ step ca revoke 308893286343609293989051180431574390766
```

Revoke a certificate using a transparently generated token and configured reason
and reasonCode:
```shell
$ step ca revoke --reason "laptop compromised" --reasonCode 1 308893286343609293989051180431574390766
```

Revoke a certificate using a transparently generated token and configured reason
and stringified reasonCode:
```shell
$ step ca revoke --reason "laptop compromised" --reasonCode "key compromise" 308893286343609293989051180431574390766
```

Revoke a certificate using that same certificate to validate and authorize the
request (rather than a token) over mTLS:
```shell
$ step ca revoke --cert mike.cert --key mike.key
```

Revoke a certificate using a JWK token, pre-generated by a provisioner, to authorize
the request with the CA:
```shell
$ TOKEN=$(step ca token --revoke 308893286343609293989051180431574390766)
$ step ca revoke --token $TOKEN 308893286343609293989051180431574390766
```

Revoke a certificate in offline mode:
```shell
$ step ca revoke --offline 308893286343609293989051180431574390766
```

Revoke a certificate in offline mode using --cert and --key (the cert/key pair
will be validated against the root and intermediate certifcates configured in
the step CA):
```shell
$ step ca revoke --offline --cert foo.crt --key foo.key
```

