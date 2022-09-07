---
layout: auto-doc
title: step ca init
menu:
  docs:
    parent: step ca
---

## Name
**step ca init** -- initialize the CA PKI

## Usage

```raw
step ca init
[--root=<file>] [--key=<file>] [--pki] [--ssh]
[--helm] [--deployment-type=<name>] [--name=<name>]
[--dns=<dns>] [--address=<address>] [--provisioner=<name>]
[--provisioner-password-file=<file>] [--password-file=<file>]
[--ra=<type>] [--kms=<type>] [--with-ca-url=<url>] [--no-db]
[--context=<name>] [--profile=<name>] [--authority=<name>]
```

## Description

**step ca init** command initializes a public key infrastructure (PKI) to be
 used by the Certificate Authority.

## Options


**--root**=`file`
The path of an existing PEM `file` to be used as the root certificate authority.

**--key**=`file`
The path of an existing key `file` of the root certificate authority.

**--pki**
Generate only the PKI without the CA configuration.

**--ssh**
Create keys to sign SSH certificates.

**--helm**
Generates a Helm values YAML to be used with step-certificates chart.

**--deployment-type**=`name`
The `name` of the deployment type to use. Options are:
- **standalone**: An instance of step-ca that does not connect to any cloud services. You
    manage authority keys and configuration yourself.
    Choose standalone if you'd like to run step-ca yourself and do not want
    cloud services or commercial support.

- **linked**: An instance of step-ca with locally managed keys that connects to your
    Certificate Manager account for provisioner management, alerting,
    reporting, revocation, and other managed services.
    Choose linked if you'd like cloud services and support, but need to
    control your authority's signing keys.

- **hosted**: A highly available, fully-managed instance of step-ca run by smallstep
    just for you.
    Choose hosted if you'd like cloud services and support.

More information and pricing at: https://u.step.sm/cm

**--name**=`name`
The `name` of the new PKI.

**--dns**=`name`
The DNS `name` or IP address of the new CA.
Use the '--dns' flag multiple times to configure multiple DNS names.

**--address**=`address`
The `address` that the new CA will listen at.

**--provisioner**=`name`
The `name` of the first provisioner.

**--password-file**=`file`
The path to the `file` containing the password to encrypt the keys.

**--provisioner-password-file**=`file`
The path to the `file` containing the password to encrypt the provisioner key.

**--with-ca-url**=`URI`
`URI` of the Step Certificate Authority to write in defaults.json

**--ra**=`type`
The registration authority `type` to use. Currently "StepCAS" and "CloudCAS" are supported.

**--kms**=`type`
The key manager service `type` to use to manage keys. Options are:
- **azurekms**: Use Azure Key Vault to manage X.509 and SSH keys. The key URIs have
  the following format `azurekms:name=key-name;vault=vault-name`.

**--issuer**=`url`
The registration authority issuer `url` to use.

If StepCAS is used, this flag should be the URL of the CA to connect
to, e.g https://ca.smallstep.com:9000

If CloudCAS is used, this flag should be the resource name of the
intermediate certificate to use. This has the format
'projects/\*/locations/\*/caPools/\*/certificateAuthorities/\*'.

**--issuer-fingerprint**=`fingerprint`
The root certificate `fingerprint` of the issuer CA.
This flag is supported in "StepCAS", and it should be the result of running:
```shell
$ step certificate fingerprint root_ca.crt
4fe5f5ef09e95c803fdcb80b8cf511e2a885eb86f3ce74e3e90e62fa3faf1531
```

**--issuer-provisioner**=`name`
The `name` of an existing provisioner in the issuer CA.
This flag is supported in "StepCAS".

**--credentials-file**=`file`
The registration authority credentials `file` to use.

If CloudCAS is used, this flag should be the path to a service account key.
It can also be set using the 'GOOGLE_APPLICATION_CREDENTIALS=path'
environment variable or the default service account in an instance in Google
Cloud.

**--no-db**
Generate a CA configuration without the DB stanza. No persistence layer.

**--context**=`name`
The `name` of the context for the new authority.

**--profile**=`name`
The `name` that will serve as the profile name for the context.

**--authority**=`name`
The `name` that will serve as the authority name for the context.

