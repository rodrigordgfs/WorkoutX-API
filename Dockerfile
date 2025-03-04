# Use a imagem oficial do Node.js 20
FROM node:20

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json ./

# Instale as dependências de produção
RUN npm install --omit=dev

# Copie o restante do código da aplicação
COPY . .

# Gerar os clientes do Prisma
RUN npx prisma generate

# Gere o build da aplicação (caso use TypeScript ou bundlers)
RUN npm run build

# Exponha a porta que a API usa
EXPOSE 3000

# Comando para rodar as migrações e iniciar o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
