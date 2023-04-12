---
layout: auto-doc
category: reference
title: step ca provisioner webhook
menu:
  docs:
    parent: step ca provisioner
    children:
      - add
      - update
      - remove
---

## Name
**step ca provisioner webhook** -- create and manage webhooks for a provisioner

## Usage

```raw
step ca provisioner webhook <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step ca provisioner webhook** command group provides facilities for managing the webhooks attached to a provisioner

Administrators can attach webhooks to provisioners to retrieve additional data that will be available when rendering certificate templates.
Webhooks can also be used to disallow signing certificates for unknown entities.

Any data returned from the webhook server will be added to the template context under the path "Webhooks.`name`".
Implementations of webhook servers must conform to the step-ca documentation at https://smallstep.com/docs/step-ca/templates for parsing and verifying request bodies and forming valid response bodies.

## Examples

Add a new webhook to a provisioner:
```shell
step ca provisioner webhook add my_provisioner my_webhook --url https://example.com
```

Change a webhook's url:
```shell
step ca provisioner webhook update my_provisioner my_webhook --url https://example.com
```

Remove a webhook:
```shell
step ca provisioner webhook remove my_provisioner my_webhook
```
    

## Commands


| Name | Usage |
|---|---|
| **[add](add/)** | add a webhook to a provisioner |
| **[update](update/)** | update a webhook attached to a provisioner |
| **[remove](remove/)** | remove a webhook from a provisioner |

