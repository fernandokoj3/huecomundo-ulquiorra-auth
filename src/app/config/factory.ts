import { SMAwsCredential } from "@/provider/aws/credential";
import { AuthAwsService } from "@/service/aws/auth.service.aws";
import { CLOUD_PROVIDER } from "@/utils/constants";
import Container from "typedi";

if ('aws' === CLOUD_PROVIDER) {
    Container.set("AuthService", Container.get(AuthAwsService))
    Container.set("CredentialProvider", Container.get(SMAwsCredential))
}
