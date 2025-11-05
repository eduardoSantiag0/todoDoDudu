package com.catijr.backend_java.infra.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "tarefas")
public class TarefaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lista_id", nullable = false)
    private ListaEntity publicId;

    @Column(name = "nome", nullable = false)
    private String nome;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "prioridade", nullable = false)
    private Prioridade priority;

    @Column(name = "data_conclusao")
    private LocalDate data;


    public TarefaEntity() {
    }

    public TarefaEntity(ListaEntity listaId, String nome, String description,
                        Prioridade priority, LocalDate data) {
        this.publicId = listaId;
        this.nome = nome;
        this.description = description;
        this.priority = priority;
        this.data = data;
    }

    public ListaEntity getPublicId() {
        return publicId;
    }

    public String getNome() {
        return nome;
    }

    public String getDescription() {
        return description;
    }

    public Prioridade getPriority() {
        return priority;
    }

    public LocalDate getData() {
        return data;
    }
}
