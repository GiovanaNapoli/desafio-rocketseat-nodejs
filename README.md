# Desafio Node.js - Rocketseat

Uma API REST para gerenciamento de cursos e matrículas desenvolvida com Node.js, Fastify e PostgreSQL.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Superset do JavaScript com tipagem estática
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM leve para TypeScript
- **Zod** - Validação de schemas TypeScript-first
- **Docker** - Containerização do banco de dados
- **Vitest** - Framework de testes rápido

## 📋 Funcionalidades

- ✅ Listar todos os cursos com paginação
- ✅ Buscar curso por ID
- ✅ Criar novo curso
- ✅ Busca de cursos por título
- ✅ Contagem de matrículas por curso
- ✅ Documentação automática da API com Swagger
- ✅ Validação de dados com Zod
- ✅ Logs estruturados com Pino
- ✅ Testes automatizados com cobertura

## 🛠️ Estrutura do Projeto

```
src/
├── db/
│   ├── client.ts          # Configuração do cliente do banco
│   ├── schema.ts          # Schema das tabelas (courses, users, enrollments)
│   └── seed.ts            # Dados iniciais para desenvolvimento
├── routes/
│   ├── create-course.ts         # Criar curso
│   ├── create-course.test.ts    # Testes de criação
│   ├── get-course-by-id.ts      # Buscar curso por ID
│   ├── get-course-by-id.test.ts # Testes de busca por ID
│   ├── get-courses.ts           # Listar cursos (com busca e paginação)
│   └── get-course.test.ts       # Testes de listagem
├── test/
│   └── factories/
│       └── make-course.ts       # Factory para criação de cursos nos testes
├── app.ts                 # Configuração da aplicação Fastify
├── env.ts                 # Configuração de variáveis de ambiente
└── server.ts              # Inicialização do servidor
```

## 📊 Schema do Banco

### Tabela `courses`
- `id` - UUID (Primary Key, gerado automaticamente)
- `title` - Text (obrigatório, único)
- `description` - Text (opcional)

### Tabela `users`
- `id` - UUID (Primary Key, gerado automaticamente)
- `name` - Text (obrigatório)
- `email` - Text (obrigatório, único)

### Tabela `enrollments`
- `id` - UUID (Primary Key, gerado automaticamente)
- `user_id` - UUID (Foreign Key para users)
- `course_id` - UUID (Foreign Key para courses)
- `created_at` - Timestamp (data de matrícula)

## 📊 Fluxo da Aplicação

```mermaid
flowchart TD
    A[Cliente] --> B{Endpoint}
    
    B -->|GET /courses| C[Listar Cursos]
    B -->|GET /courses/:id| D[Buscar por ID]
    B -->|POST /courses| E[Criar Curso]
    
    C --> F[Validação Query Params]
    D --> G[Validação ID]
    E --> H[Validação Body]
    
    F --> I[Busca com Filtros + Paginação]
    G --> J[Busca por ID]
    H --> K[Inserção no DB]
    
    I --> L[Lista + Total + Matrículas]
    J --> M{Existe?}
    K --> N[Curso Criado]
    
    M -->|Sim| O[Retorna Curso]
    M -->|Não| P[404 Error]
    
    L --> Q[200 OK]
    O --> R[200 OK] 
    P --> S[404 Not Found]
    N --> T[201 Created]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style Q fill:#e8f5e8
    style R fill:#e8f5e8
    style S fill:#ffebee
    style T fill:#e8f5e8
```

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

### 6. (Opcional) Popular o banco com dados iniciais
```bash
npm run db:seed
```

### 7. Inicie o servidor
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## 📖 Endpoints da API

### **GET** `/courses`
Lista todos os cursos com paginação e filtros

**Query Parameters:**
- `search` (opcional) - Busca por título do curso
- `orderby` (opcional) - Ordenação (padrão: "title")
- `page` (opcional) - Página (padrão: 1, 10 itens por página)

**Resposta (200):**
```json
{
  "courses": [
    {
      "id": "uuid",
      "title": "Nome do Curso",
      "enrollments": 5
    }
  ],
  "total": 1
}
```

### **GET** `/courses/:id`
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

# Popular banco com dados iniciais
npm run db:seed

# Abrir Drizzle Studio
npm run db:studio

# Executar testes
npm run test

# Executar testes com cobertura
npm run test
```

## 🧪 Testes

O projeto possui testes automatizados para todas as rotas da API:

- **Criação de cursos** - Validação de entrada e resposta
- **Listagem de cursos** - Teste de paginação e filtros
- **Busca por ID** - Teste de sucesso e erro 404
- **Coverage** - Cobertura de ~80% do código

Para executar os testes:
```bash
npm run test
```

### Test Factory
O projeto utiliza factories para criação de dados de teste, facilitando a manutenção e reutilização:

```typescript
// Criar curso para teste
const course = await makeCourse("Título do Curso");
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

## ⚡ Performance

- **Paginação** - Listagem limitada a 10 itens por página
- **Índices** - Campos únicos e chaves estrangeiras indexadas
- **Fastify** - Framework otimizado para alta performance
- **Drizzle ORM** - ORM leve com queries otimizadas

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.
