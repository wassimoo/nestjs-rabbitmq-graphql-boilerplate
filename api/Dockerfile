FROM node:14.8.0-alpine

RUN mkdir -p /var/www/api

WORKDIR /var/www/api
COPY package*.json ./

RUN npm install

COPY . ./


CMD npm run build && npm run start:prod
 