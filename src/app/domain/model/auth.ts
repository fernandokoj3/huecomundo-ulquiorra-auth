import { AuthorizeRequest } from "@/dto/request.dto";
import { Expose } from "class-transformer";

export class CredentialResponse {

    @Expose({ name: "client_id" })
    public readonly clientId: string

    @Expose({ name: "client_secret" })
    public readonly clientSecret?: string

    @Expose({ name: "client_token_sign_key" })
    public readonly clientTokenSignKey: string
}

export class StatusSecretResponse {

    @Expose({ name: "status" })
    public readonly status: string | number

    @Expose({ name: "message" })
    public readonly message: string

    constructor(status?: string | number, message?: string) {
        this.status = status;
        this.message = message;
    }
}


export interface CredentialProvider {
    get(clientID: string): Promise<CredentialResponse>;

    put(name: string, value: any, description?: string): Promise<StatusSecretResponse>;
}
