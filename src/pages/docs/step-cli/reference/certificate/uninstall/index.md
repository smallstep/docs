---
layout: auto-doc
title: step certificate uninstall
menu:
  docs:
    parent: step certificate
---

## Name
**step certificate uninstall** -- uninstall a root certificate from the system truststore

## Usage

```raw
step certificate uninstall <crt-file>
[--prefix=<name>] [--all]
[--java] [--firefox] [--no-system]
```

## Description

**step certificate uninstall** uninstalls a root certificate from the system
truststore.

Java and Firefox truststores are also supported via the respective flags.

## Positional arguments

`crt-file`
Certificate to uninstall from the system truststore

## Options


**--prefix**=`name`
The prefix used to `name` the CA in the truststore. Defaults to the
certificate common name.

**--java**
uninstall from the Java key store

**--firefox**
uninstall from the Firefox NSS security database

**--no-system**
disables the uninstall from the system truststore

**--all**
uninstall from the system, Firefox and Java truststores

## Examples

Uninstall from only the system truststore:
```shell
$ step certificate uninstall root-ca.pem
```

Uninstall a certificate from all the supported truststores:
```shell
$ step certificate uninstall --all root-ca.pem
```

Uninstall a certificate from Firefox and the system trustore:
```shell
$ step certificate uninstall --firefox root--ca.pem
```

Uninstall a certificate infrom Java and the system trustore:
```shell
$ step certificate uninstall --java root-ca.pem
```

Uninstall a certificate from Firefox, Java, but not from the system:
```shell
$ step certificate uninstall --firefox --java --no-system root-ca.pem
```

