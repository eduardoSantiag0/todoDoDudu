package com.catijr.backend_java.infra.repositories;

import com.catijr.backend_java.infra.entities.TarefaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TarefaRepository extends JpaRepository<TarefaEntity, Long> {
    Optional<TarefaEntity> findById(Long publicId);
}