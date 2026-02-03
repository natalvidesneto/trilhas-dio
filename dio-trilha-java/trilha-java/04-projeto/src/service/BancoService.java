package service;

import model.Conta;
import model.Cliente;
import model.TipoConta;
import java.util.List;

public interface BancoService {
    Conta abrirConta(Cliente cliente, TipoConta tipo);
    boolean encerrarConta(String numeroConta);
    List<Conta> listarContas(Cliente cliente);
    void aplicarTaxasEContas();
    Conta buscarContaPorNumero(String numero); // Adicione esta linha
}