import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerLevel, LoggerModule, LoggerService } from '@nueverahr/logger';
import { ClientsFactory } from './services/clients-factory.service';
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(),
    LoggerModule.forRoot({
      logDirPath: './logs',
    }),
    UserModule,
  ],
  exports: [LoggerModule],
  providers: [ConfigService, ClientsFactory],
})
export class MainModule {}
