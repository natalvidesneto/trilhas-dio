// ContaCorrente.java
package model;

public class ContaCorrente extends Conta {
    private static final double TAXA_MANUTENCAO = 10.0;

    public ContaCorrente(String numero, Cliente cliente) {
        super(numero, cliente);
    }

    @Override
    public void aplicarTaxa() {
        if (getSaldo() < TAXA_MANUTENCAO) {
            System.out.println("Saldo insuficiente para cobrança de taxa de manutenção!");
        } else {
            sacar(TAXA_MANUTENCAO);
            System.out.println("Taxa de manutenção de R$" + TAXA_MANUTENCAO + " aplicada.");
        }
    }
}
