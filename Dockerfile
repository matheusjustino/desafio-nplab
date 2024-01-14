# FROM --platform=linux/amd64 node:21.1.0-alpine as builder
FROM node:21.1.0-alpine as builder

# Create app directory
WORKDIR /app

COPY package*.json ./
# COPY yarn.lock ./
COPY .docker ./.docker/

# Install app dependencies
RUN yarn install

COPY . .

RUN yarn build


# FROM --platform=linux/amd64 node:21.1.0-alpine
FROM node:21.1.0-alpine

WORKDIR /app

ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium \
	bash

COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.docker ./.docker

RUN yarn cache clean && yarn install --prod && chmod +x .docker/entrypoint.sh

COPY --from=builder /app/dist ./dist

EXPOSE 8081

# CMD [ "/bin/sh", ".docker/entrypoint.sh" ]
ENTRYPOINT [ ".docker/entrypoint.sh" ]
