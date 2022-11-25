import dotenv from 'dotenv';
import { resolve } from 'path';

const environmment = process.env.ENVIRONMENT ?? 'local';

if (environmment) {
  const path = resolve(__dirname, `../../../environments/.env.${environmment}`);
  dotenv.config({ path });
} else {
  dotenv.config();
}

export const RSA_OPTIONS = Object.freeze({
  EXPORT: {
      MODULUS_LENGTH: 4096,
      PRIVATE: {
          CIPHER: "aes-256-cbc",
          FORMAT: "pem",
          TYPE: "pkcs8"
      },
      PUBLIC: {
          FORMAT: "pem", 
          TYPE: "spki"
      },
      SIGN: {
          ALGORITHM: "SHA256"
      }
  }
})
