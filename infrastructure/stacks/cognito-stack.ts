import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { UserPool } from '@aws-cdk/aws-cognito';

interface CognitoProps extends StackProps {
  project: string;
  stage: string;
}

export class CognitoStack extends Stack {
  constructor(scope: Construct, id: string, props: CognitoProps) {
    super(scope, id, props);

    const {
      project,
      stage
    } = props;

    const apiDocsUserPool = new UserPool(this, `${project}-userpool-${stage}`);
  }
}