# Verwendung vom schlanken Node.js 22 Image (Alpine weil weniger Speicherverbrauch)
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY server.js .

EXPOSE 3000

CMD ["node", "server.js"]

