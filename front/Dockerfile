# Usar uma imagem base do Node.js
FROM node:22-alpine3.20

# Definir o diretório de trabalho dentro do container
WORKDIR /front

# Copiar os arquivos de dependências para o diretório de trabalho
COPY ./front/package.json ./front/package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar todo o conteúdo do diretório front para dentro do container
COPY ./front/ /front/

# Expor a porta do frontend
EXPOSE 3000

# Rodar a aplicação React
CMD ["npm", "start"]
