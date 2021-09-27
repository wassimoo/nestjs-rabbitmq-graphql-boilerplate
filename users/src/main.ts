import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { MainModule } from './main.module';
import { ClientsFactory } from './services/clients-factory.service';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const clientsFactory = app.get(ClientsFactory);
  app.connectMicroservice<MicroserviceOptions>(
    clientsFactory.config.userService,
  );
  app
    .startAllMicroservices()
    .then(() => Logger.log('User microservice started!'));
}
bootstrap();
