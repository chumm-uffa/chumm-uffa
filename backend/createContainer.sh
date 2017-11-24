#!/bin/bash

export DOCKER_ID_USER="pepeblack"

# create new image
docker build -t $DOCKER_ID_USER/chumm-uffa-backend .

# login on docker cloud
docker login

# tag image
docker tag chumm-uffa-backend $DOCKER_ID_USER/chumm-uffa-backend:latest

# upload image
docker push $DOCKER_ID_USER/chumm-uffa-backend:latest

