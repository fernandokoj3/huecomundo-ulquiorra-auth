import { AuthorizeRequest } from "@/dto/request.dto";
import { Expose } from "class-transformer";

export class CredentialResponse {

    @Expose({ name: "client_id"})
    public readonly clientId: string

    @Expose({ name: "client_secret"})
    public readonly clientSecret?: string

    @Expose({ name: "client_token_sign_key" })
    public readonly clientTokenSignKey: string
}

export interface IAuthorize {
    check(auth: AuthorizeRequest, credential: CredentialResponse): Promise<boolean>;
}

export interface ICredential {
    get(clientID: string): Promise<CredentialResponse>;
}
