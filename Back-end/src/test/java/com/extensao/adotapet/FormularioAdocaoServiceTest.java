package com.extensao.adotapet.FormularioAdocao;

import com.extensao.adotapet.Animal.Animal;
import com.extensao.adotapet.Animal.AnimalRepository;
import com.extensao.adotapet.Enum.*;
import com.extensao.adotapet.FormularioAdocao.Dto.RespostaItemDTO;
import com.extensao.adotapet.FormularioAdocao.Dto.RespostaRequestDTO;
import com.extensao.adotapet.FormularioAdocao.Entity.PerguntaPadrao;
import com.extensao.adotapet.FormularioAdocao.Repository.PerguntaPadraoRepository;
import com.extensao.adotapet.FormularioAdocao.Repository.RespostaAdocaoRepository;
import com.extensao.adotapet.FormularioAdocao.Service.FormularioAdocaoService;
import com.extensao.adotapet.Usuario.Usuario;
import com.extensao.adotapet.exception.BusinessException;
import com.extensao.adotapet.exception.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FormularioAdocaoServiceTest {

    @Mock
    private AnimalRepository animalRepository;

    @Mock
    private PerguntaPadraoRepository perguntaPadraoRepository;

    @Mock
    private RespostaAdocaoRepository respostaAdocaoRepository;

    @InjectMocks
    private FormularioAdocaoService service;

    private Usuario adotante;
    private Usuario ong;
    private Animal animal;
    private PerguntaPadrao pergunta;

    @BeforeEach
    void configurar() {
        adotante = new Usuario();
        adotante.setId(1L);
        adotante.setNome("João");
        adotante.setEmail("joao@email.com");
        adotante.setTipoUsuario(TipoUsuario.ROLE_ADOTANTE);

        ong = new Usuario();
        ong.setId(2L);
        ong.setNomeOng("ONG Amigos");
        ong.setEmail("ong@email.com");
        ong.setTipoUsuario(TipoUsuario.ROLE_ONG);

        animal = new Animal();
        animal.setId(1L);
        animal.setNome("Rex");
        animal.setStatus(Status.DISPONIVEL);
        animal.setOng(ong);

        pergunta = new PerguntaPadrao();
        pergunta.setId(1L);
    }

    private RespostaRequestDTO criarDto() {
        RespostaItemDTO item = new RespostaItemDTO();
        item.setPerguntaId(1L);
        item.setResposta("Tenho espaço adequado para o animal.");

        RespostaRequestDTO dto = new RespostaRequestDTO();
        dto.setAnimalId(1L);
        dto.setRespostas(List.of(item));

        return dto;
    }

    @Test
    void devePermitirAdotanteResponderFormulario() {
        RespostaRequestDTO dto = criarDto();

        when(animalRepository.findById(1L))
                .thenReturn(Optional.of(animal));

        when(respostaAdocaoRepository.existsByUsuarioAndAnimal(adotante, animal))
                .thenReturn(false);

        when(perguntaPadraoRepository.findById(1L))
                .thenReturn(Optional.of(pergunta));

        service.responder(dto, adotante);

        verify(respostaAdocaoRepository).save(any());
    }

    @Test
    void naoDevePermitirOngResponderFormulario() {
        RespostaRequestDTO dto = criarDto();

        assertThrows(
                BusinessException.class,
                () -> service.responder(dto, ong)
        );

        verify(animalRepository, never()).findById(anyLong());
        verify(respostaAdocaoRepository, never()).save(any());
    }

    @Test
    void deveLancarErroQuandoAnimalNaoForEncontrado() {
        RespostaRequestDTO dto = criarDto();

        when(animalRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThrows(
                NotFoundException.class,
                () -> service.responder(dto, adotante)
        );

        verify(respostaAdocaoRepository, never()).save(any());
    }

    @Test
    void naoDevePermitirAdocaoDeAnimalIndisponivel() {
        RespostaRequestDTO dto = criarDto();

        animal.setStatus(Status.ADOTADO);

        when(animalRepository.findById(1L))
                .thenReturn(Optional.of(animal));

        assertThrows(
                BusinessException.class,
                () -> service.responder(dto, adotante)
        );

        verify(respostaAdocaoRepository, never()).save(any());
    }

    @Test
    void naoDevePermitirResponderAnimalNovamente() {
        RespostaRequestDTO dto = criarDto();

        when(animalRepository.findById(1L))
                .thenReturn(Optional.of(animal));

        when(respostaAdocaoRepository.existsByUsuarioAndAnimal(adotante, animal))
                .thenReturn(true);

        assertThrows(
                BusinessException.class,
                () -> service.responder(dto, adotante)
        );

        verify(respostaAdocaoRepository, never()).save(any());
    }

    @Test
    void deveLancarErroQuandoPerguntaNaoForEncontrada() {
        RespostaRequestDTO dto = criarDto();

        when(animalRepository.findById(1L))
                .thenReturn(Optional.of(animal));

        when(respostaAdocaoRepository.existsByUsuarioAndAnimal(adotante, animal))
                .thenReturn(false);

        when(perguntaPadraoRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThrows(
                NotFoundException.class,
                () -> service.responder(dto, adotante)
        );

        verify(respostaAdocaoRepository, never()).save(any());
    }
}