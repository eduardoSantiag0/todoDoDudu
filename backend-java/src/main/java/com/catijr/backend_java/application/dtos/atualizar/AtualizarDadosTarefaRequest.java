package com.catijr.backend_java.application.dtos.atualizar;

import com.catijr.backend_java.infra.entities.EPrioridade;
import java.time.LocalDate;
import java.util.Optional;

public record AtualizarDadosTarefaRequest(
        Optional<Long> novaListaId,
        Optional<String> nome,
        Optional<String> descricao,
        Optional<EPrioridade> prioridade,
//        Optional<LocalDate> dataFinalizada,
        LocalDate dataFinalizada,
        Optional<LocalDate> dataEsperadaDeConclusao,
        Optional<Long> listId
) {
}
