---
layout: auto-doc
title: step crypto kdf hash
menu:
  docs:
    parent: step crypto kdf
---

## Name
**step crypto kdf hash** -- derive a secret key from a secret value (e.g., a password)

## Usage

```raw
step crypto kdf hash [<input>]
[--alg ALGORITHM]
```

## Description

**step crypto kdf hash** uses a key derivation function (KDF) to produce a
pseudorandom secret key based on some (presumably secret) input value. This is
useful for password verification approaches based on password hashing. Key
derivation functions are designed to be computationally intensive, making it
more difficult for attackers to perform brute-force attacks on password
databases.

If this command is run without the optional `input` argument and STDIN is a TTY
(i.e., you're running the command in an interactive terminal and not piping
input to it) you'll be prompted to enter a value on STDERR. If STDIN is not a
TTY it will be read without prompting.

This command will produce a string encoding of the KDF output along with the
algorithm used, salt, and any parameters required for validation in PHC string
format.

The KDFs are run with parameters that are considered safe. The 'scrypt'
parameters are currently fixed at N=32768, r=8 and p=1. The 'bcrypt' work
factor is currently fixed at 10.

For examples, see **step help crypto kdf**.

## Positional arguments

`input`
The input to the key derivation function. `input` is optional and its use is
not recommended. If this argument is provided the **--insecure** flag must also
be provided because your (presumably secret) `input` will likely be logged and
appear in places you might not expect. If omitted input is read from STDIN.

## Options


**--alg**=`algorithm`
The KDF algorithm to use.

`algorithm` must be one of:

- **scrypt**: A password-based KDF designed to use exponential time and memory.

- **bcrypt**: A password-based KDF designed to use exponential time.

- **argon2i**: A password-based KDF optimized to resist side-channel attacks.

- **argon2id**: A password-based KDF optimized to resist GPU and side-channel attacks.


