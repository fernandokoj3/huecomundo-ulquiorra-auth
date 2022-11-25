import { ICredential } from "@/domain/model/auth";
import { AuthenticateRequest } from "@/dto/request.dto";
import { Auth } from "@/entity/dynamodb";
import { IRepository } from "@/repository";
import { Inject, Service } from "typedi";
import { IAuthenticate } from "..";

@Service("authenticate")
export class AuthenticateAws implements IAuthenticate {

    constructor(
        @Inject("") private credential: ICredential,
        @Inject("") private repository: IRepository<Auth>
    ){ }


    async getToken(auth: AuthenticateRequest): Promise<any> {
        let { extraPayload, pubRsaSignKey, smTokenSignatureKey } = await this.repository.one(auth.clientId)
        let { clientTokenSignKey } = await this.credential.get("")
        


        throw new Error("Method not implemented.");
    }

}