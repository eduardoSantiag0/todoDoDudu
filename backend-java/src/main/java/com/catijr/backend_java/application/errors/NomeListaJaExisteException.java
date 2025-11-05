package com.catijr.backend_java.application.errors;

public class NomeListaJaExisteException extends RuntimeException {
    public NomeListaJaExisteException (String message) {
        super(message);
    }
}