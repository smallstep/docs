---
layout: auto-doc
category: reference
title: step ca policy provisioner
menu:
  docs:
    parent: step ca policy
    children:
      - view
      - remove
      - x509
      - ssh
---

## Name
**step ca policy provisioner** -- manage certificate issuance policies for provisioners

## Usage

```raw
step ca policy provisioner <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step ca policy provisioner** command group provides facilities for managing certificate issuance policies for provisioners.

Please note that certificate issuance policies on the provisioner level are currently only supported in Certificate Manager: https://u.step.sm/cm.    



## Commands


| Name | Usage |
|---|---|
| **[view](view/)** | view current certificate issuance policy |
| **[remove](remove/)** | remove certificate issuance policy |
| **[x509](x509/)** | manage X.509 certificate issuance policies |
| **[ssh](ssh/)** | manage SSH certificate issuance policies |

