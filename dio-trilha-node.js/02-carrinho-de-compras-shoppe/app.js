const readline = require('readline');

// Banco de dados de produtos disponíveis (simulando a Shopee)
const catalogoProdutos = [
    { id: 1, nome: "Smartphone Xiaomi Note 11", preco: 1299.99, categoria: "Eletrônicos" },
    { id: 2, nome: "Fone de Ouvido Bluetooth", preco: 89.90, categoria: "Áudio" },
    { id: 3, nome: "Camiseta Nike", preco: 79.90, categoria: "Moda" },
    { id: 4, nome: "Power Bank 20000mAh", preco: 119.90, categoria: "Eletrônicos" },
    { id: 5, nome: "Tênis Adidas Running", preco: 249.90, categoria: "Moda" },
    { id: 6, nome: "Mouse Gamer RGB", preco: 149.90, categoria: "Informática" },
    { id: 7, nome: "Teclado Mecânico", preco: 299.90, categoria: "Informática" },
    { id: 8, nome: "Monitor 24 Polegadas", preco: 899.90, categoria: "Eletrônicos" }
];

// Classe para gerenciar o carrinho
class CarrinhoShopee {
    constructor() {
        this.itens = [];
    }

    // Adicionar produto ao carrinho
    adicionarProduto(produtoId, quantidade = 1) {
        const produto = catalogoProdutos.find(p => p.id === produtoId);
        
        if (!produto) {
            console.log(`\n❌ Produto com ID ${produtoId} não encontrado!`);
            return false;
        }

        if (quantidade <= 0) {
            console.log(`\n❌ Quantidade inválida!`);
            return false;
        }

        const itemExistente = this.itens.find(item => item.id === produtoId);

        if (itemExistente) {
            itemExistente.quantidade += quantidade;
            console.log(`\n✅ ${quantidade}x "${produto.nome}" adicionado(s) ao carrinho!`);
        } else {
            this.itens.push({
                id: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                quantidade: quantidade,
                subtotal: produto.preco * quantidade
            });
            console.log(`\n✅ "${produto.nome}" adicionado ao carrinho!`);
        }

        this.atualizarSubtotais();
        return true;
    }

    // Remover produto do carrinho
    removerProduto(produtoId, quantidade = null) {
        const index = this.itens.findIndex(item => item.id === produtoId);
        
        if (index === -1) {
            console.log(`\n❌ Produto não encontrado no carrinho!`);
            return false;
        }

        const item = this.itens[index];

        if (quantidade === null || quantidade >= item.quantidade) {
            // Remove completamente o item
            this.itens.splice(index, 1);
            console.log(`\n✅ "${item.nome}" removido completamente do carrinho!`);
        } else {
            // Remove apenas a quantidade especificada
            item.quantidade -= quantidade;
            console.log(`\n✅ ${quantidade}x "${item.nome}" removido(s) do carrinho!`);
            this.atualizarSubtotais();
        }

        return true;
    }

    // Modificar quantidade de um produto
    modificarQuantidade(produtoId, novaQuantidade) {
        const item = this.itens.find(item => item.id === produtoId);
        
        if (!item) {
            console.log(`\n❌ Produto não encontrado no carrinho!`);
            return false;
        }

        if (novaQuantidade <= 0) {
            return this.removerProduto(produtoId, item.quantidade);
        }

        console.log(`\n✅ Quantidade de "${item.nome}" alterada de ${item.quantidade} para ${novaQuantidade}`);
        item.quantidade = novaQuantidade;
        this.atualizarSubtotais();
        return true;
    }

    // Atualizar subtotais dos itens
    atualizarSubtotais() {
        this.itens.forEach(item => {
            item.subtotal = item.preco * item.quantidade;
        });
    }

    // Calcular total do carrinho
    calcularTotal() {
        return this.itens.reduce((total, item) => total + item.subtotal, 0);
    }

    // Calcular quantidade total de produtos
    calcularQuantidadeTotal() {
        return this.itens.reduce((total, item) => total + item.quantidade, 0);
    }

