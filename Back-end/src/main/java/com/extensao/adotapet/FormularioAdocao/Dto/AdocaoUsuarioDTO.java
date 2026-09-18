package com.extensao.adotapet.FormularioAdocao.Dto;

import com.extensao.adotapet.Enum.StatusAdocao;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AdocaoUsuarioDTO {

    private Long id;
    private Long animalId;
    private String animalNome;
    private String animalFoto;
    private LocalDateTime dataResposta;
    private StatusAdocao status;
}