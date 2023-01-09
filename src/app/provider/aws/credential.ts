import { CredentialResponse, CredentialProvider, StatusSecretResponse } from "@/domain/model/auth";
import { Service } from "typedi";
import { log } from "@/utils/logUtils";
import { getSecret, setSecret } from "@/utils/aws/awsUtils"


@Service()
export class SMAwsCredential implements CredentialProvider {

    async put(name: string, value: any, description?: string): Promise<StatusSecretResponse> {
        try {
            let { requestId, statusCode } = await setSecret(name, value, description);
            let response = new StatusSecretResponse(statusCode, requestId)
            return response;
        } catch (error) {
            log.error(error);
            throw error;
        }
    }

    async get(clientID: string): Promise<CredentialResponse> {
        try {
            let secret = await getSecret(clientID, CredentialResponse);
            return secret;
        } catch (error) {
            log.error(error);
            throw error;
        }
    }
}
