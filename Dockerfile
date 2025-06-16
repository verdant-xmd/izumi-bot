FROM node:lts-buster
RUN apt-get update && \
  apt-get install -y ffmpeg git imagemagick webp && \
  npm i -g pm2 && \
  rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/Akshay-Eypz/izumi-bot /root/bot
WORKDIR /root/bot
RUN npm install --legacy-peer-deps
CMD ["npm", "start"]
