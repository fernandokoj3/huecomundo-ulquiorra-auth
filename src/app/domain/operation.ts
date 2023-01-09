import { TokenSignatureRequest, AuthorizeRequest, AuthPersistRequest, IssuerPersistRequest, ScopePersistRequest } from "@/dto/request.dto";
import { AuthResponse, ScopeResponse } from "@/dto/response.dto";
import { CredentialResponse } from "./model/auth";

export interface Authenticate {
    token(token: TokenSignatureRequest): Promise<any>
    check(auth: AuthorizeRequest, credential: CredentialResponse): Promise<boolean>;
}

export interface Configure {
    create(issuer: IssuerPersistRequest): Promise<any>
}

export interface AuthService {
    save(authRequest: AuthPersistRequest): Promise<AuthResponse>;
    get(clientId: string | number): Promise<AuthResponse>;
}

export interface ScopeService {
    save(scopeRequest: ScopePersistRequest): Promise<ScopeResponse>;
}
