FROM node:latest

RUN npm install -g pnpm

RUN mkdir -p /user/app

WORKDIR /user/app

COPY package.json /user/app

RUN pnpm install

COPY . /user/app

EXPOSE 3000

CMD [ "Api" ]

# RUN pnpm api