import { Module, Global, DynamicModule } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import {User} from "../users/user.entity";
import {Lang} from "../lang/lang.entity";
import {Country} from "../country/country.entity";


function DatabaseOrmModule (): DynamicModule {
    const config = new EnvService().read();

    return TypeOrmModule.forRoot({
        type: config.DB_TYPE,
        database: config.DB_NAME,
        entities: [User, Lang, Country],
        synchronize: false,
        logging: true
    })
}

@Global()
@Module({
    imports: [
        EnvModule,
        DatabaseOrmModule()
    ]
})
export class DatabaseModule { }