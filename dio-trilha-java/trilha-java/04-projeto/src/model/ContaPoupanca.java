// ContaPoupanca.java
package model;

public class ContaPoupanca extends Conta {
    private static final double RENDIMENTO = 0.005; // 0.5% ao mês

    public ContaPoupanca(String numero, Cliente cliente) {
        super(numero, cliente);
    }

    @Override
    public void aplicarTaxa() {
        double rendimento = getSaldo() * RENDIMENTO;
        depositar(rendimento);
        System.out.println("Rendimento de R$" + rendimento + " aplicado.");
    }
}
