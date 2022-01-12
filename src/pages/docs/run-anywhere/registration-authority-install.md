# Registration Authority Install

### Dependencies

- Smallstep Platform
- VM(s) for registration authority instance(s) with externally-routable DNS
- ACME client with DNS routed for testing
- [step](https://smallstep.com/docs/step-cli/installation) (on VM)
- [step-ca](https://smallstep.com/docs/step-ca/installation) (on VM)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [KOTS](https://kots.io/kots-cli/getting-started/#how-to-install)

### Smallstep Platform Update

To complete the install, we'll need to be on the latest Beta channel release of the Smallstep Platform.

Visit the KOTS admin. In the *License* tab, click *Sync license* to update with a license extended to your full term.

In the *Version history* tab, check for the latest update and deploy it:

```bash
kubectl config use-context <your-context>
kubectl kots admin-console --namespace smallstep
```

### Certificate Manager CA Provisioner

When operating a registration authority, the RA must be able to request certificates from the managed CA. We'll configure the CA with a JWK provisioner for use by the RA. The RA itself will have its own provisioner(s) for clients it services.

Enter `admin-tools`:

```bash
kubectl config use-context <your-context>
kubectl exec -it -n smallstep deploy/admin-tools -- bash
```

Create a keypair that will be used in the JWK provisioner (escrowed by the CA). Save the provisioner password in a safe place for use by the RA(s).

```bash
step crypto jwk create jwk.pub jwk.priv
```

In `admin-tools`, create a new JWK provisioner:

```bash
manage-provisioners --type JWK --name "ra@hudson-trading.com" \
  --authority "certs.poc.ca.smallstep.hudson-trading.com" \
  --public-key "jwk.pub" --private-key "jwk.priv" \
  --duration "240h" --max-duration "720h" \
  add
```

Now you can safely delete the created keys:

```bash
rm jwk.pub jwk.priv
```

### RA Installation

Install the latest version of step-ca using the appropriate build from:

[https://github.com/smallstep/certificates/releases/tag/v0.15.11](https://github.com/smallstep/certificates/releases/tag/v0.15.11)

On the VM that will host your registration authority, configure a `step-ca` instance in RA mode with an ACME provisioner.

Save the following as `/etc/step-ca/config/ca.json`:

```json
{
	"address": ":443",
	"dnsNames": ["smallstep-ra01.hudson-trading.com"],
	"db": {
		"type": "badger",
		"dataSource": "/etc/step-ca/db"
	},
	"logger": {"format": "json"},
	"authority": {
		"type": "stepcas",
		"certificateAuthority": "https://certs.poc.ca.smallstep.hudson-trading.com",
		"certificateAuthorityFingerprint": "a4dd2d1fb04c1695c46cb7248f27795893330587309049640211a42b37e7819d",
		"certificateIssuer": {
			"type": "jwk", 
			"provisioner": "ra@hudson-trading.com"
		},
		"provisioners": [{
			"type": "ACME",
			"name": "acme",
		  "claims": {
				"defaultTLSCertDuration": "240h",
        "maxTLSCertDuration": "720h"
      }
		}]
	},
	"tls": {
		"cipherSuites": [
			"TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305",
 			"TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256"
		],
		"minVersion": 1.2,
		"maxVersion": 1.3,
		"renegotiation": false
	}
}
```

Use a secrets manager or whatever process best suits your organization to store the provisioner passsword in `/etc/step-ca/password.txt`.

Start `step-ca`:

```bash
step-ca --issuer-password-file /etc/step-ca/password.txt /etc/step-ca/config/ca.json
```

For a longer-term approach to running `step-ca` refer to [systemd daemon instructions](https://smallstep.com/docs/step-ca/certificate-authority-server-production#running-step-ca-as-a-daemon).

### Test

Test certificate issuance with `step`:

```bash
step ca bootstrap --ca-url https://ra01.hudson-trading.com --fingerprint a4dd2d1fb04c1695c46cb7248f27795893330587309049640211a42b37e7819d
step ca certificate localhost local.crt local.key
```

Test certificate issuance from your ACME test client.

# 🕺🤸🏻‍♂️