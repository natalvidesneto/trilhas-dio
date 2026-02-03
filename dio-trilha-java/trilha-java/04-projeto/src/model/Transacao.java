// Transacao.java
package model;

import java.time.LocalDateTime;

public class Transacao {
    private TipoTransacao tipo;
    private double valor;
    private LocalDateTime dataHora;
    private String contaRelacionada; // Para transferências

    public Transacao(TipoTransacao tipo, double valor) {
        this(tipo, valor, null);
    }

    public Transacao(TipoTransacao tipo, double valor, String contaRelacionada) {
        this.tipo = tipo;
        this.valor = valor;
        this.dataHora = LocalDateTime.now();
        this.contaRelacionada = contaRelacionada;
    }

    // Getters
    public TipoTransacao getTipo() {
        return tipo;
    }

    public double getValor() {
        return valor;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public String getContaRelacionada() {
        return contaRelacionada;
    }

    @Override
    public String toString() {
        String descricao = dataHora + " - " + tipo.getDescricao() + ": R$" + Math.abs(valor);
        if (contaRelacionada != null) {
            descricao += " (" + (valor > 0 ? "recebido de " : "enviado para ") + contaRelacionada + ")";
        }
        return descricao;
    }
}