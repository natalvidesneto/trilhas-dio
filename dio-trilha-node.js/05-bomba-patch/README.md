# ⚽ API Bomba Patch 2026

API REST desenvolvida em **Node.js + TypeScript + Express** que disponibiliza informações do patch **Bomba Patch 2026**, incluindo dados do patch e uma lista de jogadores com filtros por nome, time e país.

O projeto segue uma arquitetura em camadas (Routes → Controllers → Services → Repositories) e utiliza autenticação via **API Key** enviada no header `x-api-key`. Todas as rotas são do tipo **GET**.

---

## 📖 Sobre o projeto

A API Bomba Patch 2026 foi criada para servir dados estáticos do patch (nome, versão e slogan) e uma base de jogadores, permitindo consultas simples e filtradas. O objetivo é demonstrar boas práticas de organização de código, separação de responsabilidades e autenticação por chave de API.

**Principais características:**

- Apenas requisições **GET**
- Autenticação via header `x-api-key`
- Filtros opcionais por `nome`, `time` e `pais`
- Busca de jogador por `id`
- Respostas padronizadas em JSON
- Tratamento de erros com status HTTP consistentes (400, 401, 403, 404, 500)

---

## ⚙️ Como funciona

1. O cliente envia uma requisição para `/api/...` com o header `x-api-key`.
2. O middleware `apiKeyMiddleware` valida a chave:
   - Sem header → `401 Unauthorized`
   - Chave incorreta → `403 Forbidden`
   - Chave correta → segue para a rota
3. A rota chama o **Controller**, que interpreta `req`/`res` e valida entradas.
4. O **Service** aplica a regra de negócio.
5. O **Repository** lê o arquivo `bomba-patch.json` via `fs`.
6. A resposta é devolvida em JSON.
7. Erros são tratados pelos middlewares `notFoundMiddleware` e `errorMiddleware`.

A rota raiz `/` é pública e serve como **health check**.

---

## 🗂️ Estrutura do projeto

```
BombaPatch/
├── node_modules/
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env
└── src/
    ├── app.ts
    ├── server.ts
    ├── config/
    │   └── env.ts
    ├── controllers/
    │   └── bombaPatchController.ts
    ├── data/
    │   └── bomba-patch.json
    ├── middlewares/
    │   ├── apiKeyMiddleware.ts
    │   └── errorMiddleware.ts
    ├── models/
    │   └── jogadorModel.ts
    ├── repositories/
    │   └── bombaPatchRepository.ts
    ├── routes/
    │   ├── index.ts
    │   └── bombaPatchRoutes.ts
    ├── services/
    │   └── bombaPatchService.ts
    └── utils/
        └── httpStatus.ts
```

**Responsabilidade de cada camada:**

| Camada | Função |
|---|---|
| `routes` | Mapeamento dos endpoints |
| `controllers` | Tratamento de `req`/`res` e validação básica |
| `services` | Regras de negócio |
| `repositories` | Leitura do JSON (fonte de dados) |
| `middlewares` | Autenticação e tratamento de erros |
| `config` / `utils` | Variáveis de ambiente e constantes HTTP |
| `models` | Tipagens TypeScript |
| `data` | Base de dados em JSON |

---

