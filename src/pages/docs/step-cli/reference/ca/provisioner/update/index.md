---
layout: auto-doc
category: reference
title: step ca provisioner update
menu:
  docs:
    parent: step ca provisioner
---

## Name
**step ca provisioner update** -- update a provisioner

## Usage

```raw
step ca provisioner update <name> [--public-key=<file>]
[--private-key=<file>] [--create] [--password-file=<file>]
[--admin-cert=<file>] [--admin-key=<file>] [--admin-subject=<subject>]
[--admin-provisioner=<name>] [--admin-password-file=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>] [--ca-config=<file>]

ACME

step ca provisioner update <name> [--force-cn] [--require-eab]
[--challenge=<challenge>] [--remove-challenge=<challenge>]
[--attestation-format=<format>] [--remove-attestation-format=<format>]
[--attestation-roots=<file>] [--admin-cert=<file>] [--admin-key=<file>]
[--admin-subject=<subject>] [--admin-provisioner=<name>] [--admin-password-file=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>] [--ca-config=<file>]

OIDC

step ca provisioner update <name>
[--client-id=<id>] [--client-secret=<secret>]
[--configuration-endpoint=<url>] [--listen-address=<address>]
[--domain=<domain>] [--remove-domain=<domain>]
[--group=<group>] [--remove-group=<group>]
[--admin=<email>]... [--remove-admin=<email>]...
[--admin-cert=<file>] [--admin-key=<file>] 
[--admin-subject=<subject>] [--admin-provisioner=<name>] [--admin-password-file=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>] [--ca-config=<file>]

X5C

step ca provisioner update <name> --x5c-roots=<file>
[--admin-cert=<file>] [--admin-key=<file>] 
[--admin-subject=<subject>] [--admin-provisioner=<name>] [--admin-password-file=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>] [--ca-config=<file>]

K8SSA (Kubernetes Service Account)

step ca provisioner update <name> [--public-key=<file>]
[--admin-cert=<file>] [--admin-key=<file>] 
[--admin-subject=<subject>] [--admin-provisioner=<name>] [--admin-password-file=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>] [--ca-config=<file>]

IID (AWS/GCP/Azure)

step ca provisioner update <name>
[--aws-account=<id>]... [--remove-aws-account=<id>]...
[--gcp-service-account=<name>]... [--remove-gcp-service-account=<name>]...
[--gcp-project=<name>]... [--remove-gcp-project=<name>]...
[--azure-tenant=<id>] [--azure-resource-group=<name>]
[--azure-audience=<name>] [--azure-subscription-id=<id>]
[--azure-object-id=<id>] [--instance-age=<duration>]
[--disable-custom-sans] [--disable-trust-on-first-use]
[--admin-cert=<file>] [--admin-key=<file>] 
[--admin-subject=<subject>] [--admin-provisioner=<name>] [--admin-password-file=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>] [--ca-config=<file>]

SCEP

step ca provisioner update <name> [--force-cn] [--challenge=<challenge>]
[--capabilities=<capabilities>] [--include-root] [--minimum-public-key-length=<length>]
[--encryption-algorithm-identifier=<id>][--admin-cert=<file>] [--admin-key=<file>] 
[--admin-subject=<subject>] [--admin-provisioner=<name>] [--admin-password-file=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>] [--ca-config=<file>]
```

## Description

**step ca provisioner update** updates a provisioner in the CA configuration.

## Positional arguments

`name`
The name of the provisioner.

## Options


**--name**=`name`
The new `name` for the provisioner.

**--public-key**=`file`
The `file` containing the JWK public key. Or, a `file`
containing one or more PEM formatted keys, if used with the K8SSA provisioner.

**--create**
Create the JWK key pair for the provisioner.

**--private-key**=`file`
The `file` containing the JWK private key.

**--client-id**=`id`
The `id` used to validate the audience in an OpenID Connect token.

**--client-secret**=`secret`
The `secret` used to obtain the OpenID Connect tokens.

**--listen-address**=`address`
The callback `address` used in the OpenID Connect flow (e.g. ":10000")

