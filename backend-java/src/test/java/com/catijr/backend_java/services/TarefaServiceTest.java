package com.catijr.backend_java.services;

import com.catijr.backend_java.application.dtos.TarefaDTO;
import com.catijr.backend_java.application.dtos.atualizar.AtualizarDadosTarefaRequest;
import com.catijr.backend_java.application.dtos.criar.CriarTarefasRequest;
import com.catijr.backend_java.application.errors.DataInvalidaException;
import com.catijr.backend_java.application.errors.ListaNaoEncontradaException;
import com.catijr.backend_java.application.errors.TarefaNaoEncontradaException;
import com.catijr.backend_java.infra.entities.EPrioridade;
import com.catijr.backend_java.infra.entities.ListaEntity;
import com.catijr.backend_java.infra.entities.TarefaEntity;
import com.catijr.backend_java.infra.repositories.ListaRepository;
import com.catijr.backend_java.infra.repositories.TarefaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TarefaServiceTest {

    @Mock
    private ListaRepository listaRepository;

    @Mock
    private TarefaRepository tarefaRepository;

    @InjectMocks
    private TarefaService tarefaService;

    private ListaEntity listaEntidade;
    private TarefaEntity tarefa;
    private final String NOME_TAREFA = "Jogar Freefire";
    private final String NOME_LISTA = "Videogame";

    @BeforeEach
    void setUp() {

        listaEntidade = new ListaEntity(NOME_LISTA);
        tarefa = new TarefaEntity(
                listaEntidade,
                NOME_TAREFA,
                "Aumentar precisao",
                EPrioridade.HIGH,
                LocalDate.now().plusDays(2)
        );
    }


    // CRIAR
    @Test
    void quandoListaExiste_DeveCriarTarefa() {
        CriarTarefasRequest req = new CriarTarefasRequest(
                1L,
                "Descrição",
                "",
                EPrioridade.MEDIUM,
                LocalDate.now().plusDays(5)
        );

        when(listaRepository.findById(1L)).thenReturn(Optional.of(listaEntidade));
        when(tarefaRepository.save(any(TarefaEntity.class))).thenReturn(tarefa);

        assertDoesNotThrow(() -> tarefaService.criarTarefas(req));

        verify(tarefaRepository, times(1)).save(any(TarefaEntity.class));
    }

    @Test
    void quandoCriarTarefaComListaInexistente_DeveLancarExcecao() {
        Long idDeListaInexistente = 100L;

        CriarTarefasRequest request = new CriarTarefasRequest(
                idDeListaInexistente,
                "Teste",
                "Descrição",
                EPrioridade.LOW,
                LocalDate.now().plusDays(2)
        );

        when(listaRepository.findById(idDeListaInexistente)).thenReturn(Optional.empty());

        assertThrows(ListaNaoEncontradaException.class,
                () -> tarefaService.criarTarefas(request));
    }

    //BUSCAR

    @Test
    void deveListarTodasAsTarefas() {
        when(tarefaRepository.findAll()).thenReturn(List.of(tarefa));

        List<TarefaDTO> tarefas = tarefaService.listarTodas();

        assertEquals(1, tarefas.size());
        assertEquals(NOME_TAREFA, tarefas.getFirst().nome());
    }

    @Test
    void deveBuscarTarefaPorId() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));

        TarefaDTO dto = tarefaService.buscarTarefaPorId(1L);

        assertEquals(NOME_TAREFA, dto.nome());
    }

    @Test
    void quandoBuscarTarefaInexistente_DeveLancarExcecao() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(TarefaNaoEncontradaException.class,
                () -> tarefaService.buscarTarefaPorId(1L));
    }

    // ATUALIZAR

    @Test
    void deveAtualizarTarefa() {
        String novoNome = "Novo nome";

        TarefaEntity entidadeAtualizada = new TarefaEntity(
                listaEntidade,
                novoNome,
                "Aumentar precisao",
                EPrioridade.HIGH,
                LocalDate.now().plusDays(2)
        );

        when(tarefaRepository.save(any(TarefaEntity.class))).thenReturn(entidadeAtualizada);
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));

        AtualizarDadosTarefaRequest request = new AtualizarDadosTarefaRequest(
                Optional.empty(),
                Optional.of(novoNome),
                Optional.empty(),
                Optional.empty(),
                null,
                Optional.empty(),
                Optional.of(1L)
        );

        TarefaDTO dto = tarefaService.atualizarTarefaPorId(1L, request);

        assertNotNull(dto);
        assertEquals(novoNome, dto.nome());
        verify(tarefaRepository, times(1)).findById(1L);
        verify(tarefaRepository, times(1)).save(any(TarefaEntity.class));
    }

    @Test
    void quandoDataDeConclusaoForNoPassado_DeveLancarExcecao() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));

        AtualizarDadosTarefaRequest tarefaComDataOntem = new AtualizarDadosTarefaRequest(
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                null,
                Optional.of(LocalDate.now().minusDays(1)),
                Optional.of(1L)
        );

        assertThrows(DataInvalidaException.class,
                () -> tarefaService.atualizarTarefaPorId(1L, tarefaComDataOntem));
    }

    @Test
    void quandoTenatrAtualizarETarefaNaoExiste_DeveLancarErro() {

        Long idInexistente = 300L;

        when(tarefaRepository.findById(idInexistente)).thenReturn(Optional.empty());

        assertThrows(TarefaNaoEncontradaException.class,
                () -> tarefaService.atualizarTarefaPorId(idInexistente, any(AtualizarDadosTarefaRequest.class)));

        verify(tarefaRepository, never()).save(any(TarefaEntity.class));

    }

    // DELETAR

    @Test
    void deveDeletarTarefaComSucesso() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));

        tarefaService.deletarTarefa(1L);

        verify(tarefaRepository, times(1)).delete(tarefa);
    }

    @Test
    void quandoDeletarTarefaInexistente_DeveLancarExcecao() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(TarefaNaoEncontradaException.class,
                () -> tarefaService.deletarTarefa(1L));
    }


}