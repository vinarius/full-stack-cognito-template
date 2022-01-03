import {
  CodeBuildClient,
  ImportSourceCredentialsCommand,
  ImportSourceCredentialsCommandInput,
  ImportSourceCredentialsCommandOutput,
  ListSourceCredentialsCommand,
  ListSourceCredentialsCommandInput,
  ListSourceCredentialsCommandOutput
} from '@aws-sdk/client-codebuild';
import { SecretsManagerClient, GetSecretValueCommand, GetSecretValueCommandInput, GetSecretValueCommandOutput } from '@aws-sdk/client-secrets-manager';

import { getAppConfig, retryOptions } from '../lib/utils';

/**
 * Credentials are necessary for CodeBuild to download the source from the Github repository.
 * This script checks if they exist, and imports them if they do not for the target aws account.
 */

const {
  IS_CODEBUILD = ''
} = process.env;

const codeBuildClient = new CodeBuildClient({ ...retryOptions });
const secretsManagerClient = new SecretsManagerClient({ ...retryOptions });

export async function validateSourceCredentials(): Promise<void> {
  try {
    /**
     * If not running in codebuild, fallback to shared ini profile credentials
     * for running this script by a developer directly.
     */
    if (!IS_CODEBUILD) {
      console.log('>>> CodeBuild not identified. Setting credentials to shared ini profile.');
      const { alias, deployMfa, env } = await getAppConfig();
      const profile = deployMfa ? `${alias}-token` : alias;
      process.env.AWS_PROFILE = profile;
      process.env.AWS_REGION = env.region;
      console.log(`>>> Profile set to: ${profile}\n`);
    }

    const listCredsInput: ListSourceCredentialsCommandInput = {};
    const listCredsCommand = new ListSourceCredentialsCommand(listCredsInput);
    const listCredsOutput: ListSourceCredentialsCommandOutput = await codeBuildClient.send(listCredsCommand);

    if (listCredsOutput.sourceCredentialsInfos!.length > 0) {
      console.log('>>> Source credentials found.');
      console.log('>>> validate-source-credentials complete.\n');
      return;
    }

    console.log('>>> Source credentials not found. Importing...');
    
    const getSecretInput: GetSecretValueCommandInput = { SecretId: 'TODO:' };
    const getSecretCommand = new GetSecretValueCommand(getSecretInput);
    const getSecretOutput: GetSecretValueCommandOutput = await secretsManagerClient.send(getSecretCommand);

    const token = getSecretOutput.SecretString;

    const importCredsInput: ImportSourceCredentialsCommandInput = {
      authType: 'PERSONAL_ACCESS_TOKEN',
      serverType: 'GITHUB',
      token
    };
    const importCredsCommand = new ImportSourceCredentialsCommand(importCredsInput);
    const importCredsOutput: ImportSourceCredentialsCommandOutput = await codeBuildClient.send(importCredsCommand);

    console.log(`>>> Import successful. Arn: ${importCredsOutput.arn}`);
    console.log('>>> validate-source-credentials complete.\n');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

validateSourceCredentials();