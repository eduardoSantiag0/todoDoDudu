package com.catijr.backend_java.infra.repositories;

import com.catijr.backend_java.infra.entities.ListaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ListaRepository extends JpaRepository<ListaEntity, UUID> {

    Optional<ListaEntity> findByPublicId(Long publicId);

    boolean existsByNome(String nome);

    Optional<ListaEntity> findTopByOrderByPublicIdDesc();
}