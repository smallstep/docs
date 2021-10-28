---
layout: auto-doc
title: step base64
menu:
  docs:
    parent: step
---

## Name
**step base64** -- encodes and decodes using base64 representation

## Usage

```raw
step base64
[-d|--decode] [-r|--raw] [-u|--url]
```

## Description

**step base64** implements base64 encoding as specified by RFC 4648.

## Options


**-d**, **--decode**
decode base64 input

**-r**, **--raw**
use the unpadded base64 encoding

**-u**, **--url**
use the encoding format typically used in URLs and file names

## Examples

Encode to base64 using the standard encoding:
```shell
$ echo -n This is the string to encode | step base64
VGhpcyBpcyB0aGUgc3RyaW5nIHRvIGVuY29kZQ==
$ step base64 This is the string to encode 
VGhpcyBpcyB0aGUgc3RyaW5nIHRvIGVuY29kZQ==
```

Decode a base64 encoded string:
```shell
$ echo VGhpcyBpcyB0aGUgc3RyaW5nIHRvIGVuY29kZQ== | step base64 -d
This is the string to encode
```

Encode to base64 without padding:
```shell
$ echo -n This is the string to encode | step base64 -r
VGhpcyBpcyB0aGUgc3RyaW5nIHRvIGVuY29kZQ
$ step base64 -r This is the string to encode
VGhpcyBpcyB0aGUgc3RyaW5nIHRvIGVuY29kZQ
```

Encode to base64 using the url encoding:
```shell
$ echo 'abc123$%^&*)_+-=~' | step base64 -u
YWJjMTIzJCVeJiooKV8rLT1-Cg==
```

Decode an url encoded base64 string. The encoding type can be enforced
using the '-u' or '-r' flags, but it will be autodetected if they are not
passed:
```shell
$ echo YWJjMTIzJCVeJiooKV8rLT1-Cg== | step base64 -d
abc123$%^&*)_+-=~
$ echo YWJjMTIzJCVeJiooKV8rLT1-Cg== | step base64 -d -u
abc123$%^&*)_+-=~
```

