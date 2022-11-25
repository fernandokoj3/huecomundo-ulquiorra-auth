import dynamoose from "dynamoose";

const ddb = new dynamoose.aws.ddb.DynamoDB({
    endpoint: 'http://192.168.0.117:8000',
    region: 'us-east-2'
});

dynamoose.aws.ddb.set(ddb);

export const instance = dynamoose;