package com.catijr.backend_java.infra.repositories;

import com.catijr.backend_java.infra.entities.ListaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ListaRepository extends JpaRepository<ListaEntity, Long> {

    Optional<ListaEntity> findById(Long id);

    boolean existsByNome(String nome);

}