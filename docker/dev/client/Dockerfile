FROM node:20

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&\
    apt-get install -y nodejs &&\
    npm install -g npm@latest

WORKDIR /app/

CMD npm install && npm run dev