#!/bin/bash

echo What should the version be?
read VERSION

docker build -t jwyce/koianime:$VERSION .
docker push jwyce/koianime:$VERSION

ssh root@167.172.153.197 "docker pull jwyce/koianime:$VERSION && docker tag jwyce/koianime:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"