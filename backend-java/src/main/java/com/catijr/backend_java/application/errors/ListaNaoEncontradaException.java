package com.catijr.backend_java.application.errors;

public class ListaNaoEncontradaException extends RuntimeException {
    public ListaNaoEncontradaException (String message) {
        super(message);
    }
}
