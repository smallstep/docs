# YubiHSM2 Authorities Quick Start

# Create authentication keys

Generate authentication key for smallstep:

```bash
yubihsm-shell -p password -a put-authentication-key -i 0x0002 \
    --new-password the-new-password \
    --capabilities generate-asymmetric-key,sign-ecdsa \
    --delegated sign-ecdsa,exportable-under-wrap
```

Generate authentication key for admins:

```bash
yubihsm-shell -p password -a put-authentication-key -i 0x0003 \
    --new-password the-new-admin-password \
    --capabilities export-wrapped,import-wrapped,put-wrap-key,get-pseudo-random,delete-asymmetric-key \
    --delegated sign-ecdsa,exportable-under-wrap,export-wrapped,import-wrapped
```

## Create Authorities

Create SSH authority in admin-tools:

```bash
$ create-authority --ssh --kms pkcs11 \
  --name "PKCS#11" \
  --team f9036726-2046-4a80-9a75-95436b4fdc06 \
  --domain ssh.pkcs11.ca.local \
  --root-object-id 8000 \
  --intermediate-object-id 8001 \
  --ssh-host-object-id 8002 \
  --ssh-user-object-id 8003
✔ Authority: 6b2e6997-5b4e-48b2-bc08-da87e7213d79
✔ Domain: ssh.pkcs11.ca.local
✔ Root fingerprint: 743aab8906c4cf1e5cae81d7df2fd8dac56a03e077b08bbb81249d0ea5fa17e4
```

Create the first provisioner in admin-tools:

```bash
$ step crypto jwk create jwk.pub jwk.priv
Please enter the password to encrypt the private JWK:
Your public key has been saved in jwk.pub.
Your private key has been saved in jwk.priv.
$ manage-provisioners --authority 6b2e6997-5b4e-48b2-bc08-da87e7213d79 \
--type JWK --name admin --ssh --public-key jwk.pub --private-key jwk.priv add
Provisioner admin (d7219d83-0974-42ae-825d-26f838d60e92) has been added.
```

Define the authority admin provisioner in admin-tools:

```bash
$ grpcurl --plaintext \
-d '{"type":"SUPER_ADMIN", "authority_id": "6b2e6997-5b4e-48b2-bc08-da87e7213d79", "provisionerId": "d7219d83-0974-42ae-825d-26f838d60e92", "subject": "mariano@smallstep.com"}' \
landlord-grpc:9443 ca.LandlordService/CreateAdministrator
{
  "id": "316fdc3a-4010-4f35-9262-0ab7c6089fc1",
  "authorityId": "6b2e6997-5b4e-48b2-bc08-da87e7213d79",
  "subject": "mariano@smallstep.com",
  "provisionerId": "d7219d83-0974-42ae-825d-26f838d60e92",
  "type": "SUPER_ADMIN"
}
```

## YubiHSM2 Management

List all objects:

```bash
$ yubihsm-shell --authkey 0x0003 -p the-new-admin-password -a list-objects -t any -A any
Using default connector URL: http://127.0.0.1:12345
Session keepalive set up to run every 15 seconds
Created session 1
Found 7 object(s)
id: 0x0001, type: authentication-key, sequence: 0
id: 0x0002, type: authentication-key, sequence: 1
id: 0x0003, type: authentication-key, sequence: 0
id: 0x8000, type: asymmetric-key, sequence: 0
id: 0x8001, type: asymmetric-key, sequence: 0
id: 0x8002, type: asymmetric-key, sequence: 0
id: 0x8003, type: asymmetric-key, sequence: 0
```

Get information on a specific key:

```bash
$ yubihsm-shell --authkey 0x0003 -p the-new-admin-password \
-a get-object-info -i 0x8000 -t asymmetric-key
Using default connector URL: http://127.0.0.1:12345
Session keepalive set up to run every 15 seconds
Created session 0
id: 0x8000, type: asymmetric-key, algorithm: ecp256, label: "root-key", length: 96, domains: 1:2:3:4:5:6:7:8:9:10:11:12:13:14:15:16, sequence: 1, origin: generated, capabilities: exportable-under-wrap:sign-ecdsa
```

Generate a new wrap-key:

