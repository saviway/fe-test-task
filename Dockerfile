FROM mhart/alpine-node:14
LABEL maintainer="Ivan Savinov"

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 14.15.0

# Disable Scarf
ENV SCARF_ANALYTICS false

RUN mkdir -p /usr/app/

WORKDIR /usr/app

ADD . .

ENV NODE_ENV development
RUN npm i

ENV APP_PORT 3000
ENV NODE_ENV production
RUN npm run build:frontend

EXPOSE 3001
ENTRYPOINT ["npm", "run", "start"]