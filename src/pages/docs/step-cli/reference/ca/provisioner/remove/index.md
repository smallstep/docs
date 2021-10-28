---
layout: auto-doc
title: step ca provisioner remove
menu:
  docs:
    parent: step ca provisioner
---

## Name
**step ca provisioner remove** -- remove one, or more, provisioners from the CA configuration

## Usage

```raw
step ca provisioner remove <name>
[--kid=<kid>] [--config=<file>] [--all]
```

## Description

**step ca provisioner remove** removes one or more provisioners
from the configuration and writes the new configuration back to the CA config.

To pick up the new configuration you must SIGHUP (kill -1 `pid`) or restart the
step-ca process.

## Positional arguments

`name`
The name field of the provisioner(s) to be removed.

## Options


**--ca-config**=`file`
The `file` containing the CA configuration.

**--kid**=`kid`
The `kid` (Key ID) of the JWK provisioner key to be removed.

**--client-id**=`id`
The `id` (Client ID) of the OIDC provisioner to be removed.

**--all**
Remove all provisioners with a given name. Cannot be
used in combination w/ the **--kid** or **--client-id** flag.

**--type**=`type`
The `type` of provisioner to remove. Type is a case-insensitive string
and must be one of:
- **JWK**: Uses an JWK key pair to sign provisioning tokens.

- **OIDC**: Uses an OpenID Connect provider to sign provisioning tokens.

- **AWS**: Uses Amazon AWS instance identity documents.

- **GCP**: Use Google instance identity tokens.

- **Azure**: Uses Microsoft Azure identity tokens.

- **ACME**: Uses ACME protocol.

- **X5C**: Uses an X509 Certificate / private key pair to sign provisioning tokens.

- **K8sSA**: Uses Kubernetes Service Account tokens.

## Examples

Remove all provisioners associated with a given name (max@smallstep.com):
```shell
$ step ca provisioner remove max@smallstep.com --all --ca-config ca.json
```

Remove the provisioner matching a given name and kid:
```shell
$ step ca provisioner remove max@smallstep. --kid 1234 --ca-config ca.json
```

Remove the provisioner matching a given name and a client id:
```shell
$ step ca provisioner remove Google --ca-config ca.json \
  --client-id 1087160488420-8qt7bavg3qesdhs6it824mhnfgcfe8il.apps.googleusercontent.com
```

Remove the cloud identity provisioner given name and a type:
```shell
$ step ca provisioner remove Amazon --ca-config ca.json --type AWS
```

Remove the ACME provisioner by name:
```shell
$ step ca provisioner remove my-acme-provisioner --type acme
```

Remove an X5C provisioner by name:
```shell
$ step ca provisioner remove my-x5c-provisioner --type x5c
```

Remove a K8sSA provisioner by name:
```shell
$ step ca provisioner remove k8sSA-default --type k8sSA
```

