package com.catijr.backend_java.infra.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "listas")
public class ListaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, unique = true)
    private String nome;

    @OneToMany(mappedBy = "lista", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TarefaEntity> tarefas = new ArrayList<>();

    public ListaEntity() {
    }

    public ListaEntity(String nome) {
        this.nome = nome;
    }

    public void adicionarTarefa(TarefaEntity entidade) {
        this.tarefas.add(entidade);
    }

    public Long getId() {
        return id;
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
