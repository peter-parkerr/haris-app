FROM node:14.18.0-alpine as build

RUN apk update
RUN apk add git

WORKDIR /project

COPY calling-react-web ./

RUN npm install  && npm run build