**--configuration-endpoint**=`url`
OpenID Connect configuration `url`.

**--admin**=`email`
The `email` of an admin user in an OpenID Connect provisioner, this user
will not have restrictions in the certificates to sign. Use the
'--admin' flag multiple times to configure multiple administrators.

**--remove-admin**=`email`
Remove the `email` of an admin user in an OpenID Connect provisioner, this user
will not have restrictions in the certificates to sign. Use the
'--remove-admin' flag multiple times to remove multiple administrators.

**--domain**=`domain`
The `domain` used to validate the email claim in an OpenID Connect provisioner.
Use the '--domain' flag multiple times to configure multiple domains.

**--remove-domain**=`domain`
Remove the `domain` used to validate the email claim in an OpenID Connect provisioner.
Use the '--remove-domain' flag multiple times to remove multiple domains.

**--group**=`group`
The `group` list used to validate the groups extension in an OpenID Connect token.
Use the '--group' flag multiple times to configure multiple groups.

**--tenant-id**=`tenant-id`
The `tenant-id` used to replace the templatized {tenantid} in the OpenID Configuration.

**--x5c-roots**=`file`, **--x5c-root**=`file`
PEM-formatted root certificate(s) `file` used to validate the signature on X5C
provisioning tokens.

**--nebula-root**=`file`
Root certificate (chain) `file` used to validate the signature on Nebula
provisioning tokens.

**--require-eab**
Require (and enable) External Account Binding (EAB) for Account creation.
If this flag is set to false, then disable EAB.

**--force-cn**
Always set the common name in provisioned certificates.

**--challenge**=`challenge`
With a SCEP provisioner the `challenge` is a shared secret between a
client and the CA.

With an ACME provisioner, this flag specifies the `challenge` or challenges to
enable. Use the flag multiple times to configure multiple challenges.

The supported ACME challenges are:

**http-01**
With the HTTP challenge, the client in an ACME transaction proves its control
over a domain name by proving that it can provision HTTP resources on a server
accessible under that domain name.

**dns-01**
With the DNS challenge, the client can prove control of a domain by
provisioning a TXT resource record containing a designated value for a specific
validation domain name.

**tls-alpn-01**
With the TLS with Application-Layer Protocol Negotiation (TLS ALPN) challenge,
the client can prove control over a domain name by configuring a TLS server to
respond to specific connection attempts using the ALPN extension with
identifying information.

**device-attest-01**
With the device attestation challenge, the client can prove control over a
permanent identifier of a device by providing an attestation statement
containing the identifier of the device.

If the provisioner has no challenges configured, http-01, dns-01 and tls-alpn-01
will be automatically enabled.

**--remove-challenge**=`challenge`
Remove an ACME `challenge` from the list configured in the provisioner.
Use the flag multiple times to remove multiple challenges.

**--attestation-format**=`format`
Enable an ACME attestation statement `format` in the provisioner. Use the flag
multiple times to configure multiple challenges.

The supported ACME attestation formats are:

**apple**
With the apple format, Apple devices can use the device-attest-01 challenge to
get a new certificate.

**step**
With the step format, devices like YubiKeys that can generate an attestation
certificate can use the device-attest-01 challenge to get a new certificate.

**tpm**
With the tpm format, devices with TPMs can use the device-attest-01 challenge
to get a new certificate.

**--remove-attestation-format**=`format`
Remove an ACME attestation statement `format` from the list configured in the provisioner.
Use the flag multiple times to remove multiple formats.

**--attestation-roots**=`file`
PEM-formatted root certificate(s) `file` used to validate the attestation
certificates. Use the flag multiple times to read from multiple files.

**--capabilities**=`capabilities`
The SCEP `capabilities` to advertise

**--include-root**
Include the CA root certificate in the SCEP CA certificate chain

**--min-public-key-length**=`length`
The minimum public key `length` of the SCEP RSA encryption key

