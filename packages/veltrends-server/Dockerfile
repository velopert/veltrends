FROM node:16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
# RUN rm -rf .env
RUN yarn
RUN yarn build
EXPOSE 8080
CMD [ "yarn", "start:pm2" ]