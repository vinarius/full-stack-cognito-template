# Fullstack Cognito Template

## Instructions to manually deploy

```bash
git clone <url>
npm install
npm run build
npm run deploy
```

This process will deploy all stacks by default that is included in this app (bin/infrastructure.ts).

If for any reason you only want to deploy specific stack(s) (and its dependent stacks) you can run the following command. NOTE: the STACK takes a string blob with *'s and CDK will use that to deploy stacks with logical Id's that match that pattern (ie STACK='LambdaStack\*' will match and deploy the 'LambdaStackDev' stack, or STACK='LambdaStack\* DataStack\*' will match and deploy the 'LambdaStackDev' 'DataStackDev' stacks).
```bash
STACK='MyStack' npm run deploy # will deploy the 'MyStack' stack
```

## Useful commands

- `npm run build`      Produce a build of the web client. Lambda functions leverage esbuild and do not
                        require a separate build command ahead of deployment.
- `npm run deploy`     Deploy all stacks to AWS account/region based on current git branch.
- `npm run clean`      Recursively removes the cdk.out directory.
- `npm run synth`      Emits the synthesized CloudFormation template.
- `npm run diff`       Compare deployed stack(s) with the current state.
- `npm run test`       Perform the jest unit tests.
- `npm run lint`       Run linting on source code.
- `npm run watch`      Watch for changes and compile.
- `npm run aws-token`  Set temporary mfa credentials "{profile}-token" (ie myalias-dev-token).

## Repository Layout

```
bin/                 # Scripts and functions that can be run directly, or by the package.json
                         scripts. Includes the main cdk app - infrastructure.ts.
lib/                 # Shared helper classes and functions.
models/              # Shared types and runtime validation functions are defined here.
src/                 # Where the code lives for all lambda functions.
stacks/              # Cdk stacks and constructs. Here is where infrastructure resources are
                         defined and configured.
test/                # Tests to run against infrastructure stacks.
.eslintignore        # Defines which files are ignored by eslint.
.eslintrc.js         # Defines the linting strategy used by eslint.
.gitignore           # Defines which files are kept out of the remote repository,
                         such as node_modules.
.npmignore           # Defines which files should be omitted when publishing the package
                         to a registry.
cdk.context.json     # The AWS CDK caches context values retrieved from the AWS account.
                         This practice avoids unexpected changes to the deployments when,
                         for example,a new Amazon Linux AMI is released, changing the
                         Auto Scaling group.
cdk.json             # Defines where the main entry point of the CDK application is, and is
                         used to cache context key-value pairs in addition to cdk.context.json.
config.ts            # Environment/system configuration. Most props passed down to the stacks
                         are defined here.
jest.config.js       # Defines the testing strategy used by Jest. This repository aims for a
                         minimum of 80% code coverage. Use the `npm t -- --silent` command for
                         less verbose console output.
package.json         # Defines the package structure, commands, dependencies, and publishing
                         strategy. Note the scripts section.
README.md            # Defines this guide.
swagger.yml          # Defines the api documentation for Sigsee.
tsconfig.build.json  # An extension of tsconfig.json - defines how TypeScript builds this project.
tsconfig.json        # Defines how Typescript compiles this project.

----------------

cdk.out/             # Auto-generated by the AWS CDK. You can find synthesized, native
                        CloudFormation templates in here from `npm run synth` or `npm run deploy`.
coverage/            # Auto-generated by the Jest testing framework. You can find details on code
                         coverage as of the latest test here.
dist/                # Auto-generated. Where the latest build is found, both source code of the
                         lambdas as well as the lambdaLayer's dependencies.
node_modules/        # Generated by npm when you run `npm install`.
```

The `cdk.json` file tells the CDK Toolkit how to execute the app.

Configuration files are stored at the root and code always lives in a folder to promote reusablity and modularization. A good rule of thumb for the folders is, code that gets deployed to the cloud lives in `/src`. It gets transpiled with a different tsconfig than code that is intended to be run locally on the dev box. Code for helping deploy, or for infrastructure is generally split. If the file is intended to be run directly, it lives in `/bin`. If the file is run indirectly (renaming when deploying to aws, for instance) it belongs in `/lib`. Usually this happens when a `/bin` script gets too big and needs to be modularized. The helpers end up being code that is not intended to be called directly from the command line, but also does not get uploaded/run in production.

Name your stacks! Don't let CloudFormation autogenerate your naming.

This project was created using Node version 14.18 and NPM version 7.

## Instructions to manually deploy

```bash
git clone <url>
npm i
npm run build
npm run deploy
```

Yes, it is really that simple.

This process will deploy every stack that is included in this app. If for any reason you only want to deploy a single stack (and its dependent stacks) you can run the following command. NOTE: the STACK takes a string blob with *'s and CDK will use that to deploy stacks with logical Id's that match that pattern (ie STACK='LambdaStack\*' will match and deploy the 'LambdaStackDev' stack).
```bash
STACK='MyStack' npm run deploy # will deploy the 'MyStack' stack
```

## Instructions for credentials/auth

Your developer credentials are designed to be stored in `~/.aws/credentials` after being created on the console. It'll work smoothly across any number of accounts, and with token mfa, as long as we take care of a few small things. When naming your credentials profile, use the same name as the aws account alias. So, if the login portal alias is 'sigsee-dev' name your credentials alias the same in `~/.aws/credentials` like:

```
[sigsee-dev]
aws_access_key_id=******************
aws_secret_access_key=******************
```

Wtih mfa, the script will instead look for a temporary set of credentials to use. If the account alias, and your profile alias, are `sigsee-dev` the script will attempt to get a temporary set of token including the session token on the credentials profile `sigsee-dev-token` like this:

```
[sigsee-dev]
aws_access_key_id=******************
aws_secret_access_key=******************

[sigsee-dev-token]
aws_access_key_id=******************
aws_secret_access_key=******************
aws_session_token=******************
```

To generate a session token I have created a script. To use the script to create a named profile appending `-token`, invoke the npm script aws-token in the format: `npm run aws-token {profile} {token}`

```
npm run aws-token sigsee-dev 123456
```
This will produce the following output:

```
Set session token in profile sigsee-dev-token, expires 10/17/2021 01:10 EDT
```

This command (if your mfa token is valid) will create the named profile sigsee-dev-token for you.

The script inserts the valid token into our `~/.aws/credentials` on the `sigsee-dev-token` alias.


If you would rather not use this utility, you can [use the aws cli](https://docs.aws.amazon.com/cli/latest/reference/sts/get-session-token.html):

```
aws sts get-session-token
```

## Useful links
1. [AWS SDK V3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html)
2. [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-construct-library.html)
3. [AWS CLI Documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/index.html)
4. [AWS CloudFormation Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)
