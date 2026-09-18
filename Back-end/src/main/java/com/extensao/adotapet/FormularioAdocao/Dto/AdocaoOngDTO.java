package com.extensao.adotapet.FormularioAdocao.Dto;

import com.extensao.adotapet.Enum.StatusAdocao;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AdocaoOngDTO {

    private Long id;

    private Long animalId;
    private String animalNome;
    private String animalFoto;

    private Long usuarioId;
    private String usuarioNome;
    private String usuarioEmail;
    private String usuarioEndereco;
    private String usuarioTelefone;

    private LocalDateTime dataResposta;

    private StatusAdocao status;
}