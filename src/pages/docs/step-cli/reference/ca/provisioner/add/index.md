---
layout: auto-doc
title: step ca provisioner add
menu:
  docs:
    parent: step ca provisioner
---

## Name
**step ca provisioner add** -- add one or more provisioners to the CA configuration

## Usage

```raw
step ca provisioner add <name> <jwk-file> [<jwk-file> ...]
--ca-config=<file> [--type=JWK]  [--create] [--password-file=<file>]

step ca provisioner add <name> --type=OIDC --ca-config=<file>
[--client-id=<id>] [--client-secret=<secret>]
[--configuration-endpoint=<url>] [--domain=<domain>]
[--admin=<email>]...

step ca provisioner add <name> --type=x5c --x5c-root=<file>
[--ca-config=<file>]...

step ca provisioner add <name> --type=k8sSA
[--pem-keys=<file>] [--ca-config=<file>]...

step ca provisioner add <name> --type=[AWS|Azure|GCP]
[--ca-config=<file>] [--aws-account=<id>]
[--gcp-service-account=<name>] [--gcp-project=<name>]
[--azure-tenant=<id>] [--azure-resource-group=<name>]
[--instance-age=<duration>] [--iid-roots=<file>]
[--disable-custom-sans] [--disable-trust-on-first-use]

step ca provisioner add <name> --type=ACME --ca-config=<file>
```

## Description

**step ca provisioner add** adds one or more provisioners
to the configuration and writes the new configuration back to the CA config.

To pick up the new configuration you must SIGHUP (kill -1 `pid`) or restart the
step-ca process.

## Positional arguments

`name`
The name of the provisioners, if a list of JWK files are passed, this name
will be linked to all the keys.

`jwk-path`
List of private (or public) keys in JWK or PEM format.

## Options


**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$(step path)/config/ca.json

**--type**=`type`
The `type` of provisioner to create.

`type` is a case-insensitive string and must be one of:

- **JWK**: Uses an JWK key pair to sign provisioning tokens. (default)

- **OIDC**: Uses an OpenID Connect provider to sign provisioning tokens.

- **AWS**: Uses Amazon AWS instance identity documents.

- **GCP**: Use Google instance identity tokens.

- **Azure**: Uses Microsoft Azure identity tokens.

- **ACME**: Uses the ACME protocol to create certificates.

- **X5C**: Uses an X509 Certificate / private key pair to sign provisioning tokens.

- **K8sSA**: Uses Kubernetes Service Account tokens.

- **SSHPOP**: Uses an SSH Certificate / private key pair to sign provisioning tokens.

**--password-file**=`file`
The path to the `file` containing the password to encrypt or decrypt the private key.

**--create**
Create a new ECDSA key pair using curve P-256 and populate a new JWK
provisioner with it.

**--ssh**
Enable SSH on the new provisioners.

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

**--domain**=`domain`
The `domain` used to validate the email claim in an OpenID Connect provisioner.
Use the '--domain' flag multiple times to configure multiple domains.

**--aws-account**=`id`
The AWS account `id` used to validate the identity documents.
Use the flag multiple times to configure multiple accounts.

**--azure-tenant**=`id`
The Microsoft Azure tenant `id` used to validate the identity tokens.

**--azure-resource-group**=`name`
The Microsoft Azure resource group `name` used to validate the identity tokens.
Use the flag multipl etimes to configure multiple resource groups

**--gcp-service-account**=`email`
The Google service account `email` or `id` used to validate the identity tokens.
Use the flag multiple times to configure multiple service accounts.

**--gcp-project**=`id`
The Google project `id` used to validate the identity tokens.
Use the flag multipl etimes to configure multiple projects

**--instance-age**=`duration`
The maximum `duration` to grant a certificate in AWS and GCP provisioners.
A `duration` is sequence of decimal numbers, each with optional fraction and a
unit suffix, such as "300ms", "-1.5h" or "2h45m". Valid time units are "ns",
"us" (or "µs"), "ms", "s", "m", "h".

**--iid-roots**=`file`
The `file` containing the certificates used to validate the
instance identity documents in AWS.

**--disable-custom-sans**
On cloud provisioners, if enabled only the internal DNS and IP will be added as a SAN.
By default it will accept any SAN in the CSR.

