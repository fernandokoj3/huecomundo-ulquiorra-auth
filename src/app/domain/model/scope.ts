import { VerbMethod } from "../verb";

export class Permission {
    public readonly methods: String;
    public readonly resourcePath: string;
}

export class ApiName {

    private readonly _permissions: object;
    private readonly _name: string;

    constructor(name: string, allow?: Permission[], deny?: Permission[] ) {
        this._name = name;
        this._permissions[name] = {
            allow: $allow(allow),
            deny: $deny(deny)
        }
    }
    
    get permissions(){
        return this._permissions[this._name] as { allow: Permission[], deny: Permission[] }
    }

}

const $allow = (allow?: Permission[] ) => {
    return allow ?? [
        {
            allow: {
                methods: Object.values(VerbMethod).join(" ") as String,
                resourcePath: "/**"
            }
        }
    ]
}

const $deny = (deny: Permission[] ) => {
    return deny ?? [
        {
            deny: {
                methods: Object.values(VerbMethod).join(" ") as String,
                resourcePath: "/**"
            }
        }
    ]
}