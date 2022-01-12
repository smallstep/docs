# Adding Provisioners and Admins

### Dependencies

- Smallstep Platform
- [step](https://smallstep.com/docs/step-cli/installation)

The following steps operate under the assumption that you have already [bootstrapped](https://smallstep.com/docs/step-cli/reference/ca/bootstrap) your client device to your new certificate authority and that you have already been granted “admin” level access rights (manually during installation or via someone else following the instructions below).

### Adding Admins

If you would like to confirm the current list of admins on your authority before adding new users, you can use the `step beta` commands to do so. If desired, there are additional flags you can pass to the command listed below that can be found in the [command reference](https://smallstep.com/docs/step-cli/reference/beta/ca/admin/list).

```bash
step beta ca admin list
```

To add a new basic admin to a provisioner, you can run the below command, substituting in the user’s email and the name of the provisioner. If desired, there are additional flags that can be found in the [command reference](https://smallstep.com/docs/step-cli/reference/beta/ca/admin/add).

```bash
step beta ca admin add <subject> <provisioner>
```

Admin permissions can subsequently be [updated](https://smallstep.com/docs/step-cli/reference/beta/ca/admin/update) or [removed](https://smallstep.com/docs/step-cli/reference/beta/ca/admin/remove) using the commands specified in the [command reference](https://smallstep.com/docs/step-cli/reference/beta/ca/admin).

### Creating Provisioners

To review the configuration for all existing provisioners on your certificate authority, you can run:

```bash
step ca provisioner list
```

Alternatively, you can just check the existing configuration for a given provisioner by using the following command with [optional flags](https://smallstep.com/docs/step-cli/reference/beta/ca/provisioner/get):

```bash
step beta ca provisioner get <provisioner-name>
```

From there, you can add a new provisioner to your authority by using the corresponding `step beta` command. There are 9 different provisioner types that can be fine-tuned to any use-case. All provisioners accept values that define stipulations on certificate lifetimes, templates to be used, and admins on the provisioner. However, there are custom flags to be passed depending on provisioner type that correspond with the caveats of each. Please read through the [command reference](https://smallstep.com/docs/step-cli/reference/beta/ca/provisioner/add) to see all options you can use when setting up a new provisioner. 

If you just want stand up a basic, password-based provisioner with default values to get moving, run the following command, substituting in the desired name of the provisioner:

```bash
step beta ca provisioner add <provisioner-name> --type JWK --create
```

> For more information on each provisioner type and recommended configurations, please see our open source documentation on [How to Configure Provisioners](https://smallstep.com/docs/step-ca/provisioners#authorization-scope-by-provisioner).

This guide was written for `step-ca`, so it instructs you to use the `step ca` commands instead of the `step beta` commands. Instead, use the `step beta` commands listed in the guide above.
>