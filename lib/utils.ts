import { StandardRetryStrategy } from '@aws-sdk/middleware-retry';
import { exec as EXEC } from 'child_process';
import { resolve } from 'path';
import { promisify } from 'util';

import { ApplicationDefinition, project, stages } from '../config';

const promiseExec = promisify(EXEC);


export function exec(
  command: string,
  logToConsole: boolean = true
  // resolveStdErr: boolean = false
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    function stdoutHandler(data: string) {
      if (logToConsole) console.log(data);
    }
    function stderrHandler(data: string) {
      if (logToConsole) console.error(data);
      // if (resolveStdErr) resolve(data);
    }

    const child = EXEC(command, (err, results) => {
      if (err) return reject(err);

      resolve(results);
    });

    child.stdout.on('data', stdoutHandler);
    child.stderr.on('data', stderrHandler);

    child.once('exit', (code) => {
      if (code !== 0) process.exit(1);

      child.stdout.removeListener('data', stdoutHandler);
      child.stderr.removeListener('data', stderrHandler);
    });
  });
}

// export async function exec(command: string) {
//   await promiseExec(command).catch(err => {
//     console.error(err);
//   });
// }

async function myTest() {
  await exec('npm run cdk ls --profile sigsee-dev-token --region us-east-1');
}

myTest();

export function fromRoot(path: string | string[]): string {
  const segments: string[] = typeof path === 'string' ? path.split(/[/\\]/).filter((seg) => seg !== '') : path;
  return resolve(__dirname, '..', ...segments);
}

export async function getLocalGitBranch(): Promise<string> {
  const output: string = await exec('git status', false);
  const [, branch] = /^On\sbranch\s([\S]*).*/.exec(output.toString()) || [];
  return branch; // ie 'master' || 'feature/sigsee-100'
}

const maxRetryAttempts = 10;
export const retryOptions = {
  maxAttempts: maxRetryAttempts,
  retryStrategy: new StandardRetryStrategy(async () => maxRetryAttempts)
};

export function validateEnvVars(envVars: string[]): Error|void {
  const unsetEnvVars: string[] = [];

  for (const variable of envVars)
    if (!process.env[variable]) unsetEnvVars.push(variable);

  if (unsetEnvVars.length > 0) throw new Error(`Unset environment variables required to execute lambda.\n\n${unsetEnvVars.join(' ')}\n`);
}

export async function getAppConfig(): Promise<ApplicationDefinition> {
  /**
   * This pattern allows for a few things. If the synth function is incorporated
   * into another process the desired stage can be programmatically set.  If not
   * a pipeline, or a developer, can take precedence and set the environment
   * manually, BRANCH=xyz, to override the "default code branch"
   *   >
   *   > BRANCH=xyz npm run synth
   *   >
   * When BRANCH is not set the default branch will be the current repo
   * branch by running `git status` to try and determine it.
   */
  const branch = process.env.BRANCH ?? await getLocalGitBranch();

  if (!branch) throw new Error('>>> Could not determine what environment to deploy. No process.env.BRANCH nor git branch available.');

  const config = stages.find(stage => stage.branch === branch) ?? stages[0];
  if (!config.env.account) throw new Error('>>> No account prop found in stage definition.');

  return {
    ...config,
    stage: branch === 'master' ? 'prod' :
      branch === 'develop' ? 'dev' :
        branch.includes('/') ? branch.split('/').reverse()[0] :
          branch, // This paradigm allows for ephemeral resource creation for team development.
    branch,
    project
  };
}