FROM node:21.1.0-alpine as builder

# Create app directory
WORKDIR /app

COPY package*.json ./
COPY .docker ./.docker/

# Install app dependencies
RUN yarn install

COPY . .

RUN yarn build


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
COPY --from=builder /app/.docker ./.docker

RUN yarn cache clean && yarn install --prod && chmod +x .docker/entrypoint.sh

COPY --from=builder /app/dist ./dist

EXPOSE 8081

ENTRYPOINT [ ".docker/entrypoint.sh" ]
