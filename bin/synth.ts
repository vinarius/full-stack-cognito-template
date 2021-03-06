import { exec, getAppConfig } from '../lib/utils';

export async function synth(): Promise<void> {
  try {
    const { alias, branch, deployMfa } = await getAppConfig();
    const profile: string = deployMfa ? `${alias}-token` : alias;
    console.log();
    console.log(`>>> Synthesizing '${branch}' branch for deployment to ${alias} account`);
    console.log(`>>> Using profile ${profile}`);
    console.log();
    await exec(`npm run cdk -- synth --profile ${profile}`);
    console.log('>>> Synthesis complete');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

synth();
