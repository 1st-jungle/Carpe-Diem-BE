FROM node:18.14

RUN mkdir -p /app
WORKDIR /app
ADD . /app/

RUN rm -rf node_modules && rm -rf package-lock.json || true
RUN npm i
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 4000

CMD [ "npm", "run", "deploy:production" ]
