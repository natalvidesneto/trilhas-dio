// Cliente.java
package model;

public class Cliente {
    private String nome;
    private String cpf;
    private Endereco endereco; // Classe como atributo

    public Cliente(String nome, String cpf, Endereco endereco) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
    }

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    // ... outros getters e setters
    public String getCpf() {
        return cpf;
    }
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    @Override
    public String toString() {
        return "Cliente: " + nome + " (CPF: " + cpf + ")\nEndereço: " + endereco;
    }
}