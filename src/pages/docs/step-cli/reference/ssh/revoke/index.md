---
layout: auto-doc
title: step ssh revoke
menu:
  docs:
    parent: step ssh
---

## Name
**step ssh revoke** -- revoke a SSH certificate using the SSH CA

## Usage

```raw
step ssh revoke <serial-number>
[--token=<token>]  [--issuer=<name>] [--set=<key=value>]
[--set-file=<file>] [--password-file=<file>] [--reason=<string>]
[--reasonCode=<code>] [--sshpop-cert=<file>] [--sshpop-key=<key>]
[--offline] [--ca-config=<file>] [--ca-url=<uri>] [--root=<file>]
[--context=<name>]
```

## Description

**step ssh revoke** command revokes an SSH Cerfificate
using [step certificates](https://github.com/smallstep/certificates).

## Positional arguments

`serial-number`
The serial number of the SSH certificate to revoke.

## Options


**--token**=`token`
The one-time `token` used to authenticate with the CA in order to create the
certificate.

**--provisioner-password-file**=`file`
The path to the `file` containing the password to decrypt the one-time token
      generating key.

**--provisioner**=`name`, **--issuer**=`name`
The provisioner `name` to use.

**--set**=`key=value`
The `key=value` pair with template data variables. Use the **--set** flag multiple times to add multiple variables.

**--set-file**=`file`
The JSON `file` with the template data variables.

**--sshpop-cert**=`chain`
Certificate (`chain`) in PEM format to store in the 'sshpop' header of a JWT.

**--sshpop-key**=`file`
Private key `file`, used to sign a JWT, corresponding to the certificate that will
be stored in the 'sshpop' header.

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


**--offline**
Creates a certificate without contacting the certificate authority. Offline mode
uses the configuration, certificates, and keys created with **step ca init**,
but can accept a different configuration file using **--ca-config** flag.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$(step path)/config/ca.json

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--context**=`name`
The context `name` to apply for the given command.

## Examples

revoke an ssh certificate:
```shell
$ step ssh revoke 3997477584487736496
```

