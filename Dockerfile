FROM node:24.16.0

WORKDIR /usr/src/app

COPY . .

RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm@11.5.1

RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production

RUN pnpm run build

ENV NITRO_HOST=0.0.0.0 PORT=3000
EXPOSE 3000
ENTRYPOINT ["sh", "scripts/start-nitro.sh"]
