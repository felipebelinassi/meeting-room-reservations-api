FROM node:alpine

WORKDIR /usr/meeting-reservation-api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]