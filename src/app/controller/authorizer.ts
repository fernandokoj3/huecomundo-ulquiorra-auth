import {
    APIGatewayProxyEventV2,
    Context,
    APIGatewayProxyResult,
    APIGatewayProxyStructuredResultV2,
} from 'aws-lambda';
import { AuthorizeRequest, AuthenticateRequest, validate } from "@/dto/request.dto";

const authorizer = async (event: APIGatewayProxyEventV2, context: Context) : Promise<APIGatewayProxyStructuredResultV2> => {
    
    let token = event.headers.authorization
    event.body

    return null;
}

const getToken = async (event: APIGatewayProxyEventV2, context: Context) : Promise<APIGatewayProxyStructuredResultV2> => {
    
    event.body

    return null;
}