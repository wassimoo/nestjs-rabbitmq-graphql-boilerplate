import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ApiController {
  constructor(
    @Inject('MAILER_SERVICE') private readonly mailerService: ClientProxy,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  @Post()
  getHello(@Body() data: any) {
    return this.userService.send('register', data);
  }
}
