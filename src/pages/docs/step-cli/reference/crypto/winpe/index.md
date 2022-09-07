---
layout: auto-doc
category: reference
title: step crypto winpe
menu:
  docs:
    parent: step crypto
    children:
      - extract
---

## Name
**step crypto winpe** -- extract certificates and verify Windows Portable Executable files

## Usage

```raw
step crypto winpe <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step crypto winpe** command group provides facilities to extract certificates and
verify Windows Portable Executable files.

## Examples

Extract all certificates and output in JSON format:
```shell
step crypto winpe extract my.exe | step certificate inspect --format json --bundle
```

## Commands


| Name | Usage |
|---|---|
| **[extract](extract/)** | extract certificates from Windows Portable Executable files |

