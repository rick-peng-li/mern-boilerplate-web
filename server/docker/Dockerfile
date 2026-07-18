FROM node:20-alpine

ENV USER=node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY . ./
COPY package*.json ./

RUN chown -R node:node /home/node/app

RUN mkdir /home/node/.npm-global
RUN chown -R node:node /home/node/.npm-global

ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

USER node
RUN npm install -g pm2

ENV NODE_ENV=production
RUN npm install
RUN npm run build

CMD [ "pm2-runtime", "--no-auto-exit", "npm", "--", "run", "docker:start:prod" ]