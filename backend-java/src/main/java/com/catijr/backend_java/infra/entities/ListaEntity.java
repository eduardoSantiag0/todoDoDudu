package com.catijr.backend_java.infra.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

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
