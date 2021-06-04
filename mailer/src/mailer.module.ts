import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerController } from './mailer.controller';
import { ConfigFactory } from './services/config-factory.service';
import { MailerService } from './services/mailer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [MailerController],
  providers: [ConfigFactory, MailerService],
})
export class MailerModule {}
