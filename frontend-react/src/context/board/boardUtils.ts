import type { IdentificadorLista, Lista } from '../../types/lista'
import type { Tarefa } from '../../types/tarefa'
import type { TarefasPorLista } from './boardTypes'

export function agruparTarefasPorLista(listas: Lista[], tarefas: Tarefa[]): TarefasPorLista {
  const mapa: TarefasPorLista = {}
  listas.forEach(l => (mapa[l.id] = []))
  tarefas.forEach(t => {
    const lid = t.listaId as IdentificadorLista
    if (!mapa[lid]) {mapa[lid] = []}
    mapa[lid].push(t)
  })
  return mapa
}

export function removerTarefaDeTodas(mapa: TarefasPorLista, idTarefa: number): TarefasPorLista {
  const novo: TarefasPorLista = {}
  Object.entries(mapa).forEach(([k, lista]) => {
    novo[Number(k) as IdentificadorLista] = lista.filter(t => t.id !== idTarefa)
  })
  return novo
}

export function substituirTarefaEmTodas(mapa: TarefasPorLista, tarefaAtualizada: Tarefa): TarefasPorLista {
  const novo: TarefasPorLista = {}
  Object.entries(mapa).forEach(([k, lista]) => {
    novo[Number(k) as IdentificadorLista] = lista.map(t => (t.id === tarefaAtualizada.id ? tarefaAtualizada : t))
  })
  return novo
}

export function moverTarefaOtimista(
  mapa: TarefasPorLista,
  idTarefa: number,
  origem: IdentificadorLista,
  destino: IdentificadorLista,
): TarefasPorLista {
  const clone: TarefasPorLista = {}
  Object.entries(mapa).forEach(([k, lista]) => (clone[Number(k) as IdentificadorLista] = [...lista]))

  const origemArr = clone[origem] ?? []
  const idx = origemArr.findIndex(t => t.id === idTarefa)
  if (idx === -1) {return mapa}

  const [movida] = origemArr.splice(idx, 1)
  clone[origem] = origemArr
  clone[destino] = [...(clone[destino] ?? []), { ...movida, listaId: destino }]
  return clone
}