**--encryption-algorithm-identifier**=`id`
The `id` for the SCEP encryption algorithm to use.
      Valid values are 0 - 4, inclusive. The values correspond to:
      0: DES-CBC,
      1: AES-128-CBC,
      2: AES-256-CBC,
      3: AES-128-GCM,
      4: AES-256-GCM.
      Defaults to DES-CBC (0) for legacy clients.

**--aws-account**=`id`
The AWS account `id` used to validate the identity documents.
Use the flag multiple times to configure multiple accounts.

**--remove-aws-account**=`id`
Remove an AWS account `id` used to validate the identity documents.
Use the flag multiple times to remove multiple accounts.

**--azure-tenant**=`id`
The Microsoft Azure tenant `id` used to validate the identity tokens.

**--azure-resource-group**=`name`
The Microsoft Azure resource group `name` used to validate the identity tokens.
Use the flag multiple times to configure multiple resource groups

**--remove-azure-resource-group**=`name`
Remove a Microsoft Azure resource group `name` used to validate the identity tokens.
Use the flag multiple times to configure multiple resource groups

**--azure-audience**=`name`
The Microsoft Azure audience `name` used to validate the identity tokens.

**--azure-subscription-id**=`id`
The Microsoft Azure subscription `id` used to validate the identity tokens.
Use the flag multiple times to configure multiple subscription IDs

**--remove-azure-subscription-id**=`id`
Remove a Microsoft Azure subscription `id` used to validate the identity tokens.
Use the flag multiple times to configure multiple subscription IDs

**--azure-object-id**=`id`
The Microsoft Azure AD object `id` used to validate the identity tokens.
Use the flag multiple times to configure multiple object IDs

**--remove-azure-object-id**=`id`
Remove a Microsoft Azure AD object `id` used to validate the identity tokens.
Use the flag multiple times to remove multiple object IDs

**--gcp-service-account**=`email`
The Google service account `email` or `id` used to validate the identity tokens.
Use the flag multiple times to configure multiple service accounts.

**--remove-gcp-service-account**=`email`
Remove a Google service account `email` or `id` used to validate the identity tokens.
Use the flag multiple times to remove multiple service accounts.

**--gcp-project**=`id`
The Google project `id` used to validate the identity tokens.
Use the flag multiple times to configure multiple projects

**--remove-gcp-project**=`id`
Remove a Google project `id` used to validate the identity tokens.
Use the flag multiple times to remove multiple projects

**--instance-age**=`duration`
The maximum `duration` to grant a certificate in AWS and GCP provisioners.
A `duration` is sequence of decimal numbers, each with optional fraction and a
unit suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".

**--disable-custom-sans**
On cloud provisioners, if enabled only the internal DNS and IP will be added as a SAN.
By default it will accept any SAN in the CSR.

**--disable-trust-on-first-use**, **--disable-tofu**
On cloud provisioners, if enabled multiple sign request for this provisioner
with the same instance will be accepted. By default only the first request
will be accepted.

**--x509-template**=`file`
The x509 certificate template `file`, a JSON representation of the certificate to create.

**--x509-template-data**=`file`
The x509 certificate template data `file`, a JSON map of data that can be used by the certificate template.

**--ssh-template**=`file`
The x509 certificate template `file`, a JSON representation of the certificate to create.

**--ssh-template-data**=`file`
The ssh certificate template data `file`, a JSON map of data that can be used by the certificate template.

**--x509-min-dur**=`duration`
The minimum `duration` for an x509 certificate generated by this provisioner.
Value must be a sequence of decimal numbers, each with optional fraction, and a
unit suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".

**--x509-max-dur**=`duration`
The maximum `duration` for an x509 certificate generated by this provisioner.
Value must be a sequence of decimal numbers, each with optional fraction, and a
unit suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".

**--x509-default-dur**=`duration`
The default `duration` for an x509 certificate generated by this provisioner.
Value must be a sequence of decimal numbers, each with optional fraction, and a
unit suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".

**--ssh-user-min-dur**=`duration`
The minimum `duration` for an ssh user certificate generated by this provisioner.
Value must be a sequence of decimal numbers, each with optional fraction, and a
unit suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".

