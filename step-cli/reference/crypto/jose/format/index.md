---
layout: auto-doc
category: reference
title: step crypto jose format
menu:
  docs:
    parent: step crypto jose
---

## Name
**step crypto jose format** -- swap serialization format

## Usage

```raw
step crypto jose format
```

## Description

**step crypto jose format** reads a JWT, a JWS, or a JWE from STDIN swaps the
serialization of the content, from compact to JSON or from JSON to compact.

## Examples

Transform a JSON encrypted message to the compact serialization format:
```shell
$ echo The message | step crypto jwe encrypt --key p256.enc.pub | step crypto jose format
eyJhbGciOiJFQ0RILUVTIiwiZW5jIjoiQTI1NkdDTSIsImVwayI6eyJrdHkiOiJFQyIsImNydiI6IlAtMjU2IiwieCI6IlNTR1pNdjZyMGlHbmtsMnpKRERXS1JlaDU4R3RwTjVjT2tBZnlaaUI0enMiLCJ5IjoiLUJzQ2w5RjZNd28zRWZoTFJIeVdDbGlxU2d6T2tubzNuWW80azlPSVk0TSJ9LCJraWQiOiJHd0tSTUdXY1pWNFE2dGZZblpjZm90N090N2hjQ0t2cUJPVWljX0JoZ0gwIn0
.
.
iJNn8SrqE8I5Bhog
.
NO9FfC25Ow9ogzq1.6M3Jiy_osGwlioJjXPyl9w
```

Transform a compact token to the JSON serialization format:
```shell
$ step crypto jwt sign --key p256.priv.json --iss "joe" --aud "bob" \
      --sub "hello" --exp $(date -v+1M +"%s") | step crypto jose format
{
  "payload":"eyJhdWQiOiJib2IiLCJleHAiOjE1MzUyNDE4OTYsImlhdCI6MTUzMjU2MzQ5OCwiaXNzIjoiam9lIiwibmJmIjoxNTMyNTYzNDk4LCJzdWIiOiJoZWxsbyJ9",
  "protected":"eyJhbGciOiJFUzI1NiIsImtpZCI6IlpqR1g5N0xtY2ZsUG9sV3Zzb0FXekM1V1BXa05GRkgzUWRLTFVXOTc4aGsiLCJ0eXAiOiJKV1QifQ",
  "signature":"wlRDGrjQItHFu5j2H4A4T6_P5Ek00ugJXQ3iIXibsZjU96_BaqddnAqFWeKpb6xHWGRAHKtlm9bUYBfLQ8Jlsg"
}
```
