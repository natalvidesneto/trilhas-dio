package com.iphone;

import com.menu.Iphone;

// Main.java
public class Main {
    public static void main(String[] args) {
        Iphone meuIphone = new Iphone("iPhone 15", "123456789");
        
        // Testando Reprodutor Musical
        System.out.println("--- Reprodutor Musical ---");
        meuIphone.selecionarMusica("Bohemian Rhapsody");
        meuIphone.tocar();
        meuIphone.pausar();
        
        // Testando Aparelho Telefônico
        System.out.println("\n--- Aparelho Telefônico ---");
        meuIphone.ligar("987654321");
        meuIphone.atender();
        meuIphone.iniciarCorreioVoz();
        
        // Testando Navegador Internet
        System.out.println("\n--- Navegador Internet ---");
        meuIphone.exibirPagina("https://www.example.com");
        meuIphone.adicionarNovaAba();
        meuIphone.atualizarPagina();
    }
}
