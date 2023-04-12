---
layout: auto-doc
category: reference
title: step crypto kdf compare
menu:
  docs:
    parent: step crypto kdf
---

## Name
**step crypto kdf compare** -- compare a plaintext value (e.g., a password) and a hash

## Usage

```raw
step crypto kdf compare <phc-hash> [<input>]
```

## Description

The 'step crypto kdf compare' command compares a plaintext value (e.g., a
password) with an existing KDF password hash in PHC string format. The PHC
string input indicates which KDF algorithm and parameters to use.

  If the input matches `phc-hash` the command prints a human readable message
indicating success to STDERR and returns 0. If the input does not match an
error will be printed to STDERR and the command will exit with a non-zero
return code.

  If this command is run without the optional `input` argument and STDIN is a
TTY (i.e., you're running the command in an interactive terminal and not
piping input to it) you'll be prompted to enter a value on STDERR. If STDIN is
not a TTY it will be read without prompting.

For examples, see **step help crypto kdf**.

POSITIONAL ARGUMENTS

`phc-hash`
The KDF password hash in PHC string format.

`input`
The plaintext value to compare with `phc-hash`. `input` is optional and its
use is not recommended. If this argument is provided the **--insecure** flag
must also be provided because your (presumably secret) `input` will likely be
logged and appear in places you might not expect. If omitted input is read
from STDIN.
