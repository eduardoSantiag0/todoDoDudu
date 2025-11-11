package com.catijr.backend_java.application.errors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NomeListaJaExisteException.class)
    public ResponseEntity<String> handleNomeListaJaExisteException
            (NomeListaJaExisteException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());

    }

    @ExceptionHandler(DataInvalidaException.class)
    public ResponseEntity<String> handleDataConclusaoDeveSerNoFuturoException
            (DataInvalidaException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
    }


    @ExceptionHandler(ListaNaoEncontradaException.class)
    public ResponseEntity<String> handleListaNaoEncontradaException
            (ListaNaoEncontradaException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());

    }

    @ExceptionHandler(TarefaNaoEncontradaException.class)
    public ResponseEntity<String> handleTarefaNaoEncontradaException
            (TarefaNaoEncontradaException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());

    }
}
