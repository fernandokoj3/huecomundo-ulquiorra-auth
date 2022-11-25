import { generateRsaKeys, sign, verify } from '@/utils/authUtils';
import { Auth, Scope } from "@/entity/dynamodb"


// const generateRsaKeys = async ( password: string ) => {

//   let { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 4096,
//   })

//   let exportOptions = {
//     cipher: "aes-256-cbc",
//     format: "pem",
//     type: "pkcs8",
//     passphrase: password
//   } as crypto.KeyExportOptions<"pem">;

//   let $private = privateKey.export(exportOptions).toString()
//   let $public = publicKey.export({ format: "pem", type: "spki" }).toString()

//   return { privateRsa: $private, publicRsa: $public }
// }

// const sign = async ( phrase: string, message: string, prv_key: string) => {
//   const data = Buffer.from( message );
//   const sign = crypto.sign("SHA256", data , { key: prv_key, passphrase: phrase });
//   const signature = sign.toString("base64");
//   return { signature }

// }

// const verify = async ( publicKey: string, signature: string, data: string ) => {
//   let verify = crypto.verify("SHA256", Buffer.from( data ), publicKey, Buffer.from(signature, "base64"));
//   return verify
// }



(async function (){
  let passphrase = "teste1234";
  let client = {
    clientId : 1,
    secret: "teste",
    timestamp: Math.floor(Date.now() / 60)
  }
  let message = JSON.stringify(client)

  // let definition = {
  //   scope: "test",
  //   parentScope: null,
  //   permissions: {
  //     "api-name": {
  //       "allow": [
  //         {
  //           "methods": "GET POST PUT DELETE PATCH",
  //           "resourcePath": "/**"
  //         }
  //       ]
  //     } 
  //   }
  // }

  let { privateRsa, publicRsa } =  generateRsaKeys(passphrase)
  let s = sign(passphrase, message, privateRsa)
  let v = verify(publicRsa, s.signature, message)

  console.log(privateRsa)

  console.log("\n")

  console.log(publicRsa)

  console.log("\n")

  console.log(s)

  console.log(v)

  await Scope.save({
    parentScope: null,
    permissions: {},
    scope: "testa"
  })

})()
