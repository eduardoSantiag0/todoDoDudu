package com.catijr.backend_java.services.mappers;

import com.catijr.backend_java.application.dtos.TarefaDTO;
import com.catijr.backend_java.infra.entities.TarefaEntity;

public class TarefaMapper {

    public static TarefaDTO toDTO(TarefaEntity entity) {
        return new TarefaDTO(
                entity.getId(),
                entity.getLista().getId(),
                entity.getNome(),
                entity.getDescricao(),
                entity.getPrioridade(),
                entity.getData(),
                entity.getConcluidaEm()
        );
    }
}