ARG NODE_VERSION
ARG BUILD_MODE

FROM node:${NODE_VERSION}

WORKDIR /nestjs

COPY configs/.env.local .env

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npx prisma db push

CMD ["npm", "run", "start:dev"]
