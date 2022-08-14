FROM python:slim

RUN \
    apt-get update -y && \
    apt-get install -y \
        sshpass \
        curl \
        git

ADD .dependencies /
RUN \
    pip install -r .dependencies && \
    rm .dependencies

WORKDIR /app
