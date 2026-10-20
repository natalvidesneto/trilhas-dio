# Calculadora React

Uma calculadora moderna e responsiva construída com **React** e **Vite**, com suporte nativo a **tema claro e escuro** que se adapta automaticamente à preferência do sistema operacional do usuário.

---

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como **Exercício 1** de uma série de práticas em React. O objetivo é criar uma calculadora funcional que realiza operações matemáticas básicas, com uma interface elegante em estilo *glassmorphism* (efeito de vidro fosco) e suporte a temas dinâmicos.

### ✨ Funcionalidades

- ➕ Operações básicas: adição, subtração, multiplicação e divisão
- 📊 Operador de porcentagem (`%`)
- 🔄 Inversão de sinal (`±`)
- 🧹 Limpeza total (`AC`)
- 🔢 Suporte a números decimais
- ⚠️ Tratamento de erros (ex: divisão por zero)
- 📝 Exibição da expressão em tempo real
- 🌓 **Tema claro e escuro automáticos** (detalhes abaixo)

---

## 🌓 Tema Claro e Escuro — Mudança Automática pelo Sistema

Um dos destaques deste projeto é a **adaptação automática do tema** com base na preferência configurada no sistema operacional do usuário. Não é necessário clicar em nenhum botão: a calculadora **detecta e reage** às mudanças do sistema em tempo real.

### Como funciona

A lógica está implementada no componente `App.jsx` e utiliza a **Media Query API** do navegador (`window.matchMedia`):

#### 1. Inicialização do Estado

```javascript
const [isDark, setIsDark] = useState(
  window.matchMedia('(prefers-color-scheme: dark)').matches
);
```

Ao carregar a aplicação, o estado `isDark` é inicializado verificando se o sistema do usuário está configurado para o modo escuro (`prefers-color-scheme: dark`).

#### 2. Escuta de Mudanças em Tempo Real

```javascript
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (e) => setIsDark(e.matches);

  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}, []);
```

Um listener é registrado para escutar o evento `change` da media query. Assim, **se o usuário alterar o tema do sistema operacional enquanto a página está aberta**, a calculadora atualiza instantaneamente — sem recarregar a página.

#### 3. Aplicação do Tema

A classe `dark` ou `light` é aplicada dinamicamente ao container:

```jsx
<div className={`container ${isDark ? 'dark' : 'light'}`}>
```

#### 4. Variáveis CSS

Os temas são definidos via **CSS Custom Properties** em `App.css`, garantindo transições suaves entre os modos:

- **`:root`** → Tema claro (fundo azulado suave, botões translúcidos)
- **`.dark`** → Tema escuro (fundo `#0f172a`, botões em tons de ardósia, operadores em azul profundo)

Todas as cores (fundo, texto, botões, sombras, bordas) utilizam variáveis CSS, facilitando a manutenção e a consistência visual.

> 💡 **Dica:** Para testar, altere o tema do seu sistema operacional (Windows, macOS, Linux, Android ou iOS) e observe a calculadora responder imediatamente.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [React](https://react.dev/) | ^19.3.1 | Biblioteca para construção de interfaces |
| [Vite](https://vitejs.dev/) | ^8.3.4 | Build tool e dev server ultrarrápido |
| [ESLint](https://eslint.org/) | ^10.13.0 | Linter para padronização de código |
| CSS3 | — | Estilização com variáveis e glassmorphism |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18+ recomendada)
- Gerenciador de pacotes (`npm`, `yarn` ou `pnpm`)

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Acesse a pasta do projeto
cd calculadora

# Instale as dependências
npm install
```

### Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento (com HMR)
npm run dev

# Gera a build de produção
npm run build

# Executa o linter nos arquivos
npm run lint

# Pré-visualiza a build de produção
npm run preview
```

Após executar `npm run dev`, acesse **http://localhost:5173** no navegador.

---

## 📁 Estrutura do Projeto

```
calculadora/
├── src/
│   ├── App.jsx          # Componente principal com a lógica da calculadora
│   ├── App.css          # Estilos e variáveis de tema
│   ├── main.jsx         # Ponto de entrada da aplicação
│   └── index.css        # Estilos globais
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🧠 Arquitetura da Lógica

### Avaliação de Expressões

A função `evaluateExpression` implementa um **parser manual** que respeita a precedência de operadores:

1. **Primeira passada:** resolve operadores de maior precedência (`*`, `/`, `%`)
2. **Segunda passada:** resolve adição (`+`) e subtração (`-`)

Isso evita o uso de `eval()` — uma prática insegura — mantendo o código didático e seguro.

### Estados Principais

| Estado | Função |
|--------|--------|
| `display` | Valor atualmente exibido na tela |
| `expression` | Expressão em andamento (histórico visível) |
| `waitingForOperand` | Indica se o próximo número deve substituir o display |
| `isDark` | Controla o tema ativo |

---

## 🎨 Design

A interface utiliza a técnica de **glassmorphism**, com:

- Fundo translúcido com `backdrop-filter: blur(20px)`
- Bordas sutis e sombras suaves
- Cantos arredondados generosos
- Transições animadas entre temas (`transition: 0.3s ease`)

---

## 👤 Autor

**Natalvides Neto**

Desenvolvido como parte de exercícios práticos de React. ✨

---

> 🌗 **Lembre-se:** esta calculadora respeita a configuração de tema do seu sistema. Altere entre modo claro e escuro no seu dispositivo e veja a mágica acontecer!