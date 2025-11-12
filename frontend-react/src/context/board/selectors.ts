import type { IdentificadorLista } from '../../types/lista'
import type { TarefasPorLista } from './boardTypes'
import type { Tarefa } from '../../types/tarefa'

export function selecionarTarefasDaLista(mapa: TarefasPorLista, id: IdentificadorLista): Tarefa[] {
  return mapa[id] ?? []
}
