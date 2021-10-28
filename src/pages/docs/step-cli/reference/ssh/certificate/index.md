---
layout: auto-doc
title: step ssh certificate
menu:
  docs:
    parent: step ssh
---

## Name
**step ssh certificate** -- sign a SSH certificate using the the SSH CA

## Usage

```raw
step ssh certificate <key-id> <key-file>
[--host] [--host-id] [--sign] [--principal=<string>] [--password-file=<file>]
[--provisioner-password-file=<file>] [--add-user]
[--not-before=<time|duration>] [--not-after=<time|duration>]
[--token=<token>] [--issuer=<name>] [--ca-url=<uri>]
[--root=<file>] [--no-password] [--insecure] [--force]
[--x5c-cert=<file>] [--x5c-key=<file>] [--k8ssa-token-path=<file>]
```

## Description

**step ssh certificate** command generates an SSH key pair and creates a
certificate using [step certificates](https://github.com/smallstep/certificates).

With a certificate clients or servers may trust only the CA key and verify its
signature on a certificate rather than trusting many user/host keys.

Note that not all the provisioner types will be able to generate user and host
certificates. Currently JWK provisioners can generate both, but with an OIDC
provisioner you will only be able to generate user certificates unless you are
and admin that can generate both. With a cloud identity provisioner you will
only be able to generate host certificates.

To configure a server to accept user certificates and provide a user certificate
you need to add the following lines in `/etc/ssh/sshd_config`:
```shell
# The path to the CA public key, it accepts multiple user CAs, one per line
TrustedUserCAKeys /etc/ssh/ssh_user_key.pub

# Path to the private key and certificate
HostKey /etc/ssh/ssh_host_ecdsa_key
HostCertificate /etc/ssh/ssh_host_ecdsa_key-cert.pub
```

Make sure to restart the sshd daemon to refresh its configuration.

To configure clients to accept host certificates you need to add the host CA public
key in `~/.ssh/known_hosts` with the following format:
```shell
@cert-authority *example.com ecdsa-sha2-nistp256 AAAAE...=
```

Where `*.example.com` is a pattern that matches the hosts and
`ecdsa-sha2-nistp256 AAAAE...=` should be the contents of the host CA public key.

## Positional arguments

`key-id`
The certificate identity. If no principals are passed we will use
the key-id as a principal, if it has the format abc@def then the principal will
be abc.

`key-file`
The private key name when generating a new key pair, or the public
key path when we are just signing it.

## Options


**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$STEPPATH/config/ca.json

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**-f**, **--force**
Force the overwrite of files without asking.

**--insecure**


**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--no-password**
Do not ask for a password to encrypt a private key. Sensitive key material will
be written to disk unencrypted. This is not recommended. Requires **--insecure** flag.

**--not-before**=`time|duration`
The `time|duration` when the certificate validity period starts. If a `time` is
used it is expected to be in RFC 3339 format. If a `duration` is used, it is a
sequence of decimal numbers, each with optional fraction and a unit suffix, such
as "300ms", "-1.5h" or "2h45m". Valid time units are "ns", "us" (or "µs"), "ms",
"s", "m", "h".

**--not-after**=`time|duration`
The `time|duration` when the certificate validity period ends. If a `time` is
used it is expected to be in RFC 3339 format. If a `duration` is used, it is a
sequence of decimal numbers, each with optional fraction and a unit suffix, such
as "300ms", "-1.5h" or "2h45m". Valid time units are "ns", "us" (or "µs"), "ms",
"s", "m", "h".

**--offline**
Creates a certificate without contacting the certificate authority. Offline mode
uses the configuration, certificates, and keys created with **step ca init**,
but can accept a different configuration file using **--ca-config** flag.

**--provisioner**=`name`, **--issuer**=`name`
The provisioner `name` to use.

**--token**=`token`
The one-time `token` used to authenticate with the CA in order to create the
certificate.

**--set**=`key=value`
The `key=value` pair with template data variables to send to the CA. Use the **--set** flag multiple times to add multiple variables.

**--set-file**=`file`
The JSON `file` with the template data to send to the CA.

**--add-user**
Create a user provisioner certificate used to create a new user.

**--host**
Create a host certificate instead of a user certificate.

**--host-id**=`UUID`
Specify a `UUID` to identify the host rather than using an auto-generated UUID.
      If "machine" is passed, derive a UUID from "/etc/machine-id."

**--password-file**=`file`
The path to the `file` containing the password to encrypt the private key.

**--principal**=`name`, **-n**=`name`
Add the specified principal (user or host `name`s) to the certificate request.
      This flag can be used multiple times. However, it cannot be used in conjunction
      with '--token' when requesting certificates from OIDC, JWK, and X5C provisioners, or
      from any provisioner with 'disableCustomSANs' set to 'true'. These provisioners will
      use the contents of the token to determine the principals.

**--private-key**=`value`
When signing an existing public key, use this flag to specify the corresponding
private key so that the pair can be added to an SSH Agent.

**--provisioner-password-file**=`file`
The path to the `file` containing the password to decrypt the one-time token
      generating key.

**--sign**
Sign the public key passed as an argument instead of creating one.

**--x5c-cert**=`chain`
Certificate (`chain`) in PEM format to store in the 'x5c' header of a JWT.

**--x5c-key**=`file`
Private key `file`, used to sign a JWT, corresponding to the certificate that will
be stored in the 'x5c' header.

**--k8ssa-token-path**=`file`
Configure the `file` from which to read the kubernetes service account token.

## Examples

Generate a new SSH key pair and user certificate:
```shell
$ step ssh certificate mariano@work id_ecdsa
```

Generate a new SSH key pair and user certificate and set the lifetime to 2hrs:
```shell
$ step ssh certificate mariano@work id_ecdsa --not-after 2h
```

Generate a new SSH key pair and user certificate and set the lifetime to begin
2hrs from now and last for 8hrs:
```shell
$ step ssh certificate mariano@work id_ecdsa --not-before 2h --not-after 10h
```

Sign an SSH public key and generate a user certificate:
```shell
$ step ssh certificate --sign mariano@work id_ecdsa.pub
```

Generate a new SSH key pair and host certificate:
```shell
$ step ssh certificate --host internal.example.com ssh_host_ecdsa_key
```

Sign an SSH public key and generate a host certificate:
```shell
$ step ssh certificate --host --sign \
  internal.example.com ssh_host_ecdsa_key.pub
```

Sign an SSH public key and generate a host certificate with a custom uuid:
```shell
$ step ssh certificate --host --host-id 00000000-0000-0000-0000-000000000000 \
  --sign internal.example.com ssh_host_ecdsa_key.pub
```

Sign an SSH public key and generate a host certificate with a uuid derived
from '/etc/machine-id':
```shell
$ step ssh certificate --host --host-id machine --sign \
  internal.example.com ssh_host_ecdsa_key.pub
```

Generate an ssh certificate with custom principals from an existing key pair and
add the certificate to the ssh agent:
```shell
$ step ssh certificate --principal max --principal mariano --sign \
  ops@work id_ecdsa.pub --private-key id_ecdsa_key
```

Generate a new key pair and a certificate using a given token:
```shell
$ step ssh certificate --token $TOKEN mariano@work id_ecdsa
```

