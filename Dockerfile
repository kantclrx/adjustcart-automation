FROM cypress/base:latest

WORKDIR /app

COPY ./cypress ./cypress
COPY ./package-lock.json .
COPY ./package.json .
COPY ./cypress.json .

RUN apt-get update
RUN npm install
RUN npm run cypress-run