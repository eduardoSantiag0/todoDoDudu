package com.catijr.backend_java.application.dtos.request.criar;

public record ImagemUploadRequest(
        Long tarefaId,
        String nome,
        String tipo,
        byte[] imagemDados
) {
}
