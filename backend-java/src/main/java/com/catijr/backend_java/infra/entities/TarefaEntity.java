package com.catijr.backend_java.infra.entities;

import com.catijr.backend_java.application.dtos.criar.CriarTarefasRequest;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "tarefas")
public class TarefaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lista_id", nullable = false)
    private ListaEntity lista;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "prioridade", nullable = false)
    private EPrioridade prioridade;

    @Column(name = "data_conclusao_esperada")
    private LocalDate dataConclusaoEsperada;


    public TarefaEntity() {
    }

    public TarefaEntity(ListaEntity lista, String nome, String descricao,
            EPrioridade prioridade, LocalDate dataConclusao) {
        this.lista = lista;
        this.nome = nome;
        this.descricao = descricao;
        this.prioridade = prioridade;
        this.dataConclusaoEsperada = dataConclusao;
    }

    public static TarefaEntity of(CriarTarefasRequest dto, ListaEntity lista) {
        return new TarefaEntity(
                lista,
                dto.nome(),
                dto.descricao(),
                dto.prioridade(),
                dto.dataConclusao());
    }

    public Long getId() {
        return id;
    }


    public ListaEntity getLista() {
        return lista;
    }

    public LocalDate getDataConclusaoEsperada() {
        return dataConclusaoEsperada;
    }

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public EPrioridade getPrioridade() {
        return prioridade;
    }

    public LocalDate getData() {
        return dataConclusaoEsperada;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setDescription(String descricao) {
        this.descricao = descricao;
    }

    public void setPrioridade(EPrioridade prioridade) {
        this.prioridade = prioridade;
    }

    public void setDataConclusaoEsperada(LocalDate dataConclusaoEsperada) {
        this.dataConclusaoEsperada = dataConclusaoEsperada;
    }
}
