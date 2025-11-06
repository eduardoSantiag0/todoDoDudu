import type { ListId } from "./lista";

export type IdentificadorTarefa = number;

export type PrioridadeTarefa = "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";

export interface Tarefa {
  id: IdentificadorTarefa;
  nome: string;
  descricao?: string;
  prioridade: PrioridadeTarefa;
  dataPrevistaConclusao?: string;
  dataConclusao?: string | null;
  listaId: ListId;
}