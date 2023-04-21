FROM node:10.8.0 as demo-build

WORKDIR /ClientApp

COPY package*.json /ClientApp/

RUN npm install

COPY ./ /app/

ARG configuration=production

RUN npm run build — –output-path=./demo-dist/out –configuration $configuration

FROM nginx:1.15

COPY –from=build-stage /ClientApp/demo-dist/out/ /usr/share/nginx-demo/html

COPY ./grocer-nginx-custom.conf /etc/nginx/conf.d/default.conf
