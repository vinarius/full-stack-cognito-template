import {
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
  AdminCreateUserCommandOutput,
  AdminDeleteUserCommand,
  AdminDeleteUserCommandInput,
  AdminDeleteUserCommandOutput,
  AdminGetUserCommand,
  AdminGetUserCommandInput,
  AdminGetUserCommandOutput,
  AdminResetUserPasswordCommand,
  AdminResetUserPasswordCommandInput,
  AdminResetUserPasswordCommandOutput,
  AdminUpdateUserAttributesCommand,
  ChangePasswordCommand,
  ChangePasswordCommandInput,
  ChangePasswordCommandOutput,
  AdminUpdateUserAttributesCommandInput,
  AdminUpdateUserAttributesCommandOutput,
  AttributeType,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
  ConfirmSignUpCommandOutput,
  GlobalSignOutCommand,
  GlobalSignOutCommandInput,
  GlobalSignOutCommandOutput,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  InitiateAuthCommandOutput,
  ListUserPoolsCommand,
  ListUserPoolsCommandInput,
  ListUserPoolsCommandOutput,
  ListUsersCommand,
  ListUsersCommandInput,
  ListUsersCommandOutput,
  SignUpCommand,
  SignUpCommandInput,
  SignUpCommandOutput,
  UserPoolDescriptionType,
  UserType,
  ForgotPasswordCommandInput,
  ForgotPasswordCommand,
  ForgotPasswordCommandOutput,
  ConfirmForgotPasswordCommandInput,
  ConfirmForgotPasswordCommand,
  ConfirmForgotPasswordCommandOutput,
  ResendConfirmationCodeCommandInput,
  ResendConfirmationCodeCommand,
  ResendConfirmationCodeCommandOutput
} from '@aws-sdk/client-cognito-identity-provider';

export async function adminCreateUser(
  client: CognitoIdentityProviderClient,
  UserPoolId: string,
  Username: string // Username must be an email
): Promise<AdminCreateUserCommandOutput> {
  const input: AdminCreateUserCommandInput = {
    UserPoolId,
    Username
  };
  const command = new AdminCreateUserCommand(input);
  const output: AdminCreateUserCommandOutput = await client.send(command);
  return output;
}

export async function adminDeleteUserById(
  client: CognitoIdentityProviderClient,
  UserPoolId: string,
  Username: string
): Promise<AdminDeleteUserCommandOutput> {
  const input: AdminDeleteUserCommandInput = {
    UserPoolId,
    Username
  };
  const command = new AdminDeleteUserCommand(input);
  const output: AdminDeleteUserCommandOutput = await client.send(command);
  return output;
}

export async function adminGetUserById(
  client: CognitoIdentityProviderClient,
  UserPoolId: string,
  Username: string
): Promise<AdminGetUserCommandOutput> {
  const input: AdminGetUserCommandInput = {
    UserPoolId,
    Username
  };
  const command = new AdminGetUserCommand(input);
  const output: AdminGetUserCommandOutput = await client.send(command);
  return output;
}

export async function adminResetUserPassword(
  client: CognitoIdentityProviderClient,
  UserPoolId: string,
  Username: string
): Promise<AdminResetUserPasswordCommandOutput> {
  const input: AdminResetUserPasswordCommandInput = {
    UserPoolId,
    Username
  };
  const command = new AdminResetUserPasswordCommand(input);
  const output: AdminResetUserPasswordCommandOutput = await client.send(command);
  return output;
}

export async function adminUpdateUserAttributesById(  
  client: CognitoIdentityProviderClient,
  UserPoolId: string,
  Username: string,
  UserAttributes: AttributeType[]
): Promise<AdminUpdateUserAttributesCommandOutput> {
  const input: AdminUpdateUserAttributesCommandInput = {
    UserPoolId,
    Username,
    UserAttributes
  };
  const command = new AdminUpdateUserAttributesCommand(input);
  const output: AdminUpdateUserAttributesCommandOutput = await client.send(command);
  return output;
}

export async function changePassword(
  client: CognitoIdentityProviderClient,
  AccessToken: string,
  PreviousPassword: string,
  ProposedPassword: string
): Promise<ChangePasswordCommandOutput> {
  const input: ChangePasswordCommandInput = {
    AccessToken,
    PreviousPassword,
    ProposedPassword
  };
  const command = new ChangePasswordCommand(input);
  const output: ChangePasswordCommandOutput = await client.send(command);
  return output;
}

