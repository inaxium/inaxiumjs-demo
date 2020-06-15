import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service'
import {ExpressAdapter} from "@nestjs/platform-express";
import * as http from 'http';
import * as express from 'express';

async function bootstrap() {

  const config = new EnvService().read();
  const server = express();

  const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
  );
  await app.init();

  http.createServer(server).listen(config.APP_PORT);

}
bootstrap().then();
