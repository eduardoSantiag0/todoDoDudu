package com.catijr.backend_java.application.errors;

public class ArquivoMuitoGrandeException extends RuntimeException {
    public ArquivoMuitoGrandeException() {
        super("Arquivo muito grande. Tamanho máximo permitido foi excedido.");
    }
}