```bash
$ yubihsm-shell --authkey 0x0003 -p the-new-admin-password -a get-pseudo-random --count 32
Using default connector URL: http://127.0.0.1:12345
Session keepalive set up to run every 15 seconds
Created session 0
9239b281deea32eb86c2f816304982d3345a9e2d3ddfd777ea3cc1216d4cbb82
```

Add wrapping key to the YubiHSM:

```bash
$ yubihsm-shell --authkey 0x0003 -p the-new-admin-password \
-a put-wrap-key -i 0x0100 -l wrap-key \
--in 9239b281deea32eb86c2f816304982d3345a9e2d3ddfd777ea3cc1216d4cbb82 \
--informat hex \
--capabilities import-wrapped,export-wrapped \
--delegated sign-ecdsa,exportable-under-wrap
Using default connector URL: http://127.0.0.1:12345
Session keepalive set up to run every 15 seconds
Created session 0
Stored Wrap key 0x0100
```

Export asymmetric-key:

```bash
$ yubihsm-shell --authkey 0x0003 -p the-new-admin-password \
-a get-wrapped --wrap-id 0x0100 \
-i 0x8000 -t asymmetric-key
Using default connector URL: http://127.0.0.1:12345
Session keepalive set up to run every 15 seconds
Created session 0
E2TC3OwAAAAAAAAAFE3N/HBpr9v9uYL9UaFIfdAJjbKVovH3wMlelM4+HZYhUFCD4y1zl83gxt70gyfJRBWHTegmUR5/9pV/Y3MMm8UnF/w9h+w8HcdXtV+5upYJKqBHP/bZPbTzo+2DHN/0gD8Ntagdlk3xeBMUIMAc9uISbVBsDFOKVIYBGz0NhiwV3fUW+PLnxsTOG/C1d1I8Ll8SiKLrLe1RNUqLuEcFeedhObcUhfDe+BCqSQ==
```

Delete asymmetric-key (just to demonstrate the import):

```bash
$ yubihsm-shell --authkey 0x0003 -p the-new-admin-password \
-a delete-object -i 0x8000 -t asymmetric-key
Using default connector URL: http://127.0.0.1:12345
Session keepalive set up to run every 15 seconds
Created session 0
```

Import wrapped key;

```bash
$ yubihsm-shell --authkey 0x0003 -p the-new-admin-password \
-a put-wrapped --wrap-id 0x0100 \
--in "E2TC3OwAAAAAAAAAFE3N/HBpr9v9uYL9UaFIfdAJjbKVovH3wMlelM4+HZYhUFCD4y1zl83gxt70gyfJRBWHTegmUR5/9pV/Y3MMm8UnF/w9h+w8HcdXtV+5upYJKqBHP/bZPbTzo+2DHN/0gD8Ntagdlk3xeBMUIMAc9uISbVBsDFOKVIYBGz0NhiwV3fUW+PLnxsTOG/C1d1I8Ll8SiKLrLe1RNUqLuEcFeedhObcUhfDe+BCqSQ==" \
--informat base64
Using default connector URL: http://127.0.0.1:12345
Session keepalive set up to run every 15 seconds
Created session 0
Object imported as 0x8000 of type asymmetric-key
```

Dump all keys:

```bash
$  yubihsm-setup --authkey 0x0003 -p the-new-admin-password dump
Using authentication key 0x0003
Enter the wrapping key ID to use for exporting objects: 0x0100
Found 27 object(s)
Unable to export object authentication-key with ID 0x0001: Wrong permissions for operation. Skipping over ...
Unable to export object authentication-key with ID 0x0002: Wrong permissions for operation. Skipping over ...
Unable to export object authentication-key with ID 0x0003: Wrong permissions for operation. Skipping over ...
Successfully exported object asymmetric-key with ID 0x8000 to ./0x8000-asymmetric-key.yhw
Successfully exported object asymmetric-key with ID 0x8001 to ./0x8001-asymmetric-key.yhw
Successfully exported object asymmetric-key with ID 0x8002 to ./0x8002-asymmetric-key.yhw
Successfully exported object asymmetric-key with ID 0x8003 to ./0x8003-asymmetric-key.yhw
Unable to export object wrap-key with ID 0x0100: Wrong permissions for operation. Skipping over ...
All done
```