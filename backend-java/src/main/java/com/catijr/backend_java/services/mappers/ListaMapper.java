package com.catijr.backend_java.services.mappers;

import com.catijr.backend_java.application.dtos.ListaDTO;
import com.catijr.backend_java.infra.entities.ListaEntity;
import org.springframework.stereotype.Component;

@Component
public class ListaMapper {

    public static ListaDTO toDTO(ListaEntity lista) {
        return new ListaDTO(
                lista.getId(),
                lista.getNome()
        );
    }

}
