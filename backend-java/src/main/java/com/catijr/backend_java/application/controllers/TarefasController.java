package com.catijr.backend_java.application.controllers;

import com.catijr.backend_java.application.dtos.atualizar.AtualizarDadosTarefaRequest;
import com.catijr.backend_java.application.dtos.criar.CriarTarefasRequest;
import com.catijr.backend_java.application.dtos.TarefaDTO;
import com.catijr.backend_java.services.TarefaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/tasks")
public class TarefasController {

    private final TarefaService service;

    public TarefasController(TarefaService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TarefaDTO> buscarTarefa(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarTarefaPorId(id));
    }

    @PostMapping()
    public ResponseEntity<?> criarTarefas (@Valid @RequestBody CriarTarefasRequest dto) {
        service.criarTarefas(dto);
        return ResponseEntity.ok("Tarefa criada com sucesso!");
    }


    @PutMapping("/{id}")
    public ResponseEntity<TarefaDTO> atualizarTarefa(@PathVariable Long id,
            @RequestBody AtualizarDadosTarefaRequest dto) {
        return ResponseEntity.ok(service.atualizarTarefaPorId(id, dto));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarTarefa (@PathVariable Long id) {
        service.deletarTarefa(id);
        return ResponseEntity.noContent().build();
    }





}
