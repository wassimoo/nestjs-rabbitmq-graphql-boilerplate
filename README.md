# NestJS RabbitQ GraphQL Starter
A quick starter template for NestJS, RabbitMQ, and GraphQL lovers with support for container native development.

## Usage
Make sure to have Docker and nodeJS installed on your machine.
```bash
# Build the docker image
$ docker-compose build

# Start the container in detached mode
$ docker-compose up -d
```

## API Testing
GraphQL endpoint: ```localhost:3000/graphql```
```
{
 login
}
```
Should return
```
{
  "data": {
    "login": "Hello from login "
  }
}
```

REST endpoints: ```localhost:3000/```
<p> 
This endpoint will emit message to RMQ and have it consumed by mailer service. As a result you should see a mailer message: 
</p>

```
mailer      | Hello from mailer!
```