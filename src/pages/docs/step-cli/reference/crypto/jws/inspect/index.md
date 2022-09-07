---
layout: auto-doc
category: reference
title: step crypto jws inspect
menu:
  docs:
    parent: step crypto jws
---

## Name
**step crypto jws inspect** -- return the decoded JWS without verification

## Usage

```raw
step crypto jws inspect
--insecure [--json]
```

## Description

**step crypto jws inspect** reads a JWS data structure from STDIN, decodes it,
and outputs the payload on STDERR. Since this command does not verify the JWS
you must pass **--insecure** as a misuse prevention mechanism.

For examples, see **step help crypto jws**.

## Options


**--json**
Displays the header, payload and signature as a JSON object. The payload will
be encoded using Base64.

