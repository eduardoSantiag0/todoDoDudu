import { clienteApi } from "./clienteApi";
import type {
  Tarefa,
  IdentificadorTarefa,
  PrioridadeTarefa,
} from "../types/tarefa";
import type { ListId } from "../types/lista";

export interface CriarTarefaRequisicao {
  nome: string;
  descricao?: string;
  prioridade: PrioridadeTarefa;
  dataPrevistaConclusao?: string;
  listaId: ListId;
}

export interface AtualizarTarefaRequisicao {
  nome?: string;
  descricao?: string;
  prioridade?: PrioridadeTarefa;
  dataPrevistaConclusao?: string;
  listaId?: ListId;
  dataConclusao?: string | null;
}

export async function buscarTarefaPorId( idTarefa: IdentificadorTarefa ): Promise<Tarefa> {
  const resposta = await clienteApi.get(`/tasks/${idTarefa}`);
  const tarefa = resposta.data as Tarefa;
  return tarefa;
}

export async function criarNovaTarefa( corpoRequisicao: CriarTarefaRequisicao ): Promise<Tarefa> {
  const resposta = await clienteApi.post("/tasks", corpoRequisicao);
  const tarefaCriada = resposta.data as Tarefa;
  return tarefaCriada;
}

export async function atualizarTarefaPorId( 
    idTarefa: IdentificadorTarefa, 
    corpoRequisicao: AtualizarTarefaRequisicao
): Promise<Tarefa> {
  const resposta = await clienteApi.put(
    `/tasks/${idTarefa}`,
    corpoRequisicao
  );
  const tarefaAtualizada = resposta.data as Tarefa;
  return tarefaAtualizada;
}

export async function deletarTarefaPorId(
  idTarefa: IdentificadorTarefa
): Promise<void> {
  await clienteApi.delete(`/tasks/${idTarefa}`);
}
