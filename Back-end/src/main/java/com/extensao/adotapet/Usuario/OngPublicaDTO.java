package com.extensao.adotapet.Usuario;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OngPublicaDTO {

    private Long id;
    private String nomeOng;
    private String nome;
    private String email;
    private String telefone;
    private String endereco;
    private String fotoPerfil;
    private LocalDate dataNascimento;
    private String cnpj;
    private String descricaoOng;
}