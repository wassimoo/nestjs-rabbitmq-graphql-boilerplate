import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

@Injectable()
export class ConfigFactory {
  private readonly _config = {
    mailerService: {},
  };

  constructor(private configService: ConfigService) {
    this._config.mailerService = {
      transport: Transport.RMQ,
      options: {
        urls: [configService.get('MQ_URL')],
        queue: configService.get('MAILER_QUEUE'),
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  get config() {
    return this._config;
  }
}
