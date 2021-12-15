#!/usr/bin/env node
import 'source-map-support/register';

import { App } from 'aws-cdk-lib';

import { getAppConfig } from '../lib/utils';

async function buildInfrastructure(): Promise<void> {
  const {
    project,
    stage,
    env
  } = await getAppConfig();

  const app = new App();

  app.synth();
}

buildInfrastructure();