**--ssh-user-max-dur**=`duration`
The maximum `duration` for an ssh user certificate generated by this provisioner.
Value must be a sequence of decimal numbers, each with optional fraction, and a
unit suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".

**--ssh-user-default-dur**=`duration`
The maximum `duration` for an ssh user certificate generated by this provisioner.
Value must be a sequence of decimal numbers, each with optional fraction, and a
unit suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".

**--ssh-host-min-dur**=`duration`
The minimum `duration` for an ssh host certificate generated by this provisioner.
Value must be a sequence of decimal numbers, each with optional fraction, and a
unit suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".

**--ssh-host-max-dur**=`duration`
The maximum `duration` for an ssh host certificate generated by this provisioner.
Value must be a sequence of decimal numbers, each with optional fraction, and a
unit suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".

**--ssh-host-default-dur**=`duration`
The maximum `duration` for an ssh host certificate generated by this provisioner.
Value must be a sequence of decimal numbers, each with optional fraction, and a
unit suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".

**--disable-renewal**
Disable renewal for all certificates generated by this provisioner.

**--allow-renewal-after-expiry**
Allow renewals for expired certificates generated by this provisioner.

**--ssh**
Enable provisioning of ssh certificates. The default value is true. To
disable ssh use '--ssh=false'.

**--admin-cert**=`chain`
Admin certificate (`chain`) in PEM format to store in the 'x5c' header of a JWT.

**--admin-key**=`file`
Private key `file`, used to sign a JWT, corresponding to the admin certificate that will
be stored in the 'x5c' header.

**--admin-subject**=`subject`, **--admin-name**=`subject`
The admin `subject` to use for generating admin credentials.

**--admin-provisioner**=`name`, **--admin-issuer**=`name`
The provisioner `name` to use for generating admin credentials.

**--admin-password-file**=`file`
The path to the `file` containing the password to decrypt the one-time token
generating key.

**--password-file**=`file`
The path to the `file` containing the password to encrypt or decrypt the private key.

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--context**=`name`
The context `name` to apply for the given command.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$(step path)/config/ca.json

## Examples

Update a JWK provisioner with newly generated keys and a template for x509 certificates:
```shell
step ca provisioner update cicd --create --x509-template ./templates/example.tpl
```

Update a JWK provisioner by removing a previously set template:
```shell
step ca provisioner update cicd --x509-template ""
```

Update a JWK provisioner with duration claims:
```shell
step ca provisioner update cicd --x509-min-dur 20m --x509-default-dur 48h --ssh-user-min-dur 17m --ssh-host-default-dur 16h
```

Update a JWK provisioner with existing keys:
```shell
step ca provisioner update jane@doe.com --public-key jwk.pub --private-key jwk.priv
```

Update a JWK provisioner to disable ssh provisioning:
```shell
step ca provisioner update cicd --ssh=false
```

Update a JWK provisioner by removing a previously cached private key:
```shell
step ca provisioner update cicd --private-key=""
```

Update a JWK provisioner and explicitly select the ca.json to modify:
```shell
step ca provisioner update cicd --ssh=false --ca-config /path/to/ca.json
```

Update an OIDC provisioner:
```shell
step ca provisioner update Google \
  --configuration-endpoint https://accounts.google.com/.well-known/openid-configuration
```

Update an X5C provisioner:
```shell
step ca provisioner update x5c --x5c-roots x5c_ca.crt
```

Update an ACME provisioner:
```shell
step ca provisioner update acme --force-cn --require-eab
```

Update an K8SSA provisioner:
```shell
step ca provisioner update kube --public-key key.pub --x509-min-duration 30m
```

Update an Azure provisioner:
```shell
$ step ca provisioner update Azure \
  --azure-resource-group identity --azure-resource-group accounting
```

Update a GCP provisioner:
```shell
$ step ca provisioner update Google \
  --disable-custom-sans --gcp-project internal --remove-gcp-project public
```

Update an AWS provisioner:
```shell
$ step ca provisioner update Amazon --disable-custom-sans --disable-trust-on-first-use
```

Update a SCEP provisioner:
```shell
step ca provisioner update my_scep_provisioner --force-cn
```

