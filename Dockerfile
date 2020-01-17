# docker build -t gcr.io/prysmaticlabs/website:latest .
FROM node:11-alpine as builder

# RUN apk update && apk upgrade && \
#     apk add --no-cache git python make g++

RUN apk add --update \
    bash \
    lcms2-dev \
    libpng-dev \
    gcc \
    g++ \
    make \
    autoconf \
    automake \
  && rm -rf /var/cache/apk/*

WORKDIR /app/website
COPY ./docs /app/docs
COPY ./website /app/website

COPY ./website/package.json ./website/package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i -g npm@6.4
RUN npm install

## Build the project
RUN npm run build

# Copy only the dist dir.
FROM nginx

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/website/build/prysm-docs /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
