FROM node:alpine

RUN npm install -g @nestjs/cli

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000