# Diagrama de Classes - Modelo Entidade-Relacionamento

```mermaid
classDiagram
    %% Entidade Principal Cliente
    class Cliente {
        -Long id
        -String nome
        -String email
        -String telefone
        -LocalDateTime dataCadastro
        -char tipo
        +adicionarEndereco()
        +fazerPedido()
    }

    %% Especializações do Cliente
    class ClientePF {
        -String cpf
        -LocalDate dataNascimento
    }

    class ClientePJ {
        -String cnpj
        -String razaoSocial
        -String nomeFantasia
        -String inscricaoEstadual
    }

    %% Entidade Endereço
    class Endereco {
        -Long id
        -String logradouro
        -String numero
        -String complemento
        -String bairro
        -String cidade
        -String estado
        -String cep
        -TipoEndereco tipo
        +validarCEP()
    }

    %% Entidade Pedido
    class Pedido {
        -Long id
        -LocalDateTime dataPedido
        -StatusPedido status
        -BigDecimal valorTotal
        -String observacoes
        +calcularTotal()
        +atualizarStatus()
    }

    %% Entidade ItemPedido (Tabela Associativa)
    class ItemPedido {
        -Long id
        -Integer quantidade
        -BigDecimal precoUnitario
        -BigDecimal subtotal
        +calcularSubtotal()
    }

    %% Entidade Produto
    class Produto {
        -Long id
        -String nome
        -String descricao
        -BigDecimal preco
        -String categoria
        -Integer estoque
        -String sku
        +atualizarEstoque()
        +validarDisponibilidade()
    }

    %% Entidade Fornecedor
    class Fornecedor {
        -Long id
        -String nome
        -String cnpj
        -String telefone
        -String email
        +validarCNPJ()
    }

    %% Entidade Pagamento (Classe Abstrata)
    class Pagamento {
        <<abstract>>
        -Long id
        -BigDecimal valor
        -LocalDateTime dataPagamento
        -StatusPagamento status
        +processarPagamento()*
        +validarPagamento()*
    }

    %% Especializações de Pagamento
    class PagamentoCartao {
        -String numeroCartao
        -String nomeTitular
        -String validade
        -String cvv
        -String bandeira
        +processarPagamento()
        +validarCartao()
    }

    class PagamentoBoleto {
        -String numeroBoleto
        -LocalDate dataVencimento
        +processarPagamento()
        +gerarCodigoBarras()
    }

    class PagamentoPix {
        -String chavePix
        -String transacaoId
        +processarPagamento()
        +gerarQRCode()
    }

    %% Entidade Entrega
    class Entrega {
        -Long id
        -String codigoRastreio
        -StatusEntrega status
        -LocalDateTime dataEnvio
        -LocalDateTime dataPrevista
        -LocalDateTime dataEntrega
        -String transportadora
        +atualizarStatus()
        +calcularPrevisao()
    }

    %% ENUMS
    class TipoEndereco {
        <<enum>>
        COBRANCA
        ENTREGA
    }

    class StatusPedido {
        <<enum>>
        PENDENTE
        PROCESSANDO
        ENVIADO
        ENTREGUE
        CANCELADO
    }

    class StatusPagamento {
        <<enum>>
        PENDENTE
        APROVADO
        RECUSADO
        ESTORNADO
    }

    class StatusEntrega {
        <<enum>>
        PREPARANDO
        ENVIADO
        EM_TRANSITO
        ENTREGUE
        ATRASADO
    }

    %% RELACIONAMENTOS
    Cliente <|-- ClientePF
    Cliente <|-- ClientePJ
    Cliente "1" -- "*" Endereco : possui
    Cliente "1" -- "*" Pedido : realiza
    
    Pedido "1" -- "*" ItemPedido : contém
    ItemPedido "1" -- "1" Produto : refere-se
    Pedido "1" -- "*" Pagamento : possui
    Pedido "1" -- "1" Entrega : tem
    
    Pagamento <|-- PagamentoCartao
    Pagamento <|-- PagamentoBoleto
    Pagamento <|-- PagamentoPix
    
    Produto "*" -- "1" Fornecedor : fornecido-por
```

## Descrição das Classes e Relacionamentos

### Herança e Especialização
- **Cliente** → Classe base abstrata
- **ClientePF** e **ClientePJ** → Herdam de Cliente
- **Pagamento** → Classe abstrata para formas de pagamento
- **PagamentoCartao**, **PagamentoBoleto**, **PagamentoPix** → Herdam de Pagamento

### Relacionamentos de Composição
- **Cliente 1:N Endereco** → Um cliente possui múltiplos endereços
- **Cliente 1:N Pedido** → Um cliente realiza múltiplos pedidos
- **Pedido 1:N ItemPedido** → Um pedido contém múltiplos itens
- **Pedido 1:N Pagamento** → Um pedido pode ter múltiplos pagamentos

### Relacionamentos de Associação
- **ItemPedido N:1 Produto** → Itens referenciam produtos
- **Produto N:1 Fornecedor** → Produtos são fornecidos por fornecedores
- **Pedido 1:1 Entrega** → Cada pedido tem uma entrega

### Atributos Chave
- Todas as classes possuem **ID** como identificador único
- **Valores monetários** usam BigDecimal para precisão
- **Datas** usam LocalDateTime/LocalDate
- **Enums** para status e tipos fixos