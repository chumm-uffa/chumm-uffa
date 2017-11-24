#!/bin/bash

export DOCKER_ID_USER="pepeblack"

# frontend
pushd frontend
# create new image
docker build -t $DOCKER_ID_USER/chumm-uffa-frontend .
popd
# tag image
docker tag chumm-uffa-frontend $DOCKER_ID_USER/chumm-uffa-frontend:latest

# backend
pushd backend
# create new image
docker build -t $DOCKER_ID_USER/chumm-uffa-backend .
popd
# tag image
docker tag chumm-uffa-backend $DOCKER_ID_USER/chumm-uffa-backend:latest

# login on docker cloud
docker login
# upload frontend image
docker push $DOCKER_ID_USER/chumm-uffa-frontend:latest
# upload backend image
docker push $DOCKER_ID_USER/chumm-uffa-backend:latest
