# client/Dockerfile
FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install --save-dev jest
RUN mkdir -p /usr/src/app/coverage && chmod -R 777 /usr/src/app/coverage
COPY . .
EXPOSE 4000
CMD ["npm", "npm-run-all", "test:coverage", "start"]
