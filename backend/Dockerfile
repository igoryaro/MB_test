# Usa Node.js como imagem base
FROM node:22

# Define o diretório de trabalho
WORKDIR /app

# Atualizar dependências
RUN apt-get update

# Copia os arquivos de configuração do backend
COPY package.json package-lock.json ./
RUN npm install

# Copia todo o código do backend
COPY . .

# Expõe a porta do backend (3000)
EXPOSE 3000

# Comando para rodar o backend
CMD ["node", "server.js"]