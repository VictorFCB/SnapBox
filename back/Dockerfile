FROM node:18-alpine

WORKDIR /back

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3010

CMD ["node", "index.js"]
