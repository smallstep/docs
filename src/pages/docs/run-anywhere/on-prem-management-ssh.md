# On-Prem Management - SSH

## Admin Console

The KOTS admin console is your primary interface to software updates from Smallstep. Port forward it to your local machine from your Kubernetes cluster using the [KOTS plugin](https://kots.io/kots-cli/getting-started/#how-to-install) for `kubectl`.

```jsx
kubectl kots admin-console --namespace smallstep
```

## Register SSH Hosts

Refer to the [manual step-by-step host instructions](https://smallstep.com/docs/ssh/hosts-step-by-step) from our documentation. However, you will need to provide one additional flag (`--team-url`) in Step 4 to bootstrap to your SSH authority from your on-premises platform installation:

```jsx
step ca bootstrap --team="[team slug]" --team-url="https://api.[base domain]/v1/teams/<>/authorities/ssh"
```

## Configure SSH Clients (`step` CLI for Users)

Similarly to the host side, users can follow our [SSH Client Quickstart Guide](https://smallstep.com/app/teams/quickstart) but will need to provide the `--team-url` flag to reference your on-premises installation.

```jsx
step ssh config --team [team-slug] --team-url="https://api.[base domain]/v1/teams/<>/authorities/ssh"
```

## Add Dashboard Admins

In an on-premises installation, admins are managed through the `admin-tools` pod in Kubernetes.

```jsx
kubectl -n smallstep exec -it deploy/admin-tools -- bash

# inside the pod
👣 create-admin
```

Admins can reset their password by entering their email address on your dashboard login page, then selecting "I forgot my password."