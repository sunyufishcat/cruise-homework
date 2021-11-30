FROM node:12
WORKDIR /mock-server

COPY db.json ./db.json
RUN npm install -g json-server
RUN npm run server
EXPOSE 3001
