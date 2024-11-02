FROM node:18.20.4-bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "--port", "3000", "--no-open"]

