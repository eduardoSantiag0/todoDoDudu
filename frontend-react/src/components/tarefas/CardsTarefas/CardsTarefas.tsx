import type { IdentificadorTarefa, Tarefa } from '../../../types/tarefa'
import { PriorityTag } from './TagPrioridade'
import { BotaoFinalizarTarefa } from '../../btns/BotaoFinalizarTarefa'
import { BsFillCalendarWeekFill } from 'react-icons/bs'
import { AlertConfirmarDelecao } from '../../modals/AlertConfirmarDelecao'
import { ContextMenuTarefa } from './ContextMenuTarefa'
import React, { useState } from 'react'
import { FormatadorData } from '../../../utils/FormatadorData'

import {
    getCardContainerClasses,
    getDateChipClasses,
    getDateIconClasses,
    getDateTextClasses,
    getDescriptionClasses,
    getTitleClasses,
} from './cardsTarefasStyles'

interface CardsTarefasProps {
    tarefa: Tarefa;
    aoDeletarTarefa: (idTarefa: IdentificadorTarefa) => void;
    aoIniciarArrasteTarefa: (tarefa: Tarefa) => void;
    aoAbrirDetalhesTarefa: (tarefa: Tarefa) => void;
    aoAlternarFinalizacaoTarefa: (
        idTarefa: IdentificadorTarefa,
        tarefaJaFinalizada: boolean
    ) => void;
    aoDuplicarTarefa: (tarefa: Tarefa) => void;
}

export function CardsTarefas({
    tarefa,
    aoDeletarTarefa,
    aoIniciarArrasteTarefa,
    aoAbrirDetalhesTarefa,
    aoAlternarFinalizacaoTarefa,
    aoDuplicarTarefa,
}: CardsTarefasProps) {
    const [confirmacaoAberta, setConfirmacaoAberta] = useState(false)

    const [menuAberto, setMenuAberto] = useState(false)
    const [menuPosicao, setMenuPosicao] = useState<{
        x: number;
        y: number;
    } | null>(null)


    function lidarInicioArraste(evento: React.DragEvent) {
        evento.dataTransfer.setData('tarefaId', String(tarefa.id))
        evento.dataTransfer.setData('listaOrigemId', String(tarefa.listaId))
        aoIniciarArrasteTarefa(tarefa)
    }

    function fecharMenu() {
        setMenuAberto(false)
    }
    function confirmarDelecaoTarefa() {
        aoDeletarTarefa(tarefa.id)
        setConfirmacaoAberta(false)
    }

    function lidarCliqueFinalizar() {
        aoAlternarFinalizacaoTarefa(tarefa.id, tarefaEstaFinalizada)
    }

    const tarefaEstaFinalizada = Boolean(tarefa.concluidoEm)

    const hojeISO = FormatadorData.hojeISO()

    const dataPrevista = tarefa.dataEsperadaDeConclusao

    const lateOpen =
        !!dataPrevista && !tarefaEstaFinalizada && dataPrevista < hojeISO

    const lateDone =
        !!dataPrevista &&
        tarefaEstaFinalizada &&
        tarefa.concluidoEm! > dataPrevista

    const tarefaEstaAtrasada = lateOpen || lateDone


    const visualState = {
        finished: tarefaEstaFinalizada,
        late: tarefaEstaAtrasada,
    }

    function formatarDataCard(iso: string) {
        const [ano, mes, dia] = iso.split('-').map(Number)
        const dataLocal = new Date(ano, mes - 1, dia)
        return dataLocal.toLocaleDateString('pt-BR')
    }

    function abrirMenuContexto(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()
        setMenuPosicao({ x: e.clientX, y: e.clientY })
        setMenuAberto(true)
    }

    return (
        <div
            className={
                getCardContainerClasses(visualState) +
                ' relative  w-full min-w-0 overflow-visible'
            }
            draggable
            onDragStart={lidarInicioArraste}
            onClick={() => aoAbrirDetalhesTarefa(tarefa)}
            onContextMenu={abrirMenuContexto}
        >
            <div className="w-full flex items-center justify-between gap-2">
                <PriorityTag
                    prioridade={tarefa.prioridade}
                    finished={tarefaEstaFinalizada}
                />
                <BotaoFinalizarTarefa
                    tarefaEstaFinalizada={tarefaEstaFinalizada}
                    aoClicarBotao={lidarCliqueFinalizar}
                />
            </div>

            <div className="mb-1 text-sm font-semibold text-text-default w-full">
                <p>
                    {tarefa.nome}
                </p>
            </div>

            {tarefa.descricao && (
                <p
                    className={
                        getDescriptionClasses(visualState) +
                        ' w-full wrap-break-word'
                    }
                    title={tarefa.descricao}
                >
                    {tarefa.descricao}
                </p>
            )}

            {tarefa.dataEsperadaDeConclusao && (
                <div
                    className={
                        getDateChipClasses(visualState) +
                        ' inline-flex items-center gap-2'
                    }
                >
                    <BsFillCalendarWeekFill
                        className={getDateIconClasses(visualState)}
                    />
                    <span className={getDateTextClasses(visualState)}>
                        {formatarDataCard(tarefa.dataEsperadaDeConclusao)}
                    </span>
                </div>
            )}

            <ContextMenuTarefa
                visivel={menuAberto}
                posicao={menuPosicao}
                aoFechar={fecharMenu}
                aoEditar={() => {
                    aoAbrirDetalhesTarefa(tarefa)
                    fecharMenu()
                }}
                aoDuplicar={() => {
                    aoDuplicarTarefa(tarefa)
                    fecharMenu()
                }}
                aoDeletar={() => {
                    setConfirmacaoAberta(true)
                    fecharMenu()
                }}
            />

            {confirmacaoAberta && (
                <AlertConfirmarDelecao
                    tipo="Tarefa"
                    nome={tarefa.nome}
                    aoConfirmar={confirmarDelecaoTarefa}
                    aoCancelar={() => setConfirmacaoAberta(false)}
                />
            )}
        </div>
    )
}
