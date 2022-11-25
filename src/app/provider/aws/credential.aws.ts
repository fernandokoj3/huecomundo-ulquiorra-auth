import { CredentialResponse, ICredential } from "@/domain/model/auth";
import { Credential } from "@/entity/dynamodb";
import { plainToInstance } from "class-transformer";
import { Service } from "typedi";
import { log } from "@/utils/logUtils";

@Service("credentials.aws.dynamodb")
export class DynamoCredential implements ICredential {

    async get(clientID: string): Promise<CredentialResponse> {
        try {
            let credential = await Credential.one(clientID);
            return plainToInstance(CredentialResponse, credential);
        } catch (error) {
            log.error(error)
            throw Error;
        }
    }
}

@Service("credentials.aws.secretmanager")
export class AwsSMCredential implements ICredential {

    async get(clientID: string): Promise<CredentialResponse> {
        throw new Error("Method not implemented.");
    }

}

@Service("credentials.aws.cognito")
export class AwsCognitoCredential implements ICredential {

    async get(clientID: string): Promise<CredentialResponse> {
        throw new Error("Method not implemented.");
    }

}
