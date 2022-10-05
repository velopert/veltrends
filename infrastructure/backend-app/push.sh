#!/bin/bash -x
#
# Builds a Docker image and pushes to an AWS ECR repository

# name of the file - push.sh

set -e

source_path="$1" # 1st argument from command line
repository_url="$2" # 2nd argument from command line
tag="${3:-latest}" # Checks if 3rd argument exists, if not, use "latest"
userid="$4"
dockerfile="$5"

# splits string using '.' and picks 4th item
region="$(echo "$repository_url" | cut -d. -f4)"

# splits string using '/' and picks 2nd item
image_name="$(echo "$repository_url" | cut -d/ -f2)"

# builds docker image
(cd "$source_path" && DOCKER_BUILDKIT=1 docker buildx build -f "$dockerfile" --platform=linux/amd64 -t "$image_name" .)

# login to ecr
aws --region "$region" ecr get-login-password | docker login --username AWS --password-stdin ${userid}.dkr.ecr.${region}.amazonaws.com

#$(aws ecr get-login-password --region "$region")

# tag image
docker tag "$image_name" "$repository_url":"$tag"

# push image
docker push "$repository_url":"$tag"