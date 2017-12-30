FROM node:latest

FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY package.json package-lock.json ./
COPY chumm-uffa-interface-0.0.1.tgz .

RUN npm i ./chumm-uffa-interface-0.0.1.tgz -save
RUN npm i

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "docker" ]
