package service;

import model.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class BancoServiceImpl implements BancoService {
    private List<Conta> contas = new ArrayList<>();
    private Random random = new Random();
    
    @Override
    public Conta abrirConta(Cliente cliente, TipoConta tipo) {
        String numero = String.format("%04d", random.nextInt(10000));
        Conta conta;
        
        if (tipo == TipoConta.CORRENTE) {
            conta = new ContaCorrente(numero, cliente);
        } else {
            conta = new ContaPoupanca(numero, cliente);
        }
        
        contas.add(conta);
        return conta;
    }
    
    @Override
    public boolean encerrarConta(String numeroConta) {
        Conta conta = buscarContaPorNumero(numeroConta);
        if (conta != null && conta.getSaldo() == 0) {
            contas.remove(conta);
            return true;
        }
        return false;
    }
    
    @Override
    public List<Conta> listarContas(Cliente cliente) {
        List<Conta> contasCliente = new ArrayList<>();
        for (Conta conta : contas) {
            if (conta.getCliente().getCpf().equals(cliente.getCpf())) {
                contasCliente.add(conta);
            }
        }
        return contasCliente;
    }
    
    @Override
    public void aplicarTaxasEContas() {
        for (Conta conta : contas) {
            conta.aplicarTaxa();
        }
    }
    
    public Conta buscarContaPorNumero(String numero) {
        for (Conta conta : contas) {
            if (conta.getNumero().equals(numero)) {
                return conta;
            }
        }
        return null;
    }
}