package com.extensao.adotapet.FormularioAdocao.Controller;

import com.extensao.adotapet.Enum.StatusAdocao;
import com.extensao.adotapet.FormularioAdocao.Dto.AdocaoDetalhesDTO;
import com.extensao.adotapet.FormularioAdocao.Dto.RespostaRequestDTO;
import com.extensao.adotapet.FormularioAdocao.Dto.AdocaoOngDTO;
import com.extensao.adotapet.FormularioAdocao.Service.FormularioAdocaoService;
import com.extensao.adotapet.Usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adocao")
public class AdocaoController {

    @Autowired
    private FormularioAdocaoService respostaService;

    @PostMapping("/responder")
    public void responder(@RequestBody RespostaRequestDTO dto) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) auth.getPrincipal();

        respostaService.responder(dto, usuario);
    }

    @PatchMapping("/{id}/status")
    public void atualizarStatus(
            @PathVariable Long id,
            @RequestParam StatusAdocao status
    ) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Usuario usuario = (Usuario) auth.getPrincipal();

        respostaService.atualizarStatus(id, status, usuario);
    }

    @GetMapping("/ong")
    public List<AdocaoOngDTO> listarAdocoesDaOng() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) auth.getPrincipal();

        return respostaService.listarAdocoesDaOng(usuario);
    }

    @GetMapping("/{id}")
    public AdocaoDetalhesDTO buscarDetalhesDaAdocao(@PathVariable Long id) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) auth.getPrincipal();

        return respostaService.buscarDetalhesDaAdocao(id, usuario);
    }
}
