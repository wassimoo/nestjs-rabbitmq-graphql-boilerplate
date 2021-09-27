import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '@nueverahr/logger';
import { ClientsFactory } from './services/clients-factory.service';
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    LoggerModule.forRoot({
      logDirPath: './logs',
    }),
    TypeOrmModule.forRoot(),
    UserModule,
  ],
  exports: [ConfigModule, LoggerModule],
  providers: [ClientsFactory],
})
export class MainModule {}
