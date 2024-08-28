FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm

RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production

RUN pnpm run build

ENV HOST 0.0.0.0
EXPOSE 3000
ENTRYPOINT ["pnpm", "start"]
