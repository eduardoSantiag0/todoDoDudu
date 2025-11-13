CREATE TABLE IF NOT EXISTS imagens (
    id SERIAL PRIMARY KEY,
    tarefa_id BIGINT NOT NULL,
    nome_arquivo VARCHAR(255) NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    imagem_dados BYTEA,

    CONSTRAINT fk_imagens_tarefas
        FOREIGN KEY (tarefa_id)
        REFERENCES tarefas(id)
        ON DELETE CASCADE
);