import * as dotenv from 'dotenv'
import * as fs from 'fs'

export interface EnvData {
    // application
    APP_ENV: string
    APP_DEBUG: boolean
    APP_PORT:string
    APP_HTTPS:string

    // database
    DB_TYPE: 'sqlite'
    DB_HOST?: string
    DB_NAME: string
    DB_PORT?: number
    DB_USER: string
    DB_PASSWORD: string
}

export class EnvService {
    private readonly vars: EnvData;

    constructor () {
        const environment = process.env.NODE_ENV || 'development';
        const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));

        data.APP_ENV = environment;
        data.APP_DEBUG = data.APP_DEBUG === 'true';
        data.DB_PORT = parseInt(data.DB_PORT);

        this.vars = data as EnvData
    }

    read (): EnvData {
        return this.vars
    }

    isDev (): boolean {
        return (this.vars.APP_ENV === 'development')
    }

    isProd (): boolean {
        return (this.vars.APP_ENV === 'production')
    }
}