// BancoDigitalApp.java

import model.*;
import service.*;
import util.Formatador;

import java.util.List;
import java.util.Scanner;

public class BancoDigitalApp {
    private static Scanner scanner = new Scanner(System.in);
    private static AutenticacaoService autenticacaoService;
    private static BancoService bancoService;
    private static Cliente clienteLogado;

    public static void main(String[] args) {
        inicializarServicos();
        exibirMenuPrincipal();
    }

    private static void inicializarServicos() {
        // Inicializar serviços (na prática, seria com injeção de dependência)
        autenticacaoService = new AutenticacaoServiceImpl();
        bancoService = new BancoServiceImpl();
    }

    private static void exibirMenuPrincipal() {
        while (true) {
            System.out.println("\n=== BANCO DIGITAL ===");
            System.out.println("1. Login");
            System.out.println("2. Cadastrar");
            System.out.println("3. Sair");
            System.out.print("Escolha uma opção: ");

            int opcao = scanner.nextInt();
            scanner.nextLine(); // Limpar buffer

            switch (opcao) {
                case 1:
                    fazerLogin();
                    break;
                case 2:
                    cadastrarCliente();
                    break;
                case 3:
                    System.out.println("Obrigado por usar o Banco Digital!");
                    System.exit(0);
                default:
                    System.out.println("Opção inválida!");
            }
        }
    }

    private static void fazerLogin() {
        System.out.print("\nCPF: ");
        String cpf = scanner.nextLine();
        System.out.print("Senha: ");
        String senha = scanner.nextLine();

        clienteLogado = autenticacaoService.autenticar(cpf, senha);
        if (clienteLogado != null) {
            exibirMenuCliente();
        } else {
            System.out.println("CPF ou senha inválidos!");
        }
    }

    private static void cadastrarCliente() {
        System.out.println("\n=== CADASTRO DE CLIENTE ===");
        
        System.out.print("Nome: ");
        String nome = scanner.nextLine();
        
        System.out.print("CPF: ");
        String cpf = scanner.nextLine();
        
        System.out.println("\nEndereço:");
        System.out.print("Rua: ");
        String rua = scanner.nextLine();
        
        System.out.print("Número: ");
        String numero = scanner.nextLine();
        
        System.out.print("Cidade: ");
        String cidade = scanner.nextLine();
        
        System.out.print("Estado: ");
        String estado = scanner.nextLine();
        
        System.out.print("Senha: ");
        String senha = scanner.nextLine();

        Endereco endereco = new Endereco(rua, numero, cidade, estado);
        Cliente novoCliente = new Cliente(nome, cpf, endereco);
        
        autenticacaoService.cadastrarCliente(novoCliente, senha);
        System.out.println("Cliente cadastrado com sucesso!");
    }

    private static void exibirMenuCliente() {
        while (clienteLogado != null) {
            System.out.println("\n=== BEM-VINDO, " + clienteLogado.getNome() + " ===");
            System.out.println("1. Abrir nova conta");
            System.out.println("2. Minhas contas");
            System.out.println("3. Realizar depósito");
            System.out.println("4. Realizar saque");
            System.out.println("5. Realizar transferência");
            System.out.println("6. Extrato");
            System.out.println("7. Alterar senha");
            System.out.println("8. Logout");
            System.out.print("Escolha uma opção: ");

            int opcao = scanner.nextInt();
            scanner.nextLine(); // Limpar buffer

            switch (opcao) {
                case 1:
                    abrirConta();
                    break;
                case 2:
                    listarContas();
                    break;
                case 3:
                    realizarDeposito();
                    break;
                case 4:
                    realizarSaque();
                    break;
                case 5:
                    realizarTransferencia();
                    break;
                case 6:
                    exibirExtrato();
                    break;
                case 7:
                    alterarSenha();
                    break;
                case 8:
                    clienteLogado = null;
                    System.out.println("Logout realizado com sucesso!");
                    return;
                default:
                    System.out.println("Opção inválida!");
            }
        }
    }

    private static void abrirConta() {
        System.out.println("\n=== ABRIR CONTA ===");
        System.out.println("1. Conta Corrente");
        System.out.println("2. Conta Poupança");
        System.out.print("Escolha o tipo de conta: ");
        
        int tipo = scanner.nextInt();
        scanner.nextLine();
        
        TipoConta tipoConta = (tipo == 1) ? TipoConta.CORRENTE : TipoConta.POUPANCA;
        Conta novaConta = bancoService.abrirConta(clienteLogado, tipoConta);
        
        System.out.println("Conta " + novaConta.getNumero() + " aberta com sucesso!");
    }

    // Implementar outros métodos (realizarDeposito, realizarSaque, etc.)
    // ...
        private static void listarContas() {
        System.out.println("\n=== MINHAS CONTAS ===");
        List<Conta> contas = bancoService.listarContas(clienteLogado);
        
        if (contas.isEmpty()) {
            System.out.println("Você não possui contas abertas.");
            return;
        }
        
        for (int i = 0; i < contas.size(); i++) {
            Conta conta = contas.get(i);
            System.out.printf("%d. %s - %s - Saldo: R$%.2f\n",
                    i + 1,
                    conta.getNumero(),
                    conta instanceof ContaCorrente ? "Conta Corrente" : "Conta Poupança",
                    conta.getSaldo());
        }
    }

