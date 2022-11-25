import { AuthorizeRequest } from "@/dto/request.dto";
import { CredentialResponse, IAuthorize, ICredential } from "@/domain/model/auth";
import { Inject, Service } from "typedi";
import { decode, validate } from "@/utils/jwtUtils";


@Service("authorizer.ulquiorra")
export class Auhorizer implements IAuthorize {

    constructor(@Inject() private credential: ICredential){ }

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
