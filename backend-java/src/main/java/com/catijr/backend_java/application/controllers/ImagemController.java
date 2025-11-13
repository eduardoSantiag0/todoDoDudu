package com.catijr.backend_java.application.controllers;


import com.catijr.backend_java.application.dtos.ImagemDTO;
import com.catijr.backend_java.application.dtos.request.criar.ImagemUploadRequest;
import com.catijr.backend_java.application.dtos.response.ImagemUploadResponse;
import com.catijr.backend_java.services.ImagemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
public class ImagemController {

    private final ImagemService imagemService;

    public ImagemController(ImagemService imagemService) {
        this.imagemService = imagemService;
    }

    @PostMapping("/{tarefaId}/imagens")
    public ResponseEntity<ImagemUploadResponse> uploadImage(
            @RequestParam("image") MultipartFile file,
            @PathVariable Long tarefaId) throws IOException
    {
        ImagemUploadResponse response = imagemService.uploadImagem(file, tarefaId);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }


    @GetMapping("/{tarefaId}/imagens")
    public ResponseEntity<List<ImagemDTO>> getImagensByTarefaId(@PathVariable Long tarefaId ){
        List<ImagemDTO> imagens = imagemService.getImagensByTarefaId(tarefaId);

        return ResponseEntity.ok(imagens);

    }

    @GetMapping("/imagens/{imagemId}")
    public ResponseEntity<byte[]> getImagem(@PathVariable Long imagemId) {
        ImagemDTO imagem = imagemService.buscarImagemPorId(imagemId);

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(imagem.tipo()))
                .body(imagem.imagemDados());
    }

    @DeleteMapping("/imagens/{imagemId}")
    public ResponseEntity<Void> deletarImagem(@PathVariable Long imagemId) {
        imagemService.deletarImagemPorId(imagemId);
        return ResponseEntity.noContent().build();
    }

}