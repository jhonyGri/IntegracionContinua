# client/Dockerfile
FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install --save-dev jest
RUN mkdir -p /usr/src/app/coverage
COPY . .
RUN npm install --save-dev npm-run-all
EXPOSE 4000
CMD ["npm", "run", "start-and-test"]