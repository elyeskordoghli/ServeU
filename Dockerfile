FROM node:18-alpine As development

WORKDIR /usr/src/app


COPY package*.json ./

RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .
EXPOSE 3001
CMD [ "yarn", "start:dev" ]