export async function confirmForgotPassword(
  client: CognitoIdentityProviderClient,
  ClientId: string,
  Username: string,
  Password: string,
  ConfirmationCode: string
): Promise<ConfirmForgotPasswordCommandOutput> {
  const input: ConfirmForgotPasswordCommandInput = {
    ClientId,
    Username,
    Password,
    ConfirmationCode
  };
  const command = new ConfirmForgotPasswordCommand(input);
  const output: ConfirmForgotPasswordCommandOutput = await client.send(command);
  return output;
}

export async function confirmSignUp(
  client: CognitoIdentityProviderClient,
  ClientId: string,
  Username: string,
  ConfirmationCode: string
): Promise<ConfirmSignUpCommandOutput> {
  const input: ConfirmSignUpCommandInput = {
    ClientId,
    Username,
    ConfirmationCode
  };
  const command = new ConfirmSignUpCommand(input);
  const output: ConfirmSignUpCommandOutput = await client.send(command);
  return output;
}

export async function forgotPassword(
  client: CognitoIdentityProviderClient,
  ClientId: string,
  Username: string
): Promise<ForgotPasswordCommandOutput> {
  const input: ForgotPasswordCommandInput = {
    ClientId,
    Username
  };
  const command = new ForgotPasswordCommand(input);
  const output: ForgotPasswordCommandOutput = await client.send(command);
  return output;
}

export async function listUserPools(
  client: CognitoIdentityProviderClient
): Promise<UserPoolDescriptionType[]> {
  let totalUserPools: UserPoolDescriptionType[] = [];
  let nextToken;

  do {
    const input: ListUserPoolsCommandInput = {
      // 60 is the aws max
      MaxResults: 60,
      NextToken: nextToken
    };
    const command = new ListUserPoolsCommand(input);
    const output: ListUserPoolsCommandOutput = await client.send(command);

    totalUserPools = [
      ...totalUserPools,
      ...output.UserPools as UserPoolDescriptionType[]
    ];

    nextToken = output.NextToken;
  } while (nextToken);

  return totalUserPools;
}

export async function listUsers(
  client: CognitoIdentityProviderClient,
  UserPoolId: string
): Promise<UserType[]> {
  let totalUsers: UserType[] = [];
  let nextToken;

  do {
    const input: ListUsersCommandInput = {
      UserPoolId,
      Limit: 60, // 60 is the max
      PaginationToken: nextToken
    };
    const command = new ListUsersCommand(input);
    const output: ListUsersCommandOutput = await client.send(command);
    
    totalUsers = [
      ...totalUsers,
      ...output.Users as UserType[]
    ];

    nextToken = output.PaginationToken;
  } while (nextToken);

  return totalUsers;
}

export async function login(
  client: CognitoIdentityProviderClient,
  ClientId: string,
  username: string,
  password: string
): Promise<InitiateAuthCommandOutput> {
  const input: InitiateAuthCommandInput = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password
    }
  };
  const command = new InitiateAuthCommand(input);
  const output: InitiateAuthCommandOutput = await client.send(command);
  return output;
}

export async function logout(
  client: CognitoIdentityProviderClient,
  AccessToken: string
): Promise<GlobalSignOutCommandOutput> {
  const input: GlobalSignOutCommandInput = {
    AccessToken
  };
  const command = new GlobalSignOutCommand(input);
  const output: GlobalSignOutCommandOutput = await client.send(command);
  return output;
}

export async function refreshUserToken(
  client: CognitoIdentityProviderClient,
  ClientId: string,
  refreshToken: string
): Promise<InitiateAuthCommandOutput> {
  const input: InitiateAuthCommandInput = {
    AuthFlow: 'REFRESH_TOKEN',
    ClientId,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken
    }
  };
  const command = new InitiateAuthCommand(input);
  const output: InitiateAuthCommandOutput = await client.send(command);
  return output;
}

export async function resendConfirmationCode(
  client: CognitoIdentityProviderClient,
  ClientId: string,
  Username: string
): Promise<ResendConfirmationCodeCommandOutput> {
  const input: ResendConfirmationCodeCommandInput = {
    ClientId,
    Username
  };
  const command = new ResendConfirmationCodeCommand(input);
  const output: ResendConfirmationCodeCommandOutput = await client.send(command);
  return output;
}

export async function signUp(
  client: CognitoIdentityProviderClient,
  ClientId: string,
  Username: string,
  Password: string
): Promise<SignUpCommandOutput> {
  const input: SignUpCommandInput = {
    ClientId,
    Password,
    Username
  };

  const command = new SignUpCommand(input);
  const output: SignUpCommandOutput = await client.send(command);
  return output;
}
