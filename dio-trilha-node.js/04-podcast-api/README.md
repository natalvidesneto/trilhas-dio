# 🎙️ Anime Podcasts API

API REST backend para gerenciamento e consulta de podcasts de animes, construída com **Node.js + TypeScript** e **HTTP nativo** (sem frameworks como Express/Fastify).

O projeto oferece rotas para listar podcasts, buscar por **ID**, **nome** ou **categoria**, com autenticação via **API Key** em múltiplos formatos e suporte a **CORS**.

---

## 👨‍💻 Autor

**Natalvides Neto**

- GitHub: [https://github.com/natalvidesneto](https://github.com/natalvidesneto)

---

## 📌 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Como Clonar o Repositório](#-como-clonar-o-repositório)
- [Instalação das Dependências](#-instalação-das-dependências)
- [Configuração do Ambiente (.env)](#-configuração-do-ambiente-env)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Autenticação](#-autenticação)
- [Exemplos de Uso (cURL)](#-exemplos-de-uso-curl)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Boas Práticas e Segurança](#-boas-práticas-e-segurança)
- [Licença](#-licença)

---

## 📖 Sobre o Projeto

A **Anime Podcasts API** foi desenvolvida para servir dados de podcasts relacionados a animes, permitindo:

- 📋 Listagem completa de podcasts
- 🔍 Busca por **ID** (retorno de objeto único)
- 🔍 Busca por **nome** (parcial, case-insensitive)
- 🔍 Busca por **categoria** (parcial, case-insensitive)
- 🔐 Autenticação via **API Key** (header, Bearer Token ou query param)
- 🌐 Suporte a **CORS** com preflight (`OPTIONS`)

A leitura dos dados é feita de forma **assíncrona** (`fs/promises`), sem bloquear o event loop.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** (HTTP nativo — sem framework)
- **TypeScript**
- **ES Modules** (`import`/`export` com `.js` na extensão)
- **dotenv** (variáveis de ambiente)
- **fs/promises** (leitura assíncrona do JSON de dados)

---

## 🗂️ Estrutura do Projeto

```
src/
│  ├── config/
│  │   └── podcastConfig.ts        # Variáveis de ambiente (PORT, API_KEY)
│  ├── controllers/
│  │   └── podcastController.ts    # Controller principal (roteamento + auth)
│  ├── data/
│  │   └── podcast.json            # Base de dados (JSON)
│  ├── middlewares/
│  │   └── podcastAuthentication.ts# Middleware de autenticação via API Key
│  ├── models/
│  │   └── podcastModel.ts         # Interface PodcastModel
│  ├── repositories/
│  │   └── podcastSearch.ts        # Leitura assíncrona do JSON
│  ├── routes/
│  │   └── httpRoutes.ts           # Enum de rotas HTTP
│  ├── services/
│  │   └── podcastService.ts       # Regras de negócio e filtros
│  ├── utils/
│  │   ├── httpStatus.ts           # Enum de status HTTP
│  │   └── response.ts             # Helper sendJson
│  ├── app.ts                      # Handler principal
│  └── server.ts                   # Bootstrap do servidor
│
└──.env
```

---

## ✅ Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v18 ou superior recomendado)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

Para verificar:

```bash
node -v
npm -v
git --version
```

---

## 📥 Como Clonar o Repositório

```bash
# Clone o repositório
git clone https://github.com/natalvidesneto/trilha-dio

# Entre na pasta do projeto
cd 04-podcasts-api
```
---

## 📦 Instalação das Dependências

```bash
npm install
```

Ou, se preferir:

```bash
yarn install
# ou
pnpm install
```

---

## ⚙️ Configuração do Ambiente (.env)

O projeto utiliza variáveis de ambiente para configuração de porta e API Key.

### 1️⃣ Crie o arquivo `.env`

Na **raiz do projeto**, crie um arquivo chamado `.env` com o seguinte conteúdo:

```env
PORT=3000
API_KEY=anime-podcast-secret-key
```

### 2️⃣ Crie o arquivo `.env-example` (recomendado)

Para versionar um modelo sem expor dados sensíveis, crie também o arquivo `.env-example`:

```env
# Porta em que o servidor irá rodar
PORT=3000

# Chave de API usada para autenticar requisições
API_KEY=sua-chave-secreta-aqui
```

> 📌 **Importante:** adicione `.env` ao seu `.gitignore` para não vazar credenciais.
>
> ```gitignore
> node_modules/
> dist/
> .env
> ```

### 🔎 Variáveis disponíveis

| Variável  | Descrição                              | Valor padrão (fallback)            |
|-----------|----------------------------------------|------------------------------------|
| `PORT`    | Porta do servidor HTTP                 | `3000`                             |
| `API_KEY` | Chave de API para autenticação         | `anime-podcast-secret-key`         |

---

## ▶️ Como Executar o Projeto

### 🔧 Modo desenvolvimento (com reload automático)

```bash
npm run dev
```

### 🏗️ Build de produção

```bash
npm run build
```

### 🚀 Executar build

```bash
npm start
```

Após iniciar, você verá no console:

```
API rodando em http://localhost:3000
```

---

## 🌐 Endpoints da API

| Método | Rota                | Autenticação | Descrição                          |
|--------|---------------------|--------------|------------------------------------|
| GET    | `/`                 | ❌ Não        | Health check da API                |
| GET    | `/list-podcasts`    | ✅ Sim        | Lista todos os podcasts            |
| GET    | `/podcast?id=<n>`   | ✅ Sim        | Busca podcast por ID               |
| GET    | `/podcast?nome=<s>` | ✅ Sim        | Busca podcast por nome (parcial)   |
| GET    | `/podcast?categoria=<s>` | ✅ Sim   | Busca podcast por categoria (parcial) |

### 📋 Health check (exemplo de resposta)

```json
{
  "status": "ok",
  "service": "Anime Podcasts API",
  "endpoints": [
    "/",
    "/list-podcasts",
    "/podcast?id=<number>",
    "/podcast?nome=<string>",
    "/podcast?categoria=<string>"
  ]
}
```

---

## 🔐 Autenticação

A autenticação é feita via **API Key**, que pode ser enviada de **3 formas**:

### 1️⃣ Header `x-api-key`

```http
x-api-key: anime-podcast-secret-key
```

### 2️⃣ Header `Authorization` (Bearer Token)

```http
Authorization: Bearer anime-podcast-secret-key
```

### 3️⃣ Query param `api_key`

```
http://localhost:3000/list-podcasts?api_key=anime-podcast-secret-key
```

> ⚠️ **Recomendação:** em produção, prefira sempre os **headers** — a query string pode acabar em logs de servidores e históricos.

---

## 🧪 Exemplos de Uso (cURL)

### 1️⃣ Health check (sem autenticação)

```bash
curl http://localhost:3000/
```

### 2️⃣ Lista completa de podcasts

```bash
curl http://localhost:3000/list-podcasts \
  -H "x-api-key: anime-podcast-secret-key"
```

### 3️⃣ Buscar podcast por ID

```bash
curl "http://localhost:3000/podcast?id=3" \
  -H "x-api-key: anime-podcast-secret-key"
```

### 4️⃣ Buscar por nome (parcial, case-insensitive)

```bash
curl "http://localhost:3000/podcast?nome=shonen" \
  -H "Authorization: Bearer anime-podcast-secret-key"
```

### 5️⃣ Buscar por categoria (parcial, case-insensitive)

```bash
curl "http://localhost:3000/podcast?categoria=terror" \
  -H "x-api-key: anime-podcast-secret-key"
```

### 6️⃣ API Key via query param

```bash
curl "http://localhost:3000/list-podcasts?api_key=anime-podcast-secret-key"
```

### 7️⃣ Sem chave → resposta `401`

```bash
curl http://localhost:3000/list-podcasts
```

```json
{
  "message": "API Key inválida ou ausente.",
  "hint": "Envie via header x-api-key, Authorization: Bearer <key> ou ?api_key=<key>."
}
```

---

## 📜 Scripts Disponíveis

| Script          | Descrição                                    |
|-----------------|----------------------------------------------|
| `npm run dev`   | Executa em modo desenvolvimento (watch mode) |
| `npm run build` | Compila o TypeScript para `dist/`            |
| `npm start`     | Executa o build de produção                  |

> 💡 Ajuste conforme seu `package.json`. Se usar `tsx`/`ts-node-dev`/`nodemon`, adapte os comandos.

---

## 🔒 Boas Práticas e Segurança

- 🔑 **Nunca** versione o arquivo `.env` com segredos reais.
- 🌐 Em produção, **sempre use HTTPS** (evita sniffing da API Key).
- 🚫 Evite enviar a API Key por **query string** em URLs públicas.
- ♻️ **Rotacione** as chaves periodicamente.
- 🚦 Considere adicionar **rate limiting** por chave (ex.: Redis).
- 🧾 Prefira **headers** para envio de credenciais.

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
