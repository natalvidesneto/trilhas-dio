```mermaid
classDiagram
    direction TB
    
    %% Entidades Principais
    class Cliente {
        -idCliente: Long
        -nome: String
        -telefone: String
        -email: String
        -endereco: String
        +adicionarVeiculo(veiculo: Veiculo): void
        +getVeiculos(): List~Veiculo~
    }
    
    class Veiculo {
        -idVeiculo: Long
        -placa: String
        -marca: String
        -modelo: String
        -ano: Integer
        -cor: String
        +getOrdensServico(): List~OrdemServico~
    }
    
    class OrdemServico {
        -idOs: Long
        -numeroOs: String
        -dataEmissao: LocalDateTime
        -dataConclusaoPrevista: LocalDate
        -dataConclusaoReal: LocalDate
        -valorTotal: BigDecimal
        -status: StatusOS
        -observacoes: String
        +calcularValorTotal(): BigDecimal
        +autorizarServicos(): void
        +concluirOS(): void
    }
    
    class StatusOS {
        <<enumeration>>
        ABERTA
        AUTORIZADA
        EM_ANDAMENTO
        CONCLUIDA
        CANCELADA
    }
    
    class Equipe {
        -idEquipe: Long
        -nomeEquipe: String
        -especialidadePrincipal: String
        +adicionarMecanico(mecanico: Mecanico): void
        +getMecanicos(): List~Mecanico~
    }
    
    class Mecanico {
        -idMecanico: Long
        -codigoMecanico: String
        -nome: String
        -endereco: String
        -especialidade: String
        -telefone: String
    }
    
    class Servico {
        -idServico: Long
        -descricao: String
        -tempoMedioExecucao: Integer
        -categoria: String
        +getPrecoAtual(): BigDecimal
    }
    
    class TabelaPrecos {
        -idTabela: Long
        -valorMaoObra: BigDecimal
        -dataVigencia: LocalDate
    }
    
    class ItemOS {
        -idItemOs: Long
        -valorServico: BigDecimal
        -observacoes: String
        +calcularValorTotal(): BigDecimal
    }
    
    class Peca {
        -idPeca: Long
        -descricao: String
        -marca: String
        -modeloCompativel: String
        -precoCusto: BigDecimal
        -precoVenda: BigDecimal
        -quantidadeEstoque: Integer
        +verificarDisponibilidade(quantidade: Integer): boolean
        +atualizarEstoque(quantidade: Integer): void
    }
    
    class ItemPeca {
        -idItemPeca: Long
        -quantidade: Integer
        -valorUnitario: BigDecimal
        -valorTotal: BigDecimal
        +calcularValorTotal(): void
    }
    
    %% Relacionamentos
    Cliente "1" --> "*" Veiculo : possui
    Veiculo "1" --> "*" OrdemServico : possui histórico
    OrdemServico "1" --> "*" ItemOS : contém
    Equipe "1" --> "*" Mecanico : compõe
    Equipe "1" --> "*" OrdemServico : atende
    Servico "1" --> "*" ItemOS : é executado em
    Servico "1" --> "*" TabelaPrecos : tem preços
    ItemOS "1" --> "*" ItemPeca : utiliza
    Peca "1" --> "*" ItemPeca : é utilizada em
    OrdemServico --> StatusOS : possui
```

# Esquema Conceitual para Sistema de Oficina Mecânica

## 📋 Descrição do Projeto

Este projeto consiste na criação de um esquema conceitual para um sistema de controle e gerenciamento de execução de ordens de serviço em uma oficina mecânica. O sistema foi modelado com base na narrativa fornecida, contemplando todas as entidades, relacionamentos e atributos necessários para o funcionamento adequado do contexto descrito.

## 🎯 Contexto do Sistema

O sistema gerencia o fluxo completo de atendimento em uma oficina mecânica, desde o momento em que clientes levam seus veículos para conserto ou revisão periódica até a conclusão dos serviços e fechamento da ordem de serviço.

## 🗃️ Entidades e Atributos

### 1. CLIENTE
- **id_cliente** (PK)
- nome
- telefone
- email
- endereço

### 2. VEÍCULO
- **id_veiculo** (PK)
- id_cliente (FK)
- placa
- marca
- modelo
- ano
- cor

