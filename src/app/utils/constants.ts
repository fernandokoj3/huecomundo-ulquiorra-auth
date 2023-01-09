import dotenv from 'dotenv';
import { resolve } from 'path';
import Container from 'typedi';

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

export const REDIS_CONFIG = Object.freeze({
  URL: "",
  KEY_PREFIX: "asa.auth:",
  EX: {
    TOKEN: 3600,
    SCOPE: 300
  }
})

export const CLIENT_SECRET_LENGTH = 32;
export const DESCRIPTION_PREFIX = "Credentials setup for issuer: ";
export const CLOUD_PROVIDER = (process.env.CLOUD_PROVIDER || 'aws').toLowerCase();
export const JWT_OPTIONS = Object.freeze({
  ALGORITHM: 'HS256',
  EXPIRATION: 120,
  ISS: "yourself",
  VERSION: "1.0"
})
