FROM node:14.16.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run-script build
ENTRYPOINT ["npm", "start"]