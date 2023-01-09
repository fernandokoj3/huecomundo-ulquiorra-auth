import 'reflect-metadata';
import { Inject, Service } from "typedi";
import { randomUUID } from 'crypto'
import { AuthPersistRequest, IssuerPersistRequest } from "@/dto/request.dto";
import { AuthService, Configure } from "@/domain/operation";
import { generatePassword, generateRsaKeys, sign, generateClientSecret, verify, hash } from "@/utils/authUtils";
import { log } from "@/utils/logUtils";
import { CredentialProvider } from "@/domain/model/auth";
import { CLIENT_SECRET_LENGTH, DESCRIPTION_PREFIX } from "@/utils/constants";

@Service()
export class IssuerService implements Configure {

    constructor(
        @Inject("CredentialProvider") private credential: CredentialProvider,
        @Inject("AuthService") private authService: AuthService
    ) { }

    async create(issuer: IssuerPersistRequest): Promise<any> {

        try {
            log.info("Generate passphrase", { issuer: issuer.name });
            let passphrase = generatePassword();

            log.info("Generate RSA", { issuer: issuer.name });
            let { privateRsa: privateKeyRsa, publicRsa: publicKeyRsa } = generateRsaKeys(passphrase);

            log.info("Generate client id", { issuer: issuer.name });
            let clientId = randomUUID().replace(/-/g, "");

            log.info("Generate client secret and hash", { issuer: issuer.name });
            let clientSecret = generateClientSecret(CLIENT_SECRET_LENGTH);
            let clientSecretHash = hash(clientSecret);

            log.info("Signing RSA")
            let data = JSON.stringify({
                clientId,
                secret: clientSecret
            });
            let signature = sign(passphrase, data, privateKeyRsa);

            log.info("Verify RSA")
            let verifed = verify(publicKeyRsa, signature, data);

            log.info("Creating value to secret manager and put on it", { issuer: issuer.name });
            let sm = {
                password_token: passphrase,
                client_secret: clientSecret,
                private_rsa: privateKeyRsa,
                signature_key: verifed
            }
            let description = `${DESCRIPTION_PREFIX} ${issuer.name}`;
            let smTokenSignatureKey = `${issuer.name}/${clientId}`
            let smResult = await this.credential.put(clientId, sm, description);
            log.debug({ sm: smResult })

            log.info("Creating auth on entity", { issuer: issuer.name });
            let createIssuer: AuthPersistRequest = {
                clientId,
                clientSecretHash,
                pubRsaSignKey: publicKeyRsa,
                smTokenSignatureKey,
                scopes: issuer.scopes,
                description,
                validateSignatureActived: true,
                extraPayload: {}
            }
            let authResult = await this.authService.save(createIssuer);
            log.debug({ auth: authResult })

            return {
                client_id: clientId,
                client_secret: clientSecret,
                private_key_rsa: privateKeyRsa,
                public_key_rsa: publicKeyRsa,
                signature,
                is_verifed: verifed
            }

        } catch (error) {
            log.error(error);
            return {
                message: "Fail to create issuer",
                error
            }
        }
    }
}
