# Deploy no Render

## 📋 Configuração no Render

### 1. Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no painel do Render:

```bash
# Banco de dados PostgreSQL (fornecido pelo Render)
DATABASE_URL=postgresql://username:password@hostname:port/database

# Ambiente de produção
NODE_ENV=production

# Porta (opcional - Render define automaticamente)
PORT=3000
```

### 2. Configurações do Serviço

- **Build Command**: `npm install`
- **Start Command**: `./start.sh`
- **Environment**: `Node`
- **Node Version**: `22`

### 3. PostgreSQL Database

1. Crie um PostgreSQL database no Render
2. Copie a URL de conexão interna
3. Configure a variável `DATABASE_URL` com essa URL

### 4. Deploy

1. Conecte seu repositório GitHub ao Render
2. Configure as variáveis de ambiente
3. O deploy será automático a cada push na branch main

## 🔧 Estrutura de Deploy

O processo de deploy executa:

1. **Build**: Instala dependências com `npm install`
2. **Start**: Executa o script `start.sh` que:
   - Executa migrações do banco (`npm run db:migrate:prod`)
   - Inicia o servidor (`npm start`)

## ⚠️ Importante

- O `drizzle-kit` foi movido para `dependencies` para permitir migrações em produção
- As migrações são executadas automaticamente no startup
- Use a URL interna do PostgreSQL do Render para melhor performance

## 🐳 Docker (Alternativo)

Se preferir usar Docker no Render:

1. Configure o serviço como "Docker"
2. O Dockerfile já está otimizado para produção
3. As mesmas variáveis de ambiente se aplicam