    private static void realizarDeposito() {
        System.out.println("\n=== DEPÓSITO ===");
        Conta conta = selecionarConta();
        if (conta == null) return;
        
        System.out.print("Valor a depositar: R$");
        double valor = scanner.nextDouble();
        scanner.nextLine();
        
        conta.depositar(valor);
        System.out.printf("Depósito de R$%.2f realizado com sucesso na conta %s!\n", valor, conta.getNumero());
        System.out.printf("Novo saldo: R$%.2f\n", conta.getSaldo());
    }

    private static void realizarSaque() {
        System.out.println("\n=== SAQUE ===");
        Conta conta = selecionarConta();
        if (conta == null) return;
        
        System.out.print("Valor a sacar: R$");
        double valor = scanner.nextDouble();
        scanner.nextLine();
        
        if (conta.sacar(valor)) {
            System.out.printf("Saque de R$%.2f realizado com sucesso na conta %s!\n", valor, conta.getNumero());
            System.out.printf("Novo saldo: R$%.2f\n", conta.getSaldo());
        } else {
            System.out.println("Saldo insuficiente ou valor inválido para saque.");
        }
    }

    private static void realizarTransferencia() {
        System.out.println("\n=== TRANSFERÊNCIA ===");
        Conta origem = selecionarConta();
        if (origem == null) return;
        
        System.out.print("Número da conta destino: ");
        String numeroDestino = scanner.nextLine();
        
        Conta destino = bancoService.buscarContaPorNumero(numeroDestino);
        if (destino == null) {
            System.out.println("Conta destino não encontrada.");
            return;
        }
        
        System.out.print("Valor a transferir: R$");
        double valor = scanner.nextDouble();
        scanner.nextLine();
        
        if (origem.transferir(destino, valor)) {
            System.out.printf("Transferência de R$%.2f para conta %s realizada com sucesso!\n", valor, destino.getNumero());
            System.out.printf("Novo saldo: R$%.2f\n", origem.getSaldo());
        } else {
            System.out.println("Transferência não realizada. Verifique o saldo e o valor informado.");
        }
    }

    private static void exibirExtrato() {
        System.out.println("\n=== EXTRATO ===");
        Conta conta = selecionarConta();
        if (conta == null) return;
        
        System.out.println("\nExtrato da conta " + conta.getNumero());
        System.out.println("Cliente: " + conta.getCliente().getNome());
        System.out.printf("Saldo atual: R$%.2f\n\n", conta.getSaldo());
        
        List<Transacao> transacoes = conta.getTransacoes();
        if (transacoes.isEmpty()) {
            System.out.println("Nenhuma transação realizada ainda.");
            return;
        }
        
        System.out.println("Data/Hora               | Operação        | Valor (R$) | Detalhes");
        System.out.println("---------------------------------------------------------------");
        for (Transacao t : transacoes) {
            System.out.printf("%-20s | %-15s | %10.2f | %s\n",
                    Formatador.formatarData(t.getDataHora()),
                    t.getTipo().getDescricao(),
                    t.getValor(),
                    t.getContaRelacionada() != null ? "Conta: " + t.getContaRelacionada() : "");
        }
    }

    private static void alterarSenha() {
        System.out.println("\n=== ALTERAR SENHA ===");
        System.out.print("Senha atual: ");
        String senhaAtual = scanner.nextLine();
        
        System.out.print("Nova senha: ");
        String novaSenha = scanner.nextLine();
        
        System.out.print("Confirme a nova senha: ");
        String confirmacao = scanner.nextLine();
        
        if (!novaSenha.equals(confirmacao)) {
            System.out.println("As senhas não coincidem!");
            return;
        }
        
        if (autenticacaoService.alterarSenha(clienteLogado.getCpf(), senhaAtual, novaSenha)) {
            System.out.println("Senha alterada com sucesso!");
        } else {
            System.out.println("Não foi possível alterar a senha. Verifique a senha atual.");
        }
    }

    private static Conta selecionarConta() {
        List<Conta> contas = bancoService.listarContas(clienteLogado);
        
        if (contas.isEmpty()) {
            System.out.println("Você não possui contas abertas.");
            return null;
        }
        
        System.out.println("\nSelecione uma conta:");
        for (int i = 0; i < contas.size(); i++) {
            System.out.printf("%d. %s - Saldo: R$%.2f\n",
                    i + 1,
                    contas.get(i).getNumero(),
                    contas.get(i).getSaldo());
        }
        
        System.out.print("Opção: ");
        int opcao = scanner.nextInt();
        scanner.nextLine();
        
        if (opcao < 1 || opcao > contas.size()) {
            System.out.println("Opção inválida!");
            return null;
        }
        
        return contas.get(opcao - 1);
    }
}