---
name: wired
description: Set up certificate-based wired networking (802.1X EAP-TLS) with Smallstep. Reuses the Wi-Fi credential and RADIUS server, creates the wired network through the Smallstep API, and hands the switch and MDM steps to a person with the exact values they need.
---

# Wired networks with device certificates

This skill walks the nine steps of the [wired guide](https://smallstep.com/docs/use-cases/wired).
Steps 3, 6, 7, and 9 can be done through the Smallstep API.
Step 4 (switches) and the MDM part of step 5 must be handed to a person.
Show every API request to the person before sending it.

Requirements: an API token in `SMALLSTEP_API_TOKEN`, `curl`, and `jq`.
Every request carries `Authorization: Bearer $SMALLSTEP_API_TOKEN` and `x-smallstep-api-version: 2025-01-01`, against `https://gateway.smallstep.com/api`.

## 1. What you get

Tell the person: the switch port opens only after the RADIUS server accepts the device's certificate.
The credential and the RADIUS server are the same objects as for Wi-Fi; only the wired network resource is new.
About 15 minutes plus the switch change.

## 2. Before you start

- An approved device with the agent and a wired interface (`GET /devices`).
- The authority (`GET /authorities`) and its root as `client_ca.crt`.
- If Wi-Fi is set up: the existing credential (`GET /credentials`) and RADIUS server (`GET /managed-radius`); reuse them.
- From the person: the public IP the switches send RADIUS traffic from, and a test port.

## 3. Create it in Smallstep (agent can do this)

1. If there is no credential or RADIUS server, create them as the `wifi` skill's step 3 does, with `slug` `dot1x` and static common name `Corporate Network`; `nasIPs` are the switches' public IPs.
   Save `radius_ca.crt` (the server's `serverCA`).
2. `POST /protect/ethernet` with `name`, `autojoin` true, `radiusServerCA` (the contents of `radius_ca.crt`), and `credentials` `[credential id]`.
   Save the `id`.

## 4. Configure the switches (hand to a person)

Give the person `serverIP`, `serverPort`, and the shared secret (`GET /managed-radius/{id}?secret=true`), and the shape from the guide: register the RADIUS server, enable 802.1X globally, enable port authentication on one test port first, plan a guest or unauthenticated VLAN for devices without certificates (MAC Authentication Bypass is not supported).
Do not change the switch yourself; wait for the person.

## 5. Deliver to devices

- Agent-managed devices: nothing to do.
  Tell the person that on Windows the Wired AutoConfig service (`dot3svc`) must be running.
- Intune or Workspace ONE LAN profile (agent owns the certificate): hand the person the guide's tab and the profile reference; the two fingerprints come from `radius_ca.crt` and the authority's intermediate.

## 6. Verify

- Ask the person to plug the test device into the port and to run `show authentication sessions` on the switch; expect **Authorized**.
- `GET /protect/ethernet/{id}` confirms the resource; the activity is on the resource's page in the Console.
- Ask for `sudo step-agent doctor` output from the device; every row `PASS`.

## 7. Roll out and operate (agent can do this)

- Widen the credential's `policy` with `PUT /credential/{credentialID}`.
- The person enables port authentication on more ports in batches.
- Revoke with `POST /certificates/{serialNumber}/revoke`.
- A second RADIUS server for failover: register both public IPs in `nasIPs`.

## 8. Troubleshoot

Match the symptom to an entry under Troubleshooting → Wired (and the RADIUS-side entries under Wi-Fi) and follow its fix.

## 9. Automate (agent can do this)

Terraform: `smallstep_ethernet` beside the `smallstep_credential` and `smallstep_managed_radius` from the Wi-Fi configuration.
