import { Auth, Scope } from "@/entity/dynamodb";
import { plainToInstance } from "class-transformer";
import { Service } from "typedi";
import { Repository } from "..";

@Service("database.dynamodb.auth.aws")
export class AuthDynamodbRepository implements Repository<Auth> {

    async one(clientID: string | number): Promise<Auth> {
        let result = await Auth.one(String(clientID));
        return plainToInstance(Auth, result)
    }

    async save(entity: Auth): Promise<Auth> {
        let result = await Auth.save(entity);
        return plainToInstance(Auth, result);
    }
}


@Service("database.dynamodb.scope.aws")
export class ScopeDynamodbRepository implements Repository<Scope> {

    public async one(name: string): Promise<Scope> {
        let result = await Scope.one(name);
        return plainToInstance(Scope, result);
    }

    public async save(scope: Scope): Promise<Scope> {
        let result = await Scope.save(scope);
        return plainToInstance(Scope, result);
    }
}
