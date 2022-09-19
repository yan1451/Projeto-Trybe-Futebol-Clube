FROM node:16-alpine

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run deploy

CMD [ "npm", "start" ]

EXPOSE 3000
