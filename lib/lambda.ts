/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent } from 'aws-lambda';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
};

export async function setDefaultProps (
  event: APIGatewayProxyEvent,
  handler: any,
  context?: any,
  customHeaders?: any
): Promise<any> {
  try {
    const response = await handler(event, context);
    return {
      statusCode: 200,
      headers: customHeaders ?? headers,
      body: JSON.stringify(response)
    };
  } catch (error: any) {
    console.error(error);

    return {
      statusCode: error.statusCode ?? 500,
      headers,
      body: JSON.stringify(error)
    };
  }
}