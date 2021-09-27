import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoggerService } from '@nueverahr/logger';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller()
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(
    private userService: UserService,
    private logger: LoggerService,
  ) {}

  @MessagePattern('register')
  register(@Body() data: UserDto) {
    this.logger.info('Registering user...');
    return this.userService.register(data);
  }
}
