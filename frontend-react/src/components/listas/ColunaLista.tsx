import { useMemo, useState } from 'react'
import type { IdentificadorLista } from '../../types/lista'
import {
    IdentificadorTarefa,
    PrioridadeTarefa,
    Tarefa,
} from '../../types/tarefa'
import { useBoard } from '../../context/BoardContext'
import { CardsTarefas } from '../tarefas/CardsTarefas/CardsTarefas'
import { AlertConfirmarDelecao } from '../modals/AlertConfirmarDelecao'
import { BotaoAcaoComPlus } from '../btns/BotaoAcaoComPlus'
import { CabecalhoCard } from '../btns/BotaoListaOpcoes'
import { CriarTarefaForm } from '../tarefas/CriarTarefaForm'

interface Props {
    idLista: IdentificadorLista;
    nomeLista: string;
}

export function ColunaLista({ idLista, nomeLista }: Props) {
    const {
        tarefasDaLista,
        renomearLista,
        deletarLista,
        criarTarefa,
        deletarTarefa,
        moverTarefaEntreListas,
        alternarFinalizacaoTarefa,
        abrirDetalhes,
    } = useBoard()

    const tarefas = tarefasDaLista(idLista)

    const ordemPrioridade: Record<PrioridadeTarefa, number> = {
        [PrioridadeTarefa.VERY_HIGH]: 1,
        [PrioridadeTarefa.HIGH]: 2,
        [PrioridadeTarefa.MEDIUM]: 3,
        [PrioridadeTarefa.LOW]: 4,
    }

    const [criandoTarefa, setCriandoTarefa] = useState(false)

    const [confirmacaoAberta, setConfirmacaoAberta] = useState(false)

    function lidarDuplicarTarefa(t: Tarefa) {
        const prazo = t.dataEsperadaDeConclusao ?? ''

        void criarTarefa(
            t.listaId as IdentificadorLista,
            `${t.nome} (cópia)`,
            t.descricao ?? '',
            t.prioridade,
            prazo,
        )
    }

    const tarefasOrdenadas = useMemo(
    () =>
        [...tarefas].sort(
        (a, b) =>
            ordemPrioridade[a.prioridade] - ordemPrioridade[b.prioridade],
        ),
    [tarefas], 
    )

    return (
        <section
            className="
                flex flex-col
                w-full h-auto overflow-visible
                md:w-[401px] md:min-w-[401px] md:h-full
                md:overflow-y-auto
                box-border h-auto shrink-0 rounded-xl
                bg-background-main  border
                border-button-hover
                p-4 pb-6 gap-3"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault()
                const idTarefa = Number(
                    e.dataTransfer.getData('tarefaId'),
                ) as IdentificadorTarefa
                const listaOrigemId = Number(
                    e.dataTransfer.getData('listaOrigemId'),
                ) as IdentificadorLista
                if (idTarefa && listaOrigemId) {
                    void moverTarefaEntreListas(
                        idTarefa,
                        listaOrigemId,
                        idLista,
                    )
                }
            }}
        >
            <CabecalhoCard
                nomeLista={nomeLista}
                onRenomear={(novo) => renomearLista(idLista, novo)}
                onExcluir={() => setConfirmacaoAberta(true)}
            />

            {tarefasOrdenadas.map((tarefa) => (
                <div key={tarefa.id}>
                    <CardsTarefas
                        tarefa={tarefa}
                        aoDeletarTarefa={(id) => void deletarTarefa(id)}
                        aoIniciarArrasteTarefa={(t) => {
                        }}
                        aoAbrirDetalhesTarefa={abrirDetalhes}
                        aoAlternarFinalizacaoTarefa={(id, done) =>
                            void alternarFinalizacaoTarefa(id, done)
                        }
                        aoDuplicarTarefa={lidarDuplicarTarefa}
                    />
                </div>
            ))}

            {!criandoTarefa ? (
            <BotaoAcaoComPlus
                texto="Nova tarefa"
                aoClicar={() => setCriandoTarefa(true)}
            />
            ) : (
            <CriarTarefaForm
                listaId={idLista}
                onCancel={() => setCriandoTarefa(false)}
                onCreate={async (listaId, nome, descricao, prioridade, data) => {
                await criarTarefa(listaId, nome, descricao, prioridade, data)
                }}
            />
            )}


            {confirmacaoAberta && (
                <AlertConfirmarDelecao
                    tipo="Lista"
                    nome={nomeLista}
                    aoConfirmar={() => {
                        void deletarLista(idLista)
                        setConfirmacaoAberta(false)
                    }}
                    aoCancelar={() => setConfirmacaoAberta(false)}
                />
            )}
        </section>
    )
}
