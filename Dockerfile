FROM node:18-alpine as builder

EXPOSE 3000

WORKDIR /app
COPY / /app

RUN yarn install
RUN yarn build

CMD ["yarn", "start", "--hostname", "0.0.0.0"]
