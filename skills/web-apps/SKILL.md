---
name: web-apps
description: Protect a web app with browser certificates (mutual TLS) using Smallstep. Creates the credential and the web app resource through the Smallstep API, and hands the app configuration and the browser policy to a person with the exact values they need.
---

# Web apps with browser certificates

This skill walks the nine steps of the [web apps guide](https://smallstep.com/docs/use-cases/web-apps).
Steps 3, 6, 7, and 9 can be done through the Smallstep API.
Step 4 (the app or proxy) and the browser policy in step 5 must be handed to a person.
Show every API request to the person before sending it.

Requirements: an API token in `SMALLSTEP_API_TOKEN`, `curl`, and `jq`.
Every request carries `Authorization: Bearer $SMALLSTEP_API_TOKEN` and `x-smallstep-api-version: 2025-01-01`, against `https://gateway.smallstep.com/api`.

## 1. What you get

Tell the person: the browser on an enrolled device presents a device certificate to the app during the TLS handshake; the app verifies it against the team's authority.
Two objects: a credential and a web app resource.
The verifier is the person's own app or proxy.
About 15 minutes plus the app change and a browser policy.
If the app sits behind single sign-on instead, use the `sso-device-factor` skill.

## 2. Before you start

- An approved device with a bound user and the agent (`GET /devices`).
- The authority (`GET /authorities`); the person downloads its root and intermediate from the Console for step 4.
- From the person: the URLs that will require a certificate.

## 3. Create it in Smallstep (agent can do this)

1. `POST /credentials`: `slug` `browser`, `certificate.type` `X509`, `authorityID`, `duration` `168h0m0s`, common name from `smallstep:identity`, SANs `["smallstep:identity", "Device.Serial"]` (email first if the app maps users; serial first if it maps devices), `extendedKeyUsage` `["clientAuth"]`, key `ECDSA_P256` with `HARDWARE_ATTESTED`, `managementMode` `agent`, a narrow `policy`.
   Save the `id`.
2. `POST /protect/browser`: `name`, `matchAddresses` (the URLs), `credentials` `[credential id]`.
   Save the `id`.

## 4. Configure the app (hand to a person)

Tell the person to require a client certificate on the protected URLs, trust the authority's root for client verification, and map the identity from the first SAN (email) or second SAN (serial).
Name the server setting if they say which server they run (`ssl_verify_client` and `ssl_client_certificate` in NGINX, `SSLVerifyClient` and `SSLCACertificateFile` in Apache, `client_auth` in Caddy).
Do not change the app yourself.
Verifier-specific steps (Entra certificate-based authentication, Cloudflare Access, Auth0, Salesforce, Okta) are not documented yet; say so rather than inventing them.

## 5. Deliver to devices (certificate is automatic; the policy is handed to a person)

The agent installs the certificate.
Give the person the auto-select policy from the guide's Deliver step for their OS and browser, with the URL pattern and the exact intermediate CA name from the authority's page (for a hosted authority, `Smallstep <team-slug> Accounts Intermediate CA`).
Remind them that Chrome does not merge several `AutoSelectCertificateForUrls` policies.

## 6. Verify

Ask the person to confirm the certificate in the browser's certificate list, the policy at `chrome://policy`, then to open the app: no picker, and the app shows the identity.
Ask for `sudo step-agent doctor` output; every row `PASS`.

## 7. Roll out and operate (agent can do this)

- Widen the credential's `policy` with `PUT /credential/{credentialID}`.
- Add URLs with `PUT /protect/browser/{browserID}` and tell the person to add the same URLs to the policy.
- Revoke with `POST /certificates/{serialNumber}/revoke`; whether the app notices depends on its revocation checking.

## 8. Troubleshoot

Match the symptom to an entry under Troubleshooting → Web apps and follow its fix.

## 9. Automate (agent can do this)

Terraform: `smallstep_credential` and `smallstep_browser`; the guide's step 9 has the configuration.
