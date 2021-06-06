import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ClientsFactory } from './services/clients-factory.service';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const clientsFactory = app.get(ClientsFactory);
  app.connectMicroservice<MicroserviceOptions>(
    clientsFactory.config.userService,
  );
  app.startAllMicroservices(() =>
    Logger.log('User service started successfully'),
  );
}
bootstrap();