**--disable-trust-on-first-use**, **--disable-tofu**
On cloud provisioners, if enabled multiple sign request for this provisioner
with the same instance will be accepted. By default only the first request
will be accepted.

**--x5c-root**=`file`
Root certificate (chain) `file` used to validate the signature on X5C
provisioning tokens.

**--pem-keys**=`file`
Public key `file` for validating signatures on K8s Service Account Tokens.
PEM formatted bundle (can have multiple PEM blocks in the same file) of public
keys and x509 Certificates.

## Examples

Add a single JWK provisioner:
```shell
$ step ca provisioner add max@smallstep.com ./max-laptop.jwk --ca-config ca.json
```

Add a single JWK provisioner using an auto-generated asymmetric key pair:
```shell
$ step ca provisioner add max@smallstep.com --ca-config ca.json \
--create
```

Add a single JWK provisioner with ssh enabled:
```shell
$ step ca provisioner add max@smallstep.com --ca-config ca.json --ssh --create
```

Add a list of provisioners for a single name:
```shell
$ step ca provisioner add max@smallstep.com ./max-laptop.jwk ./max-phone.pem ./max-work.pem \
--ca-config ca.json
```

Add a single OIDC provisioner:
```shell
$ step ca provisioner add Google --type oidc --ca-config ca.json \
  --client-id 1087160488420-8qt7bavg3qesdhs6it824mhnfgcfe8il.apps.googleusercontent.com \
  --configuration-endpoint https://accounts.google.com/.well-known/openid-configuration
```

Add an OIDC provisioner with two administrators:
```shell
$ step ca provisioner add Google --type oidc --ca-config ca.json \
  --client-id 1087160488420-8qt7bavg3qesdhs6it824mhnfgcfe8il.apps.googleusercontent.com \
  --client-secret udTrOT3gzrO7W9fDPgZQLfYJ \
  --configuration-endpoint https://accounts.google.com/.well-known/openid-configuration \
  --admin mariano@smallstep.com --admin max@smallstep.com \
  --domain smallstep.com
```

Add an AWS provisioner on one account with a one hour of instance age:
```shell
$ step ca provisioner add Amazon --type AWS --ca-config ca.json \
  --aws-account 123456789 --instance-age 1h
```

Add an GCP provisioner with two service accounts and two project ids:
```shell
$ step ca provisioner add Google --type GCP --ca-config ca.json \
  --gcp-service-account 1234567890-compute@developer.gserviceaccount.com \
  --gcp-service-account 9876543210-compute@developer.gserviceaccount.com \
  --gcp-project identity --gcp-project accounting
```

Add an Azure provisioner with two service groups:
```shell
$ step ca provisioner add Azure --type Azure --ca-config ca.json \
  --azure-tenant bc9043e2-b645-4c1c-a87a-78f8644bfe57 \
  --azure-resource-group identity --azure-resource-group accounting
```

Add an GCP provisioner that will only accept the SANs provided in the identity token:
```shell
$ step ca provisioner add Google --type GCP --ca-config ca.json \
  --disable-custom-sans --gcp-project internal
```

Add an AWS provisioner that will only accept the SANs provided in the identity
document and will allow multiple certificates from the same instance:
```shell
$ step ca provisioner add Amazon --type AWS --ca-config ca.json \
  --aws-account 123456789 --disable-custom-sans --disable-trust-on-first-use
```

Add an AWS provisioner that will use a custom certificate to validate the instance
identity documents:
```shell
$ step ca provisioner add Amazon --type AWS --ca-config ca.json \
  --aws-account 123456789 --iid-roots $(step path)/certs/aws.crt
```

Add an ACME provisioner.
```shell
$ step ca provisioner add acme-smallstep --type ACME
```

Add an X5C provisioner.
```shell
$ step ca provisioner add x5c-smallstep --type X5C --x5c-root x5cRoot.crt
```

Add a K8s Service Account provisioner.
```shell
$ step ca provisioner add my-kube-provisioner --type K8sSA --pem-keys keys.pub
```

Add an SSH-POP provisioner.
```shell
$ step ca provisioner add sshpop-smallstep --type SSHPOP
```

