---
name: wifi
description: Set up certificate-based Wi-Fi (802.1X EAP-TLS) with Smallstep. Creates the credential, the RADIUS server, and the Wi-Fi network through the Smallstep API, and hands the access-point and MDM steps to a person with the exact values they need.
---

# Wi-Fi with device certificates

This skill walks the nine steps of the [Wi-Fi guide](https://smallstep.com/docs/use-cases/wifi).
Steps 3, 6, 7, and 9 can be done through the Smallstep API.
Steps 4 and 5 (access points, MDM) must be handed to a person with the values from step 3.
Show every API request to the person before sending it; a credential or a RADIUS server is a real object once created.

Requirements: an API token in `SMALLSTEP_API_TOKEN`, `curl`, and `jq`.
Every request carries `Authorization: Bearer $SMALLSTEP_API_TOKEN` and `x-smallstep-api-version: 2025-01-01`, against `https://gateway.smallstep.com/api`.

## 1. What you get

Tell the person: a credential (client certificate per device, key in hardware), a RADIUS server run by Smallstep that verifies it, and a Wi-Fi network resource that tells devices which SSID to join and which RADIUS CA to trust.
About 20 minutes plus the access-point change.
Recommend a test SSID.

## 2. Before you start

Confirm with the person, or check with the API:

- At least one approved device with the agent: `GET /devices` and look for an approved device on macOS, Windows, or Linux.
- The authority that signs client certificates: `GET /authorities`; note its `id` and download its root certificate (save as `client_ca.crt`).
  If there is none, stop and point to the hosted authority guide.
- If profiles will be delivered by an MDM: the MDM is connected (`GET /platforms`).
- From the person: the public IP address the access points send RADIUS traffic from, and the test SSID.

## 3. Create it in Smallstep (agent can do this)

In order:

1. `POST /credentials` with the body from the guide's step 3: `slug` `wifi`, `certificate.type` `X509`, `authorityID`, `duration` `24h0m0s`, common name from `smallstep:identity` with a static fallback, SANs from `smallstep:identity` and `Device.Serial`, `extendedKeyUsage` `["clientAuth"]`, key `ECDSA_P256` with `HARDWARE_ATTESTED` protection (or `HARDWARE_WITH_FALLBACK` if the person accepts software keys), `managementMode` `agent`, and a narrow `policy` (a pilot tag, or `assurance: ["high"]` with the operating systems).
   Save the `id`.
2. `POST /managed-radius` with `name`, `nasIPs` (the person's public IPs), and `clientCA` (the contents of `client_ca.crt`).
   Save `id`, `serverIP`, `serverPort`, `serverHostname`, and `serverCA` (save as `radius_ca.crt`).
3. `GET /managed-radius/{id}?secret=true` and keep `secret` for step 4 without printing it more than once.
4. `POST /protect/wifi` with `name`, `ssid`, `hidden` false, `autojoin` true, `radiusServerCA` (the contents of `radius_ca.crt`), `radiusServerDomain` (`serverHostname`), and `credentials` `[credential id]`.
   Save the `id`.

If the person brings their own RADIUS server, skip 2 and 3, tell them to add `client_ca.crt` to that server's trusted client CAs, and use their server's CA as `radiusServerCA`.

## 4. Configure the access points (hand to a person)

Give the person these values and the vendor steps from the guide's step 4 (Meraki, Ubiquiti UniFi, Aruba, Cisco WLC, Juniper Mist; others in the access point reference):

- Security: WPA2 Enterprise or WPA3 Enterprise
- RADIUS server IP: `serverIP`
- RADIUS server port: `serverPort`
- Shared secret: `secret`
- Server certificate name: `serverHostname`

Do not change the access point yourself.
Wait for the person to say it is done.

## 5. Deliver to devices (agent-managed needs nothing; MDM is handed to a person)

- Agent-managed devices: nothing to do; the agent requests the certificate, trusts `radius_ca.crt`, creates the profile, and renews.
- MDM-delivered profiles: hand the person the guide's tab for their MDM (Jamf Pro, Intune, Workspace ONE, ChromeOS).
  The profile downloads and the SCEP settings are on the network's page under Protect → Wi-Fi in the Console; the agent cannot download them.

## 6. Verify (agent can check the API side)

- Ask the person to select the SSID on the test device; it should connect without a password.
- `GET /protect/wifi/{id}` confirms the resource; the issued certificate and the authentication activity are on the network's page in the Console.
- Ask the person to run `sudo step-agent doctor` on the device and paste the table; every row should be `PASS`.

## 7. Roll out and operate (agent can do this)

- Widen the assignment policy: `PUT /credential/{credentialID}` with the full object and a broader `policy` (for example `ownership: ["company"]`).
- Renewals are automatic on agent-managed devices.
- Revoke a device's certificate with `POST /certificates/{serialNumber}/revoke`; RADIUS checks revocation on every authentication.
- New site: `PUT /managed-radius/{id}` with the new public IP added to `nasIPs`.
- The same credential and RADIUS server serve a wired network (`POST /protect/ethernet`).

## 8. Troubleshoot

Match the symptom to an entry under Troubleshooting → Wi-Fi in the docs and follow its fix; the entries name the guide step to return to.
Do not guess at a cause the entries do not list.

## 9. Automate (agent can do this)

The same objects as Terraform: `smallstep_credential`, `smallstep_managed_radius`, `smallstep_wifi`, with the shared secret from the `smallstep_managed_radius_secret` data source.
The guide's step 9 has the configuration.
