FROM node:10.16.2
COPY package.json /app
RUN npm install
COPY . /app
CMD node index.js
EXPOSE 8081
