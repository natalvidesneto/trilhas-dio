// Endereco.java
package model;

public class Endereco {
    private String rua;
    private String numero;
    private String cidade;
    private String estado;

    public Endereco(String rua, String numero, String cidade, String estado) {
        this.rua = rua;
        this.numero = numero;
        this.cidade = cidade;
        this.estado = estado;
    }

    // Getters e Setters (encapsulamento)
    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    // ... outros getters e setters

    @Override
    public String toString() {
        return rua + ", " + numero + " - " + cidade + "/" + estado;
    }
}