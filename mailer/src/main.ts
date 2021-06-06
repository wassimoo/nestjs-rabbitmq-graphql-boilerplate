import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { MailerModule } from './mailer.module';
import { ConfigFactory } from './services/config-factory.service';

async function bootstrap() {
  const app = await NestFactory.create(MailerModule);
  const configFactory = app.get(ConfigFactory);
  app.connectMicroservice<MicroserviceOptions>(
    configFactory.config.mailerService,
  );
  app.startAllMicroservices(() =>
    Logger.log('Mailer service started successfully'),
  );
}
bootstrap();
