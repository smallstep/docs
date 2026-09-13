---
name: sso-device-factor
description: Make an identity provider require a Smallstep device certificate as a sign-in factor. Creates the device factor, its client, and the browser credential through the Smallstep API, and hands the Okta or Entra ID configuration to a person with the exact values they need.
---

# SSO device factor

This skill walks the nine steps of the [SSO device factor guide](https://smallstep.com/docs/use-cases/sso-device-factor).
The guide is being validated against the product; tell the person that before starting.
Steps 3, 6, 7, and 9 can be done through the Smallstep API.
Step 4 (the identity provider) and the browser policy in step 5 must be handed to a person.
Show every API request to the person before sending it; the client secret is returned once.

Requirements: an API token in `SMALLSTEP_API_TOKEN`, `curl`, and `jq`.
Every request carries `Authorization: Bearer $SMALLSTEP_API_TOKEN` and `x-smallstep-api-version: 2025-01-01`, against `https://gateway.smallstep.com/api`.

## 1. What you get

Tell the person: their identity provider redirects sign-ins to Smallstep as a second factor; Smallstep checks the device's certificate over mutual TLS and answers.
Objects: the device factor (one per team), a client per identity provider, and a browser credential plus web app resource for the device factor's address.
About 30 minutes plus the identity-provider change.

## 2. Before you start

- An approved device with a bound user and the agent (`GET /devices`).
- Users synced from the identity provider (`GET /platforms`, or ask).
- The authority whose credentials carry the person's email (`GET /authorities`); its root as `accounts_root.crt`.
- From the person: the identity provider and its tenant address (for Okta, the tenant domain).
- If Protect → SSO in the Console shows a request form, the team is not entitled; say so and stop.

## 3. Create it in Smallstep (agent can do this)

1. `PUT /sso` with `trustRoots` (the contents of `accounts_root.crt`; the root alone trusts every intermediate under it).
   Save `issuer`, `authorizeEndpoint`, `tokenEndpoint`, `jwksEndpoint`.
   Fetch `{issuer}/.well-known/openid-configuration` to confirm discovery works.
2. `POST /sso/clients` with `redirectURI`: `https://<okta-domain>/oauth2/v1/authorize/callback` for Okta, `https://login.microsoftonline.com/common/federation/externalauthprovider` for Entra ID.
   Save `id` and `secret`; show the secret once.
3. Create the browser credential and web app as the `web-apps` skill's step 3 does, with `matchAddresses` `[issuer]`, SANs with `smallstep:identity` first, and a duration up to `8760h0m0s`.

## 4. Configure the identity provider (hand to a person)

Give the person the issuer, the three endpoints, the client ID, and the client secret, plus the guide's Okta steps: add an OpenID Connect identity provider with usage **Factor only**, add it as an **IdP Authenticator**, and attach it to an authentication policy for a pilot group.
For Entra ID, say the mechanism is an external authentication method and that the exact menu steps are not documented yet.
Do not change the identity provider yourself.

## 5. Deliver to devices

The agent installs the certificate.
Hand the person the browser auto-select policy for the issuer address from the `web-apps` skill.

## 6. Verify

Ask the person to sign in to a pilot app from the enrolled device and choose Smallstep as the factor; the device check completes and the app opens.
Then from a device that is not enrolled; the factor is not satisfied.

## 7. Roll out and operate (agent can do this)

- The person widens the identity-provider policy; widen the credential's `policy` with `PUT /credential/{credentialID}`.
- Revoke with `POST /certificates/{serialNumber}/revoke`.
- Rotate the secret: create a new client, hand it over, then `DELETE /sso/clients/{idpClientID}` for the old one.
- More authorities: `PUT /sso` with a PEM bundle of roots.

## 8. Troubleshoot

Match the symptom to an entry under Troubleshooting → SSO device factor (and Web apps for the certificate itself) and follow its fix.

## 9. Automate (agent can do this)

Terraform: `smallstep_identity_provider`, `smallstep_identity_provider_client` (with `store_secret` or `write_secret_file`), plus `smallstep_credential` and `smallstep_browser`.
