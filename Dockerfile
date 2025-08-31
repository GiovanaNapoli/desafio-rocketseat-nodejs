FROM node:22-alpine

WORKDIR /app

# Copiar package.json e package-lock.json primeiro para melhor cache
COPY package*.json ./
RUN npm ci

# Copiar o resto dos arquivos
COPY . ./

# Dar permissão de execução ao script de inicialização
RUN chmod +x start.sh

EXPOSE 3000

# Usar o script de inicialização
CMD ["./start.sh"]