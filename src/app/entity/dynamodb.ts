import { instance } from "@/utils/aws/awsUtils"

const _Auth = instance.model('ulquiorra.auth', {
    clientId: {
        alias: "client_id",
        type: String,
        hashKey: true,
    },
    clientSecretHash: {
        type: String,
        alias: "client_secret_hash",
        required: true
    },
    description: {
        type: String,
    },
    extraPayload: {
        type: Object,
        default: {},
        alias: "extra_payload"
    },
    pubRsaSignKey: {
        type: String,
        alias: "pub_rsa_sign_key"
    },
    scopes: {
        type: Array,
        schema: [String],
    },
    smTokenSignatureKey: {
        type: String,
        alias: "sm_token_signature_key"
    },
    validateSignatureActived: {
        type: Boolean,
        alias: "validate_signature_actived"
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

export class Auth {

    constructor(
        public clientId: string,
        public clientSecret: string,
        public description: string,
        public extraPayload: object,
        public pubRsaSignKey: string,
        public scopes: Array<String>,
        public smTokenSignatureKey: string,
        public validateSignatureActived: boolean,
    ) { }

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
        public scope: string,
        public parentScope: string,
        public permissions: Object
    ) { }

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
