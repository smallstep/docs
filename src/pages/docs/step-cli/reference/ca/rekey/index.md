---
layout: auto-doc
category: reference
title: step ca rekey
menu:
  docs:
    parent: step ca
---

## Name
**step ca rekey** -- rekey a certificate

## Usage

```raw
step ca rekey <crt-file> <key-file>
[--out-cert=<file>] [--out-key=<file>] [--private-key=<file>]
[--ca-url=<uri>] [--root=<file>] [--password-file=<file>]
[--expires-in=<duration>] [--force] [--exec=<string>] [--daemon]
[--kty=<type>] [--curve=<curve>] [--size=<size>]
[--expires-in=<duration>] [--pid=<int>] [--pid-file=<file>]
[--signal=<int>] [--exec=<string>] [--rekey-period=<duration>]
```

## Description


**step ca rekey** command rekeys the given certificate (with a request to the
certificate authority) and writes the new certificate and private key
to disk - either overwriting `crt-file` and `key-file` positional arguments
or using new files when the **--out-cert**=`file` and **--out-key**=`file`
flags are used.

With the **--daemon** flag the command will periodically update the given
certificate. By default, it will rekey the certificate before 2/3 of the validity
period of the certificate has elapsed. A random jitter is used to avoid multiple
instances running at the same time. The amount of time between rekey and
certificate expiration can be configured using the **--expires-in** flag, or a
fixed period can be set with the **--rekey-period** flag.

The **--daemon** flag can be combined with **--pid**, **--signal**, or **--exec**
to provide certificate reloads on your services.

## Positional arguments

`crt-file`
The certificate in PEM format that we want to rekey.

`key-file`
They key file of the certificate.

## Options


**--out-cert**=`file`
The `file` where the new certificate will be saved to.
Defaults to overwriting the `crt-file` positional argument.

**--out-key**=`file`
The `file` to store the new private key.
Defaults to overwriting the `key-file` positional argument.

**--private-key**=`file`
The `file` containing the private key for rekey-ing the certificate.
By default, a new random key pair will be generated.

**--expires-in**=`duration`
The amount of time remaining before certificate expiration,
at which point a rekey should be attempted. The certificate rekey will not
be performed if the time to expiration is greater than the **--expires-in** value.
A random jitter (duration/20) will be added to avoid multiple services hitting the
rekey endpoint at the same time. The `duration` is a sequence of decimal numbers,
each with optional fraction and a unit suffix, such as "300ms", "-1.5h" or "2h45m".
Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h".

**--pid**=`value`
The process id to signal after the certificate has been rekeyed. By default the
the SIGHUP (1) signal will be used, but this can be configured with the **--signal**
flag.

**--pid-file**=`file`
The `file` from which to read the process id that will be signaled after the certificate
has been rekeyed. By default the the SIGHUP (1) signal will be used, but this can be configured with the **--signal**
flag.

**--signal**=`number`
The signal `number` to send to the selected PID, so it can reload the
configuration and load the new certificate. Default value is SIGHUP (1)

**--exec**=`command`
The `command` to run after the certificate has been rekeyed.

**--daemon**
Run the rekey command as a daemon, rekeying and overwriting the certificate
periodically. By default the daemon will rekey a certificate before 2/3 of the
time to expiration has elapsed. The period can be configured using the
**--rekey-period** or **--expires-in** flags.

**--rekey-period**=`duration`
The period with which to schedule rekeying of the certificate in daemon mode.
Requires the **--daemon** flag. The `duration` is a sequence of decimal numbers,
each with optional fraction and a unit suffix, such as "300ms", "1.5h", or "2h45m".
Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h".

**--kty**=`kty`
The `kty` to build the certificate upon.
If unset, default is EC.

`kty` is a case-sensitive string and must be one of:

- **EC**: Create an **elliptic curve** keypair

- **OKP**: Create an octet key pair (for **"Ed25519"** curve)

- **RSA**: Create an **RSA** keypair

**--crv**=`curve`, **--curve**=`curve`
The elliptic `curve` to use for EC and OKP key types. Corresponds
to the **"crv"** JWK parameter. Valid curves are defined in JWA [RFC7518]. If
unset, default is P-256 for EC keys and Ed25519 for OKP keys.

`curve` is a case-sensitive string and must be one of:

- **P-256**: NIST P-256 Curve

- **P-384**: NIST P-384 Curve

- **P-521**: NIST P-521 Curve

- **Ed25519**: Ed25519 Curve

**--size**=`size`
The `size` (in bits) of the key for RSA and oct key types. RSA keys require a
minimum key size of 2048 bits. If unset, default is 2048 bits for RSA keys and 128 bits for oct keys.

**-f**, **--force**
Force the overwrite of files without asking.

**--offline**
Creates a certificate without contacting the certificate authority. Offline mode
uses the configuration, certificates, and keys created with **step ca init**,
but can accept a different configuration file using **--ca-config** flag.

**--password-file**=`file`
The path to the `file` containing the password to encrypt or decrypt the private key.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--ca-config**=`file`
The certificate authority configuration `file`. Defaults to
$(step path)/config/ca.json

## Examples

Rekey a certificate:
```shell
$ step ca rekey internal.crt internal.key
```

Rekey a certificate without overwriting the existing certificate and key:
```shell
$ step ca rekey --out-cert out.crt --out-key out.key internal.crt internal.key
```

Rekey a certificate forcing the overwrite of the previous certificate and key
(overwrites the existing files without prompting):
```shell
$ step ca rekey --force internal.crt internal.key
```

Rekey a certificate providing the `--ca-url` and `--root` flags:
```shell
$ step ca rekey --ca-url https://ca.smallstep.com:9000 \
  --root /path/to/root_ca.crt internal.crt internal.key
Would you like to overwrite internal.crt [Y/n]: y
```

Rekey a certificate only if it expires within the given time frame:
```shell
$ step ca rekey --expires-in 8h internal.crt internal.key
```

Rekey the certificate before 2/3 of the validity has passed:
```shell
$ step ca rekey --daemon internal.crt internal.key
```

Rekey the certificate before 8 hours and 30m of the expiration time:
```shell
$ step ca rekey --daemon --expires-in 8h30m internal.crt internal.key
```

Rekey the certificate every 16h:
```shell
$ step ca rekey --daemon --rekey-period 16h internal.crt internal.key
```

Rekey the certificate and reload nginx:
```shell
$ step ca rekey --daemon --exec "nginx -s reload" internal.crt internal.key
```

Rekey the certificate and convert it to DER:
```shell
$ step ca rekey --daemon --rekey-period 16h \
  --exec "step certificate format --force --out internal.der internal.crt" \
  internal.crt internal.key
```

Rekey a certificate using the offline mode, requires the configuration
files, certificates, and keys created with **step ca init**:
```shell
$ step ca rekey --offline internal.crt internal.key
```

Rekey the certificate and write it to specified files:
```shell
$ step ca rekey internal.crt internal.key --out-crt foo.crt --out-key foo.key
```

Rekey the certificate using a given private key:
```shell
$ step ca rekey internal.crt internal.key --private-key foo.key
```

