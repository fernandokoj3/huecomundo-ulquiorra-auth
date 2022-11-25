import { VerbMethod } from "@/domain/verb";
import { Expose, plainToClass, plainToInstance, Transform, Type } from "class-transformer";
import { IsDefined, IsEnum, validate as _validate } from "class-validator";
import { Class } from "utility-types";

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

export class AuthenticateRequest {
    
    @IsDefined()
    @Expose({ name: "client_id" })
    public readonly clientId: string

    @IsDefined()
    @Expose({ name: "client_secret" })
    public readonly clientSecret: string

    @IsDefined()
    @Expose({ name: "grant_type" })
    @IsEnum(VerbMethod)
    public readonly grantType: string

    @IsDefined()
    @Expose({ name: "signature" })
    public readonly signature: string

    static create(body?: string): AuthorizeRequest {
        let obj = JSON.parse(body)
        let options = {
            clientId: obj?.clientId,
            clientSecret: obj?.clientSecret,
            grantType: obj?.grantType,
            signature: obj?.signature,
        }
        return plainToInstance(AuthorizeRequest, options);
    }
}


export async function validate<T= any> (body: object, $type: Class<T>){
   let $obj = plainToClass($type, body);
   let error = await _validate($obj as any, $type, {});
   return {
    error,
    data: $obj
   }
}

