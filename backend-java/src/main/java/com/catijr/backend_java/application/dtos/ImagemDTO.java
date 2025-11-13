package com.catijr.backend_java.application.dtos;

public record ImagemDTO(
        Long id,
//        Long tarefaId,
        String nome,
        String tipo,
        byte[] imagemDados
) {

}
