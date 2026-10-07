# 🏎️ API Fórmula 1

API REST desenvolvida para disponibilizar dados de pilotos de Fórmula 1, construída com **Fastify** + **TypeScript**, utilizando **API Key** como método de autenticação e expondo apenas rotas **GET**.

---

## 📖 Sobre o Projeto

A **API Fórmula 1** é um serviço backend que fornece informações sobre pilotos e equipes da temporada 2026. O projeto foi estruturado seguindo boas práticas de arquitetura em camadas, separando responsabilidades entre rotas, controllers, services e repositories.

O acesso aos dados é protegido por **API Key**, garantindo que apenas consumidores autorizados possam consultar as informações. A autenticação pode ser feita de três formas diferentes: via header `x-api-key`, via header `Authorization: Bearer` ou via query string `?api_key=`.

---

## 👨‍💻 Desenvolvedor

**Natalvides Neto**
GitHub: [https://github.com/natalvidesneto](https://github.com/natalvidesneto)

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas, promovendo separação de responsabilidades, facilidade de manutenção e escalabilidade.

```
Formula1/
├── node_modules/
├── package.json
├── package-lock.json
├── tsconfig.json
└── src/
    ├── app.ts
    ├── server.ts
    ├── config/
    │   └── env.ts
    ├── controllers/
    │   └── piloto.controller.ts
    ├── data/
    │   └── data.json
    ├── middlewares/
    │   └── apiKey.middleware.ts
    ├── models/
    │   └── piloto.model.ts
    ├── repositories/
    │   └── piloto.repository.ts
    ├── routes/
    │   ├── index.ts
    │   └── piloto.routes.ts
    ├── services/
    │   └── piloto.service.ts
    └── utils/
        └── httpError.ts
```

### Responsabilidades das Camadas

| Camada | Responsabilidade |
|--------|------------------|
| **Routes** | Define os endpoints e associa aos controllers |
| **Middlewares** | Valida a API Key antes de acessar rotas protegidas |
| **Controllers** | Trata requisições e respostas HTTP |
| **Services** | Contém as regras de negócio e validações |
| **Repositories** | Acessa e manipula a fonte de dados (`data.json`) |
| **Models** | Define as interfaces e tipos de dados |
| **Config** | Carrega e valida variáveis de ambiente |
| **Utils** | Classes auxiliares (ex: `HttpError`) |

### Fluxo da Aplicação

```
Cliente HTTP
     │
     ▼
┌──────────────┐
│  server.ts   │  ← inicializa
└──────┬───────┘
       ▼
┌──────────────┐
│   app.ts     │  ← Fastify + CORS + ErrorHandler
└──────┬───────┘
       ▼
┌────────────────────┐
│  routes/index.ts   │
│  + apiKeyMiddleware│  ← protege /api/v1/*
└──────┬─────────────┘
       ▼
┌────────────────────┐
│ piloto.routes.ts   │
└──────┬─────────────┘
       ▼
┌────────────────────┐
│ piloto.controller  │  ← trata request/response
└──────┬─────────────┘
       ▼
┌────────────────────┐
│  piloto.service    │  ← regras de negócio
└──────┬─────────────┘
       ▼
┌────────────────────┐
│ piloto.repository  │  ← lê data.json
└────────────────────┘
```

---

## ⚙️ Tecnologias Utilizadas

- **Node.js** — Ambiente de execução
- **TypeScript** — Tipagem estática
- **Fastify** — Framework web de alta performance
- **@fastify/cors** — Habilitação de CORS
- **dotenv** — Gerenciamento de variáveis de ambiente
- **tsx** — Execução de TypeScript em desenvolvimento

---

## 🔐 Autenticação

A API utiliza **API Key** como método de autenticação. A chave pode ser enviada de três formas:

1. **Header `x-api-key`**
   ```
   x-api-key: f1-super-secret-key-2026
   ```

2. **Header `Authorization: Bearer`**
   ```
   Authorization: Bearer f1-super-secret-key-2026
   ```

3. **Query string `?api_key=`**
   ```
   ?api_key=f1-super-secret-key-2026
   ```

Todas as rotas sob o prefixo `/api/v1` são protegidas. Apenas o endpoint `/health` é público.

---

## 🚀 Como Usar

### Pré-requisitos

- Node.js instalado (versão 18 ou superior)
- npm ou yarn

### Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3000
API_KEY=f1-super-secret-key-2026
```

> A variável `API_KEY` é obrigatória. Caso não seja definida, a aplicação lançará um erro na inicialização.

### Instalação

```bash
npm install
```

### Execução

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Build de produção
npm run build

# Executar build de produção
npm start
```

Após iniciar, a API estará disponível em `http://localhost:3000`.

---

## 📋 Endpoints

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/health` | Health check da API | ❌ |
| GET | `/api/v1/pilotos` | Lista todos os pilotos | ✅ |
| GET | `/api/v1/pilotos/:id` | Busca piloto por ID | ✅ |
| GET | `/api/v1/pilotos/equipe?equipe=X` | Busca pilotos por equipe | ✅ |
| GET | `/api/v1/pilotos/busca?nome=X` | Busca pilotos por nome (parcial) | ✅ |

---

## 🧪 Exemplos de Uso

### Health Check (sem API Key)

```bash
curl http://localhost:3000/health
```

### Listar todos os pilotos

```bash
curl -H "x-api-key: f1-super-secret-key-2026" \
  http://localhost:3000/api/v1/pilotos
```

### Buscar piloto por ID

```bash
curl -H "x-api-key: f1-super-secret-key-2026" \
  http://localhost:3000/api/v1/pilotos/1
```

### Buscar pilotos por equipe

```bash
curl -H "x-api-key: f1-super-secret-key-2026" \
  "http://localhost:3000/api/v1/pilotos/equipe?equipe=Ferrari"
```

### Buscar piloto por nome (parcial)

```bash
curl -H "x-api-key: f1-super-secret-key-2026" \
  "http://localhost:3000/api/v1/pilotos/busca?nome=Max"
```

### Autenticação via Bearer

```bash
curl -H "Authorization: Bearer f1-super-secret-key-2026" \
  http://localhost:3000/api/v1/pilotos
```

### Resposta de erro sem API Key (401)

```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "API Key inválida ou ausente."
}
```

---

## 📦 Estrutura de Dados

Os dados dos pilotos ficam armazenados no arquivo `src/data/data.json`, seguindo o modelo:

```typescript
interface Piloto {
  id: number;
  nome: string;
  equipe: string;
}
```

---

## 🛠️ Tratamento de Erros

A API possui um handler global de erros que padroniza as respostas:

- **`HttpError`** — Erros de negócio (ex: 404 quando um piloto não é encontrado)
- **Erros internos** — Retornam status `500` com mensagem genérica

Formato padrão de erro:

```json
{
  "statusCode": 404,
  "error": "HttpError",
  "message": "Piloto com id 99 não encontrado"
}
```

---

## 📄 Licença

Este projeto está sob a licença **ISC**.

---

Desenvolvido por **Natalvides Neto** 🏁