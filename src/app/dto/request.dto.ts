import { ApiName, Permission } from "@/domain/model/scope";
import { VerbMethod } from "@/domain/verb";
import { Expose, plainToInstance, Transform } from "class-transformer";
import { IsDefined, IsEnum, IsIn } from "class-validator";

export class IssuerPersistRequest {

    @IsDefined()
    @Expose({ name: "name" })
    public readonly name: string

    @IsDefined()
    @Expose({ name: "issuer_id" })
    public readonly issuerId: string

    @Expose({ name: "description" })
    public readonly description: string

    @Expose({ name: "scopes" })
    public readonly scopes: Array<string>;

    @Expose({ name: "validate_signature_activated" })
    public readonly validateSignatureActived: boolean = true;

}


export class AuthorizeRequest {

    @IsDefined()
    @Expose({ name: "apiName" })
    public readonly apiName: string

    @IsDefined()
    @Expose({ name: "path" })
    public readonly path: string

    @IsDefined()
    @Expose({ name: "verb" })
    @IsEnum(VerbMethod)
    public readonly verb: string

    @IsDefined()
    @Expose({ name: "token" })
    @Transform(({ value }) => (value || "").replace(/^Berear(\s)?/ig, ""))
    public readonly token: string

    @IsDefined()
    @Expose({ name: "methodArn" })
    public readonly methodArn: string

    static create(event: any): AuthorizeRequest {
        let options = {
            stageVariables: event.stageVariables?.api_name,
            path: event.resource,
            verb: event.httpMethod,
            token: event.headers?.authorization,
            methodArn: event.methodArn,
        }
        return plainToInstance(AuthorizeRequest, options);
    }
}

export class TokenSignatureRequest {

    @IsDefined()
    @Expose({ name: "client_id" })
    public readonly clientId: string

    @IsDefined()
    @Expose({ name: "client_secret" })
    public readonly clientSecret: string

    @IsDefined()
    @Expose({ name: "grant_type" })
    @IsIn(["client_credentials"])
    public readonly grantType: string

    @IsDefined()
    @Expose({ name: "signature" })
    public readonly signature: string

    static create(body?: string): TokenSignatureRequest {
        let obj = JSON.parse(body)
        let options = {
            clientId: obj?.clientId,
            clientSecret: obj?.clientSecret,
            grantType: obj?.grantType,
            signature: obj?.signature,
        }
        return plainToInstance(TokenSignatureRequest, options);
    }
}

export class AuthPersistRequest {

    public readonly clientId: string;

    public readonly clientSecretHash: string;

    public readonly description: string;

    public readonly extraPayload: Object;

    public readonly pubRsaSignKey: string;

    public readonly scopes: Array<string>;

    public readonly smTokenSignatureKey: string;

    public readonly validateSignatureActived: boolean;
}

export class ScopePersistRequest {

    public readonly scope: string;

    public readonly parentScope: string;

    public readonly permissions: ApiName;

}
