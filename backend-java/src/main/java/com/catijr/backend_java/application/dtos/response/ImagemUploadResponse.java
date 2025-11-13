package com.catijr.backend_java.application.dtos.response;

public record ImagemUploadResponse(
//        Long tarefaId,
        String nome,
        String tipo,
        byte[] imagemDados
) {
}