    // Exibir carrinho atual
    exibirCarrinho() {
        console.log('\n' + '='.repeat(60));
        console.log('🛒 SEU CARRINHO SHOPEE');
        console.log('='.repeat(60));

        if (this.itens.length === 0) {
            console.log('Seu carrinho está vazio!');
            console.log('='.repeat(60));
            return;
        }

        console.log(`${'Item'.padEnd(25)} ${'Qtd'.padEnd(8)} ${'Preço'.padEnd(12)} ${'Subtotal'.padEnd(12)}`);
        console.log('-'.repeat(60));

        this.itens.forEach((item, index) => {
            const nomeDisplay = item.nome.length > 23 ? item.nome.substring(0, 20) + '...' : item.nome;
            console.log(
                `${(index + 1)}. ${nomeDisplay.padEnd(23)} ` +
                `${item.quantidade.toString().padEnd(8)} ` +
                `R$ ${item.preco.toFixed(2).padStart(9)} ` +
                `R$ ${item.subtotal.toFixed(2).padStart(10)}`
            );
        });

        console.log('-'.repeat(60));
        const totalItens = this.calcularQuantidadeTotal();
        const totalValor = this.calcularTotal();
        
        console.log(`📦 Total de itens: ${totalItens}`);
        console.log(`💰 Total do carrinho: R$ ${totalValor.toFixed(2)}`);
        
        // Simulando frete grátis (inspirado na Shopee)
        if (totalValor > 100) {
            console.log(`🎉 Frete GRÁTIS! (Pedido acima de R$ 100,00)`);
        } else {
            const falta = 100 - totalValor;
            console.log(`🚚 Adicione mais R$ ${falta.toFixed(2)} para ganhar frete grátis!`);
        }
        
        console.log('='.repeat(60));
    }

    // Exibir catálogo de produtos
    exibirCatalogo() {
        console.log('\n' + '='.repeat(60));
        console.log('📋 CATÁLOGO DE PRODUTOS SHOPEE');
        console.log('='.repeat(60));
        
        catalogoProdutos.forEach(produto => {
            console.log(
                `ID: ${produto.id.toString().padStart(2)} | ` +
                `${produto.nome.padEnd(28)} | ` +
                `R$ ${produto.preco.toFixed(2).padStart(8)} | ` +
                `${produto.categoria}`
            );
        });
        console.log('='.repeat(60));
    }

    // Limpar carrinho
    limparCarrinho() {
        this.itens = [];
        console.log('\n🗑️ Carrinho esvaziado com sucesso!');
    }
}

// Configurar interface de leitura do terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const carrinho = new CarrinhoShopee();

// Função para mostrar menu principal
function mostrarMenu() {
    console.log('\n' + '='.repeat(50));
    console.log('🏪 SHOPEE CART SYSTEM - MENU PRINCIPAL');
    console.log('='.repeat(50));
    console.log('1. 📋 Ver catálogo de produtos');
    console.log('2. ➕ Adicionar produto ao carrinho');
    console.log('3. ➖ Remover produto do carrinho');
    console.log('4. ✏️ Modificar quantidade de produto');
    console.log('5. 🛒 Ver carrinho');
    console.log('6. 🗑️ Limpar carrinho');
    console.log('7. 💰 Finalizar compra');
    console.log('0. 🚪 Sair');
    console.log('='.repeat(50));
}

// Função para adicionar produto
function adicionarProdutoPrompt() {
    console.log('\n--- ADICIONAR PRODUTO ---');
    rl.question('Digite o ID do produto: ', (idInput) => {
        const id = parseInt(idInput);
        
        if (isNaN(id)) {
            console.log('❌ ID inválido!');
            return mostrarMenuPrompt();
        }
        
        rl.question('Digite a quantidade (padrão 1): ', (qtdInput) => {
            const quantidade = qtdInput.trim() === '' ? 1 : parseInt(qtdInput);
            
            if (isNaN(quantidade)) {
                console.log('❌ Quantidade inválida!');
                return mostrarMenuPrompt();
            }
            
            carrinho.adicionarProduto(id, quantidade);
            mostrarMenuPrompt();
        });
    });
}

