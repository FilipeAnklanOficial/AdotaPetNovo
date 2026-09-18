package com.extensao.adotapet.Usuario;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UsuarioPerfilDTO {

    private Long id;

    private String nome;
    private String nomeOng;

    private String email;
    private String telefone;
    private String endereco;
    private String fotoPerfil;

    private String cpf;
    private LocalDate dataNascimento;

    private String cnpj;
    private String descricaoOng;

    private String tipoUsuario;
}
