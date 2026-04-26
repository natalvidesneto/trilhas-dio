# 🛍️ QR Code Generator for E-commerce

Gerador de QR Codes para produtos de e-commerce, executado diretamente no terminal Node.js.

## 🚀 Funcionalidades

- Geração instantânea de QR Codes para URLs de produtos
- Processamento em lote (até 50 produtos por vez)
- Validação automática de URLs com adição de protocolo HTTPS
- Histórico persistente em arquivo JSON
- Interface colorida e intuitiva no terminal

## 📦 Tecnologias

- Node.js (ESModules)
- `qrcode-terminal` - Geração de QR Codes
- `chalk` - Estilização do terminal
- `readline` - Interação com usuário

## ⚙️ Instalação

```bash
cd backend
npm install
npm start
```

## 📋 Uso

1. Escolha entre gerar QR Code único ou em lote
2. Informe nome do produto e URL da página de venda
3. O QR Code será exibido diretamente no terminal
4. Histórico fica salvo em `qr-history.json`

## 💡 Aplicações

- Embalagens de produtos físicos
- Materiais promocionais e catálogos
- Vitrines digitais em lojas físicas
- Campanhas de marketing com rastreamento

## 📄 Licença

ISC