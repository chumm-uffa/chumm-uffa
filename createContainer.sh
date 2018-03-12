#!/bin/bash

export DOCKER_ID_USER="pepeblack"

# interface
pushd interface
# compile interface
npm i
npm run build
npm pack
popd

# backend
pushd backend
# create new image
mv ../interface/chumm-uffa-interface-0.0.1.tgz .
docker build -t $DOCKER_ID_USER/chumm-uffa-backend .
popd

# tag image
docker tag $DOCKER_ID_USER/chumm-uffa-backend $DOCKER_ID_USER/chumm-uffa-backend:latest

# frontend
pushd frontend
# compile frontend
npm i
npm run build
# create new image
docker build -t $DOCKER_ID_USER/chumm-uffa-frontend .
popd
# tag image
docker tag $DOCKER_ID_USER/chumm-uffa-frontend $DOCKER_ID_USER/chumm-uffa-frontend:latest

# login on docker cloud
docker login
# upload frontend image
docker push $DOCKER_ID_USER/chumm-uffa-frontend:latest
# upload backend image
docker push $DOCKER_ID_USER/chumm-uffa-backend:latest 
