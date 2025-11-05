package com.catijr.backend_java.application.dtos;
import com.catijr.backend_java.infra.entities.EPrioridade;

import java.time.LocalDate;

public record CriarTarefasRequest(
        Long listaId,
        String nome,
        String descricao,
        EPrioridade prioridade,
        LocalDate dataConclusao
) {}