package com.catijr.backend_java.infra.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "listas")
public class ListaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "public_id", nullable = false,
            unique = true, columnDefinition = "serial")
    private Long publicId;

    @Column(name = "nome", nullable = false, unique = true)
    private String nome;

    @OneToMany(mappedBy = "publicId", cascade = CascadeType.ALL)
    private List<TarefaEntity> tarefas = new ArrayList<>();

    public ListaEntity() {
    }

    public ListaEntity(String nome) {
        this.nome = nome;
    }

    public void adicionarTarefa (TarefaEntity entidade) {
        this.tarefas.add(entidade);
    }

    public UUID getId() {
        return id;
    }

    public Long getPublicId() {
        return publicId;
    }

    public String getNome() {
        return nome;
    }

    public List<TarefaEntity> getTarefas() {
        return tarefas;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
