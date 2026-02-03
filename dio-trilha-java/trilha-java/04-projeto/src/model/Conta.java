// Conta.java (classe abstrata)
package model;

import java.util.ArrayList;
import java.util.List;

public abstract class Conta {
    private String numero;
    private double saldo;
    private Cliente cliente;
    private List<Transacao> transacoes; // Composição de objetos

    public Conta(String numero, Cliente cliente) {
        this.numero = numero;
        this.cliente = cliente;
        this.saldo = 0.0;
        this.transacoes = new ArrayList<>();
    }

    // Métodos abstratos (obrigam implementação nas classes filhas)
    public abstract void aplicarTaxa();

    // Métodos concretos
    public void depositar(double valor) {
        if (valor > 0) {
            saldo += valor;
            transacoes.add(new Transacao(TipoTransacao.DEPOSITO, valor));
        }
    }

    public boolean sacar(double valor) {
        if (valor > 0 && saldo >= valor) {
            saldo -= valor;
            transacoes.add(new Transacao(TipoTransacao.SAQUE, -valor));
            return true;
        }
        return false;
    }

    public boolean transferir(Conta destino, double valor) {
        if (sacar(valor)) {
            destino.depositar(valor);
            transacoes.add(new Transacao(TipoTransacao.TRANSFERENCIA, -valor, destino.getNumero()));
            destino.transacoes.add(new Transacao(TipoTransacao.TRANSFERENCIA, valor, this.numero));
            return true;
        }
        return false;
    }

    // Getters e Setters
    public String getNumero() {
        return numero;
    }

    public double getSaldo() {
        return saldo;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public List<Transacao> getTransacoes() {
        return new ArrayList<>(transacoes); // Retorna cópia para encapsulamento
    }

    @Override
    public String toString() {
        return "Conta " + numero + " - Saldo: " + saldo;
    }
}
