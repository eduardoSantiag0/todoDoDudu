package com.catijr.backend_java.services;


import com.catijr.backend_java.application.dtos.AtualizarDadosTarefaRequest;
import com.catijr.backend_java.application.dtos.CriarTarefasRequest;
import com.catijr.backend_java.application.dtos.TarefaDTO;
import com.catijr.backend_java.application.errors.DataConclusaoDeveSerNoFuturoException;
import com.catijr.backend_java.application.errors.ListaNaoEncontradaException;
import com.catijr.backend_java.application.errors.TarefaNaoEncontradaException;
import com.catijr.backend_java.infra.entities.ListaEntity;
import com.catijr.backend_java.infra.entities.TarefaEntity;
import com.catijr.backend_java.infra.repositories.ListaRepository;
import com.catijr.backend_java.infra.repositories.TarefaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class TarefaService {

    private final ListaRepository listaRepository;
    private final TarefaRepository tarefaRepository;


    public TarefaService(ListaRepository listaRepository, TarefaRepository tarefaRepository) {
        this.listaRepository = listaRepository;
        this.tarefaRepository = tarefaRepository;
    }

    private void verificaNovaData (AtualizarDadosTarefaRequest dto) {
        if (dto.dataEsperadaDeConclusao().get().isBefore(LocalDate.now())) {
            throw new DataConclusaoDeveSerNoFuturoException("Data de conclusão deve ser no futuro.");
        }
    }


    @Transactional
    public void criarTarefas(CriarTarefasRequest dto) {
        ListaEntity lista = listaRepository.findById(dto.listaId())
                .orElseThrow(() -> new ListaNaoEncontradaException("Lista não encontrada"));

        TarefaEntity novaTarefa = TarefaEntity.of(dto, lista);

        tarefaRepository.save(novaTarefa);
    }


    public List<TarefaDTO> listarTodas() {
        return tarefaRepository.findAll()
                .stream()
                .map(TarefaMapper::toDTO)
                .toList();
    }


    public TarefaDTO buscarTarefaPorId(Long id) {
        TarefaEntity tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new TarefaNaoEncontradaException("Tarefa nao encontrada"));

        return TarefaMapper.toDTO(tarefa);
    }

    @Transactional
    public TarefaDTO atualizarTarefaPorId(Long id, AtualizarDadosTarefaRequest dto) {

        TarefaEntity tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new TarefaNaoEncontradaException("Tarefa não encontrada"));

        if (dto.nome().isPresent()) {
            tarefa.setNome(dto.nome().get());
        }
        if (dto.descricao().isPresent()) {
            tarefa.setDescription(dto.descricao().get());
        }
        if (dto.prioridade().isPresent()) {
            tarefa.setPrioridade(dto.prioridade().get());
        }
        if (dto.dataConcluido().isPresent()) {
            tarefa.setDataConclusaoEsperada(dto.dataConcluido().get());
        }
        if (dto.dataEsperadaDeConclusao().isPresent()) {
            verificaNovaData(dto);
            tarefa.setDataConclusaoEsperada(dto.dataEsperadaDeConclusao().get());
        }

        TarefaEntity atualizada = tarefaRepository.save(tarefa);

        return TarefaMapper.toDTO(atualizada);
    }

    @Transactional
    public void deletarTarefa(Long id) {
        TarefaEntity tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new TarefaNaoEncontradaException("Tarefa não encontrada"));

        tarefaRepository.delete(tarefa);
    }

}
