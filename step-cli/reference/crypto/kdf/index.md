---
layout: auto-doc
category: reference
title: step crypto kdf
menu:
  docs:
    parent: step crypto
    children:
      - hash
      - compare
---

## Name
**step crypto kdf** -- key derivation functions for password hashing and verification

## Usage

```raw
step crypto kdf <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step crypto kdf** command group creates and verifies passwords using key
derivation functions.

## Examples

Derive a password using **scrypt**:
```shell
$ step crypto kdf hash
Enter password to hash: 
$scrypt$ln=15,r=8,p=1$3TCG+xs8HWSIHonnqTp6Xg$UI8CYfz6koUaRMjDWEFgujIxM63fYnAcc0HhpUryFn8

$ step crypto kdf hash --insecure password
$scrypt$ln=15,r=8,p=1$U8Fl1sO6LWkFeXs5GQS0vA$Rj8nPeaBFQUzbU21N+hhm3I/s1WTxao7Dje4G6ZvO9Q
```

Derive a password using **bcrypt**:
```shell
$ step crypto kdf hash --alg bcrypt
Enter password to hash: 
$2a$10$EgTYeokp/EhvlMpaDYX56O67M/Ve4JyTl9DHwailYYFOBT3COSTuy

$ step crypto kdf hash --alg bcrypt --insecure password
$2a$10$kgYs5dEKs2C6Y5PXnU7eTuPzHMeSoCnkvtTL7ghsPDdSSmw5ec/sS
```

Derive a password using **argon2i**:
```shell
$ step crypto kdf hash --alg argon2i
Enter password to hash: 
$argon2i$v=19$m=32768,t=3,p=4$H0IxAhFFO7fOu5K2RYTxxA$ULEz/79vh3BtCcm7W/zRfJSpiEGULirrZ+PnHfspWKA
```

Derive a password using **argon2id**:
```shell
$ step crypto kdf hash --alg argon2id
Enter password to hash: 
$argon2id$v=19$m=65536,t=1,p=4$HDi5gI15NwJrKveh2AAa9Q$30haKRwwUe5I4WfkPZPGmhJKTRTO+98x+sVnHhOHdK8
```

Validate a hash:
```shell
$ step crypto kdf compare '$scrypt$ln=15,r=8,p=1$3TCG+xs8HWSIHonnqTp6Xg$UI8CYfz6koUaRMjDWEFgujIxM63fYnAcc0HhpUryFn8'
Enter password to compare: 
ok

$ step crypto kdf compare --insecure '$scrypt$ln=15,r=8,p=1$3TCG+xs8HWSIHonnqTp6Xg$UI8CYfz6koUaRMjDWEFgujIxM63fYnAcc0HhpUryFn8' password
ok

$ step crypto kdf compare '$2a$10$EgTYeokp/EhvlMpaDYX56O67M/Ve4JyTl9DHwailYYFOBT3COSTuy'
Enter password to compare: 
ok

$ step crypto kdf compare --insecure '$2a$10$EgTYeokp/EhvlMpaDYX56O67M/Ve4JyTl9DHwailYYFOBT3COSTuy' password
ok

$ step crypto kdf compare '$argon2i$v=19$m=32768,t=3,p=4$H0IxAhFFO7fOu5K2RYTxxA$ULEz/79vh3BtCcm7W/zRfJSpiEGULirrZ+PnHfspWKA'
Enter password to compare: 
ok

$ step crypto kdf compare --insecure '$argon2i$v=19$m=32768,t=3,p=4$H0IxAhFFO7fOu5K2RYTxxA$ULEz/79vh3BtCcm7W/zRfJSpiEGULirrZ+PnHfspWKA' password
ok

$ step crypto kdf compare --insecure '$argon2id$v=19$m=65536,t=1,p=4$HDi5gI15NwJrKveh2AAa9Q$30haKRwwUe5I4WfkPZPGmhJKTRTO+98x+sVnHhOHdK8'
Enter password to compare: 
ok

$ step crypto kdf compare --insecure '$argon2id$v=19$m=65536,t=1,p=4$HDi5gI15NwJrKveh2AAa9Q$30haKRwwUe5I4WfkPZPGmhJKTRTO+98x+sVnHhOHdK8' password
ok
```

## Commands


| Name | Usage |
|---|---|
| **[hash](hash/)** | derive a secret key from a secret value (e.g., a password) |
| **[compare](compare/)** | compare a plaintext value (e.g., a password) and a hash |

