// AutenticacaoService.java
package service;

import model.Cliente;

public interface AutenticacaoService {
    Cliente autenticar(String cpf, String senha);
    void cadastrarCliente(Cliente cliente, String senha);
    boolean alterarSenha(String cpf, String senhaAntiga, String senhaNova);
}
