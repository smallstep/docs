---
layout: auto-doc
title: step crypto jwt inspect
menu:
  docs:
    parent: step crypto jwt
---

## Name
**step crypto jwt inspect** -- return the decoded JWT without verification

## Usage

```raw
step crypto jwt inspect
--insecure
```

## Description

**step crypto jwt inspect** reads a JWT data structure from STDIN, decodes it,
and outputs the header and payload on STDERR. Since this command does not
verify the JWT you must pass **--insecure** as a misuse prevention mechanism.

For examples, see **step help crypto jwt**.
