package com.extensao.adotapet.Animal;

import com.extensao.adotapet.Enum.*;
import com.extensao.adotapet.Usuario.Usuario;
import com.extensao.adotapet.Usuario.UsuarioRepository;
import com.extensao.adotapet.exception.ForbiddenException;
import com.extensao.adotapet.exception.NotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AnimalServiceTest {

    @Mock
    private AnimalRepository repository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private Authentication authentication;

    @Mock
    private SecurityContext securityContext;

    @InjectMocks
    private AnimalService service;

    private Usuario ong;
    private Usuario adotante;
    private Animal animal;

    @BeforeEach
    void configurar() {
        ong = new Usuario();
        ong.setId(1L);
        ong.setEmail("ong@email.com");
        ong.setTipoUsuario(TipoUsuario.ROLE_ONG);

        adotante = new Usuario();
        adotante.setId(2L);
        adotante.setEmail("adotante@email.com");
        adotante.setTipoUsuario(TipoUsuario.ROLE_ADOTANTE);

        animal = new Animal();
        animal.setId(1L);
        animal.setNome("Rex");
        animal.setStatus(Status.DISPONIVEL);
        animal.setOng(ong);
    }

    @AfterEach
    void limparContexto() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void devePermitirCadastroDeAnimalPorOng() {
        SecurityContextHolder.setContext(securityContext);

        when(securityContext.getAuthentication())
                .thenReturn(authentication);

        when(authentication.getPrincipal())
                .thenReturn(ong);

        when(usuarioRepository.findByEmail(ong.getEmail()))
                .thenReturn(Optional.of(ong));

        AnimalRequestDTO dto = new AnimalRequestDTO(
                "Rex",
                "Vira-lata",
                Idade.ADULTO,
                "Saudável",
                "Dócil",
                "rex.jpg",
                false,
                "Maringá",
                true,
                Especie.CACHORRO,
                Porte.MEDIO,
                Sexo.MACHO,
                Status.DISPONIVEL,
                "Caramelo"
        );

        when(repository.save(any(Animal.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        AnimalResponseDTO resultado = service.cadastrarAnimal(dto);

        assertNotNull(resultado);
        verify(repository).save(any(Animal.class));
    }

    @Test
    void deveImpedirCadastroDeAnimalPorAdotante() {
        SecurityContextHolder.setContext(securityContext);

        when(securityContext.getAuthentication())
                .thenReturn(authentication);

        when(authentication.getPrincipal())
                .thenReturn(adotante);

        when(usuarioRepository.findByEmail(adotante.getEmail()))
                .thenReturn(Optional.of(adotante));

        AnimalRequestDTO dto = new AnimalRequestDTO(
                "Rex",
                "Vira-lata",
                Idade.ADULTO,
                "Saudável",
                "Dócil",
                "rex.jpg",
                false,
                "Maringá",
                true,
                Especie.CACHORRO,
                Porte.MEDIO,
                Sexo.MACHO,
                Status.DISPONIVEL,
                "Caramelo"
        );

        assertThrows(
                ForbiddenException.class,
                () -> service.cadastrarAnimal(dto)
        );

        verify(repository, never()).save(any(Animal.class));
    }

    @Test
    void deveLancarErroQuandoUsuarioNaoForEncontrado() {
        SecurityContextHolder.setContext(securityContext);

        when(securityContext.getAuthentication())
                .thenReturn(authentication);

        when(authentication.getPrincipal())
                .thenReturn(ong);

        when(usuarioRepository.findByEmail(ong.getEmail()))
                .thenReturn(Optional.empty());

        AnimalRequestDTO dto = new AnimalRequestDTO(
                "Rex",
                "Vira-lata",
                Idade.ADULTO,
                "Saudável",
                "Dócil",
                "rex.jpg",
                false,
                "Maringá",
                true,
                Especie.CACHORRO,
                Porte.MEDIO,
                Sexo.MACHO,
                Status.DISPONIVEL,
                "Caramelo"
        );

        assertThrows(
                NotFoundException.class,
                () -> service.cadastrarAnimal(dto)
        );

        verify(repository, never()).save(any(Animal.class));
    }

    @Test
    void deveLancarErroQuandoAnimalNaoForEncontrado() {
        when(repository.findById(1L))
                .thenReturn(Optional.empty());

        assertThrows(
                NotFoundException.class,
                () -> service.getById(1L)
        );
    }

    @Test
    void deveInativarAnimal() {
        when(repository.findById(1L))
                .thenReturn(Optional.of(animal));

        service.inativar(1L);

        assertEquals(Status.INATIVO, animal.getStatus());

        verify(repository).save(animal);
    }

    @Test
    void deveAtivarAnimal() {
        animal.setStatus(Status.INATIVO);

        when(repository.findById(1L))
                .thenReturn(Optional.of(animal));

        service.ativar(1L);

        assertEquals(Status.DISPONIVEL, animal.getStatus());

        verify(repository).save(animal);
    }

    @Test
    void naoDeveEditarAnimalAdotado() {
        animal.setStatus(Status.ADOTADO);

        when(repository.findById(1L))
                .thenReturn(Optional.of(animal));

        AnimalUpdateDTO dto = new AnimalUpdateDTO();

        assertThrows(
                ForbiddenException.class,
                () -> service.atualizaParcial(1L, dto)
        );

        verify(repository, never()).save(any(Animal.class));
    }

    @Test
    void naoDeveEditarAnimalInativo() {
        animal.setStatus(Status.INATIVO);

        when(repository.findById(1L))
                .thenReturn(Optional.of(animal));

        AnimalUpdateDTO dto = new AnimalUpdateDTO();

        assertThrows(
                ForbiddenException.class,
                () -> service.atualizaParcial(1L, dto)
        );

        verify(repository, never()).save(any(Animal.class));
    }
}