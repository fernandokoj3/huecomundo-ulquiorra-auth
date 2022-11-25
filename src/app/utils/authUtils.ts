import crypto from "crypto";
import jwt from "jsonwebtoken";
import { RSA_OPTIONS } from "@/utils/constants"

export const generateRsaKeys = ( password: string ) => {

    let { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: RSA_OPTIONS.EXPORT.MODULUS_LENGTH,
    })

    let exportOptions = {
        cipher: RSA_OPTIONS.EXPORT.PRIVATE.CIPHER,
        format: RSA_OPTIONS.EXPORT.PRIVATE.FORMAT,
        type: RSA_OPTIONS.EXPORT.PRIVATE.TYPE,
        passphrase: password
    } as crypto.KeyExportOptions<"pem">;

    let $private = privateKey.export(exportOptions).toString()
    let $public = publicKey.export({ 
        format: RSA_OPTIONS.EXPORT.PUBLIC.FORMAT as any , 
        type: RSA_OPTIONS.EXPORT.PUBLIC.TYPE as any 
    }).toString()

    return { privateRsa: $private, publicRsa: $public }
}
  
export const sign = ( phrase: string, message: string, prv_key: string) => {
    const data = Buffer.from( message );
    const sign = crypto.sign(RSA_OPTIONS.EXPORT.SIGN.ALGORITHM, data , { key: prv_key, passphrase: phrase });
    const signature = sign.toString("base64");
    return { signature }
}
  
export const verify = ( publicKey: string, signature: string, data: string ) => {
    let bdata = Buffer.from( data );
    let bsignature = Buffer.from(signature, "base64")
    return crypto.verify(RSA_OPTIONS.EXPORT.SIGN.ALGORITHM, bdata, publicKey, bsignature);
}
