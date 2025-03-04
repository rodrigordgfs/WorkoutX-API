FROM node:20

WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json ./  

# Instala apenas as dependências de produção
RUN npm install --omit=dev

# Copia o restante do código da aplicação
COPY . .

# Gera os clientes do Prisma
RUN npx prisma generate

# Constrói a aplicação (caso use TypeScript ou bundlers)
RUN npm run build

# Expõe a porta usada pela API
EXPOSE 3000

# Executa as migrações e inicia o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
