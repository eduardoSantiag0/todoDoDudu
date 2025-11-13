package com.catijr.backend_java.infra.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.hibernate.annotations.JdbcTypeCode;
import java.sql.Types;

@Entity
@Table(name = "imagens")
public class ImagemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tarefa_id", nullable = false)
    private TarefaEntity tarefa;

    @Column(name = "nome_arquivo", nullable = false)
    private String nome;

    @Column(name = "tipo", nullable = false)
    private String tipo;

    @Lob
    @Column(name = "imagem_dados", columnDefinition = "BYTEA")
    @JdbcTypeCode(Types.BINARY)
    private byte[] imagemDados;

    public ImagemEntity(TarefaEntity tarefaId, String nome, String tipo, byte[] imagemDados) {
        this.tarefa = tarefaId;
        this.nome = nome;
        this.tipo = tipo;
        this.imagemDados = imagemDados;
    }

    public ImagemEntity() {
    }

    public Long getId() {
        return id;
    }

    public TarefaEntity getTarefa() {
        return tarefa;
    }

    public String getNome() {
        return nome;
    }

    public String getTipo() {
        return tipo;
    }

    public byte[] getImagemDados() {
        return imagemDados;
    }
}
