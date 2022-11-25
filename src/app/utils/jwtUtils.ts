import jwt, { JwtPayload } from "jsonwebtoken";


export const decode = (token: string) => {
    return jwt.decode(token, { json: true }) as JwtPayload
}

export const validate = (token: string, signature: string) => {
    return jwt.verify(token, signature, { ignoreExpiration: false }) as JwtPayload;
}