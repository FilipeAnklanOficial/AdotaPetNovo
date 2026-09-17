package com.extensao.adotapet.FormularioAdocao.Dto;

import com.extensao.adotapet.Enum.Idade;
import com.extensao.adotapet.Enum.Sexo;
import com.extensao.adotapet.Enum.StatusAdocao;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class AdocaoDetalhesDTO {

    private Long id;

    private Long animalId;
    private String animalNome;
    private String animalFoto;
    private Idade animalIdade;
    private Sexo animalSexo;

    private Long usuarioId;
    private String usuarioNome;
    private String usuarioEmail;
    private LocalDate usuarioDataNascimento;
    private String usuarioEndereco;

    private LocalDateTime dataResposta;
    private StatusAdocao status;

    private List<RespostaItemDTO> respostas;
}