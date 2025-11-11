package com.catijr.backend_java.services;

import com.catijr.backend_java.application.dtos.response.ListaCriadaResponse;
import com.catijr.backend_java.application.dtos.criar.CriarListasRequest;
import com.catijr.backend_java.application.dtos.ListaDTO;
import com.catijr.backend_java.application.errors.ListaNaoEncontradaException;
import com.catijr.backend_java.application.errors.NomeListaJaExisteException;
import com.catijr.backend_java.infra.entities.ListaEntity;
import com.catijr.backend_java.infra.repositories.ListaRepository;
import com.catijr.backend_java.services.mappers.ListaMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ListasService {

    private final ListaRepository listaRepository;

    public ListasService(ListaRepository listaRepository) {
        this.listaRepository = listaRepository;
    }

    @Transactional
    public ListaCriadaResponse criarLisa(CriarListasRequest dto) {

        if (dto.nomeLista().isEmpty()) {
            throw new IllegalArgumentException();
        }

        if (listaRepository.existsByNome(dto.nomeLista())) {
            throw new NomeListaJaExisteException("Já existe uma lista com esse nome");
        }

        ListaEntity novaLista = new ListaEntity(dto.nomeLista());

        listaRepository.save(novaLista);

        return new ListaCriadaResponse(novaLista.getId(), novaLista.getNome());

    }

    public List<ListaDTO> retornarListas() {
        List<ListaEntity> entidades = listaRepository.findAll();

        return entidades.stream()
                .map(ListaMapper::toDTO)
                .toList();
    }

    public ListaDTO buscarListaPorId(Long id) {
        ListaEntity lista = listaRepository.findById(id)
                .orElseThrow(() -> new ListaNaoEncontradaException("Não foi possivel encontrar essa lista"));

        return ListaMapper.toDTO(lista);
    }

    @Transactional
    public ListaDTO atualizarListaPorId(Long id, String novoNome) {
        ListaEntity lista = listaRepository.findById(id)
                .orElseThrow(() -> new ListaNaoEncontradaException("Não foi possivel encontrar essa lista"));

        if (listaRepository.existsByNome(novoNome)) {
            throw new NomeListaJaExisteException("Já existe uma lista com esse nome");
        }

        lista.setNome(novoNome);
        ListaEntity atualizada = listaRepository.save(lista);

        return ListaMapper.toDTO(atualizada);
    }

    @Transactional
    public void deletarLista(Long id) {
        ListaEntity lista = listaRepository.findById(id)
                .orElseThrow(() -> new ListaNaoEncontradaException
                        ("Não foi possivel encontrar essa lista"));

        listaRepository.delete(lista);

    }
}
