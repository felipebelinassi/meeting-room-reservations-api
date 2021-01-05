FROM node:alpine

WORKDIR /usr/meeting-reservation-api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]