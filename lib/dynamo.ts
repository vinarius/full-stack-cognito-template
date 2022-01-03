import { DynamoDBDocument, GetCommand, ScanCommandOutput } from '@aws-sdk/lib-dynamodb';

export interface DynamoScanItemsResponse { 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export async function getItem(
  client: DynamoDBDocument,
  tableName: string,
  idKey: string,
  itemId: string
) {
  const command = new GetCommand({
    TableName: tableName,
    Key: {
      [idKey]: itemId
    }
  });
  return await client.send(command);
}

export async function scan(
  client: DynamoDBDocument,
  tableName: string
): Promise<DynamoScanItemsResponse[]> {
  let nextToken;
  let totalData: DynamoScanItemsResponse[] = [];

  do {
    const response: ScanCommandOutput = await client.scan({
      TableName: tableName,
      ExclusiveStartKey: nextToken
    });

    totalData = [
      ...totalData,
      ...response.Items as DynamoScanItemsResponse[]
    ];

    nextToken = response.LastEvaluatedKey;
  } while (nextToken);

  return totalData;
}