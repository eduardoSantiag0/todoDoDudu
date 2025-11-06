package com.catijr.backend_java.application.controllers;

import com.catijr.backend_java.application.dtos.ListaCriadaResponse;
import com.catijr.backend_java.application.dtos.atualizar.AtualizarDadosListaRequest;
import com.catijr.backend_java.application.dtos.criar.CriarListasRequest;
import com.catijr.backend_java.application.dtos.ListaDTO;
import com.catijr.backend_java.services.ListasService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lists")
public class ListasController {

    private final ListasService service;

    public ListasController(ListasService service) {
        this.service = service;
    }


    @PostMapping()
    public ResponseEntity<ListaCriadaResponse> criarLista(@RequestBody @Valid  CriarListasRequest dto) {
        var novaLista = service.criarLisa(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaLista);
    }

    @GetMapping()
    public ResponseEntity<List<ListaDTO>> retornarListas() {
        List<ListaDTO> listas = service.retornarListas();
        return ResponseEntity.ok(listas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListaDTO> buscarLista(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarListaPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListaDTO> atualizarLista(@PathVariable Long id,
                                                   @RequestBody AtualizarDadosListaRequest dto) {
        return ResponseEntity.ok(service.atualizarListaPorId(id, dto.nome()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarLista (@PathVariable Long id) {
        service.deletarLista(id);
        return ResponseEntity.noContent().build();
    }
}
