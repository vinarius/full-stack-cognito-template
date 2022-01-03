#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import { config } from 'dotenv';

import { FullStackCognitoTemplateStack } from '../stacks/full-stack-cognito-template-stack';

config();
const app = new cdk.App();
new FullStackCognitoTemplateStack(app, 'FullStackCognitoTemplateStack', {
  
});