### 3. ORDEM_SERVIÇO (OS)
- **id_os** (PK)
- id_veiculo (FK)
- id_equipe (FK)
- numero_os
- data_emissao
- data_conclusao_prevista
- data_conclusao_real
- valor_total
- status (Aberta/Em Andamento/Concluída/Autorizada/Cancelada)
- observacoes

### 4. EQUIPE
- **id_equipe** (PK)
- nome_equipe
- especialidade_principal

### 5. MECÂNICO
- **id_mecanico** (PK)
- id_equipe (FK)
- codigo_mecanico
- nome
- endereco
- especialidade
- telefone

### 6. SERVIÇO
- **id_servico** (PK)
- descricao
- tempo_medio_execucao
- categoria

### 7. TABELA_PREÇOS
- **id_tabela** (PK)
- id_servico (FK)
- valor_mao_obra
- data_vigencia

### 8. ITEM_OS
- **id_item_os** (PK)
- id_os (FK)
- id_servico (FK)
- valor_servico
- observacoes

### 9. PEÇA
- **id_peca** (PK)
- descricao
- marca
- modelo_compativel
- preco_custo
- preco_venda
- quantidade_estoque

### 10. ITEM_PEÇA
- **id_item_peca** (PK)
- id_item_os (FK)
- id_peca (FK)
- quantidade
- valor_unitario
- valor_total

## 🔄 Relacionamentos

1. **CLIENTE - VEÍCULO** (1:N)
   - Um cliente pode possuir vários veículos
   - Um veículo pertence a um único cliente

2. **VEÍCULO - ORDEM_SERVIÇO** (1:N)
   - Um veículo pode ter várias ordens de serviço
   - Uma ordem de serviço refere-se a um único veículo

3. **EQUIPE - ORDEM_SERVIÇO** (1:N)
   - Uma equipe pode atender várias ordens de serviço
   - Uma ordem de serviço é designada a uma única equipe

4. **EQUIPE - MECÂNICO** (1:N)
   - Uma equipe é composta por vários mecânicos
   - Um mecânico pertence a uma única equipe

5. **ORDEM_SERVIÇO - ITEM_OS** (1:N)
   - Uma OS contém vários itens de serviço
   - Um item de serviço pertence a uma única OS

6. **SERVIÇO - ITEM_OS** (1:N)
   - Um serviço pode aparecer em vários itens de OS
   - Um item de OS refere-se a um único serviço

7. **SERVIÇO - TABELA_PREÇOS** (1:N)
   - Um serviço pode ter vários preços ao longo do tempo
   - Um preço na tabela refere-se a um único serviço

8. **ITEM_OS - ITEM_PEÇA** (1:N)
   - Um item de OS pode utilizar várias peças
   - Um item de peça está associado a um único item de OS

9. **PEÇA - ITEM_PEÇA** (1:N)
   - Uma peça pode ser utilizada em vários itens
   - Um item de peça refere-se a uma única peça

## 💡 Decisões de Projeto e Pressupostos

### Decisões Tomadas:
1. **Separação entre Serviço e Tabela de Preços**: Permite histórico de preços e diferentes valores ao longo do tempo
2. **Estrutura de Itens**: Separação entre serviços e peças para melhor controle
3. **Status da OS**: Incluído para acompanhamento do fluxo de trabalho
4. **Equipes de Mecânicos**: Organização dos profissionais por especialidade

### Pressupostos Adotados:
1. Um veículo é sempre atendido por uma equipe completa, não por mecânicos individuais
2. A autorização do cliente é registrada no nível da OS, não por item individual
3. A tabela de preços mantém histórico para consulta de valores em diferentes períodos
4. O estoque de peças é controlado pelo sistema
5. Mecânicos podem ter múltiplas especialidades (atributo como texto)

## 🚀 Funcionalidades Principais

1. Controle completo de ordens de serviço
2. Gestão de clientes e veículos
3. Administração de equipes e mecânicos
4. Controle de estoque de peças
5. Cálculo automático de valores baseado em tabelas de preços
6. Acompanhamento do status dos serviços
7. Histórico de serviços por veículo

Este esquema conceitual fornece uma base sólida para o desenvolvimento de um sistema completo de gerenciamento de oficina mecânica, atendendo a todos os requisitos da narrativa fornecida.