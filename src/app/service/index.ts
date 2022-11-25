import { AuthenticateRequest } from "@/dto/request.dto";

export interface IAuthenticate {
    getToken(auth: AuthenticateRequest): Promise<any>
}