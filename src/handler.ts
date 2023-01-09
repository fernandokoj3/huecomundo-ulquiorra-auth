import 'reflect-metadata';
import '@/config/factory';
import { create } from '@/controller/authorizer';

(async function () {

  let request = {
    name: "Test",
    issuer_id: "1",
    description: "Issuer test",
    scopes: ["scope/funct1", "scope/funct2"],
    validate_signature_activated: true
  }

  let result = await create({
    body: JSON.stringify(request),
    version: '',
    routeKey: '',
    rawPath: '',
    rawQueryString: '',
    headers: undefined,
    requestContext: undefined,
    isBase64Encoded: false
  }, null)

  console.log(result);


  // let passphrase = "teste1234";
  // let client = {
  //   clientId: 1,
  //   secret: "teste",
  //   timestamp: Math.floor(Date.now() / 60)
  // }
  // let message = JSON.stringify(client)

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

  // let { privateRsa, publicRsa } = generateRsaKeys(passphrase)
  // let $sign = sign(passphrase, message, privateRsa)
  // let v = verify(publicRsa, $sign, message)

  // console.log("Private RSA \n")

  // console.log(privateRsa)

  // console.log("Public RSA\n")

  // console.log(publicRsa)

  // console.log("Assinatura\n")

  // console.log($sign)

  // console.log("É valido\n")

  // console.log(v)

  // console.log(generateClientSecret(32))

})()
