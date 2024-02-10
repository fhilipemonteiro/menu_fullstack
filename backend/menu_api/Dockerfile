FROM node:alpine

RUN npm install -g @nestjs/cli

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000