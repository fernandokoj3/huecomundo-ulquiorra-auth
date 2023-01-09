import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";
import { AuthService } from "@/domain/operation";
import { AuthPersistRequest } from "@/dto/request.dto";
import { AuthResponse } from "@/dto/response.dto";
import { Auth } from "@/entity/dynamodb";
import { AuthDynamodbRepository } from "@/repository/aws/dynamodb";

@Service()
export class AuthAwsService implements AuthService {

    constructor(
        @Inject("database.dynamodb.auth.aws") private authRespository: AuthDynamodbRepository
    ) { }

    async get(clientId: string | number): Promise<AuthResponse> {
        let result = await this.authRespository.one(clientId)
        let instance = plainToInstance(AuthResponse, result);
        return instance;
    }

    async save(authRequest: AuthPersistRequest): Promise<AuthResponse> {
        let entity = plainToInstance(Auth, authRequest);
        let result = await this.authRespository.save(entity)
        let instance = plainToInstance(AuthResponse, result);
        return instance;
    }
}
