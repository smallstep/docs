---
layout: auto-doc
title: step
menu:
  docs:
    children:
      - help
      - version
      - base64
      - ca
      - beta
      - certificate
      - context
      - crypto
      - fileserver
      - oauth
      - path
      - ssh
---

## Name
**step** -- plumbing for distributed systems

## Usage

```raw
step <command> [arguments]
```

## Options

**--help**, **-h**
show help

**--config**=`value`
path to the config file to use for CLI flags

**--version**, **-v**
print the version


## Commands


| Name | Usage |
|---|---|
| **[help, h](help/)** | display help for the specified command or command group |
| **[version](version/)** | display the current version of the cli |
| **[base64](base64/)** | encodes and decodes using base64 representation |
| **[ca](ca/)** | initialize and manage a certificate authority |
| **[beta](beta/)** | commands that are being tested; these APIs are likely to change |
| **[certificate](certificate/)** | create, revoke, validate, bundle, and otherwise manage certificates |
| **[context](context/)** | manage certificate authority contexts |
| **[crypto](crypto/)** | useful cryptographic plumbing |
| **[oauth](oauth/)** | authorization and single sign-on using OAuth & OIDC |
| **[path](path/)** | print the configured step path and exit |
| **[ssh](ssh/)** | create and manage ssh certificates |


## Version

Smallstep CLI/0.18.0 (darwin/amd64)

## Copyright

(c) 2018-2020 Smallstep Labs, Inc.

