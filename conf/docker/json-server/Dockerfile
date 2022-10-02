FROM node:12

# Install Tools
RUN \
    npm install -g json-server

# Import database json file
ADD ./db.json /app/db.json

# Setting Container
EXPOSE 3000/tcp
WORKDIR /app
