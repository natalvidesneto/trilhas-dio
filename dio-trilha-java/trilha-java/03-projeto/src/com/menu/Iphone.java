package com.menu;

import com.apps.AparelhoTelefonico;
import com.apps.NavegadorInternet;
import com.apps.ReprodutorMusical;

// iPhone.java
public class Iphone implements ReprodutorMusical, AparelhoTelefonico, NavegadorInternet {
    // Atributos
    private String modelo;
    private String numeroSerie;
    
    // Construtor
    public Iphone(String modelo, String numeroSerie) {
        this.modelo = modelo;
        this.numeroSerie = numeroSerie;
    }
    
    // Métodos de ReprodutorMusical
    @Override
    public void tocar() {
        System.out.println("Tocando música...");
    }
    
    @Override
    public void pausar() {
        System.out.println("Música pausada.");
    }
    
    @Override
    public void selecionarMusica(String musica) {
        System.out.println("Música selecionada: " + musica);
    }
    
    // Métodos de AparelhoTelefonico
    @Override
    public void ligar(String numero) {
        System.out.println("Ligando para: " + numero);
    }
    
    @Override
    public void atender() {
        System.out.println("Chamada atendida.");
    }
    
    @Override
    public void iniciarCorreioVoz() {
        System.out.println("Correio de voz iniciado.");
    }
    
    // Métodos de NavegadorInternet
    @Override
    public void exibirPagina(String url) {
        System.out.println("Exibindo página: " + url);
    }
    
    @Override
    public void adicionarNovaAba() {
        System.out.println("Nova aba adicionada.");
    }
    
    @Override
    public void atualizarPagina() {
        System.out.println("Página atualizada.");
    }
    
    // Getters e Setters
    public String getModelo() {
        return modelo;
    }
    
    public String getNumeroSerie() {
        return numeroSerie;
    }
}
