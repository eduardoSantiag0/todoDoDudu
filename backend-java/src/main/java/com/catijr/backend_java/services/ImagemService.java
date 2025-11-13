package com.catijr.backend_java.services;

import com.catijr.backend_java.application.dtos.ImagemDTO;
import com.catijr.backend_java.application.dtos.response.ImagemUploadResponse;
import com.catijr.backend_java.application.errors.ArquivoMuitoGrandeException;
import com.catijr.backend_java.application.errors.ImagemNaoEncontradaException;
import com.catijr.backend_java.application.errors.TarefaNaoEncontradaException;
import com.catijr.backend_java.infra.entities.ImagemEntity;
import com.catijr.backend_java.infra.entities.TarefaEntity;
import com.catijr.backend_java.infra.repositories.ImagemRepository;
import com.catijr.backend_java.infra.repositories.TarefaRepository;
import com.catijr.backend_java.services.mappers.ImagemMapper;
import com.catijr.backend_java.services.utils.ImagemUtils;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
public class ImagemService {

    private final ImagemRepository imagemRepository;

    private final TarefaRepository tarefaRepository;

    public ImagemService(ImagemRepository imagemRepository, TarefaRepository tarefaRepository) {
        this.imagemRepository = imagemRepository;
        this.tarefaRepository = tarefaRepository;
    }


    public ImagemUploadResponse uploadImagem(MultipartFile file, Long tarefaId)  {

        try {
            TarefaEntity tarefa = tarefaRepository.findById(tarefaId)
                    .orElseThrow(() -> new TarefaNaoEncontradaException("Tarefa nao encontrada"));

            ImagemEntity imagemEntity = new ImagemEntity(tarefa,
                    file.getOriginalFilename(), file.getContentType(),
                    ImagemUtils.compressImage(file.getBytes()));

            imagemRepository.save(imagemEntity);

            return new ImagemUploadResponse(imagemEntity.getNome(), imagemEntity.getTipo(), imagemEntity.getImagemDados());
        } catch (MaxUploadSizeExceededException ex) {
            throw new ArquivoMuitoGrandeException();
        } catch (IOException ex) {
            throw new RuntimeException();
        }


    }

    @Transactional
    public List<ImagemDTO> getImagensByTarefaId (Long tarefaId) {

        TarefaEntity tarefa = tarefaRepository.findById(tarefaId)
                .orElseThrow(() -> new TarefaNaoEncontradaException("Tarefa nao encontrada"));

        List<ImagemEntity> entities = imagemRepository.findByTarefaId(tarefa);


        return entities.stream()
                .map(ImagemMapper::toDTO)
                .toList();
    }


    public ImagemDTO buscarImagemPorId(Long imagemId) {
        ImagemEntity imagem = imagemRepository.findById(imagemId)
                .orElseThrow(() -> new ImagemNaoEncontradaException("Imagem nao encontrada"));

        return ImagemMapper.toDTO(imagem);

    }

    public void deletarImagemPorId(Long imagemId) {
        ImagemEntity imagem = imagemRepository.findById(imagemId)
                .orElseThrow(() -> new ImagemNaoEncontradaException("Imagem nao encontrada"));

        imagemRepository.deleteById(imagem.getId());
    }
}
