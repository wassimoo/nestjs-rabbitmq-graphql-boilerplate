import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiController } from './api.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientsFactory } from './services/clients-factory.service';
import { GraphQLModule } from '@nestjs/graphql';
import { LoginResolver } from './resolvers/login.resolver';
import { RegisterResolver } from './resolvers/register.resolver';

export const microserviceClients = [
  {
    provide: 'MAILER_SERVICE',
    useFactory: (configFactory: ClientsFactory) => {
      return ClientProxyFactory.create(configFactory.config.mailerService);
    },
    inject: [ClientsFactory],
  },
  {
    provide: 'USER_SERVICE',
    useFactory: (configFactory: ClientsFactory) => {
      return ClientProxyFactory.create(configFactory.config.userService);
    },
    inject: [ClientsFactory],
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  controllers: [ApiController],
  providers: [
    ClientsFactory,
    ConfigService,

    // Resolvers
    LoginResolver,
    RegisterResolver,

    ...microserviceClients,
  ],
})
export class ApiModule {}
