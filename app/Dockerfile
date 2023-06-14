FROM node:15

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY ./*.js .

RUN npm install

COPY ./scripts/wait-for-it.sh ./scripts/wait-for-it.sh
RUN chmod +x ./scripts/wait-for-it.sh

EXPOSE 3000