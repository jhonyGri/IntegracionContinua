# api/Dockerfile
FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install --save-dev jest
RUN mkdir -p /usr/src/app/coverage
COPY . .
EXPOSE 3000
CMD ["npx", "npm-run-all", "test:coverage", "start"]
