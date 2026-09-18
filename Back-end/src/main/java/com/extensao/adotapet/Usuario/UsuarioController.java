package com.extensao.adotapet.Usuario;

import com.extensao.adotapet.Enum.TipoUsuario;
import com.extensao.adotapet.FormularioAdocao.Repository.RespostaAdocaoRepository;
import com.extensao.adotapet.Security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/perfil")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RespostaAdocaoRepository respostaAdocaoRepository;

    @GetMapping
    public UsuarioPerfilDTO perfil() {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        Usuario usuario = (Usuario) auth.getPrincipal();

        UsuarioPerfilDTO dto = new UsuarioPerfilDTO();

        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setNomeOng(usuario.getNomeOng());
        dto.setEmail(usuario.getEmail());
        dto.setTelefone(usuario.getTelefone());
        dto.setEndereco(usuario.getEndereco());
        dto.setFotoPerfil(usuario.getFotoPerfil());
        dto.setCpf(usuario.getCpf());
        dto.setDataNascimento(usuario.getDataNascimento());
        dto.setCnpj(usuario.getCnpj());
        dto.setDescricaoOng(usuario.getDescricaoOng());
        dto.setTipoUsuario(usuario.getTipoUsuario().name());

        return dto;
    }

    @PatchMapping("/edicao")
    public ResponseEntity<PerfilAtualizadoResponseDTO> editarPerfil(@RequestBody PerfilEdicaoDTO dados) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) auth.getPrincipal();

        if (dados.getNome() != null) {
            usuario.setNome(dados.getNome());
        }

        if (dados.getEmail() != null) {
            usuario.setEmail(dados.getEmail());
        }

        if (dados.getTelefone() != null) {
            usuario.setTelefone(dados.getTelefone());
        }

        if (dados.getEndereco() != null) {
            usuario.setEndereco(dados.getEndereco());
        }

        if (dados.getFotoPerfil() != null) {
            usuario.setFotoPerfil(dados.getFotoPerfil());
        }

        if (dados.getDataNascimento() != null) {
            usuario.setDataNascimento(dados.getDataNascimento());
        }

        if (usuario.getTipoUsuario() == TipoUsuario.ROLE_ONG) {
            if (dados.getNomeOng() != null) {
                usuario.setNomeOng(dados.getNomeOng());
            }

            if (dados.getDescricaoOng() != null) {
                usuario.setDescricaoOng(dados.getDescricaoOng());
            }
        }

        Usuario usuarioSalvo = repository.save(usuario);

        UsuarioPerfilDTO dto = new UsuarioPerfilDTO();
        dto.setId(usuarioSalvo.getId());
        dto.setNome(usuarioSalvo.getNome());
        dto.setNomeOng(usuarioSalvo.getNomeOng());
        dto.setEmail(usuarioSalvo.getEmail());
        dto.setTelefone(usuarioSalvo.getTelefone());
        dto.setEndereco(usuarioSalvo.getEndereco());
        dto.setFotoPerfil(usuarioSalvo.getFotoPerfil());
        dto.setCpf(usuarioSalvo.getCpf());
        dto.setDataNascimento(usuarioSalvo.getDataNascimento());
        dto.setCnpj(usuarioSalvo.getCnpj());
        dto.setDescricaoOng(usuarioSalvo.getDescricaoOng());
        dto.setTipoUsuario(usuarioSalvo.getTipoUsuario().name());

        String novoToken = jwtUtil.generateToken(usuarioSalvo);

        PerfilAtualizadoResponseDTO resposta =
                new PerfilAtualizadoResponseDTO(dto, novoToken);

        return ResponseEntity.ok(resposta);
    }

    @GetMapping("/ong/{id}")
    public ResponseEntity<OngPublicaDTO> perfilOng(@PathVariable Long id) {

        Usuario usuario = repository.findById(id).orElse(null);

        if (usuario == null || usuario.getTipoUsuario() != TipoUsuario.ROLE_ONG) {
            return ResponseEntity.notFound().build();
        }

        OngPublicaDTO dto = new OngPublicaDTO();

        dto.setId(usuario.getId());
        dto.setNomeOng(usuario.getNomeOng());
        dto.setNome(usuario.getNome());
        dto.setEmail(usuario.getEmail());
        dto.setTelefone(usuario.getTelefone());
        dto.setEndereco(usuario.getEndereco());
        dto.setFotoPerfil(usuario.getFotoPerfil());
        dto.setDataNascimento(usuario.getDataNascimento());
        dto.setCnpj(usuario.getCnpj());
        dto.setDescricaoOng(usuario.getDescricaoOng());

        return ResponseEntity.ok(dto);
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<UsuarioAdotanteDTO> perfilUsuario(@PathVariable Long id) {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        Usuario ong = (Usuario) auth.getPrincipal();

        if (ong.getTipoUsuario() != TipoUsuario.ROLE_ONG) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Usuario usuario = repository.findById(id).orElse(null);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        boolean possuiRelacao =
                respostaAdocaoRepository.existsByUsuarioAndAnimalOng(usuario, ong);

        if (!possuiRelacao) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        UsuarioAdotanteDTO dto = new UsuarioAdotanteDTO();

        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setEmail(usuario.getEmail());
        dto.setTelefone(usuario.getTelefone());
        dto.setEndereco(usuario.getEndereco());
        dto.setFotoPerfil(usuario.getFotoPerfil());
        dto.setDataNascimento(usuario.getDataNascimento());

        return ResponseEntity.ok(dto);
    }
}