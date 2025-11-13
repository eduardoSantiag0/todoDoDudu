package com.catijr.backend_java.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.catijr.backend_java.application.dtos.ListaDTO;
import com.catijr.backend_java.application.dtos.request.criar.CriarListasRequest;
import com.catijr.backend_java.application.errors.ListaNaoEncontradaException;
import com.catijr.backend_java.application.errors.NomeListaJaExisteException;
import com.catijr.backend_java.infra.entities.ListaEntity;
import com.catijr.backend_java.infra.repositories.ListaRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ListasServiceTest {

    @Mock
    private ListaRepository listaRepository;

    @InjectMocks
    private ListasService listasService;

    @Test
    void quandoDadosValidos_DeveCriarLista() {
        CriarListasRequest dto = new CriarListasRequest("Estudar");

        when(listaRepository.existsByNome("Estudar")).thenReturn(false);

        listasService.criarLisa(dto);

        verify(listaRepository, times(1)).save(any(ListaEntity.class));
    }

    @Test
    void quandoNomeVazio_DeveLancarIllegalArgumentException() {
        CriarListasRequest dto = new CriarListasRequest("");

        assertThrows(IllegalArgumentException.class, () -> listasService.criarLisa(dto));
    }

    @Test
    void quandoNomeJaExiste_DeveLancarNomeListaJaExisteException() {
        CriarListasRequest dto = new CriarListasRequest("Trabalho");

        when(listaRepository.existsByNome("Trabalho")).thenReturn(true);

        assertThrows(NomeListaJaExisteException.class, () -> listasService.criarLisa(dto));
        verify(listaRepository, never()).save(any());
    }

    @Test
    void quandoNaoTiverListas_DeveRetornarListaVazia() {
        when(listaRepository.findAll()).thenReturn(List.of());

        List<ListaDTO> listas = listasService.retornarListas();

        assertTrue(listas.isEmpty());

        verify(listaRepository).findAll();

    }

    @Test
    void quandoExistiremListas_DeveRetornarListas() {
        ListaEntity lista1 = new ListaEntity("Estudos");
        ListaEntity lista2 = new ListaEntity("Esportes");

        when(listaRepository.findAll()).thenReturn(List.of(lista1, lista2));

        List<ListaDTO> listas = listasService.retornarListas();

        assertEquals(2, listas.size());
        assertEquals("Estudos", listas.get(0).nome());
        assertEquals("Esportes", listas.get(1).nome());

    }

    @Test
    void quandoIdValido_DeveRetornarLista() {
        ListaEntity lista = new ListaEntity("Compras");
        when(listaRepository.findById(1L)).thenReturn(Optional.of(lista));

        ListaDTO dto = listasService.buscarListaPorId(1L);

        assertEquals("Compras", dto.nome());

    }

    @Test
    void quandoIdInvalido_DeveLancarListaNaoEncontradaException() {
        Long idTestado = 1L;
        when(listaRepository.findById(idTestado)).thenReturn(Optional.empty());

        assertThrows(ListaNaoEncontradaException.class, () -> listasService.buscarListaPorId(idTestado));
    }


    @Test
    void quandoIdInvalidoAtualizar_DeveLancarListaNaoEncontradaException() {
        Long idTestado = 2L;
        when(listaRepository.findById(idTestado)).thenReturn(Optional.empty());

        assertThrows(ListaNaoEncontradaException.class, () -> listasService.atualizarListaPorId(idTestado, "Nova"));
    }

    @Test
    void quandoNovoNomeJaExiste_deveLancarNomeListaJaExisteException() {
        ListaEntity listaJaRegistrada = new ListaEntity("Lista 1");
        ListaEntity listaQueMudaraDeNome = new ListaEntity("Lista 2");
        String novoNomeDaLista = "Lista 1";

        when(listaRepository.findById(1L)).thenReturn(Optional.of(listaQueMudaraDeNome));

        when(listaRepository.existsByNome(novoNomeDaLista)).thenReturn(true);

        assertThrows(NomeListaJaExisteException.class, () -> listasService.atualizarListaPorId(1L, novoNomeDaLista));
    }

    @Test
    void quandoDadosValidos_DeveAtualizarLista() {
        ListaEntity lista = new ListaEntity("Lista 10");
        when(listaRepository.findById(1L)).thenReturn(Optional.of(lista));
        when(listaRepository.existsByNome("Lista 11")).thenReturn(false);
        when(listaRepository.save(any(ListaEntity.class))).thenReturn(lista);

        ListaDTO dto = listasService.atualizarListaPorId(1L, "Lista 11");

        assertEquals("Lista 11", dto.nome());
        verify(listaRepository).save(lista);
    }

    @Test
    void quandoListaNaoEncontrada_DeveLancarListaNaoEncontradaException() {
        when(listaRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ListaNaoEncontradaException.class, () -> listasService.deletarLista(1L));
    }

    @Test
    void quandoListaExistente_DeveDeletarComSucesso() {
        ListaEntity lista = new ListaEntity("Estudos");
        when(listaRepository.findById(1L)).thenReturn(Optional.of(lista));

        listasService.deletarLista(1L);

        verify(listaRepository).delete(lista);
    }

}