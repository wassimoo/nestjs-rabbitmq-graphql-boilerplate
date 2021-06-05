import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class LoginResolver {
  @Query(() => String)
  login() {
    return 'Hello from login!';
  }
}
