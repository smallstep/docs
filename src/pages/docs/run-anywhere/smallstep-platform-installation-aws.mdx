# Smallstep Platform Installation - AWS

## Setting up AWS Infrastructure

### Dependencies

- [AWS CLI](https://aws.amazon.com/cli/)
- [terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [KOTS](https://kots.io/kots-cli/getting-started/#how-to-install)
- [linkerd](https://linkerd.io/2.10/getting-started/#step-1-install-the-cli)
- [step](https://smallstep.com/docs/step-cli/installation)

### AWS CLI

All steps involving the setup of your AWS Infrastructure use the AWS CLI at some point. Make sure that you are logged in to your account on the command line with your [configuration](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) pointing at the right account.

### Terraform

If you already have a Terraform environment set up for your account, add the [run-anywhere-terraform](https://github.com/smallstep/run-anywhere-terraform/tree/main/aws) module to your configuration and follow the steps listed in its README, skipping the steps involving state creation. If you are new to Terraform, follow the [run-anywhere-terraform](https://github.com/smallstep/run-anywhere-terraform/tree/main/aws) module’s README in its entirety: it will instruct you how to set up a Terraform [state](https://www.terraform.io/language/state) in your AWS account, instantiate the [module](https://www.terraform.io/language/modules/syntax), and run the subsequent Terraform [apply](https://www.terraform.io/cli/commands/apply).

Alternatively, you may use the Terraform module as documentation and deploy the same set of resources following the policies required by your organization. While the Terraform module does offer most configurations to be specified by the user, it is by no means “one size fits all” - there are still some finite configuration details some organizations may need to tweak beyond the capability we allow.

In short, the module will instantiate and configure:

- 1 PostgreSQL Aurora cluster
    - Hosting 10 databases (set up by Lambda)
- 1 Elasticache Redis instance
- 1 EKS cluster and Node Pool
- 1 KMS Key for the project resources
- 7-8 SecretsManager Secrets
- 8 Alias Route53 records
- 1 NLB (stood up by the cluster)
- 1 Target Group (stood up by the cluster)
    - Listeners/rules to route to services internal to the cluster
- All associated IAM permissions, SG rules, and tags to allow the project to run with the minimum level of permissions required

### DNS

(Not required if you manage your Domain with Route53)

Refer to the AWS Console, Route53 ⇒ Your Hosted Zone to retrieve the list of nameservers for your AWS DNS configuration.

In the your base domain DNS provider's records, add an `NS` record to delegate resolution of the subdomain to the DNS nameservers.

For example, an `NS` record for `[smallstep.basedomain.company.com](http://smallstep.basedomain.company.com)` may contain the following:

```
ns-1111.awsdns-11.org.
ns-222.awsdns-22.co.uk.
ns-123.awsdns-45.net.
ns-456.awsdns-78.com.
```

## Platform

### AWS `kubectl` context

To interact with the EKS cluster, you'll need to configure a local `kubectl` context. `aws` CLI can do this for you. They provide a comprehensive [guide](https://aws.amazon.com/premiumsupport/knowledge-center/eks-cluster-connection/) on how to gain `kubectl` access to the cluster.

> Your AWS profile will be the only IAM entity with access to the cluster initially. You will have the highest level of access by default. To add subsequent users and map subsequent permissions internal to the EKS cluster, follow the AWS [guide](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html) on how to update the `configmap` with your desired settings.
> 

### **Linkerd**

Smallstep services currently use Linkerd for some internal load balancing needs. Install it manually with a long lived certificate. Linkerd comes with a default certificate with a lifetime of 1 year; we don’t want our CA to become useless in 1 year, so this step is necessary. However, we may eventually remove the dependency on Linkerd.

First, create a root CA cert and key:

```bash
step certificate create root.linkerd.cluster.local ca.crt ca.key \
  --profile root-ca --no-password --insecure --not-after=87600h

```

Use the CA to issue an identity certificate for linkerd:

```bash
step certificate create identity.linkerd.cluster.local issuer.crt issuer.key \
  --profile intermediate-ca --not-after 87600h --no-password --insecure \
  --ca ca.crt --ca-key ca.key

```

Install linkerd, providing the files from the previous commands:

```bash
kubectl config use-context <your context>

linkerd install \
  --identity-trust-anchors-file ca.crt \
  --identity-issuer-certificate-file issuer.crt \
  --identity-issuer-key-file issuer.key \
  | kubectl apply -f -
```

Shred the key material:

```jsx
shred -uv ca.key issuer.key
```

## Secrets

This project uses [Kubernetes secrets](https://kubernetes.io/docs/concepts/configuration/secret/) internal to the EKS cluster to manage our passwords. You don’t have to do anything to set these up, as Terraform has already done so for you.

### Smallstep

Begin the Smallstep platform installation process (powered by KOTS). Install into the `smallstep` namespace.

```bash
kubectl config use-context <your context>
kubectl kots install smallstep/onboarding
```

### Team and Authority Configuration

Exec into the a `admin-tools` pod to run configuration tooling:

```bash
kubectl exec -it -n smallstep deploy/admin-tools -c admin-tools -- bash
```

**Create a new team**

Make sure the team slug matches the slug used in your smallstep installation.

```bash
create-team
```

**Create a new authority**

Use the convention `ssh.<team-slug>.ca.<base-domain>` for the domain:

```bash
create-authority --ssh

manage-provisioners --ssh --type SSHPOP --name "SSH POP" --authority <authority-id> add

refresh-authority <authority-id>
```

# 🎉🥂

**Add OIDC provisioner**

```jsx
manage-provisioners --ssh --type OIDC --name "azuread" --listen-address 127.0.0.1:10000 --client-id <client-id> --client-secret <client-secret> --configuration-endpoint <configuraiton-endpoint> --domain <domain>  --authority <authority-id> --tenant-id <azure-tenant-id> add
```

**Note:** After syncing over SCIM, don't forget to update the team SSH directory to point to the new IdP directory.

```jsx
kubectl exec -it -n smallstep deploy/admin-tools -c admin-tools -- bash

$ psql folk
> update teams set ssh_directory_id = '<directory-id>' where slug = '<team-slug>';
```