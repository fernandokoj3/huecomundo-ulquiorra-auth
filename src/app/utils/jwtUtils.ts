import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_OPTIONS } from "@/utils/constants";


export const decode = (token: string) => {
    return jwt.decode(token, { json: true }) as JwtPayload
}

export const validate = (token: string, signature: string) => {
    return jwt.verify(token, signature, { ignoreExpiration: false }) as JwtPayload;
}

export const encode = (signKey: string, payload: object, expiration = JWT_OPTIONS.EXPIRATION) => {
    let now = Date.now();
    let clains = {
        'token_use': 'access',
        'iss': JWT_OPTIONS.ISS,
        'iat': now,
        'version': JWT_OPTIONS.VERSION,
        'exp': new Date(now + (expiration * 60 * 1000)),
        ...payload
    }

    return jwt.sign(clains, signKey, { algorithm: JWT_OPTIONS.ALGORITHM })
}
