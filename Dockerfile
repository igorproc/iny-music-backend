ARG APP_PORT
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN chmod +x ./start-prod.sh

EXPOSE ${APP_PORT}

CMD ["sh", "./start-prod.sh"]
