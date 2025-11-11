import type { IdentificadorTarefa, Tarefa } from '../../../types/tarefa'
import { PriorityTag } from './TagPrioridade'
import { BotaoFinalizarTarefa } from '../../btns/BotaoFinalizarTarefa'
import { BsFillCalendarWeekFill } from 'react-icons/bs'
import { ConfirmarDelecao } from '../../modals/ConfirmarDelecao'
import { ContextMenuTarefa } from './ContextMenuTarefa'
import React, { useState } from 'react'

import {
  getCardContainerClasses,
  getDateChipClasses,
  getDateIconClasses,
  getDateTextClasses,
  getDescriptionClasses,
  getTitleClasses,

} from './cardsTarefasStyles'

interface PropriedadesTaskCard {
    tarefa: Tarefa;
    aoDeletarTarefa: (idTarefa: IdentificadorTarefa) => void;
    aoIniciarArrasteTarefa: (tarefa: Tarefa) => void;
    aoAbrirDetalhesTarefa: (tarefa: Tarefa) => void;
    aoAlternarFinalizacaoTarefa: (
        idTarefa: IdentificadorTarefa,
        tarefaJaFinalizada: boolean
    ) => void;
    aoDuplicarTarefa: (tarefa: Tarefa) => void
}


export function TaskCard({
    tarefa,
    aoDeletarTarefa,
    aoIniciarArrasteTarefa,
    aoAbrirDetalhesTarefa,
    aoAlternarFinalizacaoTarefa,
    aoDuplicarTarefa,
}: PropriedadesTaskCard) {

    const [confirmacaoAberta, setConfirmacaoAberta] = useState(false)

  const [menuAberto, setMenuAberto] = useState(false)
  const [menuPosicao, setMenuPosicao] = useState<{ x: number; y: number } | null>(null)

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

    function lidarCliqueEsquerdo() {
        aoAbrirDetalhesTarefa(tarefa)
    }


    function lidarCliqueFinalizar() {
        aoAlternarFinalizacaoTarefa(tarefa.id, tarefaEstaFinalizada)
    }


    const tarefaEstaFinalizada = Boolean(tarefa.concluidoEm)

    const hojeISO = new Date().toISOString().slice(0, 10)
    const dataPrevista = tarefa.dataPrevistaConclusao

    const lateOpen = !!dataPrevista && !tarefaEstaFinalizada && dataPrevista < hojeISO
    const lateDone = !!dataPrevista && tarefaEstaFinalizada && (tarefa.concluidoEm! > dataPrevista)


    const tarefaEstaAtrasada = lateOpen || lateDone

    const dataPrevistaISO = tarefa.dataPrevistaConclusao
        ? String(tarefa.dataPrevistaConclusao).slice(0, 10)
        : null

    const visualState = {
        finished: tarefaEstaFinalizada,
        late: tarefaEstaAtrasada,
    }

  function formatarDataLocal(iso: string) {
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
    className={getCardContainerClasses(visualState) + ' relative'}
    draggable
    onDragStart={lidarInicioArraste}
    // onContextMenu={lidarCliqueDireito}
    // onClick={lidarCliqueEsquerdo}
    onClick={() => aoAbrirDetalhesTarefa(tarefa)}  // <- abre painel
    onContextMenu={abrirMenuContexto}
    
    >
    <div className="flex items-center justify-between gap-2">
        <PriorityTag prioridade={tarefa.prioridade} finished={tarefaEstaFinalizada} />
        <BotaoFinalizarTarefa
        tarefaEstaFinalizada={tarefaEstaFinalizada}
        aoClicarBotao={lidarCliqueFinalizar}
        />
    </div>

    <div className={getTitleClasses(visualState)}>
        {tarefa.nome}
    </div>

    {tarefa.descricao && (
        <p
        className={getDescriptionClasses(visualState)}
        title={tarefa.descricao}
        >
        {tarefa.descricao}
        </p>
    )}

    {dataPrevistaISO && (
        <div className={getDateChipClasses(visualState)}>
        <BsFillCalendarWeekFill className={getDateIconClasses(visualState)} />
        <span className={getDateTextClasses(visualState)}>
            {formatarDataLocal(dataPrevistaISO)}
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
        <ConfirmarDelecao
        tipo="Tarefa"
        nome={tarefa.nome}
        aoConfirmar={confirmarDelecaoTarefa}
        aoCancelar={() => setConfirmacaoAberta(false)}
        />
    )}
    </div>
)
}