## 🔧 Configuração do `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3000
API_KEY=bomba-patch-2026-secret-key
```

**Descrição das variáveis:**

| Variável | Descrição | Valor sugerido |
|---|---|---|
| `PORT` | Porta em que o servidor irá rodar | `3000` |
| `API_KEY` | Chave secreta exigida no header `x-api-key` | `bomba-patch-2026-secret-key` |

> 💡 Você pode alterar o valor de `API_KEY` para qualquer string secreta. Todos os clientes deverão enviar exatamente esse valor no header.

---

## ▶️ Como executar

Instale as dependências e inicie o servidor em modo de desenvolvimento:

```bash
npm install
npm run dev
```

O servidor ficará disponível em:

```
http://localhost:3000
```

---

## 🔐 Autenticação

Todas as rotas sob `/api` exigem o header:

```
x-api-key: bomba-patch-2026-secret-key
```

| Situação | Status | Descrição |
|---|---|---|
| Sem header | `401 Unauthorized` | API Key ausente |
| Chave errada | `403 Forbidden` | API Key inválida |
| Chave correta | Prossegue | Acesso liberado |

---

## 🌐 Endpoints (todos GET)

### 1. Health check (público)

```
GET http://localhost:3000/
```

**Resposta:**
```json
{
  "api": "Bomba Patch 2026",
  "status": "online",
  "auth": "Envie o header 'x-api-key' para acessar /api"
}
```

---

### 2. Informações do patch

```
GET http://localhost:3000/api/bomba-patch
Header: x-api-key: bomba-patch-2026-secret-key
```

**Resposta:**
```json
{
  "nome_patch": "Bomba Patch 2026",
  "versao": "2026.10",
  "slogan": "100% Atualizado - É Ruim de Aturar!",
  "total_jogadores": 20
}
```

---

### 3. Listar todos os jogadores

```
GET http://localhost:3000/api/bomba-patch/jogadores
Header: x-api-key: bomba-patch-2026-secret-key
```

**Resposta:**
```json
{
  "total": 20,
  "jogadores": [
    { "id": 1, "nome": "Vinícius Júnior", "time": "Real Madrid", "pais": "Brasil" },
    ...
  ]
}
```

---

### 4. Filtrar por nome, time ou país

Os filtros são **opcionais** e passados via query string. Apenas um filtro é aplicado por vez, na ordem `nome` → `time` → `pais`.

```
GET /api/bomba-patch/jogadores?nome=Endrick
GET /api/bomba-patch/jogadores?time=Real Madrid
GET /api/bomba-patch/jogadores?pais=Brasil
```

**Exemplo com `curl`:**

```bash
curl -H "x-api-key: bomba-patch-2026-secret-key" \
     "http://localhost:3000/api/bomba-patch/jogadores?pais=Brasil"
```

---

### 5. Buscar jogador por ID

```
GET /api/bomba-patch/jogadores/10
Header: x-api-key: bomba-patch-2026-secret-key
```

**Resposta:**
```json
{
  "id": 10,
  "nome": "Endrick",
  "time": "Real Madrid",
  "pais": "Brasil"
}
```

**Erros possíveis:**

| Situação | Status | Resposta |
|---|---|---|
| ID não numérico | `400 Bad Request` | `{ "erro": "ID inválido", ... }` |
| ID inexistente | `404 Not Found` | `{ "erro": "Jogador não encontrado", ... }` |

---

## 🧪 Testes rápidos com `curl`

```bash
# Sem API Key → 401
curl http://localhost:3000/api/bomba-patch

# Chave errada → 403
curl -H "x-api-key: errada" http://localhost:3000/api/bomba-patch

# Chave correta → 200
curl -H "x-api-key: bomba-patch-2026-secret-key" \
     http://localhost:3000/api/bomba-patch

# Filtrar por país
curl -H "x-api-key: bomba-patch-2026-secret-key" \
     "http://localhost:3000/api/bomba-patch/jogadores?pais=Brasil"

# Buscar por ID
curl -H "x-api-key: bomba-patch-2026-secret-key" \
     http://localhost:3000/api/bomba-patch/jogadores/10
```

---

## ✅ Boas práticas aplicadas

- Apenas método **GET** em todas as rotas de dados
- Autenticação centralizada via middleware `x-api-key`
- Separação clara entre **Repository**, **Service** e **Controller**
- Erros padronizados com status HTTP consistentes
- Filtros opcionais via **query params**
- Leitura do JSON com `fs`, mantendo o `tsconfig.json` original sem `resolveJsonModule`
- Health check público para monitoramento

---

## 👨‍💻 Sobre o desenvolvedor

**Natalvides Neto**

- GitHub: [https://github.com/natalvidesneto](https://github.com/natalvidesneto)
- Projeto: API Bomba Patch 2026
- Stack: Node.js, TypeScript, Express

---

## 📄 Licença

Este projeto está licenciado sob a **ISC License**.

---

> ⚽ **Bomba Patch 2026** — *100% Atualizado - É Ruim de Aturar!*