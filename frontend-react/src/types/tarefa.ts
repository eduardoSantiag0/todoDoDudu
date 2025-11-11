import type { ListId } from './lista'

export type IdentificadorTarefa = number;

export type PrioridadeTarefa = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';

export interface Tarefa {
  id: IdentificadorTarefa;
  listaId: ListId;
  nome: string;
  descricao?: string;
  prioridade: PrioridadeTarefa;
  dataPrevistaConclusao?: string;
  concluidoEm?: string | null;
}