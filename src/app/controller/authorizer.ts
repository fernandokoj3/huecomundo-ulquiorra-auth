import {
    APIGatewayProxyEventV2,
    Context,
    APIGatewayProxyResult,
    APIGatewayProxyStructuredResultV2,
} from 'aws-lambda';
import { AuthorizeRequest, TokenSignatureRequest, IssuerPersistRequest } from "@/dto/request.dto";
import { validateObject } from '@/domain/validation';
import Container, { Inject, Service } from 'typedi';
import { Configure } from '@/domain/operation';
import { IssuerService } from '@/service/issuer.service';
import { useContainer } from 'class-validator';
import { AuthAwsService } from '@/service/aws/auth.service.aws';

export const authorizer = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {

    let token = event.headers.authorization
    event.body

    return null;
}

export const token = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {

    let body = JSON.parse(event.body);
    let { data, error } = await validateObject(body, TokenSignatureRequest)

    if (error) {
        return { statusCode: 400, body: JSON.stringify(error) };
    }


    return null;
}

export const create = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    let body = JSON.parse(event.body);
    let { data, error } = await validateObject(body, IssuerPersistRequest)

    if (error) {
        return { statusCode: 400, body: JSON.stringify(error) };
    }

    let service: Configure = Container.get(IssuerService);
    let result = await service.create(data)

    return { statusCode: 200, body: JSON.stringify(result) };

}
