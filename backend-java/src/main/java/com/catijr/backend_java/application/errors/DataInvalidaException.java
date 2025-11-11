package com.catijr.backend_java.application.errors;

public class DataInvalidaException extends RuntimeException{
    public DataInvalidaException(String message) {
        super(message);
    }
}
