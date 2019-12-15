FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run webpack

EXPOSE 9000

CMD ["node", "server.js"]
