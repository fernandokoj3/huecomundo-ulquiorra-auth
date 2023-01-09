import { createClient, RedisClientType} from "redis";
import { REDIS_CONFIG } from "@/utils/constants";
import { plainToInstance } from "class-transformer";
import { Class } from "utility-types";


export class Redis {

    private constructor (private client : RedisClientType ){ }

    public static create () {
        let client = createClient({
            url: REDIS_CONFIG.URL,
            disableOfflineQueue: true
        });
        return new Redis(client as unknown as any)
    }

    public async set(value: any, expires = REDIS_CONFIG.EX.SCOPE){
        try {
            await this.client.connect();
            let result = await this.client.set(`${REDIS_CONFIG.KEY_PREFIX}:${value}`, expires)
            return result
        } finally {
            if (this.client) {
                await this.client.quit()
            }
        }
    }

    public async get(value: any): Promise<String>;
    public async get<T = any>(value: any, $class: T): Promise<Class<T> | String>;

    public async get<T = any>(value: any, $class?: Class<T>): Promise<T | String> {
        try {
            await this.client.connect();
            let result = await this.client.get(`${REDIS_CONFIG.KEY_PREFIX}:${value}`)
            if ($class) {
                return plainToInstance($class, result)
            }
            return result;
        } finally {
            if (this.client) {
                await this.client.quit()
            }
        }
    }

}