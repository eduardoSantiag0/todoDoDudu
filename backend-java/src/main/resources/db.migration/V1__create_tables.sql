CREATE TABLE IF NOT EXISTS listas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS tarefas (
    id SERIAL PRIMARY KEY,
    data_conclusao_esperada DATE,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    prioridade VARCHAR (10) NOT NULL,

    lista_id BIGINT NOT NULL,
    CONSTRAINT fk_tarefas
        FOREIGN KEY (lista_id)
        REFERENCES listas (id)
        ON DELETE CASCADE
);