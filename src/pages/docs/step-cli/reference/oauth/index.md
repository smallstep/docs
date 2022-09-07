---
layout: auto-doc
category: reference
title: step oauth
menu:
  docs:
    parent: step
---

## Name
**step oauth** -- authorization and single sign-on using OAuth & OIDC

## Usage

```raw
step oauth
[--provider=<provider>] [--client-id=<client-id> --client-secret=<client-secret>]
[--scope=<scope> ...] [--bare [--oidc]] [--header [--oidc]]
[--prompt=<prompt>] [--auth-param=<key=value>]

step oauth
--authorization-endpoint=<authorization-endpoint>
--token-endpoint=<token-endpoint>
--client-id=<client-id> --client-secret=<client-secret>
[--scope=<scope> ...] [--bare [--oidc]] [--header [--oidc]]
[--prompt=<prompt>] [--auth-param=<key=value>]

step oauth [--account=<account>]
[--authorization-endpoint=<authorization-endpoint>]
[--token-endpoint=<token-endpoint>]
[--scope=<scope> ...] [--bare [--oidc]] [--header [--oidc]]
[--prompt=<prompt>] [--auth-param=<key=value>]

step oauth --account=<account> --jwt
[--scope=<scope> ...] [--header] [-bare] [--prompt=<prompt>]
[--auth-param=<key=value>]
```

## Description

**step oauth** command implements the OAuth 2.0 authorization flow.

OAuth is an open standard for access delegation, commonly used as a way for
Internet users to grant websites or applications access to their information on
other websites but without giving them the passwords. This mechanism is used by
companies such as Amazon, Google, Facebook, Microsoft and Twitter to permit the
users to share information about their accounts with third party applications or
websites. Learn more at https://en.wikipedia.org/wiki/OAuth.

This command by default performs the authorization flow with a preconfigured
Google application, but a custom one can be set combining the flags
**--client-id**, **--client-secret**, and **--provider**. The provider value
must be set to the OIDC discovery document (.well-known/openid-configuration)
endpoint. If Google is used this flag is not necessary, but the appropriate
value would be be https://accounts.google.com or
https://accounts.google.com/.well-known/openid-configuration

## Options


**--provider**=`value`, **--idp**=`value`
OAuth provider for authentication

**--email**=`value`, **-e**=`value`
Email to authenticate

**--console**, **-c**
Complete the flow while remaining only inside the terminal.

NOTE: This flag will continue to use the Out of Band (OOB) flow for Google OAuth clients
until Oct 3, 2022 when the OOB flow will be shut off. All other OAuth clients
will default to using the Device Authorization Grant flow
(https://datatracker.ietf.org/doc/html/rfc8628#section-3.2).

**--console-flow**=`flow`
The alternative OAuth `flow` to use for input constrained devices.

`console-flow` is a case-insensitive string and must be one of:

- **device**: Use the Device Authorization Grant (https://datatracker.ietf.org/doc/html/rfc8628#section-3.2) flow

- **oob**: Use the Out of Band (OOB) flow

**--client-id**=`value`
OAuth Client ID

**--client-secret**=`value`
OAuth Client Secret

**--account**=`value`
JSON file containing account details

**--authorization-endpoint**=`value`
OAuth Authorization Endpoint

**--device-authorization-endpoint**=`value`
OAuth Device Authorization Endpoint

**--token-endpoint**=`value`
OAuth Token Endpoint

**--header**
Output HTTP Authorization Header (suitable for use with curl)

**--oidc**
Output OIDC Token instead of OAuth Access Token

**--bare**
Only output the token

**--scope**=`value`
OAuth scopes

**--auth-param**=`value`
OAuth additional authentication parameters to include as part of the URL query.
Use this flag multiple times to add multiple parameters. This flag expects a
'key' and 'value' in the format '--auth-param "key=value"'.

**--prompt**=`value`
Whether the Authorization Server prompts the End-User for reauthentication and consent.
OpenID standard defines the following values, but your provider may support some or none of them:

- **none**: The Authorization Server MUST NOT display any authentication or consent user interface pages.
        An error is returned if an End-User is not already authenticated or the Client does not have
        pre-configured consent for the requested Claims or does not fulfill other conditions for
        processing the request.

- **login**: The Authorization Server SHOULD prompt the End-User for reauthentication. If it cannot
        reauthenticate the End-User, it MUST return an error, typically login_required.

- **consent**: The Authorization Server SHOULD prompt the End-User for consent before returning information
        to the Client. If it cannot obtain consent, it MUST return an error, typically consent_required.

- **select_account**: The Authorization Server SHOULD prompt the End-User to select a user account. This enables an
        End-User who has multiple accounts at the Authorization Server to select amongst the multiple
        accounts that they might have current sessions for. If it cannot obtain an account selection
        choice made by the End-User, it MUST return an error, typically account_selection_required.


**--jwt**
Generate a JWT Auth token instead of an OAuth Token (only works with service accounts)

**--listen**=`address`
Callback listener `address` (e.g. ":10000")

**--listen-url**=`url`
The redirect_uri `url` in the authorize request (e.g. "http://127.0.0.1:10000")

**--redirect-url**=`url`
The `url` to open in the system browser when the OAuth flow is successful.

## Examples

Do the OAuth 2.0 flow using the default client:
```shell
$ step oauth
```

Redirect to localhost instead of 127.0.0.1:
```shell
$ step oauth --listen localhost:0
```

Redirect to a fixed port instead of random one:
```shell
$ step oauth --listen :10000
```

Redirect to a fixed url but listen on all the interfaces:
```shell
$ step oauth --listen 0.0.0.0:10000 --listen-url http://127.0.0.1:10000
```

Get just the access token:
```shell
$ step oauth --bare
```

Get just the OIDC token:
```shell
$ step oauth --oidc --bare
```

Use a custom OAuth2.0 server:
```shell
$ step oauth --client-id my-client-id --client-secret my-client-secret \
  --provider https://example.org
```

Use the Device Authorization Grant flow for input constrained clients:
```shell
$ step oauth --client-id my-client-id --client-secret my-client-secret --console-flow device
```

Use the Out Of Band flow for input constrained clients:
```shell
$ step oauth --client-id my-client-id --client-secret my-client-secret --console-flow oob
```

Use the default OAuth flow for input constrained clients:
```shell
$ step oauth --client-id my-client-id --client-secret my-client-secret --console
```

Use additional authentication parameters:
```shell
$ step oauth --client-id my-client-id --client-secret my-client-secret \
  --provider https://example.org --auth-param "access_type=offline"
```

