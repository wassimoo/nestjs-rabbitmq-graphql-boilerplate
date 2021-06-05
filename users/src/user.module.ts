import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsFactory } from './services/clients-factory.service';
import { AppController } from './user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [ConfigService, ClientsFactory],
})
export class UserModule {}
