import { TokenSignatureRequest, AuthorizeRequest } from "@/dto/request.dto";
import { CredentialResponse, CredentialProvider } from "@/domain/model/auth";
import { Inject, Service } from "typedi";
import { decode, validate, encode } from "@/utils/jwtUtils";
import { Authenticate, AuthService } from "@/domain/operation";
import { verify, compareHash } from "@/utils/authUtils";

@Service()
export class AuhorizerService implements Authenticate {

    constructor(
        @Inject("CredentialProvider") private credential: CredentialProvider,
        @Inject("AuthService") private authService: AuthService
    ) { }

    /**
     * For requests with signature
     * @param auth 
     * @returns 
    */
    public async token(token: TokenSignatureRequest): Promise<any> {

        let { signature, clientId, clientSecret } = token;
        let authResponse = await this.authService.get(clientId);
        if (!authResponse) {
            return Promise.reject(new Error());
        }

        if (!authResponse.validateSignatureActived) {
            return Promise.reject(new Error());
        }

        let credentialResponse = await this.credential.get(clientId);
        if (!credentialResponse) {
            return Promise.reject(new Error());
        }

        let { pubRsaSignKey, clientSecretHash, scopes } = authResponse;
        let data = JSON.stringify({
            clientId,
            secret: clientSecret
        });

        if (!verify(pubRsaSignKey, signature, data)) {
            return Promise.reject(new Error());
        }

        if (!compareHash(clientSecret, clientSecretHash)) {
            return Promise.reject(new Error());
        }

        let { clientTokenSignKey } = await this.credential.get(clientId);

        let payload = {
            sub: clientId,
            client_id: clientId,
            scopes: scopes
        }
        return encode(clientTokenSignKey, payload)
    }

    public async check(auth: AuthorizeRequest): Promise<boolean> {

        let payload = decode(auth.token);
        let clientID = payload["client_id"] as string;
        let scopes = payload["scopes"] as string[]

        let { clientTokenSignKey } = await this.credential.get(clientID);
        let valid = validate(auth.token, clientTokenSignKey);

        if (!valid) {
            return Promise.resolve(false)
        }

        if (!scopes) {
            return Promise.resolve(false)
        }


        return Promise.resolve(false);
    }

}
