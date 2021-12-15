#!/usr/bin/env node
import { IAMClient, ListMFADevicesCommand, ListMFADevicesCommandOutput } from '@aws-sdk/client-iam';
import { Credentials, GetSessionTokenCommand, GetSessionTokenCommandInput, STSClient } from '@aws-sdk/client-sts';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import moment = require('moment-timezone');

import { exec } from '../lib/utils';

const [, , ...args] = process.argv;
const profile = args[0];
const token = args[1];
const profileToken = `${profile}-token`;
const stsClient = new STSClient({
  credentials: fromIni({ profile })
});
const iamClient = new IAMClient({
  credentials: fromIni({ profile })
});

(async function () {
  const listMfaDevicesResponse: ListMFADevicesCommandOutput = await iamClient.send(new ListMFADevicesCommand({}));
  const serialNumber = listMfaDevicesResponse.MFADevices?.[0].SerialNumber;

  const sessionTokenParams: GetSessionTokenCommandInput = {
    DurationSeconds: 129600,
    SerialNumber: serialNumber,
    TokenCode: token
  };

  const getSessionTokenResponse = await stsClient.send(new GetSessionTokenCommand(sessionTokenParams));
  const {
    AccessKeyId,
    Expiration,
    SecretAccessKey,
    SessionToken
  } = getSessionTokenResponse.Credentials as Credentials;

  await exec(`aws configure set aws_access_key_id ${AccessKeyId} --profile ${profileToken}`);
  await exec(`aws configure set aws_secret_access_key ${SecretAccessKey} --profile ${profileToken}`);
  await exec(`aws configure set aws_session_token ${SessionToken} --profile ${profileToken}`);

  // eslint-disable-next-line no-console
  console.log(
    `Set session token in profile ${profileToken}, expires ${moment(Expiration)
      .tz('America/New_York')
      .format('MM/DD/YYYY hh:mm z')}`
  );
}) ();