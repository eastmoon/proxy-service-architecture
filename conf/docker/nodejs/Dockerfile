FROM node:lts-slim

RUN \
    apt-get update -y && \
    apt-get install -y \
        curl \
        git
ADD package.json /app/
RUN \
    cd /app && \
    npm install

WORKDIR /app
