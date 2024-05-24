FROM node:18-alpine

WORKDIR /swara-server
COPY package.json .
RUN npm install
COPY . .
CMD npm start
