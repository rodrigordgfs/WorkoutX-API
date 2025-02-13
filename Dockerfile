# Use uma imagem oficial do Node.js
FROM node:18

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que a API usa
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
