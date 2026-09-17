package com.extensao.adotapet.FormularioAdocao.Service;

import com.extensao.adotapet.Animal.Animal;
import com.extensao.adotapet.Animal.AnimalRepository;
import com.extensao.adotapet.Enum.Status;
import com.extensao.adotapet.Enum.StatusAdocao;
import com.extensao.adotapet.FormularioAdocao.Dto.AdocaoOngDTO;
import com.extensao.adotapet.FormularioAdocao.Dto.RespostaItemDTO;
import com.extensao.adotapet.FormularioAdocao.Dto.RespostaRequestDTO;
import com.extensao.adotapet.FormularioAdocao.Entity.PerguntaPadrao;
import com.extensao.adotapet.FormularioAdocao.Entity.RespostaPergunta;
import com.extensao.adotapet.FormularioAdocao.Repository.PerguntaPadraoRepository;
import com.extensao.adotapet.FormularioAdocao.Repository.RespostaPerguntaRepository;
import com.extensao.adotapet.FormularioAdocao.Entity.RespostaAdocao;
import com.extensao.adotapet.FormularioAdocao.Repository.RespostaAdocaoRepository;
import com.extensao.adotapet.FormularioAdocao.Dto.AdocaoDetalhesDTO;
import com.extensao.adotapet.Usuario.Usuario;
import com.extensao.adotapet.exception.BusinessException;
import com.extensao.adotapet.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormularioAdocaoService {
    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private PerguntaPadraoRepository perguntaPadraoRepository;

    @Autowired
    private RespostaPerguntaRepository respostaPerguntaRepository;

    @Autowired
    private RespostaAdocaoRepository respostaAdocaoRepository;

    public void responder (RespostaRequestDTO dto, Usuario usuario) {

        Animal animal = animalRepository.findById(dto.getAnimalId())
                .orElseThrow(() -> new NotFoundException("Animal não encontrado"));

        if (animal.getStatus() != Status.DISPONIVEL) {
            throw new BusinessException("Este animal não está disponível para adoção");
        }

        boolean exists = respostaAdocaoRepository
                .existsByUsuarioAndAnimal(usuario, animal);

        if (exists) {
            throw new BusinessException("Você já respondeu este formulário de adoção");
        }

        RespostaAdocao respostaAdocao = new RespostaAdocao();
        respostaAdocao.setAnimal(animal);
        respostaAdocao.setUsuario(usuario);
        respostaAdocao.setStatus(StatusAdocao.EM_ANALISE);

        for (RespostaItemDTO item : dto.getRespostas()) {
            PerguntaPadrao pergunta = perguntaPadraoRepository.findById(item.getPerguntaId())
                    .orElseThrow(() -> new NotFoundException("Pergunta não encontrada"));

            RespostaPergunta rp = new RespostaPergunta();
            rp.setPergunta(pergunta);
            rp.setResposta(item.getResposta());
            rp.setRespostaAdocao(respostaAdocao);

            respostaAdocao.getRespostas().add(rp);
        }
        respostaAdocaoRepository.save(respostaAdocao);
    }

    public void atualizarStatus(Long idAdocao, StatusAdocao status, Usuario ong) {

        RespostaAdocao adocao = respostaAdocaoRepository.findById(idAdocao)
                .orElseThrow(() -> new NotFoundException("Candidatura não encontrada"));

        Animal animal = adocao.getAnimal();

        Usuario donoAnimal = animal.getOng();

        if (donoAnimal.getId() != ong.getId()) {
            throw new BusinessException("Você não tem acesso a esta candidatura");
        }

        if (adocao.getStatus() != StatusAdocao.EM_ANALISE) {
            throw new BusinessException("Essa candidatura já foi processada");
        }

        if (animal.getStatus() == Status.ADOTADO) {
            throw new BusinessException("Animal já adotado");
        }

        adocao.setStatus(status);
        respostaAdocaoRepository.save(adocao);

        if (status == StatusAdocao.APROVADO) {
            animal.setStatus(Status.ADOTADO);
            animalRepository.save(animal);
        }
    }

    public List<AdocaoOngDTO> listarAdocoesDaOng(Usuario ong) {

        return respostaAdocaoRepository.findByAnimalOng(ong)
                .stream()
                .map(adocao -> {

                    AdocaoOngDTO dto = new AdocaoOngDTO();

                    dto.setId(adocao.getId());

                    dto.setAnimalId(adocao.getAnimal().getId());
                    dto.setAnimalNome(adocao.getAnimal().getNome());
                    dto.setAnimalFoto(adocao.getAnimal().getFotos());

                    dto.setUsuarioId(adocao.getUsuario().getId());
                    dto.setUsuarioNome(adocao.getUsuario().getNome());
                    dto.setUsuarioEmail(adocao.getUsuario().getEmail());
                    dto.setUsuarioEndereco(adocao.getUsuario().getEndereco());
                    dto.setUsuarioTelefone(adocao.getUsuario().getTelefone());

                    dto.setDataResposta(adocao.getDataResposta());
                    dto.setStatus(adocao.getStatus());

                    return dto;
                })
                .toList();
    }


    public AdocaoDetalhesDTO buscarDetalhesDaAdocao(Long id, Usuario ong) {

        RespostaAdocao adocao = respostaAdocaoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Candidatura não encontrada"));

        Usuario donoAnimal = adocao.getAnimal().getOng();

        if (donoAnimal.getId() != ong.getId()) {
            throw new BusinessException("Você não tem acesso a esta candidatura");
        }

        AdocaoDetalhesDTO dto = new AdocaoDetalhesDTO();

        dto.setId(adocao.getId());

        dto.setAnimalId(adocao.getAnimal().getId());
        dto.setAnimalNome(adocao.getAnimal().getNome());
        dto.setAnimalFoto(adocao.getAnimal().getFotos());
        dto.setAnimalIdade(adocao.getAnimal().getIdade());
        dto.setAnimalSexo(adocao.getAnimal().getSexo());

        dto.setUsuarioId(adocao.getUsuario().getId());
        dto.setUsuarioNome(adocao.getUsuario().getNome());
        dto.setUsuarioEmail(adocao.getUsuario().getEmail());
        dto.setUsuarioDataNascimento(adocao.getUsuario().getDataNascimento());
        dto.setUsuarioEndereco(adocao.getUsuario().getEndereco());

        dto.setDataResposta(adocao.getDataResposta());
        dto.setStatus(adocao.getStatus());

        List<RespostaItemDTO> respostas = adocao.getRespostas()
                .stream()
                .map(resposta -> {

                    RespostaItemDTO item = new RespostaItemDTO();

                    item.setPerguntaId(resposta.getPergunta().getId());
                    item.setResposta(resposta.getResposta());

                    return item;
                })
                .toList();

        dto.setRespostas(respostas);

        return dto;
    }
}
