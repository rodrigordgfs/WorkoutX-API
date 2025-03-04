FROM node:20

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN npm install --omit=dev

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]