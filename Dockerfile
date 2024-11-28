FROM node:lts-alpine AS build

RUN apk add --no-cache \
    curl \
    g++ \
    git \
    sudo \
    unzip \
    zip \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apk add --no-cache yarn

WORKDIR /app
COPY ./package.json ./yarn.lock /app/

RUN yarn install --frozen-lockfile

COPY ./ /app
RUN yarn build

FROM node:lts-alpine

RUN apk add --no-cache curl \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apk add --no-cache yarn

WORKDIR /app

COPY --from=build /app /app

RUN chmod 755 -R node_modules

CMD ["yarn", "start:docker"]
