import { CodeDeliveryDetailsType, CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { forgotPassword } from '../../lib/cognito';
import { setDefaultProps } from '../../lib/lambda';
import { retryOptions, validateEnvVars } from '../../lib/utils';
import { HandlerResponse } from '../../models/response';
import { ForgotPasswordReqBody, validateForgotPassword } from '../../models/user';

interface ForgotPasswordResponse extends HandlerResponse {
  details: CodeDeliveryDetailsType
}

const cognitoClient = new CognitoIdentityProviderClient({ ...retryOptions });

const forgotPasswordHandler = async (event: APIGatewayProxyEvent): Promise<ForgotPasswordResponse> => {
  validateEnvVars([]);

  const userParams: ForgotPasswordReqBody = JSON.parse(event.body ?? '{}');

  const isValid = validateForgotPassword(userParams);
  if (!isValid) throw {
    success: false,
    validationErrors: validateForgotPassword.errors ?? [],
    statusCode: 400
  };

  const {
    appClientId,
    username
  } = userParams.input;

  const { CodeDeliveryDetails } = await forgotPassword(cognitoClient, appClientId, username);

  return {
    success: true,
    details: CodeDeliveryDetails!
  };
};

export async function handler(event: APIGatewayProxyEvent) {
  console.log('Event:', JSON.stringify(event));

  const response = await setDefaultProps(event, forgotPasswordHandler);

  console.log('Response:', response);
  return response;
}
