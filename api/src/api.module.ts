import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiController } from './api.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigFactory } from './services/config-factory.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [ApiController],
  providers: [
    ConfigFactory,
    ConfigService,
    {
      provide: 'MAILER_SERVICE',
      useFactory: (configFactory: ConfigFactory) => {
        return ClientProxyFactory.create(configFactory.config.mailerService);
      },
      inject: [ConfigFactory],
    },
  ],
})
export class ApiModule {}
