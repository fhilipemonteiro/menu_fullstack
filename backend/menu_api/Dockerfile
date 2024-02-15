FROM node:alpine

RUN apk add --no-cache yarn

RUN yarn global add @nestjs/cli

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000