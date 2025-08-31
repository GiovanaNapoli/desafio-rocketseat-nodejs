# Desafio Node.js - Rocketseat

Uma API REST para gerenciamento de cursos desenvolvida com Node.js, Fastify e PostgreSQL.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Superset do JavaScript com tipagem estática
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM leve para TypeScript
- **Zod** - Validação de schemas TypeScript-first
- **Docker** - Containerização do banco de dados

## 📋 Funcionalidades

- ✅ Listar todos os cursos
- ✅ Buscar curso por ID
- ✅ Criar novo curso
- ✅ Documentação automática da API com Swagger
- ✅ Validação de dados com Zod
- ✅ Logs estruturados com Pino

## 🛠️ Estrutura do Projeto

```
src/
├── db/
│   ├── client.ts      # Configuração do cliente do banco
│   └── schema.ts      # Schema das tabelas
├── routes/
│   ├── create-course.ts      # Criar curso
│   ├── get-course-by-id.ts   # Buscar curso por ID
│   └── get-courses.ts        # Listar cursos
└── server.ts          # Configuração do servidor
```

## � Fluxo da Aplicação

```mermaid
flowchart TD
    A[Cliente] --> B{Requisição HTTP}
    
    B -->|GET /courses| C[Listar Cursos]
    B -->|GET /course/:id| D[Buscar Curso por ID]
    B -->|POST /courses| E[Criar Curso]
    
    C --> F[Validação Zod]
    D --> G[Validação Zod + Params]
    E --> H[Validação Zod + Body]
    
    F --> I[Consulta DB - SELECT *]
    G --> J[Consulta DB - SELECT WHERE id]
    H --> K[Validação Título Único]
    
    I --> L[Retorna Lista de Cursos]
    J --> M{Curso Existe?}
    K --> N[Inserção no DB]
    
    M -->|Sim| O[Retorna Curso Completo]
    M -->|Não| P[Retorna 404]
    
    N --> Q[Retorna ID do Curso Criado]
    
    L --> R[Response 200 + JSON]
    O --> S[Response 200 + JSON]
    P --> T[Response 404]
    Q --> U[Response 201 + JSON]
    
    R --> V[Cliente recebe dados]
    S --> V
    T --> V
    U --> V
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style V fill:#e8f5e8
    style I fill:#fff3e0
    style J fill:#fff3e0
    style N fill:#fff3e0
```

## �📊 Schema do Banco

### Tabela `courses`
- `id` - UUID (Primary Key, gerado automaticamente)
- `title` - Text (obrigatório, único)
- `description` - Text (opcional)

### Tabela `users`
- `id` - UUID (Primary Key, gerado automaticamente)
- `name` - Text (obrigatório)
- `email` - Text (obrigatório, único)

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 22+
- Docker e Docker Compose
- PostgreSQL (via Docker)

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd desafio-nodejs-rocketseat
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/desafio
```

### 4. Inicie o banco de dados
```bash
docker-compose up -d
```

### 5. Execute as migrações
```bash
npm run db:migrate
```

### 6. Inicie o servidor
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## 📖 Endpoints da API

### **GET** `/courses`
Lista todos os cursos

**Resposta (200):**
```json
{
  "courses": [
    {
      "id": "uuid",
      "title": "Nome do Curso"
    }
  ]
}
```

### **GET** `/course/:id`
Busca um curso específico por ID

**Parâmetros:**
- `id` - UUID do curso

**Resposta (200):**
```json
{
  "course": {
    "id": "uuid",
    "title": "Nome do Curso",
    "description": "Descrição do curso"
  }
}
```

**Resposta (404):** Curso não encontrado

### **POST** `/courses`
Cria um novo curso

**Body:**
```json
{
  "title": "Nome do Curso"
}
```

**Validações:**
- `title`: mínimo 3 caracteres, máximo 100 caracteres

**Resposta (201):**
```json
{
  "id": "uuid"
}
```

## 📚 Documentação

A documentação interativa da API está disponível em:
- **Scalar UI**: `http://localhost:3000/docs` (ambiente de desenvolvimento)

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento com watch mode
npm run dev

# Gerar migrações do banco
npm run db:generate

# Executar migrações
npm run db:migrate

# Abrir Drizzle Studio
npm run db:studio
```

## 🐳 Docker

O projeto inclui um `docker-compose.yml` para executar o PostgreSQL:

```bash
# Iniciar banco de dados
docker-compose up -d

# Parar banco de dados
docker-compose down
```

## 🧪 Validação de Dados

A API utiliza **Zod** para validação de esquemas, garantindo:
- Tipagem forte em tempo de compilação
- Validação em tempo de execução
- Mensagens de erro claras
- Geração automática de documentação OpenAPI

## 📝 Logs

Os logs são estruturados usando **Pino** com formatação colorida para desenvolvimento, incluindo:
- Timestamp
- Nível do log
- Informações da requisição
- Tempo de resposta

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.
