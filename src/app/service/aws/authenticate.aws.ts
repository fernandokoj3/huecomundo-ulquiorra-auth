import { TokenSignatureRequest } from "@/dto/request.dto";
import { Auth } from "@/entity/dynamodb";
import { Repository } from "@/repository";
import { Inject, Service } from "typedi";
import { IAuthenticate } from "../../domain/operation";

@Service("authenticate.aws.service")
export class AuthenticateAws implements IAuthenticate {

    constructor(
        @Inject("") private repository: Repository<Auth>
    ) { }


    async getToken(auth: TokenSignatureRequest): Promise<any> {
        let { extraPayload, pubRsaSignKey, smTokenSignatureKey } = await this.repository.one(auth.clientId)



        throw new Error("Method not implemented.");
    }

}
