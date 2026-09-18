package com.extensao.adotapet.Security;

import com.extensao.adotapet.Enum.TipoUsuario;
import com.extensao.adotapet.Usuario.Usuario;
import com.extensao.adotapet.Usuario.UsuarioRepository;
import com.extensao.adotapet.exception.AuthException;
import com.extensao.adotapet.exception.ValidationException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UsuarioRepository repository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @Test
    void deveCadastrarAdotante() {

        Usuario usuario = new Usuario();
        usuario.setNome("João");
        usuario.setEmail(" JOAO@TESTE.COM ");
        usuario.setSenha("123456");
        usuario.setCpf("12345678900");
        usuario.setTipoUsuario(TipoUsuario.ROLE_ADOTANTE);

        when(repository.existsByEmail("joao@teste.com"))
                .thenReturn(false);

        when(repository.existsByCpf("12345678900"))
                .thenReturn(false);

        when(passwordEncoder.encode("123456"))
                .thenReturn("senha-criptografada");

        authService.register(usuario);

        assertEquals("joao@teste.com", usuario.getEmail());
        assertEquals("senha-criptografada", usuario.getSenha());

        verify(repository).save(usuario);
    }

    @Test
    void naoDeveCadastrarEmailDuplicado() {

        Usuario usuario = new Usuario();
        usuario.setEmail("teste@email.com");
        usuario.setSenha("123456");
        usuario.setTipoUsuario(TipoUsuario.ROLE_ADOTANTE);

        when(repository.existsByEmail("teste@email.com"))
                .thenReturn(true);

        assertThrows(
                ValidationException.class,
                () -> authService.register(usuario)
        );

        verify(repository, never()).save(any(Usuario.class));
    }

    @Test
    void naoDeveCadastrarSemTipoUsuario() {

        Usuario usuario = new Usuario();
        usuario.setEmail("teste@email.com");
        usuario.setSenha("123456");

        when(repository.existsByEmail("teste@email.com"))
                .thenReturn(false);

        assertThrows(
                ValidationException.class,
                () -> authService.register(usuario)
        );

        verify(repository, never()).save(any(Usuario.class));
    }

    @Test
    void naoDeveCadastrarAdotanteSemCpf() {

        Usuario usuario = new Usuario();
        usuario.setEmail("teste@email.com");
        usuario.setSenha("123456");
        usuario.setTipoUsuario(TipoUsuario.ROLE_ADOTANTE);

        when(repository.existsByEmail("teste@email.com"))
                .thenReturn(false);

        assertThrows(
                ValidationException.class,
                () -> authService.register(usuario)
        );

        verify(repository, never()).save(any(Usuario.class));
    }

    @Test
    void naoDeveCadastrarCpfDuplicado() {

        Usuario usuario = new Usuario();
        usuario.setEmail("teste@email.com");
        usuario.setSenha("123456");
        usuario.setCpf("12345678900");
        usuario.setTipoUsuario(TipoUsuario.ROLE_ADOTANTE);

        when(repository.existsByEmail("teste@email.com"))
                .thenReturn(false);

        when(repository.existsByCpf("12345678900"))
                .thenReturn(true);

        assertThrows(
                ValidationException.class,
                () -> authService.register(usuario)
        );

        verify(repository, never()).save(any(Usuario.class));
    }

    @Test
    void naoDeveCadastrarOngSemCnpj() {

        Usuario usuario = new Usuario();
        usuario.setEmail("ong@email.com");
        usuario.setSenha("123456");
        usuario.setTipoUsuario(TipoUsuario.ROLE_ONG);

        when(repository.existsByEmail("ong@email.com"))
                .thenReturn(false);

        assertThrows(
                ValidationException.class,
                () -> authService.register(usuario)
        );

        verify(repository, never()).save(any(Usuario.class));
    }

    @Test
    void deveRealizarLogin() {

        Usuario usuario = new Usuario();
        usuario.setEmail("teste@email.com");
        usuario.setSenha("senha-criptografada");
        usuario.setTipoUsuario(TipoUsuario.ROLE_ADOTANTE);

        when(repository.findByEmail("teste@email.com"))
                .thenReturn(Optional.of(usuario));

        when(passwordEncoder.matches(
                "123456",
                "senha-criptografada"
        )).thenReturn(true);

        when(jwtUtil.generateToken(usuario))
                .thenReturn("token-teste");

        String token = authService.login(
                " TESTE@EMAIL.COM ",
                "123456"
        );

        assertEquals("token-teste", token);
    }

    @Test
    void naoDeveRealizarLoginComSenhaInvalida() {

        Usuario usuario = new Usuario();
        usuario.setEmail("teste@email.com");
        usuario.setSenha("senha-criptografada");

        when(repository.findByEmail("teste@email.com"))
                .thenReturn(Optional.of(usuario));

        when(passwordEncoder.matches(
                "senha-errada",
                "senha-criptografada"
        )).thenReturn(false);

        assertThrows(
                AuthException.class,
                () -> authService.login(
                        "teste@email.com",
                        "senha-errada"
                )
        );
    }

    @Test
    void naoDeveRealizarLoginComUsuarioInexistente() {

        when(repository.findByEmail("naoexiste@email.com"))
                .thenReturn(Optional.empty());

        assertThrows(
                AuthException.class,
                () -> authService.login(
                        "naoexiste@email.com",
                        "123456"
                )
        );
    }
}