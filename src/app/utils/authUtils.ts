import crypto, { randomInt, randomBytes } from "crypto";
import bcrypt from 'bcryptjs';
import { RSA_OPTIONS } from "@/utils/constants"
import { Charset } from "@/domain/model/charset";

export const generateRsaKeys = (password: string): { privateRsa: string, publicRsa: string } => {

    let { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: RSA_OPTIONS.EXPORT.MODULUS_LENGTH,
    })

    let privateExportOpt = {
        cipher: RSA_OPTIONS.EXPORT.PRIVATE.CIPHER,
        format: RSA_OPTIONS.EXPORT.PRIVATE.FORMAT,
        type: RSA_OPTIONS.EXPORT.PRIVATE.TYPE,
        passphrase: password,
    } as crypto.KeyExportOptions<"pem">;

    let publicExportOpt = {
        format: RSA_OPTIONS.EXPORT.PUBLIC.FORMAT as any,
        type: RSA_OPTIONS.EXPORT.PUBLIC.TYPE as any,
        passphrase: password,
        cipher: RSA_OPTIONS.EXPORT.PRIVATE.CIPHER
    } as crypto.KeyExportOptions<"pem">;

    let $private = privateKey.export(privateExportOpt).toString();
    let $public = publicKey.export(publicExportOpt).toString();

    return { privateRsa: $private, publicRsa: $public }
}

export const sign = (phrase: string, data: string, privateKey: string): string => {
    let sdata = Buffer.from(data);
    let sign = crypto.sign(RSA_OPTIONS.EXPORT.SIGN.ALGORITHM, sdata, { key: privateKey, passphrase: phrase });
    let signature = sign.toString("base64");
    return signature
}

export const verify = (publicKey: string, signature: string, data: string): boolean => {
    let bdata = Buffer.from(data);
    let bsignature = Buffer.from(signature, "base64")
    return crypto.verify(RSA_OPTIONS.EXPORT.SIGN.ALGORITHM, bdata, publicKey, bsignature);
}

export const hash = (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

export const compareHash = (plain: string, hash: string): boolean => {
    return bcrypt.compareSync(plain, hash)
}

export const generatePassword = (
    length: number = 128,
    charsets: Charset[] = [Charset.NUMBERS, Charset.LOWERCASE, Charset.UPPERCASE, Charset.SYMBOLS]
): string => {
    let join = charsets.join('');
    let charsetLength = join.length;
    let password: string = '';

    while (length--) {
        password += join[randomInt(charsetLength)];
    }

    return password;
}

export const generateClientSecret = (size = 32): string => {
    return randomBytes(size).toString('hex');
}
