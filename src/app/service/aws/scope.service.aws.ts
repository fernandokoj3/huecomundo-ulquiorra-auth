import { AuthService, ScopeService } from "@/domain/operation";
import { AuthPersistRequest, ScopePersistRequest } from "@/dto/request.dto";
import { AuthResponse, ScopeResponse } from "@/dto/response.dto";
import { Auth, Scope } from "@/entity/dynamodb";
import { AuthDynamodbRepository, ScopeDynamodbRepository } from "@/repository/aws/dynamodb";
import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";

@Service("auth.service.aws")
export class ScopeAwsService implements ScopeService {

    constructor(
        @Inject("database.dynamodb.scope.aws") private scopeRespository: ScopeDynamodbRepository
    ) { }

    async save(scopeRequest: ScopePersistRequest): Promise<ScopeResponse> {
        let entity = plainToInstance(Scope, scopeRequest);
        let result = await this.scopeRespository.save(entity)
        let instance = plainToInstance(ScopeResponse, result);
        return instance;
    }
}
