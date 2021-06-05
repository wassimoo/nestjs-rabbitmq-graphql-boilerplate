import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

@Injectable()
export class ClientsFactory {
  private readonly _config = {
    userService: {},
  };

  constructor(private configService: ConfigService) {
    this._config = {
      userService: this.getDefaultMQConfig('USER_QUEUE'),
    };
  }

  private getDefaultMQConfig(queueKey: string) {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('MQ_URL')],
        queue: this.configService.get(queueKey),
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
