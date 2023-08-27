FROM node:18

# sets working directory where all comamands run
WORKDIR /app

COPY package*.json ./

# how shell commands are ran
RUN npm install

COPY . .

ENV PORT=5000

EXPOSE 5000

CMD ["node", "server.js"]