import type { IdentificadorLista } from './lista'

export type IdentificadorTarefa = number;

export enum PrioridadeTarefa {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}


export interface Tarefa {
  id: IdentificadorTarefa;
  listaId: IdentificadorLista;
  nome: string;
  descricao?: string;
  prioridade: PrioridadeTarefa;
  dataEsperadaDeConclusao?: string;
  concluidoEm?: string | null;
}