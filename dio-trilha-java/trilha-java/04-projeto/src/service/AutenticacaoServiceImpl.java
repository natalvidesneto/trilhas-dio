package service;

import model.Cliente;
import java.util.HashMap;
import java.util.Map;

public class AutenticacaoServiceImpl implements AutenticacaoService {
    private Map<String, Cliente> clientes = new HashMap<>();
    private Map<String, String> credenciais = new HashMap<>();
    
    @Override
    public Cliente autenticar(String cpf, String senha) {
        if (credenciais.containsKey(cpf) && credenciais.get(cpf).equals(senha)) {
            return clientes.get(cpf);
        }
        return null;
    }
    
    @Override
    public void cadastrarCliente(Cliente cliente, String senha) {
        clientes.put(cliente.getCpf(), cliente);
        credenciais.put(cliente.getCpf(), senha);
    }
    
    @Override
    public boolean alterarSenha(String cpf, String senhaAntiga, String senhaNova) {
        if (credenciais.containsKey(cpf) && credenciais.get(cpf).equals(senhaAntiga)) {
            credenciais.put(cpf, senhaNova);
            return true;
        }
        return false;
    }
}