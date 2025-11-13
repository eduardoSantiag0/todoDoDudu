package com.catijr.backend_java.services.mappers;

import com.catijr.backend_java.application.dtos.ImagemDTO;
import com.catijr.backend_java.infra.entities.ImagemEntity;
import com.catijr.backend_java.services.utils.ImagemUtils;
import org.springframework.stereotype.Component;

@Component
public class ImagemMapper {

    public static ImagemDTO toDTO(ImagemEntity entity) {
        return new ImagemDTO(entity.getId(),
                entity.getNome(), entity.getTipo(),
                ImagemUtils.decompressImage(entity.getImagemDados()));
    }
}
