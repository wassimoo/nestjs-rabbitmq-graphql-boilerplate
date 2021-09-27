import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller()
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern('register')
  register(@Body() data: UserDto) {
    return this.userService.register(data);
  }

  @MessagePattern('login')
  login(@Body() data: UserDto) {
    return this.userService.login(data);
  }
}
