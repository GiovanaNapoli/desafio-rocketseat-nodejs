#!/bin/sh

# Script de inicialização para o Render
# Executa migrações e inicia o servidor

echo "🚀 Iniciando aplicação..."

# Executa as migrações do banco de dados
echo "📊 Executando migrações do banco..."
npm run db:migrate:prod

if [ $? -eq 0 ]; then
    echo "✅ Migrações executadas com sucesso"
else
    echo "❌ Erro ao executar migrações"
    exit 1
fi

# Inicia o servidor
echo "🌐 Iniciando servidor..."
npm start
