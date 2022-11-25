import { Auth, Credential, Scope } from "@/entity/dynamodb";
import { plainToInstance } from "class-transformer";
import { Service } from "typedi";
import { IRepository } from ".";

@Service("database.dynamodb.auth")
export class AuthDynamodbRepository implements IRepository<Auth> {

    async one(clientID: string | number): Promise<Auth> {
        let result = await Auth.one(String(clientID));
        return plainToInstance(Auth, result)
    }

    async save(entity: Auth): Promise<Auth> {
        let result = await Auth.save(entity);
        return plainToInstance(Auth, result);
    }
}

@Service("database.dynamodb.credential")
export class CredentialDynamodbRepository implements IRepository<Credential> {
    
    public async one (clientID: string): Promise<Credential> {
        let result = await Credential.one(clientID);
        return plainToInstance(Credential,result);
    }

    public async save (credential: Credential): Promise<Credential> {
        let result = await Credential.save(credential);
        return plainToInstance(Credential, result);
    }
}

@Service("database.dynamodb.scope")
export class ScopeDynamodbRepository implements IRepository<Scope> {
    
    public async one (name: string): Promise<Scope> {
        let result = await Scope.one(name);
        return plainToInstance(Scope,result);
    }

    public async save (scope: Scope): Promise<Scope> {
        let result = await Scope.save(scope);
        return plainToInstance(Scope, result);
    }
}