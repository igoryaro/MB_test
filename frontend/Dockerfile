# Usa Node.js como imagem base
FROM node:22

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração do frontend
COPY package.json package-lock.json ./
RUN npm install

# Copia todo o código do frontend
COPY . .

# Compila o frontend
# RUN npm run build

# Expõe a porta do frontend (80)
EXPOSE 3001

# Comando para rodar o frontend
CMD ["npm", "run", "dev-host"]