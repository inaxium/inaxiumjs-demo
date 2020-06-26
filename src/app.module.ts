import {DatabaseModule} from "./db/database.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import {LangModule} from "./lang/lang.module";
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { CronService } from './cron/cron.service';
import {CountryModule} from "./country/country.module";

@Module({
  imports: [ConfigModule.forRoot(),ScheduleModule.forRoot(), DatabaseModule,ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client'),
  }), UsersModule, LangModule, CountryModule],
  providers: [CronService],
})
export class AppModule {}
