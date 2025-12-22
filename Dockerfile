# Etapa de construcción
FROM node:lts-alpine AS build

# Habilitar ARG para GITHUB_TOKEN
ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=$GITHUB_TOKEN

# Instalar dependencias de construcción y herramientas de seguridad
RUN apk add --no-cache \
    g++ \
    make \
    python3 \
    git \
    sudo \
    unzip \
    zip \
    dumb-init

WORKDIR /app

# Copiar archivos necesarios
COPY ./package.json ./yarn.lock /app/

# Crear .npmrc dentro del contenedor con el token y el scope
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> /root/.npmrc && \
    echo "@youniversityrepo:registry=https://npm.pkg.github.com" >> /root/.npmrc

# Instalar dependencias
RUN yarn install --frozen-lockfile

# Copiar el resto del código de la aplicación
COPY ./ /app

# Construir la aplicación
RUN yarn build

# Limpiar archivos de desarrollo y secretos
RUN rm -rf /root/.npmrc \
    /root/.cache \
    /tmp/* \
    /app/.git \
    /app/src \
    /app/tests \
    /app/.env* || true

# Etapa de producción
FROM node:lts-alpine

# Instalar dumb-init para manejo correcto de señales
RUN apk add --no-cache dumb-init && \
    apk upgrade --no-cache

WORKDIR /app

# Crear usuario no-root para ejecutar la aplicación
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copiar la aplicación construida desde la etapa anterior
# Copiar la aplicación construida desde la etapa anterior
COPY --from=build --chown=nextjs:nodejs /app/package.json /app/yarn.lock ./
COPY --from=build --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/next.config.ts ./

# Copiar public solo si existe
RUN mkdir -p /app/public
# Configurar permisos seguros
RUN chmod -R 755 /app && \
    chown -R nextjs:nodejs /app

# Cambiar a usuario no-root
USER nextjs

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production \
    PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Usar dumb-init para manejo correcto de señales
ENTRYPOINT ["dumb-init", "--"]

# Comando para iniciar la aplicación
CMD ["yarn", "start"]