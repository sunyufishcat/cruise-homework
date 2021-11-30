FROM node:12
WORKDIR /cruise-homework

COPY package* yarn.lock ./
RUN npm install
COPY public ./public
COPY src ./src
RUN yarn build
EXPOSE 3000
CMD ["npm", "start"]
