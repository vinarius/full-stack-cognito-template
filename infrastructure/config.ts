interface StageDefinition {
  stage: string;
  alias: string;
  env: {
    account: string;
    region: string;
  };
  description?: string;
  branch: string;
  deployMfa: boolean;
}

export interface ApplicationDefinition extends StageDefinition {
  project: string;
  stage: string;
}

export const project = 'sigApiDocs';

export const cicdConfig = {
  alias: 'sigsee-cicd',
  env: {
    account: '755806799746',
    region: 'us-east-1'
  },
  description: 'The Sig AWS cicd account',
  deployMfa: true
};

export const stages: StageDefinition[] = [
  {
    stage: 'dev',
    branch: 'develop',
    alias: 'sigsee-dev',
    env: {
      account: '476324220602',
      region: 'us-east-1'
    },
    description: 'The Sig AWS dev account',
    deployMfa: true
  },
  {
    stage: 'prod',
    branch: 'master',
    alias: 'sigsee-prod',
    env: {
      account: '597119195378',
      region: 'us-east-1'
    },
    description: 'The Sig AWS prod account',
    deployMfa: true
  }
];