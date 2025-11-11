package com.catijr.backend_java.application.dtos.response;

import com.catijr.backend_java.infra.entities.EPrioridade;
import java.time.LocalDate;

public record TarefaCriadaResponse(
        Long id,
        Long listaId,
        String nome,
        String descricao,
        EPrioridade prioridade,
        LocalDate dataConclusaoEsperada
//        LocalDate concluidoEm
) {
}
