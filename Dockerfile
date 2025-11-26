# Etapa de construcción
FROM node:lts-alpine AS build

# Instalar dependencias necesarias
RUN apk add --no-cache \
    curl \
    g++ \
    git \
    sudo \
    unzip \
    zip \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apk add --no-cache yarn

WORKDIR /app

# Verificar la conectividad con el registro de Yarn
RUN curl -v https://registry.yarnpkg.com

# Copiar package.json y yarn.lock
COPY ./package.json ./yarn.lock /app/

# Establecer un registro alternativo para Yarn
RUN yarn config set registry https://registry.npm.taobao.org

# Aumentar el tiempo de espera de red
RUN yarn config set network-timeout 600000

# Instalar dependencias
RUN yarn install --frozen-lockfile

# Copiar el resto del código y construir la app
COPY ./ /app
RUN yarn build

# Etapa de producción
FROM node:lts-alpine

# Instalar dependencias necesarias
RUN apk add --no-cache curl \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apk add --no-cache yarn

WORKDIR /app

# Copiar los archivos de la etapa de build
COPY --from=build /app /app

# Configurar los permisos si es necesario
RUN chmod 755 -R /app/node_modules

# Comando para iniciar la aplicación
CMD ["yarn", "start:docker"]
