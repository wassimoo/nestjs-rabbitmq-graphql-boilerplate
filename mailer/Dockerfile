FROM node:14.8.0-alpine

RUN mkdir -p /var/www/mailer

WORKDIR /var/www/mailer
COPY package*.json ./

RUN npm install

COPY . ./


CMD npm run build
 