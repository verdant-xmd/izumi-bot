FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  npm i pm2 -g && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ../package.json ../ecosystem.config.js ./

RUN yarn install

COPY ../ .

CMD ["pm2-runtime", "ecosystem.config.js"]
