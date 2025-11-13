package com.catijr.backend_java.application.dtos.request.criar;
import com.catijr.backend_java.infra.entities.EPrioridade;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CriarTarefasRequest(
        @NotNull
        Long listaId,

        @NotBlank
        String nome,

        String descricao,

        @NotNull
        EPrioridade prioridade,

        @NotNull
        LocalDate dataEsperadaDeConclusao
) {}