---
layout: auto-doc
category: reference
title: step path
menu:
  docs:
    parent: step
---

## Name
**step path** -- print the configured step path and exit

## Usage

```raw
step path [--base] [--profile]
```

## Description

**step path** command prints the configured step path and exits.

When using contexts to manage 'step-ca' environments, this command will return
the current authority path. If no current context is configured this command the
default step path of $HOME/.step, which can be overridden with the **STEPPATH**
environment variable.

## Options


**--base**
Return the base of the step path

**--profile**
Return the base path of the currently configured default profile

## Examples

Get the path with no current context configured:
```shell
$ step path
/Users/max/.step
```

Get the path with no current context and environment variable STEPPATH overriding the default:
```shell
$ export STEPPATH=/tmp/step
$ step path
/tmp/step
```

Get the path with a current context (configured at $STEPPATH/current-context.json):
```shell
$ cat $(step path --base)/current-context.json
{"context": "machine.step-internal.net"}

$ step path
/Users/max/.step/authorities/machine.step-internal.net
```

Get the base path:
```shell
$ step path --base
/Users/max/.step
```

Get the base path with environment variable STEPPATH overriding the default:
```shell
$ export STEPPATH=/tmp/step
$ step path --base
/tmp/step
```

Get the path of the current profile:
```shell
$ cat $(step path --base)/current-context.json
{"context": "ca.acme.net"}

$ cat $(step path --base)/contexts.json
{
  "ca.beta.net": {
        "profile": "beta-corp",
        "authority": "machine.beta.net"
    },
  "ca.acme.net": {
        "profile": "example-corp",
        "authority": "machine.acme.net"
    }

}
$ step path --profile
/Users/max/.step/profiles/beta-corp
```


