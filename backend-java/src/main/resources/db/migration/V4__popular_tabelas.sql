INSERT INTO listas (id, nome) VALUES (101, 'Estudar');
INSERT INTO listas (id, nome) VALUES (102, 'A Fazer');


INSERT INTO tarefas (
    lista_id,
    nome,
    descricao,
    prioridade,
    data_conclusao_esperada,
    concluida_em
) VALUES (
    101,
    'Ver stories da Virginia',
    NULL,
    'VERY_HIGH',
    '2025-11-13',
    '2025-11-12'
);

INSERT INTO tarefas (
    lista_id,
    nome,
    descricao,
    prioridade,
    data_conclusao_esperada,
    concluida_em
) VALUES (
    101,
    'Não chegar atrasado no Enem',
    'Dessa vez eu vou conseguir!',
    'MEDIUM',
    '2025-11-10',
    '2025-11-13'
);


INSERT INTO tarefas (
    lista_id,
    nome,
    descricao,
    prioridade,
    data_conclusao_esperada,
    concluida_em
) VALUES (
    102,
    'Pagar aluguel',
    'Esperando cair o pix',
    'HIGH',
    '2025-11-03',
    NULL
);

INSERT INTO tarefas (
    lista_id,
    nome,
    descricao,
    prioridade,
    data_conclusao_esperada,
    concluida_em
) VALUES (
    102,
    'Task Title',
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    'LOW',
    '2026-11-13',
    NULL
);
