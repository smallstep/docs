---
layout: auto-doc
category: reference
title: step ca provisioner webhook add
menu:
  docs:
    parent: step ca provisioner webhook
---

## Name
**step ca provisioner webhook add** -- add a webhook to a provisioner

## Usage

```raw
step ca provisioner webhook add <provisioner_name> <webhook_name>
[--url=<url>] [--kind=<kind>] [--bearer-token-file=<filename>]
[--basic-auth-username=<username>] [--basic-auth-password-file=<filename>]
[--disable-tls-client-auth] [--cert-type=<cert-type>]
[--admin-cert=<file>] [--admin-key=<file>] [--admin-subject=<subject>]
[--admin-provisioner=<name>] [--admin-password-file=<file>]
[--ca-url=<uri>] [--root=<file>] [--context=<name>] [--ca-config=<file>]
```

## Description

**step ca provisioner webhook add** adds a webhook to a provisioner.

The command will print the webhook ID and secret that must be used to verify all requests from step CA.

## Positional arguments

`provisioner_name`
The name of the provisioner.

`webhook_name`
The name of the webhook.

## Options


**--url**=`value`
The url of the webhook server.

**--kind**=`value`
The kind of webhook. Default is ENRICHING.

**--bearer-token-file**=`value`
The token to be set in the Authorization header of the request to the webhook server.

**--basic-auth-username**=`value`
The username portion of the Authorization header of the request to the webhook server when using basic authentication.

**--basic-auth-password-file**=`value`
The password porition of the Authorization header of the request to the webhook server when using basic authentication.

**--disable-tls-client-auth**
The CA will not send a client certificate when requested by the webhook server.

**--cert-type**=`value`
Whether to call this webhook when signing X509 certificates, SSH certificates, or ALL certificates. Default is ALL.

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

Create a webhook without an Authorization header:
```shell
step ca provisioner webhook add my_provisioner my_webhook --url https://example.com
```

Create a webhook with a bearer token:
```shell
step ca provisioner webhook add my_provisioner my_webhook --url https://example.com --bearer-token-file token.txt
```

Create a webhook with basic authentication:
```shell
step ca provisioner webhook add my_provisioner my_webhook --url https://example.com --basic-auth-username user --basic-auth-password-file pass.txt
```

Create a webhook that will never send a client certificate to the webhook server:
```shell
step ca provisioner webhook add my_provisioner my_webhook --url https://example.com --disable-tls-client-auth
```

Create a webhook that will only be called when signing x509 certificates:
```shell
step ca provisioner webhook add my_provisioner my_webhook --url https://example.com --cert-type X509
```

