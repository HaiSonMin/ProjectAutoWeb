FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start"]
