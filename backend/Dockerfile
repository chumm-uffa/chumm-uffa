FROM node:8

# Create app directory
WORKDIR /usr/src/app/interface
COPY chumm-uffa-interface-0.0.1.tgz .
RUN tar -xzf chumm-uffa-interface-0.0.1.tgz && mv package/* . && rm package -R

# Install app dependencies
WORKDIR /usr/src/app/backend
COPY . .
RUN npm i
RUN npm run build

EXPOSE 8080
CMD [ "npm", "run", "docker" ]
