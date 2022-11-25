import { instance } from "@/utils/awsUtils"

const _Auth = instance.model('ulquiorra.auth', {
    clientId: {
        alias: "client_id",
        type: String,
        hashKey: true,
    },
    description: {
        type: String,
    },
    extraPayload: {
        type: Object,
        alias: "extra_payload"
    },
    pubRsaSignKey: {
       type: String,
       alias: "pub_rsa_sign_key"
    },
    scopes: {
        type: [String],
    },
    smTokenSignatureKey: {
        type: String,
        alias: "sm_token_signature_key"
    },
    validateSignature: {
        type: Boolean,
        alias: "validate_signature"
    }
}, { create: true })

const _Scope = instance.model('ulquiorra.scope', {
    scope: {
        type: String,
        hashKey: true,
    },
    parentScope: {
        type: String,
        alias: "parent_scope"
    },
    permissions: {
        type: Object
    }
}, { create: true })

const _Credential = instance.model('ulquiorra.credential', {
    name: {
        type: String,
        hashKey: true,
    },
    clientSecret: {
        type: String,
        alias: "client_secret"
    },
    tokenSignatureKey: {
        type: String,
        alias: "token_signature_key"
    },
}, { create: true })

export class Auth {

    constructor(
        public clientId: string,
        public clientSecret: any,
        public description: any,
        public extraPayload: any,
        public pubRsaSignKey: any,
        public scopes: any,
        public smTokenSignatureKey: any,
        public validateSignature: any,
    ) {}

    static one(id: string) {
        return new Promise((resolve, reject) => {
            _Auth.query({ client_id: { eq: id } }).exec((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data[0]?.toJSON())
                }
            })
        })
    }
    static save(entity: Auth) {
        return new Promise(async (resolve, reject) => {
            await new _Auth({ ...entity })
                .save()
                .then(item => resolve(item))
                .catch(e => reject(e))
        })
        
    }
    static update(entity: Auth) {
        return new Promise((resolve, reject) => {
            let id = entity.clientId;
            delete entity.clientId;
            _Auth.update({ id }, { ...entity }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data[0])
                }
            })
        })
    }

    static delete(id: string | number) {
        throw new Error("Method not implemented.")
    }

}

export class Scope {

    constructor(
        public scope: String,
        public parentScope: String,
        public permissions: Object
    ) {}

    static one(name: string) {
        return new Promise((resolve, reject) => {
            _Scope.query({ scope: { eq: name } }).exec((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data[0])
                }
            })
        })
    }

    static save(entity: Scope) {
        return new Promise(async (resolve, reject) => {
            await new _Scope({ ...entity })
                .save()
                .then(item => resolve(item))
                .catch(e => reject(e))
        })
        
    }
    
    static update(entity: Scope) {
        return new Promise((resolve, reject) => {
            let scope = entity.scope;
            delete entity.scope;
            _Auth.update({ scope }, { ...entity }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data[0])
                }
            })
        })
    }
    
    static delete(id: string | number) {
        throw new Error("Method not implemented.")
    }
}

export class Credential {

     constructor(
        public name: String,
        public clientSecret: String,
        public tokenSignatureKey: String,
    ) {}

    static one(name: String) {
        return new Promise((resolve, reject) => {
            _Credential.query({ name: { eq: name } }).exec((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data[0])
                }
            })
        })
    }

    static save(entity: Credential) {
        return new Promise(async (resolve, reject) => {
            await new _Credential({ ...entity })
                .save()
                .then(item => resolve(item))
                .catch(e => reject(e))
        })
        
    }

    static update(entity: Credential) {
        return new Promise((resolve, reject) => {
            let clientId = entity.name;
            delete entity.name;
            _Auth.update({ clientId }, { ...entity }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data[0])
                }
            })
        })
    }
}
