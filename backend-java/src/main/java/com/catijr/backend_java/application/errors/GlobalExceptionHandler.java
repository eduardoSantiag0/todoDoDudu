package com.catijr.backend_java.application.errors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

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

    @ExceptionHandler(ImagemNaoEncontradaException.class)
    public ResponseEntity<String> handleImagemNaoEncontradaException
            (ImagemNaoEncontradaException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());

    }
    @ExceptionHandler(ArquivoMuitoGrandeException.class)
    public ResponseEntity<String> handleArquivoMuitoGrandeException
            (ArquivoMuitoGrandeException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<String> handleMaxUploadSize(MaxUploadSizeExceededException ex) {
        return ResponseEntity
                .status(HttpStatus.PAYLOAD_TOO_LARGE) // 413
                .body("Arquivo muito grande. Tamanho máximo permitido foi excedido.");
    }

}
