import { ApiName } from "@/domain/model/scope";

export class IssuerPersistResponse {

}

export class AuthResponse {

    public readonly clientId: string;

    public readonly clientSecretHash: string;

    public readonly description: string;

    public readonly extraPayload: string;

    public readonly pubRsaSignKey: string;

    public readonly scopes: Array<string>;

    public readonly smTokenSignatureKey: string;

    public readonly validateSignatureActived: boolean;
}

export class ScopeResponse {

    public readonly scope: string;

    public readonly parentScope: string;

    public readonly permissions: ApiName;

}
