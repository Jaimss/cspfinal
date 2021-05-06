FROM node:14.16.1

WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm install
RUN npm run-script build
ENTRYPOINT ["npm", "start"]