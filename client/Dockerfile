FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install --save-dev jest npm-run-all
RUN mkdir -p /usr/src/app/coverage
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start-and-test"]