import dynamoose, { aws } from "dynamoose";
import { ReplicationStatusType, SecretsManager } from '@aws-sdk/client-secrets-manager';
import { Class } from "utility-types";
import { plainToInstance } from "class-transformer";

const SM_ENDPOINT = 'http://localhost:4566'
const DYNAMO_ENDPOINT = 'http://localhost:8000'
const REGION = 'us-east-1';

const CLIENT = new SecretsManager({
    endpoint: SM_ENDPOINT,
    region: REGION
})

const CONNETION = new dynamoose.aws.ddb.DynamoDB({
    endpoint: DYNAMO_ENDPOINT,
    region: REGION
});

dynamoose.aws.ddb.set(CONNETION);

export async function getSecret(name: string): Promise<string>;
export async function getSecret<T>(name: string, type?: Class<T>): Promise<T>;

export async function getSecret<T>(name: string, $type?: Class<T>) {
    let data = await CLIENT.getSecretValue({ SecretId: name })
    let result: string;
    if ('SecretString' in data) {
        result = data.SecretString;
    } else {
        result = Buffer.from(data.SecretBinary as any, 'base64').toString('ascii');
    }
    if ($type) {
        return plainToInstance($type, result);
    }
    return result;
}

export const setSecret = async (name: string, value: object, description?: string)
    : Promise<{ statusCode: number, requestId: string }> => {
    let { $metadata } = await CLIENT.createSecret({
        Name: name, SecretString: JSON.stringify(value), Description: description
    })
    return { statusCode: $metadata.httpStatusCode, requestId: $metadata.requestId }
}

export const instance = dynamoose;
