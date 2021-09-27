import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { MainModule } from './main.module';
import { ClientsFactory } from './services/clients-factory.service';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const config = app.get(ConfigService);
  const port = config.get('APP_PORT') || 3000;
  const clientsFactory = app.get(ClientsFactory);
  app.connectMicroservice<MicroserviceOptions>(
    clientsFactory.config.userService,
  );
  app
    .startAllMicroservices()
    .then(() => Logger.log('User microservice started!'));
  app
    .listen(port)
    .then(() => Logger.log(`User HTTP service started on ${port}!`));
}
bootstrap();
