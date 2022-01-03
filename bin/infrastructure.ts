#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FullStackCognitoTemplateStack } from '../stacks/full-stack-cognito-template-stack';


import { getAppConfig } from '../lib/utils';

const app = new cdk.App();
new FullStackCognitoTemplateStack(app, 'FullStackCognitoTemplateStack', {
  
});