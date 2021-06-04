import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ApiController {
  constructor(
    @Inject('MAILER_SERVICE') private readonly mailerService: ClientProxy,
  ) {}

  @Get()
  getHello() {
    return this.mailerService.emit('mail_send', {});
  }
}
