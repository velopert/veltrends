FROM node:16-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn
EXPOSE 8080
CMD [ "node", "index.js" ]