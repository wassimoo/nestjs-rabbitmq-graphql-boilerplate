import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MailerModule } from './mailer.module';
import { ConfigFactory } from './services/config-factory.service';

async function bootstrap() {
  const app = await NestFactory.create(MailerModule);
  const configFactory = app.get(ConfigFactory);
  app.connectMicroservice<MicroserviceOptions>(
    configFactory.config.mailerService,
  );
  app.startAllMicroservices(() =>
    console.log(
      'Mailer service is running with config',
      configFactory.config.mailerService,
    ),
  );
}
bootstrap();
