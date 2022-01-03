interface StageDefinition {
  branch: string;
  alias: string;
  env: {
    account: string;
    region: string;
  };
  description?: string;
  deployMfa: boolean;
}

export interface ApplicationDefinition extends StageDefinition {
  project: string;
  stage: string;
}

const {
  DEV_ACCOUNT = '',
  DEV_REGION = '',
  DEV_ALIAS = '',
  CDK_DEFAULT_ACCOUNT = '',
  CDK_DEFAULT_REGION = ''
} = process.env;

export const project = 'template';
export const repo = 'full-stack-cognito-template';

export const stages: StageDefinition[] = [
  {
    branch: 'individual',
    alias: DEV_ALIAS,
    env: {
      account: DEV_ACCOUNT || CDK_DEFAULT_ACCOUNT,
      region: DEV_REGION || CDK_DEFAULT_REGION
    },
    description: 'An ephemeral stage devs can use for creating isolated resources during development.',
    deployMfa: true
  },
  {
    branch: 'develop',
    alias: DEV_ALIAS,
    env: {
      account: DEV_ACCOUNT ?? CDK_DEFAULT_ACCOUNT,
      region: DEV_REGION ?? CDK_DEFAULT_REGION
    },
    description: 'The Sig AWS dev account',
    deployMfa: true
  }

  /**
   * You can add more aws accounts here for additional stages.
   */
  
];