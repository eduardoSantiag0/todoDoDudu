package com.catijr.backend_java.application.dtos.request.criar;

import jakarta.validation.constraints.NotBlank;

public record CriarListasRequest(
        @NotBlank
        String nomeLista
) {
}
