package com.extensao.adotapet.Security;

import com.extensao.adotapet.Enum.TipoUsuario;
import com.extensao.adotapet.Usuario.Usuario;
import com.extensao.adotapet.Usuario.UsuarioRepository;
import com.extensao.adotapet.exception.AuthException;
import com.extensao.adotapet.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public void register(Usuario usuario) {

        if (repository.existsByEmail(usuario.getEmail())) {
            throw new ValidationException("Email já cadastrado");
        }

        usuario.setEmail(usuario.getEmail().toLowerCase().trim());

        if (usuario.getTipoUsuario() == null) {
            throw new ValidationException("Tipo de usuário obrigatório");
        }

        if (usuario.getTipoUsuario() == TipoUsuario.ROLE_ADOTANTE) {

            if (usuario.getCpf() == null || usuario.getCpf().isBlank()) {
                throw new ValidationException("CPF obrigatório para adotante");
            }
        }

        if (usuario.getTipoUsuario() == TipoUsuario.ROLE_ONG) {
            if (repository.existsByCnpj(usuario.getCnpj())){
                throw new ValidationException("já existe um usuário com o cnpj informado");
            }
            if (usuario.getCnpj() == null || usuario.getCnpj().isBlank()) {
                throw new ValidationException("CNPJ obrigatório para ONG");
            }
        }

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        repository.save(usuario);
    }

    //TODO USUARIO, NOME, CPF, EMAIL, SENHA, CONFIRMASENHA, TELEFONE, DT NASCIMENTO
    //TODO USUARIOONG NOME DO RESPONSÁVEL, EMAIL, NOME DA ONG, CNPJ, SENHA E CONFIRMAR SENHA, TELEFONE, DATA DE NASCIMENTO DO RESPONSÁVEL


    public String login(String email, String senha) {
        email = email.toLowerCase().trim();

        Usuario usuario = repository.findByEmail(email)
                .orElseThrow(() -> new AuthException("Usuário não encontrado"));

        if (!passwordEncoder.matches(senha, usuario.getSenha())) {
            throw new AuthException("Senha inválida");
        }

        return jwtUtil.generateToken(usuario);
    }
}


