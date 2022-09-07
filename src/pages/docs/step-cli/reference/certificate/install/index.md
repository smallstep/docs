---
layout: auto-doc
category: reference
title: step certificate install
menu:
  docs:
    parent: step certificate
---

## Name
**step certificate install** -- install a root certificate in the system truststore

## Usage

```raw
step certificate install <crt-file>
[--prefix=<name>] [--all]
[--java] [--firefox] [--no-system]
```

## Description

**step certificate install** installs a root certificate in the system
truststore.

Java and Firefox truststores are also supported via the respective flags.

## Positional arguments

`crt-file`
Certificate to install in the system truststore

## Options


**--prefix**=`name`
The prefix used to `name` the CA in the truststore. Defaults to the
certificate common name.

**--java**
install on the Java key store

**--firefox**
install on the Firefox NSS security database

**--no-system**
disables the install on the system truststore

**--all**
install on the system, Firefox and Java truststores

## Examples

Install a certificate in the system truststore:
```shell
$ step certificate install root-ca.pem
```

Install a certificate in all the supported truststores:
```shell
$ step certificate install --all root-ca.pem
```

Install a certificate in Firefox and the system trustore:
```shell
$ step certificate install --firefox root--ca.pem
```

Install a certificate in Java and the system trustore:
```shell
$ step certificate install --java root-ca.pem
```

Install a certificate in Firefox, Java, but not in the system trustore:
```shell
$ step certificate install --firefox --java --no-system root-ca.pem
```

