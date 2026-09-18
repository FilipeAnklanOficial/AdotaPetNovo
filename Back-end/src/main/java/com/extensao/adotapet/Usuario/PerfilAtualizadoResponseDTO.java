package com.extensao.adotapet.Usuario;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PerfilAtualizadoResponseDTO {

    private UsuarioPerfilDTO perfil;
    private String token;

    public PerfilAtualizadoResponseDTO(
            UsuarioPerfilDTO perfil,
            String token
    ) {
        this.perfil = perfil;
        this.token = token;
    }
}