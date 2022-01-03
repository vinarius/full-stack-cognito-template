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

export const project = 'template';
export const repo = 'full-stack-cognito-template';

export const stages: StageDefinition[] = [
  {
    branch: 'individual',
    alias: 'myalias-dev',
    env: {
      account: '123456789012',
      region: 'us-east-1'
    },
    description: 'An ephemeral stage devs can use for creating isolated resources during development.',
    deployMfa: true
  },
  {
    branch: 'develop',
    alias: 'myalias-dev',
    env: {
      account: '123456789012',
      region: 'us-east-1'
    },
    description: 'The Sig AWS dev account',
    deployMfa: true
  }

  /**
   * You can add more aws accounts here for additional stages.
   */
  
];