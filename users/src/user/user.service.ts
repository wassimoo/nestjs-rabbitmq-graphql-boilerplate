import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '@nueverahr/logger';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private logger: LoggerService,
  ) {}

  async register(data: UserDto) {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      this.logger.warn(`username already exists : ${username}`);
      throw new BadRequestException('User already exists');
    }

    this.logger.info(`Attempting to register user with username ${username}`);
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);

    this.logger.info(`user ${username} registered with id ${user.id}`);
    return user;
  }

  async login(data: UserDto) {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user?.comparePassword(password)) {
      this.logger.warn(`Unknown user or non matching password ${username}`);
      throw new UnauthorizedException('Invalid username/password');
    }

    return { username, id: user.id, token: this.generateToken(user) };
  }

  private generateToken({ username, id }: User) {
    return this.jwtService.sign({ username, id });
  }
}
