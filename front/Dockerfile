# Usando a imagem oficial do Node.js
FROM node:22-alpine3.20

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de package.json e package-lock.json para o container
COPY ./package.json ./package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o código fonte e arquivos estáticos para o container
COPY ./src ./src
COPY ./public ./public 

# Expor a porta 3000 (padrão do React)
EXPOSE 3000

# Comando para rodar o servidor React
CMD ["npm", "start"]
