---
layout: auto-doc
category: reference
title: step ca provisioner webhook remove
menu:
  docs:
    parent: step ca provisioner webhook
---

## Name
**step ca provisioner webhook remove** -- remove a webhook from a provisioner

## Usage

```raw
step ca provisioner webhook remove <provisioner_name> <webhook_name>
[--admin-cert=<file>] [--admin-key=<file>] [--admin-subject=<subject>]
[--admin-provisioner=<name>] [--admin-password-file=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>] [--ca-config=<file>]
```

## Description

**step ca provisioner webhook remove** removes a webhook from a provisioner.

## Positional arguments

`provisioner_name`
The name of the provisioner.

`webhook_name`
The name of the webhook.

## Options


**--admin-cert**=`chain`
Admin certificate (`chain`) in PEM format to store in the 'x5c' header of a JWT.

**--admin-key**=`file`
Private key `file`, used to sign a JWT, corresponding to the admin certificate that will
be stored in the 'x5c' header.

**--admin-subject**=`subject`, **--admin-name**=`subject`
The admin `subject` to use for generating admin credentials.

**--admin-provisioner**=`name`, **--admin-issuer**=`name`
The provisioner `name` to use for generating admin credentials.

**--admin-password-file**=`file`, **--password-file**=`file`
The path to the `file` containing the password to decrypt the one-time token
generating key.

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

Remove a webhook:
```shell
step ca provisioner webhook remove my_provisioner my_webhook
```

