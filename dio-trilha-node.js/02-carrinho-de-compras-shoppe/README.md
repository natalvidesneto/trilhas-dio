# 🛒 Shopee Cart System

Sistema de carrinho de compras inspirado na Shopee, desenvolvido em Node.js para execução no terminal.

## Funcionalidades

- 📋 Catálogo com 8 produtos divididos em categorias (Eletrônicos, Moda, Áudio, Informática)
- ➕ Adicionar produtos com quantidade personalizada
- ➖ Remover produtos total ou parcialmente
- ✏️ Modificar quantidades de itens no carrinho
- 🛒 Visualização completa do carrinho com subtotais
- 💰 Cálculo automático do valor total e quantidade de itens
- 🚚 Sistema de frete grátis para compras acima de R$ 100,00
- 🗑️ Limpeza total do carrinho
- ✅ Finalização de compra com resumo do pedido

## Tecnologias

- Node.js
- Módulo nativo `readline` para interface no terminal

## Como executar

```bash
node script.js
```

## Estrutura

O projeto utiliza uma classe `CarrinhoShopee` para gerenciar toda a lógica de negócio, com métodos para adicionar, remover, modificar e calcular totais automaticamente a cada operação.