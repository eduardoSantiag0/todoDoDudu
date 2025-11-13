package com.catijr.backend_java.infra.repositories;

import com.catijr.backend_java.infra.entities.ImagemEntity;
import com.catijr.backend_java.infra.entities.TarefaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ImagemRepository extends JpaRepository<ImagemEntity, Long> {

    @Override
    Optional<ImagemEntity> findById(Long id);

    List<ImagemEntity> findByTarefaId(TarefaEntity tarefa);

}