// Função para remover produto
function removerProdutoPrompt() {
    if (carrinho.itens.length === 0) {
        console.log('\n❌ Carrinho vazio! Adicione produtos primeiro.');
        return mostrarMenuPrompt();
    }
    
    carrinho.exibirCarrinho();
    console.log('\n--- REMOVER PRODUTO ---');
    rl.question('Digite o ID do produto a remover: ', (idInput) => {
        const id = parseInt(idInput);
        
        if (isNaN(id)) {
            console.log('❌ ID inválido!');
            return mostrarMenuPrompt();
        }
        
        const item = carrinho.itens.find(i => i.id === id);
        
        if (item && item.quantidade > 1) {
            rl.question(`Remover todos os ${item.quantidade} itens? (s/n): `, (removerTodos) => {
                if (removerTodos.toLowerCase() === 's') {
                    carrinho.removerProduto(id);
                } else {
                    rl.question('Quantidade a remover: ', (qtdInput) => {
                        const quantidade = parseInt(qtdInput);
                        if (!isNaN(quantidade)) {
                            carrinho.removerProduto(id, quantidade);
                        } else {
                            console.log('❌ Quantidade inválida!');
                        }
                        mostrarMenuPrompt();
                    });
                    return;
                }
                mostrarMenuPrompt();
            });
        } else {
            carrinho.removerProduto(id);
            mostrarMenuPrompt();
        }
    });
}

// Função para modificar quantidade
function modificarQuantidadePrompt() {
    if (carrinho.itens.length === 0) {
        console.log('\n❌ Carrinho vazio! Adicione produtos primeiro.');
        return mostrarMenuPrompt();
    }
    
    carrinho.exibirCarrinho();
    console.log('\n--- MODIFICAR QUANTIDADE ---');
    rl.question('Digite o ID do produto: ', (idInput) => {
        const id = parseInt(idInput);
        
        if (isNaN(id)) {
            console.log('❌ ID inválido!');
            return mostrarMenuPrompt();
        }
        
        rl.question('Nova quantidade: ', (qtdInput) => {
            const quantidade = parseInt(qtdInput);
            
            if (isNaN(quantidade)) {
                console.log('❌ Quantidade inválida!');
                return mostrarMenuPrompt();
            }
            
            carrinho.modificarQuantidade(id, quantidade);
            mostrarMenuPrompt();
        });
    });
}

// Função para finalizar compra
function finalizarCompra() {
    if (carrinho.itens.length === 0) {
        console.log('\n❌ Carrinho vazio! Adicione produtos para finalizar a compra.');
        return mostrarMenuPrompt();
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('💰 FINALIZANDO COMPRA');
    console.log('='.repeat(60));
    carrinho.exibirCarrinho();
    
    const total = carrinho.calcularTotal();
    const quantidadeTotal = carrinho.calcularQuantidadeTotal();
    
    console.log('\n📝 RESUMO DO PEDIDO:');
    console.log(`- Total de produtos: ${quantidadeTotal}`);
    console.log(`- Valor total: R$ ${total.toFixed(2)}`);
    
    if (total > 100) {
        console.log(`- Frete: R$ 0,00 (GRÁTIS)`);
    } else {
        const frete = 15.90;
        console.log(`- Frete: R$ ${frete.toFixed(2)}`);
        console.log(`- Total com frete: R$ ${(total + frete).toFixed(2)}`);
    }
    
    console.log('\n✅ COMPRA FINALIZADA COM SUCESSO!');
    console.log('🎉 Obrigado por comprar na Shopee!');
    console.log('='.repeat(60));
    
    carrinho.limparCarrinho();
    mostrarMenuPrompt();
}

// Função principal do menu
function mostrarMenuPrompt() {
    mostrarMenu();
    rl.question('Escolha uma opção: ', (opcao) => {
        switch(opcao) {
            case '1':
                carrinho.exibirCatalogo();
                mostrarMenuPrompt();
                break;
            case '2':
                adicionarProdutoPrompt();
                break;
            case '3':
                removerProdutoPrompt();
                break;
            case '4':
                modificarQuantidadePrompt();
                break;
            case '5':
                carrinho.exibirCarrinho();
                mostrarMenuPrompt();
                break;
            case '6':
                carrinho.limparCarrinho();
                mostrarMenuPrompt();
                break;
            case '7':
                finalizarCompra();
                break;
            case '0':
                console.log('\n👋 Obrigado por usar o Shopee Cart System! Volte sempre!');
                rl.close();
                break;
            default:
                console.log('\n❌ Opção inválida! Tente novamente.');
                mostrarMenuPrompt();
        }
    });
}

// Inicializar o sistema
console.log('\n🚀 Inicializando Shopee Cart System...');
console.log('💡 Sistema de carrinho de compras inspirado na Shopee');
console.log('✨ Com cálculos automáticos de totais e quantidades\n');

mostrarMenuPrompt();